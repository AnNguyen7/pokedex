"use client";

// AnN add: Shiny theme support for abilities card on 10/13/2025
import { useShiny } from "@/contexts/ShinyContext";

type Ability = {
  displayName: string;
  description: string;
  isHidden: boolean;
};

type Props = {
  abilities: Ability[];
};

export default function AbilitiesCard({ abilities }: Props) {
  const { isShiny } = useShiny();

  // Shiny theme classes
  const cardClasses = isShiny
    ? "rounded-[24px] border border-lime-600/25 bg-lime-800/20 p-6 shadow-inner transition-all duration-200 hover:border-lime-500/30 hover:shadow-lg"
    : "rounded-[24px] border border-emerald-100/80 bg-white/70 p-6 shadow-inner transition-all duration-200 hover:border-emerald-200 hover:shadow-lg";

  const titleClasses = isShiny ? "text-sm font-semibold uppercase tracking-wide text-lime-600" : "text-sm font-semibold uppercase tracking-wide text-emerald-500";
  
  const pillClasses = isShiny
    ? "flex cursor-default items-center gap-2 rounded-full bg-gradient-to-br from-lime-700/40 to-lime-800/30 px-4 py-2.5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:scale-105 hover:from-lime-600/50 hover:to-lime-700/40"
    : "flex cursor-default items-center gap-2 rounded-full bg-gradient-to-br from-emerald-50/90 to-emerald-100/50 px-4 py-2.5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:scale-105";

  const abilityNameClasses = isShiny ? "text-sm font-semibold text-lime-200" : "text-sm font-semibold text-emerald-900";

  const tooltipClasses = isShiny
    ? "rounded-2xl border border-lime-200/80 bg-white/95 p-4 shadow-2xl backdrop-blur-md"
    : "rounded-2xl border border-emerald-200/80 bg-white/95 p-4 shadow-2xl backdrop-blur-md";

  const tooltipTitleClasses = isShiny ? "text-sm font-bold text-lime-800" : "text-sm font-bold text-emerald-900";
  const tooltipDescClasses = isShiny ? "text-sm leading-relaxed text-lime-700" : "text-sm leading-relaxed text-emerald-800";

  return (
    <div className={cardClasses}>
      <h2 className={titleClasses}>Abilities</h2>
      <div className="mt-5 flex flex-wrap gap-3">
        {abilities.map((ability, index) => (
          <div
            key={index}
            className="group relative"
          >
            {/* Main ability pill */}
            <div className={pillClasses}>
              <span className={abilityNameClasses}>
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
              <div className={tooltipClasses}>
                <div className="mb-2 flex items-center gap-2">
                  <h3 className={tooltipTitleClasses}>
                    {ability.displayName}
                  </h3>
                  {ability.isHidden && (
                    <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-purple-700">
                      Hidden
                    </span>
                  )}
                </div>
                <p className={tooltipDescClasses}>
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
