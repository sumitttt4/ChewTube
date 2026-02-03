export type Video = {
  id: string;
  title: string;
  duration: string;
  durationCategory: "quick" | "medium" | "long";
  categories: string[];
  upvotes: number;
  thumbnail: string;
  youtubeId: string;
  submitter: string;
};

export const sampleVideos: Video[] = [
  {
    id: "1",
    title: "Street Food Tour in Tokyo",
    duration: "12:45",
    durationCategory: "medium",
    categories: ["Food", "Chill"],
    upvotes: 128,
    thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    submitter: "@noodles"
  },
  {
    id: "2",
    title: "Cozy Gaming Night: 20-min Chill Session",
    duration: "19:10",
    durationCategory: "medium",
    categories: ["Gaming", "Background"],
    upvotes: 92,
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    submitter: "@pixel"
  },
  {
    id: "3",
    title: "Quick Comedy Sketch Compilation",
    duration: "07:30",
    durationCategory: "quick",
    categories: ["Funny"],
    upvotes: 210,
    thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    submitter: "@laughs"
  },
  {
    id: "4",
    title: "Late Night Study Beats",
    duration: "42:05",
    durationCategory: "long",
    categories: ["Learning", "Background"],
    upvotes: 64,
    thumbnail: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1200&auto=format&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    submitter: "@focus"
  }
];

export const durationFilters = [
  { label: "Quick", value: "quick" },
  { label: "Medium", value: "medium" },
  { label: "Long", value: "long" }
] as const;

export const categories = [
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
