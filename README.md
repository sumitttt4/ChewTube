# ChewTube

*Find something good to watch while you eat.*

## What is ChewTube?
ChewTube is a community-driven platform to discover and share YouTube videos that are perfect for mealtime. Browse by duration and vibe, watch instantly, and contribute your own finds.

## Launch Strategy
| Phase | What happens |
|-------|--------------|
| Phase 1 | Seed 80–100 videos across all categories using the admin tool |
| Phase 2 | Soft launch with friends, gather feedback, fix bugs |
| Phase 3 | Public launch with open submissions and social promotion |

## User Types
| Type | Can do |
|------|--------|
| Visitor | Browse, watch, filter, use “Serve Me” |
| User | Submit videos, upvote, save to list |
| Admin | Seed videos, moderate submissions |

## Features
### Homepage / Browse
- Grid of video cards (thumbnail, title, duration badge, category pills, upvotes)
- Filter bar:
  - Duration: All · Quick (5–15 min) · Medium (15–30 min) · Long (30+ min)
  - Category: All · Sports · Gaming · Chill · Funny · Beauty · Learning · Food · Drama · Background · Random
- Sort by: Trending (most upvotes in 7 days) · Newest · All-time best
- Infinite scroll or “Load more”

### “Serve Me” Button
- Big CTA on homepage
- Applies current filters → serves one random video
- Watch modal or full page
- “Skip” button for another pick

### Watch Page
- `/watch/[id]`
- Responsive YouTube player
- Title, channel name, duration, categories, upvote count
- Actions: Upvote · Save · Share link · “Next random”
- Show submitter or “Staff Pick” badge for seeded content

### Submit Video
- `/submit` (login required)
- Paste YouTube URL
- Auto-fetch via oEmbed: title, thumbnail, channel name
- User selects duration and 1–3 categories
- Optional note (max 140 chars)
- Preview card before submitting
- Prevent duplicates by YouTube ID
- Auto-approved for MVP

### User Accounts
- Google sign-in (Supabase Auth)
- Profile page `/u/[username]` with avatar, stats, and tabs
- Edit profile (change username once, avatar from Google)

### My List (Saved)
- `/saved` (login required)
- Grid of saved videos
- Remove from list

### Upvote System
- One upvote per user per video
- Toggle on/off
- Count displayed on cards and watch page
- Trending = most upvotes in last 7 days

### Admin Seeding Tool
- `/admin/seed` (admin only)
- Same as submit, but faster and auto-approved
- Sets `is_seed = true`

## Pages
| Page | Route | Auth |
|------|-------|------|
| Home | `/` | Public |
| Watch | `/watch/[id]` | Public |
| Submit | `/submit` | User |
| Profile | `/u/[username]` | Public |
| My List | `/saved` | User |
| Admin Seed | `/admin/seed` | Admin |
| About | `/about` | Public |

## Tech Stack
| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (Postgres) |
| Auth | Supabase Auth (Google OAuth) |
| ORM | Prisma |
| Video Metadata | YouTube oEmbed |
| Video Embed | YouTube iframe |
| Hosting | Vercel |
| Repo | GitHub (AGPL-3.0) |

## YouTube Integration
### Fetching Metadata (oEmbed)
```
GET https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=VIDEO_ID&format=json
```
Returns `title`, `author_name`, and `thumbnail_url`. Duration is selected by the user.

### Embedding Video
```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID" allowfullscreen></iframe>
```

### URL Parsing
Support:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

## Database Schema
```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Videos
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  youtube_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  channel_name TEXT,
  duration_category TEXT NOT NULL CHECK (duration_category IN ('quick', 'medium', 'long')),
  categories TEXT[] NOT NULL,
  note TEXT,
  submitted_by UUID REFERENCES users(id),
  is_seed BOOLEAN DEFAULT FALSE,
  upvote_count INT DEFAULT 0,
  status TEXT DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Upvotes
CREATE TABLE upvotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, video_id)
);

-- Saves
CREATE TABLE saves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, video_id)
);

-- Indexes
CREATE INDEX idx_videos_categories ON videos USING GIN(categories);
CREATE INDEX idx_videos_duration ON videos(duration_category);
CREATE INDEX idx_videos_upvotes ON videos(upvote_count DESC);
CREATE INDEX idx_videos_created ON videos(created_at DESC);
CREATE INDEX idx_videos_status ON videos(status);
```

