"use client";

interface QuickActionsProps {
  onGenerateOTP: () => void;
  onCheckIn: () => void;
}

export default function QuickActions({
  onGenerateOTP,
  onCheckIn,
}: QuickActionsProps) {
  return (
    <div className="bg-[#1A1926] rounded-xl p-6 border border-[#242334]">
      <h2 className="text-sm font-semibold text-[#A7A4B8] uppercase tracking-wider mb-4">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Generate OTP Button */}
        <button
          onClick={onGenerateOTP}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-[#E85D04] hover:bg-[#E85D04]/90 text-[#F5F3F0] font-semibold rounded-xl transition-all"
        >
          <span className="text-xl">🔑</span>
          Generate OTP
        </button>

        {/* Check In Button */}
        <button
          onClick={onCheckIn}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-[#2EC4B6] hover:bg-[#2EC4B6]/90 text-[#0F0E17] font-semibold rounded-xl transition-all"
        >
          <span className="text-xl">📋</span>
          Check In Booking
        </button>
      </div>
    </div>
  );
}
