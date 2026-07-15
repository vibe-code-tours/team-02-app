"use client";

import { useState } from "react";
import RatingStars from "./RatingStars";

interface FeedbackFormProps {
  onSubmit: (data: {
    overallRating: number;
    foodQuality: number;
    ambianceRating: number;
    playlistMatch: number;
    comments: string;
    wouldRecommend: boolean;
    wouldReturn: boolean;
  }) => void;
}

export default function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [overallRating, setOverallRating] = useState(0);
  const [foodQuality, setFoodQuality] = useState(0);
  const [ambianceRating, setAmbianceRating] = useState(0);
  const [playlistMatch, setPlaylistMatch] = useState(0);
  const [comments, setComments] = useState("");
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [wouldReturn, setWouldReturn] = useState<boolean | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (overallRating === 0 || foodQuality === 0) return;
    onSubmit({
      overallRating,
      foodQuality,
      ambianceRating,
      playlistMatch,
      comments,
      wouldRecommend: wouldRecommend ?? true,
      wouldReturn: wouldReturn ?? true,
    });
  };

  const isValid = overallRating > 0 && foodQuality > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Rating Section */}
      <div className="bg-[#1A1926] border border-[#242334] rounded-xl p-4 space-y-5">
        <h3 className="text-[#F5F3F0] font-semibold flex items-center gap-2">
          <svg
            className="w-5 h-5 text-[#FFB703]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          Rate Your Experience
        </h3>

        <RatingStars
          label="Overall Experience *"
          value={overallRating}
          onChange={setOverallRating}
        />
        <RatingStars
          label="Food Quality *"
          value={foodQuality}
          onChange={setFoodQuality}
        />
        <RatingStars
          label="Ambiance & Atmosphere"
          value={ambianceRating}
          onChange={setAmbianceRating}
        />
        <RatingStars
          label="Music-Playlist Match"
          value={playlistMatch}
          onChange={setPlaylistMatch}
        />
      </div>

      {/* Yes/No Questions */}
      <div className="bg-[#1A1926] border border-[#242334] rounded-xl p-4 space-y-4">
        <h3 className="text-[#F5F3F0] font-semibold">Quick Questions</h3>

        <div>
          <p className="text-sm text-[#A7A4B8] mb-2">
            Would you recommend us to a friend?
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setWouldRecommend(true)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
                wouldRecommend === true
                  ? "bg-[#2EC4B6] text-[#F5F3F0]"
                  : "bg-[#242334] text-[#A7A4B8] hover:text-[#F5F3F0]"
              }`}
            >
              <span className="flex items-center justify-center gap-1">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                </svg>
                Yes
              </span>
            </button>
            <button
              type="button"
              onClick={() => setWouldRecommend(false)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
                wouldRecommend === false
                  ? "bg-[#E63946] text-[#F5F3F0]"
                  : "bg-[#242334] text-[#A7A4B8] hover:text-[#F5F3F0]"
              }`}
            >
              <span className="flex items-center justify-center gap-1">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
                </svg>
                No
              </span>
            </button>
          </div>
        </div>

        <div>
          <p className="text-sm text-[#A7A4B8] mb-2">
            Would you visit again?
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setWouldReturn(true)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
                wouldReturn === true
                  ? "bg-[#2EC4B6] text-[#F5F3F0]"
                  : "bg-[#242334] text-[#A7A4B8] hover:text-[#F5F3F0]"
              }`}
            >
              <span className="flex items-center justify-center gap-1">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                Yes
              </span>
            </button>
            <button
              type="button"
              onClick={() => setWouldReturn(false)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
                wouldReturn === false
                  ? "bg-[#E63946] text-[#F5F3F0]"
                  : "bg-[#242334] text-[#A7A4B8] hover:text-[#F5F3F0]"
              }`}
            >
              <span className="flex items-center justify-center gap-1">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
                No
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="bg-[#1A1926] border border-[#242334] rounded-xl p-4">
        <label
          htmlFor="feedback-comments"
          className="block text-sm font-medium text-[#F5F3F0] mb-2"
        >
          Additional Comments
        </label>
        <textarea
          id="feedback-comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Tell us about your experience..."
          rows={4}
          className="w-full px-4 py-3 bg-[#0F0E17] border border-[#242334] rounded-lg text-[#F5F3F0] placeholder-[#A7A4B8] focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04] outline-none transition-colors duration-200 resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid}
        className={`w-full py-4 font-semibold rounded-lg transition-colors duration-200 ${
          isValid
            ? "bg-[#E85D04] text-[#F5F3F0] hover:bg-[#E85D04]/90 cursor-pointer"
            : "bg-[#242334] text-[#A7A4B8] cursor-not-allowed"
        }`}
      >
        Submit Feedback
      </button>
    </form>
  );
}
