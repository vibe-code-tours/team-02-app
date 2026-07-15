"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EmailInput from "@/components/landing/EmailInput";
import OTPInput from "@/components/landing/OTPInput";
import PublicHeader from "@/components/layout/PublicHeader";
import Footer from "@/components/layout/Footer";

type ViewMode = "email" | "otp";

export default function RegisterPage() {
  const router = useRouter();
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

  const handleOtpSubmit = async (otp: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid code. Please try again.");
        return;
      }

      // Store session and redirect to dashboard
      localStorage.setItem("sonicsavor_session", JSON.stringify({
        email,
        otp,
        loginTime: new Date().toISOString(),
        expiresIn: 7 * 24 * 60 * 60 * 1000, // 7 days for registered users
      }));

      router.push("/dashboard");
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
    <main className="min-h-screen bg-[#0F0E17] flex flex-col">
      <PublicHeader />

      <div className="flex-1 flex items-center justify-center p-4 pt-20">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <svg className="w-16 h-16 text-[#9D4EDD]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[#F5F3F0]">
              Create Your Account
            </h1>
            <p className="text-[#A7A4B8]">
              {viewMode === "email"
                ? "Enter your email to get started"
                : `We sent a code to ${email}`}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-[#1A1926] border border-[#242334] rounded-2xl p-8">
            {viewMode === "email" ? (
              <div className="space-y-6">
                <EmailInput
                  onSubmit={handleEmailSubmit}
                  disabled={isLoading}
                  isLoading={isLoading}
                />

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

                {/* OTP Input */}
                <OTPInput
                  onSubmit={handleOtpSubmit}
                  disabled={isLoading}
                  isLoading={isLoading}
                  error={error}
                />
              </div>
            )}
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-[#A7A4B8] text-sm">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/checkin")}
                className="text-[#E85D04] hover:text-[#E85D04]/80 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-[#E85D04] rounded-lg px-2 py-1 min-h-[44px]"
              >
                Sign in here
              </button>
            </p>
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
