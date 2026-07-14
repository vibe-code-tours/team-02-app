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
      // TODO: Call API to send OTP
      console.log("Sending OTP to:", submittedEmail);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Switch to OTP view
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
      // TODO: Call API to verify OTP
      console.log("Verifying code:", code);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo: any 6-digit code works
      if (code.length === 6) {
        // TODO: Redirect to dashboard
        alert(`Code verified! Welcome to SonicSavor.\n\nEmail: ${email}\nCode: ${code}`);
      } else {
        setError("Invalid code. Please try again.");
      }
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

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-[#242334]" />
              <span className="text-sm text-[#A7A4B8]">or</span>
              <div className="flex-1 h-px bg-[#242334]" />
            </div>

            {/* Sign in hint */}
            <p className="text-sm text-[#A7A4B8] text-center">
              Returning? Just enter your email above — we&apos;ll recognize you. 💜
            </p>

            {error && (
              <div className="text-center text-[#E63946] text-sm">
                {error}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Back button */}
            <button
              onClick={handleBackToEmail}
              disabled={isLoading}
              className="text-[#A7A4B8] hover:text-[#F5F3F0] transition-colors text-sm flex items-center gap-2 mx-auto"
            >
              ← Back to email
            </button>

            {/* Email display */}
            <p className="text-sm text-[#A7A4B8] text-center">
              Code sent to <span className="text-[#F5F3F0]">{email}</span>
            </p>

            {/* OTP Input */}
            <AccessCodeEntry
              onSubmit={handleOtpSubmit}
              disabled={isLoading}
              isLoading={isLoading}
              error={error}
            />
          </div>
        )}
      </HeroSection>
    </main>
  );
}
