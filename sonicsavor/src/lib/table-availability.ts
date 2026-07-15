// Table configuration - 22 tables total
export const TABLE_CONFIG = {
  family: { total: 5, capacity: "6-8", label: "Family", icon: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" },
  squad: { total: 5, capacity: "4", label: "Squad", icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" },
  duo: { total: 4, capacity: "2", label: "Duo", icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" },
  single: { total: 4, capacity: "1", label: "Solo", icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" },
  private: { total: 4, capacity: "2-6", label: "Private", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
};

export interface TableBooking {
  id: string;
  tableType: string;
  tableNumber: number;
  date: string;
  time: string;
  partySize: number;
  guestName: string;
  guestEmail: string;
  status: "reserved" | "checked-in" | "completed" | "cancelled";
}

// Mock bookings for demo (in real app, this would come from database)
const MOCK_BOOKINGS: TableBooking[] = [
  { id: "BK-001", tableType: "private", tableNumber: 1, date: "2026-07-15", time: "19:00", partySize: 4, guestName: "Sarah Chen", guestEmail: "sarah@example.com", status: "reserved" },
  { id: "BK-002", tableType: "private", tableNumber: 2, date: "2026-07-15", time: "20:00", partySize: 2, guestName: "James Wilson", guestEmail: "james@example.com", status: "reserved" },
  { id: "BK-003", tableType: "family", tableNumber: 1, date: "2026-07-15", time: "18:00", partySize: 6, guestName: "Maria Garcia", guestEmail: "maria@example.com", status: "checked-in" },
  { id: "BK-004", tableType: "squad", tableNumber: 1, date: "2026-07-15", time: "19:30", partySize: 4, guestName: "Alex Kim", guestEmail: "alex@example.com", status: "reserved" },
];

// Check availability for a specific date and time
export function getTableAvailability(date: string, time: string): { [key: string]: { total: number; available: number } } {
  const availability: { [key: string]: { total: number; available: number } } = {};

  for (const [type, config] of Object.entries(TABLE_CONFIG)) {
    const bookedCount = MOCK_BOOKINGS.filter(
      (b) =>
        b.tableType === type &&
        b.date === date &&
        b.time === time &&
        (b.status === "reserved" || b.status === "checked-in")
    ).length;

    availability[type] = {
      total: config.total,
      available: config.total - bookedCount,
    };
  }

  return availability;
}

// Get available time slots for a date
export function getAvailableTimeSlots(date: string): string[] {
  const allSlots = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];
  return allSlots;
}

// Check if a specific table type is available
export function isTableAvailable(tableType: string, date: string, time: string): boolean {
  const availability = getTableAvailability(date, time);
  return availability[tableType]?.available > 0;
}

// Get maximum party size for a table type
export function getMaxPartySize(tableType: string): number {
  switch (tableType) {
    case "family": return 8;
    case "squad": return 4;
    case "duo": return 2;
    case "single": return 1;
    case "private": return 6;
    default: return 4;
  }
}

// Get minimum party size for a table type
export function getMinPartySize(tableType: string): number {
  switch (tableType) {
    case "family": return 6;
    case "squad": return 3;
    case "duo": return 2;
    case "single": return 1;
    case "private": return 2;
    default: return 1;
  }
}
