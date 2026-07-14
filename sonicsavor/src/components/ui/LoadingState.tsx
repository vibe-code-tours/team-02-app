"use client";

import {
  UtensilsCrossed,
  Music,
  Wine,
  Headphones,
  CakeSlice,
  Salad,
} from "lucide-react";

const FLOATING_ICONS = [
  { Icon: Salad, delay: "0ms", x: "15%", duration: "2.4s" },
  { Icon: Music, delay: "400ms", x: "35%", duration: "2.8s" },
  { Icon: Wine, delay: "800ms", x: "55%", duration: "2.2s" },
  { Icon: Headphones, delay: "1200ms", x: "75%", duration: "3s" },
  { Icon: CakeSlice, delay: "600ms", x: "25%", duration: "2.6s" },
  { Icon: UtensilsCrossed, delay: "1000ms", x: "65%", duration: "2.5s" },
];

function SkeletonBone({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-zinc-100 dark:bg-stone-800 ${className ?? ""}`}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
    </div>
  );
}

function CourseCardSkeleton({ label, width }: { label: string; width: string }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Card body */}
      <SkeletonBone className={`h-44 ${width}`} />

      {/* Mood tag */}
      <SkeletonBone className="h-4 w-20 rounded-full" />

      {/* Dish name */}
      <SkeletonBone className="h-5 w-3/4" />

      {/* Cuisine type */}
      <SkeletonBone className="h-3.5 w-1/2" />

      {/* Label */}
      <span className="text-xs font-medium text-brand-400 dark:text-brand-500 tracking-wide uppercase">
        {label}
      </span>
    </div>
  );
}

export default function LoadingState() {
  return (
    <div className="relative w-full max-w-3xl mx-auto py-8" role="status" aria-live="polite">
      {/* Floating food & music icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {FLOATING_ICONS.map(({ Icon, delay, x, duration }) => (
          <span
            key={`${Icon.displayName || Icon.name}-${delay}`}
            className="absolute text-zinc-300 dark:text-stone-500 opacity-0 animate-[float_3s_ease-in-out_infinite] select-none"
            style={{
              left: x,
              animationDelay: delay,
              animationDuration: duration,
            }}
          >
            <Icon className="w-5 h-5" />
          </span>
        ))}
      </div>

      {/* Status text */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-stone-400 dark:bg-stone-500 animate-[dotPulse_1.4s_ease-in-out_infinite]" />
          <span className="w-1.5 h-1.5 rounded-full bg-stone-400 dark:bg-stone-500 animate-[dotPulse_1.4s_ease-in-out_200ms_infinite]" />
          <span className="w-1.5 h-1.5 rounded-full bg-stone-400 dark:bg-stone-500 animate-[dotPulse_1.4s_ease-in-out_400ms_infinite]" />
        </div>
        <span className="text-sm text-zinc-500 dark:text-stone-400 font-medium">
          Crafting your perfect meal & playlist…
        </span>
      </div>

      {/* Skeleton: 3-course card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <CourseCardSkeleton label="Starter" width="w-full" />
        <CourseCardSkeleton label="Main Course" width="w-full" />
        <CourseCardSkeleton label="Dessert" width="w-full" />
      </div>

      {/* Skeleton: Spotify embed */}
      <SkeletonBone className="h-20 w-full rounded-xl" />
    </div>
  );
}
