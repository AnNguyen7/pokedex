"use client";

// AnN add: Shiny theme support for type effectiveness card on 10/13/2025
import { useShiny } from "@/contexts/ShinyContext";
import type { PokemonTypeName } from "@/types/pokemon";
import Link from "next/link";
import { TYPE_BADGE_STYLES } from "./typeStyles";

type Props = {
  types: PokemonTypeName[];
};

// Type effectiveness chart - what damages this type
const TYPE_EFFECTIVENESS: Record<string, { weakTo: string[]; resistantTo: string[]; immuneTo: string[] }> = {
  normal: {
    weakTo: ["fighting"],
    resistantTo: [],
    immuneTo: ["ghost"],
  },
  fire: {
    weakTo: ["water", "ground", "rock"],
    resistantTo: ["fire", "grass", "ice", "bug", "steel", "fairy"],
    immuneTo: [],
  },
  water: {
    weakTo: ["electric", "grass"],
    resistantTo: ["fire", "water", "ice", "steel"],
    immuneTo: [],
  },
  electric: {
    weakTo: ["ground"],
    resistantTo: ["electric", "flying", "steel"],
    immuneTo: [],
  },
  grass: {
    weakTo: ["fire", "ice", "poison", "flying", "bug"],
    resistantTo: ["water", "electric", "grass", "ground"],
    immuneTo: [],
  },
  ice: {
    weakTo: ["fire", "fighting", "rock", "steel"],
    resistantTo: ["ice"],
    immuneTo: [],
  },
  fighting: {
    weakTo: ["flying", "psychic", "fairy"],
    resistantTo: ["bug", "rock", "dark"],
    immuneTo: [],
  },
  poison: {
    weakTo: ["ground", "psychic"],
    resistantTo: ["grass", "fighting", "poison", "bug", "fairy"],
    immuneTo: [],
  },
  ground: {
    weakTo: ["water", "grass", "ice"],
    resistantTo: ["poison", "rock"],
    immuneTo: ["electric"],
  },
  flying: {
    weakTo: ["electric", "ice", "rock"],
    resistantTo: ["grass", "fighting", "bug"],
    immuneTo: ["ground"],
  },
  psychic: {
    weakTo: ["bug", "ghost", "dark"],
    resistantTo: ["fighting", "psychic"],
    immuneTo: [],
  },
  bug: {
    weakTo: ["fire", "flying", "rock"],
    resistantTo: ["grass", "fighting", "ground"],
    immuneTo: [],
  },
  rock: {
    weakTo: ["water", "grass", "fighting", "ground", "steel"],
    resistantTo: ["normal", "fire", "poison", "flying"],
    immuneTo: [],
  },
  ghost: {
    weakTo: ["ghost", "dark"],
    resistantTo: ["poison", "bug"],
    immuneTo: ["normal", "fighting"],
  },
  dragon: {
    weakTo: ["ice", "dragon", "fairy"],
    resistantTo: ["fire", "water", "electric", "grass"],
    immuneTo: [],
  },
  dark: {
    weakTo: ["fighting", "bug", "fairy"],
    resistantTo: ["ghost", "dark"],
    immuneTo: ["psychic"],
  },
  steel: {
    weakTo: ["fire", "fighting", "ground"],
    resistantTo: ["normal", "grass", "ice", "flying", "psychic", "bug", "rock", "dragon", "steel", "fairy"],
    immuneTo: ["poison"],
  },
  fairy: {
    weakTo: ["poison", "steel"],
    resistantTo: ["fighting", "bug", "dark"],
    immuneTo: ["dragon"],
  },
};

// Calculate combined type effectiveness with multipliers
function calculateCombinedEffectiveness(types: PokemonTypeName[]) {
  const multipliers: Record<string, number> = {};

  // Start all types at 1x multiplier
  const allTypes = [
    "normal", "fire", "water", "electric", "grass", "ice", "fighting",
    "poison", "ground", "flying", "psychic", "bug", "rock", "ghost",
    "dragon", "dark", "steel", "fairy"
  ];
  
  allTypes.forEach(t => {
    multipliers[t] = 1;
  });

  // Apply effectiveness from each type
  types.forEach(type => {
    const effectiveness = TYPE_EFFECTIVENESS[type];
    if (effectiveness) {
      // Immunities set to 0
      effectiveness.immuneTo.forEach(t => {
        multipliers[t] = 0;
      });
      
      // Weaknesses multiply by 2 (unless immune)
      effectiveness.weakTo.forEach(t => {
        if (multipliers[t] !== 0) {
          multipliers[t] *= 2;
        }
      });
      
      // Resistances divide by 2 (unless immune)
      effectiveness.resistantTo.forEach(t => {
        if (multipliers[t] !== 0) {
          multipliers[t] *= 0.5;
        }
      });
    }
  });

  // Categorize by multiplier
  const veryWeakTo: string[] = [];
  const weakTo: string[] = [];
  const resistantTo: string[] = [];
  const veryResistantTo: string[] = [];
  const immuneTo: string[] = [];

  Object.entries(multipliers).forEach(([type, mult]) => {
    if (mult === 0) immuneTo.push(type);
    else if (mult === 0.25) veryResistantTo.push(type);
    else if (mult === 0.5) resistantTo.push(type);
    else if (mult === 2) weakTo.push(type);
    else if (mult === 4) veryWeakTo.push(type);
  });

  return {
    veryWeakTo,
    weakTo,
    resistantTo,
    veryResistantTo,
    immuneTo,
  };
}

