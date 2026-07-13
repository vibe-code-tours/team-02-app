interface SpotifyEmbedProps {
  url: string;
}

export default function SpotifyEmbed({ url }: SpotifyEmbedProps) {
  return (
    <section className="w-full max-w-3xl mx-auto animate-[fadeIn_0.4s_ease-out]" aria-label="Spotify playlist">
      <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-accent mb-3 font-mono">
        Your Playlist
      </h2>

      <div className="overflow-hidden rounded-xl border border-surface-elevated shadow-sm">
        <iframe
          src={url}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify playlist player"
          className="block border-0"
        />
      </div>
    </section>
  );
}
