"use client";

import Link from "next/link";
import Image from "next/image";

type Stage = {
  dex: number;
  name: string;
  slug: string;
};

type Props = {
  stages: Stage[];
};

export default function EvolutionCard({ stages }: Props) {
  return (
    <div className="rounded-[24px] border border-emerald-100/80 bg-white/70 p-6 shadow-inner transition-all duration-200 hover:border-emerald-200 hover:shadow-lg">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-500">Evolution Chain</h2>
      <div className="mt-4">

        <div className="flex flex-wrap items-center gap-3 text-sm text-emerald-800">
          {stages.map((stage, index) => {
            {/* AnN add/fix: Use PokéSprite icons for evolution chain on 10/13/2025 */}
            const pokespriteUrl = `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${stage.slug}.png`;
            return (
              <div key={stage.dex} className="flex items-center gap-3">
                {index > 0 && <span aria-hidden className="text-emerald-400">&rarr;</span>}
                <Link
                  href={`/pokemon/${stage.slug}`}
                  className="group flex items-center gap-2 rounded-full bg-gradient-to-br from-emerald-50/90 to-emerald-100/50 px-3 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
                >
                  <Image
                    src={pokespriteUrl}
                    alt={stage.name}
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain drop-shadow transition-transform group-hover:scale-110"
                  />
                  <span className="text-sm font-semibold text-emerald-900">
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
