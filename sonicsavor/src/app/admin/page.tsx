"use client";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#0F0E17] pt-16 pb-20 px-4">
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-2xl font-bold text-[#F5F3F0] mb-4">Staff Panel</h1>
        <p className="text-[#A7A4B8]">Admin dashboard for staff</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#1A1926] rounded-xl p-6 border border-[#242334]">
            <span className="text-3xl">🔑</span>
            <h2 className="text-lg font-semibold text-[#F5F3F0] mt-3">Generate OTP</h2>
            <p className="text-sm text-[#A7A4B8] mt-1">Create access code for walk-in</p>
          </div>
          <div className="bg-[#1A1926] rounded-xl p-6 border border-[#242334]">
            <span className="text-3xl">📋</span>
            <h2 className="text-lg font-semibold text-[#F5F3F0] mt-3">Bookings</h2>
            <p className="text-sm text-[#A7A4B8] mt-1">View today&apos;s reservations</p>
          </div>
        </div>
      </div>
    </div>
  );
}
