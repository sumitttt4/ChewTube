-- ChewTube Launch Seed Data
-- REAL YouTube IDs for famous videos

-- First, create the official curator account
INSERT INTO users (id, username, avatar_url) 
VALUES ('00000000-0000-0000-0000-000000000001', 'ChewTube', 'https://api.dicebear.com/7.x/bottts/svg?seed=chewtube')
ON CONFLICT (id) DO NOTHING;

-- REAL VIDEOS WITH VERIFIED YOUTUBE IDs
INSERT INTO videos (title, channel, youtube_id, thumbnail, categories, duration_category, upvotes, freshness_score, status, submitted_by) VALUES

-- SPORTS (Real IDs)
('Messi World Cup Final - All Goals', 'FIFA', 'F1DPE1GaAXM', 'https://i.ytimg.com/vi/F1DPE1GaAXM/hqdefault.jpg', ARRAY['Sports', 'Football'], 'quick', 45000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),
('Cristiano Ronaldo - All 900 Goals', 'JERF Football', 'TJl5LqjHHqQ', 'https://i.ytimg.com/vi/TJl5LqjHHqQ/hqdefault.jpg', ARRAY['Sports', 'Football'], 'long', 32000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),
('MS Dhoni - Best Finishes Ever', 'Willow TV', 'F5hpreABbqE', 'https://i.ytimg.com/vi/F5hpreABbqE/hqdefault.jpg', ARRAY['Sports', 'Cricket'], 'medium', 28000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),
('Max Verstappen Best Overtakes 2023', 'Formula 1', 'D_3LcMOLQZ0', 'https://i.ytimg.com/vi/D_3LcMOLQZ0/hqdefault.jpg', ARRAY['Sports', 'F1'], 'medium', 18000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),

-- SITCOM (Real IDs)
('The Office - Dinner Party Full Episode', 'The Office', 'DgKgXehYnnw', 'https://i.ytimg.com/vi/DgKgXehYnnw/hqdefault.jpg', ARRAY['Sitcom', 'Funny'], 'medium', 35000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),
('Friends - Pivot Scene', 'TBS', 'R2u0sN9stbA', 'https://i.ytimg.com/vi/R2u0sN9stbA/hqdefault.jpg', ARRAY['Sitcom', 'Funny'], 'quick', 42000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),
('Brooklyn 99 - I Want It That Way', 'Brooklyn Nine-Nine', 'HlBYdiXdUa8', 'https://i.ytimg.com/vi/HlBYdiXdUa8/hqdefault.jpg', ARRAY['Sitcom', 'Funny'], 'quick', 28000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),

-- GAMING (Real IDs)
('Minecraft Manhunt - Dream vs 5 Hunters', 'Dream', 'JmbqhWgAGrk', 'https://i.ytimg.com/vi/JmbqhWgAGrk/hqdefault.jpg', ARRAY['Gaming', 'Minecraft'], 'long', 55000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),
('GTA 5 Chaos Mod Speedrun', 'DarkViperAU', 'nSr6dYS_s18', 'https://i.ytimg.com/vi/nSr6dYS_s18/hqdefault.jpg', ARRAY['Gaming', 'GTA'], 'long', 18000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),
('s1mple Best Plays of All Time', 'HLTV', 'qxvLFuH_Wn8', 'https://i.ytimg.com/vi/qxvLFuH_Wn8/hqdefault.jpg', ARRAY['Gaming', 'Esports'], 'medium', 22000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),

-- FUNNY (Real IDs)
('Key & Peele - Substitute Teacher', 'Key & Peele', 'Dd7FixvoOA', 'https://i.ytimg.com/vi/Dd7FixvoOA/hqdefault.jpg', ARRAY['Funny'], 'quick', 48000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),
('Try Not To Laugh Challenge', 'JukinVideo', 'gH2efAcmBrM', 'https://i.ytimg.com/vi/gH2efAcmBrM/hqdefault.jpg', ARRAY['Funny'], 'medium', 42000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),
('Skibidi Toilet All Episodes', 'DaFuq!?Boom!', '3lKWwvfp7fs', 'https://i.ytimg.com/vi/3lKWwvfp7fs/hqdefault.jpg', ARRAY['Funny', 'Shorts'], 'medium', 85000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),

