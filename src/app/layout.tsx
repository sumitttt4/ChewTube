import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://chewtube.com"),
  title: {
    default: "ChewTube",
    template: "%s | ChewTube"
  },
  description: "Find something good to watch while you eat.",
  openGraph: {
    title: "ChewTube",
    description: "Find something good to watch while you eat.",
    url: "/",
    siteName: "ChewTube",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "ChewTube"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "ChewTube",
    description: "Find something good to watch while you eat.",
    images: ["/og-image.svg"]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-6 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
