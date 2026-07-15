"use client";

interface BottomNavProps {
  activePage: "dashboard" | "booking" | "menu" | "cart";
  onNavigate: (page: "dashboard" | "booking" | "menu" | "cart") => void;
  cartCount?: number;
}

const NAV_ITEMS = [
  { id: "booking" as const, label: "Book", icon: "📅" },
  { id: "menu" as const, label: "Menu", icon: "🍽️" },
  { id: "cart" as const, label: "Cart", icon: "🛒" },
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
                flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all
                ${isActive
                  ? "text-[#E85D04] bg-[#E85D04]/10"
                  : "text-[#A7A4B8] hover:text-[#F5F3F0]"
                }
              `}
            >
              <span className="text-xl relative">
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
