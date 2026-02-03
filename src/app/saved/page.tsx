import { sampleVideos } from "@/lib/sample-data";

export default function SavedPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-white">My List</h1>
        <p className="text-slate-300">Saved videos ready for your next meal.</p>
      </div>
      <div className="space-y-3">
        {sampleVideos.map((video) => (
          <div
            key={video.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3"
          >
            <div>
              <p className="font-semibold text-white">{video.title}</p>
              <p className="text-xs text-slate-400">{video.duration} · {video.categories.join(" · ")}</p>
            </div>
            <button className="rounded-full border border-white/20 px-4 py-1 text-xs text-slate-200">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
