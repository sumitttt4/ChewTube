export type Video = {
  id: string;
  title: string;
  duration: string;
  durationCategory: "quick" | "medium" | "long";
  categories: string[];
  upvotes: number;

};

export const sampleVideos: Video[] = [
  {
    id: "1",
    title: "Street Food Tour in Tokyo",
    duration: "12:45",

  },
  {
    id: "2",
    title: "Cozy Gaming Night: 20-min Chill Session",
    duration: "19:10",
    durationCategory: "medium",
    categories: ["Gaming", "Background"],
    upvotes: 92,

  },
  {
    id: "3",
    title: "Quick Comedy Sketch Compilation",
    duration: "07:30",
    durationCategory: "quick",
    categories: ["Funny"],
    upvotes: 210,

  },
  {
    id: "4",
    title: "Late Night Study Beats",
    duration: "42:05",
    durationCategory: "long",
    categories: ["Learning", "Background"],
    upvotes: 64,

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
