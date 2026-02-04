"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import VideoGrid from "@/components/VideoGrid";
import { Loader2, ChefHat, Award, Video } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [user, setUser] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // In a real app, we'd fetch user by username
        // For MVP, if we don't have a user, we'll mock one
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("username", username)
          .single();

        if (userData) {
          setUser(userData);

          // Fetch videos by this user
          const { data: videoData } = await supabase
            .from("videos")
            .select("*")
            .eq("submitted_by", userData.id)
            .order("created_at", { ascending: false });

          if (videoData) {
            setVideos(videoData.map(v => ({
              id: v.id,
              youtubeId: v.youtube_id,
              title: v.title,
              channel: v.channel,
              thumbnail: v.thumbnail,
              duration: v.duration_category === 'quick' ? '5-15m' : v.duration_category === 'medium' ? '15-30m' : '30m+',
              categories: v.categories,
              upvotes: v.upvotes
            })));
          }
        } else {
          // Mock data if user not found (for demonstration)
          setUser({
            username: username,
            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
            role: 'user'
          });
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (username) fetchUserData();
  }, [username]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
        <p className="text-sm font-bold text-zinc-600 uppercase tracking-widest">Prepping Kitchen...</p>
      </div>
    );
  }

  const totalUpvotes = videos.reduce((acc, v) => acc + (v.upvotes || 0), 0);
  const chefLevel = totalUpvotes > 50 ? "Master Chef" : totalUpvotes > 10 ? "Sous Chef" : "Line Cook";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Profile Header */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-zinc-900/50 blur-3xl h-64 -z-10" />

        <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img
              src={user?.avatar_url}
              alt={user?.username}
              className="relative h-32 w-32 rounded-full border-4 border-zinc-950 bg-zinc-900 object-cover shadow-2xl"
            />
            <div className="absolute -bottom-2 -right-2 bg-red-600 p-2 rounded-full border-2 border-zinc-950">
              <ChefHat className="h-5 w-5 text-white" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2 uppercase">
              {user?.username}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-white/5 text-xs font-bold text-zinc-400 capitalize">
                <Award className="h-3.5 w-3.5 text-red-500" />
                {chefLevel}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-white/5 text-xs font-bold text-zinc-400">
                <Video className="h-3.5 w-3.5 text-red-500" />
                {videos.length} Submissions
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-zinc-900/50 backdrop-blur border border-white/5 p-4 rounded-2xl text-center min-w-[100px]">
              <p className="text-2xl font-black text-white">{totalUpvotes}</p>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Total Upvotes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Submissions Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h2 className="text-xl font-black text-white uppercase tracking-tight">The Chef's Gallery</h2>
        </div>

        {videos.length > 0 ? (
          <VideoGrid videos={videos} />
        ) : (
          <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-3xl">
            <Video className="h-12 w-12 text-zinc-800 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-zinc-400">No dishes served yet</h3>
            <p className="text-sm text-zinc-600 mt-1">This chef is still prepping their first course.</p>
          </div>
        )}
      </section>
    </div>
  );
}
