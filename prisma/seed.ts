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
  // Original 151 Kanto Pokémon Base Stats
  1: { hp: 45, attack: 49, defense: 49, specialAttack: 65, specialDefense: 65, speed: 45 }, // Bulbasaur
  2: { hp: 60, attack: 62, defense: 63, specialAttack: 80, specialDefense: 80, speed: 60 }, // Ivysaur
  3: { hp: 80, attack: 82, defense: 83, specialAttack: 100, specialDefense: 100, speed: 80 }, // Venusaur
  4: { hp: 39, attack: 52, defense: 43, specialAttack: 60, specialDefense: 50, speed: 65 }, // Charmander
  5: { hp: 58, attack: 64, defense: 58, specialAttack: 80, specialDefense: 65, speed: 80 }, // Charmeleon
  6: { hp: 78, attack: 84, defense: 78, specialAttack: 109, specialDefense: 85, speed: 100 }, // Charizard
  7: { hp: 44, attack: 48, defense: 65, specialAttack: 50, specialDefense: 64, speed: 43 }, // Squirtle
  8: { hp: 59, attack: 63, defense: 80, specialAttack: 65, specialDefense: 80, speed: 58 }, // Wartortle
  9: { hp: 79, attack: 83, defense: 100, specialAttack: 85, specialDefense: 105, speed: 78 }, // Blastoise
  10: { hp: 45, attack: 30, defense: 35, specialAttack: 20, specialDefense: 20, speed: 45 }, // Caterpie
  11: { hp: 50, attack: 20, defense: 55, specialAttack: 25, specialDefense: 25, speed: 30 }, // Metapod
  12: { hp: 60, attack: 45, defense: 50, specialAttack: 90, specialDefense: 80, speed: 70 }, // Butterfree
  13: { hp: 40, attack: 35, defense: 30, specialAttack: 20, specialDefense: 20, speed: 50 }, // Weedle
  14: { hp: 45, attack: 25, defense: 50, specialAttack: 25, specialDefense: 25, speed: 35 }, // Kakuna
  15: { hp: 65, attack: 90, defense: 40, specialAttack: 45, specialDefense: 80, speed: 75 }, // Beedrill
  16: { hp: 40, attack: 45, defense: 40, specialAttack: 35, specialDefense: 35, speed: 56 }, // Pidgey
  17: { hp: 63, attack: 60, defense: 55, specialAttack: 50, specialDefense: 50, speed: 71 }, // Pidgeotto
  18: { hp: 83, attack: 80, defense: 75, specialAttack: 70, specialDefense: 70, speed: 101 }, // Pidgeot
  19: { hp: 30, attack: 56, defense: 35, specialAttack: 25, specialDefense: 35, speed: 72 }, // Rattata
  20: { hp: 55, attack: 81, defense: 60, specialAttack: 50, specialDefense: 70, speed: 97 }, // Raticate
  21: { hp: 40, attack: 60, defense: 30, specialAttack: 31, specialDefense: 31, speed: 70 }, // Spearow
  22: { hp: 65, attack: 90, defense: 65, specialAttack: 61, specialDefense: 61, speed: 100 }, // Fearow
  23: { hp: 35, attack: 60, defense: 44, specialAttack: 40, specialDefense: 54, speed: 55 }, // Ekans
  24: { hp: 60, attack: 85, defense: 69, specialAttack: 65, specialDefense: 79, speed: 80 }, // Arbok
  25: { hp: 35, attack: 55, defense: 40, specialAttack: 50, specialDefense: 50, speed: 90 }, // Pikachu
  26: { hp: 60, attack: 90, defense: 55, specialAttack: 90, specialDefense: 80, speed: 110 }, // Raichu
  27: { hp: 50, attack: 75, defense: 85, specialAttack: 20, specialDefense: 30, speed: 40 }, // Sandshrew
  28: { hp: 75, attack: 100, defense: 110, specialAttack: 45, specialDefense: 55, speed: 65 }, // Sandslash
  29: { hp: 55, attack: 47, defense: 52, specialAttack: 40, specialDefense: 40, speed: 41 }, // Nidoran♀
  30: { hp: 70, attack: 62, defense: 67, specialAttack: 55, specialDefense: 55, speed: 56 }, // Nidorina
  31: { hp: 90, attack: 92, defense: 87, specialAttack: 75, specialDefense: 85, speed: 76 }, // Nidoqueen
  32: { hp: 46, attack: 57, defense: 40, specialAttack: 40, specialDefense: 40, speed: 50 }, // Nidoran♂
  33: { hp: 61, attack: 72, defense: 57, specialAttack: 55, specialDefense: 55, speed: 65 }, // Nidorino
  34: { hp: 81, attack: 102, defense: 77, specialAttack: 85, specialDefense: 75, speed: 85 }, // Nidoking
  35: { hp: 70, attack: 45, defense: 48, specialAttack: 60, specialDefense: 65, speed: 35 }, // Clefairy
  36: { hp: 95, attack: 70, defense: 73, specialAttack: 95, specialDefense: 90, speed: 60 }, // Clefable
  37: { hp: 38, attack: 41, defense: 40, specialAttack: 50, specialDefense: 65, speed: 65 }, // Vulpix
  38: { hp: 73, attack: 76, defense: 75, specialAttack: 81, specialDefense: 100, speed: 100 }, // Ninetales
  39: { hp: 115, attack: 45, defense: 20, specialAttack: 45, specialDefense: 25, speed: 20 }, // Jigglypuff
  40: { hp: 140, attack: 70, defense: 45, specialAttack: 85, specialDefense: 50, speed: 45 }, // Wigglytuff
  41: { hp: 40, attack: 45, defense: 35, specialAttack: 30, specialDefense: 40, speed: 55 }, // Zubat
  42: { hp: 75, attack: 80, defense: 70, specialAttack: 65, specialDefense: 75, speed: 90 }, // Golbat
  43: { hp: 45, attack: 50, defense: 55, specialAttack: 75, specialDefense: 65, speed: 30 }, // Oddish
  44: { hp: 60, attack: 65, defense: 70, specialAttack: 85, specialDefense: 75, speed: 40 }, // Gloom
  45: { hp: 75, attack: 80, defense: 85, specialAttack: 110, specialDefense: 90, speed: 50 }, // Vileplume
  46: { hp: 35, attack: 70, defense: 55, specialAttack: 45, specialDefense: 55, speed: 25 }, // Paras
  47: { hp: 60, attack: 95, defense: 80, specialAttack: 60, specialDefense: 80, speed: 30 }, // Parasect
  48: { hp: 60, attack: 55, defense: 50, specialAttack: 40, specialDefense: 55, speed: 45 }, // Venonat
  49: { hp: 70, attack: 65, defense: 60, specialAttack: 90, specialDefense: 75, speed: 90 }, // Venomoth
  50: { hp: 10, attack: 55, defense: 25, specialAttack: 35, specialDefense: 45, speed: 95 }, // Diglett
  51: { hp: 35, attack: 80, defense: 50, specialAttack: 50, specialDefense: 70, speed: 120 }, // Dugtrio
  52: { hp: 40, attack: 45, defense: 35, specialAttack: 40, specialDefense: 40, speed: 90 }, // Meowth
  53: { hp: 65, attack: 70, defense: 60, specialAttack: 65, specialDefense: 65, speed: 115 }, // Persian
  54: { hp: 50, attack: 52, defense: 48, specialAttack: 65, specialDefense: 50, speed: 55 }, // Psyduck
  55: { hp: 80, attack: 82, defense: 78, specialAttack: 95, specialDefense: 80, speed: 85 }, // Golduck
  56: { hp: 40, attack: 80, defense: 35, specialAttack: 35, specialDefense: 45, speed: 70 }, // Mankey
  57: { hp: 65, attack: 105, defense: 60, specialAttack: 60, specialDefense: 70, speed: 95 }, // Primeape
  58: { hp: 55, attack: 70, defense: 45, specialAttack: 70, specialDefense: 50, speed: 60 }, // Growlithe
  59: { hp: 90, attack: 110, defense: 80, specialAttack: 100, specialDefense: 80, speed: 95 }, // Arcanine
  60: { hp: 40, attack: 50, defense: 40, specialAttack: 40, specialDefense: 40, speed: 90 }, // Poliwag
  61: { hp: 65, attack: 65, defense: 65, specialAttack: 50, specialDefense: 50, speed: 90 }, // Poliwhirl
  62: { hp: 90, attack: 95, defense: 95, specialAttack: 70, specialDefense: 90, speed: 70 }, // Poliwrath
  63: { hp: 25, attack: 20, defense: 15, specialAttack: 105, specialDefense: 55, speed: 90 }, // Abra
  64: { hp: 40, attack: 35, defense: 30, specialAttack: 120, specialDefense: 70, speed: 105 }, // Kadabra
  65: { hp: 55, attack: 50, defense: 45, specialAttack: 135, specialDefense: 95, speed: 120 }, // Alakazam
  66: { hp: 70, attack: 80, defense: 50, specialAttack: 35, specialDefense: 35, speed: 35 }, // Machop
  67: { hp: 80, attack: 100, defense: 70, specialAttack: 50, specialDefense: 60, speed: 45 }, // Machoke
  68: { hp: 90, attack: 130, defense: 80, specialAttack: 65, specialDefense: 85, speed: 55 }, // Machamp
  69: { hp: 50, attack: 75, defense: 35, specialAttack: 70, specialDefense: 30, speed: 40 }, // Bellsprout
  70: { hp: 65, attack: 90, defense: 50, specialAttack: 85, specialDefense: 45, speed: 55 }, // Weepinbell
  71: { hp: 80, attack: 105, defense: 65, specialAttack: 100, specialDefense: 70, speed: 70 }, // Victreebel
  72: { hp: 40, attack: 40, defense: 35, specialAttack: 50, specialDefense: 100, speed: 70 }, // Tentacool
  73: { hp: 80, attack: 70, defense: 65, specialAttack: 80, specialDefense: 120, speed: 100 }, // Tentacruel
  74: { hp: 40, attack: 80, defense: 100, specialAttack: 30, specialDefense: 30, speed: 20 }, // Geodude
  75: { hp: 55, attack: 95, defense: 115, specialAttack: 45, specialDefense: 45, speed: 35 }, // Graveler
  76: { hp: 80, attack: 120, defense: 130, specialAttack: 55, specialDefense: 65, speed: 45 }, // Golem
  77: { hp: 50, attack: 85, defense: 55, specialAttack: 65, specialDefense: 65, speed: 90 }, // Ponyta
  78: { hp: 65, attack: 100, defense: 70, specialAttack: 80, specialDefense: 80, speed: 105 }, // Rapidash
  79: { hp: 90, attack: 65, defense: 65, specialAttack: 40, specialDefense: 40, speed: 15 }, // Slowpoke
  80: { hp: 95, attack: 75, defense: 110, specialAttack: 100, specialDefense: 80, speed: 30 }, // Slowbro
  81: { hp: 25, attack: 35, defense: 70, specialAttack: 95, specialDefense: 55, speed: 45 }, // Magnemite
  82: { hp: 50, attack: 60, defense: 95, specialAttack: 120, specialDefense: 70, speed: 70 }, // Magneton
  83: { hp: 52, attack: 65, defense: 55, specialAttack: 58, specialDefense: 62, speed: 60 }, // Farfetch'd
  84: { hp: 35, attack: 85, defense: 45, specialAttack: 35, specialDefense: 35, speed: 75 }, // Doduo
  85: { hp: 60, attack: 110, defense: 70, specialAttack: 60, specialDefense: 60, speed: 100 }, // Dodrio
  86: { hp: 65, attack: 45, defense: 55, specialAttack: 45, specialDefense: 70, speed: 45 }, // Seel
  87: { hp: 90, attack: 70, defense: 80, specialAttack: 70, specialDefense: 95, speed: 70 }, // Dewgong
  88: { hp: 80, attack: 80, defense: 50, specialAttack: 40, specialDefense: 50, speed: 25 }, // Grimer
  89: { hp: 105, attack: 105, defense: 75, specialAttack: 65, specialDefense: 100, speed: 50 }, // Muk
  90: { hp: 30, attack: 65, defense: 100, specialAttack: 45, specialDefense: 25, speed: 40 }, // Shellder
  91: { hp: 50, attack: 95, defense: 180, specialAttack: 85, specialDefense: 45, speed: 70 }, // Cloyster
  92: { hp: 30, attack: 35, defense: 30, specialAttack: 100, specialDefense: 35, speed: 80 }, // Gastly
  93: { hp: 45, attack: 50, defense: 45, specialAttack: 115, specialDefense: 55, speed: 95 }, // Haunter
  94: { hp: 60, attack: 65, defense: 60, specialAttack: 130, specialDefense: 75, speed: 110 }, // Gengar
  95: { hp: 35, attack: 45, defense: 160, specialAttack: 30, specialDefense: 45, speed: 70 }, // Onix
  96: { hp: 60, attack: 48, defense: 45, specialAttack: 43, specialDefense: 90, speed: 42 }, // Drowzee
  97: { hp: 85, attack: 73, defense: 70, specialAttack: 73, specialDefense: 115, speed: 67 }, // Hypno
  98: { hp: 30, attack: 105, defense: 90, specialAttack: 25, specialDefense: 25, speed: 50 }, // Krabby
  99: { hp: 55, attack: 130, defense: 115, specialAttack: 50, specialDefense: 50, speed: 75 }, // Kingler
  100: { hp: 40, attack: 30, defense: 50, specialAttack: 55, specialDefense: 55, speed: 100 }, // Voltorb
  101: { hp: 60, attack: 50, defense: 70, specialAttack: 80, specialDefense: 80, speed: 140 }, // Electrode
  102: { hp: 60, attack: 40, defense: 80, specialAttack: 60, specialDefense: 45, speed: 40 }, // Exeggcute
  103: { hp: 95, attack: 95, defense: 85, specialAttack: 125, specialDefense: 75, speed: 55 }, // Exeggutor
  104: { hp: 50, attack: 50, defense: 95, specialAttack: 40, specialDefense: 50, speed: 35 }, // Cubone
  105: { hp: 60, attack: 80, defense: 110, specialAttack: 50, specialDefense: 80, speed: 45 }, // Marowak
  106: { hp: 50, attack: 120, defense: 53, specialAttack: 35, specialDefense: 110, speed: 87 }, // Hitmonlee
  107: { hp: 50, attack: 105, defense: 79, specialAttack: 35, specialDefense: 110, speed: 76 }, // Hitmonchan
  108: { hp: 90, attack: 55, defense: 75, specialAttack: 60, specialDefense: 75, speed: 30 }, // Lickitung
  109: { hp: 40, attack: 65, defense: 95, specialAttack: 60, specialDefense: 45, speed: 35 }, // Koffing
  110: { hp: 65, attack: 90, defense: 120, specialAttack: 85, specialDefense: 70, speed: 60 }, // Weezing
  111: { hp: 80, attack: 85, defense: 95, specialAttack: 30, specialDefense: 30, speed: 25 }, // Rhyhorn
  112: { hp: 105, attack: 130, defense: 120, specialAttack: 45, specialDefense: 45, speed: 40 }, // Rhydon
  113: { hp: 250, attack: 5, defense: 5, specialAttack: 35, specialDefense: 105, speed: 50 }, // Chansey
  114: { hp: 65, attack: 55, defense: 115, specialAttack: 100, specialDefense: 40, speed: 60 }, // Tangela
  115: { hp: 105, attack: 95, defense: 80, specialAttack: 40, specialDefense: 80, speed: 90 }, // Kangaskhan
  116: { hp: 35, attack: 40, defense: 70, specialAttack: 50, specialDefense: 25, speed: 60 }, // Horsea
  117: { hp: 55, attack: 65, defense: 95, specialAttack: 95, specialDefense: 45, speed: 85 }, // Seadra
  118: { hp: 45, attack: 67, defense: 60, specialAttack: 35, specialDefense: 50, speed: 63 }, // Goldeen
  119: { hp: 80, attack: 92, defense: 65, specialAttack: 65, specialDefense: 80, speed: 68 }, // Seaking
  120: { hp: 30, attack: 45, defense: 55, specialAttack: 70, specialDefense: 55, speed: 85 }, // Staryu
  121: { hp: 60, attack: 75, defense: 85, specialAttack: 100, specialDefense: 85, speed: 115 }, // Starmie
  122: { hp: 40, attack: 45, defense: 65, specialAttack: 100, specialDefense: 120, speed: 90 }, // Mr. Mime
  123: { hp: 70, attack: 110, defense: 80, specialAttack: 55, specialDefense: 80, speed: 105 }, // Scyther
  124: { hp: 65, attack: 50, defense: 35, specialAttack: 115, specialDefense: 95, speed: 95 }, // Jynx
  125: { hp: 65, attack: 83, defense: 57, specialAttack: 95, specialDefense: 85, speed: 105 }, // Electabuzz
  126: { hp: 65, attack: 95, defense: 57, specialAttack: 100, specialDefense: 85, speed: 93 }, // Magmar
  127: { hp: 65, attack: 125, defense: 100, specialAttack: 55, specialDefense: 70, speed: 85 }, // Pinsir
  128: { hp: 75, attack: 100, defense: 95, specialAttack: 40, specialDefense: 70, speed: 110 }, // Tauros
  129: { hp: 20, attack: 10, defense: 55, specialAttack: 15, specialDefense: 20, speed: 80 }, // Magikarp
  130: { hp: 95, attack: 125, defense: 79, specialAttack: 60, specialDefense: 100, speed: 81 }, // Gyarados
  131: { hp: 130, attack: 85, defense: 80, specialAttack: 85, specialDefense: 95, speed: 60 }, // Lapras
  132: { hp: 48, attack: 48, defense: 48, specialAttack: 48, specialDefense: 48, speed: 48 }, // Ditto
  133: { hp: 55, attack: 55, defense: 50, specialAttack: 45, specialDefense: 65, speed: 55 }, // Eevee
  134: { hp: 130, attack: 65, defense: 60, specialAttack: 110, specialDefense: 95, speed: 65 }, // Vaporeon
  135: { hp: 65, attack: 65, defense: 60, specialAttack: 110, specialDefense: 95, speed: 130 }, // Jolteon
  136: { hp: 65, attack: 130, defense: 60, specialAttack: 95, specialDefense: 110, speed: 65 }, // Flareon
  137: { hp: 65, attack: 60, defense: 70, specialAttack: 85, specialDefense: 75, speed: 40 }, // Porygon
  138: { hp: 35, attack: 40, defense: 100, specialAttack: 90, specialDefense: 55, speed: 35 }, // Omanyte
  139: { hp: 70, attack: 60, defense: 125, specialAttack: 115, specialDefense: 70, speed: 55 }, // Omastar
  140: { hp: 30, attack: 80, defense: 90, specialAttack: 55, specialDefense: 45, speed: 55 }, // Kabuto
  141: { hp: 60, attack: 115, defense: 105, specialAttack: 65, specialDefense: 70, speed: 80 }, // Kabutops
  142: { hp: 80, attack: 105, defense: 65, specialAttack: 60, specialDefense: 75, speed: 130 }, // Aerodactyl
  143: { hp: 160, attack: 110, defense: 65, specialAttack: 65, specialDefense: 110, speed: 30 }, // Snorlax
  144: { hp: 90, attack: 85, defense: 100, specialAttack: 95, specialDefense: 125, speed: 85 }, // Articuno
  145: { hp: 90, attack: 90, defense: 85, specialAttack: 125, specialDefense: 90, speed: 100 }, // Zapdos
  146: { hp: 90, attack: 100, defense: 90, specialAttack: 125, specialDefense: 85, speed: 90 }, // Moltres
  147: { hp: 41, attack: 64, defense: 45, specialAttack: 50, specialDefense: 50, speed: 50 }, // Dratini
  148: { hp: 61, attack: 84, defense: 65, specialAttack: 70, specialDefense: 70, speed: 70 }, // Dragonair
  149: { hp: 91, attack: 134, defense: 95, specialAttack: 100, specialDefense: 100, speed: 80 }, // Dragonite
  150: { hp: 106, attack: 150, defense: 70, specialAttack: 194, specialDefense: 120, speed: 140 }, // Mewtwo
  151: { hp: 100, attack: 100, defense: 100, specialAttack: 100, specialDefense: 100, speed: 100 }, // Mew
};

