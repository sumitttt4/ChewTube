"use client";

import Link from "next/link";
import type { Video } from "@/lib/sample-data";

type ServeMeButtonProps = {
  recommendation: Video | null;
  onServe: () => void;
  onSkip: () => void;
  hasResults: boolean;
  isServing: boolean;
};

export default function ServeMeButton({
  recommendation,
  onServe,
  onSkip,
  hasResults,
  isServing
}: ServeMeButtonProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-chew-500/40 bg-gradient-to-br from-chew-500/20 via-slate-900/80 to-slate-900 px-6 py-5">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-chew-200">Serve Me</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Randomly pick something tasty to watch.
        </h2>
        {recommendation ? (
          <p className="mt-2 text-sm text-slate-200">
            Now serving: <span className="font-semibold text-white">{recommendation.title}</span>
          </p>
        ) : (
          <p className="mt-2 text-sm text-slate-300">
            Tap serve to get a random pick matching your filters.
          </p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onServe}
          disabled={!hasResults || isServing}
          className="rounded-full bg-chew-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-chew-500/40 transition hover:bg-chew-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isServing ? "Serving..." : "Serve me a video"}
        </button>
        <button
          type="button"
          onClick={onSkip}
          disabled={!hasResults || isServing}
          className="rounded-full border border-white/20 px-5 py-2 text-sm text-slate-200 hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Not this, next
        </button>
        {recommendation ? (
          <Link
            href={`/watch/${recommendation.id}`}
            className="rounded-full border border-chew-400/60 px-5 py-2 text-sm font-semibold text-chew-100 transition hover:border-chew-300 hover:text-white"
          >
            Watch now
          </Link>
        ) : null}
      </div>
    </div>
  );
}
