
import SubmitForm from "@/components/SubmitForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit | ChewTube",
  description: "Share your favorite meal-time videos.",
};

export default function SubmitPage() {
  return (
    <div className="py-10">
      <SubmitForm />
    </div>
  );
}
