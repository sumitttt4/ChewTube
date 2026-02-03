export type Video = {
  id: string;
  title: string;
  duration: string;
  durationCategory: "quick" | "medium" | "long";
  categories: string[];
  upvotes: number;
  allTimeScore: number;
  durationMinutes: number;
  thumbnail: string;
  youtubeId: string;
  submitter: string;
  createdAt: string;
};

export const sampleVideos: Video[] = [
  {
    id: "1",
    title: "Street Food Tour in Tokyo",
    duration: "12:45",
    durationCategory: "quick",
    categories: ["Food", "Chill"],
    upvotes: 128,
    allTimeScore: 442,
    durationMinutes: 13,
    thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    submitter: "@noodles",
    createdAt: "2024-09-02T10:30:00Z"
  },
  {
    id: "2",
    title: "Cozy Gaming Night: 20-min Chill Session",
    duration: "19:10",
    durationCategory: "medium",
    categories: ["Gaming", "Background"],
    upvotes: 92,
    allTimeScore: 310,
    durationMinutes: 19,
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    submitter: "@pixel",
    createdAt: "2024-08-18T14:10:00Z"
  },
  {
    id: "3",
    title: "Quick Comedy Sketch Compilation",
    duration: "07:30",
    durationCategory: "quick",
    categories: ["Funny"],
    upvotes: 210,
    allTimeScore: 610,
    durationMinutes: 8,
    thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    submitter: "@laughs",
    createdAt: "2024-09-10T08:45:00Z"
  },
  {
    id: "4",
    title: "Late Night Study Beats",
    duration: "42:05",
    durationCategory: "long",
    categories: ["Learning", "Background"],
    upvotes: 64,
    allTimeScore: 287,
    durationMinutes: 42,
    thumbnail: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1200&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    submitter: "@focus",
    createdAt: "2024-07-21T20:15:00Z"
  }
];

export const durationFilters = [
  { label: "All", value: "all" },
  { label: "Quick", value: "quick" },
  { label: "Medium", value: "medium" },
  { label: "Long", value: "long" }
] as const;

export const categories = [
  "All",
  "Sports",
  "Gaming",
  "Chill",
  "Funny",
  "Beauty",
  "Learning",
  "Food",
  "Drama",
  "Background",
  "Random"
] as const;
