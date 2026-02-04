"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { usePreferences } from "@/context/PreferencesContext";

interface ServeButtonProps {
    // If filters are manually set, use those instead of preferences
    manualDuration?: string | null;
    manualCategory?: string | null;
}

export default function ServeButton({ manualDuration, manualCategory }: ServeButtonProps) {
    const router = useRouter();
    const { mealDuration, favoriteCategories } = usePreferences();
    const [loading, setLoading] = useState(false);

    const handleServe = async () => {
        setLoading(true);
        try {
            // Use manual filters if set, otherwise fall back to preferences
            const targetDuration = manualDuration ?? mealDuration;
            const targetCategories = manualCategory ? [manualCategory] : (favoriteCategories.length > 0 ? favoriteCategories : null);

            // Build query
            let query = supabase.from("videos").select("id");

            // Apply duration filter from preferences
            if (targetDuration) {
                query = query.eq("duration_category", targetDuration);
            }

            // Apply category filter from preferences (any match)
            if (targetCategories && targetCategories.length > 0) {
                query = query.overlaps("categories", targetCategories);
            }

            const { data } = await query.limit(50);

            if (data && data.length > 0) {
                const randomVideo = data[Math.floor(Math.random() * data.length)];
                router.push(`/watch/${randomVideo.id}`);
            } else {
                // Fallback: get any random video if preferences don't match
                const { data: fallbackData } = await supabase
                    .from("videos")
                    .select("id")
                    .limit(50);

                if (fallbackData && fallbackData.length > 0) {
                    const randomVideo = fallbackData[Math.floor(Math.random() * fallbackData.length)];
                    router.push(`/watch/${randomVideo.id}`);
                }
            }
        } catch (error) {
            console.error("Error fetching random video:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative inline-flex items-center justify-center">
            {/* Glow Layer */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-orange-500 blur-2xl opacity-40 animate-pulse-glow" />

            {/* Button */}
            <motion.button
                onClick={handleServe}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative flex items-center gap-3 rounded-full bg-zinc-900 border border-white/10 px-8 py-5 transition-all hover:border-white/20 disabled:opacity-70 group"
            >
                {/* Shine effect on hover */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                </div>

                {/* Icon */}
                {loading ? (
                    <Loader2 className="w-5 h-5 text-orange-400 animate-spin" strokeWidth={1.5} />
                ) : (
                    <Sparkles className="w-5 h-5 text-orange-400" strokeWidth={1.5} />
                )}

                {/* Text */}
                <div className="flex flex-col items-start">
                    <span className="font-sans font-bold text-white text-base">
                        {loading ? "Finding..." : "Serve Me"}
                    </span>
                    <span className="font-sans text-[10px] uppercase tracking-widest text-zinc-500">
                        Surprise Dish
                    </span>
                </div>
            </motion.button>
        </div>
    );
}
