export type PokemonType =
  | "bug"
  | "dark"
  | "dragon"
  | "electric"
  | "fairy"
  | "fighting"
  | "fire"
  | "flying"
  | "ghost"
  | "grass"
  | "ground"
  | "ice"
  | "normal"
  | "poison"
  | "psychic"
  | "rock"
  | "steel"
  | "water";

export type Pokemon = {
  id: number;
  name: string;        // lowercase slug for URLs
  displayName: string; // pretty name
  types: PokemonType[];
};

export const POKEDEX: Pokemon[] = [
  // Kanto Region - Original 151 Pokémon (Generation I)
  { id: 1, name: "bulbasaur", displayName: "Bulbasaur", types: ["grass", "poison"] },
  { id: 2, name: "ivysaur", displayName: "Ivysaur", types: ["grass", "poison"] },
  { id: 3, name: "venusaur", displayName: "Venusaur", types: ["grass", "poison"] },
  { id: 4, name: "charmander", displayName: "Charmander", types: ["fire"] },
  { id: 5, name: "charmeleon", displayName: "Charmeleon", types: ["fire"] },
  { id: 6, name: "charizard", displayName: "Charizard", types: ["fire", "flying"] },
  { id: 7, name: "squirtle", displayName: "Squirtle", types: ["water"] },
  { id: 8, name: "wartortle", displayName: "Wartortle", types: ["water"] },
  { id: 9, name: "blastoise", displayName: "Blastoise", types: ["water"] },
  { id: 10, name: "caterpie", displayName: "Caterpie", types: ["bug"] },
  { id: 11, name: "metapod", displayName: "Metapod", types: ["bug"] },
  { id: 12, name: "butterfree", displayName: "Butterfree", types: ["bug", "flying"] },
  { id: 13, name: "weedle", displayName: "Weedle", types: ["bug", "poison"] },
  { id: 14, name: "kakuna", displayName: "Kakuna", types: ["bug", "poison"] },
  { id: 15, name: "beedrill", displayName: "Beedrill", types: ["bug", "poison"] },
  { id: 16, name: "pidgey", displayName: "Pidgey", types: ["normal", "flying"] },
  { id: 17, name: "pidgeotto", displayName: "Pidgeotto", types: ["normal", "flying"] },
  { id: 18, name: "pidgeot", displayName: "Pidgeot", types: ["normal", "flying"] },
  { id: 19, name: "rattata", displayName: "Rattata", types: ["normal"] },
  { id: 20, name: "raticate", displayName: "Raticate", types: ["normal"] },
  { id: 21, name: "spearow", displayName: "Spearow", types: ["normal", "flying"] },
  { id: 22, name: "fearow", displayName: "Fearow", types: ["normal", "flying"] },
  { id: 23, name: "ekans", displayName: "Ekans", types: ["poison"] },
  { id: 24, name: "arbok", displayName: "Arbok", types: ["poison"] },
  { id: 25, name: "pikachu", displayName: "Pikachu", types: ["electric"] },
  { id: 26, name: "raichu", displayName: "Raichu", types: ["electric"] },
  { id: 27, name: "sandshrew", displayName: "Sandshrew", types: ["ground"] },
  { id: 28, name: "sandslash", displayName: "Sandslash", types: ["ground"] },
  { id: 29, name: "nidoran-f", displayName: "Nidoran♀", types: ["poison"] },
  { id: 30, name: "nidorina", displayName: "Nidorina", types: ["poison"] },
  { id: 31, name: "nidoqueen", displayName: "Nidoqueen", types: ["poison", "ground"] },
  { id: 32, name: "nidoran-m", displayName: "Nidoran♂", types: ["poison"] },
  { id: 33, name: "nidorino", displayName: "Nidorino", types: ["poison"] },
  { id: 34, name: "nidoking", displayName: "Nidoking", types: ["poison", "ground"] },
  { id: 35, name: "clefairy", displayName: "Clefairy", types: ["fairy"] },
  { id: 36, name: "clefable", displayName: "Clefable", types: ["fairy"] },
  { id: 37, name: "vulpix", displayName: "Vulpix", types: ["fire"] },
  { id: 38, name: "ninetales", displayName: "Ninetales", types: ["fire"] },
  { id: 39, name: "jigglypuff", displayName: "Jigglypuff", types: ["normal", "fairy"] },
  { id: 40, name: "wigglytuff", displayName: "Wigglytuff", types: ["normal", "fairy"] },
  { id: 41, name: "zubat", displayName: "Zubat", types: ["poison", "flying"] },
  { id: 42, name: "golbat", displayName: "Golbat", types: ["poison", "flying"] },
  { id: 43, name: "oddish", displayName: "Oddish", types: ["grass", "poison"] },
  { id: 44, name: "gloom", displayName: "Gloom", types: ["grass", "poison"] },
  { id: 45, name: "vileplume", displayName: "Vileplume", types: ["grass", "poison"] },
  { id: 46, name: "paras", displayName: "Paras", types: ["bug", "grass"] },
  { id: 47, name: "parasect", displayName: "Parasect", types: ["bug", "grass"] },
  { id: 48, name: "venonat", displayName: "Venonat", types: ["bug", "poison"] },
  { id: 49, name: "venomoth", displayName: "Venomoth", types: ["bug", "poison"] },
  { id: 50, name: "diglett", displayName: "Diglett", types: ["ground"] },
  { id: 51, name: "dugtrio", displayName: "Dugtrio", types: ["ground"] },
  { id: 52, name: "meowth", displayName: "Meowth", types: ["normal"] },
  { id: 53, name: "persian", displayName: "Persian", types: ["normal"] },
  { id: 54, name: "psyduck", displayName: "Psyduck", types: ["water"] },
  { id: 55, name: "golduck", displayName: "Golduck", types: ["water"] },
  { id: 56, name: "mankey", displayName: "Mankey", types: ["fighting"] },
  { id: 57, name: "primeape", displayName: "Primeape", types: ["fighting"] },
  { id: 58, name: "growlithe", displayName: "Growlithe", types: ["fire"] },
  { id: 59, name: "arcanine", displayName: "Arcanine", types: ["fire"] },
  { id: 60, name: "poliwag", displayName: "Poliwag", types: ["water"] },
  { id: 61, name: "poliwhirl", displayName: "Poliwhirl", types: ["water"] },
  { id: 62, name: "poliwrath", displayName: "Poliwrath", types: ["water", "fighting"] },
  { id: 63, name: "abra", displayName: "Abra", types: ["psychic"] },
  { id: 64, name: "kadabra", displayName: "Kadabra", types: ["psychic"] },
  { id: 65, name: "alakazam", displayName: "Alakazam", types: ["psychic"] },
  { id: 66, name: "machop", displayName: "Machop", types: ["fighting"] },
  { id: 67, name: "machoke", displayName: "Machoke", types: ["fighting"] },
  { id: 68, name: "machamp", displayName: "Machamp", types: ["fighting"] },
  { id: 69, name: "bellsprout", displayName: "Bellsprout", types: ["grass", "poison"] },
  { id: 70, name: "weepinbell", displayName: "Weepinbell", types: ["grass", "poison"] },
  { id: 71, name: "victreebel", displayName: "Victreebel", types: ["grass", "poison"] },
  { id: 72, name: "tentacool", displayName: "Tentacool", types: ["water", "poison"] },
  { id: 73, name: "tentacruel", displayName: "Tentacruel", types: ["water", "poison"] },
  { id: 74, name: "geodude", displayName: "Geodude", types: ["rock", "ground"] },
  { id: 75, name: "graveler", displayName: "Graveler", types: ["rock", "ground"] },
  { id: 76, name: "golem", displayName: "Golem", types: ["rock", "ground"] },
  { id: 77, name: "ponyta", displayName: "Ponyta", types: ["fire"] },
  { id: 78, name: "rapidash", displayName: "Rapidash", types: ["fire"] },
  { id: 79, name: "slowpoke", displayName: "Slowpoke", types: ["water", "psychic"] },
  { id: 80, name: "slowbro", displayName: "Slowbro", types: ["water", "psychic"] },
  { id: 81, name: "magnemite", displayName: "Magnemite", types: ["electric", "steel"] },
  { id: 82, name: "magneton", displayName: "Magneton", types: ["electric", "steel"] },
  { id: 83, name: "farfetchd", displayName: "Farfetch'd", types: ["normal", "flying"] },
  { id: 84, name: "doduo", displayName: "Doduo", types: ["normal", "flying"] },
  { id: 85, name: "dodrio", displayName: "Dodrio", types: ["normal", "flying"] },
  { id: 86, name: "seel", displayName: "Seel", types: ["water"] },
  { id: 87, name: "dewgong", displayName: "Dewgong", types: ["water", "ice"] },
  { id: 88, name: "grimer", displayName: "Grimer", types: ["poison"] },
  { id: 89, name: "muk", displayName: "Muk", types: ["poison"] },
  { id: 90, name: "shellder", displayName: "Shellder", types: ["water"] },
  { id: 91, name: "cloyster", displayName: "Cloyster", types: ["water", "ice"] },
  { id: 92, name: "gastly", displayName: "Gastly", types: ["ghost", "poison"] },
  { id: 93, name: "haunter", displayName: "Haunter", types: ["ghost", "poison"] },
  { id: 94, name: "gengar", displayName: "Gengar", types: ["ghost", "poison"] },
  { id: 95, name: "onix", displayName: "Onix", types: ["rock", "ground"] },
  { id: 96, name: "drowzee", displayName: "Drowzee", types: ["psychic"] },
  { id: 97, name: "hypno", displayName: "Hypno", types: ["psychic"] },
  { id: 98, name: "krabby", displayName: "Krabby", types: ["water"] },
  { id: 99, name: "kingler", displayName: "Kingler", types: ["water"] },
  { id: 100, name: "voltorb", displayName: "Voltorb", types: ["electric"] },
  { id: 101, name: "electrode", displayName: "Electrode", types: ["electric"] },
  { id: 102, name: "exeggcute", displayName: "Exeggcute", types: ["grass", "psychic"] },
  { id: 103, name: "exeggutor", displayName: "Exeggutor", types: ["grass", "psychic"] },
  { id: 104, name: "cubone", displayName: "Cubone", types: ["ground"] },
  { id: 105, name: "marowak", displayName: "Marowak", types: ["ground"] },
  { id: 106, name: "hitmonlee", displayName: "Hitmonlee", types: ["fighting"] },
  { id: 107, name: "hitmonchan", displayName: "Hitmonchan", types: ["fighting"] },
  { id: 108, name: "lickitung", displayName: "Lickitung", types: ["normal"] },
  { id: 109, name: "koffing", displayName: "Koffing", types: ["poison"] },
  { id: 110, name: "weezing", displayName: "Weezing", types: ["poison"] },
  { id: 111, name: "rhyhorn", displayName: "Rhyhorn", types: ["ground", "rock"] },
  { id: 112, name: "rhydon", displayName: "Rhydon", types: ["ground", "rock"] },
  { id: 113, name: "chansey", displayName: "Chansey", types: ["normal"] },
  { id: 114, name: "tangela", displayName: "Tangela", types: ["grass"] },
  { id: 115, name: "kangaskhan", displayName: "Kangaskhan", types: ["normal"] },
  { id: 116, name: "horsea", displayName: "Horsea", types: ["water"] },
  { id: 117, name: "seadra", displayName: "Seadra", types: ["water"] },
  { id: 118, name: "goldeen", displayName: "Goldeen", types: ["water"] },
  { id: 119, name: "seaking", displayName: "Seaking", types: ["water"] },
  { id: 120, name: "staryu", displayName: "Staryu", types: ["water"] },
  { id: 121, name: "starmie", displayName: "Starmie", types: ["water", "psychic"] },
  { id: 122, name: "mr-mime", displayName: "Mr. Mime", types: ["psychic", "fairy"] },
  { id: 123, name: "scyther", displayName: "Scyther", types: ["bug", "flying"] },
  { id: 124, name: "jynx", displayName: "Jynx", types: ["ice", "psychic"] },
  { id: 125, name: "electabuzz", displayName: "Electabuzz", types: ["electric"] },
  { id: 126, name: "magmar", displayName: "Magmar", types: ["fire"] },
  { id: 127, name: "pinsir", displayName: "Pinsir", types: ["bug"] },
  { id: 128, name: "tauros", displayName: "Tauros", types: ["normal"] },
  { id: 129, name: "magikarp", displayName: "Magikarp", types: ["water"] },
  { id: 130, name: "gyarados", displayName: "Gyarados", types: ["water", "flying"] },
  { id: 131, name: "lapras", displayName: "Lapras", types: ["water", "ice"] },
  { id: 132, name: "ditto", displayName: "Ditto", types: ["normal"] },
  { id: 133, name: "eevee", displayName: "Eevee", types: ["normal"] },
  { id: 134, name: "vaporeon", displayName: "Vaporeon", types: ["water"] },
  { id: 135, name: "jolteon", displayName: "Jolteon", types: ["electric"] },
  { id: 136, name: "flareon", displayName: "Flareon", types: ["fire"] },
  { id: 137, name: "porygon", displayName: "Porygon", types: ["normal"] },
  { id: 138, name: "omanyte", displayName: "Omanyte", types: ["rock", "water"] },
  { id: 139, name: "omastar", displayName: "Omastar", types: ["rock", "water"] },
  { id: 140, name: "kabuto", displayName: "Kabuto", types: ["rock", "water"] },
  { id: 141, name: "kabutops", displayName: "Kabutops", types: ["rock", "water"] },
  { id: 142, name: "aerodactyl", displayName: "Aerodactyl", types: ["rock", "flying"] },
  { id: 143, name: "snorlax", displayName: "Snorlax", types: ["normal"] },
  { id: 144, name: "articuno", displayName: "Articuno", types: ["ice", "flying"] },
  { id: 145, name: "zapdos", displayName: "Zapdos", types: ["electric", "flying"] },
  { id: 146, name: "moltres", displayName: "Moltres", types: ["fire", "flying"] },
  { id: 147, name: "dratini", displayName: "Dratini", types: ["dragon"] },
  { id: 148, name: "dragonair", displayName: "Dragonair", types: ["dragon"] },
  { id: 149, name: "dragonite", displayName: "Dragonite", types: ["dragon", "flying"] },
  { id: 150, name: "mewtwo", displayName: "Mewtwo", types: ["psychic"] },
  { id: 151, name: "mew", displayName: "Mew", types: ["psychic"] },
];

const ANIMATED_SPRITE_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated";

const STATIC_SPRITE_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

export const spriteUrls = (id: number) => ({
  // Normal sprites
  animated: `${ANIMATED_SPRITE_BASE}/${id}.gif`,
  fallback: `${STATIC_SPRITE_BASE}/${id}.png`,

  // Shiny sprites ✨
  animatedShiny: `${ANIMATED_SPRITE_BASE}/shiny/${id}.gif`,
  fallbackShiny: `${STATIC_SPRITE_BASE}/shiny/${id}.png`,
});