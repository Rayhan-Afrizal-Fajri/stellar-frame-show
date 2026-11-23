import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Clock,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Mail,
  Copy,
  Check,
  Sparkles,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { sound } from "@/lib/audio";
import { personalInfo } from "@/data/portfolio";
import { toast } from "sonner";
import profileImg from "@/assets/profile.png";

export const DynamicIsland: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.muted);
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  // Live Indonesia Time (WIB - UTC+7)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to WIB
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
    setIsMuted(muted);
    if (!muted) {
      toast.success("Haptic audio feedback enabled 🔊");
    } else {
      toast("Audio feedback muted 🔇");
    }
  };

  const handleToggleTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playSwitch(theme !== "dark");
    toggleTheme();
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
    <div className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
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
        className={`pointer-events-auto relative cursor-pointer select-none rounded-[28px] ios-glass border border-white/40 dark:border-white/15 bg-white/75 dark:bg-zinc-950/75 backdrop-blur-3xl shadow-[0_12px_36px_rgba(0,0,0,0.15)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6)] text-foreground overflow-hidden transition-colors ${
          isExpanded ? "w-full max-w-md p-4" : "px-3.5 py-1.5 max-w-fit"
        }`}
      >
        {/* Subtle Top Specular Sheen */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent" />

        <AnimatePresence mode="wait">
          {!isExpanded ? (
            /* Compact Dynamic Island Pill */
            <motion.div
              key="compact"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-3 text-xs font-medium"
            >
              {/* Profile avatar with glowing green status pulse */}
              <div className="relative flex items-center">
                <img
                  src={profileImg}
                  alt={personalInfo.name}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-border"
                />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </div>

              {/* Status info */}
              <div className="flex items-center gap-1.5 font-sans">
                <span className="font-semibold text-foreground tracking-tight hidden sm:inline">
                  {personalInfo.name}
                </span>
                <span className="text-muted-foreground hidden sm:inline">·</span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available
                </span>
              </div>

              {/* Live WIB Clock */}
              <div className="hidden xs:flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[11px] font-mono text-muted-foreground">
                <Clock size={11} className="text-primary/70" />
                <span>{time || "WIB"}</span>
              </div>

              {/* Mini Action controls */}
              <div className="flex items-center gap-1 pl-1 border-l border-border/60">
                <button
                  type="button"
                  onClick={handleToggleSound}
                  className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  title={isMuted ? "Unmute audio feedback" : "Mute audio feedback"}
                >
                  {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} className="text-blue-500" />}
                </button>
                <button
                  type="button"
                  onClick={handleToggleTheme}
                  className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  title="Toggle Light/Dark Theme"
                >
                  {theme === "dark" ? (
                    <Sun size={13} className="text-amber-400" />
                  ) : (
                    <Moon size={13} className="text-indigo-500" />
                  )}
                </button>
              </div>

              <ChevronDown size={12} className="text-muted-foreground/70 ml-0.5 opacity-60" />
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <img
                      src={profileImg}
                      alt={personalInfo.name}
                      className="w-10 h-10 rounded-2xl object-cover ring-2 ring-primary/20 shadow-md"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 ring-2 ring-background" />
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm leading-tight text-foreground flex items-center gap-1.5">
                      {personalInfo.fullName}
                      <Sparkles size={12} className="text-amber-400" />
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Full-Stack & ERP Systems Engineer
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Open to Work
                </span>
              </div>

              {/* Status & Location Info Bar */}
              <div className="grid grid-cols-2 gap-2 text-xs py-2 px-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-border/40">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground block">
                    Location & Time
                  </span>
                  <span className="font-medium text-foreground flex items-center gap-1 mt-0.5">
                    <Clock size={12} className="text-blue-500" />
                    {time} WIB
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground block">
                    Base
                  </span>
                  <span className="font-medium text-foreground">
                    Indonesia 🇮🇩 (Remote / Onsite)
                  </span>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground font-medium text-xs border border-border/50 transition-all active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-500" />
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
                  onClick={() => {
                    sound.playPop();
                    setIsExpanded(false);
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-primary text-primary-foreground font-medium text-xs shadow-ios-button hover:opacity-90 transition-all active:scale-95"
                >
                  <Mail size={14} />
                  <span>Get in Touch</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>

              {/* Island Footer Toggle Row */}
              <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  Tap anywhere to collapse
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleToggleSound}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} className="text-blue-500" />}
                    <span>{isMuted ? "Muted" : "Haptics On"}</span>
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={handleToggleTheme}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    {theme === "dark" ? <Sun size={12} className="text-amber-400" /> : <Moon size={12} className="text-indigo-400" />}
                    <span>{theme === "dark" ? "Dark" : "Light"}</span>
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

