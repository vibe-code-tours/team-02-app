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

// Aligned with table-booking-system.md (22 tables total)
const TABLE_TYPES = [
  { key: "family", label: "Family", icon: "👨‍👩‍👧‍👦", capacity: "6-8 people", count: 5 },
  { key: "squad", label: "Squad", icon: "🧑‍🤝‍🧑", capacity: "4 people", count: 5 },
  { key: "duo", label: "Duo", icon: "💑", capacity: "2 people", count: 4 },
  { key: "single", label: "Single", icon: "🧑", capacity: "1 person", count: 4 },
  { key: "private", label: "Private", icon: "🔒", capacity: "2-6 people", count: 4 },
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
                p-4 rounded-xl border border-[#242334] transition-all
                hover:border-[#E85D04]/50 hover:bg-[#242334]/50
                ${getStatusBg(avail.available, avail.total)}
              `}
            >
              <span className="text-3xl block mb-2">{type.icon}</span>
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
