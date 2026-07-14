"use client";

import { useState } from "react";
import type {
  GuestRegistration,
  Occasion,
  DecorationPreference,
  SeatingPreference,
  DietaryRestriction,
} from "@/types";

interface GuestRegistrationFormProps {
  onSubmit: (data: GuestRegistration) => void;
  disabled?: boolean;
}

// ── Chip data ──────────────────────────────────────────────

interface ChipOption<T extends string> {
  value: T;
  label: string;
  icon: string;
  bg: string;
  hoverBg: string;
  text: string;
  ring: string;
}

const OCCASIONS: ChipOption<Occasion>[] = [
  { value: "birthday", label: "Birthday", icon: "🎂", bg: "bg-pink-50 dark:bg-pink-950", hoverBg: "hover:bg-pink-100 dark:hover:bg-pink-900", text: "text-pink-700 dark:text-pink-300", ring: "focus-visible:ring-pink-300" },
  { value: "anniversary", label: "Anniversary", icon: "💐", bg: "bg-rose-50 dark:bg-rose-950", hoverBg: "hover:bg-rose-100 dark:hover:bg-rose-900", text: "text-rose-700 dark:text-rose-300", ring: "focus-visible:ring-rose-300" },
  { value: "casual", label: "Casual", icon: "🍽", bg: "bg-zinc-50 dark:bg-stone-800", hoverBg: "hover:bg-zinc-100 dark:hover:bg-stone-800", text: "text-zinc-700 dark:text-stone-300", ring: "focus-visible:ring-zinc-300" },
  { value: "business", label: "Business", icon: "💼", bg: "bg-slate-50 dark:bg-slate-900", hoverBg: "hover:bg-slate-100 dark:hover:bg-slate-800", text: "text-slate-700 dark:text-slate-300", ring: "focus-visible:ring-slate-300" },
  { value: "date_night", label: "Date Night", icon: "💕", bg: "bg-red-50 dark:bg-red-950", hoverBg: "hover:bg-red-100 dark:hover:bg-red-900", text: "text-red-700 dark:text-red-300", ring: "focus-visible:ring-red-300" },
  { value: "celebration", label: "Celebration", icon: "🎉", bg: "bg-amber-50 dark:bg-amber-950", hoverBg: "hover:bg-amber-100 dark:hover:bg-amber-900", text: "text-amber-700 dark:text-amber-300", ring: "focus-visible:ring-amber-300" },
  { value: "other", label: "Other", icon: "✨", bg: "bg-violet-50 dark:bg-violet-950", hoverBg: "hover:bg-violet-100 dark:hover:bg-violet-900", text: "text-violet-700 dark:text-violet-300", ring: "focus-visible:ring-violet-300" },
];

const DECORATIONS: ChipOption<DecorationPreference>[] = [
  { value: "romantic", label: "Romantic", icon: "🕯", bg: "bg-rose-50 dark:bg-rose-950", hoverBg: "hover:bg-rose-100 dark:hover:bg-rose-900", text: "text-rose-700 dark:text-rose-300", ring: "focus-visible:ring-rose-300" },
  { value: "festive", label: "Festive", icon: "🎊", bg: "bg-amber-50 dark:bg-amber-950", hoverBg: "hover:bg-amber-100 dark:hover:bg-amber-900", text: "text-amber-700 dark:text-amber-300", ring: "focus-visible:ring-amber-300" },
  { value: "minimal", label: "Minimal", icon: "◽", bg: "bg-zinc-50 dark:bg-stone-800", hoverBg: "hover:bg-zinc-100 dark:hover:bg-stone-800", text: "text-zinc-700 dark:text-stone-300", ring: "focus-visible:ring-zinc-300" },
  { value: "elegant", label: "Elegant", icon: "🥂", bg: "bg-indigo-50 dark:bg-indigo-950", hoverBg: "hover:bg-indigo-100 dark:hover:bg-indigo-900", text: "text-indigo-700 dark:text-indigo-300", ring: "focus-visible:ring-indigo-300" },
  { value: "cozy", label: "Cozy", icon: "☕", bg: "bg-orange-50 dark:bg-orange-950", hoverBg: "hover:bg-orange-100 dark:hover:bg-orange-900", text: "text-orange-700 dark:text-orange-300", ring: "focus-visible:ring-orange-300" },
  { value: "none", label: "No Preference", icon: "—", bg: "bg-zinc-50 dark:bg-stone-800", hoverBg: "hover:bg-zinc-100 dark:hover:bg-stone-800", text: "text-zinc-500 dark:text-stone-400", ring: "focus-visible:ring-zinc-300" },
];

