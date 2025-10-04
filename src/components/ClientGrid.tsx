"use client";

import { useMemo, useState } from "react";
import SearchBar from "@/components/SearchBar";
import TypeChip from "@/components/TypeChip";
import PokemonCard from "@/components/PokemonCard";
import type { PokemonListItem, PokemonTypeName } from "@/types/pokemon";

export default function ClientGrid({ pokemon }: { pokemon: PokemonListItem[] }) {
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | PokemonTypeName>("all");

  const typeOptions = useMemo(() => {
    const seen = new Set<PokemonTypeName>();
    pokemon.forEach(entry => {
      entry.types.forEach(type => seen.add(type));
    });
    return ["all" as const, ...Array.from(seen)];
  }, [pokemon]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return pokemon.filter(entry => {
      const matchesName =
        !normalizedQuery ||
        entry.displayName.toLowerCase().includes(normalizedQuery) ||
        entry.slug.includes(normalizedQuery) ||
        entry.nationalDex.toString().padStart(3, "0").includes(normalizedQuery);
      const matchesType =
        selectedType === "all" || entry.types.includes(selectedType);
      return matchesName && matchesType;
    });
  }, [query, selectedType, pokemon]);

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <header className="space-y-6 mb-10 text-emerald-900">
        <div className="text-center space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-500">Kanto Region</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-emerald-900">FireRed &amp; LeafGreen Pokédex</h1>
        </div>
        <div className="rounded-3xl border border-emerald-100 bg-white/80 px-6 py-5 text-sm leading-6 text-emerald-800 shadow-sm backdrop-blur">
          <p className="mb-3">
            FireRed &amp; LeafGreen stick to the original 151 Pokémon of Red/Blue/Yellow,
            despite introducing two new generations in the meantime. These entries cover
            every evolution obtainable before the National Dex is unlocked.
          </p>
          <p>
            Official stats remain available on the <a className="text-emerald-600 underline" href="https://pokemondb.net/pokedex/game/firered-leafgreen" target="_blank" rel="noreferrer">Gen 1 Pokédex</a>.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <SearchBar onChange={setQuery} />
        <div className="flex flex-wrap gap-2">
          {typeOptions.map(type => (
            <TypeChip
              key={type}
              label={type}
              selected={type === selectedType}
              onClick={() => setSelectedType(type)}
            />
          ))}
        </div>
      </section>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map(entry => (
          <PokemonCard
            key={entry.nationalDex}
            nationalDex={entry.nationalDex}
            slug={entry.slug}
            displayName={entry.displayName}
            types={entry.types}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-gray-500">
          No Pokémon match your filters yet.
        </p>
      )}
    </main>
  );
}
