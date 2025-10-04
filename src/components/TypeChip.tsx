"use client";

import type { PokemonTypeName } from "@/types/pokemon";

type Props = {
  label: "all" | PokemonTypeName;
  selected?: boolean;
  onClick?: () => void;
};

const TYPE_STYLES: Record<"default", { base: string; selected: string }> &
  Partial<Record<PokemonTypeName | "all", { base: string; selected: string }>> = {
  default: {
    base: "border-emerald-100 bg-white/70 text-emerald-700",
    selected: "border-emerald-400 bg-emerald-500 text-white",
  },
  all: {
    base: "border-emerald-100 bg-white/70 text-emerald-700",
    selected: "border-emerald-400 bg-emerald-500 text-white",
  },
  grass: {
    base: "border-emerald-200 bg-emerald-50 text-emerald-700",
    selected: "border-emerald-500 bg-emerald-500 text-white",
  },
  fire: {
    base: "border-orange-200 bg-orange-50 text-orange-700",
    selected: "border-orange-500 bg-orange-500 text-white",
  },
  water: {
    base: "border-sky-200 bg-sky-50 text-sky-700",
    selected: "border-sky-500 bg-sky-500 text-white",
  },
  bug: {
    base: "border-lime-200 bg-lime-50 text-lime-700",
    selected: "border-lime-500 bg-lime-500 text-white",
  },
  poison: {
    base: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700",
    selected: "border-fuchsia-500 bg-fuchsia-500 text-white",
  },
  flying: {
    base: "border-indigo-200 bg-indigo-50 text-indigo-700",
    selected: "border-indigo-500 bg-indigo-500 text-white",
  },
  normal: {
    base: "border-amber-200 bg-amber-50 text-amber-700",
    selected: "border-amber-500 bg-amber-500 text-white",
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
