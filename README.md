# 🍽️ ChewTube

**Curated YouTube videos for your eating time.** Not another endless scroll — just the right content for your meal.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sumitttt4/ChewTube)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🎯 What is ChewTube?

ChewTube is a **community-curated video platform** designed specifically for eating time. Instead of falling into the YouTube rabbit hole, get videos that:

- ⏱️ **Match your meal duration** — Quick (5-15m), Medium (15-30m), or Long (30m+)
- 🎬 **Fit your vibe** — Sports, Sitcom, Movie Clips, Gaming, Food, Tech, and more
- 🍳 **Refresh daily** — Curated picks, not infinite scroll
- 👥 **Community-driven** — Real people submit and upvote the best content

---

## 🚀 Features

- **🧑‍🍳 Personalized Onboarding** — Pick your meal size and favorite categories
- **🎰 "Serve Me" Button** — Random video matching your preferences
- **📱 Mobile-First Design** — Works great on phone, tablet, and desktop
- **🏆 Leaderboard** — Top contributors get recognized
- **🔍 Smart Search** — Find videos by title or channel
- **💾 Save for Later** — Build your personal watchlist
- **🎯 Sub-Categories** — Dive deeper into Sports → Football, Gaming → Minecraft, etc.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Styling** | Tailwind CSS |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## 📦 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account (free tier works)
- YouTube Data API key

### 1. Clone & Install

```bash
git clone https://github.com/sumitttt4/ChewTube.git
cd ChewTube
npm install
```

### 2. Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
YOUTUBE_API_KEY=your_youtube_api_key
```

### 3. Database Setup

Run `supabase_schema.sql` in your Supabase SQL Editor to create tables.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/           # API routes (videos, submit, serve, leaderboard)
│   ├── watch/[id]/    # Video watch page
│   ├── submit/        # Submit new video
│   ├── saved/         # User's saved videos
│   └── page.tsx       # Homepage
├── components/
│   ├── FilterBar.tsx      # Duration + Category filters
│   ├── VideoCard.tsx      # Video thumbnail card
│   ├── VideoGrid.tsx      # Grid layout
│   ├── OnboardingModal.tsx # First-time user flow
│   ├── Leaderboard.tsx    # Top contributors
│   └── SubmitForm.tsx     # Video submission form
├── context/
│   └── PreferencesContext.tsx  # User preferences (duration, categories)
└── lib/
    ├── supabase.ts    # Supabase client
    └── youtube.ts     # YouTube API utilities
```

---

## 🤝 Contributing

We welcome contributions! Here's how:

### Good First Issues
- [ ] Add more sub-categories (e.g., Music → K-Pop, Hip-Hop, Classical)
- [ ] Implement daily video limit ("Kitchen Closed" feature)
- [ ] Add video reporting functionality
- [ ] Create browser extension for quick submission
- [ ] Add share to social media

### Submitting a PR
1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📋 Roadmap

- [x] Core video browsing
- [x] Category filtering with sub-categories
- [x] User onboarding flow
- [x] Video submission
- [x] Leaderboard
- [ ] Daily curation reset (freshness decay)
- [ ] User profiles with stats
- [ ] Collections/Playlists
- [ ] Browser extension
- [ ] Mobile app (React Native)

---

## 📜 License

MIT License — feel free to use this for your own projects!

---

## 💖 Support

If ChewTube helped you enjoy your meals better:

- ⭐ Star this repo
- 🐛 Report bugs via Issues
- 💡 Suggest features
- ☕ [Buy me a coffee](https://buymeacoffee.com/sumitsharmq)

---

**Made with 🍕 by [@sumitttt4](https://github.com/sumitttt4)**

*Eat well. Watch better.*
