"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import QuickActions from "@/components/admin/QuickActions";
import OTPDisplay from "@/components/admin/OTPDisplay";
import BookingList from "@/components/admin/BookingList";
import ActiveSessions from "@/components/admin/ActiveSessions";
import WalkInForm from "@/components/admin/WalkInForm";
import TableMap from "@/components/admin/TableMap";

// Mock data for demo
const MOCK_BOOKINGS = [
  {
    id: "BK-001",
    time: "19:00",
    guestName: "Sarah Chen",
    tableType: "Private",
    tableId: "P2",
    partySize: 4,
    status: "reserved" as const,
  },
  {
    id: "BK-002",
    time: "19:30",
    guestName: "James Wilson",
    tableType: "Squad",
    tableId: "S4",
    partySize: 4,
    status: "reserved" as const,
  },
  {
    id: "BK-003",
    time: "20:00",
    guestName: "Maria Garcia",
    tableType: "Private",
    tableId: "P1",
    partySize: 2,
    status: "checked-in" as const,
  },
];

const MOCK_SESSIONS = [
  {
    sessionToken: "abc123",
    tableId: "P1",
    tableType: "Private",
    guestName: "Maria Garcia",
    otpCode: "472891",
    startedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    status: "active" as const,
    totalSpent: 54.45,
  },
];

type ModalView = "none" | "generate-otp" | "check-in";

export default function AdminPage() {
  const [modalView, setModalView] = useState<ModalView>("none");
  const [showTableMap, setShowTableMap] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState<{
    code: string;
    guestName: string;
    tableInfo: string;
  } | null>(null);

  const handleGenerateOTP = () => {
    setModalView("generate-otp");
  };

  const handleCheckIn = () => {
    setModalView("check-in");
  };

  const handleWalkInSubmit = (data: {
    tableType: string;
    partySize: number;
    guestName: string;
  }) => {
    // Generate random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP({
      code,
      guestName: data.guestName,
      tableInfo: `${data.tableType} Table (${data.partySize} guests)`,
    });
    setModalView("none");
  };

  const handleBookingCheckIn = (bookingId: string) => {
    const booking = MOCK_BOOKINGS.find((b) => b.id === bookingId);
    if (booking) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOTP({
        code,
        guestName: booking.guestName,
        tableInfo: `${booking.tableType} Table ${booking.tableId}`,
      });
    }
  };

  const handleRevokeSession = (sessionToken: string) => {
    if (confirm("Are you sure you want to revoke this session?")) {
      console.log("Revoking session:", sessionToken);
      // TODO: Call API to revoke session
    }
  };

  const handleShowTableMap = () => {
    setShowTableMap(true);
  };

  return (
    <div className="min-h-screen bg-[#0F0E17]">
      {/* Header */}
      <AdminHeader staffName="Staff" onLogout={() => console.log("Logout")} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Quick Actions */}
        <QuickActions
          onGenerateOTP={handleGenerateOTP}
          onCheckIn={handleCheckIn}
          onShowTableMap={handleShowTableMap}
        />

        {/* OTP Display (when generated) */}
        {generatedOTP && (
          <OTPDisplay
            code={generatedOTP.code}
            guestName={generatedOTP.guestName}
            tableInfo={generatedOTP.tableInfo}
            expiresIn={600} // 10 minutes
            onDismiss={() => setGeneratedOTP(null)}
            onCopy={() => console.log("Copied!")}
          />
        )}

        {/* Walk-in Form (when modal is open) */}
        {(modalView === "generate-otp" || modalView === "check-in") && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-md">
              <WalkInForm
                onSubmit={handleWalkInSubmit}
                disabled={false}
              />
              <button
                onClick={() => setModalView("none")}
                className="w-full mt-4 py-3 bg-[#242334] hover:bg-[#2A2940] text-[#A7A4B8] font-medium rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bookings */}
          <BookingList
            bookings={MOCK_BOOKINGS}
            onCheckIn={handleBookingCheckIn}
          />

          {/* Active Sessions */}
          <ActiveSessions
            sessions={MOCK_SESSIONS}
            onRevoke={handleRevokeSession}
          />
        </div>
      </main>

      {/* Table Map Modal */}
      {showTableMap && (
        <TableMap onClose={() => setShowTableMap(false)} />
      )}
    </div>
  );
}
