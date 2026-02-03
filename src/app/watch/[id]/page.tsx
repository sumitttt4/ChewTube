import Link from "next/link";
import { sampleVideos } from "@/lib/sample-data";

export default function WatchPage({ params }: { params: { id: string } }) {
  const video = sampleVideos.find((item) => item.id === params.id) ?? sampleVideos[0];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Link href="/" className="text-sm text-chew-200">
          ← Back to browse
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold text-white">{video.title}</h1>
          <span className="rounded-full bg-chew-500/20 px-3 py-1 text-xs text-chew-100">
            Staff Pick
          </span>
        </div>
        <p className="text-sm text-slate-300">Submitted by {video.submitter}</p>
      </div>

      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
        <span>Duration: {video.duration}</span>
        <span>Channel: ChewTube Picks</span>
        <span>Upvotes: {video.upvotes}</span>
      </div>

      <div className="flex flex-wrap gap-3">
        {video.categories.map((category) => (
          <span key={category} className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-200">
            {category}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button className="rounded-full bg-chew-500 px-5 py-2 text-sm font-semibold text-white">
          ▲ Upvote
        </button>
        <button className="rounded-full border border-white/20 px-5 py-2 text-sm text-slate-200">
          Save
        </button>
        <button className="rounded-full border border-white/20 px-5 py-2 text-sm text-slate-200">
          Next random
        </button>
        <button className="rounded-full border border-white/20 px-5 py-2 text-sm text-slate-200">
          Share link
        </button>
      </div>
    </div>
  );
}
