type Props = {
  species: string | null;
  heightM: number | null;
  weightKg: number | null;
};

/**
 * Converts metric height to both metric and imperial units.
 * Example: 0.7 m → "0.7 m (2′04″)"
 */
function formatHeight(heightM: number): string {
  const totalInches = heightM * 39.3701;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${heightM.toFixed(1)} m (${feet}′${inches.toString().padStart(2, '0')}″)`;
}

/**
 * Converts weight from kilograms to include pounds.
 * Example: 6.9 kg → "6.9 kg (15.2 lbs)"
 */
function formatWeight(weightKg: number): string {
  const lbs = (weightKg * 2.20462).toFixed(1);
  return `${weightKg} kg (${lbs} lbs)`;
}

export default function MetaCard({ species, heightM, weightKg }: Props) {
  return (
    <div className="rounded-[24px] border border-emerald-100/80 bg-white/80 p-6 shadow-inner transition-all duration-200 hover:border-emerald-200 hover:shadow-lg">
      <dl className="space-y-4 text-sm text-emerald-800">
        {species && (
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
            <dt className="font-semibold uppercase tracking-wide text-emerald-500">Species</dt>
            <dd className="font-medium text-emerald-800">{species}</dd>
          </div>
        )}
        {heightM !== null && heightM !== undefined && (
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
            <dt className="font-semibold uppercase tracking-wide text-emerald-500">Height</dt>
            <dd className="font-medium text-emerald-800">{formatHeight(heightM)}</dd>
          </div>
        )}
        {weightKg !== null && weightKg !== undefined && (
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
            <dt className="font-semibold uppercase tracking-wide text-emerald-500">Weight</dt>
            <dd className="font-medium text-emerald-800">{formatWeight(weightKg)}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
