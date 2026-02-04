import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin seed",
  description: "Seed the ChewTube catalog with staff-approved picks.",
  openGraph: {
    title: "Admin seed",
    description: "Seed the ChewTube catalog with staff-approved picks.",
    url: "/admin/seed"
  }
};

export default function AdminSeedPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-white">Seed videos</h1>
        <p className="text-slate-300">
          Admin-only tool to quickly add approved videos to the catalog.
        </p>
      </div>

      <form className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-200">YouTube URL</span>
          <input
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-200">Duration</span>
            <select className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white">
              <option>Quick</option>
              <option>Medium</option>
              <option>Long</option>
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-200">Categories (1–3)</span>
            <input
              type="text"
              placeholder="Food, Chill"
              className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500"
            />
          </label>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-200">Optional note</span>
          <textarea
            rows={2}
            placeholder="Staff pick: best ramen crawl"
            className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500"
          />
        </label>

        <button className="rounded-full bg-chew-500 px-6 py-2 text-sm font-semibold text-white">
          Seed video
        </button>
      </form>
    </div>
  );
}
