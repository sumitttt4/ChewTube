import HomeExperience from "@/components/HomeExperience";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse",
  description: "Browse curated videos, filter by mood, and plan your next mealtime watch.",
  openGraph: {
    title: "Browse",
    description: "Browse curated videos, filter by mood, and plan your next mealtime watch.",
    url: "/"
  }
};

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

      <HomeExperience />
    </div>
  );
}
