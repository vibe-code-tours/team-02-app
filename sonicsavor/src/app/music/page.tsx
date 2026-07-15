"use client";

import { useState } from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import Footer from "@/components/layout/Footer";
import MoodInput from "@/components/ui/MoodInput";
import SpotifyEmbed from "@/components/ui/SpotifyEmbed";

type ViewMode = "input" | "loading" | "results";

export default function MusicPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("input");
  const [mood, setMood] = useState("");
  const [playlistQuery, setPlaylistQuery] = useState("");
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (submittedMood: string) => {
    setMood(submittedMood);
    setViewMode("loading");
    setError(null);

    try {
      // Get playlist query from recommend API
      const recommendRes = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: submittedMood }),
      });

      if (!recommendRes.ok) {
        throw new Error("Failed to get playlist");
      }

      const recommendData = await recommendRes.json();
      const query = recommendData.playlistQuery || "";
      setPlaylistQuery(query);

      // Get Spotify embed URL
      const spotifyRes = await fetch(`/api/spotify?q=${encodeURIComponent(query)}`);
      if (spotifyRes.ok) {
        const spotifyData = await spotifyRes.json();
        setSpotifyUrl(spotifyData.url || "");
      }

      setViewMode("results");
    } catch {
      setError("Failed to get playlist. Please try again.");
      setViewMode("input");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0E17]">
      <PublicHeader />

      <main className="max-w-4xl mx-auto px-4 pt-24 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#F5F3F0] mb-2">Music for Your Mood</h1>
          <p className="text-[#A7A4B8]">Find the perfect playlist for your dining experience</p>
        </div>

        {/* Input View */}
        {viewMode === "input" && (
          <div className="animate-[fadeIn_0.3s_ease-out]">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-[#1DB954]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-[#1DB954]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#F5F3F0] mb-2">What&apos;s the vibe?</h2>
              <p className="text-[#A7A4B8]">Tell us your mood and we&apos;ll find the perfect playlist</p>
            </div>

            <MoodInput onSubmit={handleSubmit} />

            {error && (
              <p className="text-[#E63946] text-sm text-center mt-4">{error}</p>
            )}

            {/* Mood Chips */}
            <div className="mt-8">
              <p className="text-sm text-[#A7A4B8] text-center mb-4">Or pick a vibe:</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {[
                  { label: "Chill Jazz", color: "bg-blue-500/20 hover:bg-blue-500 text-blue-400" },
                  { label: "Upbeat Pop", color: "bg-pink-500/20 hover:bg-pink-500 text-pink-400" },
                  { label: "Romantic", color: "bg-red-500/20 hover:bg-red-500 text-red-400" },
                  { label: "Cozy Acoustic", color: "bg-amber-500/20 hover:bg-amber-500 text-amber-400" },
                  { label: "Energetic", color: "bg-orange-500/20 hover:bg-orange-500 text-orange-400" },
                  { label: "Nostalgic", color: "bg-purple-500/20 hover:bg-purple-500 text-purple-400" },
                ].map((quickMood) => (
                  <button
                    key={quickMood.label}
                    onClick={() => handleSubmit(quickMood.label)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 ${quickMood.color}`}
                  >
                    {quickMood.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loading View */}
        {viewMode === "loading" && (
          <div className="animate-[fadeIn_0.3s_ease-out] bg-[#1A1926] rounded-2xl p-12 border border-[#242334] text-center" role="status" aria-live="polite">
            <div className="flex justify-center gap-2 mb-6">
              <div className="w-4 h-4 bg-[#1DB954] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-4 h-4 bg-[#1DB954] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-4 h-4 bg-[#1DB954] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
            <p className="text-[#F5F3F0] font-medium mb-2">Finding the perfect playlist...</p>
            <p className="text-[#A7A4B8] text-sm">&quot;{mood}&quot;</p>
          </div>
        )}

        {/* Results View */}
        {viewMode === "results" && (
          <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
            {/* Mood header */}
            <div className="bg-[#1A1926] rounded-2xl p-6 border border-[#242334]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A7A4B8]">Your mood</p>
                  <p className="text-lg font-semibold text-[#F5F3F0]">&quot;{mood}&quot;</p>
                </div>
                <button
                  onClick={() => setViewMode("input")}
                  className="px-4 py-2 border border-[#242334] hover:border-[#1DB954] text-[#A7A4B8] hover:text-[#F5F3F0] rounded-lg text-sm transition-all"
                >
                  Change Mood
                </button>
              </div>
            </div>

            {/* Spotify Embed */}
            {spotifyUrl && <SpotifyEmbed url={spotifyUrl} />}

            {/* Fallback if no Spotify URL */}
            {!spotifyUrl && (
              <div className="bg-[#1A1926] rounded-2xl p-8 border border-[#242334] text-center">
                <p className="text-[#A7A4B8] mb-4">Search for this on Spotify:</p>
                <div className="bg-[#0F0E17] rounded-xl p-4 mb-6">
                  <p className="text-lg font-semibold text-[#1DB954]">&quot;{playlistQuery}&quot;</p>
                </div>
                <a
                  href={`https://open.spotify.com/search/${encodeURIComponent(playlistQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1DB954] hover:bg-[#1DB954]/80 text-[#0F0E17] font-semibold rounded-xl transition-all"
                >
                  Open on Spotify
                </a>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
