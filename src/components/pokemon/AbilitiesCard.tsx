"use client";

type Ability = {
  displayName: string;
  description: string;
  isHidden: boolean;
};

type Props = {
  abilities: Ability[];
};

export default function AbilitiesCard({ abilities }: Props) {
  return (
    <div className="rounded-[24px] border border-emerald-100/80 bg-white/70 p-6 shadow-inner transition-all duration-200 hover:border-emerald-200 hover:shadow-lg">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-500">Abilities</h2>
      <div className="mt-5 space-y-5">
        {abilities.map((ability, index) => (
          <div
            key={index}
            className="group rounded-xl border border-emerald-50 bg-white/50 p-4 transition-all duration-200 hover:border-emerald-200 hover:bg-white/80 hover:shadow-md"
          >
            <div className="flex items-center gap-2.5">
              <h3 className="text-base font-bold text-emerald-900">
                {ability.displayName}
              </h3>
              {ability.isHidden && (
                <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-700 transition-colors group-hover:bg-purple-200">
                  Hidden
                </span>
              )}
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-emerald-700">
              {ability.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

