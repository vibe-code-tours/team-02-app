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
  { key: "family", label: "Family", capacity: "6-8 people", count: 5 },
  { key: "squad", label: "Squad", capacity: "4 people", count: 5 },
  { key: "duo", label: "Duo", capacity: "2 people", count: 4 },
  { key: "single", label: "Single", capacity: "1 person", count: 4 },
  { key: "private", label: "Private", capacity: "2-6 people", count: 4 },
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

  const getTableIcon = (key: string) => {
    switch (key) {
      case "family":
        return (
          <svg className="w-8 h-8 text-[#E85D04]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
        );
      case "squad":
        return (
          <svg className="w-8 h-8 text-[#E85D04]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
        );
      case "duo":
        return (
          <svg className="w-8 h-8 text-[#E85D04]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        );
      case "single":
        return (
          <svg className="w-8 h-8 text-[#E85D04]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        );
      case "private":
        return (
          <svg className="w-8 h-8 text-[#E85D04]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>
        );
      default:
        return null;
    }
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
              <div className="flex justify-center mb-2">{getTableIcon(type.key)}</div>
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
