import React, { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";
import type { FxIntensity } from "@/config/themes";

/* ============================================================================
   MATRIX DIGITAL RAIN CANVAS (Terminal Theme)
   Ultra-lightweight, throttled to ~22fps, pauses when tab hidden or FX=off
   ============================================================================ */
const MatrixRainCanvas: React.FC<{ intensity: FxIntensity }> = ({ intensity }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (intensity === "off") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ>_#[]{}";
    const fontSize = 15;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let columns = Math.max(1, Math.floor(width / (fontSize * (intensity === "subtle" ? 1.8 : 1.25))));
    let drops = Array.from({ length: columns }, () => Math.random() * -40);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.max(1, Math.floor(width / (fontSize * (intensity === "subtle" ? 1.8 : 1.25))));
      drops = Array.from({ length: columns }, () => Math.random() * -40);
    };
    window.addEventListener("resize", handleResize);

    let rafId = 0;
    let lastTick = 0;
    const frameInterval = 46; // ~22 FPS for retro CRT vibe + near-zero CPU usage

    const draw = (now: number) => {
      rafId = window.requestAnimationFrame(draw);
      if (document.hidden || now - lastTick < frameInterval) return;
      lastTick = now;

      ctx.fillStyle = "rgba(3, 10, 4, 0.12)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      const stepX = width / columns;

      for (let i = 0; i < columns; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * stepX;
        const y = drops[i] * fontSize;

        ctx.fillStyle =
          Math.random() > 0.94
            ? "rgba(184, 255, 203, 0.85)"
            : intensity === "subtle"
              ? "rgba(0, 255, 102, 0.32)"
              : "rgba(0, 255, 102, 0.52)";
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.85;
      }
    };

    rafId = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [intensity]);

  if (intensity === "off") return null;

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${
        intensity === "subtle" ? "opacity-25" : "opacity-45"
      }`}
    />
  );
};

/* ============================================================================
   PIXEL ARCADE 8-BIT BACKGROUND
   Twinkling 8-bit starfield + drifting pixel clouds & blocks + CRT scanlines
   ============================================================================ */
const PIXEL_STARS = [
  { top: "8%", left: "12%", size: 4, delay: "0s", color: "#ffd541" },
  { top: "14%", left: "78%", size: 6, delay: "0.6s", color: "#38f5ff" },
  { top: "24%", left: "34%", size: 4, delay: "1.2s", color: "#ffffff" },
  { top: "30%", left: "88%", size: 4, delay: "0.3s", color: "#ff5e99" },
  { top: "42%", left: "8%", size: 6, delay: "1.5s", color: "#38f5ff" },
  { top: "55%", left: "92%", size: 4, delay: "0.9s", color: "#ffd541" },
  { top: "68%", left: "18%", size: 4, delay: "1.8s", color: "#ffffff" },
  { top: "75%", left: "76%", size: 6, delay: "0.4s", color: "#ff5e99" },
  { top: "84%", left: "44%", size: 4, delay: "1.1s", color: "#38f5ff" },
  { top: "18%", left: "54%", size: 4, delay: "1.7s", color: "#ffd541" },
  { top: "62%", left: "62%", size: 4, delay: "0.7s", color: "#ffffff" },
  { top: "90%", left: "12%", size: 6, delay: "1.3s", color: "#4ade80" },
];

const PixelBackground: React.FC<{ intensity: FxIntensity }> = ({ intensity }) => (
  <div className="absolute inset-0">
    {/* Subtle 8-bit pixel grid */}
    <div
      className="absolute inset-0 opacity-[0.14]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(107,98,189,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(107,98,189,0.5) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />

    {intensity !== "off" && (
      <>
        {/* Twinkling pixel stars */}
        {PIXEL_STARS.map((star, idx) => (
          <div
            key={idx}
            className="absolute animate-pixel-twinkle"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              animationDelay: star.delay,
              opacity: intensity === "subtle" ? 0.45 : 0.85,
            }}
          />
        ))}

        {/* Floating pixel tetromino-like accents */}
        <div
          className="absolute top-[18%] right-[9%] hidden sm:block animate-pixel-float opacity-35"
          style={{ animationDelay: "0s" }}
        >
          <div className="grid grid-cols-3 gap-1">
            <div className="w-3 h-3 bg-[#ffd541]" />
            <div className="w-3 h-3 bg-[#ffd541]" />
            <div className="w-3 h-3 bg-transparent" />
            <div className="w-3 h-3 bg-transparent" />
            <div className="w-3 h-3 bg-[#ffd541]" />
            <div className="w-3 h-3 bg-[#ffd541]" />
          </div>
        </div>

        <div
          className="absolute bottom-[22%] left-[7%] hidden sm:block animate-pixel-float opacity-30"
          style={{ animationDelay: "-2s" }}
        >
          <div className="grid grid-cols-3 gap-1">
            <div className="w-3 h-3 bg-transparent" />
            <div className="w-3 h-3 bg-[#38f5ff]" />
            <div className="w-3 h-3 bg-transparent" />
            <div className="w-3 h-3 bg-[#38f5ff]" />
            <div className="w-3 h-3 bg-[#38f5ff]" />
            <div className="w-3 h-3 bg-[#38f5ff]" />
          </div>
        </div>

        {/* Bottom 8-bit horizon skyline silhouette */}
        <div
          className="absolute bottom-0 inset-x-0 h-28 opacity-25"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(56, 245, 255, 0.14) 70%, rgba(255, 94, 153, 0.22) 100%)",
          }}
        />

        {intensity === "full" && <div className="absolute inset-0 fx-scanlines opacity-35" />}
      </>
    )}
  </div>
);

/* ============================================================================
   CYBERPUNK 2077 BACKGROUND
   Receding 3D neon synthwave grid + chromatic atmospheric glows + scanlines
   ============================================================================ */
const CyberpunkBackground: React.FC<{ intensity: FxIntensity }> = ({ intensity }) => (
  <div className="absolute inset-0">
    {/* Neon atmospheric glows */}
    <div
      className="absolute -top-24 right-[-10%] w-[38rem] h-[38rem] rounded-full blur-[110px]"
      style={{
        opacity: intensity === "off" ? 0.12 : intensity === "subtle" ? 0.22 : 0.34,
        background: "radial-gradient(circle, rgba(252,238,10,0.42) 0%, transparent 65%)",
      }}
    />
    <div
      className="absolute top-[20%] -left-24 w-[36rem] h-[36rem] rounded-full blur-[110px]"
      style={{
        opacity: intensity === "off" ? 0.14 : intensity === "subtle" ? 0.24 : 0.36,
        background: "radial-gradient(circle, rgba(0,240,255,0.48) 0%, transparent 65%)",
      }}
    />
    <div
      className="absolute bottom-0 right-[18%] w-[32rem] h-[24rem] rounded-full blur-[110px]"
      style={{
        opacity: intensity === "off" ? 0.1 : intensity === "subtle" ? 0.2 : 0.3,
        background: "radial-gradient(circle, rgba(255,0,110,0.42) 0%, transparent 68%)",
      }}
    />

    {/* 3D Perspective Neon Horizon Grid */}
    {intensity !== "off" && (
      <div
        className="absolute inset-x-0 bottom-0 h-[48vh] overflow-hidden"
        style={{
          perspective: "420px",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 35%, black 78%, black 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 35%, black 78%, black 100%)",
        }}
      >
        <div
          className={`w-[200%] -ml-[50%] h-[220%] ${intensity === "full" ? "animate-synth-grid" : ""}`}
          style={{
            transform: "rotateX(68deg)",
            transformOrigin: "center top",
            opacity: intensity === "subtle" ? 0.22 : 0.42,
            backgroundImage:
              "linear-gradient(to right, rgba(0,240,255,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,0,110,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>
    )}

    {/* Subtle CRT Scanlines & Sweep */}
    {intensity === "full" && (
      <>
        <div className="absolute inset-0 fx-scanlines opacity-35" />
        <div
          className="absolute inset-x-0 h-24 animate-scanline-sweep opacity-20"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(0,240,255,0.35) 50%, transparent 100%)",
          }}
        />
      </>
    )}
  </div>
);

/* ============================================================================
   MONOCHROME NOIR SWISS EDITORIAL BACKGROUND
   Architectural grid hairlines + soft silver gallery spotlight + film grain
   ============================================================================ */
const MonochromeBackground: React.FC<{ intensity: FxIntensity }> = ({ intensity }) => (
  <div className="absolute inset-0">
    {/* Architectural Swiss fine hairline grid */}
    <div
      className="absolute inset-0"
      style={{
        opacity: intensity === "off" ? 0.04 : intensity === "subtle" ? 0.07 : 0.11,
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
      }}
    />

    {/* Gallery overhead spotlight */}
    <div
      className="absolute -top-40 left-1/2 -translate-x-1/2 w-[56rem] h-[34rem] rounded-full blur-[120px]"
      style={{
        opacity: intensity === "off" ? 0.08 : 0.18,
        background: "radial-gradient(ellipse, rgba(255,255,255,0.45) 0%, transparent 70%)",
      }}
    />

    {intensity === "full" && <div className="absolute inset-0 fx-film-grain opacity-45" />}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
  </div>
);

/* ============================================================================
   NEO-BRUTALIST POP BACKGROUND
   Risograph dot-grid paper + floating outlined Bauhaus geometry
   ============================================================================ */
const NeoBrutalBackground: React.FC<{ intensity: FxIntensity }> = ({ intensity }) => (
  <div className="absolute inset-0">
    {/* Risograph halftone dot pattern */}
    <div
      className="absolute inset-0"
      style={{
        opacity: intensity === "off" ? 0.15 : 0.28,
        backgroundImage: "radial-gradient(#111111 1.25px, transparent 1.25px)",
        backgroundSize: "24px 24px",
      }}
    />

    {intensity !== "off" && (
      <>
        {/* Bold Bauhaus floating geometric stickers in the margin */}
        <div
          className="hidden md:block absolute top-28 right-[6%] w-16 h-16 rounded-full bg-[#facc15] border-[3px] border-[#111111] shadow-[5px_5px_0px_#111111] animate-float"
          style={{ opacity: intensity === "subtle" ? 0.38 : 0.72 }}
        />
        <div
          className="hidden md:block absolute top-[46%] left-[4%] w-12 h-12 rotate-12 bg-[#ff5c5c] border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] animate-float"
          style={{
            opacity: intensity === "subtle" ? 0.32 : 0.65,
            animationDelay: "-3s",
          }}
        />
        <div
          className="hidden lg:block absolute bottom-[22%] right-[8%] w-14 h-14 -rotate-6 bg-[#60a5fa] border-[3px] border-[#111111] shadow-[4px_4px_0px_#111111] animate-float"
          style={{
            opacity: intensity === "subtle" ? 0.32 : 0.62,
            animationDelay: "-5s",
          }}
        />
      </>
    )}
  </div>
);

/* ============================================================================
   VAPORWAVE 1984 BACKGROUND
   Iconic Outrun striped sun + neon lavender perspective grid + twilight glow
   ============================================================================ */
const VaporwaveBackground: React.FC<{ intensity: FxIntensity }> = ({ intensity }) => (
  <div className="absolute inset-0">
    {/* Twilight gradient sky */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at 50% 24%, rgba(255,78,205,0.22) 0%, rgba(18,6,36,0) 58%), radial-gradient(circle at 80% 70%, rgba(5,255,161,0.14) 0%, transparent 50%)",
      }}
    />

    {/* Outrun Striped Retro Sun */}
    {intensity !== "off" && (
      <div
        className="absolute top-[11%] left-1/2 -translate-x-1/2 w-56 h-56 sm:w-72 sm:h-72 rounded-full"
        style={{
          opacity: intensity === "subtle" ? 0.2 : 0.36,
          background:
            "linear-gradient(180deg, #ffe259 0%, #ff8a3d 38%, #ff4ecd 75%, #9d174d 100%)",
          WebkitMaskImage:
            "repeating-linear-gradient(180deg, #000 0px, #000 18px, transparent 18px, transparent 22px)",
          maskImage:
            "repeating-linear-gradient(180deg, #000 0px, #000 18px, transparent 18px, transparent 22px)",
          boxShadow: "0 0 90px rgba(255, 78, 205, 0.55)",
        }}
      />
    )}

    {/* Outrun Lavender Horizon Grid */}
    {intensity !== "off" && (
      <div
        className="absolute inset-x-0 bottom-0 h-[46vh] overflow-hidden"
        style={{
          perspective: "380px",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 35%, black 78%, black 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 35%, black 78%, black 100%)",
        }}
      >
        <div
          className={`w-[200%] -ml-[50%] h-[220%] ${intensity === "full" ? "animate-synth-grid" : ""}`}
          style={{
            transform: "rotateX(70deg)",
            transformOrigin: "center top",
            opacity: intensity === "subtle" ? 0.2 : 0.38,
            backgroundImage:
              "linear-gradient(to right, rgba(255,78,205,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(5,255,161,0.42) 1px, transparent 1px)",
            backgroundSize: "58px 58px",
          }}
        />
      </div>
    )}
  </div>
);

/* ============================================================================
   LIQUID GLASS (OBSIDIAN & PORCELAIN) BACKGROUND
   ============================================================================ */
const LiquidOrbsBackground: React.FC<{ intensity: FxIntensity }> = ({ intensity }) => {
  const scaleOpacity =
    intensity === "off" ? "opacity-25" : intensity === "subtle" ? "opacity-60" : "opacity-100";
  const animateClass1 = intensity === "off" ? "" : "animate-liquid-drift-1";
  const animateClass2 = intensity === "off" ? "" : "animate-liquid-drift-2";

  return (
    <div className={`absolute inset-0 transform-gpu transition-opacity duration-300 ${scaleOpacity}`}>
      <div
        className={`absolute -top-20 -right-20 w-[30rem] h-[30rem] sm:w-[40rem] sm:h-[40rem] rounded-full opacity-40 dark:opacity-30 blur-[60px] sm:blur-[80px] ${animateClass1} transform-gpu`}
        style={{
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, rgba(139, 92, 246, 0.25) 50%, transparent 70%)",
        }}
      />
      <div
        className={`absolute top-1/4 -left-20 w-[26rem] h-[26rem] sm:w-[36rem] sm:h-[36rem] rounded-full opacity-35 dark:opacity-25 blur-[60px] sm:blur-[80px] ${animateClass2} transform-gpu`}
        style={{
          background:
            "radial-gradient(circle, rgba(14, 165, 233, 0.55) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)",
          animationDelay: "-6s",
        }}
      />
      <div
        className={`absolute bottom-10 left-10 w-[24rem] h-[24rem] sm:w-[32rem] sm:h-[32rem] rounded-full opacity-25 dark:opacity-20 blur-[60px] sm:blur-[80px] ${animateClass1} transform-gpu`}
        style={{
          background:
            "radial-gradient(circle, rgba(244, 63, 94, 0.4) 0%, rgba(217, 70, 239, 0.15) 50%, transparent 70%)",
          animationDelay: "-10s",
        }}
      />
      <div
        className={`absolute top-2/3 -right-10 w-[22rem] h-[22rem] sm:w-[28rem] sm:h-[28rem] rounded-full opacity-25 dark:opacity-20 blur-[60px] sm:blur-[80px] ${animateClass2} transform-gpu`}
        style={{
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.45) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 70%)",
          animationDelay: "-14s",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />
    </div>
  );
};

/* ============================================================================
   MAIN THEME-AWARE BACKGROUND ORCHESTRATOR
   ============================================================================ */
export const LiquidBackground: React.FC = () => {
  const { activeThemeId, activeTheme, fxIntensity, isTransitioning } = useTheme();

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none"
        aria-hidden="true"
        data-testid="theme-background"
        data-active-theme={activeThemeId}
      >
        {(activeThemeId === "liquid-dark" || activeThemeId === "liquid-light") && (
          <LiquidOrbsBackground intensity={fxIntensity} />
        )}
        {activeThemeId === "pixel" && <PixelBackground intensity={fxIntensity} />}
        {activeThemeId === "cyberpunk" && <CyberpunkBackground intensity={fxIntensity} />}
        {activeThemeId === "monochrome" && <MonochromeBackground intensity={fxIntensity} />}
        {activeThemeId === "terminal" && (
          <div className="absolute inset-0">
            <MatrixRainCanvas intensity={fxIntensity} />
            {fxIntensity !== "off" && <div className="absolute inset-0 fx-scanlines opacity-40" />}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 45%, transparent 40%, rgba(1, 6, 2, 0.72) 100%)",
              }}
            />
          </div>
        )}
        {activeThemeId === "neobrutal" && <NeoBrutalBackground intensity={fxIntensity} />}
        {activeThemeId === "vaporwave" && <VaporwaveBackground intensity={fxIntensity} />}
      </div>

      {/* Subtle Cinematic Radial Pulse on Theme Change */}
      {isTransitioning && (
        <div
          key={activeThemeId}
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-[60] animate-theme-pulse"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${activeTheme.swatches[2]}44 0%, transparent 70%)`,
          }}
        />
      )}
    </>
  );
};
