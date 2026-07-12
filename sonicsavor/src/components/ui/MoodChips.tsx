"use client";

interface MoodChipsProps {
  onSelect: (mood: string) => void;
  disabled?: boolean;
}

interface MoodChip {
  label: string;
  mood: string;
  bg: string;
  hoverBg: string;
  text: string;
  ring: string;
  icon: string;
}

const MOODS: MoodChip[] = [
  {
    label: "Cozy",
    mood: "cozy and warm",
    bg: "bg-amber-50 dark:bg-amber-950",
    hoverBg: "hover:bg-amber-100 dark:hover:bg-amber-900",
    text: "text-amber-700 dark:text-amber-300",
    ring: "focus-visible:ring-amber-300",
    icon: "☕",
  },
  {
    label: "Refreshing",
    mood: "refreshing and light",
    bg: "bg-emerald-50 dark:bg-emerald-950",
    hoverBg: "hover:bg-emerald-100 dark:hover:bg-emerald-900",
    text: "text-emerald-700 dark:text-emerald-300",
    ring: "focus-visible:ring-emerald-300",
    icon: "🌿",
  },
  {
    label: "Romantic",
    mood: "romantic and intimate",
    bg: "bg-rose-50 dark:bg-rose-950",
    hoverBg: "hover:bg-rose-100 dark:hover:bg-rose-900",
    text: "text-rose-700 dark:text-rose-300",
    ring: "focus-visible:ring-rose-300",
    icon: "🕯",
  },
  {
    label: "Adventurous",
    mood: "adventurous and bold",
    bg: "bg-orange-50 dark:bg-orange-950",
    hoverBg: "hover:bg-orange-100 dark:hover:bg-orange-900",
    text: "text-orange-700 dark:text-orange-300",
    ring: "focus-visible:ring-orange-300",
    icon: "🌍",
  },
  {
    label: "Nostalgic",
    mood: "nostalgic and comforting",
    bg: "bg-violet-50 dark:bg-violet-950",
    hoverBg: "hover:bg-violet-100 dark:hover:bg-violet-900",
    text: "text-violet-700 dark:text-violet-300",
    ring: "focus-visible:ring-violet-300",
    icon: "📜",
  },
  {
    label: "Energetic",
    mood: "energetic and upbeat",
    bg: "bg-yellow-50 dark:bg-yellow-950",
    hoverBg: "hover:bg-yellow-100 dark:hover:bg-yellow-900",
    text: "text-yellow-700 dark:text-yellow-300",
    ring: "focus-visible:ring-yellow-300",
    icon: "⚡",
  },
  {
    label: "Calm",
    mood: "calm and peaceful",
    bg: "bg-sky-50 dark:bg-sky-950",
    hoverBg: "hover:bg-sky-100 dark:hover:bg-sky-900",
    text: "text-sky-700 dark:text-sky-300",
    ring: "focus-visible:ring-sky-300",
    icon: "🍃",
  },
  {
    label: "Indulgent",
    mood: "indulgent and luxurious",
    bg: "bg-fuchsia-50 dark:bg-fuchsia-950",
    hoverBg: "hover:bg-fuchsia-100 dark:hover:bg-fuchsia-900",
    text: "text-fuchsia-700 dark:text-fuchsia-300",
    ring: "focus-visible:ring-fuchsia-300",
    icon: "🍫",
  },
];

export default function MoodChips({ onSelect, disabled = false }: MoodChipsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2.5 w-full max-w-xl mx-auto">
      {MOODS.map((chip) => (
        <button
          key={chip.label}
          type="button"
          onClick={() => onSelect(chip.mood)}
          disabled={disabled}
          className={`
            inline-flex items-center gap-1.5
            rounded-full px-4 py-2
            text-sm font-medium
            cursor-pointer select-none
            transition-all duration-200 ease-in-out
            hover:-translate-y-0.5 hover:shadow-sm
            active:scale-95
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
            disabled:opacity-50 disabled:pointer-events-none
            ${chip.bg} ${chip.hoverBg} ${chip.text} ${chip.ring}
          `}
          aria-label={`Select mood: ${chip.label}`}
        >
          <span aria-hidden="true" className="text-base leading-none">{chip.icon}</span>
          {chip.label}
        </button>
      ))}
    </div>
  );
}
