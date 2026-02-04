"use client";

import { useState, useEffect } from "react";
import FilterBar from "@/components/FilterBar";
import VideoGrid from "@/components/VideoGrid";
import Leaderboard from "@/components/Leaderboard";
import OnboardingModal from "@/components/OnboardingModal";
import { Shuffle, Loader2, TrendingUp, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePreferences } from "@/context/PreferencesContext";

export default function Home() {
  const router = useRouter();
  const { mealDuration, favoriteCategories, isHydrated } = usePreferences();

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeDuration, setActiveDuration] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<"newest" | "trending">("newest");
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [servingLoading, setServingLoading] = useState(false);
  const [hasAppliedPrefs, setHasAppliedPrefs] = useState(false);

  // Apply user's onboarding preferences as default filters (once after hydration)
  useEffect(() => {
    if (isHydrated && !hasAppliedPrefs) {
      // Set duration from preferences
      if (mealDuration) {
        setActiveDuration(mealDuration);
      }
      // Set first favorite category as active filter
      if (favoriteCategories.length > 0) {
        setActiveCategory(favoriteCategories[0]);
      }
      setHasAppliedPrefs(true);
    }
  }, [isHydrated, mealDuration, favoriteCategories, hasAppliedPrefs]);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const url = new URL("/api/videos", window.location.origin);
        if (activeCategory) url.searchParams.set("category", activeCategory);
        if (activeDuration) url.searchParams.set("duration", activeDuration);
        url.searchParams.set("sort", activeSort);

        const response = await fetch(url.toString());
        const data = await response.json();

        if (!response.ok) {
          console.error("API Error Response:", data);
          setVideos([]);
          return;
        }

        if (Array.isArray(data)) {
          console.log(`Fetched ${data.length} videos`);
          setVideos(data.map((v: any) => ({
            id: v.id,
            youtubeId: v.youtube_id,
            title: v.title,
            channel: v.channel,
            thumbnail: v.thumbnail,
            duration: v.duration_category === 'quick' ? '5-15m' : v.duration_category === 'medium' ? '15-30m' : '30m+',
            durationCategory: v.duration_category,
            categories: v.categories || [],
            upvotes: v.upvotes,
            submitter: v.users
          })));
        } else {
          console.warn("API returned non-array data:", data);
          setVideos([]);
        }
      } catch (error) {
        console.error("Failed to fetch videos:", error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [activeCategory, activeDuration, activeSort]);

  const handleServeMe = async () => {
    setServingLoading(true);
    try {
      const url = new URL("/api/serve", window.location.origin);
      if (activeDuration) url.searchParams.set("duration", activeDuration);
      if (activeCategory) url.searchParams.set("category", activeCategory);

      const response = await fetch(url.toString());
      const data = await response.json();

      if (data.id) {
        router.push(`/watch/${data.id}`);
      } else {
        console.error("No video found");
      }
    } catch (error) {
      console.error("Failed to fetch random video:", error);
    } finally {
      setServingLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <OnboardingModal />

      {/* Filter Bar - Sticky */}
      <div className="sticky top-[64px] z-40 bg-background/95 backdrop-blur-md py-3 -mx-4 px-4 sm:mx-0 sm:px-0">
        <FilterBar
          activeCategory={activeCategory}
          activeDuration={activeDuration}
          onCategoryChange={setActiveCategory}
          onDurationChange={setActiveDuration}
        />
      </div>

      {/* Main Action Bar */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Can't decide Banner */}
        <div className="flex-1 rounded-2xl bg-zinc-900/50 border border-white/5 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-white mb-1">Hungry for something specific?</h2>
            <p className="text-xs text-zinc-500">Pick a vibe or let us surprise you with a random delight.</p>
          </div>
          <button
            onClick={handleServeMe}
            disabled={servingLoading}
            className="flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-black hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-70 whitespace-nowrap shadow-xl"
          >
            {servingLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Shuffle className="h-4 w-4" />
            )}
            SERVE ME
          </button>
        </div>
      </div>

      {/* Recommended Section & Leaderboard */}
      <div className="flex flex-col xl:flex-row gap-8 mt-2">
        <section className="flex-1 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Today's <span className="text-red-500">Menu</span>
                </h3>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-red-500 uppercase">Fresh</span>
                </div>
              </div>
              <p className="text-xs text-zinc-600">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} • Curated by the community
              </p>
            </div>

            <div className="flex items-center p-1 rounded-xl bg-zinc-900/50 border border-white/5 w-fit">

              <button
                onClick={() => setActiveSort("newest")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all",
                  activeSort === "newest"
                    ? "bg-zinc-800 text-white shadow-sm"
                    : "text-zinc-500 hover:text-white"
                )}
              >
                <Clock className="h-3.5 w-3.5" />
                NEWEST
              </button>
              <button
                onClick={() => setActiveSort("trending")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all",
                  activeSort === "trending"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-zinc-500 hover:text-white"
                )}
              >
                <TrendingUp className="h-3.5 w-3.5" />
                TRENDING
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-red-600" />
              <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Plating...</p>
            </div>
          ) : videos.length > 0 ? (
            <VideoGrid videos={videos} />
          ) : (
            <div className="py-24 text-center border border-dashed border-white/5 rounded-3xl">
              <p className="text-zinc-500 font-bold">No dishes found in this category.</p>
              <button
                onClick={() => { setActiveCategory(null); setActiveDuration(null); }}
                className="mt-4 text-sm text-red-500 hover:underline font-bold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>

        {/* Sidebar */}
        <aside className="w-full xl:w-80 shrink-0">
          <Leaderboard />
        </aside>
      </div>
    </div>
  );
}
