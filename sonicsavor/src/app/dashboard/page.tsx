"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import QuickAccessCards from "@/components/dashboard/QuickAccessCards";
import TableAvailabilityWidget from "@/components/dashboard/TableAvailabilityWidget";

const MOCK_AVAILABILITY = {
  family: { total: 5, available: 3 },
  squad: { total: 5, available: 4 },
  duo: { total: 4, available: 2 },
  single: { total: 4, available: 4 },
  private: { total: 4, available: 1 },
};

export default function DashboardPage() {
  const [guestName] = useState("Sarah Chen");
  const [tableInfo] = useState("Private Table 2");
  const [timeRemaining] = useState(180);

  const handleNavigate = (page: "booking" | "menu") => {
    console.log("Navigating to:", page);
    window.location.href = `/${page}`;
  };

  const handleSelectType = (type: string) => {
    console.log("Selected table type:", type);
    window.location.href = `/booking?type=${type}`;
  };

  const handleLogout = () => {
    console.log("Logging out...");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#0F0E17]">
      <DashboardHeader
        guestName={guestName}
        tableInfo={tableInfo}
        timeRemaining={timeRemaining}
        onLogout={handleLogout}
      />

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F3F0]">
            Welcome, {guestName}!
          </h1>
          <p className="text-[#A7A4B8] mt-2">
            What would you like to do today?
          </p>
        </div>

        <QuickAccessCards onNavigate={handleNavigate} />

        <TableAvailabilityWidget
          availability={MOCK_AVAILABILITY}
          onSelectType={handleSelectType}
        />

        <div className="bg-[#1A1926] rounded-xl p-6 border border-[#242334]">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-8 h-8 text-[#E85D04]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
            <div>
              <h2 className="text-lg font-semibold text-[#F5F3F0]">
                Mood-Based Recommendations
              </h2>
              <p className="text-sm text-[#A7A4B8]">
                Tell us your vibe, we&apos;ll pair your meal with the perfect playlist
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Cozy", "Energetic", "Romantic", "Chill", "Nostalgic"].map((mood) => (
              <button
                key={mood}
                className="px-4 py-2 bg-[#0F0E17] hover:bg-[#242334] text-[#A7A4B8] hover:text-[#F5F3F0] rounded-full text-sm transition-colors duration-200 cursor-pointer"
              >
                {mood}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
