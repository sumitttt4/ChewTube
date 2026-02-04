-- 1. Update videos table with new columns
ALTER TABLE videos 
ADD COLUMN IF NOT EXISTS freshness_score INTEGER DEFAULT 100,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'approved';

-- 2. Create the "Janitor" function for daily decay
CREATE OR REPLACE FUNCTION decay_freshness()
RETURNS void AS $$
BEGIN
    -- Daily decay
    UPDATE videos 
    SET freshness_score = freshness_score - 2
    WHERE status = 'approved';

    -- Auto-trash bad content
    UPDATE videos 
    SET status = 'archived' 
    WHERE freshness_score < -50 
    AND status != 'archived';
END;
$$ LANGUAGE plpgsql;

-- 4. Weighted Random Video Selector (for Serve Me)
CREATE OR REPLACE FUNCTION get_weighted_random_video(p_duration TEXT DEFAULT NULL, p_category TEXT[] DEFAULT NULL)
RETURNS SETOF videos AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM videos
    WHERE status = 'approved'
    AND freshness_score > 0
    AND (p_duration IS NULL OR duration_category = p_duration)
    AND (p_category IS NULL OR categories @> p_category)
    ORDER BY (freshness_score * random()) DESC
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- 5. Instruction for Cron (Supabase pg_cron)
-- Run this to schedule the janitor daily at midnight:
-- SELECT cron.schedule('janitor-job', '0 0 * * *', 'SELECT decay_freshness()');
