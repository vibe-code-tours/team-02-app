"use client";

import { useState, useEffect } from "react";
import { TABLE_CONFIG, getTableAvailability, getMaxPartySize, getMinPartySize } from "@/lib/table-availability";
import CalendarPopup from "@/components/ui/CalendarPopup";

interface TableSelectorProps {
  onConfirm: (booking: {
    date: string;
    time: string;
    tableType: string;
    partySize: number;
    guestName: string;
    guestPhone: string;
  }) => void;
  guestName: string;
  guestPhone: string;
}

const TIME_SLOTS = [
  { value: "17:00", label: "5:00 PM" },
  { value: "17:30", label: "5:30 PM" },
  { value: "18:00", label: "6:00 PM" },
  { value: "18:30", label: "6:30 PM" },
  { value: "19:00", label: "7:00 PM" },
  { value: "19:30", label: "7:30 PM" },
  { value: "20:00", label: "8:00 PM" },
  { value: "20:30", label: "8:30 PM" },
  { value: "21:00", label: "9:00 PM" },
];

const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8];

export default function TableSelector({ onConfirm, guestName, guestPhone }: TableSelectorProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedTime, setSelectedTime] = useState("19:00");
  const [partySize, setPartySize] = useState(4);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [availability, setAvailability] = useState<{ [key: string]: { total: number; available: number } }>({});

  useEffect(() => {
    const avail = getTableAvailability(selectedDate, selectedTime);
    setAvailability(avail);
  }, [selectedDate, selectedTime]);

  const getAvailabilityDots = (available: number, total: number) => {
    const dots = [];
    for (let i = 0; i < total; i++) {
      dots.push(
        <span
          key={i}
          className={`w-2 h-2 rounded-full ${
            i < available ? "bg-[#2EC4B6]" : "bg-[#242334]"
          }`}
        />
      );
    }
    return dots;
  };

  const getStatusColor = (available: number, total: number) => {
    const ratio = available / total;
    if (ratio > 0.5) return "text-[#2EC4B6]";
    if (ratio > 0) return "text-[#FFB703]";
    return "text-[#E63946]";
  };

  const isTableTypeAvailable = (type: string) => {
    const avail = availability[type];
    if (!avail || avail.available === 0) return false;

    const min = getMinPartySize(type);
    const max = getMaxPartySize(type);
    return partySize >= min && partySize <= max;
  };

  const getBestMatch = () => {
    for (const type of ["squad", "duo", "family", "private", "single"]) {
      if (isTableTypeAvailable(type)) {
        const max = getMaxPartySize(type);
        if (partySize <= max) return type;
      }
    }
    return null;
  };

  const bestMatch = getBestMatch();

  const handleReserve = () => {
    if (!selectedType) return;

    onConfirm({
      date: selectedDate,
      time: selectedTime,
      tableType: selectedType,
      partySize,
      guestName,
      guestPhone,
    });
  };

  return (
    <div className="space-y-6">
      {/* Date, Time, Party Size */}
      <div className="bg-[#1A1926] border border-[#242334] rounded-2xl p-6">
        <h3 className="text-[#F5F3F0] font-semibold text-lg mb-4">When & How Many?</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Date */}
          <div>
            <label className="block text-[#A7A4B8] text-sm mb-2">Date</label>
            <CalendarPopup value={selectedDate} onChange={setSelectedDate} />
          </div>

          {/* Time */}
          <div>
            <label className="block text-[#A7A4B8] text-sm mb-2">Time</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-4 py-3 bg-[#0F0E17] border border-[#242334] rounded-xl text-[#F5F3F0] focus:border-[#E85D04] outline-none cursor-pointer transition-colors duration-200"
            >
              {TIME_SLOTS.map((slot) => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </select>
          </div>

          {/* Party Size */}
          <div>
            <label className="block text-[#A7A4B8] text-sm mb-2">Party Size</label>
            <select
              value={partySize}
              onChange={(e) => setPartySize(Number(e.target.value))}
              className="w-full px-4 py-3 bg-[#0F0E17] border border-[#242334] rounded-xl text-[#F5F3F0] focus:border-[#E85D04] outline-none cursor-pointer transition-colors duration-200"
            >
              {PARTY_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size} {size === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table Type Grid */}
      <div>
        <h3 className="text-[#F5F3F0] font-semibold text-lg mb-4">Choose Your Experience</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Family Table */}
          <div
            onClick={() => isTableTypeAvailable("family") && setSelectedType("family")}
            className={`bg-[#1A1926] border-2 rounded-2xl p-6 transition-all duration-200 ${
              isTableTypeAvailable("family")
                ? selectedType === "family"
                  ? "border-[#E85D04] cursor-pointer"
                  : "border-[#242334] hover:border-[#E85D04]/50 cursor-pointer"
                : "border-[#242334] opacity-50 cursor-not-allowed"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-[#F5F3F0] font-semibold text-lg">Family Table</h4>
                <p className="text-[#A7A4B8] text-sm">6-8 people</p>
              </div>
              {bestMatch === "family" && (
                <span className="bg-[#E85D04] text-[#F5F3F0] text-xs font-medium px-2 py-1 rounded-full">
                  BEST MATCH
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {getAvailabilityDots(availability["family"]?.available || 0, 5)}
              </div>
              <span className={`text-sm ${getStatusColor(availability["family"]?.available || 0, 5)}`}>
                {availability["family"]?.available || 0} of 5 open
              </span>
            </div>

            <button
              disabled={!isTableTypeAvailable("family")}
              className={`w-full py-3 rounded-xl font-medium transition-all duration-200 ${
                isTableTypeAvailable("family")
                  ? selectedType === "family"
                    ? "bg-[#E85D04] text-[#F5F3F0]"
                    : "bg-[#242334] text-[#F5F3F0] hover:bg-[#E85D04]"
                  : "bg-[#242334] text-[#A7A4B8] cursor-not-allowed"
              }`}
            >
              {isTableTypeAvailable("family")
                ? selectedType === "family"
                  ? "Selected"
                  : "Reserve"
                : "Fully Booked"}
            </button>
          </div>

          {/* Squad Table */}
          <div
            onClick={() => isTableTypeAvailable("squad") && setSelectedType("squad")}
            className={`bg-[#1A1926] border-2 rounded-2xl p-6 transition-all duration-200 ${
              isTableTypeAvailable("squad")
                ? selectedType === "squad"
                  ? "border-[#E85D04] cursor-pointer"
                  : "border-[#242334] hover:border-[#E85D04]/50 cursor-pointer"
                : "border-[#242334] opacity-50 cursor-not-allowed"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-[#F5F3F0] font-semibold text-lg">Squad Table</h4>
                <p className="text-[#A7A4B8] text-sm">4 people</p>
              </div>
              {bestMatch === "squad" && (
                <span className="bg-[#E85D04] text-[#F5F3F0] text-xs font-medium px-2 py-1 rounded-full">
                  BEST MATCH
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {getAvailabilityDots(availability["squad"]?.available || 0, 5)}
              </div>
              <span className={`text-sm ${getStatusColor(availability["squad"]?.available || 0, 5)}`}>
                {availability["squad"]?.available || 0} of 5 open
              </span>
            </div>

            <button
              disabled={!isTableTypeAvailable("squad")}
              className={`w-full py-3 rounded-xl font-medium transition-all duration-200 ${
                isTableTypeAvailable("squad")
                  ? selectedType === "squad"
                    ? "bg-[#E85D04] text-[#F5F3F0]"
                    : "bg-[#242334] text-[#F5F3F0] hover:bg-[#E85D04]"
                  : "bg-[#242334] text-[#A7A4B8] cursor-not-allowed"
              }`}
            >
              {isTableTypeAvailable("squad")
                ? selectedType === "squad"
                  ? "Selected"
                  : "Reserve"
                : "Fully Booked"}
            </button>
          </div>

          {/* Duo Table */}
          <div
            onClick={() => isTableTypeAvailable("duo") && setSelectedType("duo")}
            className={`bg-[#1A1926] border-2 rounded-2xl p-6 transition-all duration-200 ${
              isTableTypeAvailable("duo")
                ? selectedType === "duo"
                  ? "border-[#E85D04] cursor-pointer"
                  : "border-[#242334] hover:border-[#E85D04]/50 cursor-pointer"
                : "border-[#242334] opacity-50 cursor-not-allowed"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-[#F5F3F0] font-semibold text-lg">Duo Table</h4>
                <p className="text-[#A7A4B8] text-sm">2 people</p>
              </div>
              {bestMatch === "duo" && (
                <span className="bg-[#E85D04] text-[#F5F3F0] text-xs font-medium px-2 py-1 rounded-full">
                  BEST MATCH
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {getAvailabilityDots(availability["duo"]?.available || 0, 4)}
              </div>
              <span className={`text-sm ${getStatusColor(availability["duo"]?.available || 0, 4)}`}>
                {availability["duo"]?.available || 0} of 4 open
              </span>
            </div>

            <button
              disabled={!isTableTypeAvailable("duo")}
              className={`w-full py-3 rounded-xl font-medium transition-all duration-200 ${
                isTableTypeAvailable("duo")
                  ? selectedType === "duo"
                    ? "bg-[#E85D04] text-[#F5F3F0]"
                    : "bg-[#242334] text-[#F5F3F0] hover:bg-[#E85D04]"
                  : "bg-[#242334] text-[#A7A4B8] cursor-not-allowed"
              }`}
            >
              {isTableTypeAvailable("duo")
                ? selectedType === "duo"
                  ? "Selected"
                  : "Reserve"
                : "Fully Booked"}
            </button>
          </div>

          {/* Solo Table */}
          <div
            onClick={() => isTableTypeAvailable("single") && setSelectedType("single")}
            className={`bg-[#1A1926] border-2 rounded-2xl p-6 transition-all duration-200 ${
              isTableTypeAvailable("single")
                ? selectedType === "single"
                  ? "border-[#E85D04] cursor-pointer"
                  : "border-[#242334] hover:border-[#E85D04]/50 cursor-pointer"
                : "border-[#242334] opacity-50 cursor-not-allowed"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-[#F5F3F0] font-semibold text-lg">Solo Table</h4>
                <p className="text-[#A7A4B8] text-sm">1 person</p>
              </div>
              {bestMatch === "single" && (
                <span className="bg-[#E85D04] text-[#F5F3F0] text-xs font-medium px-2 py-1 rounded-full">
                  BEST MATCH
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {getAvailabilityDots(availability["single"]?.available || 0, 4)}
              </div>
              <span className={`text-sm ${getStatusColor(availability["single"]?.available || 0, 4)}`}>
                {availability["single"]?.available || 0} of 4 open
              </span>
            </div>

            <button
              disabled={!isTableTypeAvailable("single")}
              className={`w-full py-3 rounded-xl font-medium transition-all duration-200 ${
                isTableTypeAvailable("single")
                  ? selectedType === "single"
                    ? "bg-[#E85D04] text-[#F5F3F0]"
                    : "bg-[#242334] text-[#F5F3F0] hover:bg-[#E85D04]"
                  : "bg-[#242334] text-[#A7A4B8] cursor-not-allowed"
              }`}
            >
              {isTableTypeAvailable("single")
                ? selectedType === "single"
                  ? "Selected"
                  : "Reserve"
                : "Fully Booked"}
            </button>
          </div>

          {/* Private Room - Full Width */}
          <div
            onClick={() => isTableTypeAvailable("private") && setSelectedType("private")}
            className={`bg-[#1A1926] border-2 rounded-2xl p-6 md:col-span-2 transition-all duration-200 ${
              isTableTypeAvailable("private")
                ? selectedType === "private"
                  ? "border-[#9D4EDD] cursor-pointer"
                  : "border-[#242334] hover:border-[#9D4EDD]/50 cursor-pointer"
                : "border-[#242334] opacity-50 cursor-not-allowed"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-[#F5F3F0] font-semibold text-lg">Private Room</h4>
                <p className="text-[#A7A4B8] text-sm">2-6 people • Intimate dining experience</p>
              </div>
              {bestMatch === "private" && (
                <span className="bg-[#9D4EDD] text-[#F5F3F0] text-xs font-medium px-2 py-1 rounded-full">
                  BEST MATCH
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {getAvailabilityDots(availability["private"]?.available || 0, 4)}
              </div>
              <span className={`text-sm ${getStatusColor(availability["private"]?.available || 0, 4)}`}>
                {availability["private"]?.available || 0} of 4 open
              </span>
            </div>

            <button
              disabled={!isTableTypeAvailable("private")}
              className={`w-full py-3 rounded-xl font-medium transition-all duration-200 ${
                isTableTypeAvailable("private")
                  ? selectedType === "private"
                    ? "bg-[#9D4EDD] text-[#F5F3F0]"
                    : "bg-[#242334] text-[#F5F3F0] hover:bg-[#9D4EDD]"
                  : "bg-[#242334] text-[#A7A4B8] cursor-not-allowed"
              }`}
            >
              {isTableTypeAvailable("private")
                ? selectedType === "private"
                  ? "Selected"
                  : "Reserve Private"
                : "Fully Booked"}
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      {selectedType && (
        <button
          onClick={handleReserve}
          className="w-full bg-[#E85D04] hover:bg-[#E85D04]/90 text-[#F5F3F0] font-semibold py-4 rounded-xl transition-all duration-200 cursor-pointer"
        >
          Confirm Reservation
        </button>
      )}
    </div>
  );
}
