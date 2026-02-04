import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { fetchVideoMetadata } from "@/lib/youtube";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
    // Only allow in development for now
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json({ error: "Not allowed in production" }, { status: 403 });
    }

    try {
        // 1. Fetch all videos that need syncing
        const { data: videos, error: fetchError } = await supabase
            .from("videos")
            .select("id, youtube_id, title");

        if (fetchError) throw fetchError;

        if (!videos || videos.length === 0) {
            return NextResponse.json({ message: "No videos found to sync" });
        }

        const results = [];
        const errors = [];

        // 2. Loop through and sync each video
        // We'll do them sequentially to avoid hitting YouTube API rate limits
        for (const video of videos) {
            try {
                process.stdout.write(`Syncing: ${video.title} (${video.youtube_id})... `);

                // Fetch fresh metadata
                const metadata = await fetchVideoMetadata(video.youtube_id);

                // Update database
                const { error: updateError } = await supabase
                    .from("videos")
                    .update({
                        title: metadata.title,
                        channel: metadata.channel_title,
                        thumbnail: metadata.thumbnail_url,
                        duration_category: metadata.duration_category,
                        // freshness_score: 100 // Reset freshness on sync? Maybe not.
                    })
                    .eq("id", video.id);

                if (updateError) throw updateError;

                results.push({ id: video.id, success: true, title: metadata.title });
                console.log("DONE");
            } catch (err) {
                console.error("FAILED");
                errors.push({
                    id: video.id,
                    youtube_id: video.youtube_id,
                    error: err instanceof Error ? err.message : "Unknown error"
                });
            }
        }

        return NextResponse.json({
            message: "Sync complete",
            total: videos.length,
            synced: results.length,
            failed: errors.length,
            errors: errors
        });

    } catch (error) {
        console.error("Sync error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
