"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import VideoGrid from "@/components/VideoGrid";
import { useSavedVideos } from "@/hooks/useSavedVideos";
import { useCollections } from "@/hooks/useCollections";
import { Bookmark, Loader2, Trash2, Plus, FolderHeart, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function SavedPage() {
  const { savedVideoIds, clearAll } = useSavedVideos();
  const { collections, createCollection, deleteCollection, toggleVideoInCollection } = useCollections();

  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isCreating, setIsCreating] = useState(false);
  const [newColName, setNewColName] = useState("");

  useEffect(() => {
    const fetchSavedVideos = async () => {
      if (savedVideoIds.length === 0) {
        setVideos([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .in("id", savedVideoIds);

      if (data) {
        setVideos(data.map(v => ({
          id: v.id,
          youtubeId: v.youtube_id,
          title: v.title,
          channel: v.channel,
          thumbnail: v.thumbnail,
          duration: v.duration_category === 'quick' ? '5-15m' : v.duration_category === 'medium' ? '15-30m' : '30m+',
          durationCategory: v.duration_category,
          categories: v.categories,
          upvotes: v.upvotes
        })));
      }
      setLoading(false);
    };

    fetchSavedVideos();
  }, [savedVideoIds]);

  const displayedVideos = activeTab === "all"
    ? videos
    : videos.filter(v => collections[activeTab]?.includes(v.id));

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newColName.trim()) {
      createCollection(newColName.trim());
      setNewColName("");
      setIsCreating(false);
      setActiveTab(newColName.trim());
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 border border-white/5 shadow-xl">
            <Bookmark className="h-6 w-6 text-red-500 fill-current" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tight">Your Pantry</h1>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              {savedVideoIds.length} dishes saved
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          {savedVideoIds.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-2 rounded-xl border border-white/5 bg-zinc-900/50 px-4 py-3 text-xs font-black text-zinc-500 hover:text-red-500 hover:border-red-500/20 transition-all uppercase tracking-widest"
            >
              <Trash2 className="h-4 w-4" />
              Empty Pantry
            </button>
          )}
        </div>
      </div>

      {/* Tabs / Collections */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setActiveTab("all")}
          className={cn(
            "px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
            activeTab === "all"
              ? "bg-white text-black shadow-lg"
              : "bg-zinc-900 border border-white/5 text-zinc-500 hover:text-white"
          )}
        >
          All Items
        </button>

        {Object.keys(collections).map(name => (
          <div key={name} className="relative group">
            <button
              onClick={() => setActiveTab(name)}
              className={cn(
                "px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all pr-10",
                activeTab === name
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-zinc-900 border border-white/5 text-zinc-500 hover:text-white"
              )}
            >
              {name}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); deleteCollection(name); if (activeTab === name) setActiveTab("all"); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 opacity-0 group-hover:opacity-100 hover:text-white text-zinc-600 transition-all"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}

        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 border border-white/5 text-zinc-500 hover:text-white text-xs font-black uppercase tracking-widest transition-all"
        >
          <Plus className="h-4 w-4" />
          New Collection
        </button>
      </div>

      <AnimatePresence>
        {isCreating && (
          <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleCreate}
            className="flex items-center gap-3 bg-zinc-900 border border-red-500/20 p-2 rounded-2xl w-full max-w-sm"
          >
            <input
              autoFocus
              type="text"
              placeholder="e.g. Breakfast Hits"
              value={newColName}
              onChange={(e) => setNewColName(e.target.value)}
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold text-white px-3"
            />
            <button type="submit" className="p-2 bg-red-600 rounded-xl text-white">
              <ChevronRight className="h-4 w-4" />
            </button>
            <button onClick={() => setIsCreating(false)} className="p-2 text-zinc-500 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="space-y-6">
        {activeTab !== "all" && (
          <div className="flex items-center gap-2 text-zinc-500">
            <FolderHeart className="h-4 w-4" />
            <p className="text-[10px] font-black uppercase tracking-widest">
              Collection: <span className="text-white">{activeTab}</span>
            </p>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="h-8 w-8 text-red-600 animate-spin" />
            <p className="text-xs font-black text-zinc-600 uppercase tracking-widest">Gathering ingredients...</p>
          </div>
        ) : displayedVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center bg-zinc-900/30 border-2 border-dashed border-white/5 rounded-3xl">
            <Bookmark className="h-12 w-12 text-zinc-900 mb-6" />
            <h3 className="text-lg font-black text-zinc-400 uppercase">Your pantry is empty</h3>
            <p className="text-xs font-bold text-zinc-600 mt-2 uppercase tracking-widest">Videos you save will appear here</p>
          </div>
        ) : (
          <VideoGrid videos={displayedVideos} />
        )}
      </div>
    </div>
  );
}
