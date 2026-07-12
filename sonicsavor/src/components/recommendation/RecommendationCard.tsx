import type { CourseRecommendation } from "@/types";

const COURSE_LABELS: Record<CourseRecommendation["course"], string> = {
  starter: "Starter",
  main: "Main Course",
  dessert: "Dessert",
};

const COURSE_COLORS: Record<
  CourseRecommendation["course"],
  { badge: string; tag: string }
> = {
  starter: {
    badge: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    tag: "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400",
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

  return (
    <article className="flex flex-col gap-3.5 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:shadow-zinc-800/50">
      {/* Icon + Course badge */}
      <div className="flex items-center justify-between">
        <span className="text-3xl leading-none" aria-hidden="true">
          {item.icon}
        </span>
        <span
          className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${colors.badge}`}
        >
          {COURSE_LABELS[item.course]}
        </span>
      </div>

      {/* Dish name */}
      <h3 className="text-lg font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
        {item.dishName}
      </h3>

      {/* Cuisine */}
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {item.cuisine}
      </p>

      {/* Description */}
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        {item.description}
      </p>

      {/* Mood tags */}
      {item.moodTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
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
