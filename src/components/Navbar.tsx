import Link from "next/link";

const links = [
  { href: "/", label: "Browse" },
  { href: "/submit", label: "Submit" },
  { href: "/saved", label: "My List" },
  { href: "/about", label: "About" }
];

export default function Navbar() {
  return (
    <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-white">
          ChewTube
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <button className="rounded-full bg-chew-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-chew-500/30 transition hover:bg-chew-400">
          Sign in
        </button>
      </div>
    </header>
  );
}
