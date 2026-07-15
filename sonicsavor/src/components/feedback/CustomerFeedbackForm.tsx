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
      active: "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-700",
      inactive: "bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700 dark:hover:bg-zinc-700",
    },
    no: {
      active: "bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-700",
      inactive: "bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700 dark:hover:bg-zinc-700",
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
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-300 focus-visible:ring-offset-1
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
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [wouldReturn, setWouldReturn] = useState<boolean | null>(null);

  const isValid = email.trim().length > 0 && overallRating > 0 && foodQuality > 0 && ambianceRating > 0 && playlistMatch > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || disabled) return;
    onSubmit({
      email: email.trim(),
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
      className="w-full max-w-2xl mx-auto rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Share Your Experience
        </h2>
        <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
          Your feedback helps us perfect the mood-to-meal experience.
        </p>
      </div>

      <div className="space-y-8">
        {/* ── Email ──────────────────────────────────────── */}
        <fieldset>
          <legend className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
            Your Email
          </legend>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={disabled}
            required
            className={`
              w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5
              text-sm text-zinc-900 placeholder:text-zinc-400
              focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200
              dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100
              dark:placeholder:text-zinc-500 dark:focus:border-stone-500 dark:focus:ring-stone-800
              disabled:opacity-50 disabled:pointer-events-none
              font-[family-name:var(--font-geist-sans)]
            `}
          />
        </fieldset>

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
          <legend className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
            Comments
            <span className="ml-1.5 font-normal text-zinc-400 dark:text-zinc-500">(optional)</span>
          </legend>
          <textarea
            rows={3}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="What did you love? What could be better?"
            disabled={disabled}
            className={`
              w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5
              text-sm text-zinc-900 placeholder:text-zinc-400 resize-none
              focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200
              dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100
              dark:placeholder:text-zinc-500 dark:focus:border-stone-500 dark:focus:ring-stone-800
              disabled:opacity-50 disabled:pointer-events-none
              font-[family-name:var(--font-geist-sans)]
            `}
          />
        </fieldset>

        {/* ── Recommendation & Return ────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Would Recommend */}
          <div>
            <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
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
            <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
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
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-300 focus-visible:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-40
            ${isValid && !disabled
              ? "bg-stone-800 text-white hover:bg-stone-700 active:scale-[0.98] dark:bg-stone-200 dark:text-stone-900 dark:hover:bg-stone-300"
              : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600"
            }
          `}
        >
          Submit Feedback
        </button>
      </div>
    </form>
  );
}
