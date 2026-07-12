"use client";

import { useState } from "react";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  disabled?: boolean;
  maxStars?: number;
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
      className="w-6 h-6 transition-colors duration-150"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function StarRating({
  value,
  onChange,
  label,
  disabled = false,
  maxStars = 5,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </span>
      <div
        className="flex items-center gap-0.5"
        role="radiogroup"
        aria-label={label}
      >
        {Array.from({ length: maxStars }, (_, i) => i + 1).map((star) => {
          const isActive = star <= (hoverValue || value);
          return (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={star === value}
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
              disabled={disabled}
              onMouseEnter={() => !disabled && setHoverValue(star)}
              onMouseLeave={() => !disabled && setHoverValue(0)}
              onClick={() => !disabled && onChange(star)}
              className={`
                p-0.5 rounded-sm cursor-pointer
                transition-all duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-1
                disabled:cursor-not-allowed disabled:opacity-40
                ${isActive ? "text-amber-400" : "text-zinc-300 dark:text-zinc-500"}
                hover:scale-110 active:scale-95
              `}
            >
              <StarIcon filled={isActive} />
            </button>
          );
        })}
        {value > 0 && (
          <span className="ml-2 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">
            {value}/{maxStars}
          </span>
        )}
      </div>
    </div>
  );
}
