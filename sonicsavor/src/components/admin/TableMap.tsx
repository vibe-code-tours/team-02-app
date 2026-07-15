"use client";

interface Table {
  id: string;
  type: string;
  capacity: number;
  status: "available" | "occupied" | "reserved";
  guests?: string;
}

interface TableMapProps {
  tables?: Table[];
  onClose: () => void;
}

// Mock table data aligned with table-booking-system.md (22 tables)
const MOCK_TABLES: Table[] = [
  // Family (5 tables)
  { id: "F1", type: "Family", capacity: 8, status: "available" },
  { id: "F2", type: "Family", capacity: 8, status: "occupied", guests: "Williams Family" },
  { id: "F3", type: "Family", capacity: 6, status: "available" },
  { id: "F4", type: "Family", capacity: 6, status: "reserved", guests: "Birthday Party" },
  { id: "F5", type: "Family", capacity: 8, status: "available" },

  // Squad (5 tables)
  { id: "S1", type: "Squad", capacity: 4, status: "occupied", guests: "College Friends" },
  { id: "S2", type: "Squad", capacity: 4, status: "available" },
  { id: "S3", type: "Squad", capacity: 4, status: "available" },
  { id: "S4", type: "Squad", capacity: 4, status: "reserved", guests: "James Wilson" },
  { id: "S5", type: "Squad", capacity: 4, status: "available" },

  // Duo (4 tables)
  { id: "D1", type: "Duo", capacity: 2, status: "occupied", guests: "Date Night" },
  { id: "D2", type: "Duo", capacity: 2, status: "available" },
  { id: "D3", type: "Duo", capacity: 2, status: "available" },
  { id: "D4", type: "Duo", capacity: 2, status: "reserved", guests: "Anniversary" },

  // Single (4 tables)
  { id: "T1", type: "Single", capacity: 1, status: "available" },
  { id: "T2", type: "Single", capacity: 1, status: "occupied", guests: "Solo Diner" },
  { id: "T3", type: "Single", capacity: 1, status: "available" },
  { id: "T4", type: "Single", capacity: 1, status: "available" },

  // Private (4 tables)
  { id: "P1", type: "Private", capacity: 6, status: "occupied", guests: "Maria Garcia" },
  { id: "P2", type: "Private", capacity: 4, status: "reserved", guests: "Sarah Chen" },
  { id: "P3", type: "Private", capacity: 6, status: "available" },
  { id: "P4", type: "Private", capacity: 4, status: "available" },
];

export default function TableMap({ tables = MOCK_TABLES, onClose }: TableMapProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-[#2EC4B6] hover:bg-[#2EC4B6]/80";
      case "occupied":
        return "bg-[#E63946] hover:bg-[#E63946]/80";
      case "reserved":
        return "bg-[#FFB703] hover:bg-[#FFB703]/80";
      default:
        return "bg-[#242334]";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "Available";
      case "occupied":
        return "Occupied";
      case "reserved":
        return "Reserved";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-4xl bg-[#1A1926] rounded-2xl border border-[#242334] p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#F5F3F0]">Table Map</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#242334] rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-[#A7A4B8]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        {/* Legend */}
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#2EC4B6]"></div>
            <span className="text-sm text-[#A7A4B8]">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#FFB703]"></div>
            <span className="text-sm text-[#A7A4B8]">Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#E63946]"></div>
            <span className="text-sm text-[#A7A4B8]">Occupied</span>
          </div>
        </div>

        {/* Family Tables */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-[#A7A4B8] uppercase tracking-wider mb-3">
            Family Tables (6-8 people)
          </h3>
          <div className="grid grid-cols-5 gap-3">
            {tables.filter(t => t.type === "Family").map((table) => (
              <div
                key={table.id}
                className={`p-4 rounded-xl text-center transition-all cursor-pointer ${getStatusColor(table.status)}`}
              >
                <div className="text-lg font-bold text-[#F5F3F0]">{table.id}</div>
                <div className="text-xs text-[#F5F3F0]/80">{table.capacity} seats</div>
                {table.guests && (
                  <div className="text-xs text-[#F5F3F0]/80 mt-1 truncate">{table.guests}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Squad Tables */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-[#A7A4B8] uppercase tracking-wider mb-3">
            Squad Tables (4 people)
          </h3>
          <div className="grid grid-cols-5 gap-3">
            {tables.filter(t => t.type === "Squad").map((table) => (
              <div
                key={table.id}
                className={`p-4 rounded-xl text-center transition-all cursor-pointer ${getStatusColor(table.status)}`}
              >
                <div className="text-lg font-bold text-[#F5F3F0]">{table.id}</div>
                <div className="text-xs text-[#F5F3F0]/80">{table.capacity} seats</div>
                {table.guests && (
                  <div className="text-xs text-[#F5F3F0]/80 mt-1 truncate">{table.guests}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Duo Tables */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-[#A7A4B8] uppercase tracking-wider mb-3">
            Duo Tables (2 people)
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {tables.filter(t => t.type === "Duo").map((table) => (
              <div
                key={table.id}
                className={`p-4 rounded-xl text-center transition-all cursor-pointer ${getStatusColor(table.status)}`}
              >
                <div className="text-lg font-bold text-[#F5F3F0]">{table.id}</div>
                <div className="text-xs text-[#F5F3F0]/80">{table.capacity} seats</div>
                {table.guests && (
                  <div className="text-xs text-[#F5F3F0]/80 mt-1 truncate">{table.guests}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Single Tables */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-[#A7A4B8] uppercase tracking-wider mb-3">
            Single Tables (1 person)
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {tables.filter(t => t.type === "Single").map((table) => (
              <div
                key={table.id}
                className={`p-4 rounded-xl text-center transition-all cursor-pointer ${getStatusColor(table.status)}`}
              >
                <div className="text-lg font-bold text-[#F5F3F0]">{table.id}</div>
                <div className="text-xs text-[#F5F3F0]/80">{table.capacity} seat</div>
                {table.guests && (
                  <div className="text-xs text-[#F5F3F0]/80 mt-1 truncate">{table.guests}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Private Tables */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-[#A7A4B8] uppercase tracking-wider mb-3">
            Private Tables (2-6 people)
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {tables.filter(t => t.type === "Private").map((table) => (
              <div
                key={table.id}
                className={`p-4 rounded-xl text-center transition-all cursor-pointer ${getStatusColor(table.status)}`}
              >
                <div className="text-lg font-bold text-[#F5F3F0]">{table.id}</div>
                <div className="text-xs text-[#F5F3F0]/80">{table.capacity} seats</div>
                {table.guests && (
                  <div className="text-xs text-[#F5F3F0]/80 mt-1 truncate">{table.guests}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="flex justify-center gap-6 pt-4 border-t border-[#242334]">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#2EC4B6]">
              {tables.filter(t => t.status === "available").length}
            </div>
            <div className="text-xs text-[#A7A4B8]">Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#FFB703]">
              {tables.filter(t => t.status === "reserved").length}
            </div>
            <div className="text-xs text-[#A7A4B8]">Reserved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#E63946]">
              {tables.filter(t => t.status === "occupied").length}
            </div>
            <div className="text-xs text-[#A7A4B8]">Occupied</div>
          </div>
        </div>
      </div>
    </div>
  );
}