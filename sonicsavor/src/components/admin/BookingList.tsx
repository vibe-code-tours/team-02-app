"use client";

interface Booking {
  id: string;
  time: string;
  guestName: string;
  tableType: string;
  tableId: string;
  partySize: number;
  status: "reserved" | "checked-in" | "completed" | "cancelled";
}

interface BookingListProps {
  bookings: Booking[];
  onCheckIn: (bookingId: string) => void;
}

export default function BookingList({ bookings, onCheckIn }: BookingListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "reserved": return "text-[#FFB703]";
      case "checked-in": return "text-[#2EC4B6]";
      case "completed": return "text-[#A7A4B8]";
      case "cancelled": return "text-[#E63946]";
      default: return "text-[#A7A4B8]";
    }
  };

  return (
    <div className="bg-[#1A1926] rounded-xl p-6 border border-[#242334]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-[#A7A4B8] uppercase tracking-wider">
          Today&apos;s Bookings
        </h2>
        <span className="text-sm text-[#A7A4B8]">{bookings.length} total</span>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-8">
          <svg className="w-12 h-12 mx-auto text-[#A7A4B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <p className="text-[#A7A4B8] mt-2">No bookings today</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between p-4 bg-[#0F0E17] rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-[#F5F3F0]">{booking.time}</div>
                </div>
                <div>
                  <div className="font-medium text-[#F5F3F0]">{booking.guestName}</div>
                  <div className="text-sm text-[#A7A4B8]">
                    {booking.tableType} • {booking.partySize} guests
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-xs ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
                {booking.status === "reserved" && (
                  <button
                    onClick={() => onCheckIn(booking.id)}
                    className="px-4 py-2 bg-[#2EC4B6] hover:bg-[#2EC4B6]/90 text-[#0F0E17] text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer"
                  >
                    Check In
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
