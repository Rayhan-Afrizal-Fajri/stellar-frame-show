import React from "react";

// Optimized GPU-accelerated liquid background
// No heavy SVG filters, no mix-blend modes, no CPU-bound continuous JS animation
export const LiquidBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none will-change-transform"
      aria-hidden="true"
    >
      {/* Liquid Gradient Orbs with native hardware-accelerated CSS transforms */}
      <div className="absolute inset-0 transform-gpu">
        {/* Orb 1: Deep Indigo / Violet (Top Right) */}
        <div
          className="absolute -top-20 -right-20 w-[30rem] h-[30rem] sm:w-[40rem] sm:h-[40rem] rounded-full opacity-40 dark:opacity-30 blur-[60px] sm:blur-[80px] animate-liquid-drift-1 transform-gpu will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, rgba(139, 92, 246, 0.25) 50%, transparent 70%)",
          }}
        />

        {/* Orb 2: Ocean Cyan (Top Left / Center) */}
        <div
          className="absolute top-1/4 -left-20 w-[26rem] h-[26rem] sm:w-[36rem] sm:h-[36rem] rounded-full opacity-35 dark:opacity-25 blur-[60px] sm:blur-[80px] animate-liquid-drift-2 transform-gpu will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(14, 165, 233, 0.55) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)",
            animationDelay: "-6s",
          }}
        />

        {/* Orb 3: Subtle Sunset Rose (Bottom Left) */}
        <div
          className="absolute bottom-10 left-10 w-[24rem] h-[24rem] sm:w-[32rem] sm:h-[32rem] rounded-full opacity-25 dark:opacity-20 blur-[60px] sm:blur-[80px] animate-liquid-drift-1 transform-gpu will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(244, 63, 94, 0.4) 0%, rgba(217, 70, 239, 0.15) 50%, transparent 70%)",
            animationDelay: "-10s",
          }}
        />

        {/* Orb 4: Emerald Glow (Center Right) */}
        <div
          className="absolute top-2/3 -right-10 w-[22rem] h-[22rem] sm:w-[28rem] sm:h-[28rem] rounded-full opacity-25 dark:opacity-20 blur-[60px] sm:blur-[80px] animate-liquid-drift-2 transform-gpu will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.45) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 70%)",
            animationDelay: "-14s",
          }}
        />
      </div>

      {/* Lightweight subtle mesh overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />
    </div>
  );
};
