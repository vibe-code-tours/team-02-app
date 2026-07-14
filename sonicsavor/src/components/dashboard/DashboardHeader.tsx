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
          <span className="text-2xl">🎵</span>
          <h1 className="text-lg font-semibold text-[#F5F3F0]">SonicSavor</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <span className="text-[#A7A4B8]">{guestName}</span>
            <span className="text-[#242334]">•</span>
            <span className="text-[#A7A4B8]">{tableInfo}</span>
            <span className="text-[#242334]">•</span>
            <span className={getTimerColor()}>
              ⏱️ {formatTime(timeRemaining)}
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
