"use client";

import { useState, useEffect } from "react";
import { TABLE_CONFIG, getTableAvailability } from "@/lib/table-availability";

interface TableAvailabilityWidgetProps {
  onSelectType: (type: string) => void;
}

export default function TableAvailabilityWidget({ onSelectType }: TableAvailabilityWidgetProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedTime, setSelectedTime] = useState("19:00");
  const [availability, setAvailability] = useState<{ [key: string]: { total: number; available: number } }>({});

  useEffect(() => {
    const avail = getTableAvailability(selectedDate, selectedTime);
    setAvailability(avail);
  }, [selectedDate, selectedTime]);

  const getStatusColor = (available: number, total: number) => {
    const ratio = available / total;
    if (ratio > 0.5) return "text-[#2EC4B6]";
    if (ratio > 0) return "text-[#FFB703]";
    return "text-[#E63946]";
  };

  const getStatusBg = (available: number, total: number) => {
    const ratio = available / total;
    if (ratio > 0.5) return "bg-[#2EC4B6]/10";
    if (ratio > 0) return "bg-[#FFB703]/10";
    return "bg-[#E63946]/10";
  };

  return (
    <div className="bg-[#1A1926] rounded-xl p-6 border border-[#242334]">
      <h2 className="text-sm font-semibold text-[#A7A4B8] uppercase tracking-wider mb-4">
        Table Availability
      </h2>

      {/* Date & Time Selection */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs text-[#A7A4B8] mb-1">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-3 py-2 bg-[#0F0E17] border border-[#242334] rounded-lg text-[#F5F3F0] text-sm focus:border-[#E85D04] outline-none"
          />
        </div>
        <div>
          <label className="block text-xs text-[#A7A4B8] mb-1">Time</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full px-3 py-2 bg-[#0F0E17] border border-[#242334] rounded-lg text-[#F5F3F0] text-sm focus:border-[#E85D04] outline-none"
          >
            <option value="17:00">5:00 PM</option>
            <option value="18:00">6:00 PM</option>
            <option value="19:00">7:00 PM</option>
            <option value="20:00">8:00 PM</option>
            <option value="21:00">9:00 PM</option>
          </select>
        </div>
      </div>

      {/* Table Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {Object.entries(TABLE_CONFIG).map(([key, config]) => {
          const avail = availability[key] || { total: config.total, available: config.total };
          const isAvailable = avail.available > 0;

          return (
            <button
              key={key}
              onClick={() => isAvailable && onSelectType(key)}
              disabled={!isAvailable}
              className={`
                p-4 rounded-xl border border-[#242334] transition-all duration-200
                ${isAvailable
                  ? "cursor-pointer hover:border-[#E85D04]/50 hover:bg-[#242334]/50"
                  : "opacity-50 cursor-not-allowed"
                }
                ${getStatusBg(avail.available, avail.total)}
              `}
            >
              <svg className="w-8 h-8 mx-auto mb-2 text-[#A7A4B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={config.icon}/>
              </svg>
              <div className="font-medium text-[#F5F3F0] text-sm">{config.label}</div>
              <div className="text-xs text-[#A7A4B8] mb-2">{config.capacity} ppl</div>
              <div className={`text-lg font-semibold ${getStatusColor(avail.available, avail.total)}`}>
                {avail.available}/{avail.total}
              </div>
              <div className="text-[10px] text-[#A7A4B8]">free</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
