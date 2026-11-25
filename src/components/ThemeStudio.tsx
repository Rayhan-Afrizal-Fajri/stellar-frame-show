import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Eye,
  Keyboard,
  Moon,
  Palette,
  Share2,
  Shuffle,
  Sparkles,
  Sun,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import {
  THEME_CATEGORIES,
  THEME_LIST,
  type FxIntensity,
  type ThemeCategory,
  type ThemeDefinition,
} from "@/config/themes";
import { useTheme } from "@/hooks/useTheme";
import { sound } from "@/lib/audio";

const FX_OPTIONS: { value: FxIntensity; label: string }[] = [
  { value: "off", label: "Off" },
  { value: "subtle", label: "Subtle" },
  { value: "full", label: "Full FX" },
];

/* Bespoke Miniature Live Preview Card for each theme */
const ThemePreviewCard: React.FC<{
  item: ThemeDefinition;
  isActive: boolean;
  isPreviewing: boolean;
  liveHoverEnabled: boolean;
  onSelect: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}> = ({
  item,
  isActive,
  isPreviewing,
  liveHoverEnabled,
  onSelect,
  onHoverStart,
  onHoverEnd,
}) => {
  const { preview } = item;

  return (
    <motion.button
      type="button"
      layout
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.985 }}
      onClick={onSelect}
      onMouseEnter={() => {
        if (liveHoverEnabled) onHoverStart();
      }}
      onMouseLeave={() => {
        if (liveHoverEnabled) onHoverEnd();
      }}
      data-testid={`theme-card-${item.id}`}
      aria-pressed={isActive}
      className={`group relative flex flex-col text-left overflow-hidden transition-all p-3 theme-surface ${
        isActive
          ? "ring-2 ring-[var(--theme-accent)] border-[var(--theme-accent)]"
          : "hover:border-[var(--theme-accent-border)]"
      }`}
      style={{
        borderRadius: "var(--theme-radius-md)",
      }}
    >
      {/* Miniature Theme Canvas Mockup */}
      <div
        className="relative w-full h-28 overflow-hidden p-2.5 flex flex-col justify-between mb-3 transition-transform duration-300 group-hover:scale-[1.01]"
        style={{
          backgroundColor: preview.bg,
          borderRadius: preview.radius,
          border: `${preview.isHardShadow ? "2px" : "1px"} solid ${preview.border}`,
          boxShadow: preview.shadow,
        }}
      >
        {/* Optional Mini Grid */}
        {preview.hasGrid && (
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage: `linear-gradient(to right, ${preview.accentSecondary}44 1px, transparent 1px), linear-gradient(to bottom, ${preview.accentSecondary}44 1px, transparent 1px)`,
              backgroundSize: "14px 14px",
            }}
          />
        )}

        {/* Optional Mini Scanlines */}
        {preview.hasScanlines && (
          <div className="absolute inset-0 pointer-events-none fx-scanlines opacity-40" />
        )}

        {/* Mini Top Chrome Bar */}
        <div className="relative z-10 flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-1">
            <span
              className="w-2 h-2 inline-block"
              style={{
                backgroundColor: preview.accent,
                borderRadius: preview.radius === "0px" ? "0px" : "999px",
              }}
            />
            <span
              className="w-2 h-2 inline-block"
              style={{
                backgroundColor: preview.accentSecondary,
                borderRadius: preview.radius === "0px" ? "0px" : "999px",
              }}
            />
            <span
              className="w-2 h-2 inline-block opacity-45"
              style={{
                backgroundColor: preview.muted,
                borderRadius: preview.radius === "0px" ? "0px" : "999px",
              }}
            />
          </div>

          <div className="flex items-center gap-1.5">
            {(isActive || isPreviewing) && (
              <span
                className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase leading-none"
                style={{
                  backgroundColor: preview.accent,
                  color:
                    item.id === "liquid-dark" || item.id === "liquid-light"
                      ? "#ffffff"
                      : "#08080c",
                  borderRadius: preview.radius === "0px" ? "0px" : "999px",
                }}
              >
                {isActive ? (
                  <>
                    <Check size={8} strokeWidth={3} />
                    <span>Active</span>
                  </>
                ) : (
                  <>
                    <Eye size={8} />
                    <span>Live</span>
                  </>
                )}
              </span>
            )}

            {/* Font Specimen */}
            <span
              className="text-[11px] font-bold leading-none px-1.5 py-0.5"
              style={{
                fontFamily: preview.displayFont,
                color: preview.text,
                backgroundColor: preview.surface,
                border: `1px solid ${preview.border}`,
                borderRadius: preview.radius === "0px" ? "0px" : "4px",
              }}
            >
              Aa
            </span>
          </div>
        </div>

        {/* Mini Mockup Surface Card */}
        <div
          className="relative z-10 p-2 flex items-center justify-between gap-2"
          style={{
            backgroundColor: preview.surface,
            border: `${preview.isHardShadow ? "1.5px" : "1px"} solid ${preview.border}`,
            borderRadius: preview.radius === "0px" ? "0px" : "6px",
            boxShadow: preview.isHardShadow ? `2px 2px 0px ${preview.border}` : "none",
          }}
        >
          <div className="space-y-1.5 flex-1 min-w-0">
            <div
              className="h-2 w-3/4"
              style={{
                backgroundColor: preview.text,
                borderRadius: preview.radius === "0px" ? "0px" : "99px",
                opacity: 0.9,
              }}
            />
            <div
              className="h-1.5 w-1/2"
              style={{
                backgroundColor: preview.muted,
                borderRadius: preview.radius === "0px" ? "0px" : "99px",
                opacity: 0.65,
              }}
            />
          </div>
          <div
            className="h-5 px-2 flex items-center justify-center text-[8px] font-bold flex-shrink-0"
            style={{
              backgroundColor: preview.accent,
              color:
                item.id === "liquid-dark" || item.id === "liquid-light"
                  ? "#ffffff"
                  : "#09090b",
              borderRadius: preview.radius === "0px" ? "0px" : "4px",
              clipPath: preview.isChamfered
                ? "polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))"
                : undefined,
            }}
          >
            GO
          </div>
        </div>
      </div>

      {/* Theme Metadata */}
      <div className="flex items-start justify-between gap-1.5 mb-1">
        <div className="min-w-0 flex-1">
          <h3 className="text-[13px] font-bold text-foreground truncate leading-snug">
            {item.name}
          </h3>
          <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
            {item.tagline}
          </p>
        </div>

        <span
          className="inline-flex items-center justify-center w-6 h-6 text-muted-foreground theme-chip flex-shrink-0"
          title={item.isDark ? "Dark Theme" : "Light Theme"}
          aria-label={item.isDark ? "Dark Theme" : "Light Theme"}
        >
          {item.isDark ? <Moon size={11} /> : <Sun size={11} />}
        </span>
      </div>

      {/* Bottom Row: Palette Swatches & Sound Profile */}
      <div className="mt-2.5 pt-2 border-t border-border/50 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1" aria-label={`${item.name} color swatches`}>
          {item.swatches.map((hex, idx) => (
            <span
              key={idx}
              className="w-3.5 h-3.5 border border-black/20 dark:border-white/25 inline-block"
              style={{
                backgroundColor: hex,
                borderRadius: item.id === "pixel" ? "0px" : "999px",
              }}
            />
          ))}
        </div>

        <span className="text-[10px] font-mono text-muted-foreground truncate">
          ♪ {item.soundLabel}
        </span>
      </div>
    </motion.button>
  );
};

