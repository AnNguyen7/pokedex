import type { PokemonTypeName } from "@/types/pokemon";

export const TYPE_BADGE_STYLES: Partial<Record<PokemonTypeName, string>> = {
  grass: "bg-emerald-100 text-emerald-700",
  poison: "bg-fuchsia-100 text-fuchsia-700",
  fire: "bg-orange-100 text-orange-700",
  water: "bg-sky-100 text-sky-700",
  flying: "bg-indigo-100 text-indigo-700",
  bug: "bg-lime-100 text-lime-700",
  normal: "bg-amber-100 text-amber-700",
};

export const badgeClassForNames: Partial<Record<PokemonTypeName, string>> = TYPE_BADGE_STYLES;
