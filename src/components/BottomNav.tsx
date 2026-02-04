"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, Bookmark, PlusSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Serve", href: "/serve", icon: Sparkles, highlight: true },
    { label: "Saved", href: "/saved", icon: Bookmark },
    { label: "Submit", href: "/submit", icon: PlusSquare },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 block md:hidden bg-background/95 backdrop-blur-lg border-t border-white/5 pb-safe">
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center flex-1 gap-1 transition-colors",
                                isActive ? "text-red-500" : "text-zinc-500 hover:text-zinc-300",
                                item.highlight && "relative"
                            )}
                        >
                            {item.highlight && (
                                <div className="absolute -top-1 h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                            )}
                            <Icon className={cn("h-6 w-6", isActive && "stroke-[2.5px]")} />
                            <span className="text-[10px] font-medium tracking-wide uppercase">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
