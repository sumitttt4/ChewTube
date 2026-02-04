import EmptyState from "@/components/EmptyState";
import { sampleVideos } from "@/lib/sample-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My List",
  description: "Your saved videos ready for the next meal.",
  openGraph: {
    title: "My List",
    description: "Your saved videos ready for the next meal.",
    url: "/saved"
  }
};

export default function SavedPage() {
  const savedVideos = sampleVideos.slice(0, 2);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-white">My List</h1>
        <p className="text-slate-300">Saved videos ready for your next meal.</p>
      </div>
      {savedVideos.length > 0 ? (
        <div className="space-y-3">
          {savedVideos.map((video) => (
            <div
              key={video.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3"
            >
              <div>
                <p className="font-semibold text-white">{video.title}</p>
                <p className="text-xs text-slate-400">
                  {video.duration} · {video.categories.join(" · ")}
                </p>
              </div>
              <button className="rounded-full border border-white/20 px-4 py-1 text-xs text-slate-200">
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No saved videos yet"
          description="Save your favorites so they’re ready for your next meal."
          actionLabel="Browse videos"
          actionHref="/"
        />
      )}
    </div>
  );
}
