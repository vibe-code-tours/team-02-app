"use client";

import { useState } from "react";
import BookingForm from "@/components/booking/BookingForm";
import BookingConfirmation from "@/components/booking/BookingConfirmation";

export default function BookingPage() {
  const [step, setStep] = useState<"form" | "confirmation">("form");
  const [bookingData, setBookingData] = useState<{
    confirmationCode: string;
    tableType: string;
    date: string;
    time: string;
    partySize: number;
    guestName: string;
  } | null>(null);

  const handleBookingSubmit = (data: {
    tableType: string;
    date: string;
    time: string;
    partySize: number;
    guestName: string;
    guestEmail: string;
    occasion: string;
    specialRequests: string;
  }) => {
    // Mock booking - in real app, call API
    setBookingData({
      confirmationCode: "SONIC-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      tableType: data.tableType,
      date: data.date,
      time: data.time,
      partySize: data.partySize,
      guestName: data.guestName,
    });
    setStep("confirmation");
  };

  return (
    <main className="min-h-screen bg-[#0F0E17] pb-24">
      <div className="max-w-lg mx-auto px-4 py-8">
        {step === "form" ? (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-[#FFFFFE] mb-2">
                Book a Table
              </h1>
              <p className="text-[#94A1B2]">
                Reserve your spot for a mood-driven dining experience
              </p>
            </div>
            <BookingForm onSubmit={handleBookingSubmit} />
          </>
        ) : bookingData ? (
          <BookingConfirmation
            booking={bookingData}
            onDone={() => {
              setStep("form");
              setBookingData(null);
            }}
          />
        ) : null}
      </div>
    </main>
  );
}
