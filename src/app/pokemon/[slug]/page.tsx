import type { Metadata } from "next";
import Link from "next/link";
import { spriteUrls } from "@/lib/sprites"; // AnN updated on 10/11/2025
import { prisma } from "@/lib/prisma";
// AnN add: Shiny theme provider and client component for Pokemon detail page on 10/13/2025
import { ShinyProvider } from "@/contexts/ShinyContext";
import PokemonDetailClient from "@/components/pokemon/PokemonDetailClient";
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

      <ShinyProvider>
        <PokemonDetailClient
          displayName={pokemon.displayName}
          nationalDex={pokemon.nationalDex}
          types={types}
          sprites={sprites}
          cryUrl={pokemon.cryUrl}
          species={pokemon.species}
          heightM={pokemon.heightM}
          weightKg={pokemon.weightKg}
          description={pokemon.description}
          abilities={abilities}
          evolutionStages={evolutionStages}
          stats={statEntries}
          totalStats={total}
          primaryType={types[0]}
          evYields={evYields}
          catchRate={pokemon.catchRate ?? 0}
          typeEffectiveness={[]} // Not used in current implementation
        />
      </ShinyProvider>

      {pokemon.summary && (
        <section className="mt-8 space-y-3 rounded-[32px] border border-emerald-100 bg-white/85 p-6 shadow-lg backdrop-blur transition-all duration-200 hover:border-emerald-200 hover:shadow-xl sm:mt-16 sm:space-y-4 sm:p-8">
          <h2 className="text-lg font-semibold text-emerald-800 sm:text-xl">Summary</h2>
          <p className="text-sm leading-6 text-emerald-800 sm:text-base sm:leading-7">{pokemon.summary}</p>
        </section>
      )}
    </main>
  );
}
