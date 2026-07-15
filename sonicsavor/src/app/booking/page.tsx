"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PublicHeader from "@/components/layout/PublicHeader";
import Footer from "@/components/layout/Footer";
import DatePicker from "@/components/ui/DatePicker";

// Aligned with table-booking-system.md (22 tables total)
const TABLE_TYPES = [
  { key: "family", label: "Family", capacity: "6-8 people", count: 5, minSize: 6, maxSize: 8 },
  { key: "squad", label: "Squad", capacity: "4 people", count: 5, minSize: 3, maxSize: 4 },
  { key: "duo", label: "Duo", capacity: "2 people", count: 4, minSize: 2, maxSize: 2 },
  { key: "single", label: "Single", capacity: "1 person", count: 4, minSize: 1, maxSize: 1 },
  { key: "private", label: "Private", capacity: "2-6 people", count: 4, minSize: 2, maxSize: 6 },
];

const TIME_SLOTS = [
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
];

export default function BookingPage() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [guestName, setGuestName] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // Filter table types based on party size
  const availableTypes = TABLE_TYPES.filter(
    (t) => partySize >= t.minSize && partySize <= t.maxSize
  );

  const getTableIcon = (key: string) => {
    switch (key) {
      case "family":
        return (
          <svg className="w-6 h-6 text-[#E85D04]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
        );
      case "squad":
        return (
          <svg className="w-6 h-6 text-[#E85D04]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
        );
      case "duo":
        return (
          <svg className="w-6 h-6 text-[#E85D04]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        );
      case "single":
        return (
          <svg className="w-6 h-6 text-[#E85D04]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        );
      case "private":
        return (
          <svg className="w-6 h-6 text-[#E85D04]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const handleBooking = () => {
    // TODO: Call API to create booking
    console.log("Booking:", { date, partySize, selectedType, selectedTime, guestName, specialRequests });
    alert(`Booking confirmed!\n\nDate: ${date}\nTime: ${selectedTime}\nTable: ${selectedType}\nParty: ${partySize} people\nName: ${guestName}`);
    router.push("/dashboard");
  };

  const isValid = date && selectedType && selectedTime && guestName.trim() !== "";

  return (
    <main className="min-h-screen bg-[#0F0E17] flex flex-col">
      <PublicHeader />

      <div className="flex-1 p-4 pt-20 pb-24">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#F5F3F0] mb-2">Book a Table</h1>
            <p className="text-[#A7A4B8]">Select date, time, and table type</p>
          </div>

          {/* All-in-One Form */}
          <div className="space-y-6">
            {/* Date & Party Size */}
            <div className="bg-[#1A1926] border border-[#242334] rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-[#F5F3F0]">Date & Party Size</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Date Picker */}
                <DatePicker
                  value={date}
                  onChange={(d) => { setDate(d); setSelectedType(null); }}
                  min={new Date().toISOString().split("T")[0]}
                  label="Select Date"
                />

                {/* Party Size */}
                <div>
                  <label className="block text-sm text-[#A7A4B8] mb-2">Party Size</label>
                  <div className="flex gap-2 flex-wrap">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                      <button
                        key={size}
                        onClick={() => { setPartySize(size); setSelectedType(null); }}
                        className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E85D04] ${
                          partySize === size
                            ? "bg-[#E85D04] text-[#F5F3F0]"
                            : "bg-[#0F0E17] border border-[#242334] text-[#A7A4B8] hover:border-[#E85D04]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Table Type */}
            <div className="bg-[#1A1926] border border-[#242334] rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-[#F5F3F0]">Table Type</h2>
              <p className="text-sm text-[#A7A4B8]">For {partySize} {partySize === 1 ? "person" : "people"}</p>

              <div className="grid sm:grid-cols-2 gap-3">
                {availableTypes.map((type) => (
                  <button
                    key={type.key}
                    onClick={() => setSelectedType(type.key)}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E85D04] ${
                      selectedType === type.key
                        ? "border-[#E85D04] bg-[#E85D04]/10"
                        : "border-[#242334] bg-[#0F0E17] hover:border-[#E85D04]/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {getTableIcon(type.key)}
                      <div className="flex-1">
                        <div className="font-semibold text-[#F5F3F0]">{type.label}</div>
                        <div className="text-xs text-[#A7A4B8]">{type.capacity}</div>
                      </div>
                      <div className={`text-lg font-semibold ${
                        type.count > 2 ? "text-[#2EC4B6]" : type.count > 0 ? "text-[#FFB703]" : "text-[#E63946]"
                      }`}>
                        {type.count}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time & Details */}
            <div className="bg-[#1A1926] border border-[#242334] rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-[#F5F3F0]">Time & Details</h2>

              {/* Time Slots */}
              <div>
                <label className="block text-sm text-[#A7A4B8] mb-2">Select Time</label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {TIME_SLOTS.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E85D04] ${
                        selectedTime === time
                          ? "bg-[#E85D04] text-[#F5F3F0]"
                          : "bg-[#0F0E17] border border-[#242334] text-[#A7A4B8] hover:border-[#E85D04]"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Name */}
              <div>
                <label className="block text-sm text-[#A7A4B8] mb-2">Your Name</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-[#0F0E17] border border-[#242334] rounded-xl text-[#F5F3F0] placeholder-[#A7A4B8] focus:outline-none focus:border-[#E85D04] focus:ring-2 focus:ring-[#E85D04]/20 transition-all min-h-[44px]"
                />
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-sm text-[#A7A4B8] mb-2">Special Requests (optional)</label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Anniversary, dietary needs, etc."
                  rows={3}
                  className="w-full px-4 py-3 bg-[#0F0E17] border border-[#242334] rounded-xl text-[#F5F3F0] placeholder-[#A7A4B8] focus:outline-none focus:border-[#E85D04] focus:ring-2 focus:ring-[#E85D04]/20 transition-all resize-none min-h-[44px]"
                />
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleBooking}
              disabled={!isValid}
              className="w-full py-4 px-6 bg-[#2EC4B6] hover:bg-[#2EC4B6]/90 disabled:bg-[#242334] disabled:text-[#A7A4B8] text-[#0F0E17] font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2EC4B6] focus:ring-offset-2 focus:ring-offset-[#0F0E17] disabled:cursor-not-allowed min-h-[44px] text-lg"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
