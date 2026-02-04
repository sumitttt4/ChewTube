import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import { PreferencesProvider } from "@/context/PreferencesContext";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChewTube",
  description: "Find something good to watch while you eat.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(
        inter.className,
        "min-h-screen antialiased bg-background text-foreground pb-20 md:pb-0"
      )}>
        <PreferencesProvider>
          <Navbar />
          <main className="container px-4 py-6 md:py-8 lg:px-8">
            {children}
          </main>
          <BottomNav />
        </PreferencesProvider>
      </body>
    </html>
  );
}
