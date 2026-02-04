import WatchExperience from "@/components/WatchExperience";
import { sampleVideos } from "@/lib/sample-data";
import type { Metadata } from "next";

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const video = sampleVideos.find((item) => item.id === params.id);
  const title = video ? video.title : "Watch";
  const description = video
    ? `Watch “${video.title}” and explore more meal-time picks on ChewTube.`
    : "Watch a curated video pick on ChewTube.";
  const image = video?.thumbnail ?? "/og-image.svg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/watch/${params.id}`,
      type: "video.other",
      images: [
        {
          url: image,
          alt: video?.title ?? "ChewTube video"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}

export default function WatchPage({ params }: { params: { id: string } }) {
  return <WatchExperience id={params.id} />;
}
