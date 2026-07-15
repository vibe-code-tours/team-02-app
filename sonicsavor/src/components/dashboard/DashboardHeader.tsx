"use client";

interface DashboardHeaderProps {
  guestName: string;
  tableInfo: string;
  timeRemaining: number; // minutes
  onLogout: () => void;
}

export default function DashboardHeader({
  guestName,
  tableInfo,
  timeRemaining,
  onLogout,
}: DashboardHeaderProps) {
  const formatTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  const getTimerColor = () => {
    if (timeRemaining > 60) return "text-[#2EC4B6]";
    if (timeRemaining > 30) return "text-[#FFB703]";
    return "text-[#E63946]";
  };

  return (
    <header className="bg-[#1A1926] border-b border-[#242334] px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg className="w-8 h-8 text-[#E85D04]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
          <h1 className="text-lg font-semibold text-[#F5F3F0]">SonicSavor</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <span className="text-[#A7A4B8]">{guestName}</span>
            <span className="text-[#242334]">•</span>
            <span className="text-[#A7A4B8]">{tableInfo}</span>
            <span className="text-[#242334]">•</span>
            <span className={getTimerColor()}>
              <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
              </svg>
              {formatTime(timeRemaining)}
            </span>
          </div>
          <button
            onClick={onLogout}
            className="text-sm text-[#A7A4B8] hover:text-[#F5F3F0] transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
