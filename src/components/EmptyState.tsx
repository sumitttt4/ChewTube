"use client";

import Link from "next/link";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
};

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/40 p-8 text-center">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
      <Link
        href={actionHref}
        className="mt-5 inline-flex items-center justify-center rounded-full bg-chew-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-chew-500/30 transition hover:bg-chew-400"
      >
        {actionLabel}
      </Link>
    </div>
  );
}
