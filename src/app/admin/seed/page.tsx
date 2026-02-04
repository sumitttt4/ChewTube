export default function AdminSeedPage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Seed videos</h1>
        <p className="text-muted-foreground">
          Admin-only tool to quickly add approved videos to the catalog.
        </p>
      </div>

      <form className="space-y-6 rounded-2xl border border-white/10 bg-card p-6 shadow-xl">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foreground">YouTube URL</span>
          <input
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </label>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-foreground">Duration</span>
            <select className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none">
              <option>Quick</option>
              <option>Medium</option>
              <option>Long</option>
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-foreground">Categories (1–3)</span>
            <input
              type="text"
              placeholder="Food, Chill"
              className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </label>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-foreground">Optional note</span>
          <textarea
            rows={2}
            placeholder="Staff pick: best ramen crawl"
            className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </label>

        <button className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all">
          Seed video
        </button>
      </form>
    </div>
  );
}

