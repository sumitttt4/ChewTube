-- ChewTube: Supabase Database Schema
-- Run this in your Supabase SQL Editor FIRST before seeding data

-- Create the videos table
CREATE TABLE IF NOT EXISTS videos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  channel text NOT NULL,
  thumbnail text NOT NULL,
  youtube_id text NOT NULL UNIQUE,
  categories text[] NOT NULL,
  duration_category text NOT NULL,
  upvotes int DEFAULT 0,
  submitted_by text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Public videos are viewable by everyone" 
ON videos FOR SELECT 
USING (true);

CREATE POLICY "Anyone can upload a video" 
ON videos FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can upvote" 
ON videos FOR UPDATE 
USING (true);

-- Create an RPC function for incrementing upvotes atomically
CREATE OR REPLACE FUNCTION increment_upvotes(video_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE videos 
  SET upvotes = upvotes + 1 
  WHERE id = video_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
