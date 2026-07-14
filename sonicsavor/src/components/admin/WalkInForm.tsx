"use client";

import { useState } from "react";

interface WalkInFormProps {
  onSubmit: (data: {
    tableType: string;
    partySize: number;
    guestName: string;
  }) => void;
  disabled?: boolean;
}

const TABLE_TYPES = [
  { value: "family", label: "Family", icon: "👨‍👩‍👧‍👦", capacity: "6-8 people" },
  { value: "squad", label: "Squad", icon: "🧑‍🤝‍🧑", capacity: "4 people" },
  { value: "duo", label: "Duo", icon: "💑", capacity: "2 people" },
  { value: "single", label: "Single", icon: "🧑", capacity: "1 person" },
  { value: "private", label: "Private", icon: "🔒", capacity: "2-6 people" },
];

export default function WalkInForm({ onSubmit, disabled = false }: WalkInFormProps) {
  const [tableType, setTableType] = useState("private");
  const [partySize, setPartySize] = useState(4);
  const [guestName, setGuestName] = useState("Walk-in Guest");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    onSubmit({ tableType, partySize, guestName });
  };

  return (
    <div className="bg-[#1A1926] rounded-xl p-6 border border-[#242334]">
      <h2 className="text-sm font-semibold text-[#A7A4B8] uppercase tracking-wider mb-4">
        Walk-in Customer
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Table Type */}
        <div>
          <label className="block text-sm text-[#A7A4B8] mb-2">Table Type</label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {TABLE_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setTableType(type.value)}
                disabled={disabled}
                className={`
                  flex flex-col items-center p-3 rounded-lg transition-all
                  ${tableType === type.value
                    ? "bg-[#E85D04]/20 border-2 border-[#E85D04] text-[#F5F3F0]"
                    : "bg-[#0F0E17] border-2 border-transparent text-[#A7A4B8] hover:border-[#242334]"
                  }
                `}
              >
                <span className="text-2xl">{type.icon}</span>
                <span className="text-xs font-medium mt-1">{type.label}</span>
                <span className="text-[10px] opacity-60">{type.capacity}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Party Size */}
        <div>
          <label className="block text-sm text-[#A7A4B8] mb-2">Party Size</label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setPartySize(Math.max(1, partySize - 1))}
              disabled={disabled || partySize <= 1}
              className="w-10 h-10 bg-[#0F0E17] hover:bg-[#242334] text-[#F5F3F0] rounded-lg transition-colors disabled:opacity-50"
            >
              -
            </button>
            <span className="text-2xl font-semibold text-[#F5F3F0] w-12 text-center">
              {partySize}
            </span>
            <button
              type="button"
              onClick={() => setPartySize(Math.min(8, partySize + 1))}
              disabled={disabled || partySize >= 8}
              className="w-10 h-10 bg-[#0F0E17] hover:bg-[#242334] text-[#F5F3F0] rounded-lg transition-colors disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>

        {/* Guest Name */}
        <div>
          <label className="block text-sm text-[#A7A4B8] mb-2">Guest Name</label>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            disabled={disabled}
            className="w-full px-4 py-3 bg-[#0F0E17] border border-[#242334] rounded-xl text-[#F5F3F0] placeholder-[#A7A4B8] focus:outline-none focus:border-[#E85D04] transition-colors disabled:opacity-50"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={disabled}
          className="w-full py-3 bg-[#E85D04] hover:bg-[#E85D04]/90 text-[#F5F3F0] font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🔑 Generate OTP
        </button>
      </form>
    </div>
  );
}