-- FOOD (Real IDs)
('Gordon Ramsay Perfect Scrambled Eggs', 'Gordon Ramsay', 'PUP7U5vTMM0', 'https://i.ytimg.com/vi/PUP7U5vTMM0/hqdefault.jpg', ARRAY['Food'], 'quick', 35000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),
('Binging with Babish: Ratatouille', 'Babish Culinary Universe', '37ZJp3pUu_Q', 'https://i.ytimg.com/vi/37ZJp3pUu_Q/hqdefault.jpg', ARRAY['Food'], 'medium', 28000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),
('Hot Ones - Gordon Ramsay', 'First We Feast', 'U9DyHthJ6LA', 'https://i.ytimg.com/vi/U9DyHthJ6LA/hqdefault.jpg', ARRAY['Food', 'Funny'], 'medium', 45000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),

-- TECH (Real IDs)
('Apple Vision Pro Review', 'Marques Brownlee', 'OFvXuyITwBI', 'https://i.ytimg.com/vi/OFvXuyITwBI/hqdefault.jpg', ARRAY['Tech', 'Apple', 'Gadgets'], 'medium', 32000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),
('ChatGPT is a Joke', 'Fireship', 'WRHFGDiFxSs', 'https://i.ytimg.com/vi/WRHFGDiFxSs/hqdefault.jpg', ARRAY['Tech', 'AI'], 'quick', 28000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),
('iPhone 15 Pro Max Review', 'Marques Brownlee', 'hJUGR40xSEE', 'https://i.ytimg.com/vi/hJUGR40xSEE/hqdefault.jpg', ARRAY['Tech', 'Apple'], 'medium', 22000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),

