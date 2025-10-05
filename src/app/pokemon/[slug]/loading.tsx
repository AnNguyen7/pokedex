export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-14 text-emerald-900">
      {/* Back Button Skeleton */}
      <div className="h-5 w-32 animate-pulse rounded bg-emerald-200/50" />

      {/* Main Content Skeleton */}
      <section className="mt-10 grid gap-6 rounded-[36px] border border-emerald-100 bg-white/85 p-6 shadow-xl backdrop-blur sm:p-8 md:gap-8 md:p-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="space-y-8">
          {/* Hero Section Skeleton */}
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
            <div className="mx-auto h-48 w-48 animate-pulse rounded-3xl bg-emerald-100/80 sm:mx-0" />
            <div className="flex-1 space-y-5 text-center sm:text-left">
              <div className="mx-auto h-3 w-16 animate-pulse rounded bg-emerald-200/50 sm:mx-0" />
              <div className="mx-auto h-12 w-48 animate-pulse rounded-lg bg-emerald-300/50 sm:mx-0" />
              <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
                <div className="h-8 w-20 animate-pulse rounded-full bg-emerald-200/50" />
                <div className="h-8 w-20 animate-pulse rounded-full bg-emerald-200/50" />
              </div>
            </div>
          </div>

          {/* Meta Card Skeleton */}
          <div className="rounded-[24px] border border-emerald-100/80 bg-white/80 p-6 shadow-inner">
            <div className="space-y-4">
              <div className="h-4 w-24 animate-pulse rounded bg-emerald-200/50" />
              <div className="h-4 w-32 animate-pulse rounded bg-emerald-200/50" />
            </div>
          </div>

          {/* Abilities Card Skeleton */}
          <div className="rounded-[24px] border border-emerald-100/80 bg-white/70 p-6 shadow-inner">
            <div className="h-4 w-20 animate-pulse rounded bg-emerald-200/50" />
            <div className="mt-5 space-y-5">
              <div className="rounded-xl border border-emerald-50 bg-white/50 p-4">
                <div className="h-5 w-32 animate-pulse rounded bg-emerald-200/50" />
                <div className="mt-2.5 h-4 w-full animate-pulse rounded bg-emerald-100/50" />
              </div>
              <div className="rounded-xl border border-emerald-50 bg-white/50 p-4">
                <div className="h-5 w-32 animate-pulse rounded bg-emerald-200/50" />
                <div className="mt-2.5 h-4 w-full animate-pulse rounded bg-emerald-100/50" />
              </div>
            </div>
          </div>

          {/* Evolution Card Skeleton */}
          <div className="rounded-[24px] border border-emerald-100/80 bg-white/70 p-6 shadow-inner">
            <div className="h-4 w-32 animate-pulse rounded bg-emerald-200/50" />
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 animate-pulse rounded-lg bg-emerald-200/50" />
                <div className="h-4 w-20 animate-pulse rounded bg-emerald-200/50" />
              </div>
              <div className="h-4 w-4 animate-pulse rounded bg-emerald-200/50" />
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 animate-pulse rounded-lg bg-emerald-200/50" />
                <div className="h-4 w-20 animate-pulse rounded bg-emerald-200/50" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Card Skeleton */}
        <aside className="rounded-[28px] border border-emerald-100/60 bg-white/85 p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="h-6 w-24 animate-pulse rounded bg-emerald-200/50" />
            <div className="h-4 w-16 animate-pulse rounded bg-emerald-200/50" />
          </div>
          <div className="mt-6 space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-16 animate-pulse rounded bg-emerald-200/50" />
                  <div className="h-4 w-8 animate-pulse rounded bg-emerald-200/50" />
                </div>
                <div className="h-2.5 w-full animate-pulse rounded-full bg-emerald-100/50" />
              </div>
            ))}
          </div>
        </aside>
      </section>

      {/* Summary Skeleton */}
      <section className="mt-8 space-y-3 rounded-[32px] border border-emerald-100 bg-white/85 p-6 shadow-lg backdrop-blur sm:mt-16 sm:space-y-4 sm:p-8">
        <div className="h-6 w-24 animate-pulse rounded bg-emerald-200/50" />
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-emerald-100/50" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-emerald-100/50" />
        </div>
      </section>

      {/* Description Skeleton */}
      <section className="mt-6 space-y-3 rounded-[32px] border border-emerald-100 bg-white/85 p-6 shadow-lg backdrop-blur sm:mt-8 sm:space-y-4 sm:p-8">
        <div className="h-6 w-32 animate-pulse rounded bg-emerald-200/50" />
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-emerald-100/50" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-emerald-100/50" />
        </div>
      </section>
    </main>
  );
}

