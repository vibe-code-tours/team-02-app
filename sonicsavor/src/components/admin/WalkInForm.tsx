"use client";

import { useState } from "react";

interface WalkInFormProps {
  onSubmit: (data: { tableType: string; partySize: number; guestName: string }) => void;
  disabled?: boolean;
}

const TABLE_TYPES = [
  { value: "family", label: "Family", icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75", capacity: "6-8 people" },
  { value: "squad", label: "Squad", icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75", capacity: "4 people" },
  { value: "duo", label: "Duo", icon: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z", capacity: "2 people" },
  { value: "single", label: "Single", icon: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z", capacity: "1 person" },
  { value: "private", label: "Private", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", capacity: "2-6 people" },
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
                  flex flex-col items-center p-3 rounded-lg transition-all duration-200 cursor-pointer
                  ${tableType === type.value
                    ? "bg-[#E85D04]/20 border-2 border-[#E85D04] text-[#F5F3F0]"
                    : "bg-[#0F0E17] border-2 border-transparent text-[#A7A4B8] hover:border-[#242334]"
                  }
                `}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={type.icon}/>
                </svg>
                <span className="text-xs font-medium mt-1">{type.label}</span>
                <span className="text-[10px] opacity-60">{type.capacity}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-[#A7A4B8] mb-2">Party Size</label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setPartySize(Math.max(1, partySize - 1))}
              disabled={disabled || partySize <= 1}
              className="w-10 h-10 bg-[#0F0E17] hover:bg-[#242334] text-[#F5F3F0] rounded-lg transition-colors duration-200 disabled:opacity-50 cursor-pointer"
            >
              -
            </button>
            <span className="text-2xl font-semibold text-[#F5F3F0] w-12 text-center">{partySize}</span>
            <button
              type="button"
              onClick={() => setPartySize(Math.min(8, partySize + 1))}
              disabled={disabled || partySize >= 8}
              className="w-10 h-10 bg-[#0F0E17] hover:bg-[#242334] text-[#F5F3F0] rounded-lg transition-colors duration-200 disabled:opacity-50 cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm text-[#A7A4B8] mb-2">Guest Name</label>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            disabled={disabled}
            className="w-full px-4 py-3 bg-[#0F0E17] border border-[#242334] rounded-xl text-[#F5F3F0] placeholder-[#A7A4B8] focus:outline-none focus:border-[#E85D04] transition-colors duration-200 disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={disabled}
          className="w-full py-3 bg-[#E85D04] hover:bg-[#E85D04]/90 text-[#F5F3F0] font-semibold rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Generate OTP
        </button>
      </form>
    </div>
  );
}
