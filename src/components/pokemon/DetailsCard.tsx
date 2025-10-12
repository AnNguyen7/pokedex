// AnN added: Combined Species/Training card on 10/11/2025

type EvYields = {
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;
};

type Props = {
  species?: string | null;
  heightM?: number | null;
  weightKg?: number | null;
  catchRate?: number | null;
  evYields: EvYields;
};

export default function DetailsCard({ species, heightM, weightKg, catchRate, evYields }: Props) {
  const formatHeight = (m: number) => {
    const totalInches = m * 39.3701;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${m.toFixed(1)} m (${feet}′${inches.toString().padStart(2, '0')}″)`;
  };

  const formatWeight = (kg: number) => {
    const lbs = (kg * 2.20462).toFixed(1);
    return `${kg.toFixed(1)} kg (${lbs} lbs)`;
  };

  const formatCatchRate = (rate: number) => {
    const percentage = ((rate / 255) * 100).toFixed(1);
    return `${rate} (${percentage}% with PokéBall, full HP)`;
  };

  const evYieldText = (() => {
    const yields: string[] = [];
    if (evYields.hp > 0) yields.push(`${evYields.hp} HP`);
    if (evYields.attack > 0) yields.push(`${evYields.attack} Attack`);
    if (evYields.defense > 0) yields.push(`${evYields.defense} Defense`);
    if (evYields.spAtk > 0) yields.push(`${evYields.spAtk} Sp. Atk`);
    if (evYields.spDef > 0) yields.push(`${evYields.spDef} Sp. Def`);
    if (evYields.speed > 0) yields.push(`${evYields.speed} Speed`);
    return yields.join(", ") || "None";
  })();

  return (
    <div className="space-y-6 rounded-[28px] border border-emerald-100 bg-white/90 p-6 shadow-lg backdrop-blur transition-all duration-200 hover:border-emerald-200 hover:shadow-xl sm:p-8">
      <h2 className="text-xl font-bold text-emerald-800 sm:text-2xl">Pokémon Details</h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Left column: Species/Height/Weight */}
        <div className="space-y-4">
          {species && (
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">Species</span>
              <span className="text-base text-emerald-900">{species}</span>
            </div>
          )}
          {heightM !== null && heightM !== undefined && (
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">Height</span>
              <span className="text-base text-emerald-900">{formatHeight(heightM)}</span>
            </div>
          )}
          {weightKg !== null && weightKg !== undefined && (
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">Weight</span>
              <span className="text-base text-emerald-900">{formatWeight(weightKg)}</span>
            </div>
          )}
        </div>

        {/* Right column: EV Yield/Catch Rate */}
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">EV Yield</span>
            <span className="text-base text-emerald-900">{evYieldText}</span>
          </div>
          {catchRate !== null && catchRate !== undefined && (
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">Catch Rate</span>
              <span className="text-base text-emerald-900">{formatCatchRate(catchRate)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
