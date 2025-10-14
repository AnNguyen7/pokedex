"use client";

import Link from "next/link";
import Image from "next/image";
// AnN add: Shiny theme support for evolution card on 10/13/2025
import { useShiny } from "@/contexts/ShinyContext";

type Stage = {
  dex: number;
  name: string;
  slug: string;
};

type Props = {
  stages: Stage[];
};

export default function EvolutionCard({ stages }: Props) {
  const { isShiny } = useShiny();

  // Shiny theme classes
  const cardClasses = isShiny
    ? "rounded-[24px] border border-lime-600/25 bg-lime-800/20 p-6 shadow-inner transition-all duration-200 hover:border-lime-500/30 hover:shadow-lg"
    : "rounded-[24px] border border-emerald-100/80 bg-white/70 p-6 shadow-inner transition-all duration-200 hover:border-emerald-200 hover:shadow-lg";

  const titleClasses = isShiny ? "text-sm font-semibold uppercase tracking-wide text-lime-600" : "text-sm font-semibold uppercase tracking-wide text-emerald-500";
  const textClasses = isShiny ? "flex flex-wrap items-center gap-3 text-sm text-lime-600" : "flex flex-wrap items-center gap-3 text-sm text-emerald-800";
  const arrowClasses = isShiny ? "text-lime-200" : "text-emerald-400";

  const linkClasses = isShiny
    ? "group flex items-center gap-2 rounded-full bg-gradient-to-br from-lime-700/40 to-lime-800/30 px-3 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-md hover:from-lime-600/50 hover:to-lime-700/40"
    : "group flex items-center gap-2 rounded-full bg-gradient-to-br from-emerald-50/90 to-emerald-100/50 px-3 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-md hover:from-emerald-100/90 hover:to-emerald-200/50";

  const nameClasses = isShiny ? "text-sm font-semibold text-lime-200" : "text-sm font-semibold text-emerald-900";

  return (
    <div className={cardClasses}>
      <h2 className={titleClasses}>Evolution Chain</h2>
      <div className="mt-4">

        <div className={textClasses}>
          {stages.map((stage, index) => {
            {/* AnN add/fix: Use PokéSprite icons for evolution chain on 10/13/2025 */}
            const pokespriteUrl = `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${stage.slug}.png`;
            return (
              <div key={stage.dex} className="flex items-center gap-3">
                {index > 0 && <span aria-hidden className={arrowClasses}>&rarr;</span>}
                <Link
                  href={`/pokemon/${stage.slug}`}
                  className={linkClasses}
                >
                  <Image
                    src={pokespriteUrl}
                    alt={stage.name}
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain drop-shadow transition-transform group-hover:scale-110"
                  />
                  <span className={nameClasses}>
                    {stage.name}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
