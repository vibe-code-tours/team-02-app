"use client";

import { useState } from "react";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import RegistrationPrompt from "@/components/feedback/RegistrationPrompt";

type ExitStep = "feedback" | "registration" | "complete";

export default function ExitPage() {
  const [step, setStep] = useState<ExitStep>("feedback");

  const handleFeedbackSubmit = (data: {
    overallRating: number;
    foodQuality: number;
    ambianceRating: number;
    playlistMatch: number;
    comments: string;
    wouldRecommend: boolean;
    wouldReturn: boolean;
  }) => {
    // In real app, submit feedback to API
    console.log("Feedback submitted:", data);
    setStep("registration");
  };

  const handleRegister = (email: string, name: string) => {
    // In real app, register user
    console.log("Registration:", email, name);
    setStep("complete");
  };

  const handleSkip = () => {
    setStep("complete");
  };

  return (
    <main className="min-h-screen bg-[#0F0E17] pb-24">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <svg
            className="w-6 h-6 text-[#E85D04]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
          </svg>
          <h1 className="text-2xl font-bold text-[#F5F3F0]">Thank You</h1>
        </div>

        {step === "feedback" && (
          <>
            <p className="text-[#A7A4B8] mb-6">
              We&apos;d love to hear about your dining experience
            </p>
            <FeedbackForm onSubmit={handleFeedbackSubmit} />
          </>
        )}

        {step === "registration" && (
          <RegistrationPrompt onRegister={handleRegister} onSkip={handleSkip} />
        )}

        {step === "complete" && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto bg-[#2EC4B6]/20 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-[#2EC4B6]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#F5F3F0] mb-2">
              See You Again!
            </h2>
            <p className="text-[#A7A4B8] mb-8">
              Thank you for dining with us at SonicSavor
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="px-8 py-3 bg-[#E85D04] text-[#F5F3F0] font-semibold rounded-lg hover:bg-[#E85D04]/90 transition-colors duration-200 cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
