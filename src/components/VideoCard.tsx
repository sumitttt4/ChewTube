"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Video } from "@/lib/sample-data";

export default function VideoCard({ video }: { video: Video }) {
  const [isPreviewing, setIsPreviewing] = useState(false);

  return (
    <article
      className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 transition hover:border-chew-400/60"
      onMouseLeave={() => setIsPreviewing(false)}
    >
      <div className="relative h-44 w-full">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover"
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
          {video.duration}
        </span>
        <div
          className={`absolute inset-0 flex items-end justify-between bg-slate-950/70 p-4 text-white transition ${
            isPreviewing ? "opacity-100" : "opacity-0"
          } group-hover:opacity-100`}
        >
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-chew-200">{video.durationCategory}</p>
            <p className="text-sm font-semibold">{video.title}</p>
            <p className="text-xs text-slate-200">▲ {video.upvotes} upvotes</p>
          </div>
          <Link
            href={`/watch/${video.id}`}
            className="rounded-full bg-chew-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-chew-500/30"
          >
            Play
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setIsPreviewing((value) => !value)}
          className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white transition hover:bg-black/80 md:hidden"
        >
          Preview
        </button>
      </div>
      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-base font-semibold text-white">{video.title}</h3>
          <p className="text-xs text-slate-400">Submitted by {video.submitter}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {video.categories.map((category) => (
            <span
              key={category}
              className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200"
            >
              {category}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-slate-300">
          <span className="uppercase tracking-wide">{video.durationCategory}</span>
          <span>▲ {video.upvotes}</span>
        </div>
      </div>
    </article>
  );
}
