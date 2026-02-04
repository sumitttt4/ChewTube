/**
 * YouTube Video Metadata Utilities
 * Server-side only - DO NOT import in client components
 */

// ============================================
// TYPES
// ============================================

export interface YouTubeVideoMetadata {
    youtube_id: string;
    title: string;
    channel_title: string;
    thumbnail_url: string;
    duration_seconds: number;
    duration_category: "quick" | "medium" | "long";
    view_count: string;
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
            duration: string; // ISO 8601 format e.g., "PT15M33S"
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

// ============================================
// HELPERS
// ============================================

/**
 * Extract YouTube Video ID from various URL formats
 * Supports: youtube.com/watch?v=, youtu.be/, youtube.com/embed/, youtube.com/v/
 */
export function extractYouTubeVideoId(url: string): string {
    const patterns = [
        // Standard watch URL: youtube.com/watch?v=VIDEO_ID
        /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
        // Short URL: youtu.be/VIDEO_ID
        /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
        // Embed URL: youtube.com/embed/VIDEO_ID
        /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        // Old embed: youtube.com/v/VIDEO_ID
        /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
        // With additional params
        /(?:youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    // Check if it's already just a video ID (11 characters, alphanumeric + _ -)
    if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
        return url.trim();
    }

    throw new Error("Invalid YouTube URL. Could not extract video ID.");
}

/**
 * Parse ISO 8601 duration format to seconds
 * Examples: PT1H30M15S -> 5415, PT15M33S -> 933, PT45S -> 45
 */
export function parseISO8601Duration(duration: string): number {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

    if (!match) {
        throw new Error(`Invalid duration format: ${duration}`);
    }

    const hours = parseInt(match[1] || "0", 10);
    const minutes = parseInt(match[2] || "0", 10);
    const seconds = parseInt(match[3] || "0", 10);

    return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Categorize video based on duration (ChewTube business rules)
 */
export function categorizeDuration(durationSeconds: number): "quick" | "medium" | "long" {
    if (durationSeconds < 900) {
        // Less than 15 minutes
        return "quick";
    } else if (durationSeconds <= 1800) {
        // 15-30 minutes
        return "medium";
    } else {
        // More than 30 minutes
        return "long";
    }
}

/**
 * Format view count for display
 */
export function formatViewCount(count: string): string {
    const num = parseInt(count, 10);
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    }
    return count;
}

// ============================================
// MAIN FETCH FUNCTION
// ============================================

/**
 * Fetch video metadata from YouTube Data API v3
 * This is a SERVER-SIDE ONLY function
 */
export async function fetchVideoMetadata(url: string): Promise<YouTubeVideoMetadata> {
    // 1. Extract Video ID
    const videoId = extractYouTubeVideoId(url);

    // 2. Validate API Key exists
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
        throw new Error("YouTube API Key is not configured. Set YOUTUBE_API_KEY in .env.local");
    }

    // 3. Build API URL
    const apiUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
    apiUrl.searchParams.set("part", "snippet,contentDetails,status,statistics");
    apiUrl.searchParams.set("id", videoId);
    apiUrl.searchParams.set("key", apiKey);

    // 4. Fetch from YouTube API
    const response = await fetch(apiUrl.toString(), {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
        // Cache for 1 hour on server
        next: { revalidate: 3600 },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`YouTube API error: ${response.status} - ${errorText}`);
    }

    const data: YouTubeAPIResponse = await response.json();

    // 5. Check if video exists
    if (!data.items || data.items.length === 0) {
        throw new Error("Video not found. It may be private, deleted, or the ID is incorrect.");
    }

    const video = data.items[0];

    // 6. Check embeddability (Critical for ChewTube)
    if (!video.status.embeddable) {
        throw new Error("This video cannot be embedded. The creator has disabled embedding.");
    }

    // 7. Check privacy status
    if (video.status.privacyStatus === "private") {
        throw new Error("This video is private and cannot be accessed.");
    }

    // 8. Parse duration
    const durationSeconds = parseISO8601Duration(video.contentDetails.duration);
    const durationCategory = categorizeDuration(durationSeconds);

    // 9. Get best thumbnail (prefer maxres, fallback to high)
    const thumbnails = video.snippet.thumbnails;
    const thumbnailUrl =
        thumbnails.maxres?.url ||
        thumbnails.high?.url ||
        thumbnails.medium?.url ||
        thumbnails.default?.url ||
        `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    // 10. Return clean metadata
    return {
        youtube_id: videoId,
        title: video.snippet.title,
        channel_title: video.snippet.channelTitle,
        thumbnail_url: thumbnailUrl,
        duration_seconds: durationSeconds,
        duration_category: durationCategory,
        view_count: video.statistics.viewCount,
    };
}
