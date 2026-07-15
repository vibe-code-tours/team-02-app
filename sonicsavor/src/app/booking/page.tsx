"use client";

import { useState } from "react";
import Link from "next/link";
import TableSelector from "@/components/booking/TableSelector";

export default function BookingPage() {
  const [step, setStep] = useState<"form" | "confirm" | "success">("form");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [bookingDetails, setBookingDetails] = useState<{
    date: string;
    time: string;
    tableType: string;
    partySize: number;
  } | null>(null);

  const handleGuestInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestName && guestPhone) {
      setStep("confirm");
    }
  };

  const handleTableConfirm = (booking: {
    date: string;
    time: string;
    tableType: string;
    partySize: number;
    guestName: string;
    guestPhone: string;
  }) => {
    setBookingDetails(booking);
    setStep("success");
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTableLabel = (type: string) => {
    switch (type) {
      case "family": return "Family Table";
      case "squad": return "Squad Table";
      case "duo": return "Duo Table";
      case "single": return "Solo Table";
      case "private": return "Private Room";
      default: return type;
    }
  };

  return (
    <main className="min-h-screen bg-[#0F0E17]">
      {/* Header */}
      <header className="bg-[#1A1926] border-b border-[#242334] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-[#F5F3F0] font-semibold text-xl tracking-tight hover:text-[#E85D04] transition-colors duration-200"
          >
            SonicSavor
          </Link>
          <Link
            href="/"
            className="text-[#A7A4B8] hover:text-[#F5F3F0] text-sm transition-colors duration-200"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {step === "form" && (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-[#F5F3F0] mb-4">
                Reserve Your Table
              </h1>
              <p className="text-[#A7A4B8] text-lg max-w-2xl mx-auto">
                Book your perfect dining experience. Choose from Family, Squad, Duo, Solo, or Private tables.
              </p>
            </div>

            {/* Guest Info Form */}
            <div className="bg-[#1A1926] border border-[#242334] rounded-2xl p-8 mb-8">
              <h2 className="text-[#F5F3F0] font-semibold text-xl mb-6">Your Information</h2>

              <form onSubmit={handleGuestInfoSubmit} className="space-y-6">
                <div>
                  <label className="block text-[#A7A4B8] text-sm mb-2">Name *</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-[#0F0E17] border border-[#242334] rounded-xl text-[#F5F3F0] placeholder-[#A7A4B8]/50 focus:border-[#E85D04] outline-none transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-[#A7A4B8] text-sm mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    required
                    placeholder="+95 9 123 456"
                    className="w-full px-4 py-3 bg-[#0F0E17] border border-[#242334] rounded-xl text-[#F5F3F0] placeholder-[#A7A4B8]/50 focus:border-[#E85D04] outline-none transition-colors duration-200"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!guestName || !guestPhone}
                  className="w-full bg-[#E85D04] hover:bg-[#E85D04]/90 disabled:bg-[#242334] disabled:text-[#A7A4B8] text-[#F5F3F0] font-semibold py-4 rounded-xl transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
                >
                  Continue to Table Selection →
                </button>
              </form>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#1A1926] border border-[#242334] rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-[#2EC4B6]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#2EC4B6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-[#F5F3F0] font-medium mb-1">Instant Confirmation</h3>
                <p className="text-[#A7A4B8] text-sm">Get your booking code immediately</p>
              </div>

              <div className="bg-[#1A1926] border border-[#242334] rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-[#E85D04]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#E85D04]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-[#F5F3F0] font-medium mb-1">Secure Booking</h3>
                <p className="text-[#A7A4B8] text-sm">Your data is protected</p>
              </div>

              <div className="bg-[#1A1926] border border-[#242334] rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-[#9D4EDD]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#9D4EDD]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-[#F5F3F0] font-medium mb-1">Free Cancellation</h3>
                <p className="text-[#A7A4B8] text-sm">Cancel up to 2 hours before</p>
              </div>
            </div>
          </>
        )}

        {step === "confirm" && (
          <>
            {/* Back Button */}
            <button
              onClick={() => setStep("form")}
              className="text-[#A7A4B8] hover:text-[#F5F3F0] text-sm mb-6 transition-colors duration-200 cursor-pointer"
            >
              ← Back to Guest Info
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-[#F5F3F0] mb-2">
                Choose Your Table
              </h1>
              <p className="text-[#A7A4B8]">
                Booking as <span className="text-[#F5F3F0]">{guestName}</span>
              </p>
            </div>

            {/* Table Selector */}
            <TableSelector
              onConfirm={handleTableConfirm}
              guestName={guestName}
              guestPhone={guestPhone}
            />
          </>
        )}

        {step === "success" && bookingDetails && (
          <div className="max-w-md mx-auto text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-[#2EC4B6]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#2EC4B6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-[#F5F3F0] mb-4">Table Reserved!</h1>
            <p className="text-[#A7A4B8] mb-8">
              Your table has been successfully reserved. Show this confirmation when you arrive.
            </p>

            {/* Booking Card */}
            <div className="bg-[#1A1926] border border-[#242334] rounded-2xl p-8 mb-8">
              <div className="text-[#E85D04] text-5xl font-bold mb-4">
                BOOK-{Math.random().toString(36).substring(2, 6).toUpperCase()}
              </div>
              <p className="text-[#A7A4B8] text-sm mb-6">Booking Code</p>

              <div className="space-y-4 text-left">
                <div className="flex justify-between py-3 border-b border-[#242334]">
                  <span className="text-[#A7A4B8]">Date</span>
                  <span className="text-[#F5F3F0]">{formatDate(bookingDetails.date)}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#242334]">
                  <span className="text-[#A7A4B8]">Time</span>
                  <span className="text-[#F5F3F0]">{bookingDetails.time}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#242334]">
                  <span className="text-[#A7A4B8]">Table Type</span>
                  <span className="text-[#F5F3F0]">{getTableLabel(bookingDetails.tableType)}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-[#A7A4B8]">Party Size</span>
                  <span className="text-[#F5F3F0]">{bookingDetails.partySize} guests</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Link
                href="/"
                className="block w-full bg-[#E85D04] hover:bg-[#E85D04]/90 text-[#F5F3F0] font-semibold py-4 rounded-xl transition-all duration-200"
              >
                Back to Home
              </Link>
              <button
                onClick={() => {
                  setStep("form");
                  setGuestName("");
                  setGuestPhone("");
                  setBookingDetails(null);
                }}
                className="block w-full bg-[#242334] hover:bg-[#242334]/80 text-[#F5F3F0] font-medium py-4 rounded-xl transition-all duration-200 cursor-pointer"
              >
                Book Another Table
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