type PokemonSummary = {
  id: number;
  slug: string;
  displayName: string;
};

const EVOLUTION_GROUPS: string[][] = [
  // Starter evolutions
  ["bulbasaur", "ivysaur", "venusaur"],
  ["charmander", "charmeleon", "charizard"],
  ["squirtle", "wartortle", "blastoise"],
  
  // Bug evolutions
  ["caterpie", "metapod", "butterfree"],
  ["weedle", "kakuna", "beedrill"],
  
  // Bird evolutions
  ["pidgey", "pidgeotto", "pidgeot"],
  ["spearow", "fearow"],
  
  // Normal evolutions
  ["rattata", "raticate"],
  
  // Poison evolutions
  ["ekans", "arbok"],
  
  // Electric evolutions
  ["pikachu", "raichu"],
  
  // Ground evolutions
  ["sandshrew", "sandslash"],
  
  // Nidoran evolutions
  ["nidoran-f", "nidorina", "nidoqueen"],
  ["nidoran-m", "nidorino", "nidoking"],
  
  // Fairy evolutions
  ["clefairy", "clefable"],
  
  // Fire evolutions
  ["vulpix", "ninetales"],
  
  // Normal/Fairy evolutions
  ["jigglypuff", "wigglytuff"],
  
  // Poison/Flying evolutions
  ["zubat", "golbat"],
  
  // Grass/Poison evolutions
  ["oddish", "gloom", "vileplume"],
  ["bellsprout", "weepinbell", "victreebel"],
  
  // Bug/Grass evolutions
  ["paras", "parasect"],
  
  // Bug/Poison evolutions
  ["venonat", "venomoth"],
  
  // Ground evolutions
  ["diglett", "dugtrio"],
  
  // Normal evolutions
  ["meowth", "persian"],
  
  // Water evolutions
  ["psyduck", "golduck"],
  
  // Fighting evolutions
  ["mankey", "primeape"],
  
  // Fire evolutions
  ["growlithe", "arcanine"],
  
  // Water evolutions
  ["poliwag", "poliwhirl", "poliwrath"],
  
  // Psychic evolutions
  ["abra", "kadabra", "alakazam"],
  
  // Fighting evolutions
  ["machop", "machoke", "machamp"],
  
  // Water/Poison evolutions
  ["tentacool", "tentacruel"],
  
  // Rock/Ground evolutions
  ["geodude", "graveler", "golem"],
  
  // Fire evolutions
  ["ponyta", "rapidash"],
  
  // Water/Psychic evolutions
  ["slowpoke", "slowbro"],
  
  // Electric/Steel evolutions
  ["magnemite", "magneton"],
  
  // Single-stage Pokémon
  ["farfetchd"],
  
  // Normal/Flying evolutions
  ["doduo", "dodrio"],
  
  // Water evolutions
  ["seel", "dewgong"],
  
  // Poison evolutions
  ["grimer", "muk"],
  
  // Water evolutions
  ["shellder", "cloyster"],
  
  // Ghost/Poison evolutions
  ["gastly", "haunter", "gengar"],
  
  // Single-stage Pokémon
  ["onix"],
  
  // Psychic evolutions
  ["drowzee", "hypno"],
  
  // Water evolutions
  ["krabby", "kingler"],
  
  // Electric evolutions
  ["voltorb", "electrode"],
  
  // Grass/Psychic evolutions
  ["exeggcute", "exeggutor"],
  
  // Ground evolutions
  ["cubone", "marowak"],
  
  // Single-stage Fighting
  ["hitmonlee"],
  ["hitmonchan"],
  
  // Single-stage Normal
  ["lickitung"],
  
  // Poison evolutions
  ["koffing", "weezing"],
  
  // Ground/Rock evolutions
  ["rhyhorn", "rhydon"],
  
  // Single-stage Pokémon
  ["chansey"],
  ["tangela"],
  ["kangaskhan"],
  
  // Water evolutions
  ["horsea", "seadra"],
  ["goldeen", "seaking"],
  ["staryu", "starmie"],
  
  // Single-stage Pokémon
  ["mr-mime"],
  ["scyther"],
  ["jynx"],
  ["electabuzz"],
  ["magmar"],
  ["pinsir"],
  ["tauros"],
  
  // Water evolutions
  ["magikarp", "gyarados"],
  
  // Single-stage Pokémon
  ["lapras"],
  ["ditto"],
  
  // Eevee evolutions
  ["eevee", "vaporeon"],
  ["eevee", "jolteon"],
  ["eevee", "flareon"],
  
  // Single-stage Pokémon
  ["porygon"],
  
  // Rock/Water evolutions
  ["omanyte", "omastar"],
  ["kabuto", "kabutops"],
  
  // Single-stage Pokémon
  ["aerodactyl"],
  ["snorlax"],
  
  // Legendary birds
  ["articuno"],
  ["zapdos"],
  ["moltres"],
  
  // Dragon evolutions
  ["dratini", "dragonair", "dragonite"],
  
  // Legendary Pokémon
  ["mewtwo"],
  ["mew"],
];

