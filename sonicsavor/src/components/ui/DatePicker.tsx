"use client";

import { useState, useRef, useEffect } from "react";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  min?: string;
  label?: string;
}

export default function DatePicker({ value, onChange, min, label }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minDate = min ? new Date(min) : today;
  minDate.setHours(0, 0, 0, 0);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "Select date";
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
  };

  const handleDateSelect = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    const dateStr = `${year}-${month}-${dayStr}`;
    onChange(dateStr);
    setIsOpen(false);
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div ref={containerRef} className="relative">
      {label && <label className="block text-sm text-[#A7A4B8] mb-2">{label}</label>}

      {/* Input Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 bg-[#0F0E17] border rounded-xl text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E85D04] min-h-[44px] flex items-center justify-between ${
          value ? "border-[#E85D04] text-[#F5F3F0]" : "border-[#242334] text-[#A7A4B8]"
        }`}
      >
        <span>{formatDisplayDate(value)}</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      {/* Calendar Popup */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1A1926] border border-[#242334] rounded-xl p-4 shadow-xl z-50">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-[#242334] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
            >
              <svg className="w-5 h-5 text-[#A7A4B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm font-semibold text-[#F5F3F0]">{monthName}</span>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-[#242334] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
            >
              <svg className="w-5 h-5 text-[#A7A4B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="text-center text-xs text-[#A7A4B8] py-1">{day}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for offset */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
              date.setHours(0, 0, 0, 0);
              const isPast = date < minDate;
              const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const isSelected = value === dateStr;
              const isToday = date.getTime() === today.getTime();

              return (
                <button
                  key={day}
                  onClick={() => !isPast && handleDateSelect(day)}
                  disabled={isPast}
                  className={`aspect-square rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E85D04] ${
                    isSelected
                      ? "bg-[#E85D04] text-[#F5F3F0]"
                      : isToday
                      ? "bg-[#9D4EDD]/20 text-[#9D4EDD]"
                      : isPast
                      ? "text-[#242334] cursor-not-allowed"
                      : "text-[#F5F3F0] hover:bg-[#242334]"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
