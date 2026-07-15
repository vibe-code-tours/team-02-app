"use client";

interface BottomNavProps {
  activePage: "dashboard" | "booking" | "menu" | "cart";
  onNavigate: (page: "dashboard" | "booking" | "menu" | "cart") => void;
  cartCount?: number;
}

const NAV_ITEMS = [
  {
    id: "booking" as const,
    label: "Book",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    id: "menu" as const,
    label: "Menu",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/>
        <path d="M7 2v20"/>
        <path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
      </svg>
    ),
  },
  {
    id: "cart" as const,
    label: "Cart",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
      </svg>
    ),
  },
];

export default function BottomNav({
  activePage,
  onNavigate,
  cartCount = 0,
}: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0F0E17]/90 backdrop-blur-md border-t border-[#242334]">
      <div className="max-w-lg mx-auto px-4 h-16 flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer
                ${isActive
                  ? "text-[#E85D04] bg-[#E85D04]/10"
                  : "text-[#A7A4B8] hover:text-[#F5F3F0]"
                }
              `}
            >
              <span className="relative">
                {item.icon}
                {item.id === "cart" && cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-[#E85D04] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
