"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import QuickActions from "@/components/admin/QuickActions";
import OTPDisplay from "@/components/admin/OTPDisplay";
import BookingList from "@/components/admin/BookingList";
import ActiveSessions from "@/components/admin/ActiveSessions";
import WalkInForm from "@/components/admin/WalkInForm";
import CodeGenerator from "@/components/admin/CodeGenerator";

const MOCK_BOOKINGS = [
  { id: "BK-001", time: "19:00", guestName: "Sarah Chen", tableType: "Private", tableId: "P2", partySize: 4, status: "reserved" as const },
  { id: "BK-002", time: "19:30", guestName: "James Wilson", tableType: "Squad", tableId: "S4", partySize: 4, status: "reserved" as const },
  { id: "BK-003", time: "20:00", guestName: "Maria Garcia", tableType: "Private", tableId: "P1", partySize: 2, status: "checked-in" as const },
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

type ModalView = "none" | "generate-otp";

export default function AdminPage() {
  const [modalView, setModalView] = useState<ModalView>("none");
  const [generatedOTP, setGeneratedOTP] = useState<{
    code: string;
    guestName: string;
    tableInfo: string;
  } | null>(null);
  const [adminCode, setAdminCode] = useState<string | null>(null);
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleGenerateOTP = () => setModalView("generate-otp");
  const handleCheckIn = () => console.log("Check in");

  const handleWalkInSubmit = (data: { tableType: string; partySize: number; guestName: string }) => {
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
    }
  };

  // Admin code authentication
  if (!adminCode) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0F0E17] px-4">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold text-center mb-2 text-[#F5F3F0]">Admin Access</h1>
          <p className="text-sm text-center text-[#A7A4B8] mb-6">
            Enter the admin code to continue
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (inputCode === process.env.NEXT_PUBLIC_ADMIN_ACCESS_CODE) {
                setAdminCode(inputCode);
              } else {
                setError("Invalid admin code");
              }
            }}
            className="flex flex-col gap-4"
          >
            <input
              type="password"
              value={inputCode}
              onChange={(e) => {
                setInputCode(e.target.value);
                setError(null);
              }}
              placeholder="Admin code"
              className="w-full px-4 py-3 text-center border border-[#242334] bg-[#1A1926] rounded-lg text-[#F5F3F0] placeholder-[#A7A4B8] focus:outline-none focus:border-[#E85D04]"
              autoFocus
            />
            {error && <p className="text-sm text-[#E63946] text-center">{error}</p>}
            <button
              type="submit"
              disabled={!inputCode}
              className="w-full py-3 bg-[#E85D04] text-[#F5F3F0] rounded-lg hover:bg-[#E85D04]/90 transition disabled:opacity-50"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0E17]">
      <AdminHeader staffName="Staff" onLogout={() => setAdminCode(null)} />

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <QuickActions onGenerateOTP={handleGenerateOTP} onCheckIn={handleCheckIn} />

        {generatedOTP && (
          <OTPDisplay
            code={generatedOTP.code}
            guestName={generatedOTP.guestName}
            tableInfo={generatedOTP.tableInfo}
            expiresIn={600}
            onDismiss={() => setGeneratedOTP(null)}
            onCopy={() => console.log("Copied!")}
          />
        )}

        {modalView === "generate-otp" && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-md">
              <WalkInForm onSubmit={handleWalkInSubmit} disabled={false} />
              <button
                onClick={() => setModalView("none")}
                className="w-full mt-4 py-3 bg-[#242334] hover:bg-[#2A2940] text-[#A7A4B8] font-medium rounded-xl transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BookingList bookings={MOCK_BOOKINGS} onCheckIn={handleBookingCheckIn} />
          <ActiveSessions sessions={MOCK_SESSIONS} onRevoke={handleRevokeSession} />
        </div>

        {/* Code Generator from old version - with our color system */}
        <div className="bg-[#1A1926] p-6 rounded-xl border border-[#242334]">
          <h2 className="text-xl font-semibold mb-4 text-[#F5F3F0]">Generate Access Codes</h2>
          <CodeGenerator adminCode={adminCode} />
        </div>
      </main>
    </div>
  );
}
