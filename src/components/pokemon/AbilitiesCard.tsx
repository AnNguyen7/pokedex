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
      <div className="mt-5 flex flex-wrap gap-3">
        {abilities.map((ability, index) => (
          <div
            key={index}
            className="group relative"
          >
            {/* Main ability pill */}
            <div className="flex cursor-default items-center gap-2 rounded-full bg-gradient-to-br from-emerald-50/90 to-emerald-100/50 px-4 py-2.5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:scale-105">
              <span className="text-sm font-semibold text-emerald-900">
                {ability.displayName}
              </span>
              {ability.isHidden && (
                <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-purple-700">
                  Hidden
                </span>
              )}
            </div>

            {/* Hover tooltip - positioned to the right */}
            <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 w-96 -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
              {/* Arrow pointing left */}
              <div className="absolute right-full top-1/2 h-0 w-0 -translate-y-1/2 border-[8px] border-transparent border-r-white/95" />

              {/* Tooltip content */}
              <div className="rounded-2xl border border-emerald-200/80 bg-white/95 p-4 shadow-2xl backdrop-blur-md">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-sm font-bold text-emerald-900">
                    {ability.displayName}
                  </h3>
                  {ability.isHidden && (
                    <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-purple-700">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-emerald-800">
                  {ability.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
