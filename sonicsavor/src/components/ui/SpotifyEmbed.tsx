interface SpotifyEmbedProps {
  url: string;
}

export default function SpotifyEmbed({ url }: SpotifyEmbedProps) {
  return (
    <section className="w-full max-w-3xl mx-auto animate-[fadeIn_0.4s_ease-out]" aria-label="Spotify playlist">
      <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-stone-400 mb-3">
        Your Playlist
      </h2>

      <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-stone-800 shadow-sm">
        <iframe
          src={url}
          width="100%"
          className="block border-0 w-full h-[152px] sm:h-[352px]"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify playlist player"
        />
      </div>
    </section>
  );
}
