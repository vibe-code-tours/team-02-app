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
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-sm text-[#A7A4B8]">Count:</label>
        <input
          type="number"
          min={1}
          max={20}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-16 px-2 py-1 border border-[#242334] bg-[#0F0E17] rounded text-[#F5F3F0] focus:outline-none focus:border-[#E85D04]"
        />
        <button
          onClick={generate}
          disabled={isLoading}
          className="px-4 py-2 bg-[#E85D04] text-[#F5F3F0] rounded-lg hover:bg-[#E85D04]/90 transition disabled:opacity-50"
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
      </div>

      {error && <p className="text-sm text-[#E63946]">{error}</p>}

      {newCodes.length > 0 && (
        <div className="p-4 bg-[#2EC4B6]/10 rounded-lg border border-[#2EC4B6]/30">
          <p className="text-sm font-medium text-[#2EC4B6] mb-2">New codes generated:</p>
          <div className="flex flex-wrap gap-2">
            {newCodes.map((code) => (
              <code
                key={code}
                className="px-3 py-1 bg-[#0F0E17] border border-[#2EC4B6]/50 rounded font-mono text-sm text-[#F5F3F0]"
              >
                {code}
              </code>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-medium text-[#A7A4B8] mb-2">
          All Codes ({codes.length})
        </h3>
        <div className="max-h-64 overflow-y-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#A7A4B8] border-b border-[#242334]">
                <th className="pb-1">Code</th>
                <th className="pb-1">Status</th>
                <th className="pb-1">Created</th>
              </tr>
            </thead>
            <tbody>
              {codes.map((c) => (
                <tr key={c.id} className="border-b border-[#242334] last:border-0">
                  <td className="py-1 font-mono text-[#F5F3F0]">{c.code}</td>
                  <td className="py-1">
                    {c.used ? (
                      <span className="text-[#E63946]">Used</span>
                    ) : (
                      <span className="text-[#2EC4B6]">Active</span>
                    )}
                  </td>
                  <td className="py-1 text-[#A7A4B8]">
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
