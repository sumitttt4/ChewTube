import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
    try {
        // Query to get users and sum of upvotes for their submitted videos
        // Supabase doesn't easily support group by with sum directly through the JS client for joins
        // So we use an RPC or a raw query if possible. 
        // For MVP, we'll fetch all approved videos and group them in memory 
        // (Fine for small/medium datasets)

        const { data: videos, error } = await supabase
            .from("videos")
            .select("upvotes, submitted_by")
            .eq("status", "approved")
            .not("submitted_by", "is", null);

        if (error) throw error;

        // Fetch users separately for accuracy/resilience
        const userIds = Array.from(new Set(videos.map(v => v.submitted_by)));
        const { data: userData } = await supabase
            .from("users")
            .select("id, username, avatar_url")
            .in("id", userIds);

        const userMap: Record<string, any> = {};
        userData?.forEach(u => userMap[u.id] = u);

        const userStats: Record<string, any> = {};

        videos.forEach((v: any) => {
            const userId = v.submitted_by;
            const user = userMap[userId];
            if (!userStats[userId]) {
                userStats[userId] = {
                    id: userId,
                    username: user?.username || "Unknown Chef",
                    avatar_url: user?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
                    total_upvotes: 0,
                    submission_count: 0
                };
            }
            userStats[userId].total_upvotes += (v.upvotes || 0);
            userStats[userId].submission_count += 1;
        });

        const leaderboard = Object.values(userStats)
            .sort((a: any, b: any) => b.total_upvotes - a.total_upvotes)
            .slice(0, 10);

        return NextResponse.json(leaderboard);

    } catch (error: any) {
        console.error("Leaderboard error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
