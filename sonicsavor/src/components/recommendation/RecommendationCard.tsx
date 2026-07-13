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
    badge: "bg-primary/20 text-primary",
    tag: "bg-primary/10 text-primary",
  },
  main: {
    badge: "bg-secondary/20 text-secondary",
    tag: "bg-secondary/10 text-secondary",
  },
  dessert: {
    badge: "bg-accent/20 text-accent",
    tag: "bg-accent/10 text-accent",
  },
};

interface RecommendationCardProps {
  item: CourseRecommendation;
}

export default function RecommendationCard({ item }: RecommendationCardProps) {
  const colors = COURSE_COLORS[item.course];

  return (
    <article className="flex flex-col gap-3.5 rounded-2xl border border-surface-elevated bg-surface p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Icon + Course badge */}
      <div className="flex items-center justify-between">
        <span className="text-3xl leading-none" aria-hidden="true">
          {item.icon}
        </span>
        <span
          className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full font-mono ${colors.badge}`}
        >
          {COURSE_LABELS[item.course]}
        </span>
      </div>

      {/* Dish name */}
      <h3 className="text-lg font-semibold leading-snug text-text-primary font-display">
        {item.dishName}
      </h3>

      {/* Cuisine */}
      <p className="text-sm text-text-secondary">
        {item.cuisine}
      </p>

      {/* Description */}
      <p className="text-sm leading-relaxed text-text-primary/80">
        {item.description}
      </p>

      {/* Mood tags */}
      {item.moodTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.moodTags.map((tag) => (
            <span
              key={tag}
              className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium font-mono ${colors.tag}`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
