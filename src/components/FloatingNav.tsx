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
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { sound } from "@/lib/audio";

interface NavItem {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: string;
}

const navItems: NavItem[] = [
  {
    to: "/",
    icon: Home,
    label: "Overview",
  },
  {
    to: "/projects",
    icon: Briefcase,
    label: "Projects",
    badge: "5+",
  },
  {
    to: "/certifications",
    icon: Award,
    label: "Certs",
    badge: "4",
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
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
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
      className="fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 select-none pointer-events-auto"
      aria-label="Main Dock"
    >
      <motion.div
        initial={{ y: 80, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 26,
          delay: 0.1,
        }}
        className="relative flex items-center gap-1.5 p-2 sm:p-2.5 rounded-[26px] ios-glass border border-white/40 dark:border-white/15 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
      >
        {/* Specular Highlight along top edge of the Dock */}
        <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 dark:via-white/25 to-transparent pointer-events-none" />

        {/* Navigation Items */}
        {navItems.map(({ to, icon: Icon, label, badge }) => {
          const isActive = location.pathname === to;
          const isHovered = hoveredTab === to;

          return (
            <div
              key={to}
              className="relative"
              onMouseEnter={() => {
                setHoveredTab(to);
                sound.playTap();
              }}
              onMouseLeave={() => setHoveredTab(null)}
            >
              {/* Tooltip on Hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: -42, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-30"
                  >
                    <div className="px-2.5 py-1 rounded-xl bg-zinc-900/90 dark:bg-white/95 text-white dark:text-zinc-900 text-[11px] font-medium tracking-tight shadow-lg backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap">
                      <span>{label}</span>
                      {badge && (
                        <span className="px-1.5 py-0.2 rounded-full bg-blue-500 text-white text-[9px] font-mono font-semibold">
                          {badge}
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dock Icon Button */}
              <NavLink
                to={to}
                onClick={() => sound.playPop()}
                className={`relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-[20px] transition-all duration-200 group ${
                  isActive ? "text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {/* Active Capsule with spring animation */}
                {isActive && (
                  <motion.div
                    layoutId="dock-active-pill"
                    className="absolute inset-0 rounded-[20px] bg-gradient-to-b from-blue-600 to-indigo-600 shadow-[0_4px_16px_rgba(59,130,246,0.4)]"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 32,
                    }}
                  />
                )}

                {/* Hover gentle glass effect if not active */}
                {!isActive && isHovered && (
                  <motion.div
                    layoutId="dock-hover-bg"
                    className="absolute inset-0 rounded-[20px] bg-black/5 dark:bg-white/10"
                    transition={{ duration: 0.15 }}
                  />
                )}

                <motion.div
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="relative z-10 flex items-center justify-center"
                >
                  <Icon
                    size={20}
                    className={`transition-colors ${
                      isActive ? "text-white drop-shadow" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  />
                </motion.div>

                {/* Indicator dot under active tab */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_6px_#3b82f6]" />
                )}
              </NavLink>
            </div>
          );
        })}

        {/* Separator */}
        <div className="w-[1px] h-7 bg-border/80 mx-0.5 sm:mx-1 rounded-full" />

        {/* Sound Toggle */}
        <motion.button
          whileHover={{ scale: 1.12, y: -2 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={handleSoundToggle}
          className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-[18px] text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          title={isMuted ? "Unmute haptics" : "Mute haptics"}
          aria-label="Toggle Sound Effects"
        >
          {isMuted ? (
            <VolumeX size={18} />
          ) : (
            <Volume2 size={18} className="text-blue-500" />
          )}
        </motion.button>

        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.12, y: -2 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={handleThemeToggle}
          className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-[18px] text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          title="Toggle Theme"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <Sun size={18} className="text-amber-400" />
          ) : (
            <Moon size={18} className="text-indigo-500" />
          )}
        </motion.button>
      </motion.div>
    </nav>
  );
};

export default FloatingNav;
