export type ThemeId =
  | "liquid-dark"
  | "liquid-light"
  | "pixel"
  | "cyberpunk"
  | "monochrome"
  | "terminal"
  | "neobrutal"
  | "vaporwave";

export type FxIntensity = "off" | "subtle" | "full";

export type SoundProfile =
  | "liquid"
  | "chiptune"
  | "cyber"
  | "mechanical"
  | "terminal"
  | "brutal"
  | "vapor";

export type ThemeCategory = "All" | "Modern" | "Retro" | "Futuristic" | "Editorial";

export interface ThemePreviewPalette {
  bg: string;
  surface: string;
  text: string;
  muted: string;
  accent: string;
  accentSecondary: string;
  border: string;
  radius: string;
  shadow: string;
  displayFont: string;
  isHardShadow?: boolean;
  isChamfered?: boolean;
  hasScanlines?: boolean;
  hasGrid?: boolean;
}

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  category: Exclude<ThemeCategory, "All">;
  isDark: boolean;
  soundProfile: SoundProfile;
  soundLabel: string;
  fontLabel: string;
  themeColor: string;
  footerCraft: string;
  badgeLabel: string;
  swatches: [string, string, string, string];
  preview: ThemePreviewPalette;
}

export const DEFAULT_THEME_ID: ThemeId = "liquid-dark";

export const THEME_CATEGORIES: ThemeCategory[] = [
  "All",
  "Modern",
  "Retro",
  "Futuristic",
  "Editorial",
];

