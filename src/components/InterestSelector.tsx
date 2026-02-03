"use client";

import { useEffect, useState } from "react";
import { categories } from "@/lib/sample-data";

const INTEREST_KEY = "chewtube:interests";
const INTEREST_LIMIT = 5;

export default function InterestSelector({ onChange }: { onChange: (value: string[]) => void }) {
  const interestOptions = categories.filter((category) => category !== "All");
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(INTEREST_KEY);
    if (!stored) {
      return;
    }
    const parsed = stored.split(",").filter(Boolean);
    setSelected(parsed);
    onChange(parsed);
  }, [onChange]);

  const toggleInterest = (interest: string) => {
    setSelected((current) => {
      if (current.includes(interest)) {
        const next = current.filter((item) => item !== interest);
        localStorage.setItem(INTEREST_KEY, next.join(","));
        onChange(next);
        return next;
      }
      if (current.length >= INTEREST_LIMIT) {
        return current;
      }
      const next = [...current, interest];
      localStorage.setItem(INTEREST_KEY, next.join(","));
      onChange(next);
      return next;
    });
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-chew-200">Your interests</p>
          <h2 className="text-xl font-semibold text-white">
            Pick 3–5 domains so we can plan your watch
          </h2>
        </div>
        <span className="text-xs text-slate-400">{selected.length} / {INTEREST_LIMIT} chosen</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {interestOptions.map((interest) => {
          const isActive = selected.includes(interest);
          return (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`rounded-full px-3 py-1 text-xs transition ${
                isActive
                  ? "bg-chew-500/30 text-white"
                  : "bg-white/10 text-slate-200 hover:bg-white/20"
              }`}
            >
              {interest}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-slate-400">
        We’ll use these to surface better recommendations and build a meal-time watch plan.
      </p>
    </section>
  );
}
