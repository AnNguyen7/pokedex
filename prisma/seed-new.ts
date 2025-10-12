/**
 * Optimized Pokémon Database Seeder
 * Reads from JSON files in prisma/data/
 *
 * Run: npm run db:seed
 */

import { PrismaClient, PokemonType } from "@prisma/client";
import { readFileSync } from "fs";
import { join } from "path";

const prisma = new PrismaClient();
const DATA_DIR = join(__dirname, "data");

// Type definitions
type PokemonData = {
  id: number;
  name: string;
  displayName: string;
  types: string[];
};

type BaseStats = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
};

type SpeciesData = {
  species: string;
  heightM: number;
  weightKg: number;
  catchRate: number;
};

type EVYield = {
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;
};

type AbilityInfo = {
  displayName: string;
  description: string;
};

type LoreData = {
  description?: string;
  summary?: string;
};

type PokemonSummary = {
  id: number;
  nationalDex: number;
  slug: string;
};

// Load JSON data files
function loadJSON<T>(filename: string): T {
  const path = join(DATA_DIR, filename);
  const content = readFileSync(path, "utf-8");
  return JSON.parse(content);
}

const POKEMON_LIST = loadJSON<PokemonData[]>("pokemon.json");
const BASE_STATS = loadJSON<Record<number, BaseStats>>("stats.json");
const SPECIES_DATA = loadJSON<Record<number, SpeciesData>>("species.json");
const EV_YIELDS = loadJSON<Record<number, EVYield>>("evYields.json");
const POKEMON_ABILITIES = loadJSON<Record<number, string[]>>("pokemonAbilities.json");
const ABILITY_INFO = loadJSON<Record<string, AbilityInfo>>("abilities.json");
const EVOLUTION_CHAINS = loadJSON<string[][]>("evolutionChains.json");
const LORE = loadJSON<Record<number, LoreData>>("lore.json");
const CRY_URLS = loadJSON<Record<number, string>>("cries.json"); // AnN added on 10/11/2025

function spriteUrls(nationalDex: number) {
  return {
    normal: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nationalDex}.png`,
    shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${nationalDex}.png`,
    animated: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${nationalDex}.gif`,
    fallback: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nationalDex}.png`,
  };
}

function mapPokemonType(type: string): PokemonType {
  return type.toUpperCase() as PokemonType;
}

async function seedPokemon(): Promise<Map<string, PokemonSummary>> {
  console.log("🎮 Seeding Pokémon...");

  const pokemonBySlug = new Map<string, PokemonSummary>();

  const operations = POKEMON_LIST.map((pokemon) => {
    const stats = BASE_STATS[pokemon.id] || {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
    };

    const species = SPECIES_DATA[pokemon.id];
    const evYield = EV_YIELDS[pokemon.id] || {
      hp: 0,
      attack: 0,
      defense: 0,
      spAtk: 0,
      spDef: 0,
      speed: 0,
    };
    const lore = LORE[pokemon.id] || {};
    const cryUrl = CRY_URLS[pokemon.id] || null; // AnN added on 10/11/2025

    return prisma.pokemon.upsert({
      where: { slug: pokemon.name },
      update: {
        displayName: pokemon.displayName,
        primaryType: mapPokemonType(pokemon.types[0]),
        secondaryType: pokemon.types[1] ? mapPokemonType(pokemon.types[1]) : null,
        spriteUrl: spriteUrls(pokemon.id).normal,
        cryUrl, // AnN added on 10/11/2025
        species: species?.species || null,
        heightM: species?.heightM || null,
        weightKg: species?.weightKg || null,
        catchRate: species?.catchRate || null,
        ...stats,
        evYieldHP: evYield.hp,
        evYieldAttack: evYield.attack,
        evYieldDefense: evYield.defense,
        evYieldSpAtk: evYield.spAtk,
        evYieldSpDef: evYield.spDef,
        evYieldSpeed: evYield.speed,
        summary: lore.summary || null,
        description: lore.description || null,
      },
      create: {
        nationalDex: pokemon.id,
        slug: pokemon.name,
        displayName: pokemon.displayName,
        primaryType: mapPokemonType(pokemon.types[0]),
        secondaryType: pokemon.types[1] ? mapPokemonType(pokemon.types[1]) : null,
        spriteUrl: spriteUrls(pokemon.id).normal,
        cryUrl, // AnN added on 10/11/2025
        species: species?.species || null,
        heightM: species?.heightM || null,
        weightKg: species?.weightKg || null,
        catchRate: species?.catchRate || null,
        ...stats,
        evYieldHP: evYield.hp,
        evYieldAttack: evYield.attack,
        evYieldDefense: evYield.defense,
        evYieldSpAtk: evYield.spAtk,
        evYieldSpDef: evYield.spDef,
        evYieldSpeed: evYield.speed,
        summary: lore.summary || null,
        description: lore.description || null,
      },
    });
  });

  const results = await Promise.all(operations);

  results.forEach((result) => {
    pokemonBySlug.set(result.slug, {
      id: result.id,
      nationalDex: result.nationalDex,
      slug: result.slug,
    });
  });

  console.log(`✅ Seeded ${pokemonBySlug.size} Pokémon`);
  return pokemonBySlug;
}

