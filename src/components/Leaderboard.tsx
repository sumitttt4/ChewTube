"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, ChefHat, TrendingUp, Award, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function Leaderboard() {
    const [chefs, setChefs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch("/api/leaderboard");
                const data = await response.json();
                if (Array.isArray(data)) {
                    setChefs(data);
                }
            } catch (error) {
                console.error("Failed to fetch leaderboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-12 gap-3 bg-zinc-900/40 rounded-3xl border border-white/5">
                <Loader2 className="h-6 w-6 animate-spin text-red-600" />
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Sizing up the chefs...</p>
            </div>
        );
    }

    if (chefs.length === 0) return null;

    return (
        <section className="bg-zinc-900/40 rounded-3xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-600/10 rounded-xl">
                        <TrendingUp className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-white uppercase tracking-tight">Top Chefs</h3>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Community Leaderboard</p>
                    </div>
                </div>
            </div>

            <div className="divide-y divide-white/5">
                {chefs.map((chef, index) => (
                    <Link
                        key={chef.id}
                        href={`/u/${chef.username}`}
                        className="flex items-center gap-4 p-4 hover:bg-white/5 transition-all group"
                    >
                        <div className="flex items-center justify-center w-6 text-sm font-black text-zinc-700 group-hover:text-red-600 transition-colors">
                            {index + 1}
                        </div>

                        <div className="relative">
                            <img
                                src={chef.avatar_url}
                                alt={chef.username}
                                className="h-10 w-10 rounded-full border border-white/10 bg-zinc-800"
                            />
                            {index === 0 && (
                                <div className="absolute -top-1 -right-1 bg-yellow-500 p-0.5 rounded-full border border-zinc-950">
                                    <Award className="h-2.5 w-2.5 text-black fill-current" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate group-hover:text-red-500 transition-colors">
                                {chef.username}
                            </p>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                                {chef.submission_count} dishes served
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-sm font-black text-white">{chef.total_upvotes}</p>
                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Upvotes</p>
                        </div>

                        <ExternalLink className="h-3 w-3 text-zinc-800 group-hover:text-zinc-500 transition-colors" />
                    </Link>
                ))}
            </div>

            <div className="p-4 bg-zinc-950/50">
                <Link
                    href="/submit"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-zinc-900 border border-white/5 text-[10px] font-black text-zinc-400 hover:text-white hover:border-white/10 transition-all uppercase tracking-widest"
                >
                    <ChefHat className="h-3 w-3" />
                    Join the kitchen
                </Link>
            </div>
        </section>
    );
}