const SEATING: ChipOption<SeatingPreference>[] = [
  { value: "indoor", label: "Indoor", icon: "🏠", bg: "bg-sky-50 dark:bg-sky-950", hoverBg: "hover:bg-sky-100 dark:hover:bg-sky-900", text: "text-sky-700 dark:text-sky-300", ring: "focus-visible:ring-sky-300" },
  { value: "outdoor", label: "Outdoor", icon: "🌿", bg: "bg-emerald-50 dark:bg-emerald-950", hoverBg: "hover:bg-emerald-100 dark:hover:bg-emerald-900", text: "text-emerald-700 dark:text-emerald-300", ring: "focus-visible:ring-emerald-300" },
  { value: "bar", label: "Bar", icon: "🍸", bg: "bg-violet-50 dark:bg-violet-950", hoverBg: "hover:bg-violet-100 dark:hover:bg-violet-900", text: "text-violet-700 dark:text-violet-300", ring: "focus-visible:ring-violet-300" },
  { value: "private", label: "Private Room", icon: "🚪", bg: "bg-stone-50 dark:bg-stone-900", hoverBg: "hover:bg-stone-100 dark:hover:bg-stone-800", text: "text-stone-700 dark:text-stone-300", ring: "focus-visible:ring-stone-300" },
];

const DIETARY: { value: DietaryRestriction; label: string }[] = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "gluten-free", label: "Gluten-Free" },
  { value: "halal", label: "Halal" },
  { value: "kosher", label: "Kosher" },
  { value: "nut-free", label: "Nut-Free" },
  { value: "dairy-free", label: "Dairy-Free" },
];

// ── Component ──────────────────────────────────────────────

