"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X, SlidersHorizontal } from "lucide-react";

const categoryGroups = [
  { id: "Sports", label: "Sports", sub: ["Football", "Cricket", "Tennis", "F1"] },
  { id: "Sitcom", label: "Sitcom" },
  { id: "Movie Clips", label: "Movie Clips" },
  { id: "Gaming", label: "Gaming", sub: ["Minecraft", "GTA", "Valorant", "Esports"] },
  { id: "Funny", label: "Funny" },
  { id: "Food", label: "Food" },
  { id: "Tech", label: "Tech", sub: ["AI", "Apple", "Coding", "Gadgets"] },
  { id: "Music", label: "Music" },
  { id: "Podcasts", label: "Podcasts" },
  { id: "Documentary", label: "Documentary" },
  { id: "Lifestyle", label: "Lifestyle" },
  { id: "Chill", label: "Chill" },
  { id: "Science", label: "Science" },
  { id: "News", label: "News" },
  { id: "Travel", label: "Travel" },
  { id: "Business", label: "Business" },
  { id: "Automotive", label: "Automotive" },
  { id: "ASMR", label: "ASMR" },
  { id: "Art", label: "Art" },
  { id: "Vlog", label: "Vlog" },
  { id: "Shorts", label: "Shorts" },
];

const durationOptions = [
  { id: "quick", label: "Short", desc: "5-15 min" },
  { id: "medium", label: "Medium", desc: "15-30 min" },
  { id: "long", label: "Long", desc: "30+ min" },
];

interface FilterBarProps {
  activeCategory: string | null;
  activeDuration: string | null;
  onCategoryChange: (category: string | null) => void;
  onDurationChange: (duration: string | null) => void;
}

export default function FilterBar({
  activeCategory,
  activeDuration,
  onCategoryChange,
  onDurationChange,
}: FilterBarProps) {
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hasFilters = activeCategory !== null || activeDuration !== null;
  const hasDurationFilter = activeDuration !== null;

  // Find if active category is a parent or a sub-category
  const activeParent = categoryGroups.find(
    g => g.id === activeCategory || (g.sub && g.sub.includes(activeCategory || ""))
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDurationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none px-1">
        {/* Filter Icon with Dropdown */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setIsDurationOpen(!isDurationOpen)}
            className={cn(
              "flex items-center justify-center w-9 h-9 rounded-lg border transition-all",
              hasDurationFilter
                ? "bg-red-600 border-red-600 text-white"
                : "bg-zinc-900 border-white/5 text-zinc-500 hover:border-white/10"
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>

          {/* Duration Dropdown */}
          {isDurationOpen && (
            <div className="absolute top-full left-0 mt-2 w-40 rounded-xl bg-zinc-900 border border-white/10 shadow-2xl z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200">
              {durationOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    onDurationChange(activeDuration === option.id ? null : option.id);
                    setIsDurationOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-2.5 transition-all flex justify-between items-center",
                    activeDuration === option.id
                      ? "text-red-500 bg-red-500/10"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span className="text-sm font-bold">{option.label}</span>
                  <span className="text-[10px] text-zinc-600">{option.desc}</span>
                </button>
              ))}
              {activeDuration && (
                <button
                  onClick={() => {
                    onDurationChange(null);
                    setIsDurationOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs font-bold text-zinc-600 hover:text-white transition-all border-t border-white/5"
                >
                  Clear Duration
                </button>
              )}
            </div>
          )}
        </div>

        {/* All / Clear button */}
        <button
          onClick={() => {
            onCategoryChange(null);
            onDurationChange(null);
          }}
          className={cn(
            "shrink-0 flex items-center gap-1.5 whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold transition-all border",
            !hasFilters
              ? "bg-white text-black border-white"
              : "bg-zinc-900 text-zinc-400 border-white/5 hover:border-white/10"
          )}
        >
          All
          {hasFilters && <X className="h-3 w-3" />}
        </button>

        {/* Vertical Divider */}
        <div className="h-6 w-px bg-white/5 shrink-0 mx-1" />

        {/* Category Filters */}
        {categoryGroups.map((group) => {
          const isSelected = activeCategory === group.id || (group.sub && group.sub.includes(activeCategory || ""));
          return (
            <button
              key={group.id}
              onClick={() => onCategoryChange(activeCategory === group.id ? null : group.id)}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold transition-all border",
                isSelected
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-zinc-900 text-zinc-400 border-white/5 hover:border-white/10"
              )}
            >
              {group.label}
            </button>
          );
        })}
      </div>

      {/* Sub-categories Row */}
      {activeParent?.sub && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 px-1 animate-in fade-in slide-in-from-left-2 duration-300">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-tighter text-zinc-500 shrink-0">
            {activeParent.label} Specs
          </div>
          {activeParent.sub.map((subCat) => (
            <button
              key={subCat}
              onClick={() => onCategoryChange(activeCategory === subCat ? activeParent.id : subCat)}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold transition-all border",
                activeCategory === subCat
                  ? "bg-white text-black border-white"
                  : "bg-zinc-950 text-zinc-500 border-white/5 hover:border-white/10"
              )}
            >
              {subCat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
