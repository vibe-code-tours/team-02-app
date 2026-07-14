"use client";

import { useState } from "react";

interface AccessCodeFormProps {
  onAuthenticated: () => void;
}

export default function AccessCodeForm({ onAuthenticated }: AccessCodeFormProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Invalid code");
      }

      onAuthenticated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-stone-950 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-zinc-900 dark:text-stone-50 mb-2 font-[family-name:var(--font-display)]">
          SonicSavor
        </h1>
        <p className="text-sm text-center text-zinc-500 dark:text-stone-400 mb-8">
          Enter your access code to continue
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="XXXX-XXXX"
            maxLength={9}
            className="w-full px-4 py-3 text-center text-lg font-mono tracking-widest
              bg-white dark:bg-stone-900
              border border-zinc-200 dark:border-stone-800
              rounded-xl
              text-zinc-900 dark:text-stone-50
              placeholder:text-zinc-300 dark:placeholder:text-zinc-700
              focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-stone-500"
            autoFocus
          />

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!code.trim() || isLoading}
            className="w-full py-3 rounded-xl font-medium
              bg-stone-800 text-white
              dark:bg-stone-200 dark:text-stone-900
              hover:opacity-90 transition cursor-pointer
              disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying..." : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
