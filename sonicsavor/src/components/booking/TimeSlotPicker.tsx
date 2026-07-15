"use client";

interface TimeSlotPickerProps {
  selectedTime: string;
  onSelect: (time: string) => void;
}

const TIME_SLOTS = [
  { time: "17:00", label: "5:00 PM", available: true },
  { time: "17:30", label: "5:30 PM", available: true },
  { time: "18:00", label: "6:00 PM", available: false },
  { time: "18:30", label: "6:30 PM", available: true },
  { time: "19:00", label: "7:00 PM", available: true },
  { time: "19:30", label: "7:30 PM", available: false },
  { time: "20:00", label: "8:00 PM", available: true },
  { time: "20:30", label: "8:30 PM", available: true },
  { time: "21:00", label: "9:00 PM", available: true },
];

export default function TimeSlotPicker({
  selectedTime,
  onSelect,
}: TimeSlotPickerProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-[#F5F3F0]">Available Times</h3>
      <div className="grid grid-cols-3 gap-2">
        {TIME_SLOTS.map((slot) => (
          <button
            key={slot.time}
            type="button"
            onClick={() => slot.available && onSelect(slot.time)}
            disabled={!slot.available}
            className={`py-3 px-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              slot.available
                ? selectedTime === slot.time
                  ? "bg-[#E85D04] text-[#F5F3F0] cursor-pointer"
                  : "bg-[#1A1926] border border-[#242334] text-[#F5F3F0] hover:border-[#E85D04] cursor-pointer"
                : "bg-[#1A1926] border border-[#242334] text-[#A7A4B8] opacity-50 cursor-not-allowed"
            }`}
            aria-label={`${slot.label} ${slot.available ? "available" : "unavailable"}`}
            aria-pressed={selectedTime === slot.time}
          >
            {slot.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4 text-xs text-[#A7A4B8]">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-[#E85D04]"></span> Selected
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-[#1A1926] border border-[#242334]"></span> Available
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-[#1A1926] border border-[#242334] opacity-50"></span> Unavailable
        </span>
      </div>
    </div>
  );
}
