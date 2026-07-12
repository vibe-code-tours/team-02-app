"use client";

import { useState } from "react";
import MoodInput from "@/components/ui/MoodInput";
import MoodChips from "@/components/ui/MoodChips";
import LoadingState from "@/components/ui/LoadingState";
import RecommendationGrid from "@/components/ui/RecommendationGrid";
import SpotifyEmbed from "@/components/ui/SpotifyEmbed";
import GuestRegistrationForm from "@/components/guest/GuestRegistrationForm";
import CustomerFeedbackForm from "@/components/feedback/CustomerFeedbackForm";
import type { Recommendation, GuestRegistration, CourseRecommendation } from "@/types";

// ── Mock data ──────────────────────────────────────────────

const MOCK_COURSES: CourseRecommendation[] = [
  {
    course: "starter",
    dishName: "Mohinga",
    cuisine: "Myanmar",
    moodTags: ["comforting", "nostalgic", "warming"],
    description:
      "The warm, aromatic fish broth is the ultimate comfort — like a gentle embrace for your tired soul.",
    icon: "🍜",
  },
  {
    course: "main",
    dishName: "Mushroom Risotto",
    cuisine: "Western",
    moodTags: ["comforting", "elegant", "calming"],
    description:
      "Creamy, earthy, and meditative. The slow rhythm of risotto mirrors the slowing down you need right now.",
    icon: "🍄",
  },
  {
    course: "dessert",
    dishName: "Apple Crumble",
    cuisine: "Western",
    moodTags: ["nostalgic", "warm", "homey"],
    description:
      "Warm cinnamon apples and crunchy crumble — like a blanket and a fireplace in dessert form.",
    icon: "🍎",
  },
];

const MOCK_SPOTIFY_URL =
  "https://open.spotify.com/embed/playlist/37i9dQZF1DWXRqgorJj26U?utm_source=generator";

// ── Page ───────────────────────────────────────────────────

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>({
    courses: MOCK_COURSES,
    playlistQuery: "acoustic chill cozy evening playlist",
  });
  const [spotifyUrl, setSpotifyUrl] = useState<string | null>(MOCK_SPOTIFY_URL);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Mock submit — just toggles loading briefly then shows mock data
  const handleMoodSubmit = async (mood: string) => {
    setIsLoading(true);
    setErrorMsg(null);
    // Simulate a short load
    await new Promise((r) => setTimeout(r, 1500));
    setRecommendation({ courses: MOCK_COURSES, playlistQuery: mood });
    setSpotifyUrl(MOCK_SPOTIFY_URL);
    setIsLoading(false);
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
