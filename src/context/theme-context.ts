import { createContext } from "react";
import type { FxIntensity, ThemeDefinition, ThemeId } from "@/config/themes";

export interface ThemeContextValue {
  /** Committed theme ID */
  themeId: ThemeId;
  /** Effective theme ID (may reflect hover preview when studio is open) */
  activeThemeId: ThemeId;
  /** Full metadata of the effective theme */
  activeTheme: ThemeDefinition;
  /** Full metadata of the committed theme */
  committedTheme: ThemeDefinition;
  /** Legacy compatibility alias ("dark" | "light") */
  theme: "dark" | "light";
  /** Atmospheric visual effects level */
  fxIntensity: FxIntensity;
  /** Whether Theme Studio drawer/modal is open */
  isStudioOpen: boolean;
  /** Currently previewed theme ID (hover preview) */
  previewThemeId: ThemeId | null;
  /** Whether a brief theme-switch transition pulse is active */
  isTransitioning: boolean;
  /** Commit a new theme */
  setTheme: (id: ThemeId, options?: { silent?: boolean; showToast?: boolean }) => void;
  /** Toggle quickly between dark/light liquid or previous dark theme */
  toggleTheme: () => void;
  /** Cycle through all themes sequentially */
  cycleTheme: () => void;
  /** Pick a random different theme */
  randomizeTheme: () => void;
  /** Update atmospheric FX intensity */
  setFxIntensity: (intensity: FxIntensity) => void;
  /** Preview a theme temporarily without persisting */
  setPreviewTheme: (id: ThemeId | null) => void;
  /** Open / close / toggle Theme Studio */
  openStudio: () => void;
  closeStudio: () => void;
  toggleStudio: () => void;
  /** Copy shareable URL with ?theme=<id> */
  copyThemeShareLink: () => Promise<string>;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

