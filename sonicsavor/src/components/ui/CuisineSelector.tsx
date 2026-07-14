"use client";

import {
  Globe,
  UtensilsCrossed,
  CookingPot,
  Sandwich,
  type LucideIcon,
} from "lucide-react";

interface CuisineOption {
  value: string;
  label: string;
  icon: LucideIcon;
  colorClass: string;
  bgSelected: string;
  borderSelected: string;
  hoverClass: string;
}

const CUISINES: CuisineOption[] = [
  {
    value: "all",
    label: "Mixed / Any",
    icon: Globe,
    colorClass: "text-zinc-600 dark:text-stone-400",
    bgSelected: "bg-stone-900 dark:bg-stone-200",
    borderSelected: "border-stone-900 dark:border-stone-200",
    hoverClass: "hover:bg-zinc-100 dark:hover:bg-stone-800",
  },
  {
    value: "myanmar",
    label: "Myanmar",
    icon: CookingPot,
    colorClass: "text-amber-600 dark:text-amber-400",
    bgSelected: "bg-amber-500/10 dark:bg-amber-500/20",
    borderSelected: "border-amber-500",
    hoverClass: "hover:bg-amber-50 dark:hover:bg-amber-950/30",
  },
  {
    value: "thai",
    label: "Thai",
    icon: UtensilsCrossed,
    colorClass: "text-red-600 dark:text-red-400",
    bgSelected: "bg-red-500/10 dark:bg-red-500/20",
    borderSelected: "border-red-500",
    hoverClass: "hover:bg-red-50 dark:hover:bg-red-950/30",
  },
  {
    value: "european",
    label: "European",
    icon: Sandwich,
    colorClass: "text-blue-600 dark:text-blue-400",
    bgSelected: "bg-blue-500/10 dark:bg-blue-500/20",
    borderSelected: "border-blue-500",
    hoverClass: "hover:bg-blue-50 dark:hover:bg-blue-950/30",
  },
];

interface CuisineSelectorProps {
  selected: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function CuisineSelector({
  selected,
  onChange,
  disabled = false,
}: CuisineSelectorProps) {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-3 rounded-2xl border border-zinc-200/80 bg-white/50 backdrop-blur-md p-5 shadow-sm transition-all duration-200 dark:border-stone-800 dark:bg-stone-900/50">
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold tracking-wide text-zinc-800 dark:text-stone-300">
          Cuisine Preference
        </h2>
        <p className="text-xs text-zinc-500 dark:text-stone-400">
          Limit your 3-course meal recommendation to a specific culinary style, or keep it mixed.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {CUISINES.map((cuisine) => {
          const isSelected = selected === cuisine.value;
          const Icon = cuisine.icon;
          return (
            <button
              key={cuisine.value}
              type="button"
              disabled={disabled}
              onClick={() => onChange(cuisine.value)}
              className={`
                flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-sm font-medium
                transition-all duration-200 ease-in-out cursor-pointer select-none
                active:scale-95 disabled:opacity-50 disabled:pointer-events-none
                ${
                  isSelected
                    ? `${cuisine.bgSelected} ${cuisine.borderSelected} border-solid shadow-sm scale-[1.02]`
                    : `bg-zinc-50/50 dark:bg-stone-900/50 border-zinc-200 dark:border-stone-800 ${cuisine.hoverClass} hover:border-zinc-300 dark:hover:border-stone-600`
                }
              `}
              aria-label={`Select cuisine: ${cuisine.label}`}
              aria-pressed={isSelected}
            >
              <Icon
                aria-hidden="true"
                className={`w-4 h-4 ${
                  isSelected
                    ? cuisine.value === "all"
                      ? "text-white dark:text-stone-900"
                      : `${cuisine.colorClass}`
                    : cuisine.colorClass
                }`}
              />
              <span
                className={`truncate ${
                  isSelected
                    ? cuisine.value === "all"
                      ? "text-white dark:text-stone-900"
                      : `${cuisine.colorClass}`
                    : "text-brand-800 dark:text-brand-200"
                }`}
              >
                {cuisine.label}
              </span>
            </button>
          );
        })}
      </div>

      {selected !== "all" && (
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-stone-400 animate-[fadeIn_0.2s_ease-out]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>
            Only <strong>{CUISINES.find((c) => c.value === selected)?.label}</strong> courses will be recommended. No mixed dishes.
          </span>
        </div>
      )}
    </div>
  );
}
