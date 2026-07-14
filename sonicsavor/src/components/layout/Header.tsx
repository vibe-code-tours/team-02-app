"use client";

interface HeaderProps {
  guestName?: string;
  tableInfo?: string;
  timeRemaining?: number;
  onLogout?: () => void;
}

export default function Header({
  guestName,
  tableInfo,
  timeRemaining,
  onLogout,
}: HeaderProps) {
  const formatTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  const getTimerColor = () => {
    if (!timeRemaining) return "text-[#A7A4B8]";
    if (timeRemaining > 60) return "text-[#2EC4B6]";
    if (timeRemaining > 30) return "text-[#FFB703]";
    return "text-[#E63946]";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F0E17]/90 backdrop-blur-md border-b border-[#242334]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-[#E85D04]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
          <span className="text-lg font-semibold text-[#F5F3F0]">SonicSavor</span>
        </div>

        {/* Right side - session info */}
        {guestName && (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-[#A7A4B8]">{guestName}</span>
              {tableInfo && (
                <>
                  <span className="text-[#242334]">•</span>
                  <span className="text-[#A7A4B8]">{tableInfo}</span>
                </>
              )}
              {timeRemaining !== undefined && (
                <>
                  <span className="text-[#242334]">•</span>
                  <span className={getTimerColor()}>{formatTime(timeRemaining)}</span>
                </>
              )}
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                className="text-sm text-[#A7A4B8] hover:text-[#F5F3F0] transition-colors duration-200 cursor-pointer"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
