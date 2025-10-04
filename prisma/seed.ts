import { PrismaClient, PokemonType } from "@prisma/client";
import { POKEDEX, spriteUrls } from "../src/lib/starters";

type SeedPokemon = (typeof POKEDEX)[number];

type BaseStats = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
};

const BASE_STATS: Record<number, BaseStats> = {
  1: { hp: 45, attack: 49, defense: 49, specialAttack: 65, specialDefense: 65, speed: 45 },
  2: { hp: 60, attack: 62, defense: 63, specialAttack: 80, specialDefense: 80, speed: 60 },
  3: { hp: 80, attack: 82, defense: 83, specialAttack: 100, specialDefense: 100, speed: 80 },
  4: { hp: 39, attack: 52, defense: 43, specialAttack: 60, specialDefense: 50, speed: 65 },
  5: { hp: 58, attack: 64, defense: 58, specialAttack: 80, specialDefense: 65, speed: 80 },
  6: { hp: 78, attack: 84, defense: 78, specialAttack: 109, specialDefense: 85, speed: 100 },
  7: { hp: 44, attack: 48, defense: 65, specialAttack: 50, specialDefense: 64, speed: 43 },
  8: { hp: 59, attack: 63, defense: 80, specialAttack: 65, specialDefense: 80, speed: 58 },
  9: { hp: 79, attack: 83, defense: 100, specialAttack: 85, specialDefense: 105, speed: 78 },
  10:{ hp: 45, attack: 30, defense: 35, specialAttack: 20, specialDefense: 20, speed: 45 },
  11:{ hp: 50, attack: 20, defense: 55, specialAttack: 25, specialDefense: 25, speed: 30 },
  12:{ hp: 60, attack: 45, defense: 50, specialAttack: 90, specialDefense: 80, speed: 70 },
  13:{ hp: 40, attack: 35, defense: 30, specialAttack: 20, specialDefense: 20, speed: 50 },
  14:{ hp: 45, attack: 25, defense: 50, specialAttack: 25, specialDefense: 25, speed: 35 },
  15:{ hp: 65, attack: 90, defense: 40, specialAttack: 45, specialDefense: 80, speed: 75 },
  16:{ hp: 40, attack: 45, defense: 40, specialAttack: 35, specialDefense: 35, speed: 56 },
};

type PokemonSummary = {
  id: number;
  slug: string;
  displayName: string;
};

const EVOLUTION_GROUPS: string[][] = [
  ["bulbasaur", "ivysaur", "venusaur"],
  ["charmander", "charmeleon", "charizard"],
  ["squirtle", "wartortle", "blastoise"],
  ["caterpie", "metapod", "butterfree"],
  ["weedle", "kakuna", "beedrill"],
  ["pidgey"], // single-stage example
];

const LORE: Record<number, Partial<{ summary: string; description: string }>> = {
  1: {
    summary: "Bulbasaur is a Grass/Poison type Pokémon introduced in Generation 1.",
    description:
      "Bulbasaur is a small, mainly turquoise amphibian Pokémon with red eyes and a green bulb on its back. " +
      "It is based on a frog or toad, and the bulb resembles a plant bud that blossoms as it evolves. " +
      "It's notable for being first in the National Pokédex and one of the original starter Pokémon alongside Charmander and Squirtle.",
  },
};

const prisma = new PrismaClient();

async function seedPokemon(): Promise<Map<string, PokemonSummary>> {
  const data = POKEDEX.map((pokemon: SeedPokemon) => {
    const stats = BASE_STATS[pokemon.id] ?? {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
    };

    return {
      nationalDex: pokemon.id,
      slug: pokemon.name,
      displayName: pokemon.displayName,
      primaryType: pokemon.types[0]!.toUpperCase() as PokemonType,
      secondaryType: pokemon.types[1]
        ? (pokemon.types[1]!.toUpperCase() as PokemonType)
        : null,
      spriteUrl: spriteUrls(pokemon.id).fallback,
      ...stats,
      ...LORE[pokemon.id],
    };
  });

  const records = await Promise.all(
    data.map(pokemon =>
      prisma.pokemon.upsert({
        where: { slug: pokemon.slug },
        update: pokemon,
        create: pokemon,
        select: { id: true, slug: true, displayName: true },
      }),
    ),
  );

  return new Map(records.map(pokemon => [pokemon.slug, pokemon]));
}

async function seedEvolutionChains(pokemonBySlug: Map<string, PokemonSummary>) {
  for (const group of EVOLUTION_GROUPS) {
    const baseSlug = group[0];
    const basePokemon = pokemonBySlug.get(baseSlug);
    if (!basePokemon) continue; // skip if the seed doesn’t include this Pokémon

    const chain = await prisma.evolutionChain.upsert({
      where: { slug: baseSlug },
      update: {},
      create: { slug: baseSlug },
    });

    await prisma.evolutionStage.deleteMany({ where: { chainId: chain.id } });

    await Promise.all(
      group.map((slug, index) => {
        const pokemon = pokemonBySlug.get(slug);
        if (!pokemon) return undefined;

        return prisma.evolutionStage.upsert({
          where: { pokemonId: pokemon.id },
          update: { chainId: chain.id, order: index },
          create: { chainId: chain.id, pokemonId: pokemon.id, order: index },
        });
      }),
    );
  }
}


async function main() {
  const pokemonBySlug = await seedPokemon();
  await seedEvolutionChains(pokemonBySlug);
}


main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Seed failed", error);
    await prisma.$disconnect();
    process.exit(1);
  });
