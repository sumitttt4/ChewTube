
import { sampleVideos } from "@/lib/sample-data";

export default function ProfilePage({ params }: { params: { username: string } }) {
  const videos = sampleVideos.slice(0, 2);

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <p className="text-sm text-chew-200">@{params.username}</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Video Curator</h1>
        <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-300">
          <span>Submitted videos: {videos.length}</span>
          <span>Saved videos: 12</span>
          <span>Total upvotes: 420</span>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Recent submissions</h2>

      </section>
    </div>
  );
}
