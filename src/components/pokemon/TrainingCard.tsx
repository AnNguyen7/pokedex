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
  return (
    <aside className="rounded-[28px] border border-emerald-100/70 bg-white/80 p-6 shadow-inner transition-all duration-200 hover:border-emerald-200 hover:shadow-lg sm:p-8">
      <dl className="space-y-4 text-sm text-emerald-800">
        <div className="flex flex-col gap-1">
          <dt className="font-semibold uppercase tracking-wide text-emerald-500">EV Yield</dt>
          <dd className="font-medium text-emerald-800">{formatEVYield(evYields)}</dd>
        </div>
        {catchRate !== null && catchRate !== undefined && (
          <div className="flex flex-col gap-1">
            <dt className="font-semibold uppercase tracking-wide text-emerald-500">Catch Rate</dt>
            <dd className="font-medium text-emerald-800">{formatCatchRate(catchRate)}</dd>
          </div>
        )}
      </dl>
    </aside>
  );
}
