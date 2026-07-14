"use client";

interface QuickAccessCardsProps {
  onNavigate: (page: "booking" | "menu") => void;
}

export default function QuickAccessCards({ onNavigate }: QuickAccessCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Book Table Card */}
      <button
        onClick={() => onNavigate("booking")}
        className="group bg-[#1A1926] rounded-xl p-6 border border-[#242334] hover:border-[#E85D04]/50 transition-all text-left"
      >
        <span className="text-4xl block mb-3">📅</span>
        <h2 className="text-xl font-semibold text-[#F5F3F0] group-hover:text-[#E85D04] transition-colors">
          Book Table
        </h2>
        <p className="text-sm text-[#A7A4B8] mt-1">
          Find your perfect seat
        </p>
      </button>

      {/* Order Now Card */}
      <button
        onClick={() => onNavigate("menu")}
        className="group bg-[#1A1926] rounded-xl p-6 border border-[#242334] hover:border-[#E85D04]/50 transition-all text-left"
      >
        <span className="text-4xl block mb-3">🍽️</span>
        <h2 className="text-xl font-semibold text-[#F5F3F0] group-hover:text-[#E85D04] transition-colors">
          Order Now
        </h2>
        <p className="text-sm text-[#A7A4B8] mt-1">
          Browse menu & order
        </p>
      </button>
    </div>
  );
}
