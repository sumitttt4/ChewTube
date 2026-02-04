# ChewTube

Find something good to watch while you eat.

## What is ChewTube?
ChewTube is a community-driven platform to discover and share YouTube videos that are perfect for mealtime. Browse by duration and vibe, watch instantly, and contribute your own finds.

## Contribution Guide

ChewTube is open source and community-curated. We welcome contributions from developers, designers, and content curators.

### For Content Curators (No Code)
You can help build the "Menu" without writing a single line of code:
1.  **Direct Submission**: Go to the `/submit` page on the live site and add your favorite highlight clips or videos.
2.  **Top Chefs**: Submissions that receive 10+ upvotes earn the contributor a spot on the "Top Chefs" list on the homepage.
3.  **Bulk Suggestions**: Add video details to `data/suggested_videos.json` and submit a Pull Request.

### For Developers

#### Getting Started
1. **Clone the Repository**
   ```bash
   git clone https://github.com/sumitttt4/ChewTube.git
   cd ChewTube
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory and add your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   YOUTUBE_API_KEY=your_youtube_data_api_v3_key
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Database Management
We use Supabase for our database. 
- Schema updates should be documented in the `supabase/` directory (or applicable migration path).
- The `supabase_janitor.sql` file contains essential functions for content decay and automated sorting.

#### Contribution Workflow
1. **Find an Issue**: Browse the issues tab or propose a new feature.
2. **Create a Branch**: 
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit Changes**: Use descriptive commit messages.
4. **Push and PR**: Push your branch and open a Pull Request against the `main` branch.

## Features

### Homepage / Browse
- Grid of video cards with duration badges and category labels.
- Sticky filter bar for quick duration and category sorting.
- Weighted randomness algorithm to prioritize fresh and popular content.

### Serve Me Button
- One-click random video delivery based on current filters.
- Uses a weighted probability score to ensure variety and quality.

### Watch Page
- Immersive YouTube player integration.
- Upvote and local save functionality.
- Direct sharing and "Next Random" navigation.

### Smart Submission
- Automatic metadata fetching via YouTube Data API.
- Duration parsing and categorization logic.
- Duplicate detection and embeddability validation.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (Postgres)
- **State Management**: React Context + LocalStorage
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Roadmap
- **v1.1**: Real-time search by title and channel.
- **v1.2**: Admin moderation queue and community reporting.
- **v1.3**: Authenticated user profiles and follow system.
- **v2.0**: User-curated collections and shared playlists.

## License
This project is licensed under the AGPL-3.0 License - see the LICENSE file for details.
