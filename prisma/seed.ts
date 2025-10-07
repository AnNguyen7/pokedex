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

type SpeciesData = {
  species: string;
  heightM: number;
  weightKg: number;
};

const SPECIES_DATA: Record<number, SpeciesData> = {
  1: { species: "Seed Pokémon", heightM: 0.7, weightKg: 6.9 },
  2: { species: "Seed Pokémon", heightM: 1.0, weightKg: 13.0 },
  3: { species: "Seed Pokémon", heightM: 2.0, weightKg: 100.0 },
  4: { species: "Lizard Pokémon", heightM: 0.6, weightKg: 8.5 },
  5: { species: "Flame Pokémon", heightM: 1.1, weightKg: 19.0 },
  6: { species: "Flame Pokémon", heightM: 1.7, weightKg: 90.5 },
  7: { species: "Tiny Turtle Pokémon", heightM: 0.5, weightKg: 9.0 },
  8: { species: "Turtle Pokémon", heightM: 1.0, weightKg: 22.5 },
  9: { species: "Shellfish Pokémon", heightM: 1.6, weightKg: 85.5 },
  10: { species: "Worm Pokémon", heightM: 0.3, weightKg: 2.9 },
  11: { species: "Cocoon Pokémon", heightM: 0.7, weightKg: 9.9 },
  12: { species: "Butterfly Pokémon", heightM: 1.1, weightKg: 32.0 },
  13: { species: "Hairy Bug Pokémon", heightM: 0.3, weightKg: 3.2 },
  14: { species: "Cocoon Pokémon", heightM: 0.6, weightKg: 10.0 },
  15: { species: "Poison Bee Pokémon", heightM: 1.0, weightKg: 29.5 },
  16: { species: "Tiny Bird Pokémon", heightM: 0.3, weightKg: 1.8 },
  17: { species: "Bird Pokémon", heightM: 1.1, weightKg: 30.0 },
  18: { species: "Bird Pokémon", heightM: 1.5, weightKg: 39.5 },
  19: { species: "Mouse Pokémon", heightM: 0.3, weightKg: 3.5 },
  20: { species: "Mouse Pokémon", heightM: 0.7, weightKg: 18.5 },
  21: { species: "Tiny Bird Pokémon", heightM: 0.3, weightKg: 2.0 },
  22: { species: "Beak Pokémon", heightM: 1.2, weightKg: 38.0 },
  23: { species: "Snake Pokémon", heightM: 2.0, weightKg: 6.9 },
  24: { species: "Cobra Pokémon", heightM: 3.5, weightKg: 65.0 },
  25: { species: "Mouse Pokémon", heightM: 0.4, weightKg: 6.0 },
  26: { species: "Mouse Pokémon", heightM: 0.8, weightKg: 30.0 },
  27: { species: "Mouse Pokémon", heightM: 0.6, weightKg: 12.0 },
  28: { species: "Mouse Pokémon", heightM: 1.0, weightKg: 29.5 },
  29: { species: "Poison Pin Pokémon", heightM: 0.4, weightKg: 7.0 },
  30: { species: "Poison Pin Pokémon", heightM: 0.8, weightKg: 20.0 },
  31: { species: "Drill Pokémon", heightM: 1.3, weightKg: 60.0 },
  32: { species: "Poison Pin Pokémon", heightM: 0.5, weightKg: 9.0 },
  33: { species: "Poison Pin Pokémon", heightM: 0.9, weightKg: 19.5 },
  34: { species: "Drill Pokémon", heightM: 1.4, weightKg: 62.0 },
  35: { species: "Fairy Pokémon", heightM: 0.6, weightKg: 7.5 },
  36: { species: "Fairy Pokémon", heightM: 1.3, weightKg: 40.0 },
  37: { species: "Fox Pokémon", heightM: 0.6, weightKg: 9.9 },
  38: { species: "Fox Pokémon", heightM: 1.1, weightKg: 19.9 },
  39: { species: "Balloon Pokémon", heightM: 0.5, weightKg: 5.5 },
  40: { species: "Balloon Pokémon", heightM: 1.0, weightKg: 12.0 },
  41: { species: "Bat Pokémon", heightM: 0.8, weightKg: 7.5 },
  42: { species: "Bat Pokémon", heightM: 1.6, weightKg: 55.0 },
  43: { species: "Weed Pokémon", heightM: 0.5, weightKg: 5.4 },
  44: { species: "Weed Pokémon", heightM: 0.8, weightKg: 8.6 },
  45: { species: "Flower Pokémon", heightM: 1.2, weightKg: 18.6 },
  46: { species: "Mushroom Pokémon", heightM: 0.3, weightKg: 5.4 },
  47: { species: "Mushroom Pokémon", heightM: 1.0, weightKg: 29.5 },
  48: { species: "Insect Pokémon", heightM: 1.0, weightKg: 30.0 },
  49: { species: "Poison Moth Pokémon", heightM: 1.5, weightKg: 12.5 },
  50: { species: "Mole Pokémon", heightM: 0.2, weightKg: 0.8 },
  51: { species: "Mole Pokémon", heightM: 0.7, weightKg: 33.3 },
  52: { species: "Scratch Cat Pokémon", heightM: 0.4, weightKg: 4.2 },
  53: { species: "Classy Cat Pokémon", heightM: 1.0, weightKg: 32.0 },
  54: { species: "Duck Pokémon", heightM: 0.8, weightKg: 19.6 },
  55: { species: "Duck Pokémon", heightM: 1.7, weightKg: 76.6 },
  56: { species: "Pig Monkey Pokémon", heightM: 0.5, weightKg: 28.0 },
  57: { species: "Pig Monkey Pokémon", heightM: 1.0, weightKg: 32.0 },
  58: { species: "Puppy Pokémon", heightM: 0.7, weightKg: 19.0 },
  59: { species: "Legendary Pokémon", heightM: 1.9, weightKg: 155.0 },
  60: { species: "Tadpole Pokémon", heightM: 0.6, weightKg: 12.4 },
  61: { species: "Tadpole Pokémon", heightM: 1.0, weightKg: 20.0 },
  62: { species: "Tadpole Pokémon", heightM: 1.3, weightKg: 54.0 },
  63: { species: "Psi Pokémon", heightM: 0.9, weightKg: 19.5 },
  64: { species: "Psi Pokémon", heightM: 1.3, weightKg: 56.5 },
  65: { species: "Psi Pokémon", heightM: 1.5, weightKg: 48.0 },
  66: { species: "Superpower Pokémon", heightM: 0.8, weightKg: 19.5 },
  67: { species: "Superpower Pokémon", heightM: 1.5, weightKg: 70.5 },
  68: { species: "Superpower Pokémon", heightM: 1.6, weightKg: 130.0 },
  69: { species: "Flower Pokémon", heightM: 0.7, weightKg: 4.0 },
  70: { species: "Flycatcher Pokémon", heightM: 1.0, weightKg: 6.4 },
  71: { species: "Flycatcher Pokémon", heightM: 1.7, weightKg: 15.5 },
  72: { species: "Jellyfish Pokémon", heightM: 0.9, weightKg: 45.5 },
  73: { species: "Jellyfish Pokémon", heightM: 1.6, weightKg: 55.0 },
  74: { species: "Rock Pokémon", heightM: 0.4, weightKg: 20.0 },
  75: { species: "Rock Pokémon", heightM: 1.0, weightKg: 105.0 },
  76: { species: "Megaton Pokémon", heightM: 1.4, weightKg: 300.0 },
  77: { species: "Fire Horse Pokémon", heightM: 1.0, weightKg: 30.0 },
  78: { species: "Fire Horse Pokémon", heightM: 1.7, weightKg: 95.0 },
  79: { species: "Dopey Pokémon", heightM: 1.2, weightKg: 36.0 },
  80: { species: "Hermit Crab Pokémon", heightM: 1.6, weightKg: 78.5 },
  81: { species: "Magnet Pokémon", heightM: 0.3, weightKg: 6.0 },
  82: { species: "Magnet Pokémon", heightM: 1.0, weightKg: 60.0 },
  83: { species: "Wild Duck Pokémon", heightM: 0.8, weightKg: 15.0 },
  84: { species: "Twin Bird Pokémon", heightM: 1.4, weightKg: 39.2 },
  85: { species: "Triple Bird Pokémon", heightM: 1.8, weightKg: 85.2 },
  86: { species: "Sea Lion Pokémon", heightM: 1.1, weightKg: 90.0 },
  87: { species: "Sea Lion Pokémon", heightM: 1.7, weightKg: 120.0 },
  88: { species: "Sludge Pokémon", heightM: 0.9, weightKg: 30.0 },
  89: { species: "Sludge Pokémon", heightM: 1.2, weightKg: 30.0 },
  90: { species: "Bivalve Pokémon", heightM: 0.3, weightKg: 4.0 },
  91: { species: "Bivalve Pokémon", heightM: 1.5, weightKg: 132.5 },
  92: { species: "Gas Pokémon", heightM: 1.3, weightKg: 0.1 },
  93: { species: "Gas Pokémon", heightM: 1.6, weightKg: 0.1 },
  94: { species: "Shadow Pokémon", heightM: 1.5, weightKg: 40.5 },
  95: { species: "Rock Snake Pokémon", heightM: 8.8, weightKg: 210.0 },
  96: { species: "Hypnosis Pokémon", heightM: 1.0, weightKg: 32.4 },
  97: { species: "Hypnosis Pokémon", heightM: 1.6, weightKg: 75.6 },
  98: { species: "River Crab Pokémon", heightM: 0.4, weightKg: 6.5 },
  99: { species: "Pincer Pokémon", heightM: 1.3, weightKg: 60.0 },
  100: { species: "Ball Pokémon", heightM: 0.5, weightKg: 10.4 },
  101: { species: "Ball Pokémon", heightM: 1.2, weightKg: 66.6 },
  102: { species: "Egg Pokémon", heightM: 0.4, weightKg: 2.5 },
  103: { species: "Coconut Pokémon", heightM: 2.0, weightKg: 120.0 },
  104: { species: "Lonely Pokémon", heightM: 0.4, weightKg: 6.5 },
  105: { species: "Bone Keeper Pokémon", heightM: 1.0, weightKg: 45.0 },
  106: { species: "Kicking Pokémon", heightM: 1.5, weightKg: 49.8 },
  107: { species: "Punching Pokémon", heightM: 1.4, weightKg: 50.2 },
  108: { species: "Licking Pokémon", heightM: 1.2, weightKg: 65.5 },
  109: { species: "Poison Gas Pokémon", heightM: 0.6, weightKg: 1.0 },
  110: { species: "Poison Gas Pokémon", heightM: 1.2, weightKg: 9.5 },
  111: { species: "Spikes Pokémon", heightM: 1.0, weightKg: 115.0 },
  112: { species: "Drill Pokémon", heightM: 1.9, weightKg: 120.0 },
  113: { species: "Egg Pokémon", heightM: 1.1, weightKg: 34.6 },
  114: { species: "Vine Pokémon", heightM: 2.0, weightKg: 35.0 },
  115: { species: "Parent Pokémon", heightM: 2.2, weightKg: 80.0 },
  116: { species: "Dragon Pokémon", heightM: 0.4, weightKg: 8.0 },
  117: { species: "Dragon Pokémon", heightM: 1.2, weightKg: 25.0 },
  118: { species: "Goldfish Pokémon", heightM: 0.6, weightKg: 15.0 },
  119: { species: "Goldfish Pokémon", heightM: 1.3, weightKg: 39.0 },
  120: { species: "Star Shape Pokémon", heightM: 0.8, weightKg: 34.5 },
  121: { species: "Mysterious Pokémon", heightM: 1.1, weightKg: 80.0 },
  122: { species: "Barrier Pokémon", heightM: 1.3, weightKg: 54.5 },
  123: { species: "Mantis Pokémon", heightM: 1.5, weightKg: 56.0 },
  124: { species: "Human Shape Pokémon", heightM: 1.4, weightKg: 40.6 },
  125: { species: "Electric Pokémon", heightM: 1.1, weightKg: 30.0 },
  126: { species: "Spitfire Pokémon", heightM: 1.3, weightKg: 44.5 },
  127: { species: "Stag Beetle Pokémon", heightM: 1.5, weightKg: 55.0 },
  128: { species: "Wild Bull Pokémon", heightM: 1.4, weightKg: 88.4 },
  129: { species: "Fish Pokémon", heightM: 0.9, weightKg: 10.0 },
  130: { species: "Atrocious Pokémon", heightM: 6.5, weightKg: 235.0 },
  131: { species: "Transport Pokémon", heightM: 2.5, weightKg: 220.0 },
  132: { species: "Transform Pokémon", heightM: 0.3, weightKg: 4.0 },
  133: { species: "Evolution Pokémon", heightM: 0.3, weightKg: 6.5 },
  134: { species: "Bubble Jet Pokémon", heightM: 1.0, weightKg: 29.0 },
  135: { species: "Lightning Pokémon", heightM: 0.8, weightKg: 24.5 },
  136: { species: "Flame Pokémon", heightM: 0.9, weightKg: 25.0 },
  137: { species: "Virtual Pokémon", heightM: 0.8, weightKg: 36.5 },
  138: { species: "Spiral Pokémon", heightM: 0.4, weightKg: 7.5 },
  139: { species: "Spiral Pokémon", heightM: 1.0, weightKg: 35.0 },
  140: { species: "Shellfish Pokémon", heightM: 0.5, weightKg: 11.5 },
  141: { species: "Shellfish Pokémon", heightM: 1.3, weightKg: 40.5 },
  142: { species: "Fossil Pokémon", heightM: 1.8, weightKg: 59.0 },
  143: { species: "Sleeping Pokémon", heightM: 2.1, weightKg: 460.0 },
  144: { species: "Freeze Pokémon", heightM: 1.7, weightKg: 55.4 },
  145: { species: "Electric Pokémon", heightM: 1.6, weightKg: 52.6 },
  146: { species: "Flame Pokémon", heightM: 2.0, weightKg: 60.0 },
  147: { species: "Dragon Pokémon", heightM: 1.8, weightKg: 3.3 },
  148: { species: "Dragon Pokémon", heightM: 4.0, weightKg: 16.5 },
  149: { species: "Dragon Pokémon", heightM: 2.2, weightKg: 210.0 },
  150: { species: "Genetic Pokémon", heightM: 2.0, weightKg: 122.0 },
  151: { species: "New Species Pokémon", heightM: 0.4, weightKg: 4.0 },
};

