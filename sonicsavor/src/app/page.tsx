"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    // TODO: Call API to send OTP
    console.log("Sending OTP to:", email);
    setTimeout(() => {
      setIsLoading(false);
      alert("OTP sent! (Check console for demo)");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#0F0E17] flex flex-col">
      {/* Hero Section with Animated Gradient */}
      <section className="relative flex-1 flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
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
          <svg
            viewBox="0 0 1200 120"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z"
              fill="#E85D04"
              opacity="0.5"
            />
            <path
              d="M0,70 Q150,30 300,70 T600,70 T900,70 T1200,70 L1200,120 L0,120 Z"
              fill="#E85D04"
              opacity="0.3"
            />
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
        <div className="relative z-10 text-center max-w-xl">
          {/* Logo */}
          <div className="mb-6">
            <span className="text-5xl">🎵</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-[#F5F3F0] mb-4">
            SonicSavor
          </h1>

          {/* Tagline */}
          <p className="text-lg text-[#A7A4B8] mb-10">
            Where music meets flavor
          </p>

          {/* Email Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-5 py-4 bg-[#1A1926] border border-[#242334] rounded-xl text-[#F5F3F0] placeholder-[#A7A4B8] focus:outline-none focus:border-[#E85D04] focus:ring-2 focus:ring-[#E85D04]/20 transition-all text-lg"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A7A4B8]">
                📧
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full py-4 bg-[#E85D04] hover:bg-[#E85D04]/90 disabled:bg-[#242334] disabled:text-[#A7A4B8] text-[#F5F3F0] font-semibold rounded-xl transition-all text-lg"
            >
              {isLoading ? "Sending..." : "✨ Get Access Code"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-[#242334]" />
            <span className="text-sm text-[#A7A4B8]">or</span>
            <div className="flex-1 h-px bg-[#242334]" />
          </div>

          {/* Sign in hint */}
          <p className="text-sm text-[#A7A4B8]">
            Returning? Just enter your email above — we&apos;ll recognize you. 💜
          </p>
        </div>
      </section>
    </main>
  );
}
