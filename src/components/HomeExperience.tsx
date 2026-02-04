"use client";

import { useEffect, useMemo, useState } from "react";
import FilterBar from "@/components/FilterBar";
import InterestSelector from "@/components/InterestSelector";
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
  const [interests, setInterests] = useState<string[]>([]);
  const [hasManualCategory, setHasManualCategory] = useState(false);
  const [planTarget, setPlanTarget] = useState(20);
  const [planVideos, setPlanVideos] = useState<(typeof sampleVideos)[number][]>([]);

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
      sorted.sort((a, b) => {
        const interestBoost = (video: (typeof sampleVideos)[number]) =>
          video.categories.filter((category) => interests.includes(category)).length * 25;
        return b.upvotes + interestBoost(b) - (a.upvotes + interestBoost(a));
      });
    }

    if (sortBy === "Newest") {
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    if (sortBy === "All-time best") {
      sorted.sort((a, b) => b.allTimeScore - a.allTimeScore);
    }

    return sorted;
  }, [categoryFilter, durationFilter, interests, sortBy]);

  const hasResults = filteredVideos.length > 0;
  const hasInterests = interests.length > 0;

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

  useEffect(() => {
    if (hasManualCategory || categoryFilter !== "All") {
      return;
    }
    if (interests.length === 0) {
      return;
    }
    setCategoryFilter(interests[0]);
  }, [categoryFilter, hasManualCategory, interests]);

  useEffect(() => {
    if (!hasInterests) {
      setPlanVideos([]);
      return;
    }
    let remaining = planTarget;
    const pool = [...sampleVideos].sort((a, b) => b.upvotes - a.upvotes);
    const picks: (typeof sampleVideos)[number][] = [];
    pool.forEach((video) => {
      if (remaining <= 0) {
        return;
      }
      if (!video.categories.some((category) => interests.includes(category))) {
        return;
      }
      if (picks.some((pick) => pick.id === video.id)) {
        return;
      }
      picks.push(video);
      remaining -= video.durationMinutes;
    });
    setPlanVideos(picks);
  }, [interests, planTarget]);

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
      <InterestSelector onChange={setInterests} />
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
        onCategoryChange={(value) => {
          setHasManualCategory(true);
          setCategoryFilter(value);
        }}
        onSortChange={setSortBy}
      />
      <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-chew-200">Watch plan</p>
            <h2 className="text-2xl font-semibold text-white">Plan your meal-time queue</h2>
            <p className="mt-2 text-sm text-slate-300">
              Pick a target duration and we’ll build a short list from your interests.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            {([10, 20, 30, 45] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setPlanTarget(value)}
                className={`rounded-full px-3 py-1 transition ${
                  planTarget === value
                    ? "bg-chew-500/30 text-white"
                    : "bg-white/10 text-slate-200 hover:bg-white/20"
                }`}
              >
                {value} min
              </button>
            ))}
          </div>
        </div>
        {hasInterests && planVideos.length > 0 ? (
          <div className="mt-4 space-y-3">
            {planVideos.map((video) => (
              <div
                key={video.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3"
              >
                <div>
                  <p className="font-semibold text-white">{video.title}</p>
                  <p className="text-xs text-slate-400">
                    {video.duration} · {video.categories.join(" · ")}
                  </p>
                </div>
                <span className="text-xs text-slate-300">~{video.durationMinutes} min</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-400">
            Choose a few interests above to generate a personalized watch plan.
          </p>
        )}
      </section>
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
