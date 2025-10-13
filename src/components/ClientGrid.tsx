"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import TypeChip from "@/components/TypeChip";
import PokemonCard from "@/components/PokemonCard";
import type { PokemonListItem, PokemonTypeName } from "@/types/pokemon";

// Generation ranges
const GENERATION_RANGES = [
  { gen: 1, name: "Gen 1", start: 1, end: 151 },
  { gen: 2, name: "Gen 2", start: 152, end: 251 },
  { gen: 3, name: "Gen 3", start: 252, end: 386 },
  { gen: 4, name: "Gen 4", start: 387, end: 493 },
  { gen: 5, name: "Gen 5", start: 494, end: 649 },
];

export default function ClientGrid({ pokemon }: { pokemon: PokemonListItem[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | PokemonTypeName>("all");
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Read the 'type' parameter from URL and set the filter
  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam && typeParam !== 'all') {
      setSelectedType(typeParam as PokemonTypeName);
      // Scroll to top to show the filtered results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [searchParams]);

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToGeneration = (gen: number) => {
    const element = document.getElementById(`gen-${gen}`);
    if (element) {
      const offset = 100; // Offset for fixed header
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

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

  // Group Pokémon by generation
  const pokemonByGeneration = useMemo(() => {
    return GENERATION_RANGES.map(genInfo => ({
      ...genInfo,
      pokemon: filtered.filter(
        p => p.nationalDex >= genInfo.start && p.nationalDex <= genInfo.end
      ),
    }));
  }, [filtered]);

  const handleClearFilter = () => {
    setSelectedType("all");
    router.push("/");
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <header className="space-y-6 mb-10 text-emerald-900">
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-emerald-900">List of Pokémon</h1>
        </div>

        {/* Description */}
        <div className="rounded-3xl border border-emerald-100 bg-white/80 px-6 py-5 text-sm leading-6 text-emerald-800 shadow-sm backdrop-blur text-center">
          <p>
            This is the complete <strong>National Pokédex</strong> for Generation 1-5, which lists every one of the 649 Pokémon discovered so far.
          </p>
          <p className="mt-2">
            Click a Pokémon&apos;s name to see its detailed Pokédex page, or click a type to see other Pokémon of the same type.
          </p>
        </div>

        {/* Jump to Generation Navigation */}
        <div className="rounded-3xl border border-emerald-100 bg-white/80 px-6 py-5 backdrop-blur">
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="font-semibold text-emerald-900">Jump to</span>
            {GENERATION_RANGES.map(gen => (
              <button
                key={gen.gen}
                onClick={() => scrollToGeneration(gen.gen)}
                className="rounded-full bg-white/80 px-4 py-1.5 font-medium text-emerald-700 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-emerald-100 hover:text-emerald-900 hover:shadow-md"
              >
                {gen.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="mb-8 space-y-4">
        <SearchBar onChange={setQuery} />
        <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
          {typeOptions.map(type => (
            <TypeChip
              key={type}
              label={type}
              selected={type === selectedType}
              onClick={() => setSelectedType(type === selectedType ? "all" : type)}
            />
          ))}
          {selectedType !== "all" && (
            <button
              onClick={handleClearFilter}
              className="ml-2 px-4 py-1 rounded-full border border-red-200 bg-red-50 text-red-600 text-sm font-medium transition-all hover:bg-red-100 hover:border-red-300 hover:shadow-sm active:scale-95"
            >
              Clear ✕
            </button>
          )}
        </div>
      </section>

      {/* Generation Sections */}
      {pokemonByGeneration.map(genGroup => (
        genGroup.pokemon.length > 0 && (
          <section key={genGroup.gen} id={`gen-${genGroup.gen}`} className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-emerald-900">
              {genGroup.name}
              <span className="ml-3 text-base font-normal text-emerald-600">
                #{genGroup.start.toString().padStart(3, '0')} - #{genGroup.end.toString().padStart(3, '0')}
              </span>
            </h2>
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {genGroup.pokemon.map(entry => (
                <PokemonCard
                  key={entry.nationalDex}
                  nationalDex={entry.nationalDex}
                  slug={entry.slug}
                  displayName={entry.displayName}
                  types={entry.types}
                />
              ))}
            </div>
          </section>
        )
      ))}

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-gray-500">
          No Pokémon match your filters yet.
        </p>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-emerald-700 hover:shadow-xl"
          aria-label="Back to top"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </main>
  );
}
