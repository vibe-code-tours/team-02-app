"use client";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0F0E17] pt-16 pb-20 px-4">
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-2xl font-bold text-[#F5F3F0] mb-4">Dashboard</h1>
        <p className="text-[#A7A4B8]">Main hub after login</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#1A1926] rounded-xl p-6 border border-[#242334]">
            <span className="text-3xl">📅</span>
            <h2 className="text-lg font-semibold text-[#F5F3F0] mt-3">Book Table</h2>
            <p className="text-sm text-[#A7A4B8] mt-1">Find your perfect seat</p>
          </div>
          <div className="bg-[#1A1926] rounded-xl p-6 border border-[#242334]">
            <span className="text-3xl">🍽️</span>
            <h2 className="text-lg font-semibold text-[#F5F3F0] mt-3">Order Now</h2>
            <p className="text-sm text-[#A7A4B8] mt-1">Browse menu & order</p>
          </div>
        </div>
      </div>
    </div>
  );
}
