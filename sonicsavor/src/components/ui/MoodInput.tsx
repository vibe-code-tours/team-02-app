"use client";

import { useState, useRef } from "react";
import { ArrowUp } from "lucide-react";

interface MoodInputProps {
  onSubmit: (mood: string) => void;
  disabled?: boolean;
}

const MAX_CHARS = 200;

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

  const charCount = mood.length;
  const isNearLimit = charCount > MAX_CHARS * 0.8;
  const isOverLimit = charCount > MAX_CHARS;

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <label htmlFor="mood-input" className="sr-only">
        How are you feeling right now?
      </label>

      {/* Floating chat container */}
      <div
        className={`
          group relative flex items-end gap-2
          rounded-2xl border border-zinc-200 bg-white
          px-4 py-3
          shadow-sm
          transition-all duration-200 ease-in-out
          focus-within:border-stone-400 focus-within:shadow-md
          focus-within:ring-2 focus-within:ring-stone-200
          dark:border-stone-800 dark:bg-stone-900
          dark:focus-within:border-stone-500 dark:focus-within:ring-stone-800
          ${disabled ? "opacity-50 pointer-events-none" : ""}
        `}
      >
        {/* Send icon / submit trigger */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!mood.trim() || disabled || isOverLimit}
          aria-label="Send mood"
          className={`
            flex-shrink-0 flex items-center justify-center
            w-9 h-9 rounded-xl
            transition-all duration-200 ease-in-out
            ${
              mood.trim() && !isOverLimit
                ? "bg-stone-800 text-white hover:bg-stone-700 active:scale-95 cursor-pointer dark:bg-stone-200 dark:hover:bg-stone-100 dark:text-stone-900"
                : "bg-zinc-100 text-zinc-400 dark:bg-stone-800 dark:text-stone-500"
            }
            disabled:cursor-not-allowed disabled:opacity-40
          `}
        >
          <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
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
          inputMode="text"
          maxLength={MAX_CHARS + 20}
          className={`
            flex-1 resize-none bg-transparent
            text-base text-zinc-900 placeholder:text-zinc-400
            focus:outline-none
            dark:text-stone-50 dark:placeholder:text-stone-500
            min-h-7 max-h-[120px]
            leading-relaxed
            font-[family-name:var(--font-sans)]
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

      {/* Hint text + character count */}
      <div className="flex items-center justify-between mt-1.5 px-1">
        <p
          id="mood-hint"
          className="text-xs text-zinc-400 dark:text-stone-500"
        >
          Press <kbd className="px-1 py-0.5 rounded bg-zinc-100 text-zinc-500 text-[10px] font-mono dark:bg-stone-800 dark:text-stone-500">Enter</kbd> to send, <kbd className="px-1 py-0.5 rounded bg-zinc-100 text-zinc-500 text-[10px] font-mono dark:bg-stone-800 dark:text-stone-500">Shift+Enter</kbd> for new line
        </p>
        {charCount > 0 && (
          <span
            className={`text-[10px] font-mono tabular-nums ${
              isOverLimit
                ? "text-red-500"
                : isNearLimit
                  ? "text-amber-500"
                  : "text-zinc-400 dark:text-stone-500"
            }`}
          >
            {charCount}/{MAX_CHARS}
          </span>
        )}
      </div>
    </div>
  );
}
