"use client";

import { categories, durationFilters } from "@/lib/sample-data";

const sortOptions = ["Trending", "Newest", "All-time best"] as const;

type FilterBarProps = {
  selectedDuration: (typeof durationFilters)[number]["value"];
  selectedCategory: (typeof categories)[number];
  selectedSort: (typeof sortOptions)[number];
  onDurationChange: (value: (typeof durationFilters)[number]["value"]) => void;
  onCategoryChange: (value: (typeof categories)[number]) => void;
  onSortChange: (value: (typeof sortOptions)[number]) => void;
};

export default function FilterBar({
  selectedDuration,
  selectedCategory,
  selectedSort,
  onDurationChange,
  onCategoryChange,
  onSortChange
}: FilterBarProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-slate-200">Duration</span>
        {durationFilters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            aria-pressed={selectedDuration === filter.value}
            onClick={() => onDurationChange(filter.value)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              selectedDuration === filter.value
                ? "border-chew-400 bg-chew-500/20 text-white"
                : "border-white/10 text-slate-200 hover:border-chew-400 hover:text-white"
            }`}
          >
            {filter.label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <label className="text-xs uppercase tracking-wide text-slate-400">Sort</label>
          <select
            value={selectedSort}
            onChange={(event) => onSortChange(event.target.value as FilterBarProps["selectedSort"])}
            className="rounded-full border border-white/10 bg-slate-950 px-3 py-1 text-xs text-slate-200"
          >
            {sortOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={selectedCategory === category}
            onClick={() => onCategoryChange(category)}
            className={`rounded-full px-3 py-1 text-xs transition ${
              selectedCategory === category
                ? "bg-chew-500/30 text-white"
                : "bg-white/10 text-slate-200 hover:bg-white/20"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}
