type StatEntry = {
  key: string;
  label: string;
  value: number;
};

type Props = {
  stats: StatEntry[];
  total: number;
};

export default function StatsCard({ stats, total }: Props) {
  return (
    <aside className="rounded-[28px] border border-emerald-100/60 bg-white/85 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-emerald-800">Base Stats</h2>
        <span className="text-sm font-semibold text-emerald-600">Total {total}</span>
      </div>
      <div className="mt-6 space-y-4">
        {stats.map(stat => (
          <div key={stat.key} className="space-y-2">
            <div className="flex items-center justify-between text-sm font-medium text-emerald-700">
              <span>{stat.label}</span>
              <span className="font-semibold text-emerald-900">{stat.value}</span>
            </div>
            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-emerald-100">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-lime-300"
                style={{ width: `${Math.min(100, (stat.value / 180) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
