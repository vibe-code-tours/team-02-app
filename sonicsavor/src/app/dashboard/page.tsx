"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import QuickAccessCards from "@/components/dashboard/QuickAccessCards";
import TableAvailabilityWidget from "@/components/dashboard/TableAvailabilityWidget";

// Mock data aligned with table-booking-system.md (22 tables total)
const MOCK_AVAILABILITY = {
  family: { total: 5, available: 3 },   // 6-8 people
  squad: { total: 5, available: 4 },    // 4 people
  duo: { total: 4, available: 2 },      // 2 people
  single: { total: 4, available: 4 },   // 1 person
  private: { total: 4, available: 1 },  // 2-6 people (priority)
};

// Mood chips for quick access
const MOOD_CHIPS = [
  { label: "Cozy", icon: "coffee" },
  { label: "Energetic", icon: "lightning" },
  { label: "Romantic", icon: "heart" },
  { label: "Chill", icon: "smile" },
  { label: "Nostalgic", icon: "clock" },
  { label: "Adventurous", icon: "compass" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [guestName] = useState("Sarah Chen");
  const [tableInfo] = useState("Private Table 2");
  const [timeRemaining] = useState(180); // 3 hours

  const handleNavigate = (page: "booking" | "menu") => {
    router.push(`/${page}`);
  };

  const handleSelectType = (type: string) => {
    router.push(`/booking?type=${type}`);
  };

  const handleLogout = () => {
    // Clear session and redirect
    localStorage.removeItem("sonicsavor_session");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#0F0E17]">
      {/* Header */}
      <DashboardHeader
        guestName={guestName}
        tableInfo={tableInfo}
        timeRemaining={timeRemaining}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F3F0]">
            Welcome, {guestName}!
          </h1>
          <p className="text-[#A7A4B8] mt-2">
            What would you like to do today?
          </p>
        </div>

        {/* Quick Access Cards */}
        <QuickAccessCards onNavigate={handleNavigate} />

        {/* Table Availability */}
        <TableAvailabilityWidget
          availability={MOCK_AVAILABILITY}
          onSelectType={handleSelectType}
        />

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => router.push("/suggestions")}
            className="bg-[#1A1926] rounded-xl p-6 border border-[#242334] hover:border-[#E85D04] transition-all text-left"
          >
            <svg className="w-10 h-10 text-[#E85D04] mb-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
            <h3 className="text-lg font-semibold text-[#F5F3F0]">Mood-Based Recommendations</h3>
            <p className="text-sm text-[#A7A4B8]">Get personalized meal recommendations</p>
          </button>
          <button
            onClick={() => router.push("/music")}
            className="bg-[#1A1926] rounded-xl p-6 border border-[#242334] hover:border-[#1DB954] transition-all text-left"
          >
            <svg className="w-10 h-10 text-[#1DB954] mb-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            <h3 className="text-lg font-semibold text-[#F5F3F0]">Music</h3>
            <p className="text-sm text-[#A7A4B8]">Find the perfect playlist</p>
          </button>
        </div>
      </main>
    </div>
  );
}
