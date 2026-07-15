"use client";

import { useRouter } from "next/navigation";
import HeroSection from "@/components/landing/HeroSection";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#0F0E17]">
      <HeroSection>
        <div className="space-y-6">
          {/* Primary CTA - Checkin */}
          <button
            onClick={() => router.push("/checkin")}
            className="w-full py-4 bg-[#E85D04] hover:bg-[#E85D04]/90 text-[#F5F3F0] font-semibold rounded-xl transition-all text-lg"
          >
            🎵 Enter Access Code
          </button>

          {/* Secondary CTA - Register */}
          <button
            onClick={() => router.push("/register")}
            className="w-full py-4 bg-[#1A1926] border border-[#242334] hover:border-[#9D4EDD] text-[#F5F3F0] font-semibold rounded-xl transition-all text-lg"
          >
            ✨ Create Account
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[#242334]" />
            <span className="text-sm text-[#A7A4B8]">or</span>
            <div className="flex-1 h-px bg-[#242334]" />
          </div>

          {/* Browse Only */}
          <button
            onClick={() => router.push("/menu")}
            className="w-full py-3 text-[#A7A4B8] hover:text-[#F5F3F0] transition-colors text-sm"
          >
            👀 Browse Menu Only
          </button>
        </div>
      </HeroSection>
    </main>
  );
}
