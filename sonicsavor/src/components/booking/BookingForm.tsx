"use client";

import { useState, useEffect } from "react";
import { TABLE_CONFIG, getTableAvailability, getAvailableTimeSlots, getMaxPartySize, getMinPartySize } from "@/lib/table-availability";

interface BookingFormProps {
  onSubmit: (data: {
    tableType: string;
    date: string;
    time: string;
    partySize: number;
    guestName: string;
    guestEmail: string;
    occasion: string;
    specialRequests: string;
  }) => void;
}

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const [tableType, setTableType] = useState("private");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [partySize, setPartySize] = useState(4);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [occasion, setOccasion] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [availability, setAvailability] = useState<{ [key: string]: { total: number; available: number } }>({});
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  // Update availability when date/time changes
  useEffect(() => {
    if (date && time) {
      const avail = getTableAvailability(date, time);
      setAvailability(avail);
      setAvailableSlots(getAvailableTimeSlots(date));

      // Auto-select first available table type if current is unavailable
      if (avail[tableType]?.available === 0) {
        const firstAvailable = Object.keys(avail).find((key) => avail[key].available > 0);
        if (firstAvailable) {
          setTableType(firstAvailable);
        }
      }
    }
  }, [date, time, tableType]);

  // Update party size limits when table type changes
  useEffect(() => {
    const min = getMinPartySize(tableType);
    const max = getMaxPartySize(tableType);
    if (partySize < min) setPartySize(min);
    if (partySize > max) setPartySize(max);
  }, [tableType, partySize]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      tableType,
      date,
      time,
      partySize,
      guestName,
      guestEmail,
      occasion,
      specialRequests,
    });
  };

  const getTableStatusColor = (available: number, total: number) => {
    const ratio = available / total;
    if (ratio > 0.5) return "text-[#2EC4B6]";
    if (ratio > 0) return "text-[#FFB703]";
    return "text-[#E63946]";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Date & Time - First step */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="booking-date" className="block text-sm font-medium text-[#F5F3F0] mb-2">
            Date
          </label>
          <input
            id="booking-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-3 bg-[#1A1926] border border-[#242334] rounded-lg text-[#F5F3F0] focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04] outline-none transition-colors duration-200"
            required
          />
        </div>
        <div>
          <label htmlFor="booking-time" className="block text-sm font-medium text-[#F5F3F0] mb-2">
            Time
          </label>
          <select
            id="booking-time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-3 bg-[#1A1926] border border-[#242334] rounded-lg text-[#F5F3F0] focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04] outline-none transition-colors duration-200"
            required
          >
            <option value="">Select time</option>
            {availableSlots.map((slot) => (
              <option key={slot} value={slot}>
                {parseInt(slot.split(":")[0]) > 12
                  ? `${parseInt(slot.split(":")[0]) - 12}:${slot.split(":")[1]} PM`
                  : `${slot} AM`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Type Selection - With real-time availability */}
      <div>
        <label className="block text-sm font-medium text-[#F5F3F0] mb-3">
          Select Table Type
          {date && time && (
            <span className="text-[#A7A4B8] font-normal ml-2">
              (Available tables shown)
            </span>
          )}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Object.entries(TABLE_CONFIG).map(([key, config]) => {
            const avail = availability[key] || { total: config.total, available: config.total };
            const isAvailable = avail.available > 0;
            const isSelected = tableType === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => isAvailable && setTableType(key)}
                disabled={!isAvailable}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  isSelected
                    ? "border-[#E85D04] bg-[#E85D04]/10"
                    : isAvailable
                    ? "border-[#242334] bg-[#1A1926] hover:border-[#E85D04]/50 cursor-pointer"
                    : "border-[#242334] bg-[#242334]/30 opacity-50 cursor-not-allowed"
                }`}
                aria-pressed={isSelected}
                aria-disabled={!isAvailable}
              >
                <svg
                  className={`w-6 h-6 mx-auto mb-2 ${isSelected ? "text-[#E85D04]" : "text-[#A7A4B8]"}`}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d={config.icon}/>
                </svg>
                <div className="text-[#F5F3F0] font-medium">{config.label}</div>
                <div className="text-[#A7A4B8] text-xs mb-2">{config.capacity} ppl</div>
                {date && time && (
                  <div className={`text-lg font-semibold ${getTableStatusColor(avail.available, avail.total)}`}>
                    {avail.available}/{avail.total}
                  </div>
                )}
                {!isAvailable && (
                  <div className="text-[#E63946] text-xs mt-1">Fully booked</div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Party Size - With limits based on table type */}
      <div>
        <label htmlFor="party-size" className="block text-sm font-medium text-[#F5F3F0] mb-2">
          Party Size
          <span className="text-[#A7A4B8] font-normal ml-2">
            ({getMinPartySize(tableType)}-{getMaxPartySize(tableType)} guests for {TABLE_CONFIG[tableType as keyof typeof TABLE_CONFIG].label})
          </span>
        </label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setPartySize(Math.max(getMinPartySize(tableType), partySize - 1))}
            className="w-12 h-12 rounded-full bg-[#1A1926] border border-[#242334] text-[#F5F3F0] flex items-center justify-center hover:border-[#E85D04] transition-colors duration-200 cursor-pointer"
            aria-label="Decrease party size"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13H5v-2h14v2z"/>
            </svg>
          </button>
          <span id="party-size" className="text-2xl font-bold text-[#F5F3F0] w-12 text-center">
            {partySize}
          </span>
          <button
            type="button"
            onClick={() => setPartySize(Math.min(getMaxPartySize(tableType), partySize + 1))}
            className="w-12 h-12 rounded-full bg-[#1A1926] border border-[#242334] text-[#F5F3F0] flex items-center justify-center hover:border-[#E85D04] transition-colors duration-200 cursor-pointer"
            aria-label="Increase party size"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Guest Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="guest-name" className="block text-sm font-medium text-[#F5F3F0] mb-2">
            Your Name
          </label>
          <input
            id="guest-name"
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 bg-[#1A1926] border border-[#242334] rounded-lg text-[#F5F3F0] placeholder-[#A7A4B8] focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04] outline-none transition-colors duration-200"
            required
          />
        </div>
        <div>
          <label htmlFor="guest-email" className="block text-sm font-medium text-[#F5F3F0] mb-2">
            Email Address
          </label>
          <input
            id="guest-email"
            type="email"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 bg-[#1A1926] border border-[#242334] rounded-lg text-[#F5F3F0] placeholder-[#A7A4B8] focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04] outline-none transition-colors duration-200"
            required
          />
        </div>
      </div>

      {/* Occasion */}
      <div>
        <label htmlFor="occasion" className="block text-sm font-medium text-[#F5F3F0] mb-2">
          Occasion (Optional)
        </label>
        <select
          id="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          className="w-full px-4 py-3 bg-[#1A1926] border border-[#242334] rounded-lg text-[#F5F3F0] focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04] outline-none transition-colors duration-200"
        >
          <option value="">Select occasion</option>
          <option value="date_night">Date Night</option>
          <option value="birthday">Birthday</option>
          <option value="anniversary">Anniversary</option>
          <option value="business">Business Dinner</option>
          <option value="casual">Casual Dining</option>
          <option value="celebration">Celebration</option>
        </select>
      </div>

      {/* Special Requests */}
      <div>
        <label htmlFor="special-requests" className="block text-sm font-medium text-[#F5F3F0] mb-2">
          Special Requests (Optional)
        </label>
        <textarea
          id="special-requests"
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          placeholder="Dietary restrictions, seating preferences, etc."
          rows={3}
          className="w-full px-4 py-3 bg-[#1A1926] border border-[#242334] rounded-lg text-[#F5F3F0] placeholder-[#A7A4B8] focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04] outline-none transition-colors duration-200 resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!date || !time || (availability[tableType]?.available === 0)}
        className="w-full py-4 bg-[#E85D04] text-[#F5F3F0] font-semibold rounded-lg hover:bg-[#E85D04]/90 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
          </svg>
          Book Table
        </span>
      </button>
    </form>
  );
}
