import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about ChewTube and the open-source community behind it.",
  openGraph: {
    title: "About",
    description: "Learn about ChewTube and the open-source community behind it.",
    url: "/about"
  }
};

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-white">About ChewTube</h1>
        <p className="text-slate-300">
          ChewTube is a playful video discovery app that helps you find the perfect
          watch while you eat. It’s curated, mood-based, and made for short attention
          spans and delicious meals.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h2 className="text-xl font-semibold text-white">Open source</h2>
        <p className="mt-2 text-slate-300">
          This project is open source and welcoming to contributors. Check out the
          repository, suggest features, or ship a PR.
        </p>
        <Link href="https://github.com" className="mt-4 inline-flex text-chew-200">
          Visit GitHub →
        </Link>
      </div>
    </div>
  );
}
