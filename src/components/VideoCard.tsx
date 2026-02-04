"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, ThumbsUp, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface VideoCardProps {
  video: {
    id: string;
    youtubeId?: string;
    title: string;
    channel: string;
    thumbnail: string;
    duration?: string;
    durationCategory?: string;
    categories?: string[];
    upvotes?: number;
    submitter?: {
      username: string;
    };
  };
}

export default function VideoCard({ video }: VideoCardProps) {
  // Format duration text
  const getDurationLabel = () => {
    if (video.duration) return video.duration;
    switch (video.durationCategory) {
      case 'quick': return '5-15m';
      case 'medium': return '15-30m';
      case 'long': return '30m+';
      default: return '';
    }
  };

  return (
    <motion.div
      className="group flex flex-col gap-3"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Thumbnail */}
      <Link
        href={`/watch/${video.id}`}
        className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-900"
      >
        <Image
          src={video.thumbnail || `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={true}
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            if (!img.src.includes('mqdefault')) {
              img.src = `https://i.ytimg.com/vi/${video.youtubeId}/mqdefault.jpg`;
            }
          }}
        />

        {/* Play overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black shadow-lg">
              <Play className="h-6 w-6 fill-current ml-1" />
            </div>
          </div>
        </div>

        {/* Duration badge */}
        {getDurationLabel() && (
          <div className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {getDurationLabel()}
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-col gap-1 px-1">
        <Link href={`/watch/${video.id}`}>
          <h3 className="line-clamp-2 text-sm font-semibold text-white leading-snug group-hover:text-red-500 transition-colors">
            {video.title}
          </h3>
        </Link>

        <div className="flex flex-col text-xs text-zinc-400">
          <span className="hover:text-white transition-colors cursor-pointer">
            {video.channel}
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            {video.upvotes !== undefined && (
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-3 w-3" />
                {video.upvotes.toLocaleString()}
              </span>
            )}
            {video.categories && video.categories.length > 0 && (
              <span className="text-zinc-500">
                {video.categories[0]}
              </span>
            )}
            {video.submitter?.username && (
              <Link
                href={`/u/${video.submitter.username}`}
                className="ml-auto text-red-500 hover:text-red-400 font-bold transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Chef {video.submitter.username}
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}


