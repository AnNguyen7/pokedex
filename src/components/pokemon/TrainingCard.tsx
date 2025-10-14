"use client";

// AnN add: Shiny theme support for training card on 10/13/2025
import { useShiny } from "@/contexts/ShinyContext";

type EVYields = {
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;
};

type Props = {
  catchRate: number | null;
  evYields: EVYields;
};

function formatEVYield(evYields: EVYields): string {
  const yields: string[] = [];

  if (evYields.hp > 0) yields.push(`${evYields.hp} HP`);
  if (evYields.attack > 0) yields.push(`${evYields.attack} Attack`);
  if (evYields.defense > 0) yields.push(`${evYields.defense} Defense`);
  if (evYields.spAtk > 0) yields.push(`${evYields.spAtk} Sp. Atk`);
  if (evYields.spDef > 0) yields.push(`${evYields.spDef} Sp. Def`);
  if (evYields.speed > 0) yields.push(`${evYields.speed} Speed`);

  return yields.length > 0 ? yields.join(", ") : "None";
}

function formatCatchRate(catchRate: number): string {
  const percentage = ((catchRate / 765) * 100).toFixed(1);
  return `${catchRate} (${percentage}% with PokéBall, full HP)`;
}

export default function TrainingCard({ catchRate, evYields }: Props) {
  const { isShiny } = useShiny();

  // Shiny theme classes
  const cardClasses = isShiny
    ? "rounded-[28px] border border-lime-600/25 bg-lime-800/20 p-6 shadow-inner transition-all duration-200 hover:border-lime-500/30 hover:shadow-lg sm:p-8"
    : "rounded-[28px] border border-emerald-100/70 bg-white/80 p-6 shadow-inner transition-all duration-200 hover:border-emerald-200 hover:shadow-lg sm:p-8";

  const textClasses = isShiny ? "space-y-4 text-sm text-lime-600" : "space-y-4 text-sm text-emerald-800";
  const labelClasses = isShiny ? "font-semibold uppercase tracking-wide text-lime-600" : "font-semibold uppercase tracking-wide text-emerald-500";
  const valueClasses = isShiny ? "font-medium text-lime-800" : "font-medium text-emerald-800";

  return (
    <aside className={cardClasses}>
      <dl className={textClasses}>
        <div className="flex flex-col gap-1">
          <dt className={labelClasses}>EV Yield</dt>
          <dd className={valueClasses}>{formatEVYield(evYields)}</dd>
        </div>
        {catchRate !== null && catchRate !== undefined && (
          <div className="flex flex-col gap-1">
            <dt className={labelClasses}>Catch Rate</dt>
            <dd className={valueClasses}>{formatCatchRate(catchRate)}</dd>
          </div>
        )}
      </dl>
    </aside>
  );
}
