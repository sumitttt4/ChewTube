
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-slate-200">Duration</span>
        {durationFilters.map((filter) => (
          <button
            key={filter.value}

          >
            {filter.label}
          </button>
        ))}

        ))}
      </div>
    </section>
  );
}
