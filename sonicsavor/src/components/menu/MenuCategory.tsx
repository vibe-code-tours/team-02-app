"use client";

interface MenuCategoryProps {
  name: string;
  icon: React.ReactNode;
  count: number;
  isActive: boolean;
  onClick: () => void;
}

export default function MenuCategory({
  name,
  icon,
  count,
  isActive,
  onClick,
}: MenuCategoryProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${
        isActive
          ? "bg-[#E85D04] text-[#F5F3F0]"
          : "bg-[#1A1926] text-[#A7A4B8] hover:text-[#F5F3F0] hover:bg-[#242334]"
      }`}
      aria-pressed={isActive}
    >
      {icon}
      <span>{name}</span>
      <span
        className={`px-1.5 py-0.5 text-xs rounded-full ${
          isActive
            ? "bg-[#F5F3F0]/20 text-[#F5F3F0]"
            : "bg-[#242334] text-[#A7A4B8]"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
