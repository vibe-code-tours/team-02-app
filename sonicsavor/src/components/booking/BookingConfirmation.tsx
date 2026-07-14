"use client";

interface BookingConfirmationProps {
  booking: {
    confirmationCode: string;
    tableType: string;
    date: string;
    time: string;
    partySize: number;
    guestName: string;
  };
  onDone: () => void;
}

export default function BookingConfirmation({
  booking,
  onDone,
}: BookingConfirmationProps) {
  return (
    <div className="text-center space-y-6">
      {/* Success Icon */}
      <div className="w-20 h-20 mx-auto bg-[#2CB67D]/20 rounded-full flex items-center justify-center">
        <svg
          className="w-10 h-10 text-[#2CB67D]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-[#FFFFFE] mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-[#94A1B2]">
          Thank you, {booking.guestName}. Your table is reserved.
        </p>
      </div>

      {/* Confirmation Code */}
      <div className="bg-[#1A1A2E] border border-[#232946] rounded-xl p-6">
        <p className="text-sm text-[#94A1B2] mb-2">Confirmation Code</p>
        <p className="text-3xl font-mono font-bold text-[#E85D04] tracking-wider">
          {booking.confirmationCode}
        </p>
        <p className="text-xs text-[#94A1B2] mt-2">
          Show this code when you arrive
        </p>
      </div>

      {/* Booking Details */}
      <div className="bg-[#1A1A2E] border border-[#232946] rounded-xl p-4 text-left space-y-3">
        <div className="flex justify-between">
          <span className="text-[#94A1B2]">Table Type</span>
          <span className="text-[#FFFFFE] capitalize">{booking.tableType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#94A1B2]">Date</span>
          <span className="text-[#FFFFFE]">{booking.date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#94A1B2]">Time</span>
          <span className="text-[#FFFFFE]">{booking.time}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#94A1B2]">Party Size</span>
          <span className="text-[#FFFFFE]">{booking.partySize} guests</span>
        </div>
      </div>

      {/* Info Note */}
      <div className="bg-[#F58AE0]/10 border border-[#F58AE0]/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-[#F58AE0] mt-0.5 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
          <p className="text-sm text-[#F58AE0] text-left">
            A confirmation email has been sent to your email address. Please
            arrive 10 minutes before your reservation time.
          </p>
        </div>
      </div>

      {/* Done Button */}
      <button
        onClick={onDone}
        className="w-full py-4 bg-[#E85D04] text-[#FFFFFE] font-semibold rounded-lg hover:bg-[#E85D04]/90 transition-colors duration-200 cursor-pointer"
      >
        Done
      </button>
    </div>
  );
}
