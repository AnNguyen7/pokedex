/**
 * Fetch Pokémon data from PokeAPI and generate JSON files for seeding
 *
 * Usage: npx tsx scripts/fetch-pokemon-data.ts
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';
const DATA_DIR = join(process.cwd(), 'prisma', 'data');
const MAX_POKEMON = 649; // Gen 1-5: Gen 1 (1-151) + Gen 2 (152-251) + Gen 3 (252-386) + Gen 4 (387-493) + Gen 5 (494-649)

// Rate limiting to be nice to PokeAPI
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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

type EvolutionChain = string[];

async function fetchJSON(url: string): Promise<any> {
  console.log(`Fetching: ${url}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  return response.json();
}

function toDisplayName(name: string): string {
  // Handle special cases (Gen 1-5)
  const specialCases: Record<string, string> = {
    'nidoran-f': 'Nidoran♀',
    'nidoran-m': 'Nidoran♂',
    'mr-mime': 'Mr. Mime',
    'farfetchd': "Farfetch'd",
    'ho-oh': 'Ho-Oh',
    'porygon-z': 'Porygon-Z',
    'mime-jr': 'Mime Jr.',
    'type-null': 'Type: Null',
    'jangmo-o': 'Jangmo-o',
    'hakamo-o': 'Hakamo-o',
    'kommo-o': 'Kommo-o',
  };

  if (specialCases[name]) return specialCases[name];

  // Capitalize first letter of each word
  return name.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

async function fetchPokemon(id: number) {
  const pokemon = await fetchJSON(`${POKEAPI_BASE}/pokemon/${id}`);
  const species = await fetchJSON(pokemon.species.url);

  // Basic info
  const basicInfo: PokemonData = {
    id: pokemon.id,
    name: pokemon.name,
    displayName: toDisplayName(pokemon.name),
    types: pokemon.types.map((t: any) => t.type.name),
  };

  // Base stats
  const stats: BaseStats = {
    hp: pokemon.stats.find((s: any) => s.stat.name === 'hp')?.base_stat || 0,
    attack: pokemon.stats.find((s: any) => s.stat.name === 'attack')?.base_stat || 0,
    defense: pokemon.stats.find((s: any) => s.stat.name === 'defense')?.base_stat || 0,
    specialAttack: pokemon.stats.find((s: any) => s.stat.name === 'special-attack')?.base_stat || 0,
    specialDefense: pokemon.stats.find((s: any) => s.stat.name === 'special-defense')?.base_stat || 0,
    speed: pokemon.stats.find((s: any) => s.stat.name === 'speed')?.base_stat || 0,
  };

  // EV yields
  const evYield: EVYield = {
    hp: pokemon.stats.find((s: any) => s.stat.name === 'hp')?.effort || 0,
    attack: pokemon.stats.find((s: any) => s.stat.name === 'attack')?.effort || 0,
    defense: pokemon.stats.find((s: any) => s.stat.name === 'defense')?.effort || 0,
    spAtk: pokemon.stats.find((s: any) => s.stat.name === 'special-attack')?.effort || 0,
    spDef: pokemon.stats.find((s: any) => s.stat.name === 'special-defense')?.effort || 0,
    speed: pokemon.stats.find((s: any) => s.stat.name === 'speed')?.effort || 0,
  };

  // Species data
  const speciesName = species.genera.find((g: any) => g.language.name === 'en')?.genus || '';
  const speciesData: SpeciesData = {
    species: speciesName,
    heightM: pokemon.height / 10, // decimeters to meters
    weightKg: pokemon.weight / 10, // hectograms to kg
    catchRate: species.capture_rate,
  };

  // Abilities
  const abilities: string[] = pokemon.abilities
    .sort((a: any, b: any) => a.slot - b.slot)
    .map((a: any) => a.ability.name);

  // Flavor text (description)
  const flavorTextEntry = species.flavor_text_entries.find(
    (entry: any) => entry.language.name === 'en' && entry.version.name === 'gold'
  ) || species.flavor_text_entries.find(
    (entry: any) => entry.language.name === 'en'
  );

  const description = flavorTextEntry?.flavor_text.replace(/\n|\f/g, ' ') || '';

  // AnN added: Pokémon cries (audio URLs) on 10/11/2025
  const cryUrl = pokemon.cries?.latest ||
    `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`;

  return {
    basicInfo,
    stats,
    evYield,
    speciesData,
    abilities,
    description,
    cryUrl,  // AnN added on 10/11/2025
    evolutionChainUrl: species.evolution_chain?.url,
  };
}

async function fetchAbilityInfo(abilityName: string): Promise<AbilityInfo> {
  const ability = await fetchJSON(`${POKEAPI_BASE}/ability/${abilityName}`);

  const displayName = ability.names.find((n: any) => n.language.name === 'en')?.name ||
    toDisplayName(abilityName);

  const effectEntry = ability.effect_entries.find((e: any) => e.language.name === 'en');
  const description = effectEntry?.short_effect || effectEntry?.effect || 'No description available.';

  return { displayName, description };
}

async function fetchEvolutionChain(url: string): Promise<string[]> {
  const chain = await fetchJSON(url);

  const evolutionLine: string[] = [];

  function traverse(node: any) {
    evolutionLine.push(node.species.name);
    if (node.evolves_to && node.evolves_to.length > 0) {
      // For simplicity, take the first evolution path
      traverse(node.evolves_to[0]);
    }
  }

  traverse(chain.chain);
  return evolutionLine;
}

async function main() {
  console.log(`🚀 Fetching data for Pokémon 1-${MAX_POKEMON} from PokeAPI...`);

  // Create data directory
  mkdirSync(DATA_DIR, { recursive: true });

  const pokemonList: PokemonData[] = [];
  const statsMap: Record<number, BaseStats> = {};
  const speciesMap: Record<number, SpeciesData> = {};
  const evYieldMap: Record<number, EVYield> = {};
  const pokemonAbilitiesMap: Record<number, string[]> = {};
  const loreMap: Record<number, { description: string }> = {};
  const cryMap: Record<number, string> = {}; // AnN added: Cry URLs on 10/11/2025
  const allAbilities = new Set<string>();
  const evolutionChainUrls = new Map<string, string>();

  // Fetch all Pokémon data
  for (let id = 1; id <= MAX_POKEMON; id++) {
    try {
      const data = await fetchPokemon(id);

      pokemonList.push(data.basicInfo);
      statsMap[id] = data.stats;
      speciesMap[id] = data.speciesData;
      evYieldMap[id] = data.evYield;
      pokemonAbilitiesMap[id] = data.abilities;
      cryMap[id] = data.cryUrl; // AnN added on 10/11/2025

      if (data.description) {
        loreMap[id] = { description: data.description };
      }

      data.abilities.forEach(ability => allAbilities.add(ability));

      if (data.evolutionChainUrl) {
        evolutionChainUrls.set(data.basicInfo.name, data.evolutionChainUrl);
      }

      console.log(`✅ Fetched ${data.basicInfo.displayName} (#${id})`);

      // Rate limiting: wait 100ms between requests
      await delay(100);
    } catch (error) {
      console.error(`❌ Failed to fetch Pokémon #${id}:`, error);
    }
  }

  // Fetch ability information
  console.log(`\n🎯 Fetching ${allAbilities.size} abilities...`);
  const abilityInfoMap: Record<string, AbilityInfo> = {};

  for (const abilityName of allAbilities) {
    try {
      abilityInfoMap[abilityName] = await fetchAbilityInfo(abilityName);
      console.log(`✅ Fetched ability: ${abilityName}`);
      await delay(100);
    } catch (error) {
      console.error(`❌ Failed to fetch ability ${abilityName}:`, error);
    }
  }

  // Fetch evolution chains
  console.log(`\n🔗 Fetching evolution chains...`);
  const evolutionChains: EvolutionChain[] = [];
  const processedChainUrls = new Set<string>();

  for (const [pokemonName, chainUrl] of evolutionChainUrls) {
    if (processedChainUrls.has(chainUrl)) continue;

    try {
      const chain = await fetchEvolutionChain(chainUrl);
      // Only include chains where all members are in our range
      const allInRange = chain.every(name =>
        pokemonList.some(p => p.name === name)
      );

      if (allInRange && chain.length > 1) {
        evolutionChains.push(chain);
        processedChainUrls.add(chainUrl);
        console.log(`✅ Fetched evolution chain: ${chain.join(' → ')}`);
      }

      await delay(100);
    } catch (error) {
      console.error(`❌ Failed to fetch evolution chain for ${pokemonName}:`, error);
    }
  }

  // Save all data to JSON files
  console.log(`\n💾 Saving data to JSON files...`);

  writeFileSync(
    join(DATA_DIR, 'pokemon.json'),
    JSON.stringify(pokemonList, null, 2)
  );
  console.log(`✅ Saved pokemon.json (${pokemonList.length} Pokémon)`);

  writeFileSync(
    join(DATA_DIR, 'stats.json'),
    JSON.stringify(statsMap, null, 2)
  );
  console.log(`✅ Saved stats.json`);

  writeFileSync(
    join(DATA_DIR, 'species.json'),
    JSON.stringify(speciesMap, null, 2)
  );
  console.log(`✅ Saved species.json`);

  writeFileSync(
    join(DATA_DIR, 'evYields.json'),
    JSON.stringify(evYieldMap, null, 2)
  );
  console.log(`✅ Saved evYields.json`);

  writeFileSync(
    join(DATA_DIR, 'pokemonAbilities.json'),
    JSON.stringify(pokemonAbilitiesMap, null, 2)
  );
  console.log(`✅ Saved pokemonAbilities.json`);

  writeFileSync(
    join(DATA_DIR, 'abilities.json'),
    JSON.stringify(abilityInfoMap, null, 2)
  );
  console.log(`✅ Saved abilities.json (${allAbilities.size} abilities)`);

  writeFileSync(
    join(DATA_DIR, 'evolutionChains.json'),
    JSON.stringify(evolutionChains, null, 2)
  );
  console.log(`✅ Saved evolutionChains.json (${evolutionChains.length} chains)`);

  writeFileSync(
    join(DATA_DIR, 'lore.json'),
    JSON.stringify(loreMap, null, 2)
  );
  console.log(`✅ Saved lore.json`);

  // AnN added: Save cry URLs on 10/11/2025
  writeFileSync(
    join(DATA_DIR, 'cries.json'),
    JSON.stringify(cryMap, null, 2)
  );
  console.log(`✅ Saved cries.json (Pokémon cries/audio)`);

  console.log(`\n🎉 Data fetch complete! All JSON files saved to ${DATA_DIR}`);
  console.log(`\n📊 Summary:`);
  console.log(`   - ${pokemonList.length} Pokémon`);
  console.log(`   - ${allAbilities.size} Abilities`);
  console.log(`   - ${evolutionChains.length} Evolution Chains`);
  console.log(`   - ${Object.keys(cryMap).length} Pokémon Cries`); // AnN added on 10/11/2025
  console.log(`\nNext step: Run "npm run db:seed" to populate the database`);
}

main().catch(console.error);
