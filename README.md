# ChewTube

*Find something good to watch while you eat.*

## What is ChewTube?
ChewTube is a bite-sized video discovery app designed for meal-time viewing. It helps you quickly find something fun, chill, or interesting to watch while you eat.

## Screenshots
> Coming soon — we’ll add real product screenshots as the UI lands.

## MVP Features
### Browse Videos
- Homepage shows recent + trending videos.
- Filter by:
  - Duration: Quick (5–10 min) · Medium (15–25 min) · Long (30+ min)
  - Category: Sports · Gaming · Chill · Funny · Beauty · Learning · Food · Drama · Background · Random
- Infinite scroll or paginated grid.
- Each card shows: thumbnail, title, duration, category tags, upvote count.

### “Serve Me” Button
- One-tap random video based on selected filters.
- “Not this, next” to skip.
- Minimal UI — thumbnail big, play instantly.

### Watch Experience
- Embedded YouTube player (responsive, mobile-friendly).
- Show title, submitter, tags, upvotes.
- Actions: Upvote · Save · Skip to next · Share link.

### Submit a Video
- Paste YouTube URL.
- Auto-fetch: title, thumbnail, duration (via YouTube Data API).
- User selects:
  - Category (single or multi-select, max 3).
  - Duration auto-detected, user can override.
- Optional: short note ("perfect for lazy Sunday lunch").
- Submit → goes to pending queue (or auto-approve for MVP).

### User Accounts (simple)
- Sign in with Google (Supabase Auth).
- Profile shows:
  - Submitted videos.
  - Saved videos.
  - Total upvotes received.
- No account required to browse or watch.

### Upvote System
- One upvote per user per video.
- Upvote count visible on cards.
- Trending = most upvotes in last 7 days.

### Save / Favorites
- Logged-in users can save videos.
- “My List” page to revisit later.

## Pages
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Browse all, filters, serve me button |
| Watch | `/watch/[id]` | Single video player + details |
| Submit | `/submit` | Add new video (auth required) |
| Profile | `/u/[username]` | User's submissions + saves |
| My List | `/saved` | Personal saved videos |
| About | `/about` | What is ChewTube, open source link |

## Tech Stack (confirmed)
| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (Postgres) |
| Auth | Supabase Auth (Google OAuth) |
| ORM | Prisma |
| Video Metadata | YouTube Data API v3 |
| Hosting | Vercel |
| Repo | GitHub (public, AGPL-3.0) |

## Database Schema
```sql
-- Users (synced from Supabase Auth)
users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
)

-- Videos
videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  youtube_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  thumbnail_url TEXT,
  duration_seconds INT,
  duration_category TEXT CHECK (duration_category IN ('quick', 'medium', 'long')),
  categories TEXT[], -- ['sports', 'funny']
  note TEXT, -- optional submitter note
  submitted_by UUID REFERENCES users(id),
  upvote_count INT DEFAULT 0,
  status TEXT DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP DEFAULT NOW()
)

-- Upvotes
upvotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  video_id UUID REFERENCES videos(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, video_id)
)

-- Saves
saves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  video_id UUID REFERENCES videos(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, video_id)
)

-- Indexes
CREATE INDEX idx_videos_categories ON videos USING GIN(categories);
CREATE INDEX idx_videos_duration ON videos(duration_category);
CREATE INDEX idx_videos_upvotes ON videos(upvote_count DESC);
CREATE INDEX idx_videos_created ON videos(created_at DESC);
```

## Categories (final list)
| Category | Icon idea |
|----------|-----------|
| Sports | ⚽ |
| Gaming | 🎮 |
| Chill | 😌 |
| Funny | 😂 |
| Beauty | ✨ |
| Learning | 🧠 |
| Food | 🍜 |
| Drama | 🎬 |
| Background | 🎧 |
| Random | 🎲 |

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/videos` | List videos (with filters, pagination) |
| GET | `/api/videos/[id]` | Single video details |
| GET | `/api/videos/random` | Random video (with optional filters) |
| POST | `/api/videos` | Submit new video (auth required) |
| POST | `/api/videos/[id]/upvote` | Toggle upvote (auth required) |
| POST | `/api/videos/[id]/save` | Toggle save (auth required) |
| GET | `/api/youtube/metadata?url=` | Fetch YouTube video metadata |
| GET | `/api/users/[id]` | User profile + submissions |
| GET | `/api/users/me/saved` | Current user's saved videos |

## UI Components
- `<Navbar />` — logo, search (later), auth button.
- `<VideoCard />` — thumbnail, title, duration badge, category pills, upvote.
- `<VideoGrid />` — responsive grid of cards.
- `<FilterBar />` — duration toggle, category pills.
- `<ServeMeButton />` — big CTA, opens random video modal or page.
- `<VideoPlayer />` — YouTube embed, responsive.
- `<SubmitForm />` — URL input, auto-fill, tag selector.
- `<ProfileHeader />` — avatar, stats, tabs.
- `<AuthButton />` — sign in / avatar dropdown.

## Open Source Setup
```
chewtube/
├── README.md
├── LICENSE (AGPL-3.0)
├── CONTRIBUTING.md
├── .env.example
├── docker-compose.yml (local Supabase)
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/ (Next.js App Router)
│   ├── components/
│   ├── lib/ (supabase client, youtube api, utils)
│   └── styles/
└── public/
    └── og-image.png
```

## Local Setup
1. Clone the repo.
2. Install dependencies.
3. Copy the environment template and fill it in.
4. Start Supabase (optional for MVP).
5. Run the dev server.

```bash
git clone <your-fork-or-origin-url>
cd chewtube
npm install
cp .env.example .env.local
# optional: docker-compose up -d
npm run dev
```

## Environment Variables
Create `.env.local` with the following values:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Auth
NEXT_PUBLIC_SUPABASE_GOOGLE_CLIENT_ID=

# YouTube Data API
YOUTUBE_API_KEY=

# Optional app URLs
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Contributing
We welcome issues and PRs! Please read `CONTRIBUTING.md` for guidelines, code style expectations, and the review process.

## Roadmap
See the future features list below, and check GitHub issues for planned milestones.

## Future Features (post-MVP)
- Search videos.
- Follow users / curators.
- Collections / playlists.
- Browser extension to submit from YouTube.
- “Meal mode” — autoplay queue for your meal duration.
- Mobile PWA.
- Discord community integration.
- Weekly digest email ("top videos this week").
- Creator verification badges.
- Admin moderation dashboard.

## License
AGPL-3.0. See `LICENSE` for details.
