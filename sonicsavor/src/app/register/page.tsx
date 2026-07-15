"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EmailInput from "@/components/landing/EmailInput";
import OTPInput from "@/components/landing/OTPInput";

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
      // TODO: Call API to send OTP to email
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

  const handleOtpSubmit = async (otp: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Call API to verify OTP and create account
      console.log("Verifying OTP:", otp);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo: any 6-digit code works
      if (otp.length === 6) {
        // Store session and redirect to dashboard
        localStorage.setItem("sonicsavor_session", JSON.stringify({
          email,
          otp,
          loginTime: new Date().toISOString(),
          expiresIn: 7 * 24 * 60 * 60 * 1000, // 7 days for registered users
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

  const handleBackToEmail = () => {
    setViewMode("email");
    setError(null);
  };

  return (
    <main className="min-h-screen bg-[#0F0E17] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-[#F5F3F0]">
            Create Your Account ✨
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
              className="text-[#E85D04] hover:text-[#E85D04]/80 transition-colors font-medium"
            >
              Sign in here
            </button>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <button
            onClick={() => router.push("/")}
            className="text-[#A7A4B8] hover:text-[#F5F3F0] transition-colors text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </main>
  );
}