export const ThemeStudio: React.FC = () => {
  const {
    themeId,
    activeTheme,
    committedTheme,
    fxIntensity,
    isStudioOpen,
    previewThemeId,
    setTheme,
    randomizeTheme,
    setFxIntensity,
    setPreviewTheme,
    closeStudio,
    copyThemeShareLink,
  } = useTheme();

  const [activeCategory, setActiveCategory] = useState<ThemeCategory>("All");
  const [liveHoverEnabled, setLiveHoverEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(sound.muted);
  const [copiedLink, setCopiedLink] = useState(false);
  const copiedTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copiedTimerRef.current !== null) {
        window.clearTimeout(copiedTimerRef.current);
      }
    };
  }, []);

  // Keep mute button synced with sound engine
  useEffect(() => {
    return sound.subscribe(setIsMuted);
  }, []);

  // Lock page scroll while studio is open
  useEffect(() => {
    if (!isStudioOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isStudioOpen]);

  const filteredThemes = useMemo(() => {
    if (activeCategory === "All") return THEME_LIST;
    return THEME_LIST.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  const countByCategory = (cat: ThemeCategory) =>
    cat === "All"
      ? THEME_LIST.length
      : THEME_LIST.filter((t) => t.category === cat).length;

  const handleToggleSound = () => {
    sound.toggleMute();
  };

  const handleAuditionSound = () => {
    if (sound.muted) {
      sound.toggleMute();
    }
    sound.playThemeChange(activeTheme.soundProfile);
  };

  const handleShareLink = async () => {
    await copyThemeShareLink();
    setCopiedLink(true);
    if (copiedTimerRef.current !== null) {
      window.clearTimeout(copiedTimerRef.current);
    }
    copiedTimerRef.current = window.setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <AnimatePresence>
      {isStudioOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={closeStudio}
          className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-black/55 backdrop-blur-md p-2 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="theme-studio-title"
          data-testid="theme-studio-modal"
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[88vh] flex flex-col theme-surface-strong overflow-hidden"
            style={{ borderRadius: "var(--theme-radius-card)" }}
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-border/60">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0 theme-badge-accent"
                  style={{ borderRadius: "var(--theme-radius-md)" }}
                >
                  <Palette size={19} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2
                      id="theme-studio-title"
                      className="text-base sm:text-lg font-bold text-foreground leading-tight"
                    >
                      Theme Studio
                    </h2>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono theme-badge-accent">
                      <Sparkles size={10} />
                      {previewThemeId
                        ? `Preview: ${activeTheme.shortName}`
                        : committedTheme.shortName}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {activeTheme.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={randomizeTheme}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-foreground theme-chip"
                  title="Pick a random theme"
                  data-testid="theme-randomize-btn"
                >
                  <Shuffle size={13} className="theme-accent-text" />
                  <span className="hidden xs:inline">Surprise</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-foreground theme-chip"
                  title="Copy shareable link with active theme"
                  data-testid="theme-share-btn"
                >
                  {copiedLink ? (
                    <>
                      <Check size={13} className="text-emerald-500" />
                      <span className="hidden xs:inline">Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 size={13} />
                      <span className="hidden xs:inline">Share</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={closeStudio}
                  aria-label="Close Theme Studio"
                  className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground theme-chip"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Category Filter & Live Hover Toggle Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-border/40 bg-black/[0.02] dark:bg-white/[0.02]">
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-0.5">
                {THEME_CATEGORIES.map((category) => {
                  const selected = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        sound.playTap();
                        setActiveCategory(category);
                      }}
                      className={`px-3 py-1 text-xs font-medium whitespace-nowrap transition-all ${
                        selected
                          ? "theme-btn-primary"
                          : "theme-chip text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {category}{" "}
                      <span className="opacity-75 font-mono text-[10px]">
                        ({countByCategory(category)})
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.playTap();
                  setLiveHoverEnabled((v) => {
                    if (v) setPreviewTheme(null);
                    return !v;
                  });
                }}
                className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono transition-all ${
                  liveHoverEnabled
                    ? "theme-badge-accent"
                    : "theme-chip text-muted-foreground"
                }`}
                aria-pressed={liveHoverEnabled}
              >
                <Eye size={12} />
                <span>Hover Preview: {liveHoverEnabled ? "ON" : "OFF"}</span>
              </button>
            </div>

            {/* Theme Cards Scrollable Grid */}
            <div
              className="flex-1 overflow-y-auto px-4 sm:px-6 py-4"
              onMouseLeave={() => setPreviewTheme(null)}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {filteredThemes.map((item) => (
                  <ThemePreviewCard
                    key={item.id}
                    item={item}
                    isActive={themeId === item.id}
                    isPreviewing={previewThemeId === item.id && themeId !== item.id}
                    liveHoverEnabled={liveHoverEnabled}
                    onSelect={() => setTheme(item.id, { showToast: true })}
                    onHoverStart={() => setPreviewTheme(item.id)}
                    onHoverEnd={() => setPreviewTheme(null)}
                  />
                ))}
              </div>
            </div>

            {/* Controls Footer: Atmospheric FX, Sound Pack & Shortcuts */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-t border-border/60 bg-black/[0.03] dark:bg-white/[0.02]">
              {/* FX Intensity */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                  FX
                </span>
                <div className="flex items-center gap-1" role="group" aria-label="Visual effects intensity">
                  {FX_OPTIONS.map((opt) => {
                    const active = fxIntensity === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setFxIntensity(opt.value)}
                        data-testid={`fx-option-${opt.value}`}
                        aria-pressed={active}
                        className={`px-2.5 py-1 text-[11px] font-mono transition-all ${
                          active
                            ? "theme-btn-primary"
                            : "theme-chip text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sound Pack Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleSound}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-foreground theme-chip"
                >
                  {isMuted ? (
                    <>
                      <VolumeX size={12} />
                      <span>SFX Off</span>
                    </>
                  ) : (
                    <>
                      <Volume2 size={12} className="theme-accent-text" />
                      <span>{activeTheme.soundLabel}</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleAuditionSound}
                  className="px-2.5 py-1 text-[11px] font-mono theme-badge-accent hover:opacity-90 transition-opacity"
                  title="Play current theme sound signature"
                >
                  Test SFX
                </button>
              </div>

              {/* Keyboard Hints */}
              <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
                <Keyboard size={12} />
                <span>
                  <kbd className="px-1.5 py-0.5 theme-chip text-foreground">T</kbd> Studio
                </span>
                <span>·</span>
                <span>
                  <kbd className="px-1.5 py-0.5 theme-chip text-foreground">Shift+T</kbd> Cycle
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

