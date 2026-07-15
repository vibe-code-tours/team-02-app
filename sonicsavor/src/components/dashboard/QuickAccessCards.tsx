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
        <svg className="w-12 h-12 text-[#E85D04] mb-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
        </svg>
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
        <svg className="w-12 h-12 text-[#E85D04] mb-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
        </svg>
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
