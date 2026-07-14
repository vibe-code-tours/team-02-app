"use client";

interface Session {
  sessionToken: string;
  tableId: string;
  tableType: string;
  guestName: string;
  otpCode: string;
  startedAt: string;
  expiresAt: string;
  status: "active" | "expired";
  totalSpent: number;
}

interface ActiveSessionsProps {
  sessions: Session[];
  onRevoke: (sessionToken: string) => void;
}

export default function ActiveSessions({
  sessions,
  onRevoke,
}: ActiveSessionsProps) {
  const activeSessions = sessions.filter((s) => s.status === "active");

  return (
    <div className="bg-[#1A1926] rounded-xl p-6 border border-[#242334]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-[#A7A4B8] uppercase tracking-wider">
          Active Sessions
        </h2>
        <span className="text-sm text-[#2EC4B6]">
          {activeSessions.length} active
        </span>
      </div>

      {activeSessions.length === 0 ? (
        <div className="text-center py-8">
          <span className="text-4xl">🔒</span>
          <p className="text-[#A7A4B8] mt-2">No active sessions</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activeSessions.map((session) => (
            <div
              key={session.sessionToken}
              className="flex items-center justify-between p-4 bg-[#0F0E17] rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#242334] rounded-lg flex items-center justify-center">
                  <span className="text-lg">🔒</span>
                </div>
                <div>
                  <div className="font-medium text-[#F5F3F0]">
                    {session.tableType} • {session.tableId}
                  </div>
                  <div className="text-sm text-[#A7A4B8]">
                    {session.guestName} • Code: {session.otpCode}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-[#2EC4B6]">
                    ${session.totalSpent.toFixed(2)}
                  </div>
                  <div className="text-xs text-[#A7A4B8]">
                    {new Date(session.startedAt).toLocaleTimeString()}
                  </div>
                </div>
                <button
                  onClick={() => onRevoke(session.sessionToken)}
                  className="px-3 py-2 bg-[#E63946]/20 hover:bg-[#E63946]/30 text-[#E63946] text-sm font-medium rounded-lg transition-colors"
                >
                  Revoke
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
