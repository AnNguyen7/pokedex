import ClientGrid from "@/components/ClientGrid";
import { prisma } from "@/lib/prisma";
import type { PokemonType } from "@prisma/client";
import type { PokemonListItem, PokemonTypeName } from "@/types/pokemon";

export const revalidate = 3600;

const toListItem = (pokemon: {
  nationalDex: number;
  slug: string;
  displayName: string;
  primaryType: PokemonType;
  secondaryType: PokemonType | null;
}): PokemonListItem => ({
  nationalDex: pokemon.nationalDex,
  slug: pokemon.slug,
  displayName: pokemon.displayName,
  types: [pokemon.primaryType, pokemon.secondaryType]
    .filter(Boolean)
    .map(type => type!.toLowerCase() as PokemonTypeName),
});

export default async function Home() {
  const pokemon = await prisma.pokemon.findMany({
    orderBy: { nationalDex: "asc" },
    select: {
      nationalDex: true,
      slug: true,
      displayName: true,
      primaryType: true,
      secondaryType: true,
    },
  });

  const listItems = pokemon.map(toListItem);

  return <ClientGrid pokemon={listItems} />;
}
