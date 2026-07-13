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
    bg: "bg-primary/20",
    hoverBg: "hover:bg-primary/30",
    text: "text-secondary",
    ring: "focus-visible:ring-secondary",
    icon: "☕",
  },
  {
    label: "Refreshing",
    mood: "refreshing and light",
    bg: "bg-success/20",
    hoverBg: "hover:bg-success/30",
    text: "text-success",
    ring: "focus-visible:ring-success",
    icon: "🌿",
  },
  {
    label: "Romantic",
    mood: "romantic and intimate",
    bg: "bg-error/20",
    hoverBg: "hover:bg-error/30",
    text: "text-error",
    ring: "focus-visible:ring-error",
    icon: "🕯",
  },
  {
    label: "Adventurous",
    mood: "adventurous and bold",
    bg: "bg-primary/20",
    hoverBg: "hover:bg-primary/30",
    text: "text-primary",
    ring: "focus-visible:ring-primary",
    icon: "🌍",
  },
  {
    label: "Nostalgic",
    mood: "nostalgic and comforting",
    bg: "bg-accent/20",
    hoverBg: "hover:bg-accent/30",
    text: "text-accent",
    ring: "focus-visible:ring-accent",
    icon: "📜",
  },
  {
    label: "Energetic",
    mood: "energetic and upbeat",
    bg: "bg-secondary/20",
    hoverBg: "hover:bg-secondary/30",
    text: "text-secondary",
    ring: "focus-visible:ring-secondary",
    icon: "⚡",
  },
  {
    label: "Calm",
    mood: "calm and peaceful",
    bg: "bg-success/20",
    hoverBg: "hover:bg-success/30",
    text: "text-success",
    ring: "focus-visible:ring-success",
    icon: "🍃",
  },
  {
    label: "Indulgent",
    mood: "indulgent and luxurious",
    bg: "bg-accent/20",
    hoverBg: "hover:bg-accent/30",
    text: "text-accent",
    ring: "focus-visible:ring-accent",
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
