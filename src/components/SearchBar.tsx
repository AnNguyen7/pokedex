"use client";

import { useState } from "react";

export default function SearchBar({ onChange }: { onChange: (q: string) => void }) {
  const [q, setQ] = useState("");
  return (
    <div className="flex gap-2 w-full max-w-xl">
      <input
        value={q}
        onChange={(e) => { const v = e.target.value; setQ(v); onChange(v); }}
        placeholder="Search by name or number"
        type="search"
        aria-label="Search Pokémon"
        className="flex-1 rounded-xl border border-emerald-200 bg-white/80 px-3 py-2 shadow-sm backdrop-blur focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 text-emerald-900 placeholder:text-emerald-400"
      />
      <button
        onClick={() => { setQ(""); onChange(""); }}
        className="rounded-xl border border-emerald-200 px-4 py-2 bg-white/80 text-emerald-700 shadow-sm transition hover:border-emerald-400 hover:text-emerald-900"
      >
        Clear
      </button>
    </div>
  );
}
