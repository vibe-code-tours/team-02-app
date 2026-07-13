"use client";

import { useState, useRef } from "react";

interface MoodInputProps {
  onSubmit: (mood: string) => void;
  disabled?: boolean;
}

export default function MoodInput({ onSubmit, disabled = false }: MoodInputProps) {
  const [mood, setMood] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const trimmed = mood.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
    setMood("");
    textareaRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <label htmlFor="mood-input" className="sr-only">
        How are you feeling right now?
      </label>

      {/* Floating chat container */}
      <div
        className={`
          group relative flex items-end gap-2
          rounded-2xl border border-surface-elevated bg-surface
          px-4 py-3
          shadow-sm
          transition-all duration-200 ease-in-out
          focus-within:border-primary focus-within:shadow-md
          focus-within:ring-2 focus-within:ring-primary/30
          ${disabled ? "opacity-50 pointer-events-none" : ""}
        `}
      >
        {/* Send icon / submit trigger */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!mood.trim() || disabled}
          aria-label="Send mood"
          className={`
            flex-shrink-0 flex items-center justify-center
            w-9 h-9 rounded-xl
            transition-all duration-200 ease-in-out
            ${
              mood.trim()
                ? "bg-primary text-white hover:bg-primary/90 active:scale-95 cursor-pointer"
                : "bg-surface-elevated text-text-secondary"
            }
            disabled:cursor-not-allowed disabled:opacity-40
          `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M10 2c.552 0 1.005.449.91.992l-.828 8.282a.75.75 0 0 1-1.495-.118L6.584 8.427a.75.75 0 0 1 .572-.895l3.868-.433A.75.75 0 0 0 11.5 6.12V3.25c0-.414.336-.75.75-.75Zm-.91 10.057.73 7.3a.75.75 0 0 0 1.495-.118l.828-8.282a.75.75 0 0 0-.572-.895l-3.868-.433a.75.75 0 0 1-.612-.612L8.59 3.25a.75.75 0 0 0-.895-.572l-.187.038Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          id="mood-input"
          rows={1}
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What's your mood? (e.g. cozy, adventurous, nostalgic...)"
          disabled={disabled}
          className={`
            flex-1 resize-none bg-transparent
            text-base text-text-primary placeholder:text-text-secondary
            focus:outline-none
            min-h-7 max-h-[120px]
            leading-relaxed
          `}
          style={{
            height: "auto",
            overflowY: mood.split("\n").length > 3 ? "auto" : "hidden",
          }}
          onInput={(e) => {
            const target = e.currentTarget;
            target.style.height = "auto";
            target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
          }}
          aria-describedby="mood-hint"
        />
      </div>

      {/* Hint text */}
      <p
        id="mood-hint"
        className="mt-1.5 text-xs text-text-secondary text-center"
      >
        Press <kbd className="px-1 py-0.5 rounded bg-surface-elevated text-text-secondary text-[10px] font-mono">Enter</kbd> to send, <kbd className="px-1 py-0.5 rounded bg-surface-elevated text-text-secondary text-[10px] font-mono">Shift+Enter</kbd> for a new line
      </p>
    </div>
  );
}
