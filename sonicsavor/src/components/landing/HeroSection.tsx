"use client";

interface HeroSectionProps {
  children?: React.ReactNode;
}

export default function HeroSection({ children }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "linear-gradient(135deg, #0F0E17 0%, #9D4EDD 50%, #0F0E17 100%)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 10s ease infinite",
        }}
      />

      {/* Waveform decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden opacity-20">
        <svg viewBox="0 0 1200 120" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z" fill="#E85D04" opacity="0.5"/>
          <path d="M0,70 Q150,30 300,70 T600,70 T900,70 T1200,70 L1200,120 L0,120 Z" fill="#E85D04" opacity="0.3"/>
        </svg>
      </div>

      {/* Respect prefers-reduced-motion */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style] {
            animation: none !important;
          }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 text-center max-w-xl w-full">
        {/* Logo - SVG instead of emoji */}
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto text-[#E85D04]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-[#F5F3F0] mb-4">
          SonicSavor
        </h1>

        {/* Tagline */}
        <p className="text-lg text-[#A7A4B8] mb-6">
          Where music meets flavor
        </p>

        {/* What is SonicSavor? - Clean, seamless layout */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#F5F3F0] mb-2">
            What is SonicSavor?
          </h2>
          <p className="text-[#A7A4B8] text-sm leading-relaxed mb-6">
            A mood-driven dining experience. We use AI to understand how you're feeling and recommend the perfect meal + playlist combo.
          </p>

          {/* 3-step process - Horizontal, clean */}
          <div className="flex justify-center gap-6 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#9D4EDD] flex items-center justify-center flex-shrink-0">
                <span className="text-[#F5F3F0] font-bold text-xs">1</span>
              </div>
              <p className="text-[#A7A4B8] text-sm">Tell us your mood</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#E85D04] flex items-center justify-center flex-shrink-0">
                <span className="text-[#F5F3F0] font-bold text-xs">2</span>
              </div>
              <p className="text-[#A7A4B8] text-sm">Get a 3-course recommendation</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#2EC4B6] flex items-center justify-center flex-shrink-0">
                <span className="text-[#F5F3F0] font-bold text-xs">3</span>
              </div>
              <p className="text-[#A7A4B8] text-sm">Enjoy with the perfect playlist</p>
            </div>
          </div>
        </div>

        {/* Children (Form goes here) */}
        {children}

        {/* Secondary CTA - Reserve Table */}
        <div className="mt-6">
          <a
            href="/booking"
            className="inline-block px-6 py-3 bg-[#242334] hover:bg-[#242334]/80 text-[#F5F3F0] font-medium rounded-xl transition-all duration-200 border border-[#242334] hover:border-[#E85D04]/50"
          >
            Reserve Table →
          </a>
        </div>
      </div>
    </section>
  );
}
