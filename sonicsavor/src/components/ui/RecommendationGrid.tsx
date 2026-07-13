"use client";

import type { CourseRecommendation } from "@/types";
import RecommendationCard from "@/components/recommendation/RecommendationCard";

const COURSE_ORDER: CourseRecommendation["course"][] = [
  "starter",
  "main",
  "dessert",
];

interface RecommendationGridProps {
  courses: CourseRecommendation[];
}

export default function RecommendationGrid({
  courses,
}: RecommendationGridProps) {
  // Only render when all 3 courses are present
  const hasAllCourses = COURSE_ORDER.every((type) =>
    courses.some((c) => c.course === type),
  );

  if (!hasAllCourses) return null;

  // Sort into canonical order: Starter → Main → Dessert
  const sorted = [...courses].sort(
    (a, b) => COURSE_ORDER.indexOf(a.course) - COURSE_ORDER.indexOf(b.course),
  );

  return (
    <section className="w-full max-w-3xl mx-auto" aria-label="Recommended 3-course meal">
      <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-text-secondary mb-5 font-mono">
        Your 3-Course Meal
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {sorted.map((item, i) => (
          <div
            key={item.course}
            className="animate-[fadeInUp_0.4s_ease-out_both]"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <RecommendationCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
