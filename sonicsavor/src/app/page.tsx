"use client";

import { useRouter } from "next/navigation";
import PublicHeader from "@/components/layout/PublicHeader";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#0F0E17]">
      <PublicHeader />
      {/* Reduced motion support */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .animated-gradient {
            animation: none !important;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 opacity-30 animated-gradient"
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

        {/* Content */}
        <div className="relative z-10 text-center max-w-2xl w-full">
          {/* Logo - SVG instead of emoji */}
          <div className="mb-6 flex justify-center">
            <svg className="w-16 h-16 text-[#E85D04]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-[#F5F3F0] mb-4">SonicSavor</h1>
          <p className="text-xl text-[#A7A4B8] mb-4">Where music meets flavor</p>
          <p className="text-[#A7A4B8] mb-10 max-w-lg mx-auto">
            Tell us your mood, and we&apos;ll recommend the perfect 3-course meal paired with a matching Spotify playlist.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/checkin")}
              aria-label="Enter access code"
              className="px-8 py-4 min-h-[44px] min-w-[44px] bg-[#E85D04] hover:bg-[#E85D04]/90 focus:outline-none focus:ring-2 focus:ring-[#E85D04] focus:ring-offset-2 focus:ring-offset-[#0F0E17] text-[#F5F3F0] font-semibold rounded-xl transition-all duration-200 text-lg"
            >
              <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              Enter Access Code
            </button>
            <button
              onClick={() => router.push("/register")}
              aria-label="Create account"
              className="px-8 py-4 min-h-[44px] min-w-[44px] bg-[#1A1926] border border-[#242334] hover:border-[#9D4EDD] focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] focus:ring-offset-2 focus:ring-offset-[#0F0E17] text-[#F5F3F0] font-semibold rounded-xl transition-all duration-200 text-lg"
            >
              <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Create Account
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-[#1A1926]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#F5F3F0] text-center mb-12">How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E85D04] rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <svg className="w-8 h-8 text-[#F5F3F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#F5F3F0] mb-2">1. Tell Your Mood</h3>
              <p className="text-[#A7A4B8] text-sm">Pick from mood chips or type how you feel</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#9D4EDD] rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <svg className="w-8 h-8 text-[#F5F3F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.5 1.5 0 003 15.546M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#F5F3F0] mb-2">2. Get Your Meal</h3>
              <p className="text-[#A7A4B8] text-sm">AI recommends starter, main, and dessert</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2EC4B6] rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <svg className="w-8 h-8 text-[#F5F3F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#F5F3F0] mb-2">3. Vibe with Music</h3>
              <p className="text-[#A7A4B8] text-sm">Matching Spotify playlist for your meal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#F5F3F0] text-center mb-12">Explore</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <button
              onClick={() => router.push("/menu")}
              aria-label="Browse menu"
              className="bg-[#1A1926] border border-[#242334] rounded-xl p-8 cursor-pointer hover:border-[#E85D04] focus:outline-none focus:ring-2 focus:ring-[#E85D04] focus:ring-offset-2 focus:ring-offset-[#0F0E17] transition-all duration-200 group text-center min-h-[44px]"
            >
              <svg className="w-12 h-12 mx-auto mb-4 text-[#E85D04] group-hover:text-[#E85D04]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.5 1.5 0 003 15.546M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
              </svg>
              <h3 className="text-2xl font-bold text-[#F5F3F0] mb-3 group-hover:text-[#E85D04] transition-colors duration-200">Menu</h3>
              <p className="text-[#A7A4B8] text-sm">18 dishes • Myanmar, Western, European</p>
            </button>
            <button
              onClick={() => router.push("/booking")}
              aria-label="Book a table"
              className="bg-[#1A1926] border border-[#242334] rounded-xl p-8 cursor-pointer hover:border-[#9D4EDD] focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] focus:ring-offset-2 focus:ring-offset-[#0F0E17] transition-all duration-200 group text-center min-h-[44px]"
            >
              <svg className="w-12 h-12 mx-auto mb-4 text-[#9D4EDD] group-hover:text-[#9D4EDD]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-2xl font-bold text-[#F5F3F0] mb-3 group-hover:text-[#9D4EDD] transition-colors duration-200">Book a Table</h3>
              <p className="text-[#A7A4B8] text-sm">22 tables • 5 types • Real-time availability</p>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
