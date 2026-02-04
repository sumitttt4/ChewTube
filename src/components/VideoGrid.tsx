"use client";

import VideoCard from "./VideoCard";
import { motion } from "framer-motion";
import { Film } from "lucide-react";
import Link from "next/link";

interface VideoGridProps {
  videos: any[];
  emptyMessage?: string;
}

export default function VideoGrid({ videos, emptyMessage }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 sm:py-24 bg-gradient-to-b from-white/5 to-transparent rounded-3xl border border-white/10 text-center px-6"
      >
        <div className="text-6xl mb-6">🍽️</div>
        <p className="text-2xl sm:text-3xl font-black text-white mb-2">The Kitchen is Empty!</p>
        <p className="text-sm sm:text-base text-zinc-500 max-w-md mb-8">
          Be the first Chef to plate a dish. Submit your favorite YouTube video and help others eat well.
        </p>
        <Link
          href="/submit"
          className="rounded-full bg-red-600 px-8 py-3 text-sm font-bold text-white hover:bg-red-500 transition-all active:scale-95 shadow-lg shadow-red-600/20"
        >
          🔥 Submit First Video
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="grid gap-x-5 gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}


