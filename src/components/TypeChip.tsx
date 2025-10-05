"use client";

import type { PokemonTypeName } from "@/types/pokemon";

type Props = {
  label: "all" | PokemonTypeName;
  selected?: boolean;
  onClick?: () => void;
};

const TYPE_STYLES: Record<string, { base: string; selected: string }> = {
  default: {
    base: "border-emerald-100 bg-white/70 text-emerald-700",
    selected: "border-emerald-400 bg-emerald-500 text-white",
  },
  all: {
    base: "border-emerald-100 bg-white/70 text-emerald-700",
    selected: "border-emerald-400 bg-emerald-500 text-white",
  },
  normal: {
    base: "border-stone-300 bg-stone-50 text-stone-700",
    selected: "border-stone-400 bg-stone-400 text-white",
  },
  fire: {
    base: "border-orange-300 bg-orange-50 text-orange-700",
    selected: "border-orange-500 bg-orange-500 text-white",
  },
  water: {
    base: "border-blue-300 bg-blue-50 text-blue-700",
    selected: "border-blue-500 bg-blue-500 text-white",
  },
  electric: {
    base: "border-yellow-300 bg-yellow-50 text-yellow-700",
    selected: "border-yellow-400 bg-yellow-400 text-gray-900",
  },
  grass: {
    base: "border-green-300 bg-green-50 text-green-700",
    selected: "border-green-500 bg-green-500 text-white",
  },
  ice: {
    base: "border-cyan-300 bg-cyan-50 text-cyan-700",
    selected: "border-cyan-400 bg-cyan-400 text-gray-900",
  },
  fighting: {
    base: "border-red-300 bg-red-50 text-red-800",
    selected: "border-red-700 bg-red-700 text-white",
  },
  poison: {
    base: "border-purple-300 bg-purple-50 text-purple-700",
    selected: "border-purple-500 bg-purple-500 text-white",
  },
  ground: {
    base: "border-amber-400 bg-amber-50 text-amber-800",
    selected: "border-amber-600 bg-amber-600 text-white",
  },
  flying: {
    base: "border-indigo-300 bg-indigo-50 text-indigo-700",
    selected: "border-indigo-400 bg-indigo-400 text-white",
  },
  psychic: {
    base: "border-pink-300 bg-pink-50 text-pink-700",
    selected: "border-pink-500 bg-pink-500 text-white",
  },
  bug: {
    base: "border-lime-300 bg-lime-50 text-lime-700",
    selected: "border-lime-500 bg-lime-500 text-white",
  },
  rock: {
    base: "border-yellow-500 bg-yellow-50 text-yellow-800",
    selected: "border-yellow-700 bg-yellow-700 text-white",
  },
  ghost: {
    base: "border-purple-400 bg-purple-100 text-purple-800",
    selected: "border-purple-700 bg-purple-700 text-white",
  },
  dragon: {
    base: "border-indigo-400 bg-indigo-100 text-indigo-800",
    selected: "border-indigo-600 bg-indigo-600 text-white",
  },
  dark: {
    base: "border-gray-500 bg-gray-100 text-gray-800",
    selected: "border-gray-800 bg-gray-800 text-white",
  },
  steel: {
    base: "border-slate-300 bg-slate-50 text-slate-700",
    selected: "border-slate-400 bg-slate-400 text-gray-900",
  },
  fairy: {
    base: "border-pink-200 bg-pink-50 text-pink-600",
    selected: "border-pink-300 bg-pink-300 text-gray-900",
  },
};

export default function TypeChip({ label, selected, onClick }: Props) {
  const palette = TYPE_STYLES[label] ?? TYPE_STYLES.default;
  const className = selected ? palette.selected : palette.base;

  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full border capitalize text-sm font-medium transition hover:shadow-sm ${className}`}
    >
      {label}
    </button>
  );
}
