"use client";

import { useState } from "react";

interface RegistrationPromptProps {
  onRegister: (email: string, name: string) => void;
  onSkip: () => void;
}

export default function RegistrationPrompt({
  onRegister,
  onSkip,
}: RegistrationPromptProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      onRegister(email, name);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 mx-auto bg-[#E85D04]/20 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-[#E85D04]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-[#F5F3F0] mb-2">
          Save Your Preferences
        </h2>
        <p className="text-[#A7A4B8] text-sm">
          Register to save your order history and get personalized
          recommendations next time
        </p>
      </div>

      {/* Benefits */}
      <div className="bg-[#1A1926] border border-[#242334] rounded-xl p-4">
        <h3 className="text-sm font-medium text-[#F5F3F0] mb-3">
          Member Benefits
        </h3>
        <ul className="space-y-2">
          {[
            "Order history saved",
            "Favorite dishes tracked",
            "Faster checkout next time",
            "Rewards points: +100",
          ].map((benefit) => (
            <li
              key={benefit}
              className="flex items-center gap-2 text-sm text-[#A7A4B8]"
            >
              <svg
                className="w-4 h-4 text-[#2EC4B6]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="reg-name"
            className="block text-sm font-medium text-[#F5F3F0] mb-2"
          >
            Your Name
          </label>
          <input
            id="reg-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 bg-[#1A1926] border border-[#242334] rounded-lg text-[#F5F3F0] placeholder-[#A7A4B8] focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04] outline-none transition-colors duration-200"
            required
          />
        </div>
        <div>
          <label
            htmlFor="reg-email"
            className="block text-sm font-medium text-[#F5F3F0] mb-2"
          >
            Email Address
          </label>
          <input
            id="reg-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 bg-[#1A1926] border border-[#242334] rounded-lg text-[#F5F3F0] placeholder-[#A7A4B8] focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04] outline-none transition-colors duration-200"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#E85D04] text-[#F5F3F0] font-semibold rounded-lg hover:bg-[#E85D04]/90 transition-colors duration-200 cursor-pointer"
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            Register
          </span>
        </button>
      </form>

      {/* Skip */}
      <button
        onClick={onSkip}
        className="w-full py-3 text-[#A7A4B8] hover:text-[#F5F3F0] transition-colors duration-200 text-sm cursor-pointer"
      >
        Skip for now
      </button>
    </div>
  );
}
