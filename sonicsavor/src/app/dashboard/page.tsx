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

  const handleMoodClick = (mood: string) => {
    // Navigate to menu with mood filter
    router.push(`/menu?mood=${mood.toLowerCase()}`);
  };

  const getMoodIcon = (icon: string) => {
    switch (icon) {
      case "coffee":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z"/>
          </svg>
        );
      case "lightning":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
          </svg>
        );
      case "heart":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        );
      case "smile":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
          </svg>
        );
      case "clock":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
          </svg>
        );
      case "compass":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        );
      default:
        return null;
    }
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

        {/* Mood Recommendation Teaser */}
        <div className="bg-[#1A1926] rounded-xl p-6 border border-[#242334]">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-10 h-10 text-[#E85D04]" fill="currentColor" viewBox="0 0 24 24">
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
            {MOOD_CHIPS.map((mood) => (
              <button
                key={mood.label}
                onClick={() => handleMoodClick(mood.label)}
                className="px-4 py-2 bg-[#0F0E17] hover:bg-[#E85D04] text-[#A7A4B8] hover:text-[#F5F3F0] rounded-full text-sm transition-all flex items-center gap-2"
              >
                {getMoodIcon(mood.icon)}
                <span>{mood.label}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
