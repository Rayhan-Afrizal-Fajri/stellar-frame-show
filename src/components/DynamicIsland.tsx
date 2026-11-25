import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Clock,
  Volume2,
  VolumeX,
  Mail,
  Copy,
  Check,
  Sparkles,
  ArrowUpRight,
  ChevronDown,
  Palette,
  SlidersHorizontal,
} from "lucide-react";
import { THEME_LIST } from "@/config/themes";
import { useTheme } from "@/hooks/useTheme";
import { sound } from "@/lib/audio";
import { personalInfo } from "@/data/portfolio";
import { toast } from "sonner";
import profileImg from "@/assets/profile.png";

const ISLAND_SHORT_LABELS: Record<string, string> = {
  "liquid-dark": "Obsidian",
  "liquid-light": "Porcelain",
  pixel: "Pixel",
  cyberpunk: "Cyber",
  monochrome: "Mono",
  terminal: "Terminal",
  neobrutal: "Brutal",
  vaporwave: "Vapor",
};

export const DynamicIsland: React.FC = () => {
  const { themeId, activeTheme, setTheme, openStudio } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.muted);
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    return sound.subscribe(setIsMuted);
  }, []);

  // Live Indonesia Time (WIB - UTC+7)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = sound.toggleMute();
    if (!muted) {
      toast.success(`Audio enabled (${activeTheme.soundLabel})`);
    } else {
      toast("Audio feedback muted");
    }
  };

  const handleOpenStudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(false);
    openStudio();
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playPop();
    const cleanEmail = personalInfo.email.replace("mailto:", "");
    navigator.clipboard.writeText(cleanEmail);
    setCopied(true);
    toast.success("Email copied to clipboard!", {
      description: cleanEmail,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 420,
          damping: 32,
        }}
        onClick={() => {
          sound.playTap();
          setIsExpanded(!isExpanded);
        }}
        className={`pointer-events-auto relative cursor-pointer select-none theme-surface-strong theme-island text-foreground overflow-hidden transition-colors ${
          isExpanded ? "w-full max-w-md p-4" : "px-3 sm:px-3.5 py-1.5 max-w-fit"
        }`}
      >
        {/* Top Specular Accent Sheen */}
        <div
          className="absolute inset-x-0 top-0 h-[1px] opacity-60 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--theme-accent), transparent)",
          }}
        />

        <AnimatePresence mode="wait">
          {!isExpanded ? (
            /* Compact Dynamic Island Pill */
            <motion.div
              key="compact"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2.5 sm:gap-3 text-xs font-medium"
            >
              {/* Profile avatar with live status dot */}
              <div className="relative flex items-center flex-shrink-0">
                <img
                  src={profileImg}
                  alt={personalInfo.name}
                  className="w-6 h-6 object-cover ring-1 ring-border theme-media-img"
                  style={{ borderRadius: activeTheme.id === "pixel" ? "0px" : "999px" }}
                />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full opacity-75"
                    style={{
                      backgroundColor: "var(--theme-status)",
                      borderRadius: activeTheme.id === "pixel" ? "0px" : "999px",
                    }}
                  />
                  <span
                    className="relative inline-flex h-2 w-2"
                    style={{
                      backgroundColor: "var(--theme-status)",
                      borderRadius: activeTheme.id === "pixel" ? "0px" : "999px",
                    }}
                  />
                </span>
              </div>

              {/* Status info */}
              <div className="flex items-center gap-1.5 font-sans">
                <span className="font-semibold text-foreground tracking-tight hidden sm:inline">
                  {personalInfo.name}
                </span>
                <span className="text-muted-foreground hidden sm:inline">·</span>
                <span
                  className="flex items-center gap-1 text-[11px] font-medium"
                  style={{ color: "var(--theme-status-text)" }}
                >
                  <span
                    className="w-1.5 h-1.5 animate-pulse"
                    style={{
                      backgroundColor: "var(--theme-status)",
                      borderRadius: activeTheme.id === "pixel" ? "0px" : "999px",
                    }}
                  />
                  Available
                </span>
              </div>

              {/* Live WIB Clock */}
              <div className="hidden xs:flex items-center gap-1 px-2 py-0.5 theme-chip text-[11px] font-mono text-muted-foreground">
                <Clock size={11} className="theme-accent-text" />
                <span>{time || "WIB"}</span>
              </div>

              {/* Mini Action controls */}
              <div className="flex items-center gap-1 pl-1.5 border-l border-border/60">
                <button
                  type="button"
                  onClick={handleToggleSound}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                  style={{ borderRadius: "var(--theme-radius-md)" }}
                  title={isMuted ? "Unmute audio feedback" : "Mute audio feedback"}
                  aria-label="Toggle audio"
                >
                  {isMuted ? (
                    <VolumeX size={13} />
                  ) : (
                    <Volume2 size={13} className="theme-accent-text" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleOpenStudio}
                  data-testid="island-theme-studio-btn"
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono theme-badge-accent hover:opacity-90 transition-opacity"
                  title={`Theme: ${activeTheme.name} (Press T)`}
                  aria-label="Open Theme Studio"
                >
                  <Palette size={11} />
                  <span className="hidden md:inline">{activeTheme.shortName}</span>
                </button>
              </div>

              <ChevronDown size={12} className="text-muted-foreground/70 opacity-70" />
            </motion.div>
          ) : (
            /* Expanded Dynamic Island Panel */
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-3.5 pt-1"
            >
              {/* Header inside expanded island */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative flex-shrink-0">
                    <img
                      src={profileImg}
                      alt={personalInfo.name}
                      className="w-10 h-10 object-cover ring-1 ring-border shadow-md theme-media-img"
                      style={{ borderRadius: "var(--theme-radius-md)" }}
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                      <span
                        className="animate-ping absolute inline-flex h-full w-full opacity-75"
                        style={{
                          backgroundColor: "var(--theme-status)",
                          borderRadius: activeTheme.id === "pixel" ? "0px" : "999px",
                        }}
                      />
                      <span
                        className="relative inline-flex h-3 w-3 ring-2 ring-background"
                        style={{
                          backgroundColor: "var(--theme-status)",
                          borderRadius: activeTheme.id === "pixel" ? "0px" : "999px",
                        }}
                      />
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm leading-tight text-foreground flex items-center gap-1.5 truncate">
                      {personalInfo.fullName}
                      <Sparkles size={12} className="theme-accent-text flex-shrink-0" />
                    </h4>
                    <p className="text-xs text-muted-foreground truncate">
                      Full-Stack & ERP Systems Engineer
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-1 theme-status-pill text-[11px] font-medium flex items-center gap-1.5 flex-shrink-0">
                  <span
                    className="w-1.5 h-1.5 animate-pulse"
                    style={{
                      backgroundColor: "var(--theme-status)",
                      borderRadius: activeTheme.id === "pixel" ? "0px" : "999px",
                    }}
                  />
                  Open
                </span>
              </div>

              {/* Quick Theme Switcher Strip */}
              <div
                className="p-2.5 theme-chip space-y-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Palette size={11} className="theme-accent-text" />
                    Theme · {activeTheme.name}
                  </span>
                  <button
                    type="button"
                    onClick={handleOpenStudio}
                    className="inline-flex items-center gap-1 theme-accent-text hover:underline"
                  >
                    <SlidersHorizontal size={10} />
                    Studio
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                  {THEME_LIST.map((item) => {
                    const selected = themeId === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setTheme(item.id, { showToast: true })}
                        className={`flex items-center gap-1.5 px-2 py-1.5 text-[10px] font-mono font-medium transition-all ${
                          selected
                            ? "font-bold shadow-sm"
                            : "theme-surface text-foreground hover:border-[var(--theme-accent-border)]"
                        }`}
                        style={{
                          borderRadius: "var(--theme-radius-md)",
                          background: selected ? "var(--theme-btn-gradient)" : undefined,
                          color: selected ? "var(--theme-accent-fg)" : undefined,
                          border: selected ? "1px solid var(--theme-accent)" : undefined,
                        }}
                        title={item.name}
                      >
                        <span
                          className="w-2.5 h-2.5 flex-shrink-0 border border-black/25"
                          style={{
                            backgroundColor: item.swatches[2],
                            borderRadius: item.id === "pixel" ? "0px" : "999px",
                          }}
                        />
                        <span className="truncate">{ISLAND_SHORT_LABELS[item.id] ?? item.shortName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Status & Location Info Bar */}
              <div className="grid grid-cols-2 gap-2 text-xs py-2 px-3 theme-chip">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground block">
                    Location & Time
                  </span>
                  <span className="font-medium text-foreground flex items-center gap-1 mt-0.5">
                    <Clock size={12} className="theme-accent-text" />
                    {time} WIB
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground block">
                    Base
                  </span>
                  <span className="font-medium text-foreground">
                    Indonesia (Remote / Onsite)
                  </span>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 theme-btn-secondary font-medium text-xs"
                >
                  {copied ? (
                    <>
                      <Check size={14} style={{ color: "var(--theme-status)" }} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <Link
                  to="/contact"
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playPop();
                    setIsExpanded(false);
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 theme-btn-primary text-xs"
                >
                  <Mail size={14} />
                  <span>Get in Touch</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>

              {/* Island Footer Toggle Row */}
              <div className="flex items-center justify-between pt-1.5 border-t border-border/50 text-[11px] text-muted-foreground">
                <span>Tap header to collapse</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleToggleSound}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX size={12} />
                    ) : (
                      <Volume2 size={12} className="theme-accent-text" />
                    )}
                    <span>{isMuted ? "Muted" : activeTheme.soundLabel}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
