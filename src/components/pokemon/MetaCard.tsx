import type { PokemonTypeName } from "@/types/pokemon";
import { TYPE_BADGE_STYLES } from "@/components/pokemon/typeStyles";

type Props = {
  types: PokemonTypeName[];
};

export default function MetaCard({ types }: Props) {
  return (
    <div className="rounded-[24px] border border-emerald-100/80 bg-white/80 p-6 shadow-inner transition-all duration-200 hover:border-emerald-200 hover:shadow-lg">
      <dl className="space-y-4 text-sm text-emerald-800">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
          <dt className="font-semibold uppercase tracking-wide text-emerald-500">Types</dt>
          <dd className="flex flex-wrap gap-2">
            {types.map(type => (
              <span
                key={type}
                className={`rounded-full px-3 py-0.5 text-xs font-semibold capitalize transition-transform duration-200 hover:scale-110 ${
                  TYPE_BADGE_STYLES[type as keyof typeof TYPE_BADGE_STYLES] ?? "bg-emerald-100/80 text-emerald-700"
                }`}
              >
                {type}
              </span>
            ))}
          </dd>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
          <dt className="font-semibold uppercase tracking-wide text-emerald-500">Tier</dt>
          <dd className="font-medium text-emerald-800">Starter</dd>
        </div>
      </dl>
    </div>
  );
}