type PokemonSummary = {
  id: number;
  slug: string;
  displayName: string;
  nationalDex: number;
};

// Abilities for each Pokémon (by nationalDex ID)
// Format: [ability1, ability2 (optional), hiddenAbility (optional)]
const POKEMON_ABILITIES: Record<number, string[]> = {
  1: ["overgrow", "chlorophyll"], // Bulbasaur
  2: ["overgrow", "chlorophyll"], // Ivysaur
  3: ["overgrow", "chlorophyll"], // Venusaur
  4: ["blaze", "solar-power"], // Charmander
  5: ["blaze", "solar-power"], // Charmeleon
  6: ["blaze", "solar-power"], // Charizard
  7: ["torrent", "rain-dish"], // Squirtle
  8: ["torrent", "rain-dish"], // Wartortle
  9: ["torrent", "rain-dish"], // Blastoise
  10: ["shield-dust", "run-away"], // Caterpie
  11: ["shed-skin"], // Metapod
  12: ["compound-eyes", "tinted-lens"], // Butterfree
  13: ["shield-dust", "run-away"], // Weedle
  14: ["shed-skin"], // Kakuna
  15: ["swarm", "sniper"], // Beedrill
  16: ["keen-eye", "tangled-feet", "big-pecks"], // Pidgey
  17: ["keen-eye", "tangled-feet", "big-pecks"], // Pidgeotto
  18: ["keen-eye", "tangled-feet", "big-pecks"], // Pidgeot
  19: ["run-away", "guts", "hustle"], // Rattata
  20: ["run-away", "guts", "hustle"], // Raticate
  21: ["keen-eye", "sniper"], // Spearow
  22: ["keen-eye", "sniper"], // Fearow
  23: ["intimidate", "shed-skin", "unnerve"], // Ekans
  24: ["intimidate", "shed-skin", "unnerve"], // Arbok
  25: ["static", "lightning-rod"], // Pikachu
  26: ["static", "lightning-rod"], // Raichu
  27: ["sand-veil", "sand-rush"], // Sandshrew
  28: ["sand-veil", "sand-rush"], // Sandslash
  29: ["poison-point", "rivalry", "hustle"], // Nidoran-F
  30: ["poison-point", "rivalry", "hustle"], // Nidorina
  31: ["poison-point", "rivalry", "sheer-force"], // Nidoqueen
  32: ["poison-point", "rivalry", "hustle"], // Nidoran-M
  33: ["poison-point", "rivalry", "hustle"], // Nidorino
  34: ["poison-point", "rivalry", "sheer-force"], // Nidoking
  35: ["cute-charm", "magic-guard", "friend-guard"], // Clefairy
  36: ["cute-charm", "magic-guard", "unaware"], // Clefable
  37: ["flash-fire", "drought"], // Vulpix
  38: ["flash-fire", "drought"], // Ninetales
  39: ["cute-charm", "competitive", "friend-guard"], // Jigglypuff
  40: ["cute-charm", "competitive", "frisk"], // Wigglytuff
  41: ["inner-focus", "infiltrator"], // Zubat
  42: ["inner-focus", "infiltrator"], // Golbat
  43: ["chlorophyll", "run-away"], // Oddish
  44: ["chlorophyll", "stench"], // Gloom
  45: ["chlorophyll", "effect-spore"], // Vileplume
  46: ["effect-spore", "dry-skin", "damp"], // Paras
  47: ["effect-spore", "dry-skin", "damp"], // Parasect
  48: ["compound-eyes", "tinted-lens", "run-away"], // Venonat
  49: ["shield-dust", "tinted-lens", "wonder-skin"], // Venomoth
  50: ["sand-veil", "arena-trap", "sand-force"], // Diglett
  51: ["sand-veil", "arena-trap", "sand-force"], // Dugtrio
  52: ["pickup", "technician", "unnerve"], // Meowth
  53: ["limber", "technician", "unnerve"], // Persian
  54: ["damp", "cloud-nine", "swift-swim"], // Psyduck
  55: ["damp", "cloud-nine", "swift-swim"], // Golduck
  56: ["vital-spirit", "anger-point", "defiant"], // Mankey
  57: ["vital-spirit", "anger-point", "defiant"], // Primeape
  58: ["intimidate", "flash-fire", "justified"], // Growlithe
  59: ["intimidate", "flash-fire", "justified"], // Arcanine
  60: ["water-absorb", "damp", "swift-swim"], // Poliwag
  61: ["water-absorb", "damp", "swift-swim"], // Poliwhirl
  62: ["water-absorb", "damp", "swift-swim"], // Poliwrath
  63: ["synchronize", "inner-focus", "magic-guard"], // Abra
  64: ["synchronize", "inner-focus", "magic-guard"], // Kadabra
  65: ["synchronize", "inner-focus", "magic-guard"], // Alakazam
  66: ["guts", "no-guard", "steadfast"], // Machop
  67: ["guts", "no-guard", "steadfast"], // Machoke
  68: ["guts", "no-guard", "steadfast"], // Machamp
  69: ["chlorophyll", "gluttony"], // Bellsprout
  70: ["chlorophyll", "gluttony"], // Weepinbell
  71: ["chlorophyll", "gluttony"], // Victreebel
  72: ["clear-body", "liquid-ooze", "rain-dish"], // Tentacool
  73: ["clear-body", "liquid-ooze", "rain-dish"], // Tentacruel
  74: ["rock-head", "sturdy", "sand-veil"], // Geodude
  75: ["rock-head", "sturdy", "sand-veil"], // Graveler
  76: ["rock-head", "sturdy", "sand-veil"], // Golem
  77: ["run-away", "flash-fire", "flame-body"], // Ponyta
  78: ["run-away", "flash-fire", "flame-body"], // Rapidash
  79: ["oblivious", "own-tempo", "regenerator"], // Slowpoke
  80: ["oblivious", "own-tempo", "regenerator"], // Slowbro
  81: ["magnet-pull", "sturdy", "analytic"], // Magnemite
  82: ["magnet-pull", "sturdy", "analytic"], // Magneton
  83: ["keen-eye", "inner-focus", "defiant"], // Farfetch'd
  84: ["run-away", "early-bird", "tangled-feet"], // Doduo
  85: ["run-away", "early-bird", "tangled-feet"], // Dodrio
  86: ["thick-fat", "hydration", "ice-body"], // Seel
  87: ["thick-fat", "hydration", "ice-body"], // Dewgong
  88: ["stench", "sticky-hold", "poison-touch"], // Grimer
  89: ["stench", "sticky-hold", "poison-touch"], // Muk
  90: ["shell-armor", "skill-link", "overcoat"], // Shellder
  91: ["shell-armor", "skill-link", "overcoat"], // Cloyster
  92: ["levitate"], // Gastly
  93: ["levitate"], // Haunter
  94: ["levitate"], // Gengar
  95: ["rock-head", "sturdy", "weak-armor"], // Onix
  96: ["insomnia", "forewarn", "inner-focus"], // Drowzee
  97: ["insomnia", "forewarn", "inner-focus"], // Hypno
  98: ["hyper-cutter", "shell-armor", "sheer-force"], // Krabby
  99: ["hyper-cutter", "shell-armor", "sheer-force"], // Kingler
  100: ["soundproof", "static", "aftermath"], // Voltorb
  101: ["soundproof", "static", "aftermath"], // Electrode
  102: ["chlorophyll", "harvest"], // Exeggcute
  103: ["chlorophyll", "harvest"], // Exeggutor
  104: ["rock-head", "lightning-rod", "battle-armor"], // Cubone
  105: ["rock-head", "lightning-rod", "battle-armor"], // Marowak
  106: ["limber", "reckless", "unburden"], // Hitmonlee
  107: ["keen-eye", "iron-fist", "inner-focus"], // Hitmonchan
  108: ["own-tempo", "oblivious", "cloud-nine"], // Lickitung
  109: ["levitate", "neutralizing-gas"], // Koffing
  110: ["levitate", "neutralizing-gas"], // Weezing
  111: ["lightning-rod", "rock-head", "reckless"], // Rhyhorn
  112: ["lightning-rod", "rock-head", "reckless"], // Rhydon
  113: ["natural-cure", "serene-grace", "healer"], // Chansey
  114: ["chlorophyll", "leaf-guard", "regenerator"], // Tangela
  115: ["early-bird", "scrappy", "inner-focus"], // Kangaskhan
  116: ["swift-swim", "sniper", "damp"], // Horsea
  117: ["poison-point", "sniper", "damp"], // Seadra
  118: ["swift-swim", "water-veil", "lightning-rod"], // Goldeen
  119: ["swift-swim", "water-veil", "lightning-rod"], // Seaking
  120: ["illuminate", "natural-cure", "analytic"], // Staryu
  121: ["illuminate", "natural-cure", "analytic"], // Starmie
  122: ["soundproof", "filter", "technician"], // Mr. Mime
  123: ["swarm", "technician", "steadfast"], // Scyther
  124: ["oblivious", "forewarn", "dry-skin"], // Jynx
  125: ["static", "vital-spirit"], // Electabuzz
  126: ["flame-body", "vital-spirit"], // Magmar
  127: ["hyper-cutter", "mold-breaker", "moxie"], // Pinsir
  128: ["intimidate", "anger-point", "sheer-force"], // Tauros
  129: ["swift-swim", "rattled"], // Magikarp
  130: ["intimidate", "moxie"], // Gyarados
  131: ["water-absorb", "shell-armor", "hydration"], // Lapras
  132: ["limber", "imposter"], // Ditto
  133: ["run-away", "adaptability", "anticipation"], // Eevee
  134: ["water-absorb", "hydration"], // Vaporeon
  135: ["volt-absorb", "quick-feet"], // Jolteon
  136: ["flash-fire", "guts"], // Flareon
  137: ["trace", "download", "analytic"], // Porygon
  138: ["swift-swim", "shell-armor", "weak-armor"], // Omanyte
  139: ["swift-swim", "shell-armor", "weak-armor"], // Omastar
  140: ["swift-swim", "battle-armor", "weak-armor"], // Kabuto
  141: ["swift-swim", "battle-armor", "weak-armor"], // Kabutops
  142: ["rock-head", "pressure", "unnerve"], // Aerodactyl
  143: ["immunity", "thick-fat", "gluttony"], // Snorlax
  144: ["pressure", "snow-cloak"], // Articuno
  145: ["pressure", "static"], // Zapdos
  146: ["pressure", "flame-body"], // Moltres
  147: ["shed-skin", "marvel-scale"], // Dratini
  148: ["shed-skin", "marvel-scale"], // Dragonair
  149: ["inner-focus", "multiscale"], // Dragonite
  150: ["pressure", "unnerve"], // Mewtwo
  151: ["synchronize"], // Mew
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

    const speciesData = SPECIES_DATA[pokemon.id];

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
      ...speciesData,
      ...LORE[pokemon.id],
    };
  });

  const records = await Promise.all(
    data.map(pokemon =>
      prisma.pokemon.upsert({
        where: { slug: pokemon.slug },
        update: pokemon,
        create: pokemon,
        select: { id: true, slug: true, displayName: true, nationalDex: true },
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


// Ability descriptions
const ABILITY_INFO: Record<string, { displayName: string; description: string }> = {
  "overgrow": { displayName: "Overgrow", description: "Powers up Grass-type moves when the Pokémon's HP is low." },
  "chlorophyll": { displayName: "Chlorophyll", description: "Boosts the Pokémon's Speed stat in harsh sunlight." },
  "blaze": { displayName: "Blaze", description: "Powers up Fire-type moves when the Pokémon's HP is low." },
  "solar-power": { displayName: "Solar Power", description: "Boosts the Sp. Atk stat in harsh sunlight, but HP decreases every turn." },
  "torrent": { displayName: "Torrent", description: "Powers up Water-type moves when the Pokémon's HP is low." },
  "rain-dish": { displayName: "Rain Dish", description: "The Pokémon gradually regains HP in rain." },
  "shield-dust": { displayName: "Shield Dust", description: "Blocks the additional effects of attacks taken." },
  "run-away": { displayName: "Run Away", description: "Enables a sure getaway from wild Pokémon." },
  "shed-skin": { displayName: "Shed Skin", description: "The Pokémon may heal its own status conditions by shedding its skin." },
  "compound-eyes": { displayName: "Compound Eyes", description: "The Pokémon's compound eyes boost its accuracy." },
  "tinted-lens": { displayName: "Tinted Lens", description: "Powers up 'not very effective' moves." },
  "swarm": { displayName: "Swarm", description: "Powers up Bug-type moves when the Pokémon's HP is low." },
  "sniper": { displayName: "Sniper", description: "Powers up moves if they become critical hits." },
  "keen-eye": { displayName: "Keen Eye", description: "Prevents other Pokémon from lowering accuracy." },
  "tangled-feet": { displayName: "Tangled Feet", description: "Raises evasion if the Pokémon is confused." },
  "big-pecks": { displayName: "Big Pecks", description: "Protects the Pokémon from Defense-lowering effects." },
  "guts": { displayName: "Guts", description: "Boosts the Attack stat if the Pokémon has a status condition." },
  "hustle": { displayName: "Hustle", description: "Boosts the Attack stat, but lowers accuracy." },
  "intimidate": { displayName: "Intimidate", description: "Lowers the foe's Attack stat when switched in." },
  "unnerve": { displayName: "Unnerve", description: "Makes opposing Pokémon nervous and prevents them from eating Berries." },
  "static": { displayName: "Static", description: "May cause paralysis when hit by a contact move." },
  "lightning-rod": { displayName: "Lightning Rod", description: "Draws in all Electric-type moves to boost Sp. Atk." },
  "sand-veil": { displayName: "Sand Veil", description: "Boosts evasion in a sandstorm." },
  "sand-rush": { displayName: "Sand Rush", description: "Boosts the Pokémon's Speed stat in a sandstorm." },
  "poison-point": { displayName: "Poison Point", description: "May poison a target when hit by a contact move." },
  "rivalry": { displayName: "Rivalry", description: "Becomes competitive and deals more damage to same gender opponents." },
  "sheer-force": { displayName: "Sheer Force", description: "Removes additional effects to increase move damage." },
  "cute-charm": { displayName: "Cute Charm", description: "May infatuate attackers on contact." },
  "magic-guard": { displayName: "Magic Guard", description: "Only takes damage from attacks." },
  "friend-guard": { displayName: "Friend Guard", description: "Reduces damage done to allies." },
  "unaware": { displayName: "Unaware", description: "Ignores any stat changes in the opponent." },
  "flash-fire": { displayName: "Flash Fire", description: "Powers up Fire-type moves if hit by a fire move." },
  "drought": { displayName: "Drought", description: "Turns the sunlight harsh when switched in." },
  "competitive": { displayName: "Competitive", description: "Boosts Sp. Atk sharply when stats are lowered." },
  "frisk": { displayName: "Frisk", description: "Checks an opposing Pokémon's held item." },
  "inner-focus": { displayName: "Inner Focus", description: "Protects the Pokémon from flinching." },
  "infiltrator": { displayName: "Infiltrator", description: "Passes through the opposing Pokémon's barrier and strikes." },
  "stench": { displayName: "Stench", description: "May cause the target to flinch." },
  "effect-spore": { displayName: "Effect Spore", description: "Contact may poison, paralyze, or put to sleep." },
  "dry-skin": { displayName: "Dry Skin", description: "Restores HP in rain but loses HP in harsh sunlight. Water moves heal." },
  "damp": { displayName: "Damp", description: "Prevents the use of explosive moves." },
  "wonder-skin": { displayName: "Wonder Skin", description: "Makes status moves more likely to miss." },
  "arena-trap": { displayName: "Arena Trap", description: "Prevents opposing Pokémon from fleeing." },
  "sand-force": { displayName: "Sand Force", description: "Boosts certain move types in a sandstorm." },
  "pickup": { displayName: "Pickup", description: "May pick up items." },
  "technician": { displayName: "Technician", description: "Powers up weak moves." },
  "limber": { displayName: "Limber", description: "Prevents the Pokémon from becoming paralyzed." },
  "cloud-nine": { displayName: "Cloud Nine", description: "Eliminates the effects of weather." },
  "swift-swim": { displayName: "Swift Swim", description: "Boosts the Pokémon's Speed stat in rain." },
  "vital-spirit": { displayName: "Vital Spirit", description: "Prevents the Pokémon from falling asleep." },
  "anger-point": { displayName: "Anger Point", description: "Maxes Attack after taking a critical hit." },
  "defiant": { displayName: "Defiant", description: "Sharply boosts Attack when stats are lowered." },
  "justified": { displayName: "Justified", description: "Raises Attack when hit by a Dark-type move." },
  "water-absorb": { displayName: "Water Absorb", description: "Restores HP if hit by a Water-type move." },
  "synchronize": { displayName: "Synchronize", description: "Passes poison, paralyze, or burn to the foe." },
  "no-guard": { displayName: "No Guard", description: "Ensures attacks by or against the Pokémon land." },
  "steadfast": { displayName: "Steadfast", description: "Boosts Speed each time the Pokémon flinches." },
  "gluttony": { displayName: "Gluttony", description: "Eats Berries early when HP drops below half." },
  "clear-body": { displayName: "Clear Body", description: "Prevents other Pokémon from lowering its stats." },
  "liquid-ooze": { displayName: "Liquid Ooze", description: "Damages attackers using HP-draining moves." },
  "rock-head": { displayName: "Rock Head", description: "Protects from recoil damage." },
  "sturdy": { displayName: "Sturdy", description: "Cannot be knocked out with one hit. One-hit KO moves fail." },
  "flame-body": { displayName: "Flame Body", description: "Contact may burn the attacker." },
  "oblivious": { displayName: "Oblivious", description: "Prevents it from becoming infatuated or taunted." },
  "own-tempo": { displayName: "Own Tempo", description: "Prevents the Pokémon from becoming confused." },
  "regenerator": { displayName: "Regenerator", description: "Restores HP when withdrawn from battle." },
  "magnet-pull": { displayName: "Magnet Pull", description: "Prevents Steel-type Pokémon from escaping." },
  "analytic": { displayName: "Analytic", description: "Boosts move power when moving last." },
  "early-bird": { displayName: "Early Bird", description: "Awakens quickly from sleep." },
  "thick-fat": { displayName: "Thick Fat", description: "Halves damage from Fire- and Ice-type moves." },
  "hydration": { displayName: "Hydration", description: "Heals status conditions if it's raining." },
  "ice-body": { displayName: "Ice Body", description: "Gradually restores HP in a hailstorm." },
  "sticky-hold": { displayName: "Sticky Hold", description: "Protects the Pokémon from item theft." },
  "poison-touch": { displayName: "Poison Touch", description: "May poison a target when hit." },
  "shell-armor": { displayName: "Shell Armor", description: "Protects from critical hits." },
  "skill-link": { displayName: "Skill Link", description: "Maximizes the number of times multi-strike moves hit." },
  "overcoat": { displayName: "Overcoat", description: "Protects from weather damage and powder moves." },
  "levitate": { displayName: "Levitate", description: "Gives immunity to Ground-type moves." },
  "weak-armor": { displayName: "Weak Armor", description: "Lowers Defense and raises Speed when hit." },
  "insomnia": { displayName: "Insomnia", description: "Prevents the Pokémon from falling asleep." },
  "forewarn": { displayName: "Forewarn", description: "Reveals one of the opponent's moves." },
  "hyper-cutter": { displayName: "Hyper Cutter", description: "Prevents Attack from being lowered." },
  "soundproof": { displayName: "Soundproof", description: "Gives immunity to sound-based moves." },
  "aftermath": { displayName: "Aftermath", description: "Damages the attacker if knocked out by a contact move." },
  "harvest": { displayName: "Harvest", description: "May create another Berry after one is used." },
  "battle-armor": { displayName: "Battle Armor", description: "Protects from critical hits." },
  "reckless": { displayName: "Reckless", description: "Powers up moves that have recoil damage." },
  "unburden": { displayName: "Unburden", description: "Boosts Speed if a held item is used." },
  "iron-fist": { displayName: "Iron Fist", description: "Boosts the power of punching moves." },
  "neutralizing-gas": { displayName: "Neutralizing Gas", description: "Neutralizes abilities of all Pokémon in battle." },
  "natural-cure": { displayName: "Natural Cure", description: "Heals status conditions when withdrawn." },
  "serene-grace": { displayName: "Serene Grace", description: "Boosts the likelihood of added effects appearing." },
  "healer": { displayName: "Healer", description: "May heal an ally's status conditions." },
  "leaf-guard": { displayName: "Leaf Guard", description: "Prevents status conditions in harsh sunlight." },
  "scrappy": { displayName: "Scrappy", description: "Enables hitting Ghost-type Pokémon with Normal- and Fighting-type moves." },
  "water-veil": { displayName: "Water Veil", description: "Prevents the Pokémon from getting a burn." },
  "illuminate": { displayName: "Illuminate", description: "Raises the likelihood of meeting wild Pokémon by illuminating the surroundings." },
  "filter": { displayName: "Filter", description: "Reduces damage from super-effective attacks." },
  "mold-breaker": { displayName: "Mold Breaker", description: "Moves can be used on the target regardless of its abilities." },
  "moxie": { displayName: "Moxie", description: "Boosts Attack after knocking out any Pokémon." },
  "rattled": { displayName: "Rattled", description: "Boosts Speed when hit by certain move types." },
  "imposter": { displayName: "Imposter", description: "Transforms into the opposing Pokémon." },
  "adaptability": { displayName: "Adaptability", description: "Powers up moves of the same type." },
  "anticipation": { displayName: "Anticipation", description: "Senses an opposing Pokémon's dangerous moves." },
  "volt-absorb": { displayName: "Volt Absorb", description: "Restores HP if hit by an Electric-type move." },
  "quick-feet": { displayName: "Quick Feet", description: "Boosts Speed if there is a status condition." },
  "trace": { displayName: "Trace", description: "Copies an opposing Pokémon's ability." },
  "download": { displayName: "Download", description: "Adjusts power based on the opposing Pokémon's stats." },
  "immunity": { displayName: "Immunity", description: "Prevents the Pokémon from getting poisoned." },
  "pressure": { displayName: "Pressure", description: "Makes foes use more PP." },
  "snow-cloak": { displayName: "Snow Cloak", description: "Boosts evasion in a hailstorm." },
  "marvel-scale": { displayName: "Marvel Scale", description: "Ups Defense if there is a status condition." },
  "multiscale": { displayName: "Multiscale", description: "Reduces damage when HP is full." },
};

async function seedAbilities(): Promise<Map<string, number>> {
  console.log("🎯 Seeding abilities...");
  
  const abilityMap = new Map<string, number>();
  
  // Get all unique abilities from POKEMON_ABILITIES
  const uniqueAbilities = new Set<string>();
  Object.values(POKEMON_ABILITIES).forEach(abilities => {
    abilities.forEach(ability => uniqueAbilities.add(ability));
  });
  
  // Create or update each ability
  for (const abilityName of uniqueAbilities) {
    const info = ABILITY_INFO[abilityName] || {
      displayName: abilityName.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' '),
      description: "No description available."
    };
    
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

async function linkPokemonAbilities(pokemonBySlug: Map<string, PokemonSummary>, abilityMap: Map<string, number>) {
  console.log("🔗 Linking Pokémon to abilities...");
  
  // First, delete all existing PokemonAbility links to start fresh
  await prisma.pokemonAbility.deleteMany({});
  console.log("🗑️  Cleared old ability links");
  
  for (const [nationalDex, abilities] of Object.entries(POKEMON_ABILITIES)) {
    const dexNum = parseInt(nationalDex);
    const pokemon = Array.from(pokemonBySlug.values()).find(p => p.nationalDex === dexNum);
    
    if (!pokemon) {
      console.warn(`⚠️  Pokémon with dex #${dexNum} not found`);
      continue;
    }
    
    // Link each ability to this Pokémon
    for (let i = 0; i < abilities.length; i++) {
      const abilityName = abilities[i];
      const abilityId = abilityMap.get(abilityName);
      
      if (!abilityId) {
        console.warn(`⚠️  Ability "${abilityName}" not found`);
        continue;
      }
      
      // The last ability in the array is considered "hidden"
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
  const pokemonBySlug = await seedPokemon();
  await seedEvolutionChains(pokemonBySlug);
  const abilityMap = await seedAbilities();
  await linkPokemonAbilities(pokemonBySlug, abilityMap);
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
