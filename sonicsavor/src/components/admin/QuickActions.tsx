"use client";

interface QuickActionsProps {
  onGenerateOTP: () => void;
  onShowTableMap: () => void;
}

export default function QuickActions({
  onGenerateOTP,
  onShowTableMap,
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
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
          </svg>
          Generate OTP
        </button>

        {/* Table Map Button */}
        <button
          onClick={onShowTableMap}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-[#9D4EDD] hover:bg-[#9D4EDD]/90 text-[#F5F3F0] font-semibold rounded-xl transition-all"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 7h2v2H7V7zm0 4h2v2H7v-2zm0 4h2v2H7v-2zm4-8h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6v-2z"/>
          </svg>
          Table Map
        </button>
      </div>
    </div>
  );
}
