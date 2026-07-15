"use client";

import { useState } from "react";
import HeroSection from "@/components/landing/HeroSection";
import EmailInput from "@/components/landing/EmailInput";
import AccessCodeEntry from "@/components/landing/AccessCodeEntry";

type ViewMode = "email" | "otp";

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>("email");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSubmit = async (submittedEmail: string) => {
    setEmail(submittedEmail);
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: submittedEmail }),
      });

      if (!res.ok) {
        throw new Error("Failed to send OTP");
      }

      setViewMode("otp");
    } catch {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (code: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid code. Please try again.");
        return;
      }

      alert(`Code verified! Welcome to SonicSavor.`);
    } catch {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setViewMode("email");
    setError(null);
  };

  return (
    <main className="min-h-screen bg-[#0F0E17]">
      <HeroSection>
        {viewMode === "email" ? (
          <div className="space-y-6">
            <EmailInput
              onSubmit={handleEmailSubmit}
              disabled={isLoading}
              isLoading={isLoading}
            />

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-[#242334]" />
              <span className="text-sm text-[#A7A4B8]">or</span>
              <div className="flex-1 h-px bg-[#242334]" />
            </div>

            <p className="text-sm text-[#A7A4B8] text-center">
              Returning? Just enter your email above — we&apos;ll recognize you.
            </p>

            {error && (
              <div className="text-center text-[#E63946] text-sm" role="alert">
                {error}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <button
              onClick={handleBackToEmail}
              disabled={isLoading}
              className="text-[#A7A4B8] hover:text-[#F5F3F0] transition-colors duration-200 text-sm flex items-center gap-2 mx-auto cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              Back to email
            </button>

            <p className="text-sm text-[#A7A4B8] text-center">
              Code sent to <span className="text-[#F5F3F0]">{email}</span>
            </p>

            <AccessCodeEntry
              onSubmit={handleOtpSubmit}
              disabled={isLoading}
              isLoading={isLoading}
              error={error}
            />
          </div>
        )}
      </HeroSection>

      {/* Features Section - Visible to all guests */}
      <section className="py-16 px-4 bg-[#1A1926]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#F5F3F0] text-center mb-12">
            Why SonicSavor?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#0F0E17] rounded-2xl flex items-center justify-center border border-[#242334]">
                <svg className="w-8 h-8 text-[#9D4EDD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#F5F3F0]">AI-Powered Matching</h3>
              <p className="text-[#A7A4B8] text-sm">
                Our AI understands your mood and recommends dishes that perfectly match how you're feeling.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#0F0E17] rounded-2xl flex items-center justify-center border border-[#242334]">
                <svg className="w-8 h-8 text-[#E85D04]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#F5F3F0]">Curated Playlists</h3>
              <p className="text-[#A7A4B8] text-sm">
                Every meal comes with a Spotify playlist that sets the perfect ambiance for your dining experience.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#0F0E17] rounded-2xl flex items-center justify-center border border-[#242334]">
                <svg className="w-8 h-8 text-[#2EC4B6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#F5F3F0]">3-Course Experience</h3>
              <p className="text-[#A7A4B8] text-sm">
                Get a complete starter, main, and dessert recommendation — all tailored to your current mood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-[#0F0E17]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#F5F3F0] text-center mb-4">
            How It Works
          </h2>
          <p className="text-[#A7A4B8] text-center mb-12 max-w-2xl mx-auto">
            Getting your perfect meal + playlist combo takes just 3 simple steps
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-[#1A1926] rounded-xl p-6 border border-[#242334] h-full">
                <div className="w-10 h-10 bg-[#9D4EDD]/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#9D4EDD] font-bold">1</span>
                </div>
                <h3 className="text-[#F5F3F0] font-semibold mb-2">Sign In</h3>
                <p className="text-[#A7A4B8] text-sm">
                  Enter your email and verify with the access code we send you.
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-[#242334]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-[#1A1926] rounded-xl p-6 border border-[#242334] h-full">
                <div className="w-10 h-10 bg-[#E85D04]/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#E85D04] font-bold">2</span>
                </div>
                <h3 className="text-[#F5F3F0] font-semibold mb-2">Tell Your Mood</h3>
                <p className="text-[#A7A4B8] text-sm">
                  Type how you're feeling or pick from our mood chips like "Cozy" or "Energetic".
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-[#242334]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-[#1A1926] rounded-xl p-6 border border-[#242334] h-full">
                <div className="w-10 h-10 bg-[#2EC4B6]/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#2EC4B6] font-bold">3</span>
                </div>
                <h3 className="text-[#F5F3F0] font-semibold mb-2">Get Recommendations</h3>
                <p className="text-[#A7A4B8] text-sm">
                  Our AI matches your mood with the perfect starter, main, and dessert.
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-[#242334]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>

            {/* Step 4 */}
            <div>
              <div className="bg-[#1A1926] rounded-xl p-6 border border-[#242334] h-full">
                <div className="w-10 h-10 bg-[#FFB703]/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#FFB703] font-bold">4</span>
                </div>
                <h3 className="text-[#F5F3F0] font-semibold mb-2">Enjoy the Vibe</h3>
                <p className="text-[#A7A4B8] text-sm">
                  Listen to your mood-matched Spotify playlist while you savor your meal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Preview Section */}
      <section className="py-16 px-4 bg-[#1A1926]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#F5F3F0] text-center mb-4">
            See What You'll Get
          </h2>
          <p className="text-[#A7A4B8] text-center mb-8 max-w-2xl mx-auto">
            Here's a preview of what SonicSavor recommends for a "cozy evening" mood
          </p>

          {/* Sample Recommendation Card */}
          <div className="bg-[#0F0E17] rounded-2xl p-6 border border-[#242334] max-w-2xl mx-auto">
            {/* Mood Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#9D4EDD]/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[#9D4EDD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
              </div>
              <div>
                <p className="text-[#A7A4B8] text-sm">Your mood</p>
                <p className="text-[#F5F3F0] font-semibold">Cozy & Comforting</p>
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Starter */}
              <div className="bg-[#1A1926] rounded-xl p-4 border border-[#242334]">
                <p className="text-[#A7A4B8] text-xs uppercase tracking-wide mb-2">Starter</p>
                <p className="text-[#F5F3F0] font-medium text-sm mb-1">French Onion Soup</p>
                <p className="text-[#A7A4B8] text-xs mb-2">European</p>
                <div className="flex items-center gap-1">
                  <span className="text-[#FFB703] text-xs">★★★★★</span>
                  <span className="text-[#A7A4B8] text-xs">9/10</span>
                </div>
              </div>

              {/* Main */}
              <div className="bg-[#1A1926] rounded-xl p-4 border border-[#E85D04]/30">
                <p className="text-[#A7A4B8] text-xs uppercase tracking-wide mb-2">Main</p>
                <p className="text-[#F5F3F0] font-medium text-sm mb-1">Mushroom Risotto</p>
                <p className="text-[#A7A4B8] text-xs mb-2">Western</p>
                <div className="flex items-center gap-1">
                  <span className="text-[#FFB703] text-xs">★★★★★</span>
                  <span className="text-[#A7A4B8] text-xs">8/10</span>
                </div>
              </div>

              {/* Dessert */}
              <div className="bg-[#1A1926] rounded-xl p-4 border border-[#242334]">
                <p className="text-[#A7A4B8] text-xs uppercase tracking-wide mb-2">Dessert</p>
                <p className="text-[#F5F3F0] font-medium text-sm mb-1">Crème Brûlée</p>
                <p className="text-[#A7A4B8] text-xs mb-2">European</p>
                <div className="flex items-center gap-1">
                  <span className="text-[#FFB703] text-xs">★★★★★</span>
                  <span className="text-[#A7A4B8] text-xs">9/10</span>
                </div>
              </div>
            </div>

            {/* AI Summary */}
            <div className="bg-[#1A1926] rounded-xl p-4 border border-[#242334] mb-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#E85D04]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#E85D04]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[#F5F3F0] text-sm font-medium mb-1">Why this meal?</p>
                  <p className="text-[#A7A4B8] text-sm">
                    "You need warmth, familiarity, and gentle nourishment. This meal starts with France's coziest soup, moves to a meditative risotto, and ends with the creamy elegance of crème brûlée."
                  </p>
                </div>
              </div>
            </div>

            {/* Spotify Preview */}
            <div className="bg-[#1A1926] rounded-xl p-4 border border-[#242334] flex items-center gap-4">
              <div className="w-12 h-12 bg-[#2EC4B6]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#2EC4B6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[#F5F3F0] text-sm font-medium">Your Playlist</p>
                <p className="text-[#A7A4B8] text-xs">Acoustic Chill • Cozy Evening • 2h 15m</p>
              </div>
              <div className="text-[#2EC4B6]">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <p className="text-[#A7A4B8] text-sm mb-4">
              Ready to find your perfect meal + playlist?
            </p>
            <a
              href="#"
              className="inline-block px-8 py-3 bg-[#E85D04] hover:bg-[#E85D04]/90 text-[#F5F3F0] font-semibold rounded-xl transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Get Started Free
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-[#0F0E17] border-t border-[#242334]">
        <div className="text-center">
          <p className="text-[#A7A4B8] text-sm">
            SonicSavor — Where music meets flavor
          </p>
          <p className="text-[#A7A4B8]/60 text-xs mt-2">
            A mood-driven dining experience powered by AI
          </p>
        </div>
      </footer>
    </main>
  );
}