export default function GuestRegistrationForm({
  onSubmit,
  disabled = false,
}: GuestRegistrationFormProps) {
  const [name, setName] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [reservationDate, setReservationDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [occasion, setOccasion] = useState<Occasion | "">("");
  const [decoration, setDecoration] = useState<DecorationPreference | "">("");
  const [dietary, setDietary] = useState<DietaryRestriction[]>([]);
  const [seating, setSeating] = useState<SeatingPreference | "">("");
  const [specialRequests, setSpecialRequests] = useState("");

  const toggleDietary = (val: DietaryRestriction) => {
    setDietary((prev) =>
      prev.includes(val) ? prev.filter((d) => d !== val) : [...prev, val],
    );
  };

  const isValid = name.trim().length > 0 && occasion !== "" && decoration !== "" && seating !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || disabled) return;
    onSubmit({
      name: name.trim(),
      partySize,
      reservationDate,
      occasion: occasion as Occasion,
      decorationPreference: decoration as DecorationPreference,
      dietaryRestrictions: dietary,
      seatingPreference: seating as SeatingPreference,
      specialRequests: specialRequests.trim(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-stone-50 font-[family-name:var(--font-display)]">
          Guest Registration
        </h2>
        <p className="mt-1.5 text-sm text-zinc-500 dark:text-stone-400">
          Tell us about your visit so we can set the perfect scene.
        </p>
      </div>

      <div className="space-y-8">
        {/* ── Name & Party Size ──────────────────────────── */}
        <fieldset>
          <legend className="text-sm font-semibold text-zinc-700 dark:text-stone-300 mb-3">
            Your Details
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label htmlFor="guest-name" className="block text-sm text-zinc-600 dark:text-stone-400 mb-1.5">
                Name
              </label>
              <input
                id="guest-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                disabled={disabled}
                required
                className={`
                  w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5
                  text-sm text-zinc-900 placeholder:text-zinc-400
                  focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200
                  dark:border-stone-800 dark:bg-stone-800 dark:text-stone-50
                  dark:placeholder:text-zinc-500 dark:focus:border-stone-500 dark:focus:ring-stone-800
                  disabled:opacity-50 disabled:pointer-events-none
                  font-[family-name:var(--font-sans)]
                `}
              />
            </div>

            {/* Party Size */}
            <div className="relative">
              <label htmlFor="party-size" className="block text-sm text-zinc-600 dark:text-stone-400 mb-1.5">
                Party Size
              </label>
              <select
                id="party-size"
                value={partySize}
                onChange={(e) => setPartySize(Number(e.target.value))}
                disabled={disabled}
                className={`
                  w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 pr-10
                  text-sm text-zinc-900
                  focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200
                  dark:border-stone-800 dark:bg-stone-800 dark:text-stone-50
                  dark:focus:border-stone-500 dark:focus:ring-stone-800
                  disabled:opacity-50 disabled:pointer-events-none
                  font-[family-name:var(--font-sans)]
                  appearance-none cursor-pointer
                `}
              >
                {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
              {/* Custom chevron */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-zinc-400 dark:text-stone-500">
                  <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Reservation Date */}
            <div className="sm:col-span-2">
              <label htmlFor="reservation-date" className="block text-sm text-zinc-600 dark:text-stone-400 mb-1.5">
                Reservation Date
              </label>
              <input
                id="reservation-date"
                type="date"
                value={reservationDate}
                onChange={(e) => setReservationDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                disabled={disabled}
                required
                className={`
                  w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5
                  text-sm text-zinc-900
                  focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200
                  dark:border-stone-800 dark:bg-stone-800 dark:text-stone-50
                  dark:focus:border-stone-500 dark:focus:ring-stone-800
                  disabled:opacity-50 disabled:pointer-events-none
                  font-[family-name:var(--font-sans)]
                `}
              />
            </div>
          </div>
        </fieldset>

        {/* ── Occasion ───────────────────────────────────── */}
        <fieldset>
          <legend className="text-sm font-semibold text-zinc-700 dark:text-stone-300 mb-3">
            Occasion
          </legend>
          <div className="flex flex-wrap gap-2.5">
            {OCCASIONS.map((chip) => (
              <button
                key={chip.value}
                type="button"
                onClick={() => setOccasion(chip.value)}
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
                  ${occasion === chip.value
                    ? `${chip.bg} ${chip.text} ring-2 ring-offset-1 ${chip.ring} shadow-sm`
                    : `bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-800`
                  }
                `}
                aria-pressed={occasion === chip.value}
              >
                <span aria-hidden="true" className="text-base leading-none">{chip.icon}</span>
                {chip.label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* ── Decoration Preference ──────────────────────── */}
        <fieldset>
          <legend className="text-sm font-semibold text-zinc-700 dark:text-stone-300 mb-3">
            Decoration Preference
          </legend>
          <div className="flex flex-wrap gap-2.5">
            {DECORATIONS.map((chip) => (
              <button
                key={chip.value}
                type="button"
                onClick={() => setDecoration(chip.value)}
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
                  ${decoration === chip.value
                    ? `${chip.bg} ${chip.text} ring-2 ring-offset-1 ${chip.ring} shadow-sm`
                    : `bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-800`
                  }
                `}
                aria-pressed={decoration === chip.value}
              >
                <span aria-hidden="true" className="text-base leading-none">{chip.icon}</span>
                {chip.label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* ── Dietary Restrictions ───────────────────────── */}
        <fieldset>
          <legend className="text-sm font-semibold text-zinc-700 dark:text-stone-300 mb-3">
            Dietary Restrictions
            <span className="ml-1.5 font-normal text-zinc-400 dark:text-stone-500">(optional)</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {DIETARY.map((item) => {
              const isSelected = dietary.includes(item.value);
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => toggleDietary(item.value)}
                  disabled={disabled}
                  className={`
                    inline-flex items-center gap-1.5
                    rounded-full px-3.5 py-1.5
                    text-sm font-medium
                    cursor-pointer select-none
                    transition-all duration-200 ease-in-out
                    active:scale-95
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-300 focus-visible:ring-offset-1
                    disabled:opacity-50 disabled:pointer-events-none
                    ${isSelected
                      ? "bg-stone-800 text-white dark:bg-stone-200 dark:text-stone-900"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-800"
                    }
                  `}
                  aria-pressed={isSelected}
                >
                  {isSelected && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                      <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                    </svg>
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* ── Seating Preference ─────────────────────────── */}
        <fieldset>
          <legend className="text-sm font-semibold text-zinc-700 dark:text-stone-300 mb-3">
            Seating Preference
          </legend>
          <div className="flex flex-wrap gap-2.5">
            {SEATING.map((chip) => (
              <button
                key={chip.value}
                type="button"
                onClick={() => setSeating(chip.value)}
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
                  ${seating === chip.value
                    ? `${chip.bg} ${chip.text} ring-2 ring-offset-1 ${chip.ring} shadow-sm`
                    : `bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-800`
                  }
                `}
                aria-pressed={seating === chip.value}
              >
                <span aria-hidden="true" className="text-base leading-none">{chip.icon}</span>
                {chip.label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* ── Special Requests ───────────────────────────── */}
        <fieldset>
          <legend className="text-sm font-semibold text-zinc-700 dark:text-stone-300 mb-3">
            Special Requests
            <span className="ml-1.5 font-normal text-zinc-400 dark:text-stone-500">(optional)</span>
          </legend>
          <textarea
            rows={3}
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            placeholder="Any allergies, accessibility needs, or special occasions we should know about?"
            disabled={disabled}
            className={`
              w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5
              text-sm text-zinc-900 placeholder:text-zinc-400 resize-none
              focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200
              dark:border-stone-800 dark:bg-stone-800 dark:text-stone-50
              dark:placeholder:text-zinc-500 dark:focus:border-stone-500 dark:focus:ring-stone-800
              disabled:opacity-50 disabled:pointer-events-none
              font-[family-name:var(--font-sans)]
            `}
          />
        </fieldset>
      </div>

      {/* ── Submit ───────────────────────────────────────── */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={!isValid || disabled}
          className={`
            w-full rounded-xl px-6 py-3
            text-sm font-semibold
            transition-all duration-200 ease-in-out
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-300 focus-visible:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-40
            ${isValid && !disabled
              ? "bg-stone-800 text-white hover:bg-stone-700 active:scale-[0.98] dark:bg-stone-200 dark:text-stone-900 dark:hover:bg-stone-100"
              : "bg-zinc-100 text-zinc-400 dark:bg-stone-800 dark:text-stone-500"
            }
          `}
        >
          Complete Registration
        </button>
      </div>
    </form>
  );
}