## Categories
| Category | Description |
|----------|-------------|
| Sports | Highlights, analysis, hype clips |
| Gaming | Reviews, gameplay, esports |
| Chill | Relaxing, vlogs, slow content |
| Funny | Comedy, sketches, standup |
| Beauty | Skincare, makeup, lifestyle |
| Learning | Explainers, docs, essays |
| Food | Cooking, mukbang, street food |
| Drama | Movie/TV breakdowns, recaps |
| Background | Lo-fi, ambience, no focus needed |
| Random | Weird, oddly satisfying, misc |

## API Routes
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/api/videos` | List videos (filters, sort, pagination) | Public |
| GET | `/api/videos/[id]` | Single video | Public |
| GET | `/api/videos/random` | Random video (with filters) | Public |
| POST | `/api/videos` | Submit video | User |
| POST | `/api/videos/[id]/upvote` | Toggle upvote | User |
| DELETE | `/api/videos/[id]/upvote` | Remove upvote | User |
| POST | `/api/videos/[id]/save` | Toggle save | User |
| DELETE | `/api/videos/[id]/save` | Remove save | User |
| GET | `/api/youtube/oembed?url=` | Fetch video metadata | Public |
| GET | `/api/users/[username]` | User profile | Public |
| GET | `/api/users/me` | Current user | User |
| GET | `/api/users/me/saved` | User's saved videos | User |
| POST | `/api/admin/seed` | Seed video | Admin |

## Repo Structure
```
chewtube/
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── .env.example
├── prisma/
│   └── schema.prisma
├── public/
│   ├── favicon.ico
│   └── og-image.png
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── watch/[id]/page.tsx
│   │   ├── submit/page.tsx
│   │   ├── saved/page.tsx
│   │   ├── u/[username]/page.tsx
│   │   ├── admin/seed/page.tsx
│   │   ├── about/page.tsx
│   │   └── api/
│   ├── components/
│   ├── lib/
│   └── styles/
└── package.json
```

## Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_USER_ID=
```

## Seeding Plan
| Category | Count | Duration mix |
|----------|-------|--------------|
| Sports | 10 | 3 quick, 4 medium, 3 long |
| Gaming | 10 | 3 quick, 4 medium, 3 long |
| Chill | 10 | 2 quick, 4 medium, 4 long |
| Funny | 10 | 5 quick, 3 medium, 2 long |
| Beauty | 8 | 2 quick, 4 medium, 2 long |
| Learning | 10 | 2 quick, 5 medium, 3 long |
| Food | 10 | 3 quick, 4 medium, 3 long |
| Drama | 8 | 2 quick, 3 medium, 3 long |
| Background | 8 | 0 quick, 2 medium, 6 long |
| Random | 6 | 2 quick, 2 medium, 2 long |
| Total | 90 | |

## Post-MVP Roadmap
| Version | Features |
|---------|----------|
| v1.1 | Search videos by title |
| v1.2 | Moderation queue |
| v1.3 | Follow users / curators |
| v2.0 | Collections / playlists |
| v2.1 | Browser extension |
| v2.2 | Meal mode autoplay |
| v3.0 | Mobile app |

## Open Source
- License: AGPL-3.0
- Public GitHub repo
- `.env.example` for local dev
- Contributing guidelines

## Contributing & Avoiding Merge Conflicts
When you pull this into another repo or work with multiple branches, keep your branch up to date with `main` to minimize conflicts.

```bash
git fetch origin
git merge origin/main
```

If conflicts do appear, resolve the files locally, then commit and push:

```bash
git add <resolved-files>
git commit -m "Resolve merge conflicts with main"
git push
```

## Summary
| Item | Decision |
|------|----------|
| Name | ChewTube |
| Stack | Next.js 14, TypeScript, Tailwind, Supabase, Prisma, Vercel |
| YouTube integration | oEmbed + iframe embed |
| Duration | User selects (Quick/Medium/Long) |
| Auth | Google OAuth via Supabase |
| Seeding | Admin tool, 90 videos before launch |
| User submissions | Enabled after seed, auto-approved initially |
| Open source | Yes, AGPL-3.0 |
