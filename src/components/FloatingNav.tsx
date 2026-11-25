import React, { useEffect, useState } from "react";
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
  Palette,
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
  { to: "/", icon: Home, label: "Home" },
  { to: "/projects", icon: Briefcase, label: "Projects" },
  { to: "/certifications", icon: Award, label: "Certs" },
  { to: "/contact", icon: Send, label: "Contact" },
];

export const FloatingNav: React.FC = () => {
  const { theme, activeTheme, toggleTheme, toggleStudio, isStudioOpen } = useTheme();
  const location = useLocation();
  const [isMuted, setIsMuted] = useState(sound.muted);

  useEffect(() => {
    return sound.subscribe(setIsMuted);
  }, []);

  const handleSoundToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.toggleMute();
  };

  const handleThemeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTheme();
  };

  const handleOpenStudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleStudio();
  };

  return (
    <nav
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 select-none pointer-events-auto transform-gpu"
      aria-label="Main Dock"
    >
      <div className="relative flex items-center gap-1 p-1.5 sm:p-2 theme-surface-strong theme-dock">
        {/* Navigation Items */}
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive =
            to === "/"
              ? location.pathname === "/"
              : location.pathname === to || location.pathname.startsWith(`${to}/`);

          return (
            <NavLink
              key={to}
              to={to}
              onClick={() => sound.playTap()}
              className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 transition-colors group"
              style={{
                borderRadius: "var(--theme-radius-md)",
                color: isActive ? "var(--theme-accent-fg)" : undefined,
              }}
              title={label}
            >
              {isActive && (
                <motion.div
                  layoutId="dock-active-pill"
                  className="absolute inset-0"
                  style={{
                    background: "var(--theme-btn-gradient)",
                    boxShadow: "var(--theme-accent-glow)",
                    borderRadius: "var(--theme-radius-md)",
                    border:
                      activeTheme.id === "neobrutal"
                        ? "2px solid #111111"
                        : activeTheme.id === "pixel"
                          ? "2px solid #121026"
                          : undefined,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 36,
                    mass: 0.6,
                  }}
                />
              )}

              <span
                className={`relative z-10 flex items-center justify-center group-hover:scale-110 group-active:scale-95 transition-transform duration-150 ${
                  isActive ? "" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={19} />
              </span>
            </NavLink>
          );
        })}

        {/* Separator */}
        <div className="w-[1px] h-6 bg-border/80 mx-1" />

        {/* Theme Studio Picker Button */}
        <button
          type="button"
          onClick={handleOpenStudio}
          data-testid="dock-theme-studio-btn"
          className={`relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 active:scale-95 transition-all ${
            isStudioOpen
              ? "theme-badge-accent"
              : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10"
          }`}
          style={{ borderRadius: "var(--theme-radius-md)" }}
          title={`Theme Studio (${activeTheme.name}) — Press T`}
          aria-label="Open Theme Studio"
          aria-expanded={isStudioOpen}
        >
          <Palette size={17} style={{ color: "var(--theme-accent)" }} />
          <span
            className="absolute bottom-1.5 right-1.5 w-2 h-2 border border-background"
            style={{
              backgroundColor: activeTheme.swatches[2],
              borderRadius: activeTheme.id === "pixel" ? "0px" : "999px",
            }}
          />
        </button>

        {/* Sound Toggle */}
        <button
          type="button"
          onClick={handleSoundToggle}
          className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all"
          style={{ borderRadius: "var(--theme-radius-md)" }}
          title={isMuted ? "Unmute sound" : `Mute sound (${activeTheme.soundLabel})`}
          aria-label="Toggle Sound"
        >
          {isMuted ? (
            <VolumeX size={17} />
          ) : (
            <Volume2 size={17} style={{ color: "var(--theme-accent)" }} />
          )}
        </button>

        {/* Quick Light / Dark Toggle */}
        <button
          type="button"
          onClick={handleThemeToggle}
          className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all"
          style={{ borderRadius: "var(--theme-radius-md)" }}
          title={theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
          aria-label="Toggle Light Dark Theme"
        >
          {theme === "dark" ? (
            <Sun size={17} style={{ color: "var(--theme-accent)" }} />
          ) : (
            <Moon size={17} style={{ color: "var(--theme-accent)" }} />
          )}
        </button>
      </div>
    </nav>
  );
};

export default FloatingNav;
