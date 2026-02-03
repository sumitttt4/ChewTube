"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { sampleVideos } from "@/lib/sample-data";

const RECENTLY_WATCHED_KEY = "chewtube:recently-watched";

export default function WatchExperience({ id }: { id: string }) {
  const initialVideo = useMemo(
    () => sampleVideos.find((item) => item.id === id) ?? sampleVideos[0],
    [id]
  );
  const [video, setVideo] = useState(initialVideo);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setVideo(initialVideo);
  }, [initialVideo]);

  useEffect(() => {
    if (!video?.id) {
      return;
    }
    const existing = localStorage.getItem(RECENTLY_WATCHED_KEY)?.split(",").filter(Boolean) ?? [];
    const next = [video.id, ...existing.filter((stored) => stored !== video.id)].slice(0, 8);
    localStorage.setItem(RECENTLY_WATCHED_KEY, next.join(","));
  }, [video]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const handleNextRandom = () => {
    if (sampleVideos.length === 0) {
      return;
    }
    const currentId = video.id;
    let nextVideo = video;
    while (nextVideo.id === currentId) {
      nextVideo = sampleVideos[Math.floor(Math.random() * sampleVideos.length)];
    }
    setVideo(nextVideo);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Link href="/" className="text-sm text-chew-200">
          ← Back to browse
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold text-white">{video.title}</h1>
          <span className="rounded-full bg-chew-500/20 px-3 py-1 text-xs text-chew-100">
            Staff Pick
          </span>
        </div>
        <p className="text-sm text-slate-300">Submitted by {video.submitter}</p>
      </div>

      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
        <span>Duration: {video.duration}</span>
        <span>Channel: ChewTube Picks</span>
        <span>Upvotes: {video.upvotes}</span>
      </div>

      <div className="flex flex-wrap gap-3">
        {video.categories.map((category) => (
          <span key={category} className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-200">
            {category}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button className="rounded-full bg-chew-500 px-5 py-2 text-sm font-semibold text-white">
          ▲ Upvote
        </button>
        <button className="rounded-full border border-white/20 px-5 py-2 text-sm text-slate-200">
          Save
        </button>
        <button
          type="button"
          onClick={handleNextRandom}
          className="rounded-full border border-white/20 px-5 py-2 text-sm text-slate-200"
        >
          Next random
        </button>
        <button
          type="button"
          onClick={handleCopyLink}
          className="rounded-full border border-white/20 px-5 py-2 text-sm text-slate-200"
        >
          {copied ? "Copied!" : "Share link"}
        </button>
      </div>
    </div>
  );
}
