"use client";

import { useState } from "react";
import StarRating from "@/components/ui/StarRating";
import type { CustomerFeedback } from "@/types";

interface CustomerFeedbackFormProps {
  onSubmit: (data: CustomerFeedback) => void;
  disabled?: boolean;
}

function ToggleButton({
  label,
  selected,
  onClick,
  disabled,
  variant,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  disabled: boolean;
  variant: "yes" | "no";
}) {
  const colors = {
    yes: {
      active: "bg-success/20 text-success border-success",
      inactive: "bg-surface text-text-secondary border-surface-elevated hover:bg-surface-elevated",
    },
    no: {
      active: "bg-error/20 text-error border-error",
      inactive: "bg-surface text-text-secondary border-surface-elevated hover:bg-surface-elevated",
    },
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-xl border text-sm font-medium
        cursor-pointer select-none
        transition-all duration-200 ease-in-out
        hover:-translate-y-0.5 hover:shadow-sm
        active:scale-95
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1
        disabled:opacity-50 disabled:pointer-events-none
        ${selected ? colors[variant].active : colors[variant].inactive}
      `}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
}

export default function CustomerFeedbackForm({
  onSubmit,
  disabled = false,
}: CustomerFeedbackFormProps) {
  const [overallRating, setOverallRating] = useState(0);
  const [foodQuality, setFoodQuality] = useState(0);
  const [ambianceRating, setAmbianceRating] = useState(0);
  const [playlistMatch, setPlaylistMatch] = useState(0);
  const [comments, setComments] = useState("");
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [wouldReturn, setWouldReturn] = useState<boolean | null>(null);

  const isValid = overallRating > 0 && foodQuality > 0 && ambianceRating > 0 && playlistMatch > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || disabled) return;
    onSubmit({
      overallRating,
      foodQuality,
      ambianceRating,
      playlistMatch,
      comments: comments.trim(),
      wouldRecommend,
      wouldReturn,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto rounded-2xl border border-surface-elevated bg-surface p-6 sm:p-8 shadow-sm"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-text-primary font-display">
          Share Your Experience
        </h2>
        <p className="mt-1.5 text-sm text-text-secondary">
          Your feedback helps us perfect the mood-to-meal experience.
        </p>
      </div>

      <div className="space-y-8">
        {/* ── Star Ratings ───────────────────────────────── */}
        <fieldset>
          <legend className="sr-only">Rate your experience</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StarRating
              value={overallRating}
              onChange={setOverallRating}
              label="Overall Experience"
              disabled={disabled}
            />
            <StarRating
              value={foodQuality}
              onChange={setFoodQuality}
              label="Food Quality"
              disabled={disabled}
            />
            <StarRating
              value={ambianceRating}
              onChange={setAmbianceRating}
              label="Ambiance & Decor"
              disabled={disabled}
            />
            <StarRating
              value={playlistMatch}
              onChange={setPlaylistMatch}
              label="Playlist Match"
              disabled={disabled}
            />
          </div>
        </fieldset>

        {/* ── Comments ───────────────────────────────────── */}
        <fieldset>
          <legend className="text-sm font-semibold text-text-primary mb-3">
            Comments
            <span className="ml-1.5 font-normal text-text-secondary">(optional)</span>
          </legend>
          <textarea
            rows={3}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="What did you love? What could be better?"
            disabled={disabled}
            className={`
              w-full rounded-xl border border-surface-elevated bg-background px-4 py-2.5
              text-sm text-text-primary placeholder:text-text-secondary resize-none
              focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30
              disabled:opacity-50 disabled:pointer-events-none
            `}
          />
        </fieldset>

        {/* ── Recommendation & Return ────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Would Recommend */}
          <div>
            <p className="text-sm font-semibold text-text-primary mb-3">
              Would you recommend us?
            </p>
            <div className="flex gap-2">
              <ToggleButton
                label="Yes, definitely!"
                selected={wouldRecommend === true}
                onClick={() => setWouldRecommend(wouldRecommend === true ? null : true)}
                disabled={disabled}
                variant="yes"
              />
              <ToggleButton
                label="Not this time"
                selected={wouldRecommend === false}
                onClick={() => setWouldRecommend(wouldRecommend === false ? null : false)}
                disabled={disabled}
                variant="no"
              />
            </div>
          </div>

          {/* Would Return */}
          <div>
            <p className="text-sm font-semibold text-text-primary mb-3">
              Would you come back?
            </p>
            <div className="flex gap-2">
              <ToggleButton
                label="Absolutely!"
                selected={wouldReturn === true}
                onClick={() => setWouldReturn(wouldReturn === true ? null : true)}
                disabled={disabled}
                variant="yes"
              />
              <ToggleButton
                label="Probably not"
                selected={wouldReturn === false}
                onClick={() => setWouldReturn(wouldReturn === false ? null : false)}
                disabled={disabled}
                variant="no"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Submit ───────────────────────────────────────── */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={!isValid || disabled}
          className={`
            w-full rounded-xl px-6 py-3
            text-sm font-semibold
            transition-all duration-200 ease-in-out
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-40
            ${isValid && !disabled
              ? "bg-primary text-white hover:bg-primary/90 active:scale-[0.98]"
              : "bg-surface-elevated text-text-secondary"
            }
          `}
        >
          Submit Feedback
        </button>
      </div>
    </form>
  );
}