const LORE: Record<number, Partial<{ summary: string; description: string }>> = {
  1: { summary: "Bulbasaur carries a seed on its back that grows as it does.", description: "The bulb absorbs sunlight and converts it into energy. It can go days without eating if it has enough sun." },
  2: { summary: "Ivysaur's bulb has grown larger and begun to bloom.", description: "When the bulb is ready to bloom, it gives off a sweet aroma and the Pokémon gains more power." },
  3: { summary: "Venusaur's flower blooms when it absorbs solar energy.", description: "Its flower releases a soothing scent that calms aggressive Pokémon. It can spread pollen that causes allergies." },
  4: { summary: "Charmander's tail flame indicates its life force and emotions.", description: "If the flame goes out, Charmander dies. It prefers hot places and can't survive in rain without shelter." },
  5: { summary: "Charmeleon has a savage nature and seeks strong opponents.", description: "Its claws are sharp and powerful. When excited in battle, it breathes intense flames that can melt anything." },
  6: { summary: "Charizard can fly up to 4,600 feet and breathe fire hot enough to melt boulders.", description: "Despite its fearsome appearance, it will never turn its flames on a weaker opponent. It seeks aerial battles." },
  7: { summary: "Squirtle's shell provides excellent protection and helps it swim faster.", description: "When it retracts into its shell, it can withstand any attack. It can shoot water with enough force to pierce steel." },
  8: { summary: "Wartortle's furry tail is a symbol of longevity.", description: "Its tail becomes increasingly fluffy with age. It can swim at high speeds using its tail as a rudder." },
  9: { summary: "Blastoise has water cannons on its shell that can pierce thick steel.", description: "It deliberately makes itself heavy to withstand the recoil of firing its cannons. It can crush stone with its weight." },
  10: { summary: "Caterpie has a voracious appetite and can eat leaves larger than itself.", description: "Its feet have suction cups that let it climb on any surface. It releases a stench from its antenna to repel enemies." },
  11: { summary: "Metapod hardens its shell to protect itself while preparing to evolve.", description: "It is virtually immobile and vulnerable to attack. Inside, it is soft and preparing for its transformation." },
  12: { summary: "Butterfree loves nectar and can locate flower patches miles away.", description: "Its wings are covered with poisonous powder that repels water. It flaps its wings to spread toxic scales." },
  13: { summary: "Weedle has a sharp stinger on its head that injects powerful poison.", description: "It eats its weight in leaves every day. Its bright coloring warns predators of its poisonous nature." },
  14: { summary: "Kakuna remains virtually motionless while preparing to evolve.", description: "It can't move on its own and waits for evolution. If attacked, it hardens its shell to protect its soft body inside." },
  15: { summary: "Beedrill is extremely territorial and attacks in swarms.", description: "It has three poisonous stingers on its body. It can fly at high speed and attack from any direction." },
  16: { summary: "Pidgey is docile and prefers to avoid conflict.", description: "It has an excellent sense of direction and can always find its way home. It kicks up sand to protect itself." },
  17: { summary: "Pidgeotto claims a large territory and patrols it constantly.", description: "It has strong talons that can crush prey. It flies around its territory to keep watch for intruders." },
  18: { summary: "Pidgeot can fly at Mach 2 speed when hunting.", description: "Its beautiful glossy feathers are prized by many. It spreads its gorgeous wings to intimidate enemies." },
  19: { summary: "Rattata can live anywhere and has very strong teeth.", description: "Its fangs grow constantly, so it gnaws on hard objects to keep them filed down. It's very cautious and wary." },
  20: { summary: "Raticate's teeth grow continuously throughout its life.", description: "Its whiskers help it maintain balance. It uses its webbed feet to swim across rivers in search of food." },
  21: { summary: "Spearow has a loud cry that can be heard over half a mile away.", description: "It flaps its short wings busily to stay aloft. It's very territorial and aggressive toward intruders." },
  22: { summary: "Fearow has the stamina to fly all day on its large wings.", description: "Its long neck and beak are perfect for catching prey in soil or water. It's been known to carry off Exeggcute." },
  23: { summary: "Ekans moves silently through grass by slithering and winding.", description: "It can unhinge its jaw to swallow large prey whole. The pattern on its belly differs by region." },
  24: { summary: "Arbok intimidates foes with the frightening patterns on its hood.", description: "The pattern on its belly is said to be a terrifying face. It can crush a steel oil drum with its body." },
  25: { summary: "Pikachu stores electricity in its cheeks and releases it through its tail.", description: "When several gather, their electricity can cause lightning storms. It raises its tail to check its surroundings." },
  26: { summary: "Raichu's electricity can knock out an Indian elephant.", description: "If it stores too much electricity, it can become aggressive. It discharges through its tail to stay balanced." },
  27: { summary: "Sandshrew burrows deep underground in arid locations.", description: "It can curl into a ball to protect itself from attacks. Its body is dry and hard, perfect for desert life." },
  28: { summary: "Sandslash can curl into a ball and roll at high speed.", description: "Its sharp claws are its primary weapons. It digs burrows in the ground to sleep and hide from enemies." },
  29: { summary: "Nidoran♀ is small but has a highly developed sense of smell.", description: "Its horn contains a mild poison. It's docile but will fight fiercely to protect its young." },
  30: { summary: "Nidorina's horn grows slowly and is used for self-defense.", description: "When with its friends, it keeps its barbs tucked away. It becomes nervous when separated from its group." },
  31: { summary: "Nidoqueen's body is covered in hard scales that serve as armor.", description: "It uses its powerful body to protect its young. Its tail can smash through a steel bar like a matchstick." },
  32: { summary: "Nidoran♂ has large ears that can move independently.", description: "Its horn contains venom. The larger its ears, the more powerful its poison becomes." },
  33: { summary: "Nidorino's horn is harder than diamond and can shatter anything.", description: "It's easily agitated and will charge at anything that moves. Its horn injects a powerful poison." },
  34: { summary: "Nidoking's tail is powerful enough to snap a telephone pole.", description: "One swing of its mighty tail can snap a telephone pole as if it were a matchstick. It's known for its violent nature." },
  35: { summary: "Clefairy is said to store moonlight in its wings.", description: "It's adorable appearance makes it popular as a pet. It uses its magical powers to float in midair." },
  36: { summary: "Clefable has acute hearing that can detect a pin drop a mile away.", description: "It's very shy and rarely shows itself to humans. Its fairy-like appearance is enchanting to behold." },
  37: { summary: "Vulpix is born with one white tail that splits into six as it grows.", description: "Inside its body burns a flame that never goes out. It can control fire to create ghostly flames." },
  38: { summary: "Ninetales is said to live for 1,000 years.", description: "Each of its tails contains a different mystical power. It can understand human speech and is highly intelligent." },
  39: { summary: "Jigglypuff's song can put anyone to sleep.", description: "Its vocal cords can freely adjust the wavelength of its voice. It gets angry if interrupted while singing." },
  40: { summary: "Wigglytuff has extremely fine fur that's pleasant to touch.", description: "Its body is soft and rubbery. When angered, it inflates its body to an enormous size." },
  41: { summary: "Zubat has no eyes and uses ultrasonic waves to navigate.", description: "It forms colonies in dark places. During the day, it hangs from cave ceilings to sleep." },
  42: { summary: "Golbat drinks the blood of living creatures.", description: "Once it bites, it won't let go until it's full. It flies silently through the darkness." },
  43: { summary: "Oddish buries itself in soil during the day and moves at night.", description: "The more fertile the soil, the glossier its leaves become. It spreads its leaves to absorb moonlight." },
  44: { summary: "Gloom drools a sticky nectar that smells incredibly foul.", description: "The smell is so strong it can cause fainting. Only one in a thousand people enjoy the scent." },
  45: { summary: "Vileplume has the world's largest petals.", description: "The larger its petals, the more toxic pollen it contains. It shakes its petals to scatter clouds of poison." },
  46: { summary: "Paras has mushrooms called tochukaso growing on its back.", description: "The mushrooms grow by drawing nutrients from the bug. They're valued as medicine in some regions." },
  47: { summary: "Parasect is controlled by the mushroom on its back.", description: "The bug host is drained of energy by the mushroom. It prefers damp places and scatters toxic spores." },
  48: { summary: "Venonat's large eyes act as radar in the dark.", description: "Its eyes are covered with a thin layer of film. It uses its antennae to detect danger." },
  49: { summary: "Venomoth's wings scatter poisonous dust with every flap.", description: "The dust is highly toxic and can cause paralysis. It's attracted to light and gathers at street lamps." },
  50: { summary: "Diglett lives about one yard underground.", description: "It burrows through the ground at a shallow depth. It leaves raised earth in its wake, making it easy to spot." },
  51: { summary: "Dugtrio are actually triplets that emerged from one body.", description: "They work cooperatively to burrow endlessly. They trigger earthquakes by digging at high speed." },
  52: { summary: "Meowth loves round and shiny objects.", description: "It wanders the streets at night to pick up coins and other shiny objects. It washes its face regularly to keep its coin clean." },
  53: { summary: "Persian has six bold whiskers that sense air movements.", description: "It's highly regarded for its fur. Many adore it for its elegant appearance and refined movements." },
  54: { summary: "Psyduck suffers from chronic headaches.", description: "When its headache intensifies, it uses mysterious powers. It has no recollection of using these powers." },
  55: { summary: "Golduck is the fastest swimmer among all Pokémon.", description: "It appears by waterways at dusk. It can outswim world-class swimmers with its webbed limbs." },
  56: { summary: "Mankey lives in treetops and is extremely aggressive.", description: "When it becomes angry, it can't distinguish friends from foes. It calms down only when no one is around." },
  57: { summary: "Primeape is always furiously angry.", description: "If approached while asleep, it will awaken and angrily give chase. It will never stop chasing its target." },
  58: { summary: "Growlithe has a keen sense of smell and never forgets a scent.", description: "It's very friendly and loyal to its Trainer. It barks to drive off intruders from its territory." },
  59: { summary: "Arcanine is known for its speed and majesty.", description: "It can run 6,200 miles in a single day and night. Its magnificent bark conveys a sense of majesty." },
  60: { summary: "Poliwag's skin is so thin you can see its spiral intestines.", description: "Its newly grown legs prevent it from running fast. It's more at home in water than on land." },
  61: { summary: "Poliwhirl can live on land but prefers water.", description: "Its body is always wet with a slimy fluid. The spiral on its belly subtly undulates." },
  62: { summary: "Poliwrath is an expert swimmer that uses all its muscles.", description: "Its highly developed muscles never tire. It can swim back and forth across the Pacific Ocean." },
  63: { summary: "Abra sleeps 18 hours a day and teleports to escape danger.", description: "It senses danger with its ESP even while sleeping. It teleports away the instant it senses danger." },
  64: { summary: "Kadabra emits alpha waves strong enough to cause headaches.", description: "It happened one morning when a boy with extrasensory powers woke up transformed into Kadabra." },
  65: { summary: "Alakazam's brain continually grows, making its head too heavy.", description: "Its IQ exceeds 5,000. It remembers everything that ever happens to it from birth." },
  66: { summary: "Machop's body is so powerful it must wear a belt to control its strength.", description: "It trains by lifting Graveler every day. It can hurl a hundred adult humans with ease." },
  67: { summary: "Machoke's muscles are as hard as steel.", description: "It wears a belt to keep its overwhelming power under control. Without it, it would be unstoppable." },
  68: { summary: "Machamp has four powerful arms that can launch 1,000 punches per second.", description: "Its four arms move faster than the eye can follow. One arm can move a mountain." },
  69: { summary: "Bellsprout's thin body sways to avoid attacks.", description: "Its bud looks like a human face. It's said to have been mistaken for a human child in the past." },
  70: { summary: "Weepinbell spits out a fluid that dissolves anything.", description: "It hangs from branches and waits for prey. When prey comes near, it sprays poison powder." },
  71: { summary: "Victreebel lures prey with sweet honey.", description: "It swallows anything that moves. Its prey is dissolved by strong acids in its stomach." },
  72: { summary: "Tentacool's body is almost entirely water.", description: "Its eyes can fire mysterious beams. It drifts in shallow seas and catches prey with its tentacles." },
  73: { summary: "Tentacruel has 80 tentacles that move freely.", description: "It extends its tentacles to ensnare prey. Its tentacles absorb water and stretch almost endlessly." },
  74: { summary: "Geodude is often stepped on because it looks like a rock.", description: "It climbs mountain paths using only its arms. People often trip over them while hiking." },
  75: { summary: "Graveler rolls down mountains to move.", description: "It grows by feeding on rocks. It eats a ton of rocks daily and prefers rough surfaces." },
  76: { summary: "Golem's body is as hard as diamond.", description: "It sheds its skin once a year. The discarded shell immediately hardens and crumbles away." },
  77: { summary: "Ponyta's hooves are harder than diamond.", description: "Its mane of fire burns more intensely when it's angry. It can jump over the Eiffel Tower." },
  78: { summary: "Rapidash can reach speeds of 150 mph.", description: "It usually canters casually but can reach extreme speeds in seconds. It loves to run." },
  79: { summary: "Slowpoke is incredibly slow and dopey.", description: "It takes five seconds to feel pain. It's oblivious to most things and spaces out constantly." },
  80: { summary: "Slowbro became a Slowpoke when a Shellder bit its tail.", description: "The Shellder on its tail feeds on leftover scraps. If the Shellder falls off, it devolves." },
  81: { summary: "Magnemite floats using electromagnetic waves.", description: "It's attracted to anything that emits electromagnetic waves. It can disable electronics by approaching them." },
  82: { summary: "Magneton is formed by three Magnemite linking together.", description: "It generates powerful radio waves that raise temperatures by 3.6 degrees within a mile." },
  83: { summary: "Farfetch'd always carries a leek stalk.", description: "It can't live without its leek. It will defend the stalk with its life and uses it as a weapon." },
  84: { summary: "Doduo's two heads never sleep at the same time.", description: "One head watches for enemies while the other sleeps. It can run at 60 mph." },
  85: { summary: "Dodrio has three heads that represent joy, sorrow, and anger.", description: "One of its heads is always awake to watch for danger. It can run at 40 mph." },
  86: { summary: "Seel loves freezing cold water.", description: "The colder it gets, the better it feels. It can swim at 8 knots through icy waters." },
  87: { summary: "Dewgong stores thermal energy in its body.", description: "It loves beautiful icebergs. It swims elegantly in frigid seas and can withstand temperatures of -40°F." },
  88: { summary: "Grimer was born from sludge in a polluted stream.", description: "It thrives by sucking up polluted sludge. Its body is toxic and emits a foul odor." },
  89: { summary: "Muk's body contains toxic elements.", description: "It's so toxic that even its footprints contain poison. Plants wilt and die wherever it passes." },
  90: { summary: "Shellder's shell is harder than diamond.", description: "It swims backward by opening and closing its shell. It clamps down on prey with its shell." },
  91: { summary: "Cloyster's shell is extremely hard and can repel any attack.", description: "Its shell can withstand a bomb blast. It shoots spikes from its shell to attack." },
  92: { summary: "Gastly is formed from poisonous gas.", description: "It can envelop an opponent of any size within its gaseous body. It can topple an Indian elephant in two seconds." },
  93: { summary: "Haunter hides in darkness and licks victims with its gaseous tongue.", description: "Its tongue is made of gas. If licked, the victim starts shaking constantly until death." },
  94: { summary: "Gengar hides in shadows and drops room temperature by 10 degrees.", description: "It's said to emerge from darkness to steal the lives of those who get lost in mountains." },
  95: { summary: "Onix burrows underground at 50 mph.", description: "As it digs, it absorbs hard objects to make its body harder. It can live for 100 years." },
  96: { summary: "Drowzee feeds on dreams through people's noses.", description: "If your nose itches while sleeping, it's a sign that Drowzee is nearby. It remembers every dream it eats." },
  97: { summary: "Hypno carries a pendulum-like device.", description: "Seeing its swinging pendulum can induce sleep in three seconds. It hunts for prey while its victims sleep." },
  98: { summary: "Krabby lives near beaches and burrows in sand.", description: "If it senses danger, it bubbles up from its mouth. Its pincers grow back if broken." },
  99: { summary: "Kingler has one claw that's much larger than the other.", description: "Its large claw can crush anything but is too heavy to use for long periods." },
  100: { summary: "Voltorb looks exactly like a Poké Ball.", description: "It was first discovered at a factory that makes Poké Balls. It explodes at the slightest shock." },
  101: { summary: "Electrode stores enormous amounts of electricity.", description: "It explodes at the slightest provocation. Its nickname is 'Bomb Ball' for good reason." },
  102: { summary: "Exeggcute consists of six eggs that communicate telepathically.", description: "If one is separated, it uses telepathy to call for the others. They attract each other and spin." },
  103: { summary: "Exeggutor's three heads think independently.", description: "Each head thinks independently. When all three heads are in agreement, it's at its most powerful." },
  104: { summary: "Cubone wears the skull of its deceased mother.", description: "It never removes its skull helmet. No one has ever seen its real face beneath the skull." },
  105: { summary: "Marowak has overcome its sadness and evolved.", description: "It has become stronger by overcoming grief. It strikes opponents with the bone it carries." },
  106: { summary: "Hitmonlee's legs can stretch and contract freely.", description: "After battle, it massages its legs to overcome fatigue. Its kicks have the force of a missile." },
  107: { summary: "Hitmonchan's punches are faster than a bullet train.", description: "Its spirit of determination is unbeatable. It rests after three minutes of fighting." },
  108: { summary: "Lickitung's tongue is twice as long as its body.", description: "Its tongue can extend more than 6 feet. It uses its tongue to catch prey and clean itself." },
  109: { summary: "Koffing stores toxic gases in its body.", description: "It floats by filling its body with toxic gases. It explodes when agitated or exposed to fire." },
  110: { summary: "Weezing is formed when two Koffing fuse together.", description: "It mixes toxic gases to create new poisons. The gases are so toxic they make flowers wilt instantly." },
  111: { summary: "Rhyhorn's brain is very small and it often forgets what it's doing.", description: "It can knock down buildings with its charging tackles. Its hide is like armor plating." },
  112: { summary: "Rhydon's horn can crush diamonds.", description: "Its brain developed after it began walking on two legs. It can topple buildings with its tail." },
  113: { summary: "Chansey lays highly nutritious eggs every day.", description: "Its eggs are delicious and nutritious. People who eat them become kind and caring." },
  114: { summary: "Tangela's vines grow continuously and never stop.", description: "Its identity is obscured by masses of vines. The vines grow back immediately if cut." },
  115: { summary: "Kangaskhan raises its young in its pouch.", description: "The baby won't leave its mother's pouch for three years. The mother is fiercely protective." },
  116: { summary: "Horsea makes its nest in coral reefs.", description: "It spits ink to escape predators. It wraps its tail around coral to anchor itself." },
  117: { summary: "Seadra can swim in any direction by rapidly flapping its fins.", description: "Its sharp spines contain venom. It sleeps among coral while drifting with the current." },
  118: { summary: "Goldeen's horn can pierce solid rock.", description: "It swims elegantly by fluttering its tail fin. Its horn is its primary weapon." },
  119: { summary: "Seaking makes its nest by hollowing out boulders with its horn.", description: "In autumn, it's known for its beautiful coloring. Males perform courtship dances." },
  120: { summary: "Staryu's core glows in seven colors.", description: "If its body is torn, it can regenerate as long as its core is intact. It communicates by flashing its core." },
  121: { summary: "Starmie's core shines in rainbow colors.", description: "Its geometric body is said to be a scientific mystery. It sends radio signals into space." },
  122: { summary: "Mr. Mime creates invisible walls from thin air.", description: "It's a master of pantomime. Its gestures and motions convince others that something exists that doesn't." },
  123: { summary: "Scyther's scythes can slice through logs in one strike.", description: "It's blindingly fast and its movements are impossible to see. It lives in grasslands and forests." },
  124: { summary: "Jynx speaks a language that sounds like human speech.", description: "It wiggles its hips as it walks. It can cause people to dance uncontrollably." },
  125: { summary: "Electabuzz loves to feed on electricity.", description: "It appears near power plants. During major power outages, it's usually the culprit." },
  126: { summary: "Magmar's body temperature is nearly 2,200 degrees.", description: "It's found near volcanoes. Its body is so hot that rain evaporates before touching it." },
  127: { summary: "Pinsir grips prey in its horns until torn apart.", description: "It can't fly but grips prey with its powerful horns. It's active in cold weather." },
  128: { summary: "Tauros charges wildly and whips itself with its tails.", description: "Once it charges, it won't stop until it hits something. It fights by slamming its horns together." },
  129: { summary: "Magikarp is virtually useless in battle.", description: "It's famous for being very weak. An ancient Magikarp was much stronger than modern ones." },
  130: { summary: "Gyarados is known for its violent temper.", description: "Once it begins to rampage, it will burn everything down. It appears when humanity angers it." },
  131: { summary: "Lapras is an endangered species that loves to ferry people.", description: "It understands human speech and is highly intelligent. It sings beautiful songs while swimming." },
  132: { summary: "Ditto can reorganize its cells to transform into anything.", description: "It can reconstitute its entire cellular structure to transform. It's terrible at remembering faces." },
  133: { summary: "Eevee has an unstable genetic code.", description: "It can evolve into many forms depending on its environment. Its genes are easily influenced." },
  134: { summary: "Vaporeon's body is made of water molecules.", description: "It can melt into water and become invisible. It prefers clean water and can purify dirty water." },
  135: { summary: "Jolteon's fur bristles with electricity.", description: "It concentrates negative ions in its fur to create 10,000-volt lightning bolts. It's very sensitive." },
  136: { summary: "Flareon's body temperature can reach 1,650 degrees.", description: "It stores thermal energy in its body. Its fluffy fur releases heat to prevent overheating." },
  137: { summary: "Porygon is the first Pokémon created by humans.", description: "It's made entirely of programming code. It can enter cyberspace and travel through digital networks." },
  138: { summary: "Omanyte is an ancient Pokémon resurrected from a fossil.", description: "It lived in ancient seas. It swims by twisting its 10 tentacles about." },
  139: { summary: "Omastar's tentacles became too heavy for it to swim.", description: "Its sharp fangs pierce prey. It's believed to have become extinct because its shell grew too large." },
  140: { summary: "Kabuto is a Pokémon that was regenerated from a fossil.", description: "It hasn't changed for 300 million years. It hides on the ocean floor." },
  141: { summary: "Kabutops swam through ancient seas to hunt prey.", description: "Its thin, hard shell helped it swim. It slashes prey with its sharp scythes." },
  142: { summary: "Aerodactyl is a Pokémon from the age of dinosaurs.", description: "It was regenerated from genetic material in amber. Its saw-like fangs can crush stone." },
  143: { summary: "Snorlax eats 900 pounds of food per day.", description: "It's not satisfied until it eats 900 pounds daily. After eating, it falls asleep immediately." },
  144: { summary: "Articuno is a legendary bird Pokémon that can control ice.", description: "It's said to appear before doomed travelers in icy mountains. It can create blizzards by flapping its wings." },
  145: { summary: "Zapdos is a legendary bird Pokémon that controls electricity.", description: "It's said to appear with thunderstorms. It gains power when struck by lightning bolts." },
  146: { summary: "Moltres is a legendary bird Pokémon that controls fire.", description: "It's said that its appearance indicates the coming of spring. It can heal itself by dipping into molten magma." },
  147: { summary: "Dratini sheds its skin many times as it grows.", description: "It's called the Mirage Pokémon because few have seen it. It lives in pristine waters." },
  148: { summary: "Dragonair stores enormous energy in its body.", description: "It's said to be able to change the weather. It lives in large bodies of water like lakes and seas." },
  149: { summary: "Dragonite can fly around the globe in 16 hours.", description: "It's kind-hearted and guides ships through storms to safety. It's intelligent and can understand human speech." },
  150: { summary: "Mewtwo was created by genetic manipulation.", description: "It's said to have the most savage heart among Pokémon. It was created to be the ultimate Pokémon." },
  151: { summary: "Mew is said to contain the genetic codes of all Pokémon.", description: "It's so rare that many experts say it's extinct. It can make itself invisible and fly." },
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
