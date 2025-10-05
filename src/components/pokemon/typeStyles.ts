import type { PokemonTypeName } from "@/types/pokemon";

// Lighter colors for Pokémon cards (like the reference image)
export const TYPE_BADGE_STYLES: Record<string, string> = {
  normal: "bg-stone-200 text-stone-700",
  fire: "bg-orange-200 text-orange-700",
  water: "bg-blue-200 text-blue-700",
  electric: "bg-yellow-200 text-yellow-800",
  grass: "bg-green-200 text-green-700",
  ice: "bg-cyan-200 text-cyan-700",
  fighting: "bg-red-200 text-red-800",
  poison: "bg-purple-200 text-purple-700",
  ground: "bg-amber-200 text-amber-800",
  flying: "bg-indigo-200 text-indigo-700",
  psychic: "bg-pink-200 text-pink-700",
  bug: "bg-lime-200 text-lime-700",
  rock: "bg-yellow-300 text-yellow-800",
  ghost: "bg-purple-300 text-purple-800",
  dragon: "bg-indigo-300 text-indigo-800",
  dark: "bg-gray-300 text-gray-800",
  steel: "bg-slate-200 text-slate-700",
  fairy: "bg-pink-200 text-pink-700",
};

export const badgeClassForNames: Record<string, string> = TYPE_BADGE_STYLES;
