import type { Video } from "@/lib/sample-data";
import VideoCard from "@/components/VideoCard";

export default function VideoGrid({ videos }: { videos: Video[] }) {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </section>
  );
}
