import WatchExperience from "@/components/WatchExperience";

export default function WatchPage({ params }: { params: { id: string } }) {
  return <WatchExperience id={params.id} />;
}
