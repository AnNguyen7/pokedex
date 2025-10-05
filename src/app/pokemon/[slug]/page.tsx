import type { Metadata } from "next";
import Link from "next/link";
import { spriteUrls } from "@/lib/starters";
import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/pokemon/HeroSection";
import MetaCard from "@/components/pokemon/MetaCard";
import EvolutionCard from "@/components/pokemon/EvolutionCard";
import StatsCard from "@/components/pokemon/StatsCard";
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
      hp: true,
      attack: true,
      defense: true,
      specialAttack: true,
      specialDefense: true,
      speed: true,
      summary: true,
      description: true,
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
  const allSprites = {
    ...sprites,
    animatedShiny: sprites.animatedShiny,
    fallbackShiny: sprites.fallbackShiny,
  };

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

  return (
    <main className="mx-auto max-w-5xl px-6 py-14 text-emerald-900">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 transition hover:text-emerald-500"
      >
        <span aria-hidden>&larr;</span>
        Back to Pokédex
      </Link>

      <section className="mt-10 grid gap-8 rounded-[36px] border border-emerald-100 bg-white/85 p-10 shadow-xl backdrop-blur lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="space-y-8">
          <HeroSection
            displayName={pokemon.displayName}
            nationalDex={pokemon.nationalDex}
            types={types}
            sprites={allSprites}
          />
          <MetaCard types={types} />
          <EvolutionCard stages={evolutionStages} />
        </div>

        <StatsCard stats={statEntries} total={total} primaryType={types[0]} />
      </section>

      {pokemon.summary && (
        <section className="mt-16 space-y-4 rounded-[32px] border border-emerald-100 bg-white/85 p-8 shadow-lg backdrop-blur">
          <h2 className="text-xl font-semibold text-emerald-800">Summary</h2>
          <p className="text-base leading-7 text-emerald-800">{pokemon.summary}</p>
        </section>
      )}

      {pokemon.description && (
        <section className="mt-8 space-y-4 rounded-[32px] border border-emerald-100 bg-white/85 p-8 shadow-lg backdrop-blur">
          <h2 className="text-xl font-semibold text-emerald-800">Pokédex Notes</h2>
          <p className="text-base leading-7 text-emerald-800">{pokemon.description}</p>
        </section>
      )}
    </main>
  );
}
