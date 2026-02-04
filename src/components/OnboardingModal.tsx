"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    Zap,
    Utensils,
    Armchair,
    Laugh,
    BookOpen,
    Coffee,
    Gamepad2,
    Film,
    Music,
    CheckCircle2,
    ArrowLeft,
    Sparkles,
    Cpu,
    Trophy,
    Palette,
    Mic,
    Smartphone,
    Video,
    FileText,
    Podcast,
    FlaskConical,
    Newspaper,
    Plane,
    Briefcase,
    Car,
    Clapperboard
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePreferences } from "@/context/PreferencesContext";

const mealSizes = [
    { id: "quick", label: "Quick Bite", sub: "5-15 minutes", icon: Zap, color: "text-yellow-400" },
    { id: "medium", label: "Full Meal", sub: "15-30 minutes", icon: Utensils, color: "text-orange-400" },
    { id: "long", label: "Feast Mode", sub: "30+ minutes", icon: Armchair, color: "text-red-400" },
] as const;

const flavorOptions = [
    { id: "Sports", label: "Sports", icon: Trophy },
    { id: "Sitcom", label: "Sitcom", icon: Film },
    { id: "Movie Clips", label: "Movie Clips", icon: Clapperboard },
    { id: "Gaming", label: "Gaming", icon: Gamepad2 },
    { id: "Funny", label: "Funny", icon: Laugh },
    { id: "Food", label: "Food", icon: Utensils },
    { id: "Tech", label: "Tech", icon: Cpu },
    { id: "Music", label: "Music", icon: Music },
    { id: "Podcasts", label: "Podcasts", icon: Podcast },
    { id: "Documentary", label: "Documentary", icon: Film },
    { id: "Lifestyle", label: "Lifestyle", icon: Coffee },
    { id: "Science", label: "Science", icon: FlaskConical },
    { id: "News", label: "News", icon: Newspaper },
    { id: "Travel", label: "Travel", icon: Plane },
    { id: "Business", label: "Business", icon: Briefcase },
    { id: "Automotive", label: "Automotive", icon: Car },
    { id: "ASMR", label: "ASMR", icon: Mic },
    { id: "Art", label: "Art", icon: Palette },
    { id: "Vlog", label: "Vlog", icon: Video },
    { id: "Shorts", label: "Shorts", icon: Smartphone },
];

export default function OnboardingModal() {
    const { hasOnboarded, completeOnboarding } = usePreferences();
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<"welcome" | "duration" | "flavors" | "done">("welcome");
    const [selectedDuration, setSelectedDuration] = useState<"quick" | "medium" | "long" | null>(null);
    const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);

    // Only show modal if not onboarded (after hydration)
    useEffect(() => {
        if (!hasOnboarded) {
            const timer = setTimeout(() => setIsOpen(true), 800);
            return () => clearTimeout(timer);
        }
    }, [hasOnboarded]);

    const handleComplete = () => {
        if (selectedDuration && selectedFlavors.length > 0) {
            completeOnboarding(selectedDuration, selectedFlavors);
            setStep("done");
            setTimeout(() => setIsOpen(false), 2000);
        }
    };

    const toggleFlavor = (flavor: string) => {
        if (selectedFlavors.includes(flavor)) {
            setSelectedFlavors(prev => prev.filter(f => f !== flavor));
        } else if (selectedFlavors.length < 3) {
            setSelectedFlavors(prev => [...prev, flavor]);
        }
    };

    const handleSkip = () => {
        // Skip but mark as seen with defaults
        completeOnboarding("medium", ["Funny", "Food"]);
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl"
                >

                    {/* STEP 1: WELCOME */}
                    {step === "welcome" && (
                        <div className="p-8 text-center space-y-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-orange-500 shadow-lg shadow-red-500/20"
                            >
                                <Utensils className="h-10 w-10 text-white" strokeWidth={1.5} />
                            </motion.div>

                            <div className="space-y-2">
                                <h2 className="font-serif text-3xl text-white">Welcome to the Diner</h2>
                                <p className="text-zinc-500 max-w-sm mx-auto">
                                    Let's set the table. Tell us your appetite so we can serve you better.
                                </p>
                            </div>

                            <div className="space-y-3 pt-4">
                                <button
                                    onClick={() => setStep("duration")}
                                    className="w-full py-4 rounded-xl bg-white text-black font-semibold hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    Set the Table
                                    <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                                </button>
                                <button
                                    onClick={handleSkip}
                                    className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors"
                                >
                                    Skip for now
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: MEAL SIZE / DURATION */}
                    {step === "duration" && (
                        <div className="p-6 space-y-6">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setStep("welcome")}
                                    className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-white transition-colors"
                                >
                                    <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
                                </button>
                                <div>
                                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Step 1 of 2</p>
                                    <h2 className="font-serif text-xl text-white">How long do you usually eat?</h2>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {mealSizes.map((size) => (
                                    <motion.button
                                        key={size.id}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={() => {
                                            setSelectedDuration(size.id);
                                            setStep("flavors");
                                        }}
                                        className="flex w-full items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-left hover:bg-zinc-800/50 hover:border-zinc-700 transition-all group"
                                    >
                                        <div className={cn("rounded-xl bg-zinc-800 p-3 transition-colors group-hover:bg-zinc-700", size.color)}>
                                            <size.icon className="h-5 w-5" strokeWidth={1.5} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-white">{size.label}</div>
                                            <div className="text-sm text-zinc-500">{size.sub}</div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-zinc-700 group-hover:text-zinc-400 transition-colors" strokeWidth={1.5} />
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STEP 3: FLAVORS / CATEGORIES */}
                    {step === "flavors" && (
                        <div className="p-6 space-y-6">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setStep("duration")}
                                    className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-white transition-colors"
                                >
                                    <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
                                </button>
                                <div>
                                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Step 2 of 2</p>
                                    <h2 className="font-serif text-xl text-white">What's your usual vibe?</h2>
                                </div>
                            </div>

                            <p className="text-sm text-zinc-500">Select up to 3 flavors</p>

                            <div className="grid grid-cols-3 gap-3">
                                {flavorOptions.map((flavor) => {
                                    const isSelected = selectedFlavors.includes(flavor.id);
                                    return (
                                        <motion.button
                                            key={flavor.id}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => toggleFlavor(flavor.id)}
                                            className={cn(
                                                "flex flex-col items-center justify-center gap-2 rounded-xl border p-4 transition-all",
                                                isSelected
                                                    ? "bg-white border-white text-black"
                                                    : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                                            )}
                                        >
                                            <flavor.icon className="h-6 w-6" strokeWidth={1.5} />
                                            <span className="text-xs font-medium">{flavor.label}</span>
                                        </motion.button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={handleComplete}
                                disabled={selectedFlavors.length === 0}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                                Complete Setup
                            </button>
                        </div>
                    )}

                    {/* STEP 4: DONE */}
                    {step === "done" && (
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="p-12 text-center space-y-6"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20"
                            >
                                <CheckCircle2 className="h-10 w-10 text-green-500" strokeWidth={1.5} />
                            </motion.div>
                            <div>
                                <h2 className="font-serif text-2xl text-white">Your table is set!</h2>
                                <p className="mt-2 text-zinc-500">The Chef has prepared a custom menu based on your palate.</p>
                                <p className="mt-4 text-xs text-red-500 font-bold uppercase tracking-widest italic animate-pulse">
                                    "Enjoy your meal, Chef!"
                                </p>
                            </div>
                        </motion.div>
                    )}



                </motion.div>
            </AnimatePresence>
        </div>
    );
}
