// AnN add: Shiny theme support for stats card on 10/13/2025
import { useShiny } from "@/contexts/ShinyContext";
import type { PokemonTypeName } from "@/types/pokemon";

type StatEntry = {
  key: string;
  label: string;
  value: number;
};

type Props = {
  stats: StatEntry[];
  total: number;
  primaryType?: PokemonTypeName;
};

// Colored progress bar gradients that match each Pokémon type's theme
const TYPE_GRADIENTS: Record<string, string> = {
  normal: "from-stone-500 via-stone-400 to-stone-300",
  fire: "from-orange-600 via-orange-500 to-orange-400",
  water: "from-blue-600 via-blue-500 to-blue-400",
  electric: "from-yellow-500 via-yellow-400 to-yellow-300",
  grass: "from-green-600 via-green-500 to-lime-400",
  ice: "from-cyan-500 via-cyan-400 to-cyan-300",
  fighting: "from-red-700 via-red-600 to-red-500",
  poison: "from-purple-600 via-purple-500 to-purple-400",
  ground: "from-amber-700 via-amber-600 to-amber-500",
  flying: "from-indigo-500 via-indigo-400 to-indigo-300",
  psychic: "from-pink-600 via-pink-500 to-pink-400",
  bug: "from-lime-600 via-lime-500 to-lime-400",
  rock: "from-yellow-700 via-yellow-600 to-yellow-500",
  ghost: "from-purple-700 via-purple-600 to-purple-500",
  dragon: "from-indigo-700 via-indigo-600 to-indigo-500",
  dark: "from-gray-800 via-gray-700 to-gray-600",
  steel: "from-slate-500 via-slate-400 to-slate-300",
  fairy: "from-pink-500 via-pink-400 to-pink-300",
};

// Background colors for the stat bar track
const TYPE_BG_COLORS: Record<string, string> = {
  normal: "bg-stone-100",
  fire: "bg-orange-100",
  water: "bg-blue-100",
  electric: "bg-yellow-100",
  grass: "bg-green-100",
  ice: "bg-cyan-100",
  fighting: "bg-red-100",
  poison: "bg-purple-100",
  ground: "bg-amber-100",
  flying: "bg-indigo-100",
  psychic: "bg-pink-100",
  bug: "bg-lime-100",
  rock: "bg-yellow-100",
  ghost: "bg-purple-100",
  dragon: "bg-indigo-100",
  dark: "bg-gray-100",
  steel: "bg-slate-100",
  fairy: "bg-pink-100",
};

export default function StatsCard({ stats, total, primaryType }: Props) {
  const { isShiny } = useShiny();
  
  const gradient = primaryType ? TYPE_GRADIENTS[primaryType] || TYPE_GRADIENTS.normal : "from-emerald-500 via-emerald-400 to-lime-300";
  const bgColor = isShiny 
    ? "bg-lime-700/30" // Dark lime green background for shiny theme
    : (primaryType ? TYPE_BG_COLORS[primaryType] || "bg-emerald-100" : "bg-emerald-100");

  // Shiny theme classes
  const cardClasses = isShiny
    ? "rounded-[28px] border border-lime-600/25 bg-lime-800/20 p-6 shadow-lg transition-all duration-200 hover:border-lime-500/30 hover:shadow-xl"
    : "rounded-[28px] border border-emerald-100/60 bg-white/85 p-6 shadow-lg transition-all duration-200 hover:border-emerald-200 hover:shadow-xl";

  const titleClasses = isShiny ? "text-lg font-semibold text-lime-700" : "text-lg font-semibold text-emerald-800";
  const totalClasses = isShiny ? "text-sm font-semibold text-lime-600" : "text-sm font-semibold text-emerald-600";
  const labelClasses = isShiny ? "text-sm font-medium text-lime-600" : "text-sm font-medium text-emerald-700";
  const valueClasses = isShiny ? "font-semibold text-lime-800" : "font-semibold text-emerald-900";
  const hoverLabelClasses = isShiny ? "group-hover:text-lime-700" : "group-hover:text-emerald-900";

  return (
    <aside className={cardClasses}>
      <div className="flex items-center justify-between">
        <h2 className={titleClasses}>Base Stats</h2>
        <span className={totalClasses}>Total {total}</span>
      </div>
      <div className="mt-6 space-y-4">
        {stats.map(stat => (
          <div key={stat.key} className="group space-y-2">
            <div className={`flex items-center justify-between ${labelClasses}`}>
              <span className={`transition-colors ${hoverLabelClasses}`}>{stat.label}</span>
              <span className={`${valueClasses} transition-transform group-hover:scale-110`}>{stat.value}</span>
            </div>
            <div className={`relative h-2.5 w-full overflow-hidden rounded-full ${bgColor} transition-all group-hover:h-3`}>
              <div
                className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${gradient} transition-all duration-300`}
                style={{ width: `${Math.min(100, (stat.value / 180) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
