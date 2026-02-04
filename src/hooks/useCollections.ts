"use client";

import { useState, useEffect } from "react";

export function useCollections() {
    const [collections, setCollections] = useState<Record<string, string[]>>({});

    useEffect(() => {
        const saved = localStorage.getItem("chewtube:collections");
        if (saved) {
            setCollections(JSON.parse(saved));
        }
    }, []);

    const saveCollections = (newCollections: Record<string, string[]>) => {
        setCollections(newCollections);
        localStorage.setItem("chewtube:collections", JSON.stringify(newCollections));
    };

    const createCollection = (name: string) => {
        if (collections[name]) return;
        saveCollections({ ...collections, [name]: [] });
    };

    const deleteCollection = (name: string) => {
        const newCols = { ...collections };
        delete newCols[name];
        saveCollections(newCols);
    };

    const toggleVideoInCollection = (collectionName: string, videoId: string) => {
        const current = collections[collectionName] || [];
        const updated = current.includes(videoId)
            ? current.filter(id => id !== videoId)
            : [...current, videoId];

        saveCollections({ ...collections, [collectionName]: updated });
    };

    return {
        collections,
        createCollection,
        deleteCollection,
        toggleVideoInCollection
    };
}
