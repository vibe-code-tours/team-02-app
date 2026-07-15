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
      // TODO: Call API to verify access code
      console.log("Verifying access code:", code);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo: any 6-digit code works
      if (code.length === 6) {
        // Store session and redirect to dashboard
        localStorage.setItem("sonicsavor_session", JSON.stringify({
          code,
          loginTime: new Date().toISOString(),
          expiresIn: 4 * 60 * 60 * 1000, // 4 hours
        }));

        router.push("/dashboard");
      } else {
        setError("Invalid code. Please try again.");
      }
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
              <svg className="w-16 h-16 text-[#E85D04]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[#F5F3F0]">
              Welcome to SonicSavor
            </h1>
            <p className="text-[#A7A4B8]">
              Enter your 6-digit access code from our staff to continue
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
