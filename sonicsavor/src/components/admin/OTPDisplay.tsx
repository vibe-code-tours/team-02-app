"use client";

import { useState, useEffect } from "react";

interface OTPDisplayProps {
  code: string;
  guestName: string;
  tableInfo: string;
  expiresIn: number;
  onDismiss: () => void;
  onCopy: () => void;
}

export default function OTPDisplay({
  code,
  guestName,
  tableInfo,
  expiresIn,
  onDismiss,
  onCopy,
}: OTPDisplayProps) {
  const [timeLeft, setTimeLeft] = useState(expiresIn);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#1A1926] rounded-xl p-6 border border-[#2EC4B6] animate-[fadeIn_0.3s_ease-out]">
      <div className="flex items-center gap-3 mb-4">
        <svg className="w-6 h-6 text-[#2EC4B6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <h2 className="text-lg font-semibold text-[#F5F3F0]">OTP Generated!</h2>
      </div>

      <div className="bg-[#0F0E17] rounded-xl p-6 mb-4">
        <div className="text-center">
          <div className="text-4xl sm:text-5xl font-mono font-bold text-[#FFB703] tracking-widest">
            {code.split("").join(" ")}
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-[#A7A4B8]">Guest:</span>
          <span className="text-[#F5F3F0]">{guestName}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#A7A4B8]">Table:</span>
          <span className="text-[#F5F3F0]">{tableInfo}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#A7A4B8]">Expires in:</span>
          <span className={timeLeft > 60 ? "text-[#2EC4B6]" : "text-[#E63946]"}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 py-3 bg-[#242334] hover:bg-[#2A2940] text-[#F5F3F0] font-medium rounded-xl transition-colors duration-200 cursor-pointer"
        >
          {copied ? "Copied!" : "Copy Code"}
        </button>
        <button
          onClick={onDismiss}
          className="flex-1 py-3 bg-[#E85D04] hover:bg-[#E85D04]/90 text-[#F5F3F0] font-medium rounded-xl transition-colors duration-200 cursor-pointer"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
