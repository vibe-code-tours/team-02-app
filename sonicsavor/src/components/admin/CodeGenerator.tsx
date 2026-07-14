"use client";

import { useState, useEffect } from "react";

interface AccessCode {
  id: string;
  code: string;
  created_at: string;
  used: boolean;
  used_at: string | null;
}

interface CodeGeneratorProps {
  adminCode: string;
}

export default function CodeGenerator({ adminCode }: CodeGeneratorProps) {
  const [codes, setCodes] = useState<AccessCode[]>([]);
  const [newCodes, setNewCodes] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load existing codes
  useEffect(() => {
    fetch(`/api/admin/codes?adminCode=${encodeURIComponent(adminCode)}`)
      .then((res) => res.json())
      .then((data) => setCodes(data.codes ?? []))
      .catch(() => {});
  }, [adminCode]);

  const generate = async () => {
    setIsLoading(true);
    setError(null);
    setNewCodes([]);

    try {
      const res = await fetch("/api/admin/codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminCode, count }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate codes");
      }

      const data = await res.json();
      setNewCodes(data.codes);

      // Refresh the list
      const listRes = await fetch(`/api/admin/codes?adminCode=${encodeURIComponent(adminCode)}`);
      const listData = await listRes.json();
      setCodes(listData.codes ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-zinc-200 dark:border-stone-800 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-stone-50 font-[family-name:var(--font-display)]">
        Generate Access Codes
      </h2>

      <div className="flex items-center gap-3 mb-4">
        <label className="text-sm text-zinc-600 dark:text-stone-400">Count:</label>
        <input
          type="number"
          min={1}
          max={20}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-16 px-2 py-1 border border-zinc-200 dark:border-stone-800 rounded bg-zinc-50 dark:bg-stone-800 text-zinc-900 dark:text-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
        />
        <button
          onClick={generate}
          disabled={isLoading}
          className="px-4 py-2 bg-stone-200 text-stone-900 rounded-lg hover:bg-stone-100 transition cursor-pointer disabled:opacity-50"
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {newCodes.length > 0 && (
        <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300 mb-2">New codes generated:</p>
          <div className="flex flex-wrap gap-2">
            {newCodes.map((code) => (
              <code
                key={code}
                className="px-3 py-1 bg-white dark:bg-stone-800 border border-emerald-300 dark:border-emerald-700 rounded font-mono text-sm text-zinc-900 dark:text-stone-50"
              >
                {code}
              </code>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-medium text-zinc-700 dark:text-stone-300 mb-2">
          All Codes ({codes.length})
        </h3>
        <div className="max-h-64 overflow-y-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-500 dark:text-stone-400 border-b border-zinc-200 dark:border-stone-800">
                <th className="pb-1">Code</th>
                <th className="pb-1">Status</th>
                <th className="pb-1">Created</th>
              </tr>
            </thead>
            <tbody>
              {codes.map((c) => (
                <tr key={c.id} className="border-b border-zinc-200 dark:border-stone-800 last:border-0">
                  <td className="py-1 font-mono text-zinc-900 dark:text-stone-50">{c.code}</td>
                  <td className="py-1">
                    {c.used ? (
                      <span className="text-red-600 dark:text-red-400">Used</span>
                    ) : (
                      <span className="text-emerald-600 dark:text-emerald-400">Active</span>
                    )}
                  </td>
                  <td className="py-1 text-zinc-500 dark:text-stone-400">
                    {new Date(c.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
