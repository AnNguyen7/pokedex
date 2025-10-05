"use client";

import type { PokemonTypeName } from "@/types/pokemon";
import AnimatedSprite from "@/components/AnimatedSprite";
import { TYPE_BADGE_STYLES } from "@/components/pokemon/typeStyles";

const formatDexNumber = (dex: number) => `#${dex.toString().padStart(3, "0")}`;

type SpriteSources = {
  animated: string;
  fallback: string;
  animatedShiny?: string;
  fallbackShiny?: string;
};

type Props = {
  displayName: string;
  nationalDex: number;
  types: PokemonTypeName[];
  sprites: SpriteSources;
};

export default function HeroSection({ displayName, nationalDex, types, sprites }: Props) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
      <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-3xl border border-emerald-100 bg-emerald-50/80 shadow-inner sm:mx-0">
        <AnimatedSprite
          animatedSrc={sprites.animated}
          fallbackSrc={sprites.fallback}
          animatedShinySrc={sprites.animatedShiny}
          fallbackShinySrc={sprites.fallbackShiny}
          alt={displayName}
          width={192}
          height={192}
          className="h-40 w-40 object-contain drop-shadow"
        />
      </div>
      <div className="flex-1 space-y-5 text-center sm:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-400">
          {formatDexNumber(nationalDex)}
        </p>
        <h1 className="text-4xl font-bold text-emerald-900 sm:text-5xl">{displayName}</h1>
        <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
          {types.map(type => (
            <span
              key={type}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize shadow-sm transition ${
                TYPE_BADGE_STYLES[type as keyof typeof TYPE_BADGE_STYLES] ?? "bg-emerald-100/80 text-emerald-700"
              }`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
