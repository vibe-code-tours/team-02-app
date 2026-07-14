import type { CourseRecommendation } from "@/types";
import {
  Salad,
  UtensilsCrossed,
  CakeSlice,
  Leaf,
  type LucideIcon,
} from "lucide-react";

const COURSE_LABELS: Record<CourseRecommendation["course"], string> = {
  starter: "Starter",
  main: "Main Course",
  dessert: "Dessert",
};

const COURSE_ICONS: Record<CourseRecommendation["course"], LucideIcon> = {
  starter: Salad,
  main: UtensilsCrossed,
  dessert: CakeSlice,
};

const COURSE_COLORS: Record<
  CourseRecommendation["course"],
  { badge: string; tag: string }
> = {
  starter: {
    badge: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    tag: "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-stone-300",
  },
  main: {
    badge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    tag: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
  },
  dessert: {
    badge: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
    tag: "bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400",
  },
};

interface RecommendationCardProps {
  item: CourseRecommendation;
}

export default function RecommendationCard({ item }: RecommendationCardProps) {
  const colors = COURSE_COLORS[item.course];
  const CourseIcon = COURSE_ICONS[item.course];

  return (
    <article
      className="flex flex-col gap-3.5 h-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-stone-800 dark:bg-stone-900 dark:hover:shadow-stone-800/50"
      aria-label={`${COURSE_LABELS[item.course]}: ${item.dishName}`}
    >
      {/* Icon + Course badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-100 dark:bg-stone-800">
          <CourseIcon className="w-5 h-5 text-stone-600 dark:text-stone-300" aria-hidden="true" />
        </div>
        <span
          className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${colors.badge}`}
        >
          {COURSE_LABELS[item.course]}
        </span>
      </div>

      {/* Dish name + price */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold leading-snug text-zinc-900 dark:text-stone-50">
          {item.dishName}
        </h3>
        {item.price > 0 && (
          <span className="flex-shrink-0 text-sm font-semibold text-stone-600 dark:text-stone-400 tabular-nums">
            ${item.price.toFixed(2)}
          </span>
        )}
      </div>

      {/* Cuisine */}
      <p className="text-sm text-zinc-500 dark:text-stone-400">
        {item.cuisine}
      </p>

      {/* Description */}
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-stone-300 line-clamp-3">
        {item.description}
      </p>

      {/* Dietary tags */}
      {item.dietaryTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {item.dietaryTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
            >
              <Leaf className="w-3 h-3" aria-hidden="true" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Mood tags — pushed to bottom */}
      {item.moodTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1 mt-auto">
          {item.moodTags.map((tag) => (
            <span
              key={tag}
              className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.tag}`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
