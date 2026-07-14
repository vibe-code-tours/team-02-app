"use client";

import { useState } from "react";
import CodeGenerator from "@/components/admin/CodeGenerator";

export default function AdminPage() {
  const [adminCode, setAdminCode] = useState<string | null>(null);
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (adminCode) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <button
              onClick={() => setAdminCode(null)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Lock
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">Menu Management</h2>
              <p className="text-gray-600">Edit menu items and descriptions</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">View Feedback</h2>
              <p className="text-gray-600">See customer ratings and comments</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">Analytics</h2>
              <p className="text-gray-600">View usage statistics</p>
            </div>
          </div>

          <CodeGenerator adminCode={adminCode} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-2">Admin Access</h1>
        <p className="text-sm text-center text-gray-500 mb-6">
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
            className="w-full px-4 py-3 text-center border rounded-lg"
            autoFocus
          />
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <button
            type="submit"
            disabled={!inputCode}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
