import FilterBar from "@/components/FilterBar";
import ServeMeButton from "@/components/ServeMeButton";
import VideoGrid from "@/components/VideoGrid";
import { sampleVideos } from "@/lib/sample-data";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-chew-200">ChewTube</p>
        <h1 className="text-4xl font-semibold text-white md:text-5xl">
          Find something good to watch while you eat.
        </h1>
        <p className="max-w-2xl text-base text-slate-300">
          Browse curated videos, filter by mood, and let ChewTube serve up the
          perfect bite-sized watch.
        </p>
      </section>

      <ServeMeButton />
      <FilterBar />
      <VideoGrid videos={sampleVideos} />
    </div>
  );
}
