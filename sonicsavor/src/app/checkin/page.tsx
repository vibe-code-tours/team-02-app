"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AccessCodeEntry from "@/components/landing/AccessCodeEntry";
import PublicHeader from "@/components/layout/PublicHeader";
import Footer from "@/components/layout/Footer";

export default function CheckinPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCodeSubmit = async (code: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, type: "access-code" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid code. Please try again.");
        return;
      }

      // Store session and redirect to dashboard
      localStorage.setItem("sonicsavor_session", JSON.stringify({
        code,
        loginTime: new Date().toISOString(),
        expiresIn: 4 * 60 * 60 * 1000, // 4 hours
      }));

      router.push("/dashboard");
    } catch {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0F0E17] flex flex-col">
      <PublicHeader />

      <div className="flex-1 flex items-center justify-center p-4 pt-20">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-[#E85D04]/10 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-[#E85D04]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-[#F5F3F0]">
              Welcome to SonicSavor
            </h1>
            <p className="text-[#A7A4B8]">
              Enter your 6-digit access code from our staff to start your dining experience
            </p>
          </div>

          {/* Access Code Entry */}
          <div className="bg-[#1A1926] border border-[#242334] rounded-2xl p-8">
            <AccessCodeEntry
              onSubmit={handleCodeSubmit}
              disabled={isLoading}
              isLoading={isLoading}
              error={error}
            />
          </div>

          {/* How it works */}
          <div className="bg-[#1A1926]/50 border border-[#242334] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-[#F5F3F0] mb-3">How to get your code:</h3>
            <ol className="space-y-2 text-sm text-[#A7A4B8]">
              <li className="flex items-start gap-2">
                <span className="text-[#E85D04] font-semibold">1.</span>
                <span>Visit our restaurant or call ahead</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E85D04] font-semibold">2.</span>
                <span>Our staff will generate a code for you</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E85D04] font-semibold">3.</span>
                <span>Enter the code above to access your session</span>
              </li>
            </ol>
          </div>

          {/* Don't have a code? */}
          <div className="text-center">
            <p className="text-[#A7A4B8] text-sm mb-2">Don&apos;t have a code?</p>
            <button
              onClick={() => router.push("/register")}
              className="text-[#E85D04] hover:text-[#E85D04]/80 transition-colors duration-200 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D04] rounded-lg px-4 py-2 min-h-[44px]"
            >
              Create an account instead
            </button>
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <button
              onClick={() => router.push("/")}
              aria-label="Back to home"
              className="text-[#A7A4B8] hover:text-[#F5F3F0] transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D04] rounded-lg px-4 py-2 min-h-[44px]"
            >
              <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
