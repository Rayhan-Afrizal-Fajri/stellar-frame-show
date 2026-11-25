import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import {
  DEFAULT_THEME_ID,
  THEMES,
  getNextThemeId,
  getRandomThemeId,
  getThemeById,
  isValidThemeId,
  type FxIntensity,
  type ThemeDefinition,
  type ThemeId,
} from "@/config/themes";
import { sound } from "@/lib/audio";
import { ThemeContext, type ThemeContextValue } from "@/context/theme-context";

const STORAGE_THEME_KEY = "portfolio_theme";
const STORAGE_LEGACY_THEME_KEY = "theme";
const STORAGE_FX_KEY = "portfolio_fx";

const isValidFxIntensity = (val: string | null | undefined): val is FxIntensity =>
  val === "off" || val === "subtle" || val === "full";

function resolveInitialTheme(): ThemeId {
  if (typeof window === "undefined") return DEFAULT_THEME_ID;

  try {
    const params = new URLSearchParams(window.location.search);
    const urlTheme = params.get("theme");
    if (isValidThemeId(urlTheme)) {
      return urlTheme;
    }

    const stored = localStorage.getItem(STORAGE_THEME_KEY);
    if (isValidThemeId(stored)) {
      return stored;
    }

    const legacy = localStorage.getItem(STORAGE_LEGACY_THEME_KEY);
    if (legacy === "light") return "liquid-light";
    if (legacy === "dark") return "liquid-dark";
  } catch {
    // Ignore storage access errors in restricted environments
  }

  return DEFAULT_THEME_ID;
}

function resolveInitialFx(): FxIntensity {
  if (typeof window === "undefined") return "full";

  try {
    const stored = localStorage.getItem(STORAGE_FX_KEY);
    if (isValidFxIntensity(stored)) return stored;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return "off";
    }
  } catch {
    // Fallback cleanly
  }

  return "full";
}

