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
        <button
          onClick={onGenerateOTP}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-[#E85D04] hover:bg-[#E85D04]/90 text-[#F5F3F0] font-semibold rounded-xl transition-all duration-200 cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
          </svg>
          Generate OTP
        </button>

        <button
          onClick={onCheckIn}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-[#2EC4B6] hover:bg-[#2EC4B6]/90 text-[#0F0E17] font-semibold rounded-xl transition-all duration-200 cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 11l3 3L22 4"/>
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
          </svg>
          Check In Booking
        </button>
      </div>
    </div>
  );
}
