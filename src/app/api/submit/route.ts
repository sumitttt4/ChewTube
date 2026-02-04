import { NextRequest, NextResponse } from "next/server";
import { extractYouTubeVideoId, parseISO8601Duration, categorizeDuration } from "@/lib/youtube";
import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client with service role for insert operations
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface SubmitRequestBody {
    url: string;
    categories: string[];
}

interface YouTubeAPIResponse {
    items: Array<{
        id: string;
        snippet: {
            title: string;
            channelTitle: string;
            thumbnails: {
                maxres?: { url: string };
                high?: { url: string };
                medium?: { url: string };
                default?: { url: string };
            };
        };
        contentDetails: {
            duration: string;
        };
        status: {
            embeddable: boolean;
            privacyStatus: string;
        };
        statistics: {
            viewCount: string;
        };
    }>;
}

/**
 * POST /api/submit
 * 
 * The "Kitchen Gate" - Validates and submits videos to the database
 */
export async function POST(request: NextRequest) {
    try {
        // 1. Parse request body
        const body: SubmitRequestBody = await request.json();
        const { url, categories } = body;

        if (!url) {
            return NextResponse.json(
                { error: "Missing 'url' in request body" },
                { status: 400 }
            );
        }

        if (!categories || categories.length === 0) {
            return NextResponse.json(
                { error: "Please select at least one category" },
                { status: 400 }
            );
        }

        // 2. Extract Video ID (Sanity Check)
        let videoId: string;
        try {
            videoId = extractYouTubeVideoId(url);
        } catch (error) {
            return NextResponse.json(
                { error: "Invalid YouTube URL. Please check the link." },
                { status: 400 }
            );
        }

        // 3. Dupe Check - Query Supabase
        const { data: existingVideo } = await supabase
            .from("videos")
            .select("id")
            .eq("youtube_id", videoId)
            .single();

        if (existingVideo) {
            return NextResponse.json(
                { error: "Already on the menu! This video was submitted before." },
                { status: 409 }
            );
        }

        // 4. The Inspector - Fetch from YouTube Data API
        const apiKey = process.env.YOUTUBE_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "Server configuration error. Please try again later." },
                { status: 500 }
            );
        }

        const apiUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
        apiUrl.searchParams.set("part", "snippet,contentDetails,status,statistics");
        apiUrl.searchParams.set("id", videoId);
        apiUrl.searchParams.set("key", apiKey);

        const ytResponse = await fetch(apiUrl.toString());

        if (!ytResponse.ok) {
            const errorText = await ytResponse.text();
            console.error("YouTube API error:", errorText);

            if (ytResponse.status === 403) {
                return NextResponse.json(
                    { error: "API quota exceeded. Please try again later." },
                    { status: 503 }
                );
            }

            return NextResponse.json(
                { error: "Failed to fetch video details from YouTube." },
                { status: 500 }
            );
        }

        const ytData: YouTubeAPIResponse = await ytResponse.json();

        // Check if video exists
        if (!ytData.items || ytData.items.length === 0) {
            return NextResponse.json(
                { error: "Video not found. It may be private or deleted." },
                { status: 404 }
            );
        }

        const video = ytData.items[0];

        // Check embeddability
        if (!video.status.embeddable) {
            return NextResponse.json(
                { error: "This video cannot be embedded. The creator has disabled embedding." },
                { status: 403 }
            );
        }

        // Check privacy
        if (video.status.privacyStatus === "private") {
            return NextResponse.json(
                { error: "This video is private and cannot be added." },
                { status: 403 }
            );
        }

        // 5. The Sorter - Parse duration and categorize
        const durationSeconds = parseISO8601Duration(video.contentDetails.duration);
        const durationCategory = categorizeDuration(durationSeconds);

        // Get best thumbnail
        const thumbnails = video.snippet.thumbnails;
        const thumbnailUrl =
            thumbnails.maxres?.url ||
            thumbnails.high?.url ||
            thumbnails.medium?.url ||
            thumbnails.default?.url ||
            `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

        // 6. Storage - Insert into database
        const { data: insertedVideo, error: insertError } = await supabase
            .from("videos")
            .insert({
                youtube_id: videoId,
                title: video.snippet.title,
                channel: video.snippet.channelTitle,
                thumbnail: thumbnailUrl,
                categories: categories,
                duration_category: durationCategory,
                upvotes: 0,
                freshness_score: 100,
                status: 'approved'
            })
            .select()
            .single();

        if (insertError) {
            console.error("Database insert error:", insertError);

            // Handle duplicate (race condition)
            if (insertError.code === "23505") {
                return NextResponse.json(
                    { error: "Already on the menu! This video was just submitted." },
                    { status: 409 }
                );
            }

            return NextResponse.json(
                { error: "Failed to save video. Please try again." },
                { status: 500 }
            );
        }

        // 7. Return the full video object
        return NextResponse.json({
            success: true,
            message: "Video added to the menu!",
            video: {
                id: insertedVideo.id,
                youtube_id: videoId,
                title: video.snippet.title,
                channel: video.snippet.channelTitle,
                thumbnail: thumbnailUrl,
                duration_seconds: durationSeconds,
                duration_category: durationCategory,
                categories: categories,
                view_count: video.statistics.viewCount,
            }
        }, { status: 201 });

    } catch (error) {
        console.error("Submit error:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred. Please try again." },
            { status: 500 }
        );
    }
}
