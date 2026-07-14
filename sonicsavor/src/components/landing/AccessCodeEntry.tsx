"use client";

import { useState, useRef, useEffect } from "react";

interface AccessCodeEntryProps {
  onSubmit: (code: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
  error?: string | null;
}

export default function AccessCodeEntry({
  onSubmit,
  disabled = false,
  isLoading = false,
  error = null,
}: AccessCodeEntryProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus first input
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (disabled || isLoading) return;

    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits entered
    if (newCode.every((digit) => digit !== "")) {
      onSubmit(newCode.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);

    if (pastedData) {
      const newCode = pastedData.split("").concat(Array(6).fill("")).slice(0, 6);
      setCode(newCode);

      // Focus last filled input or last input
      const lastFilledIndex = Math.min(pastedData.length - 1, 5);
      inputRefs.current[lastFilledIndex]?.focus();

      // Auto-submit if 6 digits pasted
      if (pastedData.length === 6) {
        onSubmit(pastedData);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Code inputs */}
      <div className="flex justify-center gap-2 sm:gap-3">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled || isLoading}
            className={`
              w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold
              bg-[#1A1926] border-2 rounded-xl
              text-[#F5F3F0]
              focus:outline-none focus:border-[#E85D04] focus:ring-2 focus:ring-[#E85D04]/20
              transition-all
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? "border-[#E63946]" : "border-[#242334]"}
            `}
          />
        ))}
      </div>

      {/* Error message */}
      {error && (
        <div className="text-center text-[#E63946] text-sm animate-pulse">
          {error}
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="text-center text-[#A7A4B8] text-sm">
          Verifying code...
        </div>
      )}

      {/* Hint */}
      <p className="text-center text-sm text-[#A7A4B8]">
        Enter the 6-digit code from our staff
      </p>
    </div>
  );
}
