"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, CheckCircle2, AlertCircle, Clock, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Categories for selection - matches FilterBar
const categoryOptions = [
    "Sports",
    "Sitcom",
    "Movie Clips",
    "Gaming",
    "Funny",
    "Food",
    "Tech",
    "Music",
    "Podcasts",
    "Documentary",
    "Lifestyle",
    "Chill",
    "Science",
    "News",
    "Travel",
    "Business",
    "Automotive",
    "ASMR",
    "Art",
    "Vlog",
    "Shorts",
];

// Duration display labels
const durationLabels: Record<string, string> = {
    quick: "Quick (5-15m)",
    medium: "Medium (15-30m)",
    long: "Long (30m+)",
};

interface VideoMetadata {
    youtube_id: string;
    title: string;
    channel_title: string;
    thumbnail_url: string;
    duration_seconds: number;
    duration_category: "quick" | "medium" | "long";
    view_count: string;
}

export default function SubmitForm() {
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<"input" | "details" | "success">("input");
    const [error, setError] = useState<string | null>(null);
    const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Fetch video metadata from our server-side API
    const handleFetch = async () => {
        if (!url.trim()) {
            setError("Please paste a YouTube URL");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/video/fetch?url=${encodeURIComponent(url)}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch video details");
            }

            setMetadata(data);
            setStep("details");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load video details");
        } finally {
            setIsLoading(false);
        }
    };

    const toggleCategory = (cat: string) => {
        if (selectedCategories.includes(cat)) {
            setSelectedCategories(prev => prev.filter(c => c !== cat));
        } else {
            if (selectedCategories.length >= 3) return;
            setSelectedCategories(prev => [...prev, cat]);
        }
    };

    const handleSubmit = async () => {
        if (!metadata || selectedCategories.length === 0) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    url: url,
                    categories: selectedCategories,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to submit video");
            }

            setStep("success");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to submit video");
        } finally {
            setIsLoading(false);
        }
    };

    const formatDuration = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        if (mins >= 60) {
            const hrs = Math.floor(mins / 60);
            const remainingMins = mins % 60;
            return `${hrs}:${String(remainingMins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
        }
        return `${mins}:${String(secs).padStart(2, "0")}`;
    };

    const resetForm = () => {
        setUrl("");
        setMetadata(null);
        setSelectedCategories([]);
        setError(null);
        setStep("input");
    };

    return (
        <div className="max-w-xl mx-auto">
            <AnimatePresence mode="wait">

                {/* STEP 1: INPUT URL */}
                {step === "input" && (
                    <motion.div
                        key="input"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6 text-center"
                    >
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold text-white">Help others eat while watching</h2>
                            <p className="text-zinc-500">Paste a link and build the community.</p>
                        </div>

                        <div className="relative">
                            <div className="flex items-center overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 p-2">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center text-zinc-600">
                                    <Search className="h-5 w-5" strokeWidth={1.5} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Paste YouTube URL here..."
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="flex-1 bg-transparent px-2 py-2 text-white placeholder:text-zinc-600 focus:outline-none"
                                    onKeyDown={(e) => e.key === "Enter" && handleFetch()}
                                />
                                <button
                                    onClick={handleFetch}
                                    disabled={!url || isLoading}
                                    className="rounded-xl bg-white px-5 py-3 text-sm font-black text-black hover:bg-zinc-200 transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 min-w-[100px]"
                                >
                                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" strokeWidth={3} /> : "FETCH"}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-sm flex items-center justify-center gap-2"
                            >
                                <AlertCircle className="h-4 w-4" strokeWidth={1.5} /> {error}
                            </motion.p>
                        )}

                        <p className="text-xs text-zinc-600">
                            Supports youtube.com/watch, youtu.be, and embed URLs
                        </p>
                    </motion.div>
                )}

                {/* STEP 2: DETAILS & CATEGORY SELECTION */}
                {step === "details" && metadata && (
                    <motion.div
                        key="details"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        {/* Back button */}
                        <button
                            onClick={resetForm}
                            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                            Back
                        </button>

                        {/* Video Preview Card */}
                        <div className="flex gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
                            <div className="relative aspect-video w-40 shrink-0 overflow-hidden rounded-lg bg-black">
                                <Image
                                    src={metadata.thumbnail_url}
                                    alt={metadata.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
                                    {formatDuration(metadata.duration_seconds)}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-white line-clamp-2 text-sm">{metadata.title}</h3>
                                <p className="text-xs text-zinc-500 mt-1">{metadata.channel_title}</p>
                                <div className="flex items-center gap-3 mt-2 text-xs text-zinc-600">
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" strokeWidth={1.5} />
                                        {durationLabels[metadata.duration_category]}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Auto-detected duration info */}
                        <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3 flex items-center gap-3">
                            <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" strokeWidth={1.5} />
                            <p className="text-sm text-zinc-400">
                                Duration auto-detected: <span className="text-green-400">{durationLabels[metadata.duration_category]}</span>
                            </p>
                        </div>

                        {/* Category Selection */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-white">
                                Pick categories <span className="text-zinc-600">(Up to 3)</span>
                            </label>
                            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pb-2">
                                {categoryOptions.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => toggleCategory(cat)}
                                        className={cn(
                                            "rounded-full px-4 py-2.5 text-sm font-bold transition-all border touch-manipulation",
                                            selectedCategories.includes(cat)
                                                ? "bg-red-600 text-white border-red-600 scale-105"
                                                : "bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-zinc-500 active:scale-95"
                                        )}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-400 text-sm flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" strokeWidth={1.5} /> {error}
                            </p>
                        )}

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={selectedCategories.length === 0 || isLoading}
                            className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-black hover:bg-zinc-200 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin mx-auto" strokeWidth={1.5} />
                            ) : (
                                "Submit to ChewTube"
                            )}
                        </button>
                    </motion.div>
                )}

                {/* STEP 3: SUCCESS */}
                {step === "success" && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6 text-center py-12"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20"
                        >
                            <CheckCircle2 className="h-8 w-8 text-green-500" strokeWidth={1.5} />
                        </motion.div>
                        <div>
                            <h2 className="text-xl font-semibold text-white">Video Submitted!</h2>
                            <p className="mt-2 text-zinc-500">Thanks for helping the community eat well.</p>
                        </div>
                        <button
                            onClick={resetForm}
                            className="inline-flex rounded-full border border-zinc-700 px-6 py-2.5 text-sm font-medium text-zinc-300 hover:border-zinc-500 transition-colors"
                        >
                            Submit another
                        </button>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
}
