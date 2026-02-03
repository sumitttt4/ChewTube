import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "ChewTube",
  description: "Find something good to watch while you eat."
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
