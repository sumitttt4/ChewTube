import { categories, durationFilters } from "@/lib/sample-data";

export default function FilterBar() {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-slate-200">Duration</span>
        {durationFilters.map((filter) => (
          <button
            key={filter.value}
            className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200 transition hover:border-chew-400 hover:text-white"
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <span
            key={category}
            className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200"
          >
            {category}
          </span>
        ))}
      </div>
    </section>
  );
}
