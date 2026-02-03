"use client";

import { useMemo, useState } from "react";
import FilterBar from "@/components/FilterBar";
import ServeMeButton from "@/components/ServeMeButton";
import VideoGrid from "@/components/VideoGrid";
import { sampleVideos } from "@/lib/sample-data";

const sortOptions = ["Trending", "Newest", "All-time best"] as const;

type SortOption = (typeof sortOptions)[number];

export default function HomeExperience() {
  const [durationFilter, setDurationFilter] = useState<"all" | "quick" | "medium" | "long">("all");
  const [categoryFilter, setCategoryFilter] = useState<"All" | string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("Trending");
  const [recommendation, setRecommendation] = useState<(typeof sampleVideos)[number] | null>(null);

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

  const serveRandom = () => {
    if (!hasResults) {
      setRecommendation(null);
      return;
    }
    const randomIndex = Math.floor(Math.random() * filteredVideos.length);
    setRecommendation(filteredVideos[randomIndex]);
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
      <ServeMeButton
        recommendation={recommendation}
        onServe={serveRandom}
        onSkip={skipRandom}
        hasResults={hasResults}
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
