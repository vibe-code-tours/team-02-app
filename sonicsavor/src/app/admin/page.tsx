"use client";

import { useState } from "react";
import CodeGenerator from "@/components/admin/CodeGenerator";

export default function AdminPage() {
  const [adminCode, setAdminCode] = useState<string | null>(null);
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (adminCode) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 font-[family-name:var(--font-display)]">
              Admin Dashboard
            </h1>
            <button
              onClick={() => setAdminCode(null)}
              className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition cursor-pointer"
            >
              Lock
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h2 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-zinc-50 font-[family-name:var(--font-display)]">Menu Management</h2>
              <p className="text-zinc-500 dark:text-zinc-400">Edit menu items and descriptions</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h2 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-zinc-50 font-[family-name:var(--font-display)]">View Feedback</h2>
              <p className="text-zinc-500 dark:text-zinc-400">See customer ratings and comments</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h2 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-zinc-50 font-[family-name:var(--font-display)]">Analytics</h2>
              <p className="text-zinc-500 dark:text-zinc-400">View usage statistics</p>
            </div>
          </div>

          <CodeGenerator adminCode={adminCode} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-2 text-zinc-900 dark:text-zinc-50 font-[family-name:var(--font-display)]">
          Admin Access
        </h1>
        <p className="text-sm text-center text-zinc-500 dark:text-zinc-400 mb-6">
          Enter the admin code to continue
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (inputCode === process.env.NEXT_PUBLIC_ADMIN_ACCESS_CODE) {
              setAdminCode(inputCode);
            } else {
              setError("Invalid admin code");
            }
          }}
          className="flex flex-col gap-4"
        >
          <input
            type="password"
            value={inputCode}
            onChange={(e) => {
              setInputCode(e.target.value);
              setError(null);
            }}
            placeholder="Admin code"
            className="w-full px-4 py-3 text-center border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-400"
            autoFocus
          />
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <button
            type="submit"
            disabled={!inputCode}
            className="w-full py-3 bg-stone-200 text-stone-900 rounded-lg hover:bg-stone-100 transition cursor-pointer disabled:opacity-50"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
