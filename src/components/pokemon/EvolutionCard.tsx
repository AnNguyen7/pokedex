"use client";

import Link from "next/link";
import AnimatedSprite from "@/components/AnimatedSprite";
import { spriteUrls } from "@/lib/sprites"; // AnN updated on 10/11/2025

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

        <div className="flex flex-wrap items-center gap-2 text-sm text-emerald-800 sm:gap-4">
          {stages.map((stage, index) => {
            const sprites = spriteUrls(stage.dex);
            return (
              <div key={stage.dex} className="flex items-center gap-2 sm:gap-3">
                {index > 0 && <span aria-hidden className="text-sm text-emerald-400 sm:text-base">&rarr;</span>}
                <Link
                  href={`/pokemon/${stage.slug}`}
                  className="group flex items-center gap-2 rounded-lg p-1.5 transition-all hover:bg-emerald-50 hover:shadow-sm sm:gap-3 sm:p-2"
                >
                  <AnimatedSprite
                    animatedSrc={sprites.animated}
                    fallbackSrc={sprites.fallback}
                    alt={stage.name}
                    width={36}
                    height={36}
                    className="h-8 w-8 object-contain drop-shadow transition-transform group-hover:scale-110 sm:h-9 sm:w-9"
                  />
                  <span className="text-xs font-medium text-emerald-800 transition-colors group-hover:text-emerald-600 sm:text-sm">
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
