"use client";

import { useState } from "react";
import { MENU_ITEMS } from "@/lib/menu-data";

type CourseType = "all" | "starter" | "main" | "dessert";

export default function MenuPage() {
  const [selectedCourse, setSelectedCourse] = useState<CourseType>("all");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const filteredItems = selectedCourse === "all"
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.course === selectedCourse);

  const courses: CourseType[] = ["all", "starter", "main", "dessert"];

  return (
    <div className="min-h-screen bg-[#0F0E17] pt-16 pb-20 px-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-[#F5F3F0] mb-2">Menu</h1>
        <p className="text-[#A7A4B8] mb-8">Browse our delicious food & drinks</p>

        {/* Course Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {courses.map((course) => (
            <button
              key={course}
              onClick={() => setSelectedCourse(course)}
              className={`px-4 py-2 rounded-lg capitalize whitespace-nowrap transition-all ${
                selectedCourse === course
                  ? "bg-[#E85D04] text-[#F5F3F0]"
                  : "bg-[#1A1926] text-[#A7A4B8] hover:bg-[#242334]"
              }`}
            >
              {course === "all" ? "🍽️ All" : course === "starter" ? "🥗 Starters" : course === "main" ? "🍖 Mains" : "🍰 Desserts"}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`bg-[#1A1926] border rounded-xl p-5 transition-all cursor-pointer ${
                hoveredItem === item.id
                  ? "border-[#E85D04] scale-[1.02]"
                  : "border-[#242334]"
              }`}
            >
              {/* Course Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs px-2 py-1 rounded-full bg-[#242334] text-[#A7A4B8] capitalize">
                  {item.course}
                </span>
                <span className="text-xs text-[#A7A4B8]">
                  {item.cuisine}
                </span>
              </div>

              {/* Item Name */}
              <h3 className="text-lg font-semibold text-[#F5F3F0] mb-2">
                {item.name}
              </h3>

              {/* Mood Description */}
              <p className="text-sm text-[#A7A4B8] mb-3 line-clamp-2">
                {item.moodDescription}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded bg-[#9D4EDD]/20 text-[#9D4EDD]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#A7A4B8]">No items found for this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
