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
    summary: "Bulbasaur is a dual Grass/Poison starter that carries a budding plant on its back.",
    description:
      "The bulb on Bulbasaur’s back stores sunlight and slowly blooms as it absorbs energy. It prefers bright meadows and grows sluggish when it can’t bask in the sun.",
  },
  2: {
    summary: "Ivysaur’s plant begins to bloom, giving it stronger Grass-type attacks.",
    description:
      "Ivysaur spends more time rooted in place to siphon nutrients. It channels that energy into a powerful fragrance that can overwhelm foes before it strikes.",
  },
  3: {
    summary: "Venusaur towers over battlefields with a full bloom that radiates healing pollen.",
    description:
      "When sunlight is strongest, Venusaur’s blossom opens wide and releases a sweet aroma that calms allies. The massive leaves shield it from status moves while it charges solar energy.",
  },
  4: {
    summary: "Charmander is a Fire starter whose tail flame mirrors its mood and health.",
    description:
      "Charmander relies on a steady flame to keep warm. When excited or determined, the flame flares brighter, and a cheerful crackling sound echoes from its tail.",
  },
  5: {
    summary: "Charmeleon’s fiery temperament drives it to seek stronger opponents.",
    description:
      "Charmeleon’s claws glow red-hot in the middle of a fight. It loves rugged terrain and often scales cliffs to unleash bursts of flame from above.",
  },
  6: {
    summary: "Charizard is a powerful Fire/Flying Pokémon that breathes scorching flames.",
    description:
      "A veteran of many battles, Charizard roars before unleashing a stream of blue fire capable of melting boulders. It guides air currents with its wings to stay aloft during long duels.",
  },
  7: {
    summary: "Squirtle is the Water starter known for its agile shell defense.",
    description:
      "Squirtle withdraws into its shell to break the flow of enemy attacks, then fires pressurized bursts of water to counter. It polishes its shell for streamlined swimming.",
  },
  8: {
    summary: "Wartortle’s fluffy tail stores air, letting it dive for long stretches.",
    description:
      "Wartortle uses its larger ears to steer underwater. When it surfaces, it whips its tail to spray water arcs that dazzle opponents.",
  },
  9: {
    summary: "Blastoise carries twin hydro cannons capable of piercing heavy armor.",
    description:
      "Blastoise stabilizes its massive body by planting its feet, then fires a synchronized torrent from both cannons. It can adjust water pressure precisely to push or topple foes.",
  },
  10: {
    summary: "Caterpie is a Bug-type larva that relies on a sweet scent to pacify enemies.",
    description:
      "Caterpie wriggles to mimic swaying leaves, using its antennae to release an aroma that keeps predators at bay while it munches on foliage.",
  },
  11: {
    summary: "Metapod stays motionless while its shell hardens, preparing for evolution.",
    description:
      "Its shell is tougher than it looks. Metapod endures harsh weather by tightening its internal muscles, storing energy for the moment it emerges.",
  },
  12: {
    summary: "Butterfree spreads powdery wings that scatter debilitating spores.",
    description:
      "Its wings beat rapidly, creating breezes that carry sleep-inducing spores toward opponents. Butterfree prefers blooming fields where nectar is plentiful.",
  },
  13: {
    summary: "Weedle is a dual Bug/Poison Pokémon with a sharp stinger on its head.",
    description:
      "Weedle burrows into tree bark to avoid predators. When threatened, it jabs with its venomous spike and quickly retreats deeper into the wood.",
  },
  14: {
    summary: "Kakuna hangs from branches while its shell hardens in preparation for evolution.",
    description:
      "Although seemingly immobile, Kakuna senses minute vibrations through its outer shell. If danger approaches, it stiffens its body to resist impact.",
  },
  15: {
    summary: "Beedrill swarms its foes using twin arm stingers and a venomous tail.",
    description:
      "Beedrill relies on teamwork, coordinating with the hive to corner targets. It darts forward in zigzags, striking with rapid stinger combos before darting away.",
  },
  16: {
    summary: "Pidgey is a calm Normal/Flying Pokémon that excels at scouting.",
    description:
      "Pidgey flaps quietly to stay aloft without alerting foes. It uses sharp eyesight to spot seeds or intruders from high above the treetops.",
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
