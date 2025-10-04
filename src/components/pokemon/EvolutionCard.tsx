"use client";

import AnimatedSprite from "@/components/AnimatedSprite";
import { spriteUrls } from "@/lib/starters";

type Stage = {
  dex: number;
  name: string;
};

type Props = {
  stages: Stage[];
};

export default function EvolutionCard({ stages }: Props) {
  return (
    <div className="flex flex-col gap-6 rounded-[24px] border border-emerald-100/80 bg-white/70 p-6 shadow-inner">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-500">Abilities</h2>
        <p className="mt-2 text-sm text-emerald-800">Coming soon</p>
      </div>
      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-500">Evolution Chain</h2>
        <div className="flex flex-wrap items-center gap-4 text-sm text-emerald-800">
          {stages.map((stage, index) => {
            const sprites = spriteUrls(stage.dex);
            return (
              <div key={stage.dex} className="flex items-center gap-3">
                {index > 0 && <span aria-hidden className="text-emerald-400">&rarr;</span>}
                <AnimatedSprite
                  animatedSrc={sprites.animated}
                  fallbackSrc={sprites.fallback}
                  alt={stage.name}
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain drop-shadow"
                />
                <span className="font-medium text-emerald-800">{stage.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
