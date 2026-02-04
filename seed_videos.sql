-- ChewTube: Perfect Market-Ready Seed Data
-- Updated with real YouTube IDs and realistic upvote numbers

TRUNCATE TABLE videos;

INSERT INTO videos (title, channel, youtube_id, thumbnail, categories, duration_category, upvotes, freshness_score, status) VALUES

-- FUNNY (Appetizers)
('Substitute Teacher - Key & Peele', 'Comedy Central', 'Dd7Fixvo6OA', 'https://i.ytimg.com/vi/Dd7Fixvo6OA/hqdefault.jpg', ARRAY['Funny'], 'quick', 12500, 100, 'approved'),
('10 Different Types of Food Eaters', 'Troom Troom', '3AOMHi4akpg', 'https://i.ytimg.com/vi/3AOMHi4akpg/hqdefault.jpg', ARRAY['Funny', 'Food'], 'quick', 450, 100, 'approved'),
('Winning the Lottery', 'Joel Haver', 'fXW96S8c_Yk', 'https://i.ytimg.com/vi/fXW96S8c_Yk/hqdefault.jpg', ARRAY['Funny'], 'quick', 1800, 100, 'approved'),
('The Front Fell Off', 'Clarke and Dawe', '3m5qxZm_JqM', 'https://i.ytimg.com/vi/3m5qxZm_JqM/hqdefault.jpg', ARRAY['Funny'], 'quick', 2400, 100, 'approved'),
('Ultimate Dog Tease', 'Talking Animals', 'nGeKSiCQkEU', 'https://i.ytimg.com/vi/nGeKSiCQkEU/hqdefault.jpg', ARRAY['Funny'], 'quick', 8200, 100, 'approved'),
('Eating Only One Colored Food For 24 Hours', 'Multi DO', 'Vl0P6_K1t24', 'https://i.ytimg.com/vi/Vl0P6_K1t24/hqdefault.jpg', ARRAY['Funny', 'Food'], 'medium', 320, 100, 'approved'),

-- LEARNING (Brain Food)
('history of the entire world, i guess', 'bill wurtz', 'xuCn8ux2gbs', 'https://i.ytimg.com/vi/xuCn8ux2gbs/hqdefault.jpg', ARRAY['Learning', 'Funny'], 'medium', 45000, 100, 'approved'),
('The Egg - A Short Story', 'Kurzgesagt', 'h6fcK_fRYaI', 'https://i.ytimg.com/vi/h6fcK_fRYaI/hqdefault.jpg', ARRAY['Learning', 'Chill'], 'quick', 12000, 100, 'approved'),
('Why Did GTA San Andreas Look That Way?', 'Jacob Geller', 'mpGfAIBMpKk', 'https://i.ytimg.com/vi/mpGfAIBMpKk/hqdefault.jpg', ARRAY['Learning', 'Gaming'], 'long', 2800, 100, 'approved'),
('Defunctland: The History of FastPass', 'Defunctland', '9yjZpBq1XBE', 'https://i.ytimg.com/vi/9yjZpBq1XBE/hqdefault.jpg', ARRAY['Learning', 'Drama'], 'long', 4200, 100, 'approved'),
('The Engoodening of No Mans Sky', 'Internet Historian', 'O5BJVO3PDeQ', 'https://i.ytimg.com/vi/O5BJVO3PDeQ/hqdefault.jpg', ARRAY['Learning', 'Gaming'], 'long', 8900, 100, 'approved'),
('How High Can We Build?', 'Vsauce', 'jX-fIK_9860', 'https://i.ytimg.com/vi/jX-fIK_9860/hqdefault.jpg', ARRAY['Learning'], 'medium', 6700, 100, 'approved'),

