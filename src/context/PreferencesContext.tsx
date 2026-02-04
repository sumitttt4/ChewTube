"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Types
interface PreferencesContextType {
    mealDuration: "quick" | "medium" | "long" | null;
    favoriteCategories: string[];
    hasOnboarded: boolean;
    isHydrated: boolean;
    setMealDuration: (duration: "quick" | "medium" | "long" | null) => void;
    setFavoriteCategories: (categories: string[]) => void;
    completeOnboarding: (duration: "quick" | "medium" | "long", categories: string[]) => void;
    resetPreferences: () => void;
}

const STORAGE_KEY = "chewtube-prefs";

// Default values
const defaultPreferences: PreferencesContextType = {
    mealDuration: null,
    favoriteCategories: [],
    hasOnboarded: false,
    isHydrated: false,
    setMealDuration: () => { },
    setFavoriteCategories: () => { },
    completeOnboarding: () => { },
    resetPreferences: () => { },
};

// Context
const PreferencesContext = createContext<PreferencesContextType>(defaultPreferences);

// Provider
export function PreferencesProvider({ children }: { children: ReactNode }) {
    const [mealDuration, setMealDurationState] = useState<"quick" | "medium" | "long" | null>(null);
    const [favoriteCategories, setFavoriteCategoriesState] = useState<string[]>([]);
    const [hasOnboarded, setHasOnboarded] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load from localStorage on mount (client-side only)
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setMealDurationState(parsed.mealDuration || null);
                setFavoriteCategoriesState(parsed.favoriteCategories || []);
                setHasOnboarded(parsed.hasOnboarded || false);
            }
        } catch (error) {
            console.error("Failed to load preferences:", error);
        }
        setIsHydrated(true);
    }, []);

    // Persist to localStorage whenever state changes
    useEffect(() => {
        if (!isHydrated) return;

        const prefs = {
            mealDuration,
            favoriteCategories,
            hasOnboarded,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    }, [mealDuration, favoriteCategories, hasOnboarded, isHydrated]);

    // Actions
    const setMealDuration = (duration: "quick" | "medium" | "long" | null) => {
        setMealDurationState(duration);
    };

    const setFavoriteCategories = (categories: string[]) => {
        setFavoriteCategoriesState(categories);
    };

    const completeOnboarding = (duration: "quick" | "medium" | "long", categories: string[]) => {
        setMealDurationState(duration);
        setFavoriteCategoriesState(categories);
        setHasOnboarded(true);
    };

    const resetPreferences = () => {
        setMealDurationState(null);
        setFavoriteCategoriesState([]);
        setHasOnboarded(false);
        localStorage.removeItem(STORAGE_KEY);
    };

    // DO NOT return null - always render children to prevent layout breaking
    return (
        <PreferencesContext.Provider
            value={{
                mealDuration,
                favoriteCategories,
                hasOnboarded,
                isHydrated,
                setMealDuration,
                setFavoriteCategories,
                completeOnboarding,
                resetPreferences,
            }}
        >
            {children}
        </PreferencesContext.Provider>
    );
}

// Hook
export function usePreferences() {
    const context = useContext(PreferencesContext);
    if (!context) {
        throw new Error("usePreferences must be used within PreferencesProvider");
    }
    return context;
}
