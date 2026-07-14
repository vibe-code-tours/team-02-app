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
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Generate Access Codes</h2>

      <div className="flex items-center gap-3 mb-4">
        <label className="text-sm text-gray-600">Count:</label>
        <input
          type="number"
          min={1}
          max={20}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-16 px-2 py-1 border rounded"
        />
        <button
          onClick={generate}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {newCodes.length > 0 && (
        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm font-medium text-green-800 mb-2">New codes generated:</p>
          <div className="flex flex-wrap gap-2">
            {newCodes.map((code) => (
              <code
                key={code}
                className="px-3 py-1 bg-white border border-green-300 rounded font-mono text-sm"
              >
                {code}
              </code>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          All Codes ({codes.length})
        </h3>
        <div className="max-h-64 overflow-y-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-1">Code</th>
                <th className="pb-1">Status</th>
                <th className="pb-1">Created</th>
              </tr>
            </thead>
            <tbody>
              {codes.map((c) => (
                <tr key={c.id} className="border-b last:border-0">
                  <td className="py-1 font-mono">{c.code}</td>
                  <td className="py-1">
                    {c.used ? (
                      <span className="text-red-600">Used</span>
                    ) : (
                      <span className="text-green-600">Active</span>
                    )}
                  </td>
                  <td className="py-1 text-gray-500">
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
