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
        <svg
          viewBox="0 0 1200 120"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z"
            fill="#E85D04"
            opacity="0.5"
          />
          <path
            d="M0,70 Q150,30 300,70 T600,70 T900,70 T1200,70 L1200,120 L0,120 Z"
            fill="#E85D04"
            opacity="0.3"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 text-center max-w-xl w-full">
        {/* Logo */}
        <div className="mb-6">
          <span className="text-5xl">🎵</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-[#F5F3F0] mb-4">
          SonicSavor
        </h1>

        {/* Tagline */}
        <p className="text-lg text-[#A7A4B8] mb-10">
          Where music meets flavor
        </p>

        {/* Children (Form goes here) */}
        {children}
      </div>
    </section>
  );
}
