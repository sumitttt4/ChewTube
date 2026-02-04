
import WatchExperience from "@/components/WatchExperience";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Watch | ChewTube",
    description: "Watch the best curated videos while you eat.",
};

export default function WatchPage({ params }: { params: { id: string } }) {
    return (
        <div className="py-4">
            <WatchExperience id={params.id} />
        </div>
    );
}
