import EmptyState from "@/components/EmptyState";
import { sampleVideos } from "@/lib/sample-data";
import type { Metadata } from "next";

export function generateMetadata({ params }: { params: { username: string } }): Metadata {
  const username = params.username;
  const title = `@${username}`;
  const description = `See @${username}'s submissions and saved picks on ChewTube.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/u/${username}`
    }
  };
}

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
        {videos.length > 0 ? (
          <div className="space-y-3">
            {videos.map((video) => (
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
                <span className="text-xs text-slate-300">▲ {video.upvotes}</span>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No submissions yet"
            description="Share your first pick and start curating your mealtime library."
            actionLabel="Submit a video"
            actionHref="/submit"
          />
        )}
      </section>
    </div>
  );
}
