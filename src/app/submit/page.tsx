import EmptyState from "@/components/EmptyState";

export default function SubmitPage() {
  const hasDraft = true;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-white">Submit a video</h1>
        <p className="text-slate-300">
          Paste a YouTube link and tag it for fellow meal-time watchers.
        </p>
      </div>

      {hasDraft ? (
        <form className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-200">YouTube URL</span>
            <input
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500"
            />
            <span className="text-xs text-slate-500">
              We’ll fetch the title, channel, and thumbnail automatically.
            </span>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-200">Categories (max 3)</span>
            <input
              type="text"
              placeholder="Food, Chill"
              className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-200">Optional note</span>
            <textarea
              rows={3}
              placeholder="Perfect for a lazy Sunday lunch"
              className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500"
            />
          </label>

          <button className="rounded-full bg-chew-500 px-6 py-2 text-sm font-semibold text-white">
            Submit for review
          </button>
        </form>
      ) : (
        <EmptyState
          title="Add your first video"
          description="Paste a YouTube link and we’ll build a preview before you submit."
          actionLabel="Start a submission"
          actionHref="/submit"
        />
      )}
    </div>
  );
}
