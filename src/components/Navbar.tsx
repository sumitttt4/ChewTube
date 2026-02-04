"use client";

import Link from "next/link";
import { Search, Heart, User, PlusSquare } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-white/5">
      <div className="flex h-16 items-center px-4 justify-between gap-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <BrandLogo className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight text-white sm:inline">
              ChewTube
            </span>
          </Link>
        </div>

        {/* Center: Search (Desktop) */}
        <div className="flex-1 max-w-lg hidden md:block">
          <SearchBar />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2.5 text-zinc-400 hover:text-white md:hidden"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Submit - always visible */}
          <Link
            href="/submit"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900 px-3 py-2 text-xs font-bold text-white hover:bg-white/5 transition-all"
          >
            <PlusSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Submit</span>
          </Link>

          {/* Support - always visible */}
          <Link
            href="https://buymeacoffee.com/sumitsharmq"
            target="_blank"
            className="flex items-center gap-2 rounded-full border border-yellow-500/10 bg-yellow-500/5 px-3 py-2 text-xs font-bold text-yellow-500 hover:bg-yellow-500/10 transition-all"
          >
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Support</span>
          </Link>

          <button className="p-2 text-zinc-400 hover:text-white">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>


      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-x-0 top-0 z-[60] bg-background p-3 md:hidden shadow-xl"
          >
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <SearchBar onSelect={() => setIsSearchOpen(false)} />
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 text-zinc-400 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

