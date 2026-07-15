"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#0F0E17]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "linear-gradient(135deg, #0F0E17 0%, #9D4EDD 50%, #0F0E17 100%)",
            backgroundSize: "400% 400%",
            animation: "gradientShift 10s ease infinite",
          }}
        />

        {/* Waveform decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden opacity-20">
          <svg viewBox="0 0 1200 120" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z" fill="#E85D04" opacity="0.5" />
            <path d="M0,70 Q150,30 300,70 T600,70 T900,70 T1200,70 L1200,120 L0,120 Z" fill="#E85D04" opacity="0.3" />
          </svg>
        </div>

        <style jsx>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>

        {/* Content */}
        <div className="relative z-10 text-center max-w-2xl w-full">
          {/* Logo */}
          <div className="mb-6">
            <span className="text-6xl">🎵</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl font-bold text-[#F5F3F0] mb-4">
            SonicSavor
          </h1>

          {/* Tagline */}
          <p className="text-xl text-[#A7A4B8] mb-4">
            Where music meets flavor
          </p>

          {/* Explanation */}
          <p className="text-[#A7A4B8] mb-12 max-w-lg mx-auto leading-relaxed">
            Tell us your mood, and we&apos;ll recommend the perfect 3-course meal
            paired with a matching Spotify playlist. It&apos;s dining, reimagined.
          </p>

          {/* CTAs */}
          <div className="space-y-4">
            <button
              onClick={() => router.push("/checkin")}
              className="w-full sm:w-auto px-8 py-4 bg-[#E85D04] hover:bg-[#E85D04]/90 text-[#F5F3F0] font-semibold rounded-xl transition-all text-lg"
            >
              🎵 Enter Access Code
            </button>

            <button
              onClick={() => router.push("/register")}
              className="w-full sm:w-auto px-8 py-4 bg-[#1A1926] border border-[#242334] hover:border-[#9D4EDD] text-[#F5F3F0] font-semibold rounded-xl transition-all text-lg"
            >
              ✨ Create Account
            </button>
          </div>

          {/* Browse Only */}
          <button
            onClick={() => router.push("/menu")}
            className="mt-6 text-[#A7A4B8] hover:text-[#F5F3F0] transition-colors text-sm"
          >
            👀 Just Browse the Menu
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#F5F3F0] text-center mb-12">
            How It Works
          </h2>

          <div className="grid sm:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E85D04] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-lg font-semibold text-[#F5F3F0] mb-2">
                1. Tell Your Mood
              </h3>
              <p className="text-[#A7A4B8] text-sm">
                Type how you feel or pick from mood chips like &quot;cozy&quot;, &quot;adventurous&quot;, or &quot;romantic&quot;
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#9D4EDD] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍽️</span>
              </div>
              <h3 className="text-lg font-semibold text-[#F5F3F0] mb-2">
                2. Get Your Meal
              </h3>
              <p className="text-[#A7A4B8] text-sm">
                AI recommends a 3-course meal (starter, main, dessert) that matches your mood perfectly
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2EC4B6] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎶</span>
              </div>
              <h3 className="text-lg font-semibold text-[#F5F3F0] mb-2">
                3. Vibe with Music
              </h3>
              <p className="text-[#A7A4B8] text-sm">
                We pair your meal with a matching Spotify playlist for the ultimate dining experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-[#1A1926]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#F5F3F0] text-center mb-12">
            Why SonicSavor?
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-[#0F0E17] p-6 rounded-xl border border-[#242334]">
              <span className="text-2xl mb-3 block">🧠</span>
              <h3 className="text-lg font-semibold text-[#F5F3F0] mb-2">
                AI-Powered Recommendations
              </h3>
              <p className="text-[#A7A4B8] text-sm">
                Our AI understands your mood and suggests dishes that perfectly match how you feel
              </p>
            </div>

            <div className="bg-[#0F0E17] p-6 rounded-xl border border-[#242334]">
              <span className="text-2xl mb-3 block">🎵</span>
              <h3 className="text-lg font-semibold text-[#F5F3F0] mb-2">
                Mood-Matched Playlists
              </h3>
              <p className="text-[#A7A4B8] text-sm">
                Every meal comes with a curated Spotify playlist that enhances your dining experience
              </p>
            </div>

            <div className="bg-[#0F0E17] p-6 rounded-xl border border-[#242334]">
              <span className="text-2xl mb-3 block">🌍</span>
              <h3 className="text-lg font-semibold text-[#F5F3F0] mb-2">
                Diverse Menu
              </h3>
              <p className="text-[#A7A4B8] text-sm">
                From Myanmar cuisine to Western classics and European fine dining — something for every taste
              </p>
            </div>

            <div className="bg-[#0F0E17] p-6 rounded-xl border border-[#242334]">
              <span className="text-2xl mb-3 block">✨</span>
              <h3 className="text-lg font-semibold text-[#F5F3F0] mb-2">
                Personalized Experience
              </h3>
              <p className="text-[#A7A4B8] text-sm">
                Every recommendation is unique to your current mood — no two experiences are the same
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#F5F3F0] text-center mb-4">
            Explore SonicSavor
          </h2>
          <p className="text-[#A7A4B8] text-center mb-12">
            Browse our menu or reserve your table
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Menu Card */}
            <div
              onClick={() => router.push("/menu")}
              className="bg-[#1A1926] border border-[#242334] rounded-xl p-8 cursor-pointer hover:border-[#E85D04] transition-all group"
            >
              <span className="text-4xl mb-4 block">🍽️</span>
              <h3 className="text-2xl font-bold text-[#F5F3F0] mb-3 group-hover:text-[#E85D04] transition-colors">
                Menu
              </h3>
              <p className="text-[#A7A4B8] mb-4">
                Explore our diverse selection of Myanmar, Western, and European cuisines
              </p>
              <ul className="text-sm text-[#A7A4B8] space-y-2 mb-6">
                <li>• 18 dishes across 3 courses</li>
                <li>• Starters, Mains, and Desserts</li>
                <li>• Mood-based descriptions</li>
              </ul>
              <span className="text-[#E85D04] font-medium text-sm group-hover:translate-x-2 inline-block transition-transform">
                Browse Menu →
              </span>
            </div>

            {/* Booking Card */}
            <div
              onClick={() => router.push("/booking")}
              className="bg-[#1A1926] border border-[#242334] rounded-xl p-8 cursor-pointer hover:border-[#9D4EDD] transition-all group"
            >
              <span className="text-4xl mb-4 block">📅</span>
              <h3 className="text-2xl font-bold text-[#F5F3F0] mb-3 group-hover:text-[#9D4EDD] transition-colors">
                Book a Table
              </h3>
              <p className="text-[#A7A4B8] mb-4">
                Reserve your perfect table for a mood-driven dining experience
              </p>
              <ul className="text-sm text-[#A7A4B8] space-y-2 mb-6">
                <li>• 22 tables across 5 types</li>
                <li>• Family, Squad, Duo, Solo, Private</li>
                <li>• Real-time availability</li>
              </ul>
              <span className="text-[#9D4EDD] font-medium text-sm group-hover:translate-x-2 inline-block transition-transform">
                Reserve Table →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#F5F3F0] mb-4">
            Ready to Taste the Mood?
          </h2>
          <p className="text-[#A7A4B8] mb-8">
            Enter your access code or create an account to get started
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/checkin")}
              className="px-8 py-4 bg-[#E85D04] hover:bg-[#E85D04]/90 text-[#F5F3F0] font-semibold rounded-xl transition-all text-lg"
            >
              🎵 Enter Access Code
            </button>

            <button
              onClick={() => router.push("/register")}
              className="px-8 py-4 bg-[#1A1926] border border-[#242334] hover:border-[#9D4EDD] text-[#F5F3F0] font-semibold rounded-xl transition-all text-lg"
            >
              ✨ Create Account
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
