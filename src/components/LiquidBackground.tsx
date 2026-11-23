import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const LiquidBackground: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for cursor follow
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to window dimensions
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 60);
      mouseY.set((clientY / innerHeight - 0.5) * 60);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none"
      aria-hidden="true"
    >
      {/* Dynamic ambient liquid mesh orbs */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute inset-0 transition-transform duration-700 ease-out"
      >
        {/* Blob 1: Deep Indigo / Violet (Top Right) */}
        <div
          className="absolute -top-32 -right-24 w-[36rem] h-[36rem] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[90px] opacity-45 dark:opacity-40 animate-liquid-drift-1"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.7) 0%, rgba(139, 92, 246, 0.4) 50%, transparent 75%)",
          }}
        />

        {/* Blob 2: Cyan / Ocean Blue (Top Left / Center) */}
        <div
          className="absolute top-1/4 -left-32 w-[34rem] h-[34rem] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-40 dark:opacity-35 animate-liquid-drift-2"
          style={{
            background:
              "radial-gradient(circle, rgba(14, 165, 233, 0.7) 0%, rgba(59, 130, 246, 0.4) 50%, transparent 75%)",
            animationDelay: "-4s",
          }}
        />

        {/* Blob 3: Rose / Sunset Magenta (Bottom Left) */}
        <div
          className="absolute bottom-20 left-10 w-[30rem] h-[30rem] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[95px] opacity-35 dark:opacity-30 animate-liquid-drift-1"
          style={{
            background:
              "radial-gradient(circle, rgba(244, 63, 94, 0.5) 0%, rgba(217, 70, 239, 0.3) 50%, transparent 75%)",
            animationDelay: "-8s",
          }}
        />

        {/* Blob 4: Emerald / Mint Glow (Center Right) */}
        <div
          className="absolute top-2/3 -right-20 w-[28rem] h-[28rem] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[90px] opacity-30 dark:opacity-25 animate-liquid-drift-2"
          style={{
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.55) 0%, rgba(6, 182, 212, 0.35) 50%, transparent 75%)",
            animationDelay: "-12s",
          }}
        />
      </motion.div>

      {/* Apple-style fine optical noise texture for authentic frosted glass refraction */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette & subtle ambient top gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/50 pointer-events-none" />
    </div>
  );
};