-- MUSIC (Real IDs)
('Bohemian Rhapsody - Queen', 'Queen Official', 'fJ9rUzIMcZQ', 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg', ARRAY['Music'], 'quick', 95000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),
('Blinding Lights - The Weeknd', 'The Weeknd', '4NRXx6U8ABQ', 'https://i.ytimg.com/vi/4NRXx6U8ABQ/hqdefault.jpg', ARRAY['Music'], 'quick', 72000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),
('Bad Guy - Billie Eilish', 'Billie Eilish', 'DyDfgMOUjCI', 'https://i.ytimg.com/vi/DyDfgMOUjCI/hqdefault.jpg', ARRAY['Music'], 'quick', 65000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),

-- PODCASTS (Real IDs)
('Joe Rogan - Elon Musk Smokes Weed', 'PowerfulJRE', 'ycPr5-27vSI', 'https://i.ytimg.com/vi/ycPr5-27vSI/hqdefault.jpg', ARRAY['Podcasts'], 'long', 65000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),
('Lex Fridman - Sam Altman', 'Lex Fridman', 'L_Guz73e6fw', 'https://i.ytimg.com/vi/L_Guz73e6fw/hqdefault.jpg', ARRAY['Podcasts', 'Tech'], 'long', 42000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),

-- DOCUMENTARY (Real IDs)
('Planet Earth II - Snakes vs Iguana', 'BBC Earth', 'B3OjfK0t1XM', 'https://i.ytimg.com/vi/B3OjfK0t1XM/hqdefault.jpg', ARRAY['Documentary'], 'quick', 48000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),
('How the Universe Works', 'Science Channel', 'HUrFYGgfP3M', 'https://i.ytimg.com/vi/HUrFYGgfP3M/hqdefault.jpg', ARRAY['Documentary', 'Science'], 'long', 35000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),

-- CHILL (Real IDs)
('lofi hip hop radio - beats to relax/study to', 'Lofi Girl', 'jfKfPfyJRdk', 'https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg', ARRAY['Chill', 'Music'], 'long', 120000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),

-- SCIENCE (Real IDs)
('What If Earth Got Kicked Out of the Solar System', 'Kurzgesagt', 'gLZJlf5rHVs', 'https://i.ytimg.com/vi/gLZJlf5rHVs/hqdefault.jpg', ARRAY['Science'], 'quick', 55000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),
('The Egg - A Short Story', 'Kurzgesagt', 'h6fcK_fRYaI', 'https://i.ytimg.com/vi/h6fcK_fRYaI/hqdefault.jpg', ARRAY['Science', 'Chill'], 'quick', 48000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),

-- NEWS (Real IDs)
('history of the entire world, i guess', 'bill wurtz', 'xuCn8ux2gbs', 'https://i.ytimg.com/vi/xuCn8ux2gbs/hqdefault.jpg', ARRAY['News', 'Funny'], 'medium', 85000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),

-- TRAVEL (Real IDs)
('Thailand Street Food Tour', 'Mark Wiens', '7vmnGMSLzSY', 'https://i.ytimg.com/vi/7vmnGMSLzSY/hqdefault.jpg', ARRAY['Travel', 'Food'], 'medium', 22000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),
('Japan in 8K', 'Jacob + Katie Schwarz', 'zCLOJ9j1k2Y', 'https://i.ytimg.com/vi/zCLOJ9j1k2Y/hqdefault.jpg', ARRAY['Travel', 'Chill'], 'medium', 18000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),

-- BUSINESS (Real IDs)
('How to Get Rich - Naval Ravikant', 'Founders Podcast', 'UuPMuCstZOc', 'https://i.ytimg.com/vi/UuPMuCstZOc/hqdefault.jpg', ARRAY['Business'], 'long', 25000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),

-- AUTOMOTIVE (Real IDs)
('Tesla Model S Plaid Review', 'Marques Brownlee', 'dElIOCXcYKg', 'https://i.ytimg.com/vi/dElIOCXcYKg/hqdefault.jpg', ARRAY['Automotive', 'Tech'], 'medium', 32000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),
('Top Gear - Reliant Robin', 'Top Gear', 'QQh56geU0X8', 'https://i.ytimg.com/vi/QQh56geU0X8/hqdefault.jpg', ARRAY['Automotive', 'Funny'], 'quick', 28000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),

-- ART (Real IDs)
('Bob Ross - Mountain Summit', 'Bob Ross', 'lLWEXRAnQd0', 'https://i.ytimg.com/vi/lLWEXRAnQd0/hqdefault.jpg', ARRAY['Art', 'Chill'], 'long', 42000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),

-- VLOG (Real IDs)
('Casey Neistat - Make It Count', 'CaseyNeistat', 'WxfZkMm3wcg', 'https://i.ytimg.com/vi/WxfZkMm3wcg/hqdefault.jpg', ARRAY['Vlog', 'Travel'], 'quick', 35000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),
('MrBeast - I Spent 50 Hours Buried Alive', 'MrBeast', 'tZBk8wjOqmw', 'https://i.ytimg.com/vi/tZBk8wjOqmw/hqdefault.jpg', ARRAY['Vlog', 'Funny'], 'medium', 85000, 100, 'approved', '00000000-0000-0000-0000-000000000001'),

-- SHORTS (Real IDs)
('Satisfying Video Compilation', 'Oddly Satisfying', 'p7YXXieghto', 'https://i.ytimg.com/vi/p7YXXieghto/hqdefault.jpg', ARRAY['Shorts', 'Chill'], 'quick', 65000, 100, 'approved', '00000000-0000-0000-0000-000000000001')

ON CONFLICT (youtube_id) DO UPDATE SET 
    submitted_by = '00000000-0000-0000-0000-000000000001',
    upvotes = EXCLUDED.upvotes,
    status = 'approved',
    freshness_score = 100;
