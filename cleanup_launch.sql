-- Clean slate for launch
-- Delete all seeded videos (keep the structure clean)

DELETE FROM videos;

-- Reset the ChewTube curator if it exists
DELETE FROM users WHERE id = '00000000-0000-0000-0000-000000000001';
