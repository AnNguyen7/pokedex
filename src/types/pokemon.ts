import type { PokemonType } from "@prisma/client";

export type PokemonTypeName = Lowercase<PokemonType>;

export type BaseStats = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
};

export type PokemonListItem = {
  nationalDex: number;
  slug: string;
  displayName: string;
  types: PokemonTypeName[];
};

export type PokemonDetail = PokemonListItem & {
  spriteUrl: string;
  baseStats: BaseStats;
  summary?: string | null;
  description?: string | null;
};
