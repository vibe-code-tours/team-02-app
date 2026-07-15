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
      case "reserved":
        return "text-[#FFB703]";
      case "checked-in":
        return "text-[#2EC4B6]";
      case "completed":
        return "text-[#A7A4B8]";
      case "cancelled":
        return "text-[#E63946]";
      default:
        return "text-[#A7A4B8]";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "reserved":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
          </svg>
        );
      case "checked-in":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        );
      case "completed":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"/>
          </svg>
        );
      case "cancelled":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
          </svg>
        );
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
          <svg className="w-12 h-12 text-[#242334] mx-auto" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
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
                  <div className="text-lg font-semibold text-[#F5F3F0]">
                    {booking.time}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-[#F5F3F0]">
                    {booking.guestName}
                  </div>
                  <div className="text-sm text-[#A7A4B8]">
                    {booking.tableType} • {booking.partySize} guests
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-xs flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                  {getStatusIcon(booking.status)} {booking.status}
                </span>
                {booking.status === "reserved" && (
                  <button
                    onClick={() => onCheckIn(booking.id)}
                    className="px-4 py-2 bg-[#2EC4B6] hover:bg-[#2EC4B6]/90 text-[#0F0E17] text-sm font-medium rounded-lg transition-colors"
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
