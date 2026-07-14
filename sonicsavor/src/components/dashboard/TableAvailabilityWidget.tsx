"use client";

interface TableAvailability {
  family: { total: number; available: number };
  squad: { total: number; available: number };
  duo: { total: number; available: number };
  single: { total: number; available: number };
  private: { total: number; available: number };
}

interface TableAvailabilityWidgetProps {
  availability: TableAvailability;
  onSelectType: (type: string) => void;
}

const TABLE_TYPES = [
  { key: "family", label: "Family", icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75", capacity: "6-8" },
  { key: "squad", label: "Squad", icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75", capacity: "4" },
  { key: "duo", label: "Duo", icon: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z", capacity: "2" },
  { key: "single", label: "Single", icon: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z", capacity: "1" },
  { key: "private", label: "Private", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", capacity: "2-6" },
];

export default function TableAvailabilityWidget({
  availability,
  onSelectType,
}: TableAvailabilityWidgetProps) {
  const getStatusColor = (available: number, total: number) => {
    const ratio = available / total;
    if (ratio > 0.5) return "text-[#2EC4B6]";
    if (ratio > 0) return "text-[#FFB703]";
    return "text-[#E63946]";
  };

  const getStatusBg = (available: number, total: number) => {
    const ratio = available / total;
    if (ratio > 0.5) return "bg-[#2EC4B6]/10";
    if (ratio > 0) return "bg-[#FFB703]/10";
    return "bg-[#E63946]/10";
  };

  return (
    <div className="bg-[#1A1926] rounded-xl p-6 border border-[#242334]">
      <h2 className="text-sm font-semibold text-[#A7A4B8] uppercase tracking-wider mb-4">
        Table Availability Today
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {TABLE_TYPES.map((type) => {
          const avail = availability[type.key as keyof TableAvailability];
          return (
            <button
              key={type.key}
              onClick={() => onSelectType(type.key)}
              className={`
                p-4 rounded-xl border border-[#242334] transition-all duration-200 cursor-pointer
                hover:border-[#E85D04]/50 hover:bg-[#242334]/50
                ${getStatusBg(avail.available, avail.total)}
              `}
            >
              <svg className="w-8 h-8 mx-auto mb-2 text-[#A7A4B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={type.icon}/>
              </svg>
              <div className="font-medium text-[#F5F3F0] text-sm">{type.label}</div>
              <div className="text-xs text-[#A7A4B8] mb-2">{type.capacity} ppl</div>
              <div className={`text-lg font-semibold ${getStatusColor(avail.available, avail.total)}`}>
                {avail.available}/{avail.total}
              </div>
              <div className="text-[10px] text-[#A7A4B8]">free</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
