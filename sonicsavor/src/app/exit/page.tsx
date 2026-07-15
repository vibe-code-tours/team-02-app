"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PublicHeader from "@/components/layout/PublicHeader";
import Footer from "@/components/layout/Footer";
import StarRating from "@/components/ui/StarRating";

type ExitView = "farewell" | "feedback" | "thanks";

interface Feedback {
  overallRating: number;
  foodQuality: number;
  ambianceRating: number;
  playlistMatch: number;
  comments: string;
  wouldRecommend: boolean | null;
}

export default function ExitPage() {
  const router = useRouter();
  const [view, setView] = useState<ExitView>("farewell");
  const [feedback, setFeedback] = useState<Feedback>({
    overallRating: 0,
    foodQuality: 0,
    ambianceRating: 0,
    playlistMatch: 0,
    comments: "",
    wouldRecommend: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitFeedback = async () => {
    setIsSubmitting(true);

    // TODO: Send to real API endpoint
    // await fetch("/api/feedback", { method: "POST", body: JSON.stringify(feedback) });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setView("thanks");

    // Clear localStorage
    localStorage.removeItem("sonicsavor_cart");
  };

  const canSubmit = feedback.overallRating > 0 && feedback.foodQuality > 0;

  return (
    <div className="min-h-screen bg-[#0F0E17]">
      <PublicHeader />

      <main className="max-w-2xl mx-auto px-4 pt-24 pb-20">
        {/* Farewell View */}
        {view === "farewell" && (
          <div className="animate-[fadeIn_0.3s_ease-out] text-center">
            {/* Thank you icon */}
            <div className="w-24 h-24 bg-[#E85D04]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-[#E85D04]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-[#F5F3F0] mb-3">Thank You!</h1>
            <p className="text-lg text-[#A7A4B8] mb-8">
              We hope you enjoyed your dining experience with us
            </p>

            {/* Quick actions */}
            <div className="bg-[#1A1926] rounded-2xl p-6 border border-[#242334] mb-6">
              <p className="text-[#A7A4B8] text-sm mb-4">How was your visit?</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setView("feedback")}
                  className="flex-1 py-4 bg-[#E85D04] hover:bg-[#D45303] text-[#F5F3F0] rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/>
                  </svg>
                  Share Feedback
                </button>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="flex-1 py-4 border border-[#242334] hover:border-[#E85D04] text-[#A7A4B8] hover:text-[#F5F3F0] rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                  </svg>
                  Back to Home
                </button>
              </div>
            </div>

            {/* Fun facts */}
            <div className="bg-[#1A1926] rounded-2xl p-6 border border-[#242334]">
              <p className="text-sm text-[#A7A4B8] mb-3">Did you know?</p>
              <p className="text-[#F5F3F0]">
                SonicSavor pairs your mood with music and food for a complete sensory dining experience.
              </p>
            </div>
          </div>
        )}

        {/* Feedback View */}
        {view === "feedback" && (
          <div className="animate-[fadeIn_0.3s_ease-out]">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-[#F5F3F0] mb-2">Share Your Experience</h1>
              <p className="text-[#A7A4B8]">Your feedback helps us improve</p>
            </div>

            <div className="space-y-6">
              {/* Overall Rating */}
              <div className="bg-[#1A1926] rounded-xl p-5 border border-[#242334]">
                <StarRating
                  value={feedback.overallRating}
                  onChange={(v) => setFeedback(prev => ({ ...prev, overallRating: v }))}
                  label="Overall Experience"
                />
              </div>

              {/* Food Quality */}
              <div className="bg-[#1A1926] rounded-xl p-5 border border-[#242334]">
                <StarRating
                  value={feedback.foodQuality}
                  onChange={(v) => setFeedback(prev => ({ ...prev, foodQuality: v }))}
                  label="Food Quality"
                />
              </div>

              {/* Ambiance */}
              <div className="bg-[#1A1926] rounded-xl p-5 border border-[#242334]">
                <StarRating
                  value={feedback.ambianceRating}
                  onChange={(v) => setFeedback(prev => ({ ...prev, ambianceRating: v }))}
                  label="Ambiance & Atmosphere"
                />
              </div>

              {/* Playlist Match */}
              <div className="bg-[#1A1926] rounded-xl p-5 border border-[#242334]">
                <StarRating
                  value={feedback.playlistMatch}
                  onChange={(v) => setFeedback(prev => ({ ...prev, playlistMatch: v }))}
                  label="Music & Playlist Match"
                />
              </div>

              {/* Would Recommend */}
              <div className="bg-[#1A1926] rounded-xl p-5 border border-[#242334]">
                <p className="text-sm font-medium text-[#F5F3F0] mb-3">Would you recommend us?</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setFeedback(prev => ({ ...prev, wouldRecommend: true }))}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                      feedback.wouldRecommend === true
                        ? "bg-[#2EC4B6] text-[#0F0E17]"
                        : "bg-[#242334] text-[#A7A4B8] hover:bg-[#2EC4B6]/20 hover:text-[#2EC4B6]"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                    </svg>
                    Yes!
                  </button>
                  <button
                    onClick={() => setFeedback(prev => ({ ...prev, wouldRecommend: false }))}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                      feedback.wouldRecommend === false
                        ? "bg-[#E63946] text-[#F5F3F0]"
                        : "bg-[#242334] text-[#A7A4B8] hover:bg-[#E63946]/20 hover:text-[#E63946]"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/>
                    </svg>
                    Not really
                  </button>
                </div>
              </div>

              {/* Comments */}
              <div className="bg-[#1A1926] rounded-xl p-5 border border-[#242334]">
                <label className="text-sm font-medium text-[#F5F3F0] block mb-3">
                  Any comments? (Optional)
                </label>
                <textarea
                  value={feedback.comments}
                  onChange={(e) => setFeedback(prev => ({ ...prev, comments: e.target.value }))}
                  placeholder="Tell us more about your experience..."
                  className="w-full h-24 px-4 py-3 bg-[#0F0E17] border border-[#242334] rounded-xl text-[#F5F3F0] placeholder-[#A7A4B8] focus:outline-none focus:border-[#E85D04] resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                onClick={handleSubmitFeedback}
                disabled={!canSubmit || isSubmitting}
                className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  canSubmit && !isSubmitting
                    ? "bg-[#E85D04] hover:bg-[#D45303] text-[#F5F3F0]"
                    : "bg-[#242334] text-[#A7A4B8] cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#F5F3F0] border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                    Submit Feedback
                  </>
                )}
              </button>

              {/* Skip */}
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full py-3 text-[#A7A4B8] hover:text-[#F5F3F0] transition-colors"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}

        {/* Thanks View */}
        {view === "thanks" && (
          <div className="animate-[fadeIn_0.3s_ease-out] text-center">
            <div className="w-24 h-24 bg-[#2EC4B6]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-[#2EC4B6]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-[#F5F3F0] mb-3">Thanks for Your Feedback!</h1>
            <p className="text-lg text-[#A7A4B8] mb-8">
              We appreciate you taking the time to share your experience
            </p>

            <div className="bg-[#1A1926] rounded-2xl p-6 border border-[#242334] mb-6">
              <p className="text-[#A7A4B8] text-sm mb-4">Your ratings:</p>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-xs text-[#A7A4B8]">Overall</p>
                  <p className="text-[#F5F3F0] font-semibold">{feedback.overallRating}/5 ⭐</p>
                </div>
                <div>
                  <p className="text-xs text-[#A7A4B8]">Food</p>
                  <p className="text-[#F5F3F0] font-semibold">{feedback.foodQuality}/5 ⭐</p>
                </div>
                <div>
                  <p className="text-xs text-[#A7A4B8]">Ambiance</p>
                  <p className="text-[#F5F3F0] font-semibold">{feedback.ambianceRating}/5 ⭐</p>
                </div>
                <div>
                  <p className="text-xs text-[#A7A4B8]">Playlist</p>
                  <p className="text-[#F5F3F0] font-semibold">{feedback.playlistMatch}/5 ⭐</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => router.push("/")}
              className="w-full py-4 bg-[#E85D04] hover:bg-[#D45303] text-[#F5F3F0] rounded-xl font-semibold transition-all"
            >
              Back to Home
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
