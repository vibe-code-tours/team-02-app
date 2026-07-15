"use client";

interface AdminHeaderProps {
  staffName: string;
  onLogout: () => void;
}

export default function AdminHeader({ staffName, onLogout }: AdminHeaderProps) {
  return (
    <header className="bg-[#1A1926] border-b border-[#242334] px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-[#E85D04]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
          <div>
            <h1 className="text-lg font-semibold text-[#F5F3F0]">SonicSavor</h1>
            <p className="text-xs text-[#A7A4B8]">Staff Panel</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#2EC4B6]"></div>
            <span className="text-sm text-[#A7A4B8]">{staffName}</span>
          </div>
          <button
            onClick={onLogout}
            className="text-sm text-[#A7A4B8] hover:text-[#F5F3F0] transition-colors duration-200 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
