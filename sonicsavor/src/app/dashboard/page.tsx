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
  { label: "Cozy", icon: "☕" },
  { label: "Energetic", icon: "⚡" },
  { label: "Romantic", icon: "💜" },
  { label: "Chill", icon: "😌" },
  { label: "Nostalgic", icon: "🕰️" },
  { label: "Adventurous", icon: "🌍" },
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

  const handleMoodClick = (mood: string) => {
    // Navigate to menu with mood filter
    router.push(`/menu?mood=${mood.toLowerCase()}`);
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
            Welcome, {guestName}! 👋
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

        {/* Mood Recommendation Teaser */}
        <div className="bg-[#1A1926] rounded-xl p-6 border border-[#242334]">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🎵</span>
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
            {MOOD_CHIPS.map((mood) => (
              <button
                key={mood.label}
                onClick={() => handleMoodClick(mood.label)}
                className="px-4 py-2 bg-[#0F0E17] hover:bg-[#E85D04] text-[#A7A4B8] hover:text-[#F5F3F0] rounded-full text-sm transition-all flex items-center gap-2"
              >
                <span>{mood.icon}</span>
                <span>{mood.label}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
