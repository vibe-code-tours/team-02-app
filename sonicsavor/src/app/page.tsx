"use client";

import { useState } from "react";
import MoodInput from "@/components/ui/MoodInput";
import MoodChips from "@/components/ui/MoodChips";
import LoadingState from "@/components/ui/LoadingState";
import RecommendationGrid from "@/components/ui/RecommendationGrid";
import SpotifyEmbed from "@/components/ui/SpotifyEmbed";
import GuestRegistrationForm from "@/components/guest/GuestRegistrationForm";
import CustomerFeedbackForm from "@/components/feedback/CustomerFeedbackForm";
import type { Recommendation, GuestRegistration } from "@/types";

// ── Page ───────────────────────────────────────────────────

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [spotifyUrl, setSpotifyUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleMoodSubmit = async (mood: string) => {
    setIsLoading(true);
    setErrorMsg(null);
    setRecommendation(null);
    setSpotifyUrl(null);

    try {
      // 1. Get meal recommendation from OpenAI
      const recRes = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood }),
      });

      if (!recRes.ok) {
        const err = await recRes.json();
        throw new Error(err.error || "Failed to get recommendation");
      }

      const rec: Recommendation = await recRes.json();
      setRecommendation(rec);

      // 2. Get Spotify playlist embed URL
      const spotRes = await fetch(`/api/spotify?q=${encodeURIComponent(rec.playlistQuery)}`);
      if (spotRes.ok) {
        const spotData = await spotRes.json();
        setSpotifyUrl(spotData.url);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestSubmit = (data: GuestRegistration) => {
    console.log("Guest registration:", data);
    alert(`Registration received for ${data.name} (${data.partySize} guests)`);
  };

  const handleFeedbackSubmit = (data: unknown) => {
    console.log("Feedback:", data);
    alert("Thank you for your feedback!");
  };

  return (
    <main className="flex flex-col flex-1 items-center justify-start min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4 sm:px-6 py-12 sm:py-16">
      {/* Hero */}
      <header className="text-center mb-6 sm:mb-10 max-w-xl">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          SonicSavor
        </h1>
        <p className="mt-3 text-base text-zinc-500 dark:text-zinc-400">
          Tell us your mood — we&apos;ll pair a 3-course meal with the perfect
          playlist.
        </p>
      </header>

      {/* Mood input */}
      <section className="w-full flex flex-col items-center gap-5">
        <MoodInput onSubmit={handleMoodSubmit} disabled={isLoading} />
        <MoodChips onSelect={handleMoodSubmit} disabled={isLoading} />
      </section>

      {/* Error message */}
      {errorMsg && (
        <div
          role="alert"
          className="mt-8 w-full max-w-xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300 animate-[fadeIn_0.2s_ease-out]"
        >
          {errorMsg}
        </div>
      )}

      {/* Loading skeleton */}
      {isLoading && (
        <div className="mt-10 sm:mt-12 w-full animate-[fadeIn_0.3s_ease-out]">
          <LoadingState />
        </div>
      )}

      {/* Results */}
      {!isLoading && recommendation && (
        <div
          className="mt-10 sm:mt-12 w-full flex flex-col items-center gap-8 sm:gap-10 animate-[fadeIn_0.4s_ease-out]"
          aria-live="polite"
        >
          <RecommendationGrid courses={recommendation.courses} />
          {spotifyUrl && <SpotifyEmbed url={spotifyUrl} />}
        </div>
      )}

      {/* ── Guest Registration (preview) ───────────────── */}
      <section className="mt-16 w-full animate-[fadeIn_0.4s_ease-out]">
        <div className="text-center mb-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Preview
          </span>
        </div>
        <GuestRegistrationForm onSubmit={handleGuestSubmit} />
      </section>

      {/* ── Customer Feedback (preview) ────────────────── */}
      <section className="mt-16 w-full animate-[fadeIn_0.4s_ease-out]">
        <div className="text-center mb-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Preview
          </span>
        </div>
        <CustomerFeedbackForm onSubmit={handleFeedbackSubmit} />
      </section>
    </main>
  );
}
