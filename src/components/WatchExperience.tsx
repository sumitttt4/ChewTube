"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Share2, ThumbsUp, Bookmark, Play, Check, Loader2, Sparkles, FolderPlus, FolderCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSavedVideos } from "@/hooks/useSavedVideos";
import { useCollections } from "@/hooks/useCollections";

export default function WatchExperience({ id }: { id: string }) {
  const [video, setVideo] = useState<any>(null);
  const [relatedVideos, setRelatedVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [showCollections, setShowCollections] = useState(false);

  const { isSaved, toggleSave } = useSavedVideos();
  const { collections, toggleVideoInCollection } = useCollections();

  useEffect(() => {
    const fetchVideoData = async () => {
      setLoading(true);
      try {
        const { data } = await supabase.from("videos").select("*").eq("id", id).single();
        if (data) {
          const currentVideo = {
            id: data.id,
            youtubeId: data.youtube_id,
            title: data.title,
            channel: data.channel,
            thumbnail: data.thumbnail,
            duration: data.duration_category,
            categories: data.categories || [],
            upvotes: data.upvotes
          };
          setVideo(currentVideo);

          if (currentVideo.categories.length > 0) {
            const { data: related } = await supabase
              .from("videos")
              .select("*")
              .contains("categories", [currentVideo.categories[0]])
              .neq("id", id)
              .limit(10);

            if (related) {
              setRelatedVideos(related);
            }
          }
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchVideoData();
  }, [id]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const upvoted = JSON.parse(localStorage.getItem("chewtube:upvoted") || "[]");
      setIsUpvoted(upvoted.includes(id));
    }
  }, [id]);

  const handleUpvote = async () => {
    if (isUpvoted) return;
    setIsUpvoted(true);
    const upvoted = JSON.parse(localStorage.getItem("chewtube:upvoted") || "[]");
    localStorage.setItem("chewtube:upvoted", JSON.stringify([...upvoted, id]));
    await supabase.rpc('increment_upvotes', { video_id: id });
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest leading-none">Plating your meal...</p>
    </div>
  );

  if (!video) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <h2 className="text-xl font-bold text-white">Video not found.</h2>
      <Link href="/" className="text-red-500 hover:underline">Go back home</Link>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 -mt-4 sm:mt-0">
      {/* Main Player Area */}
      <div className="flex-1 space-y-6">
        <div className="relative -mx-4 sm:mx-0 aspect-video overflow-hidden sm:rounded-2xl bg-black shadow-2xl transition-all">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allowFullScreen
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {video.categories.map((category: string) => (
                <span key={category} className="rounded-full bg-red-600/10 border border-red-600/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-red-500">
                  {category}
                </span>
              ))}
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-white leading-tight tracking-tight uppercase">
              {video.title}
            </h1>
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <p className="text-sm sm:text-base text-zinc-500 font-bold">{video.channel}</p>
              <div className="flex items-center gap-1.5 text-xs font-black text-white">
                <ThumbsUp className="h-4 w-4 text-red-500 fill-current" />
                {((video.upvotes || 0) + (isUpvoted ? 1 : 0)).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 relative">
            <button
              onClick={handleUpvote}
              className={cn(
                "flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-black transition-all shrink-0 uppercase tracking-widest",
                isUpvoted ? "bg-red-600 text-white" : "bg-zinc-900 border border-white/5 text-white hover:bg-white/5"
              )}
            >
              <ThumbsUp className={cn("h-4 w-4", isUpvoted && "fill-current")} />
              {isUpvoted ? "UPVOTED" : "UPVOTE"}
            </button>

            <div className="relative">
              <button
                onClick={() => {
                  toggleSave(id);
                  if (!isSaved(id)) setShowCollections(true);
                }}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-black transition-all shrink-0 uppercase tracking-widest",
                  isSaved(id) ? "bg-white text-black" : "bg-zinc-900 border border-white/5 text-white hover:bg-white/5"
                )}
              >
                <Bookmark className={cn("h-4 w-4", isSaved(id) && "fill-current")} />
                {isSaved(id) ? "SAVED" : "SAVE"}
              </button>

              {isSaved(id) && (
                <button
                  onClick={() => setShowCollections(!showCollections)}
                  className="absolute -top-2 -right-2 p-1 bg-red-600 rounded-full border-2 border-zinc-950 text-white hover:scale-110 transition-transform"
                >
                  <FolderPlus className="h-3 w-3" />
                </button>
              )}

              <AnimatePresence>
                {showCollections && isSaved(id) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-full left-0 mb-4 w-56 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 p-2"
                  >
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 px-2 pt-1 flex items-center justify-between">
                      Add to Collection
                      <button onClick={() => setShowCollections(false)} className="hover:text-white"><X className="h-3 w-3" /></button>
                    </p>
                    <div className="flex flex-col gap-1">
                      {Object.keys(collections).length > 0 ? Object.keys(collections).map(name => (
                        <button
                          key={name}
                          onClick={() => toggleVideoInCollection(name, id)}
                          className={cn(
                            "flex items-center justify-between w-full px-3 py-2 text-left rounded-xl text-xs font-bold transition-all",
                            collections[name]?.includes(id)
                              ? "bg-red-600/10 text-red-500"
                              : "text-zinc-400 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          {name}
                          {collections[name]?.includes(id) && <Check className="h-3 w-3" />}
                        </button>
                      )) : (
                        <Link
                          href="/saved"
                          className="text-[10px] font-bold text-zinc-600 hover:text-red-500 px-3 py-2 block text-center uppercase tracking-widest"
                        >
                          Create a collection first
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 rounded-xl bg-zinc-900 border border-white/5 px-6 py-3 text-xs font-black text-white hover:bg-white/5 transition-all shrink-0 uppercase tracking-widest"
            >
              {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
              SHARE
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar: Related Dishes */}
      <aside className="w-full lg:w-96 shrink-0 space-y-6">
        <div className="flex items-center gap-2 px-1">
          <Sparkles className="h-4 w-4 text-red-500" />
          <h3 className="text-sm font-black text-white uppercase tracking-tight">Related Dishes</h3>
        </div>

        <div className="flex flex-col gap-4">
          {relatedVideos.length > 0 ? relatedVideos.map((rv) => (
            <Link
              key={rv.id}
              href={`/watch/${rv.id}`}
              className="flex gap-4 group hover:bg-white/5 p-2 rounded-2xl transition-all"
            >
              <div className="relative w-32 aspect-video shrink-0 overflow-hidden rounded-xl bg-zinc-900">
                <img
                  src={rv.thumbnail}
                  alt={rv.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors">
                  <Play className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 fill-current" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white line-clamp-2 leading-tight group-hover:text-red-500 transition-colors">
                  {rv.title}
                </h4>
                <p className="text-[10px] text-zinc-500 mt-1 font-bold uppercase tracking-widest">
                  {rv.channel}
                </p>
              </div>
            </Link>
          )) : (
            <div className="py-12 text-center border border-dashed border-white/5 rounded-3xl">
              <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">No more in this vibe</p>
            </div>
          )}
        </div>

        <Link
          href="/"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-zinc-900 border border-white/5 text-xs font-bold text-zinc-400 hover:text-white hover:border-white/10 transition-all uppercase tracking-widest"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Menu
        </Link>
      </aside>
    </div>
  );
}

import { X } from "lucide-react";
