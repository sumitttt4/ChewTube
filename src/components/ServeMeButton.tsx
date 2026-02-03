import Link from "next/link";

export default function ServeMeButton() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-chew-500/40 bg-gradient-to-br from-chew-500/20 via-slate-900/80 to-slate-900 px-6 py-5">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-chew-200">Serve Me</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Randomly pick something tasty to watch.
        </h2>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/watch/random"
          className="rounded-full bg-chew-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-chew-500/40 transition hover:bg-chew-400"
        >
          Serve me a video
        </Link>
        <button className="rounded-full border border-white/20 px-5 py-2 text-sm text-slate-200 hover:border-white/40">
          Not this, next
        </button>
      </div>
    </div>
  );
}