-- FOOD (Main Course)
('Gordon Ramsay''s Perfect Scrambled Eggs', 'Gordon Ramsay', 'PUP7U5vTMM0', 'https://i.ytimg.com/vi/PUP7U5vTMM0/hqdefault.jpg', ARRAY['Food'], 'quick', 5600, 100, 'approved'),
('Binging with Babish: Ratatouille', 'Babish', '37ZJp3pUu_Q', 'https://i.ytimg.com/vi/37ZJp3pUu_Q/hqdefault.jpg', ARRAY['Food'], 'medium', 4800, 100, 'approved'),
('Best Street Food in Tokyo', 'Mark Wiens', '2Tz8f_A6vG0', 'https://i.ytimg.com/vi/2Tz8f_A6vG0/hqdefault.jpg', ARRAY['Food'], 'long', 1400, 100, 'approved'),
('Hot Ones - Gordon Ramsay', 'First We Feast', 'U9DyHthJ6LA', 'https://i.ytimg.com/vi/U9DyHthJ6LA/hqdefault.jpg', ARRAY['Food', 'Funny'], 'medium', 8500, 100, 'approved'),
('I Ate 100 Chicken Nuggets', 'Matt Stonie', 'n78uC4iLdqE', 'https://i.ytimg.com/vi/n78uC4iLdqE/hqdefault.jpg', ARRAY['Food', 'Funny'], 'medium', 2300, 100, 'approved'),
('Perfect Steak Guide', 'J. Kenji López-Alt', 'uJcO1W_T8_4', 'https://i.ytimg.com/vi/uJcO1W_T8_4/hqdefault.jpg', ARRAY['Food'], 'medium', 2100, 100, 'approved'),

-- CHILL (Dessert)
('lofi hip hop radio - beats to relax/study to', 'Lofi Girl', 'jfKfPfyJRdk', 'https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg', ARRAY['Chill', 'Background'], 'long', 25000, 100, 'approved'),
('Camping in -40 Below Zero', 'Outdoor Boys', 'Y2aGwB27QqQ', 'https://i.ytimg.com/vi/Y2aGwB27QqQ/hqdefault.jpg', ARRAY['Chill', 'Learning'], 'long', 4200, 100, 'approved'),
('Tokyo Night Walk in the Rain', 'Rambalac', 'gTXpWfN67I8', 'https://i.ytimg.com/vi/gTXpWfN67I8/hqdefault.jpg', ARRAY['Chill', 'Background'], 'long', 1400, 100, 'approved'),
('Swiss Alps Meditation', 'Scenic Relaxation', '6m89vX_H9tA', 'https://i.ytimg.com/vi/6m89vX_H9tA/hqdefault.jpg', ARRAY['Chill', 'Background'], 'long', 2100, 100, 'approved'),

-- SITCOM CLIPS (Side Dishes)
('The Office - Dinner Party', 'The Office', 'EAG6rS_U_fM', 'https://i.ytimg.com/vi/EAG6rS_U_fM/hqdefault.jpg', ARRAY['Sitcom Clip', 'Funny'], 'medium', 15000, 100, 'approved'),
('Friends - PIVOT!', 'Friends', 'n67RYI_0sc0', 'https://i.ytimg.com/vi/n67RYI_0sc0/hqdefault.jpg', ARRAY['Sitcom Clip', 'Funny'], 'quick', 9200, 100, 'approved'),
('Seinfeld - The Marine Biologist', 'Seinfeld', 'r6_3hL5MAsM', 'https://i.ytimg.com/vi/r6_3hL5MAsM/hqdefault.jpg', ARRAY['Sitcom Clip', 'Funny'], 'quick', 7400, 100, 'approved'),
('Seinfeld - The Soup Nazi', 'Seinfeld', '7_T-2M88-I4', 'https://i.ytimg.com/vi/7_T-2M88-I4/hqdefault.jpg', ARRAY['Sitcom Clip', 'Food'], 'quick', 6500, 100, 'approved'),
('Parks and Rec - Ron Swanson Steak', 'Parks and Rec', 'Q3u6t6h2o0k', 'https://i.ytimg.com/vi/Q3u6t6h2o0k/hqdefault.jpg', ARRAY['Sitcom Clip', 'Food'], 'quick', 4500, 100, 'approved'),
('Brooklyn Nine-Nine - Backstreet Boys', 'B99', 'H6TfA9-P0-4', 'https://i.ytimg.com/vi/H6TfA9-P0-4/hqdefault.jpg', ARRAY['Sitcom Clip', 'Funny'], 'quick', 18000, 100, 'approved')

ON CONFLICT (youtube_id) DO UPDATE SET 
    upvotes = EXCLUDED.upvotes,
    status = 'approved',
    freshness_score = 100;
