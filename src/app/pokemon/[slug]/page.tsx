import type { Metadata } from "next";
import Link from "next/link";
import { spriteUrls } from "@/lib/sprites"; // AnN updated on 10/11/2025
import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/pokemon/HeroSection"; // AnN updated on 10/11/2025
import EvolutionCard from "@/components/pokemon/EvolutionCard";
import AbilitiesCard from "@/components/pokemon/AbilitiesCard";
import StatsCard from "@/components/pokemon/StatsCard";
import TrainingCard from "@/components/pokemon/TrainingCard";
import TypeEffectivenessCard from "@/components/pokemon/TypeEffectivenessCard";
import type { PokemonTypeName } from "@/types/pokemon";


export async function generateStaticParams() {
  const pokemon = await prisma.pokemon.findMany({ select: { slug: true } });
  return pokemon.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const pokemon = await prisma.pokemon.findUnique({
    where: { slug: params.slug },
    select: { displayName: true },
  });
  return {
    title: pokemon ? `${pokemon.displayName} · Pokédex` : "Pokémon",
  };
}

export default async function PokemonPage({ params }: { params: { slug: string } }) {
  const pokemon = await prisma.pokemon.findUnique({
    where: { slug: params.slug },
    select: {
      slug: true,
      displayName: true,
      nationalDex: true,
      primaryType: true,
      secondaryType: true,
      cryUrl: true, // AnN added on 10/11/2025
      species: true,
      heightM: true,
      weightKg: true,
      catchRate: true,
      evYieldHP: true,
      evYieldAttack: true,
      evYieldDefense: true,
      evYieldSpAtk: true,
      evYieldSpDef: true,
      evYieldSpeed: true,
      hp: true,
      attack: true,
      defense: true,
      specialAttack: true,
      specialDefense: true,
      speed: true,
      summary: true,
      description: true,
      abilities: {
        select: {
          isHidden: true,
          ability: {
            select: {
              displayName: true,
              description: true,
            },
          },
        },
      },
      evolutionStage: {
        select: {
          chain: {
            select: {
              stages: {
                orderBy: { order: "asc" },
                select: {
                  order: true,
                  pokemon: {
                    select: {
                      nationalDex: true,
                      displayName: true,
                      slug: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!pokemon) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10 text-emerald-900">
        <Link href="/" className="text-sm text-emerald-600 hover:underline">&larr; Back to Pokédex</Link>
        <h1 className="mt-6 text-3xl font-semibold">Pokémon not found</h1>
        <p className="mt-2 text-emerald-700">Try returning to the main list and selecting another entry.</p>
      </main>
    );
  }

  const types = [pokemon.primaryType, pokemon.secondaryType]
    .filter(Boolean)
    .map(type => type!.toLowerCase() as PokemonTypeName);

  const sprites = spriteUrls(pokemon.nationalDex);

  const statEntries = [
    { key: "hp", label: "HP", value: pokemon.hp },
    { key: "attack", label: "Attack", value: pokemon.attack },
    { key: "defense", label: "Defense", value: pokemon.defense },
    { key: "specialAttack", label: "Sp. Atk", value: pokemon.specialAttack },
    { key: "specialDefense", label: "Sp. Def", value: pokemon.specialDefense },
    { key: "speed", label: "Speed", value: pokemon.speed },
  ];

  const total = statEntries.reduce((sum, stat) => sum + stat.value, 0);

  const evolutionStages = pokemon.evolutionStage?.chain.stages.map(stage => ({
    dex: stage.pokemon.nationalDex,
    name: stage.pokemon.displayName,
    slug: stage.pokemon.slug,
  })) ?? [{ dex: pokemon.nationalDex, name: pokemon.displayName, slug: pokemon.slug }];

  const abilities = pokemon.abilities.map(pa => ({
    displayName: pa.ability.displayName,
    description: pa.ability.description,
    isHidden: pa.isHidden,
  }));

  const evYields = {
    hp: pokemon.evYieldHP,
    attack: pokemon.evYieldAttack,
    defense: pokemon.evYieldDefense,
    spAtk: pokemon.evYieldSpAtk,
    spDef: pokemon.evYieldSpDef,
    speed: pokemon.evYieldSpeed,
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-14 text-emerald-900">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 transition hover:text-emerald-500"
      >
        <span aria-hidden>&larr;</span>
        Back to Pokédex
      </Link>

      <section className="mt-10 rounded-[36px] border border-emerald-100 bg-white/85 p-6 shadow-xl backdrop-blur sm:p-8 md:p-10">
        {/* AnN updated: Reorganized layout with wider left column on 10/12/2025 */}
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
          {/* Left column: Sprite, Evolution, Abilities - AnN updated on 10/12/2025 */}
          <div className="space-y-8">
            <HeroSection
              displayName={pokemon.displayName}
              nationalDex={pokemon.nationalDex}
              types={types}
              sprites={sprites}
              cryUrl={pokemon.cryUrl}
              species={pokemon.species ?? null}
              heightM={pokemon.heightM ?? null}
              weightKg={pokemon.weightKg ?? null}
            />

            {/* AnN add/fix: Only show evolution chain if Pokémon has evolutions (2+ stages) on 10/13/2025 */}
            {evolutionStages.length > 1 && <EvolutionCard stages={evolutionStages} />}

            <AbilitiesCard abilities={abilities} />

            {/* Pokédex Notes - moved inside main card on 10/13/2025 */}
            {pokemon.description && (
              <div className="rounded-[24px] border border-emerald-100/80 bg-white/70 p-6 shadow-inner transition-all duration-200 hover:border-emerald-200 hover:shadow-lg">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-500">Pokédex Notes</h2>
                <p className="mt-4 text-base leading-relaxed text-emerald-800">{pokemon.description}</p>
              </div>
            )}
          </div>

          {/* Right column: Base Stats, Training, Type Effectiveness */}
          <div className="space-y-8">
            <StatsCard stats={statEntries} total={total} primaryType={types[0]} />
            <TrainingCard catchRate={pokemon.catchRate ?? null} evYields={evYields} />
            <TypeEffectivenessCard types={types} />
          </div>
        </div>
      </section>

      {pokemon.summary && (
        <section className="mt-8 space-y-3 rounded-[32px] border border-emerald-100 bg-white/85 p-6 shadow-lg backdrop-blur transition-all duration-200 hover:border-emerald-200 hover:shadow-xl sm:mt-16 sm:space-y-4 sm:p-8">
          <h2 className="text-lg font-semibold text-emerald-800 sm:text-xl">Summary</h2>
          <p className="text-sm leading-6 text-emerald-800 sm:text-base sm:leading-7">{pokemon.summary}</p>
        </section>
      )}
    </main>
  );
}