async function seedEvolutionChains(pokemonBySlug: Map<string, PokemonSummary>) {
  console.log("🔗 Seeding evolution chains...");

  for (const chain of EVOLUTION_CHAINS) {
    const chainSlug = chain.join("-");

    const evolutionChain = await prisma.evolutionChain.upsert({
      where: { slug: chainSlug },
      update: {},
      create: { slug: chainSlug },
    });

    await prisma.evolutionStage.deleteMany({ where: { chainId: evolutionChain.id } });

    const stageOps = chain.map((pokemonName, idx) => {
      const pokemon = pokemonBySlug.get(pokemonName);
      if (!pokemon) {
        console.warn(`⚠️  Pokémon "${pokemonName}" not found for evolution chain`);
        return null;
      }

      return prisma.evolutionStage.upsert({
        where: { pokemonId: pokemon.id },
        update: { order: idx, chainId: evolutionChain.id },
        create: { order: idx, chainId: evolutionChain.id, pokemonId: pokemon.id },
      });
    });

    await Promise.all(stageOps.filter((op): op is NonNullable<typeof op> => op !== null));
  }

  console.log(`✅ Seeded ${EVOLUTION_CHAINS.length} evolution chains`);
}

async function seedAbilities(): Promise<Map<string, number>> {
  console.log("🎯 Seeding abilities...");

  const abilityMap = new Map<string, number>();

  for (const [abilityName, info] of Object.entries(ABILITY_INFO)) {
    const ability = await prisma.ability.upsert({
      where: { name: abilityName },
      update: {
        displayName: info.displayName,
        description: info.description,
      },
      create: {
        name: abilityName,
        displayName: info.displayName,
        description: info.description,
      },
    });

    abilityMap.set(abilityName, ability.id);
  }

  console.log(`✅ Seeded ${abilityMap.size} abilities`);
  return abilityMap;
}

async function linkPokemonAbilities(
  pokemonBySlug: Map<string, PokemonSummary>,
  abilityMap: Map<string, number>
) {
  console.log("🔗 Linking Pokémon to abilities...");

  await prisma.pokemonAbility.deleteMany({});
  console.log("🗑️  Cleared old ability links");

  for (const [nationalDexStr, abilities] of Object.entries(POKEMON_ABILITIES)) {
    const nationalDex = parseInt(nationalDexStr);
    const pokemon = Array.from(pokemonBySlug.values()).find(
      (p) => p.nationalDex === nationalDex
    );

    if (!pokemon) {
      console.warn(`⚠️  Pokémon with dex #${nationalDex} not found`);
      continue;
    }

    for (let i = 0; i < abilities.length; i++) {
      const abilityName = abilities[i];
      const abilityId = abilityMap.get(abilityName);

      if (!abilityId) {
        console.warn(`⚠️  Ability "${abilityName}" not found`);
        continue;
      }

      // The last ability is considered "hidden" if there are multiple abilities
      const isHidden = i === abilities.length - 1 && abilities.length > 1;

      await prisma.pokemonAbility.create({
        data: {
          pokemonId: pokemon.id,
          abilityId: abilityId,
          isHidden,
        },
      });
    }
  }

  console.log("✅ Linked Pokémon to abilities");
}

async function main() {
  console.log("🌟 Starting database seed...\n");

  const pokemonBySlug = await seedPokemon();
  await seedEvolutionChains(pokemonBySlug);
  const abilityMap = await seedAbilities();
  await linkPokemonAbilities(pokemonBySlug, abilityMap);

  console.log("\n✨ Seed completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("❌ Seed failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
