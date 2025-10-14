"use client";

// AnN add: Client component for Pokemon detail page with shiny theme support on 10/13/2025
import { useShiny } from "@/contexts/ShinyContext";
import HeroSection from "@/components/pokemon/HeroSection";
import EvolutionCard from "@/components/pokemon/EvolutionCard";
import AbilitiesCard from "@/components/pokemon/AbilitiesCard";
import StatsCard from "@/components/pokemon/StatsCard";
import TrainingCard from "@/components/pokemon/TrainingCard";
import TypeEffectivenessCard from "@/components/pokemon/TypeEffectivenessCard";
import type { PokemonTypeName } from "@/types/pokemon";

type SpriteSources = {
  animated: string;
  fallback: string;
  animatedShiny?: string;
  fallbackShiny?: string;
};

type Ability = {
  displayName: string;
  description: string;
  isHidden: boolean;
};

type EvolutionStage = {
  dex: number;
  name: string;
  slug: string;
};

type Props = {
  displayName: string;
  nationalDex: number;
  types: PokemonTypeName[];
  sprites: SpriteSources;
  cryUrl?: string | null;
  species?: string | null;
  heightM?: number | null;
  weightKg?: number | null;
  description?: string | null;
  abilities: Ability[];
  evolutionStages: EvolutionStage[];
  stats: Array<{ key: string; label: string; value: number }>;
  totalStats: number;
  primaryType?: PokemonTypeName;
  evYields: {
    hp: number;
    attack: number;
    defense: number;
    spAtk: number;
    spDef: number;
    speed: number;
  };
  catchRate: number;
  typeEffectiveness: Array<{ type: string; effectiveness: number }>;
};

export default function PokemonDetailClient({
  displayName,
  nationalDex,
  types,
  sprites,
  cryUrl,
  species,
  heightM,
  weightKg,
  description,
  abilities,
  evolutionStages,
  stats,
  totalStats,
  primaryType,
  evYields,
  catchRate,
  typeEffectiveness,
}: Props) {
  const { isShiny } = useShiny();

  // Shiny theme classes
  const mainCardClasses = isShiny
    ? "rounded-[36px] border border-lime-600/30 bg-lime-800/20 p-6 shadow-xl backdrop-blur sm:p-8 md:p-10"
    : "rounded-[36px] border border-emerald-100 bg-white/85 p-6 shadow-xl backdrop-blur sm:p-8 md:p-10";

  return (
    <section className={mainCardClasses}>
      {/* AnN updated: Reorganized layout with wider left column on 10/12/2025 */}
      <div className="grid gap-8 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
        {/* Left column: Sprite, Evolution, Abilities - AnN updated on 10/12/2025 */}
        <div className="space-y-8">
          <HeroSection
            displayName={displayName}
            nationalDex={nationalDex}
            types={types}
            sprites={sprites}
            cryUrl={cryUrl}
            species={species}
            heightM={heightM}
            weightKg={weightKg}
          />

          {evolutionStages.length > 1 && <EvolutionCard stages={evolutionStages} />}

          <AbilitiesCard abilities={abilities} />

          {description && (
            <div className={`rounded-[24px] border p-6 shadow-inner transition-all duration-200 hover:shadow-lg ${
              isShiny
                ? "border-lime-600/25 bg-lime-800/15 hover:border-lime-500/30"
                : "border-emerald-100/80 bg-white/70 hover:border-emerald-200"
            }`}>
              <h2 className={`text-sm font-semibold uppercase tracking-wide ${
                isShiny ? "text-lime-600" : "text-emerald-500"
              }`}>Pokédex Notes</h2>
              <p className={`mt-4 text-base leading-relaxed ${
                isShiny ? "text-lime-800" : "text-emerald-800"
              }`}>{description}</p>
            </div>
          )}
        </div>

        {/* Right column: Base Stats, Training, Type Effectiveness */}
        <div className="space-y-6">
          <StatsCard stats={stats} total={totalStats} primaryType={primaryType} />
          <TrainingCard evYields={evYields} catchRate={catchRate} />
          <TypeEffectivenessCard types={types} />
        </div>
      </div>
    </section>
  );
}