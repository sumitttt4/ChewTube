import { NextRequest, NextResponse } from "next/server";
import { fetchVideoMetadata } from "@/lib/youtube";

/**
 * GET /api/video/fetch?url=...
 * 
 * Fetches video metadata from YouTube Data API v3
 * Server-side only - API key is never exposed to client
 */
export async function GET(request: NextRequest) {
    try {
        // 1. Get URL from query params
        const { searchParams } = new URL(request.url);
        const url = searchParams.get("url");

        if (!url) {
            return NextResponse.json(
                { error: "Missing 'url' query parameter" },
                { status: 400 }
            );
        }

        // 2. Fetch metadata using our utility
        const metadata = await fetchVideoMetadata(url);

        // 3. Return clean response
        return NextResponse.json(metadata, { status: 200 });

    } catch (error) {
        // Handle specific errors
        const message = error instanceof Error ? error.message : "An unexpected error occurred";

        // Determine appropriate status code
        let status = 500;
        if (message.includes("Invalid YouTube URL")) {
            status = 400;
        } else if (message.includes("not found") || message.includes("private")) {
            status = 404;
        } else if (message.includes("cannot be embedded")) {
            status = 403;
        } else if (message.includes("API Key")) {
            status = 500;
        }

        return NextResponse.json({ error: message }, { status });
    }
}
