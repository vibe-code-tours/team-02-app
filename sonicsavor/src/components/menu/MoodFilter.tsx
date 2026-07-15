"use client";

interface MoodFilterProps {
  selectedMood: string | null;
  onSelect: (mood: string | null) => void;
}

const MOODS = [
  {
    id: "cozy",
    name: "Cozy",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
      </svg>
    ),
  },
  {
    id: "energetic",
    name: "Energetic",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
      </svg>
    ),
  },
  {
    id: "romantic",
    name: "Romantic",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    ),
  },
  {
    id: "chill",
    name: "Chill",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>
    ),
  },
];

export default function MoodFilter({ selectedMood, onSelect }: MoodFilterProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-[#F5F3F0] flex items-center gap-2">
        <svg
          className="w-4 h-4 text-[#9D4EDD]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
        Filter by Mood
      </h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelect(null)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors duration-200 cursor-pointer ${
            selectedMood === null
              ? "bg-[#E85D04] text-[#F5F3F0]"
              : "bg-[#1A1926] text-[#A7A4B8] hover:text-[#F5F3F0]"
          }`}
          aria-pressed={selectedMood === null}
        >
          All
        </button>
        {MOODS.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onSelect(mood.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors duration-200 cursor-pointer ${
              selectedMood === mood.id
                ? "bg-[#E85D04] text-[#F5F3F0]"
                : "bg-[#1A1926] text-[#A7A4B8] hover:text-[#F5F3F0]"
            }`}
            aria-pressed={selectedMood === mood.id}
          >
            {mood.icon}
            {mood.name}
          </button>
        ))}
      </div>
    </div>
  );
}
