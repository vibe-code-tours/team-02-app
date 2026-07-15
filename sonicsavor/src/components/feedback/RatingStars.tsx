"use client";

interface RatingStarsProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

export default function RatingStars({
  label,
  value,
  onChange,
  max = 5,
}: RatingStarsProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#F5F3F0]">
        {label}
      </label>
      <div className="flex gap-2" role="radiogroup" aria-label={label}>
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`p-1 transition-colors duration-200 cursor-pointer ${
              star <= value ? "text-[#FFB703]" : "text-[#242334]"
            } hover:text-[#FFB703]`}
            aria-label={`${star} star${star !== 1 ? "s" : ""}`}
            aria-pressed={star <= value}
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
