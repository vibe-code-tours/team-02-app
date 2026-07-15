"use client";

import { useRouter } from "next/navigation";

export default function PublicHeader() {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F0E17]/80 backdrop-blur-md border-b border-[#242334]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center">
        {/* Logo */}
        <button
          onClick={() => router.push("/")}
          aria-label="Go to homepage"
          className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#E85D04] focus:ring-offset-2 focus:ring-offset-[#0F0E17] rounded-lg px-2 py-1 transition-all duration-200"
        >
          <svg className="w-8 h-8 text-[#E85D04]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
          <span className="text-lg font-bold text-[#F5F3F0]">SonicSavor</span>
        </button>
      </div>
    </header>
  );
}
