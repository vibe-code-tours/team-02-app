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
          ? "bg-[#E85D04] text-[#FFFFFE]"
          : "bg-[#1A1A2E] text-[#94A1B2] hover:text-[#FFFFFE] hover:bg-[#232946]"
      }`}
      aria-pressed={isActive}
    >
      {icon}
      <span>{name}</span>
      <span
        className={`px-1.5 py-0.5 text-xs rounded-full ${
          isActive
            ? "bg-[#FFFFFE]/20 text-[#FFFFFE]"
            : "bg-[#232946] text-[#94A1B2]"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
