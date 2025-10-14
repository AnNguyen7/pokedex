"use client";

// AnN add: Shiny theme support for abilities card on 10/13/2025
// AnN fix: Mobile touch support for ability tooltips on 10/13/2025
import { useState, useEffect, useRef } from "react";
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
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const toggleTooltip = (index: number) => {
    setActiveTooltip(activeTooltip === index ? null : index);
  };

  // Close tooltip when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setActiveTooltip(null);
      }
    };

    if (activeTooltip !== null) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [activeTooltip]);

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
    <div ref={cardRef} className={cardClasses}>
      <h2 className={titleClasses}>Abilities</h2>
      <div className="mt-5 flex flex-wrap gap-3">
        {abilities.map((ability, index) => {
          const isActive = activeTooltip === index;
          return (
            <div
              key={index}
              className="group relative"
            >
              {/* Main ability pill - clickable on mobile, hover on desktop */}
              <button
                onClick={() => toggleTooltip(index)}
                className={`${pillClasses} cursor-pointer`}
              >
                <span className={abilityNameClasses}>
                  {ability.displayName}
                </span>
                {ability.isHidden && (
                  <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-purple-700">
                    Hidden
                  </span>
                )}
              </button>

              {/* Tooltip - shows on hover (desktop) or click (mobile) */}
              {/* Desktop: positioned to the right, Mobile: positioned below */}
              <div
                className={`
                  absolute z-50 transition-all duration-300
                  ${isActive ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100'}

                  left-full top-1/2 ml-3 -translate-y-1/2 w-96 max-w-[90vw]
                  md:left-full md:top-1/2 md:ml-3 md:-translate-y-1/2 md:w-96

                  max-md:left-0 max-md:top-full max-md:mt-2 max-md:translate-y-0 max-md:w-[calc(100vw-3rem)]
                `}
              >
                {/* Arrow pointing left (desktop only) */}
                <div className="absolute right-full top-1/2 h-0 w-0 -translate-y-1/2 border-[8px] border-transparent border-r-white/95 max-md:hidden" />

                {/* Arrow pointing up (mobile only) */}
                <div className="absolute bottom-full left-4 h-0 w-0 translate-y-1/2 border-[8px] border-transparent border-b-white/95 md:hidden" />

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
          );
        })}
      </div>
    </div>
  );
}
