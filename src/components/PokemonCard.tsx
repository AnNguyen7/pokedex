import { spriteUrls } from "@/lib/starters";
import Link from "next/link";
import AnimatedSprite from "@/components/AnimatedSprite";
import type { PokemonTypeName } from "@/types/pokemon";
import { badgeClassForNames } from "@/components/pokemon/typeStyles";

type Props = {
  nationalDex: number;
  slug: string;
  displayName: string;
  types: PokemonTypeName[];
};

const formatDexNumber = (dex: number) => `#${dex.toString().padStart(3, "0")}`;

export default function PokemonCard({ nationalDex, slug, displayName, types }: Props) {
  const { animated, fallback } = spriteUrls(nationalDex);

  return (
    <Link
      href={`/pokemon/${slug}`}
      className="group block rounded-3xl border border-emerald-100/80 bg-white/80 px-5 py-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
    >
      <div className="flex h-32 items-center justify-center">
        <AnimatedSprite
          animatedSrc={animated}
          fallbackSrc={fallback}
          alt={displayName}
          width={96}
          height={96}
          className="h-24 w-24 object-contain drop-shadow"
        />
      </div>
      <div className="mt-1 text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
          {formatDexNumber(nationalDex)}
        </div>
        <div className="mt-1 text-lg font-semibold text-emerald-800 transition group-hover:text-emerald-600">
          {displayName}
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-2">
        {types.map(type => (
          <span
            key={type}
            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
              badgeClassForNames[type] ?? "bg-gray-100 text-gray-600"
            }`}
          >
            {type}
          </span>
        ))}
      </div>
    </Link>
  );
}
