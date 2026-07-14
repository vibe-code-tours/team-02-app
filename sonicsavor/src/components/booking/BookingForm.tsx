"use client";

import { useState } from "react";

const TABLE_TYPES = [
  {
    id: "private",
    name: "Private",
    capacity: "2-6 guests",
    features: ["Soundproof", "Dedicated speaker"],
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
  },
  {
    id: "family",
    name: "Family",
    capacity: "6-8 guests",
    features: ["Large table", "Kids friendly"],
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>
    ),
  },
  {
    id: "squad",
    name: "Squad",
    capacity: "3-4 guests",
    features: ["Central location", "Booth seating"],
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    ),
  },
  {
    id: "duo",
    name: "Duo",
    capacity: "2 guests",
    features: ["Window seat", "Candle lit"],
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    ),
  },
  {
    id: "single",
    name: "Solo",
    capacity: "1 guest",
    features: ["Corner seat", "Power outlet"],
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    ),
  },
];

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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Table Type Selection */}
      <div>
        <label className="block text-sm font-medium text-[#FFFFFE] mb-3">
          Select Table Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {TABLE_TYPES.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setTableType(type.id)}
              className={`p-4 rounded-lg border-2 transition-colors duration-200 cursor-pointer ${
                tableType === type.id
                  ? "border-[#E85D04] bg-[#E85D04]/10"
                  : "border-[#232946] bg-[#1A1A2E] hover:border-[#E85D04]/50"
              }`}
              aria-pressed={tableType === type.id}
            >
              <div className="text-[#E85D04] mb-2">{type.icon}</div>
              <div className="text-[#FFFFFE] font-medium">{type.name}</div>
              <div className="text-[#94A1B2] text-xs">{type.capacity}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="booking-date" className="block text-sm font-medium text-[#FFFFFE] mb-2">
            Date
          </label>
          <input
            id="booking-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 bg-[#1A1A2E] border border-[#232946] rounded-lg text-[#FFFFFE] focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04] outline-none transition-colors duration-200"
            required
          />
        </div>
        <div>
          <label htmlFor="booking-time" className="block text-sm font-medium text-[#FFFFFE] mb-2">
            Time
          </label>
          <select
            id="booking-time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-3 bg-[#1A1A2E] border border-[#232946] rounded-lg text-[#FFFFFE] focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04] outline-none transition-colors duration-200"
            required
          >
            <option value="">Select time</option>
            <option value="17:00">5:00 PM</option>
            <option value="17:30">5:30 PM</option>
            <option value="18:00">6:00 PM</option>
            <option value="18:30">6:30 PM</option>
            <option value="19:00">7:00 PM</option>
            <option value="19:30">7:30 PM</option>
            <option value="20:00">8:00 PM</option>
            <option value="20:30">8:30 PM</option>
            <option value="21:00">9:00 PM</option>
          </select>
        </div>
      </div>

      {/* Party Size */}
      <div>
        <label htmlFor="party-size" className="block text-sm font-medium text-[#FFFFFE] mb-2">
          Party Size
        </label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setPartySize(Math.max(1, partySize - 1))}
            className="w-12 h-12 rounded-full bg-[#1A1A2E] border border-[#232946] text-[#FFFFFE] flex items-center justify-center hover:border-[#E85D04] transition-colors duration-200 cursor-pointer"
            aria-label="Decrease party size"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13H5v-2h14v2z"/>
            </svg>
          </button>
          <span id="party-size" className="text-2xl font-bold text-[#FFFFFE] w-12 text-center">
            {partySize}
          </span>
          <button
            type="button"
            onClick={() => setPartySize(Math.min(8, partySize + 1))}
            className="w-12 h-12 rounded-full bg-[#1A1A2E] border border-[#232946] text-[#FFFFFE] flex items-center justify-center hover:border-[#E85D04] transition-colors duration-200 cursor-pointer"
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
          <label htmlFor="guest-name" className="block text-sm font-medium text-[#FFFFFE] mb-2">
            Your Name
          </label>
          <input
            id="guest-name"
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 bg-[#1A1A2E] border border-[#232946] rounded-lg text-[#FFFFFE] placeholder-[#94A1B2] focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04] outline-none transition-colors duration-200"
            required
          />
        </div>
        <div>
          <label htmlFor="guest-email" className="block text-sm font-medium text-[#FFFFFE] mb-2">
            Email Address
          </label>
          <input
            id="guest-email"
            type="email"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 bg-[#1A1A2E] border border-[#232946] rounded-lg text-[#FFFFFE] placeholder-[#94A1B2] focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04] outline-none transition-colors duration-200"
            required
          />
        </div>
      </div>

      {/* Occasion */}
      <div>
        <label htmlFor="occasion" className="block text-sm font-medium text-[#FFFFFE] mb-2">
          Occasion (Optional)
        </label>
        <select
          id="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          className="w-full px-4 py-3 bg-[#1A1A2E] border border-[#232946] rounded-lg text-[#FFFFFE] focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04] outline-none transition-colors duration-200"
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
        <label htmlFor="special-requests" className="block text-sm font-medium text-[#FFFFFE] mb-2">
          Special Requests (Optional)
        </label>
        <textarea
          id="special-requests"
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          placeholder="Dietary restrictions, seating preferences, etc."
          rows={3}
          className="w-full px-4 py-3 bg-[#1A1A2E] border border-[#232946] rounded-lg text-[#FFFFFE] placeholder-[#94A1B2] focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04] outline-none transition-colors duration-200 resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 bg-[#E85D04] text-[#FFFFFE] font-semibold rounded-lg hover:bg-[#E85D04]/90 transition-colors duration-200 cursor-pointer"
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