export default function TypeEffectivenessCard({ types }: Props) {
  const { isShiny } = useShiny();
  const effectiveness = calculateCombinedEffectiveness(types);

  // Shiny theme classes
  const cardClasses = isShiny
    ? "rounded-[28px] border border-lime-600/25 bg-lime-800/20 p-6 shadow-lg transition-all duration-200 hover:border-lime-500/30 hover:shadow-xl"
    : "rounded-[28px] border border-emerald-100/60 bg-white/85 p-6 shadow-lg transition-all duration-200 hover:border-emerald-200 hover:shadow-xl";

  return (
    <aside className={cardClasses}>
      <div className="space-y-4">
        {/* Types that deal 4× damage */}
        {effectiveness.veryWeakTo.length > 0 && (
          <div>
            <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-red-700">
              Very Weak To
            </h3>
            <div className="flex flex-wrap gap-2">
              {effectiveness.veryWeakTo.map(type => (
                <Link
                  key={type}
                  href={`/?type=${type}`}
                  className={`rounded-full px-3 py-1 text-xs font-semibold capitalize shadow-sm transition-transform hover:scale-105 cursor-pointer ${
                    TYPE_BADGE_STYLES[type as keyof typeof TYPE_BADGE_STYLES] ?? "bg-emerald-100/80 text-emerald-700"
                  }`}
                >
                  {type}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Types that deal 2× damage */}
        {effectiveness.weakTo.length > 0 && (
          <div>
            <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-red-600">
              Weak To
            </h3>
            <div className="flex flex-wrap gap-2">
              {effectiveness.weakTo.map(type => (
                <Link
                  key={type}
                  href={`/?type=${type}`}
                  className={`rounded-full px-3 py-1 text-xs font-semibold capitalize transition-transform hover:scale-105 cursor-pointer ${
                    TYPE_BADGE_STYLES[type as keyof typeof TYPE_BADGE_STYLES] ?? "bg-emerald-100/80 text-emerald-700"
                  }`}
                >
                  {type}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Types that deal 0.5× damage */}
        {effectiveness.resistantTo.length > 0 && (
          <div>
            <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-green-600">
              Resistant To
            </h3>
            <div className="flex flex-wrap gap-2">
              {effectiveness.resistantTo.map(type => (
                <Link
                  key={type}
                  href={`/?type=${type}`}
                  className={`rounded-full px-3 py-1 text-xs font-semibold capitalize transition-transform hover:scale-105 cursor-pointer ${
                    TYPE_BADGE_STYLES[type as keyof typeof TYPE_BADGE_STYLES] ?? "bg-emerald-100/80 text-emerald-700"
                  }`}
                >
                  {type}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Types that deal 0.25× damage */}
        {effectiveness.veryResistantTo.length > 0 && (
          <div>
            <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-green-700">
              Very Resistant To
            </h3>
            <div className="flex flex-wrap gap-2">
              {effectiveness.veryResistantTo.map(type => (
                <Link
                  key={type}
                  href={`/?type=${type}`}
                  className={`rounded-full px-3 py-1 text-xs font-semibold capitalize shadow-sm transition-transform hover:scale-105 cursor-pointer ${
                    TYPE_BADGE_STYLES[type as keyof typeof TYPE_BADGE_STYLES] ?? "bg-emerald-100/80 text-emerald-700"
                  }`}
                >
                  {type}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Types that deal 0× damage (no effect) */}
        {effectiveness.immuneTo.length > 0 && (
          <div>
            <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-gray-600">
              Immune To
            </h3>
            <div className="flex flex-wrap gap-2">
              {effectiveness.immuneTo.map(type => (
                <Link
                  key={type}
                  href={`/?type=${type}`}
                  className={`rounded-full px-3 py-1 text-xs font-semibold capitalize transition-transform hover:scale-105 cursor-pointer ${
                    TYPE_BADGE_STYLES[type as keyof typeof TYPE_BADGE_STYLES] ?? "bg-emerald-100/80 text-emerald-700"
                  }`}
                >
                  {type}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

