"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "chewtube-saved";

interface UseSavedVideosReturn {
    savedVideoIds: string[];
    saveVideo: (id: string) => void;
    unsaveVideo: (id: string) => void;
    toggleSave: (id: string) => void;
    isSaved: (id: string) => boolean;
    clearAll: () => void;
}

export function useSavedVideos(): UseSavedVideosReturn {
    const [savedVideoIds, setSavedVideoIds] = useState<string[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    setSavedVideoIds(parsed);
                }
            }
        } catch (error) {
            console.error("Failed to load saved videos:", error);
        }
        setIsHydrated(true);
    }, []);

    // Persist to localStorage whenever state changes
    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedVideoIds));
    }, [savedVideoIds, isHydrated]);

    // Save a video
    const saveVideo = useCallback((id: string) => {
        setSavedVideoIds((prev) => {
            if (prev.includes(id)) return prev;
            return [...prev, id];
        });
    }, []);

    // Unsave a video
    const unsaveVideo = useCallback((id: string) => {
        setSavedVideoIds((prev) => prev.filter((savedId) => savedId !== id));
    }, []);

    // Toggle save state
    const toggleSave = useCallback((id: string) => {
        setSavedVideoIds((prev) => {
            if (prev.includes(id)) {
                return prev.filter((savedId) => savedId !== id);
            }
            return [...prev, id];
        });
    }, []);

    // Check if video is saved
    const isSaved = useCallback((id: string) => {
        return savedVideoIds.includes(id);
    }, [savedVideoIds]);

    // Clear all saved videos
    const clearAll = useCallback(() => {
        setSavedVideoIds([]);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    return {
        savedVideoIds,
        saveVideo,
        unsaveVideo,
        toggleSave,
        isSaved,
        clearAll,
    };
}
