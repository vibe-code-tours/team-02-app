"use client";

import { useState } from "react";

interface EmailInputProps {
  onSubmit: (email: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function EmailInput({
  onSubmit,
  disabled = false,
  isLoading = false,
}: EmailInputProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || disabled) return;
    onSubmit(email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={disabled || isLoading}
          aria-label="Email address"
          className="w-full px-5 py-4 pl-12 bg-[#1A1926] border border-[#242334] rounded-xl text-[#F5F3F0] placeholder-[#A7A4B8] focus:outline-none focus:border-[#E85D04] focus:ring-2 focus:ring-[#E85D04]/20 transition-all duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A7A4B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </div>

      <button
        type="submit"
        disabled={disabled || isLoading || !email}
        className="w-full py-4 bg-[#E85D04] hover:bg-[#E85D04]/90 disabled:bg-[#242334] disabled:text-[#A7A4B8] text-[#F5F3F0] font-semibold rounded-xl transition-all duration-200 text-lg disabled:cursor-not-allowed cursor-pointer"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Sending...
          </span>
        ) : (
          "Get Access Code"
        )}
      </button>
    </form>
  );
}
