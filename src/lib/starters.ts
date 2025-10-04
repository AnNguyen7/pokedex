export type PokemonType =
  | "bug"
  | "fire"
  | "flying"
  | "grass"
  | "normal"
  | "poison"
  | "water";

export type Pokemon = {
  id: number;
  name: string;        // lowercase slug for URLs
  displayName: string; // pretty name
  types: PokemonType[];
};

export const POKEDEX: Pokemon[] = [
  { id: 1, name: "bulbasaur",  displayName: "Bulbasaur",  types: ["grass", "poison"] },
  { id: 2, name: "ivysaur",    displayName: "Ivysaur",    types: ["grass", "poison"] },
  { id: 3, name: "venusaur",   displayName: "Venusaur",   types: ["grass", "poison"] },
  { id: 4, name: "charmander", displayName: "Charmander", types: ["fire"] },
  { id: 5, name: "charmeleon", displayName: "Charmeleon", types: ["fire"] },
  { id: 6, name: "charizard",  displayName: "Charizard",  types: ["fire", "flying"] },
  { id: 7, name: "squirtle",   displayName: "Squirtle",   types: ["water"] },
  { id: 8, name: "wartortle",  displayName: "Wartortle",  types: ["water"] },
  { id: 9, name: "blastoise",  displayName: "Blastoise",  types: ["water"] },
  { id: 10, name: "caterpie",  displayName: "Caterpie",   types: ["bug"] },
  { id: 11, name: "metapod",   displayName: "Metapod",    types: ["bug"] },
  { id: 12, name: "butterfree",displayName: "Butterfree", types: ["bug", "flying"] },
  { id: 13, name: "weedle",    displayName: "Weedle",     types: ["bug", "poison"] },
  { id: 14, name: "kakuna",    displayName: "Kakuna",     types: ["bug", "poison"] },
  { id: 15, name: "beedrill",  displayName: "Beedrill",   types: ["bug", "poison"] },
  { id: 16, name: "pidgey",    displayName: "Pidgey",     types: ["normal", "flying"] },
];

const ANIMATED_SPRITE_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated";

const STATIC_SPRITE_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

export const spriteUrls = (id: number) => ({
  animated: `${ANIMATED_SPRITE_BASE}/${id}.gif`,
  fallback: `${STATIC_SPRITE_BASE}/${id}.png`,
});
