
      <div className="relative h-44 w-full">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover"
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
          {video.duration}
        </span>

      </div>
      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-base font-semibold text-white">{video.title}</h3>
          <p className="text-xs text-slate-400">Submitted by {video.submitter}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {video.categories.map((category) => (
            <span
              key={category}
              className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200"
            >
              {category}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-slate-300">
          <span className="uppercase tracking-wide">{video.durationCategory}</span>
          <span>▲ {video.upvotes}</span>
        </div>
      </div>
    </article>
  );
}
