import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Briefcase,
  Award,
  Send,
  Sun,
  Moon,
  Volume2,
  VolumeX,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { sound } from "@/lib/audio";

interface NavItem {
  to: string;
  icon: React.ElementType;
  label: string;
}

const navItems: NavItem[] = [
  {
    to: "/",
    icon: Home,
    label: "Home",
  },
  {
    to: "/projects",
    icon: Briefcase,
    label: "Projects",
  },
  {
    to: "/certifications",
    icon: Award,
    label: "Certs",
  },
  {
    to: "/contact",
    icon: Send,
    label: "Contact",
  },
];

export const FloatingNav: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMuted, setIsMuted] = useState(sound.muted);

  const handleSoundToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleThemeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playSwitch(theme !== "dark");
    toggleTheme();
  };

  return (
    <nav
      className="fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 select-none pointer-events-auto transform-gpu"
      aria-label="Main Dock"
    >
      <div className="relative flex items-center gap-1 p-1.5 sm:p-2 rounded-[26px] ios-glass border border-white/50 dark:border-white/15 bg-white/80 dark:bg-zinc-950/80 shadow-[0_12px_36px_rgba(0,0,0,0.18)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.55)]">
        {/* Navigation Items */}
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;

          return (
            <NavLink
              key={to}
              to={to}
              onClick={() => sound.playTap()}
              className={`relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-[20px] transition-colors group ${
                isActive ? "text-white" : "text-muted-foreground hover:text-foreground"
              }`}
              title={label}
            >
              {/* Active Pill with high-performance hardware-accelerated transition */}
              {isActive && (
                <motion.div
                  layoutId="dock-active-pill"
                  className="absolute inset-0 rounded-[20px] bg-gradient-to-b from-blue-600 to-indigo-600 shadow-[0_4px_14px_rgba(59,130,246,0.4)]"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 36,
                    mass: 0.6,
                  }}
                />
              )}

              <span className="relative z-10 flex items-center justify-center group-hover:scale-110 group-active:scale-95 transition-transform duration-150">
                <Icon size={19} />
              </span>
            </NavLink>
          );
        })}

        {/* Separator */}
        <div className="w-[1px] h-6 bg-border/70 mx-1 rounded-full" />

        {/* Sound Toggle */}
        <button
          type="button"
          onClick={handleSoundToggle}
          className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-[18px] text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all"
          title={isMuted ? "Unmute sound" : "Mute sound"}
          aria-label="Toggle Sound"
        >
          {isMuted ? (
            <VolumeX size={17} />
          ) : (
            <Volume2 size={17} className="text-blue-500" />
          )}
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={handleThemeToggle}
          className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-[18px] text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all"
          title="Toggle Theme"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <Sun size={17} className="text-amber-400" />
          ) : (
            <Moon size={17} className="text-indigo-500" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default FloatingNav;