function applyThemeToDom(themeDef: ThemeDefinition, fxIntensity: FxIntensity) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-theme", themeDef.id);
  root.setAttribute("data-fx", fxIntensity);

  if (themeDef.isDark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  // Keep browser chrome theme-color in sync
  let metaThemeColor = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]:not([media])'
  );
  if (!metaThemeColor) {
    metaThemeColor = document.createElement("meta");
    metaThemeColor.name = "theme-color";
    document.head.appendChild(metaThemeColor);
  }
  metaThemeColor.content = themeDef.themeColor;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeIdState] = useState<ThemeId>(resolveInitialTheme);
  const [previewThemeId, setPreviewThemeId] = useState<ThemeId | null>(null);
  const [fxIntensity, setFxIntensityState] = useState<FxIntensity>(resolveInitialFx);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const transitionTimerRef = useRef<number | null>(null);
  const lastDarkThemeRef = useRef<ThemeId>(
    THEMES[themeId].isDark ? themeId : "liquid-dark"
  );

  const effectiveThemeId = previewThemeId ?? themeId;
  const activeTheme = useMemo(() => getThemeById(effectiveThemeId), [effectiveThemeId]);
  const committedTheme = useMemo(() => getThemeById(themeId), [themeId]);

  // Apply DOM attributes and sound profile whenever effective theme or FX changes
  useEffect(() => {
    applyThemeToDom(activeTheme, fxIntensity);
    sound.setProfile(activeTheme.soundProfile);
  }, [activeTheme, fxIntensity]);

  // Persist committed theme
  useEffect(() => {
    if (THEMES[themeId].isDark) {
      lastDarkThemeRef.current = themeId;
    }
    try {
      localStorage.setItem(STORAGE_THEME_KEY, themeId);
      localStorage.setItem(
        STORAGE_LEGACY_THEME_KEY,
        THEMES[themeId].isDark ? "dark" : "light"
      );
    } catch {
      // Ignore storage errors
    }
  }, [themeId]);

  // Persist FX preference
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_FX_KEY, fxIntensity);
    } catch {
      // Ignore storage errors
    }
  }, [fxIntensity]);

  // Clean up transition timer on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  // Cross-tab synchronization
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_THEME_KEY && isValidThemeId(e.newValue)) {
        setThemeIdState(e.newValue);
      }
      if (e.key === STORAGE_FX_KEY && isValidFxIntensity(e.newValue)) {
        setFxIntensityState(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const triggerTransitionPulse = useCallback(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    setIsTransitioning(true);
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
    }
    transitionTimerRef.current = window.setTimeout(() => {
      setIsTransitioning(false);
    }, 420);
  }, []);

  const setTheme = useCallback(
    (id: ThemeId, options?: { silent?: boolean; showToast?: boolean }) => {
      const target = getThemeById(id);
      setPreviewThemeId(null);
      setThemeIdState(id);
      sound.setProfile(target.soundProfile);
      triggerTransitionPulse();

      if (!options?.silent) {
        sound.playThemeChange(target.soundProfile);
      }

      if (options?.showToast) {
        toast.success(`Theme: ${target.name}`, {
          description: `${target.tagline} · Sound: ${target.soundLabel}`,
          duration: 2200,
        });
      }
    },
    [triggerTransitionPulse]
  );

  const toggleTheme = useCallback(() => {
    const current = getThemeById(themeId);
    const nextId: ThemeId = current.isDark ? "liquid-light" : lastDarkThemeRef.current;
    setTheme(nextId, { silent: false, showToast: false });
  }, [themeId, setTheme]);

  const cycleTheme = useCallback(() => {
    const nextId = getNextThemeId(themeId);
    setTheme(nextId, { silent: false, showToast: true });
  }, [themeId, setTheme]);

  const randomizeTheme = useCallback(() => {
    const randomId = getRandomThemeId(themeId);
    setTheme(randomId, { silent: false, showToast: true });
  }, [themeId, setTheme]);

  const setFxIntensity = useCallback((intensity: FxIntensity) => {
    sound.playTap();
    setFxIntensityState(intensity);
  }, []);

  const openStudio = useCallback(() => {
    sound.playPop();
    setIsStudioOpen(true);
  }, []);

  const closeStudio = useCallback(() => {
    setPreviewThemeId(null);
    setIsStudioOpen(false);
  }, []);

  const toggleStudio = useCallback(() => {
    setIsStudioOpen((prev) => {
      if (prev) {
        setPreviewThemeId(null);
        sound.playTap();
      } else {
        sound.playPop();
      }
      return !prev;
    });
  }, []);

  const copyThemeShareLink = useCallback(async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("theme", themeId);
    const shareUrl = url.toString();
    try {
      await navigator.clipboard.writeText(shareUrl);
      sound.playPop();
      toast.success("Shareable theme link copied!", {
        description: `${getThemeById(themeId).name} preset ready to share`,
      });
    } catch {
      toast("Copy failed — copy URL manually", { description: shareUrl });
    }
    return shareUrl;
  }, [themeId]);

  // Global keyboard shortcuts: T -> open studio, Shift+T -> cycle theme, Escape -> close studio
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isStudioOpen) {
        e.preventDefault();
        closeStudio();
        return;
      }

      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "T" && e.shiftKey) {
        e.preventDefault();
        cycleTheme();
      } else if (e.key === "t" && !e.shiftKey) {
        e.preventDefault();
        toggleStudio();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isStudioOpen, closeStudio, cycleTheme, toggleStudio]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      themeId,
      activeThemeId: effectiveThemeId,
      activeTheme,
      committedTheme,
      theme: activeTheme.isDark ? "dark" : "light",
      fxIntensity,
      isStudioOpen,
      previewThemeId,
      isTransitioning,
      setTheme,
      toggleTheme,
      cycleTheme,
      randomizeTheme,
      setFxIntensity,
      setPreviewTheme: setPreviewThemeId,
      openStudio,
      closeStudio,
      toggleStudio,
      copyThemeShareLink,
    }),
    [
      themeId,
      effectiveThemeId,
      activeTheme,
      committedTheme,
      fxIntensity,
      isStudioOpen,
      previewThemeId,
      isTransitioning,
      setTheme,
      toggleTheme,
      cycleTheme,
      randomizeTheme,
      setFxIntensity,
      openStudio,
      closeStudio,
      toggleStudio,
      copyThemeShareLink,
    ]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

