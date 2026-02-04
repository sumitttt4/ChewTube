export type Video = {
  id: string;
  youtubeId: string;
  title: string;
  channel: string;
  duration: string;
  durationCategory: "quick" | "medium" | "long";
  categories: string[];
  upvotes: number;
  thumbnail: string;
};

export const sampleVideos: Video[] = [
  {
    id: "1",
    youtubeId: "BurFdfR_aU0",
    title: "Street Food Tour in Tokyo",
    channel: "Strictly Dumpling",
    duration: "14:12",
    durationCategory: "quick",
    categories: ["Food", "Travel"],
    upvotes: 1240,
    thumbnail: "https://img.youtube.com/vi/BurFdfR_aU0/maxresdefault.jpg"
  },
  {
    id: "2",
    youtubeId: "5qap5aO4i9A",
    title: "lofi hip hop radio - beats to relax/study to",
    channel: "Lofi Girl",
    duration: "Live",
    durationCategory: "long",
    categories: ["Background", "Music"],
    upvotes: 8520,
    thumbnail: "https://img.youtube.com/vi/5qap5aO4i9A/maxresdefault.jpg"
  },
  {
    id: "3",
    youtubeId: "XqZsoesa55w",
    title: "Baby Hippo Moo Deng is an Icon",
    channel: "Saturday Night Live",
    duration: "04:30",
    durationCategory: "quick",
    categories: ["Funny", "Comedy"],
    upvotes: 430,
    thumbnail: "https://img.youtube.com/vi/XqZsoesa55w/maxresdefault.jpg"
  },
  {
    id: "4",
    youtubeId: "L_LUpnjgPso",
    title: "Which Coding Language Should You Learn?",
    channel: "Fireship",
    duration: "12:05",
    durationCategory: "quick",
    categories: ["Learning", "Tech"],
    upvotes: 890,
    thumbnail: "https://img.youtube.com/vi/L_LUpnjgPso/maxresdefault.jpg"
  },
  {
    id: "5",
    youtubeId: "1La4QzGeaaQ",
    title: "Gordon Ramsay Cooked For A Week",
    channel: "Mythical Kitchen",
    duration: "24:10",
    durationCategory: "medium",
    categories: ["Food", "Funny"],
    upvotes: 2100,
    thumbnail: "https://img.youtube.com/vi/1La4QzGeaaQ/maxresdefault.jpg"
  }
];

export const durationFilters = [
  { label: "Quick (5-15m)", value: "quick" },
  { label: "Medium (15-30m)", value: "medium" },
  { label: "Long (30m+)", value: "long" }
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
