"use client";

interface QuickAccessCardsProps {
  onNavigate: (page: "booking" | "menu") => void;
}

export default function QuickAccessCards({ onNavigate }: QuickAccessCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button
        onClick={() => onNavigate("booking")}
        className="group bg-[#1A1926] rounded-xl p-6 border border-[#242334] hover:border-[#E85D04]/50 transition-all duration-200 text-left cursor-pointer"
      >
        <svg className="w-10 h-10 text-[#E85D04] mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <h2 className="text-xl font-semibold text-[#F5F3F0] group-hover:text-[#E85D04] transition-colors duration-200">
          Book Table
        </h2>
        <p className="text-sm text-[#A7A4B8] mt-1">Find your perfect seat</p>
      </button>

      <button
        onClick={() => onNavigate("menu")}
        className="group bg-[#1A1926] rounded-xl p-6 border border-[#242334] hover:border-[#E85D04]/50 transition-all duration-200 text-left cursor-pointer"
      >
        <svg className="w-10 h-10 text-[#E85D04] mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/>
          <path d="M7 2v20"/>
          <path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
        </svg>
        <h2 className="text-xl font-semibold text-[#F5F3F0] group-hover:text-[#E85D04] transition-colors duration-200">
          Order Now
        </h2>
        <p className="text-sm text-[#A7A4B8] mt-1">Browse menu & order</p>
      </button>
    </div>
  );
}
