"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SearchBarProps {
    onSelect?: () => void;
}

export default function SearchBar({ onSelect }: SearchBarProps) {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Debounced search
    useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/videos?q=${encodeURIComponent(query)}&limit=8`);
                const data = await response.json();
                setResults(data || []);
            } catch (error) {
                console.error("Search error:", error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (id: string) => {
        router.push(`/watch/${id}`);
        setQuery("");
        setIsOpen(false);
        setResults([]);
        if (onSelect) onSelect();
    };

    return (
        <div ref={containerRef} className="relative w-full">
            <div className="relative flex items-center group">
                <div className="absolute left-4 text-zinc-500 group-focus-within:text-red-500 transition-colors">
                    <Search className="h-5 w-5" />
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search videos, flavors..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    className="w-full rounded-2xl bg-zinc-900 border border-white/5 py-3 pl-12 pr-12 text-base text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500/50 transition-all shadow-inner"
                />
                {query && (
                    <button
                        onClick={() => {
                            setQuery("");
                            setResults([]);
                            inputRef.current?.focus();
                        }}
                        className="absolute right-4 text-zinc-500 hover:text-white"
                    >
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>

            {/* Results Dropdown */}
            <AnimatePresence>
                {isOpen && (query.length >= 2 || results.length > 0) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-3 rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl overflow-hidden z-[100] max-h-[70vh] overflow-y-auto"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="h-6 w-6 animate-spin text-red-500" />
                            </div>
                        ) : results.length > 0 ? (
                            <div className="flex flex-col">
                                {results.map((video) => (
                                    <button
                                        key={video.id}
                                        onClick={() => handleSelect(video.id)}
                                        className="flex items-start gap-4 p-4 text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                                    >
                                        <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                                            <img
                                                src={video.thumbnail}
                                                alt={video.title}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-white line-clamp-2 leading-tight">
                                                {video.title}
                                            </p>
                                            <p className="text-xs text-zinc-500 mt-1 font-medium">{video.channel}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : query.length >= 2 ? (
                            <div className="py-12 text-center">
                                <Search className="h-10 w-10 text-zinc-800 mx-auto mb-3" />
                                <p className="text-sm text-zinc-500 font-medium">No results for "{query}"</p>
                            </div>
                        ) : null}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