export const THEMES: Record<ThemeId, ThemeDefinition> = {
  "liquid-dark": {
    id: "liquid-dark",
    name: "Liquid Obsidian",
    shortName: "Obsidian",
    tagline: "Signature iOS frosted dark glass",
    description:
      "Translucent dark obsidian panes floating over luminous indigo and cyan aurora orbs with smooth squircle geometry.",
    category: "Modern",
    isDark: true,
    soundProfile: "liquid",
    soundLabel: "Silky Glass",
    fontLabel: "Plus Jakarta + Mono",
    themeColor: "#0b0e17",
    footerCraft: "iOS Liquid Glass",
    badgeLabel: "Default",
    swatches: ["#0b0e17", "#1e293b", "#3b82f6", "#8b5cf6"],
    preview: {
      bg: "#0b0e17",
      surface: "rgba(24, 30, 48, 0.85)",
      text: "#f1f5f9",
      muted: "#94a3b8",
      accent: "#3b82f6",
      accentSecondary: "#8b5cf6",
      border: "rgba(255, 255, 255, 0.14)",
      radius: "12px",
      shadow: "0 8px 20px rgba(0,0,0,0.45)",
      displayFont: "'Plus Jakarta Sans', sans-serif",
    },
  },
  "liquid-light": {
    id: "liquid-light",
    name: "Liquid Porcelain",
    shortName: "Porcelain",
    tagline: "Airy sunlit frosted glass studio",
    description:
      "Crisp alabaster surfaces, specular daylight reflections, and pastel sapphire aura gradients for effortless daytime clarity.",
    category: "Modern",
    isDark: false,
    soundProfile: "liquid",
    soundLabel: "Silky Glass",
    fontLabel: "Plus Jakarta + Mono",
    themeColor: "#f5f7fb",
    footerCraft: "Porcelain Liquid Glass",
    badgeLabel: "Light",
    swatches: ["#f5f7fb", "#ffffff", "#2563eb", "#6366f1"],
    preview: {
      bg: "#f5f7fb",
      surface: "rgba(255, 255, 255, 0.9)",
      text: "#0f172a",
      muted: "#64748b",
      accent: "#2563eb",
      accentSecondary: "#6366f1",
      border: "rgba(15, 23, 42, 0.12)",
      radius: "12px",
      shadow: "0 6px 16px rgba(31, 38, 135, 0.08)",
      displayFont: "'Plus Jakarta Sans', sans-serif",
    },
  },
  pixel: {
    id: "pixel",
    name: "Pixel Arcade 8-Bit",
    shortName: "Pixel 8-Bit",
    tagline: "Retro cartridge console & chiptune",
    description:
      "Razor-sharp 0px corners, stepped pixel shadows, arcade gold & cyan palettes, animated 8-bit starfield, and square-wave chiptune SFX.",
    category: "Retro",
    isDark: true,
    soundProfile: "chiptune",
    soundLabel: "8-Bit Chiptune",
    fontLabel: "Press Start 2P + Silkscreen",
    themeColor: "#121026",
    footerCraft: "8-Bit Pixel Engine",
    badgeLabel: "8-Bit",
    swatches: ["#121026", "#231f47", "#ffd541", "#38f5ff"],
    preview: {
      bg: "#121026",
      surface: "#1f1b3f",
      text: "#fef9e7",
      muted: "#a5a0d6",
      accent: "#ffd541",
      accentSecondary: "#38f5ff",
      border: "#5c54a4",
      radius: "0px",
      shadow: "4px 4px 0px #090714",
      displayFont: "'Press Start 2P', monospace",
      isHardShadow: true,
      hasScanlines: true,
    },
  },
  cyberpunk: {
    id: "cyberpunk",
    name: "Cyberpunk 2077",
    shortName: "Cyberpunk",
    tagline: "Night City neon HUD & synth grid",
    description:
      "Chamfered cyber-cut frames, high-voltage yellow & cyan neon optics, 3D receding synthwave horizon, and futuristic FM synth audio.",
    category: "Futuristic",
    isDark: true,
    soundProfile: "cyber",
    soundLabel: "Cyber Synth",
    fontLabel: "Orbitron + Rajdhani",
    themeColor: "#06060d",
    footerCraft: "Night City Cyber HUD",
    badgeLabel: "Neon HUD",
    swatches: ["#06060d", "#111326", "#fcee0a", "#00f0ff"],
    preview: {
      bg: "#06060d",
      surface: "rgba(15, 18, 36, 0.92)",
      text: "#eefaff",
      muted: "#84a9c0",
      accent: "#fcee0a",
      accentSecondary: "#00f0ff",
      border: "#00f0ff",
      radius: "2px",
      shadow: "0 0 14px rgba(0, 240, 255, 0.3)",
      displayFont: "'Orbitron', sans-serif",
      isChamfered: true,
      hasGrid: true,
      hasScanlines: true,
    },
  },
  monochrome: {
    id: "monochrome",
    name: "Monochrome Noir",
    shortName: "Monochrome",
    tagline: "Swiss editorial gallery & B&W ink",
    description:
      "Pure obsidian black and gallery ivory contrast, editorial serif typography, grayscale-to-color hover media, and tactile shutter audio.",
    category: "Editorial",
    isDark: true,
    soundProfile: "mechanical",
    soundLabel: "Leica Shutter",
    fontLabel: "Playfair + Jakarta",
    themeColor: "#080808",
    footerCraft: "Monochrome Swiss Editorial",
    badgeLabel: "Editorial",
    swatches: ["#080808", "#161616", "#fafafa", "#737373"],
    preview: {
      bg: "#080808",
      surface: "#121212",
      text: "#fafafa",
      muted: "#a3a3a3",
      accent: "#ffffff",
      accentSecondary: "#d4d4d4",
      border: "rgba(255, 255, 255, 0.22)",
      radius: "3px",
      shadow: "0 8px 24px rgba(0,0,0,0.65)",
      displayFont: "'Playfair Display', serif",
      hasGrid: true,
    },
  },
  terminal: {
    id: "terminal",
    name: "Matrix Terminal",
    shortName: "Terminal",
    tagline: "Phosphor CRT hacker console",
    description:
      "Monospace command-line interface with live Matrix digital rain, phosphor green CRT glow, scanline optics, and terminal key clacks.",
    category: "Futuristic",
    isDark: true,
    soundProfile: "terminal",
    soundLabel: "CRT Keybeep",
    fontLabel: "JetBrains Mono",
    themeColor: "#030a04",
    footerCraft: "Phosphor CRT Shell",
    badgeLabel: "CLI",
    swatches: ["#030a04", "#081c0c", "#00ff66", "#ffb000"],
    preview: {
      bg: "#030a04",
      surface: "rgba(6, 22, 10, 0.92)",
      text: "#b8ffcb",
      muted: "#4da667",
      accent: "#00ff66",
      accentSecondary: "#ffb000",
      border: "rgba(0, 255, 102, 0.45)",
      radius: "2px",
      shadow: "0 0 14px rgba(0, 255, 102, 0.2)",
      displayFont: "'JetBrains Mono', monospace",
      hasScanlines: true,
    },
  },
  neobrutal: {
    id: "neobrutal",
    name: "Neo-Brutalist Pop",
    shortName: "Brutalist",
    tagline: "Bold studio paper & comic ink",
    description:
      "Warm cream studio stock, chunky 3px ink outlines, hard offset drop shadows, vivid Bauhaus accents, and punchy tactile thocks.",
    category: "Editorial",
    isDark: false,
    soundProfile: "brutal",
    soundLabel: "Tactile Thock",
    fontLabel: "Space Grotesk + Mono",
    themeColor: "#faf4e1",
    footerCraft: "Neo-Brutalist Print Studio",
    badgeLabel: "Bold Light",
    swatches: ["#faf4e1", "#ffffff", "#ff5c5c", "#facc15"],
    preview: {
      bg: "#faf4e1",
      surface: "#ffffff",
      text: "#111111",
      muted: "#44403c",
      accent: "#ff5c5c",
      accentSecondary: "#facc15",
      border: "#111111",
      radius: "10px",
      shadow: "4px 4px 0px #111111",
      displayFont: "'Space Grotesk', sans-serif",
      isHardShadow: true,
      hasGrid: true,
    },
  },
  vaporwave: {
    id: "vaporwave",
    name: "Vaporwave 1984",
    shortName: "Vaporwave",
    tagline: "Outrun sunset & chrome twilight",
    description:
      "Dreamy twilight violet skies, iconic striped outrun sun, electric magenta & turquoise chrome sheen, and lush detuned synth chimes.",
    category: "Retro",
    isDark: true,
    soundProfile: "vapor",
    soundLabel: "Synth Chime",
    fontLabel: "Syne + Jakarta",
    themeColor: "#120624",
    footerCraft: "Outrun 1984 Synthwave",
    badgeLabel: "Outrun",
    swatches: ["#120624", "#210e3d", "#ff4ecd", "#05ffa1"],
    preview: {
      bg: "#120624",
      surface: "rgba(33, 14, 61, 0.85)",
      text: "#fdf4ff",
      muted: "#c4b5fd",
      accent: "#ff4ecd",
      accentSecondary: "#05ffa1",
      border: "rgba(255, 78, 205, 0.45)",
      radius: "14px",
      shadow: "0 8px 24px rgba(255, 78, 205, 0.22)",
      displayFont: "'Syne', sans-serif",
      hasGrid: true,
    },
  },
};

export const THEME_LIST: ThemeDefinition[] = [
  THEMES["liquid-dark"],
  THEMES["liquid-light"],
  THEMES["pixel"],
  THEMES["cyberpunk"],
  THEMES["monochrome"],
  THEMES["terminal"],
  THEMES["neobrutal"],
  THEMES["vaporwave"],
];

export const isValidThemeId = (value: string | null | undefined): value is ThemeId => {
  if (!value) return false;
  return Object.prototype.hasOwnProperty.call(THEMES, value);
};

export const getThemeById = (id: ThemeId): ThemeDefinition => THEMES[id] ?? THEMES[DEFAULT_THEME_ID];

export const getNextThemeId = (current: ThemeId): ThemeId => {
  const idx = THEME_LIST.findIndex((t) => t.id === current);
  if (idx === -1) return DEFAULT_THEME_ID;
  return THEME_LIST[(idx + 1) % THEME_LIST.length].id;
};

export const getRandomThemeId = (exclude: ThemeId): ThemeId => {
  const candidates = THEME_LIST.filter((t) => t.id !== exclude);
  const picked = candidates[Math.floor(Math.random() * candidates.length)];
  return picked ? picked.id : DEFAULT_THEME_ID;
};

