import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get("q");
        const category = searchParams.get("category");
        const duration = searchParams.get("duration");
        const sort = searchParams.get("sort") || "newest";
        const limit = parseInt(searchParams.get("limit") || "20");

        let query = supabase
            .from("videos")
            .select("*")
            .eq("status", "approved");

        if (search) {
            // Search in title and channel using ilike
            query = query.or(`title.ilike.%${search}%,channel.ilike.%${search}%`);
        }

        if (category && category !== "all") {
            query = query.contains("categories", [category]);
        }

        if (duration && duration !== "all") {
            query = query.eq("duration_category", duration);
        }

        // Sorting Logic
        if (sort === "trending") {
            // For now, simplicity: sort by upvotes
            // In a real app, we might use a time-weighted score or a specific trending_score column
            query = query.order("upvotes", { ascending: false });
        } else if (sort === "newest") {
            query = query.order("created_at", { ascending: false });
        } else if (sort === "oldest") {
            query = query.order("created_at", { ascending: true });
        }

        const { data, error } = await query.limit(limit);

        if (error) {
            console.error("Fetch videos error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
