"use client";

import { useEffect, useMemo, useState } from "react";
import FilterBar from "@/components/FilterBar";
import ServeMeButton from "@/components/ServeMeButton";
import VideoCard from "@/components/VideoCard";
import VideoGrid from "@/components/VideoGrid";
import { sampleVideos } from "@/lib/sample-data";

const sortOptions = ["Trending", "Newest", "All-time best"] as const;

type SortOption = (typeof sortOptions)[number];

export default function HomeExperience() {
  const [durationFilter, setDurationFilter] = useState<"all" | "quick" | "medium" | "long">("all");
  const [categoryFilter, setCategoryFilter] = useState<"All" | string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("Trending");
  const [recommendation, setRecommendation] = useState<(typeof sampleVideos)[number] | null>(null);
  const [isServing, setIsServing] = useState(false);
  const [recentlyWatched, setRecentlyWatched] = useState<(typeof sampleVideos)[number][]>([]);

  const filteredVideos = useMemo(() => {
    let results = sampleVideos;

    if (durationFilter !== "all") {
      results = results.filter((video) => video.durationCategory === durationFilter);
    }

    if (categoryFilter !== "All") {
      results = results.filter((video) => video.categories.includes(categoryFilter));
    }

    const sorted = [...results];

    if (sortBy === "Trending") {
      sorted.sort((a, b) => b.upvotes - a.upvotes);
    }

    if (sortBy === "Newest") {
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    if (sortBy === "All-time best") {
      sorted.sort((a, b) => b.allTimeScore - a.allTimeScore);
    }

    return sorted;
  }, [categoryFilter, durationFilter, sortBy]);

  const hasResults = filteredVideos.length > 0;

  useEffect(() => {
    const stored = localStorage.getItem("chewtube:recently-watched");
    if (!stored) {
      return;
    }
    const ids = stored.split(",").filter(Boolean);
    const matches = ids
      .map((id) => sampleVideos.find((video) => video.id === id))
      .filter((video): video is (typeof sampleVideos)[number] => Boolean(video));
    setRecentlyWatched(matches);
  }, []);

  const serveRandom = () => {
    if (!hasResults) {
      setRecommendation(null);
      return;
    }
    setIsServing(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * filteredVideos.length);
      setRecommendation(filteredVideos[randomIndex]);
      setIsServing(false);
    }, 350);
  };

  const skipRandom = () => {
    if (!hasResults) {
      setRecommendation(null);
      return;
    }
    if (filteredVideos.length === 1) {
      setRecommendation(filteredVideos[0]);
      return;
    }
    let nextPick = recommendation;
    while (nextPick?.id === recommendation?.id) {
      nextPick = filteredVideos[Math.floor(Math.random() * filteredVideos.length)];
    }
    setRecommendation(nextPick ?? null);
  };

  return (
    <div className="space-y-10">
      {recentlyWatched.length > 0 ? (
        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-chew-200">Recently watched</p>
              <h2 className="text-2xl font-semibold text-white">Pick up where you left off</h2>
            </div>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("chewtube:recently-watched");
                setRecentlyWatched([]);
              }}
              className="text-xs uppercase tracking-wide text-slate-400 hover:text-slate-200"
            >
              Clear history
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentlyWatched.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>
      ) : null}
      <ServeMeButton
        recommendation={recommendation}
        onServe={serveRandom}
        onSkip={skipRandom}
        hasResults={hasResults}
        isServing={isServing}
      />
      <FilterBar
        selectedDuration={durationFilter}
        selectedCategory={categoryFilter}
        selectedSort={sortBy}
        onDurationChange={setDurationFilter}
        onCategoryChange={setCategoryFilter}
        onSortChange={setSortBy}
      />
      {hasResults ? (
        <VideoGrid videos={filteredVideos} />
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/40 p-8 text-center">
          <p className="text-sm text-slate-200">No videos match those filters yet.</p>
          <p className="mt-2 text-xs text-slate-400">Try removing a filter or picking a new category.</p>
        </div>
      )}
    </div>
  );
}
