import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const duration = searchParams.get("duration");
        const category = searchParams.get("category");

        // Use RPC or raw query for weighted randomness
        // ORDER BY (freshness_score * random()) DESC

        // Constructing the query
        let query = supabase
            .from("videos")
            .select("*")
            .eq("status", "approved")
            .gt("freshness_score", 0);

        if (duration) {
            query = query.eq("duration_category", duration);
        }

        if (category) {
            query = query.contains("categories", [category]);
        }

        // Apply weighted randomness using postgrest-js logic or RPC
        // Since Supabase doesn't support random() directly in .order(),
        // we use a stored procedure search_random_video or a limit then random

        // For MVP, we'll fetch a larger set and random pick, 
        // OR use a stored procedure for efficiency.

        // Let's assume we want maximum efficiency - use RPC
        const { data, error } = await supabase.rpc('get_weighted_random_video', {
            p_duration: duration,
            p_category: category ? [category] : null
        });

        if (error) {
            console.error("RPC Error:", error);
            // Fallback to basic random if RPC fails or isn't set up yet
            const { data: fallbackData } = await query.limit(50);
            if (fallbackData && fallbackData.length > 0) {
                const randomVideo = fallbackData[Math.floor(Math.random() * fallbackData.length)];
                return NextResponse.json(randomVideo);
            }
            return NextResponse.json({ error: "No videos found" }, { status: 404 });
        }

        if (!data || data.length === 0) {
            return NextResponse.json({ error: "No videos found matching filters" }, { status: 404 });
        }

        return NextResponse.json(data[0]);

    } catch (error) {
        console.error("Serve error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
