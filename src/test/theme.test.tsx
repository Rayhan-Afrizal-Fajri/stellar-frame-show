import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {
  DEFAULT_THEME_ID,
  THEME_CATEGORIES,
  THEME_LIST,
  THEMES,
  getNextThemeId,
  getRandomThemeId,
  getThemeById,
  isValidThemeId,
  type SoundProfile,
  type ThemeCategory,
  type ThemeId,
} from "@/config/themes";
import { ThemeProvider, type ThemeContextValue } from "@/context/ThemeContext";
import { useTheme } from "@/hooks/useTheme";
import { sound } from "@/lib/audio";
import { ThemeStudio } from "@/components/ThemeStudio";
import { FloatingNav } from "@/components/FloatingNav";

const ALL_THEME_IDS: ThemeId[] = [
  "liquid-dark",
  "liquid-light",
  "pixel",
  "cyberpunk",
  "monochrome",
  "terminal",
  "neobrutal",
  "vaporwave",
];

const DARK_THEME_IDS: ThemeId[] = [
  "liquid-dark",
  "pixel",
  "cyberpunk",
  "monochrome",
  "terminal",
  "vaporwave",
];

const LIGHT_THEME_IDS: ThemeId[] = ["liquid-light", "neobrutal"];

const ALL_SOUND_PROFILES: SoundProfile[] = [
  "liquid",
  "chiptune",
  "cyber",
  "mechanical",
  "terminal",
  "brutal",
  "vapor",
];

const defaultMatchMedia = window.matchMedia;

const resetEnvironment = () => {
  if (sound.muted) {
    sound.toggleMute();
  }
  sound.setProfile("liquid");
  localStorage.clear();
  window.history.replaceState({}, "", "/");
  window.matchMedia = defaultMatchMedia;
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.removeAttribute("data-fx");
  document.documentElement.classList.remove("dark");
  document.body.style.overflow = "";
  document
    .querySelectorAll('meta[name="theme-color"]:not([media])')
    .forEach((meta) => meta.remove());
};

const ThemeContextCapture: React.FC<{
  onContext: (ctx: ThemeContextValue) => void;
}> = ({ onContext }) => {
  const ctx = useTheme();
  onContext(ctx);
  return (
    <div data-testid="theme-probe">
      <span data-testid="probe-theme-id">{ctx.themeId}</span>
      <span data-testid="probe-active-theme-id">{ctx.activeThemeId}</span>
      <span data-testid="probe-legacy-theme">{ctx.theme}</span>
      <span data-testid="probe-fx">{ctx.fxIntensity}</span>
      <span data-testid="probe-studio-open">{String(ctx.isStudioOpen)}</span>
    </div>
  );
};

const renderStudioApp = (extra?: React.ReactNode) => {
  return render(
    <ThemeProvider>
      <MemoryRouter
        initialEntries={["/"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <FloatingNav />
        <ThemeStudio />
        {extra}
      </MemoryRouter>
    </ThemeProvider>
  );
};

beforeEach(() => {
  resetEnvironment();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  resetEnvironment();
});

describe("1. Theme Registry Integrity", () => {
  it("registers all 8 expected themes with unique IDs and matching THEME_LIST entries", () => {
    const keys = Object.keys(THEMES);
    expect(keys).toHaveLength(8);
    expect(THEME_LIST).toHaveLength(8);

    const listIds = THEME_LIST.map((t) => t.id);
    expect(new Set(listIds).size).toBe(8);
    expect(listIds).toEqual(expect.arrayContaining(ALL_THEME_IDS));
    expect(keys).toEqual(expect.arrayContaining(ALL_THEME_IDS));

    for (const id of ALL_THEME_IDS) {
      expect(THEMES[id]).toBeDefined();
      expect(THEMES[id].id).toBe(id);
    }
  });

  it("assigns valid isDark flags (liquid-light and neobrutal are light; the other 6 are dark)", () => {
    for (const id of LIGHT_THEME_IDS) {
      expect(THEMES[id].isDark).toBe(false);
    }
    for (const id of DARK_THEME_IDS) {
      expect(THEMES[id].isDark).toBe(true);
    }
  });

  it("defines complete metadata, categories, swatches, and sound profiles for every theme", () => {
    const validCategories = THEME_CATEGORIES.filter((c) => c !== "All");

    for (const theme of THEME_LIST) {
      expect(theme.name.trim().length).toBeGreaterThan(0);
      expect(theme.shortName.trim().length).toBeGreaterThan(0);
      expect(theme.tagline.trim().length).toBeGreaterThan(0);
      expect(theme.description.trim().length).toBeGreaterThan(0);
      expect(validCategories).toContain(theme.category);
      expect(ALL_SOUND_PROFILES).toContain(theme.soundProfile);
      expect(theme.swatches).toHaveLength(4);
      expect(theme.themeColor).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(theme.preview.bg).toBeTruthy();
      expect(theme.preview.accent).toBeTruthy();
      expect(theme.preview.displayFont).toBeTruthy();
    }
  });

  it("validates theme IDs strictly with isValidThemeId", () => {
    for (const id of ALL_THEME_IDS) {
      expect(isValidThemeId(id)).toBe(true);
    }

    expect(isValidThemeId("")).toBe(false);
    expect(isValidThemeId(null)).toBe(false);
    expect(isValidThemeId(undefined)).toBe(false);
    expect(isValidThemeId("dark")).toBe(false);
    expect(isValidThemeId("light")).toBe(false);
    expect(isValidThemeId("neon")).toBe(false);
    expect(isValidThemeId("toString")).toBe(false);
    expect(isValidThemeId("constructor")).toBe(false);
    expect(isValidThemeId("__proto__")).toBe(false);
  });

  it("returns exact definitions from getThemeById and falls back to DEFAULT_THEME_ID", () => {
    expect(DEFAULT_THEME_ID).toBe("liquid-dark");
    for (const id of ALL_THEME_IDS) {
      expect(getThemeById(id)).toBe(THEMES[id]);
    }
    expect(getThemeById("nonexistent" as ThemeId)).toBe(THEMES[DEFAULT_THEME_ID]);
  });

  it("cycles through every theme with getNextThemeId and wraps around to the first theme", () => {
    let current = THEME_LIST[0].id;
    const visited: ThemeId[] = [current];

    for (let i = 1; i < THEME_LIST.length; i++) {
      current = getNextThemeId(current);
      visited.push(current);
    }

    expect(visited).toEqual(THEME_LIST.map((t) => t.id));
    // Wraps around from last theme back to first
    expect(getNextThemeId(THEME_LIST[THEME_LIST.length - 1].id)).toBe(THEME_LIST[0].id);
    // Invalid input falls back to default
    expect(getNextThemeId("unknown" as ThemeId)).toBe(DEFAULT_THEME_ID);
  });

  it("never returns the excluded current theme from getRandomThemeId", () => {
    for (const current of ALL_THEME_IDS) {
      for (let i = 0; i < 30; i++) {
        const picked = getRandomThemeId(current);
        expect(isValidThemeId(picked)).toBe(true);
        expect(picked).not.toBe(current);
      }
    }
  });
});

describe("2. ThemeProvider DOM & Storage Synchronization", () => {
  it("defaults to liquid-dark, sets data-theme, data-fx, .dark class, meta theme-color, sound profile, and storage", () => {
    let ctx!: ThemeContextValue;
    render(
      <ThemeProvider>
        <ThemeContextCapture onContext={(c) => (ctx = c)} />
      </ThemeProvider>
    );

    expect(ctx.themeId).toBe("liquid-dark");
    expect(ctx.theme).toBe("dark");
    expect(ctx.fxIntensity).toBe("full");

    const root = document.documentElement;
    expect(root.getAttribute("data-theme")).toBe("liquid-dark");
    expect(root.getAttribute("data-fx")).toBe("full");
    expect(root.classList.contains("dark")).toBe(true);

    const metaTheme = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]:not([media])'
    );
    expect(metaTheme?.content).toBe(THEMES["liquid-dark"].themeColor);

    expect(localStorage.getItem("portfolio_theme")).toBe("liquid-dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(localStorage.getItem("portfolio_fx")).toBe("full");
    expect(sound.profile).toBe("liquid");
  });

  it("respects ?theme=cyberpunk URL search param on mount and prioritizes it over stored theme", () => {
    localStorage.setItem("portfolio_theme", "pixel");
    window.history.replaceState({}, "", "/?theme=cyberpunk");

    let ctx!: ThemeContextValue;
    render(
      <ThemeProvider>
        <ThemeContextCapture onContext={(c) => (ctx = c)} />
      </ThemeProvider>
    );

    expect(ctx.themeId).toBe("cyberpunk");
    expect(document.documentElement.getAttribute("data-theme")).toBe("cyberpunk");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(sound.profile).toBe("cyber");
    expect(localStorage.getItem("portfolio_theme")).toBe("cyberpunk");
  });

  it("ignores invalid ?theme URL search param and falls back to stored/default theme", () => {
    localStorage.setItem("portfolio_theme", "vaporwave");
    window.history.replaceState({}, "", "/?theme=does-not-exist");

    let ctx!: ThemeContextValue;
    render(
      <ThemeProvider>
        <ThemeContextCapture onContext={(c) => (ctx = c)} />
      </ThemeProvider>
    );

    expect(ctx.themeId).toBe("vaporwave");
    expect(document.documentElement.getAttribute("data-theme")).toBe("vaporwave");
  });

  it('respects legacy localStorage.getItem("theme") === "light" mapping to liquid-light', () => {
    localStorage.setItem("theme", "light");

    let ctx!: ThemeContextValue;
    render(
      <ThemeProvider>
        <ThemeContextCapture onContext={(c) => (ctx = c)} />
      </ThemeProvider>
    );

    expect(ctx.themeId).toBe("liquid-light");
    expect(ctx.theme).toBe("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("liquid-light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("portfolio_theme")).toBe("liquid-light");
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("keeps .dark for dark themes, removes .dark for light themes, persists to localStorage, and updates sound.profile", () => {
    let ctx!: ThemeContextValue;
    render(
      <ThemeProvider>
        <ThemeContextCapture onContext={(c) => (ctx = c)} />
      </ThemeProvider>
    );

    const darkTargets: ThemeId[] = [
      "pixel",
      "cyberpunk",
      "monochrome",
      "terminal",
      "vaporwave",
    ];

    for (const id of darkTargets) {
      act(() => {
        ctx.setTheme(id, { silent: true });
      });

      expect(document.documentElement.getAttribute("data-theme")).toBe(id);
      expect(document.documentElement.classList.contains("dark")).toBe(true);
      expect(localStorage.getItem("portfolio_theme")).toBe(id);
      expect(localStorage.getItem("theme")).toBe("dark");
      expect(sound.profile).toBe(THEMES[id].soundProfile);
    }

    const lightTargets: ThemeId[] = ["neobrutal", "liquid-light"];
    for (const id of lightTargets) {
      act(() => {
        ctx.setTheme(id, { silent: true });
      });

      expect(document.documentElement.getAttribute("data-theme")).toBe(id);
      expect(document.documentElement.classList.contains("dark")).toBe(false);
      expect(localStorage.getItem("portfolio_theme")).toBe(id);
      expect(localStorage.getItem("theme")).toBe("light");
      expect(sound.profile).toBe(THEMES[id].soundProfile);
    }
  });

  it("updates data-fx and persists to localStorage when fxIntensity changes", () => {
    let ctx!: ThemeContextValue;
    render(
      <ThemeProvider>
        <ThemeContextCapture onContext={(c) => (ctx = c)} />
      </ThemeProvider>
    );

    for (const level of ["off", "subtle", "full"] as const) {
      act(() => {
        ctx.setFxIntensity(level);
      });

      expect(ctx.fxIntensity).toBe(level);
      expect(document.documentElement.getAttribute("data-fx")).toBe(level);
      expect(localStorage.getItem("portfolio_fx")).toBe(level);
    }
  });

  it("defaults fxIntensity to off when prefers-reduced-motion: reduce matches and no stored preference exists", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    let ctx!: ThemeContextValue;
    render(
      <ThemeProvider>
        <ThemeContextCapture onContext={(c) => (ctx = c)} />
      </ThemeProvider>
    );

    expect(ctx.fxIntensity).toBe("off");
    expect(document.documentElement.getAttribute("data-fx")).toBe("off");
  });

  it("remembers last dark theme when using toggleTheme", () => {
    let ctx!: ThemeContextValue;
    render(
      <ThemeProvider>
        <ThemeContextCapture onContext={(c) => (ctx = c)} />
      </ThemeProvider>
    );

    act(() => {
      ctx.setTheme("cyberpunk", { silent: true });
    });
    expect(ctx.themeId).toBe("cyberpunk");

    act(() => {
      ctx.toggleTheme();
    });
    expect(ctx.themeId).toBe("liquid-light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    act(() => {
      ctx.toggleTheme();
    });
    expect(ctx.themeId).toBe("cyberpunk");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("synchronizes theme and FX across tabs via storage events", () => {
    let ctx!: ThemeContextValue;
    render(
      <ThemeProvider>
        <ThemeContextCapture onContext={(c) => (ctx = c)} />
      </ThemeProvider>
    );

    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", { key: "portfolio_theme", newValue: "terminal" })
      );
      window.dispatchEvent(
        new StorageEvent("storage", { key: "portfolio_fx", newValue: "subtle" })
      );
    });

    expect(ctx.themeId).toBe("terminal");
    expect(ctx.fxIntensity).toBe("subtle");
    expect(document.documentElement.getAttribute("data-theme")).toBe("terminal");
    expect(document.documentElement.getAttribute("data-fx")).toBe("subtle");

    // Invalid cross-tab values should be ignored
    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", { key: "portfolio_theme", newValue: "invalid" })
      );
      window.dispatchEvent(
        new StorageEvent("storage", { key: "portfolio_fx", newValue: "ultra" })
      );
    });

    expect(ctx.themeId).toBe("terminal");
    expect(ctx.fxIntensity).toBe("subtle");
  });

  it("throws when useTheme is called outside ThemeProvider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const BrokenConsumer = () => {
      useTheme();
      return null;
    };

    expect(() => render(<BrokenConsumer />)).toThrow(
      "useTheme must be used within a ThemeProvider"
    );
    spy.mockRestore();
  });
});

describe("3. Keyboard Shortcuts", () => {
  it('opens Theme Studio modal when pressing "t" and closes it when pressing "Escape"', async () => {
    renderStudioApp();

    expect(screen.queryByTestId("theme-studio-modal")).not.toBeInTheDocument();

    fireEvent.keyDown(window, { key: "t" });
    expect(screen.getByTestId("theme-studio-modal")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => {
      expect(screen.queryByTestId("theme-studio-modal")).not.toBeInTheDocument();
    });
  });

  it('cycles to the next theme when pressing "Shift+T"', () => {
    renderStudioApp();

    expect(document.documentElement.getAttribute("data-theme")).toBe("liquid-dark");

    fireEvent.keyDown(window, { key: "T", shiftKey: true });
    expect(document.documentElement.getAttribute("data-theme")).toBe(
      getNextThemeId("liquid-dark")
    );

    fireEvent.keyDown(window, { key: "T", shiftKey: true });
    expect(document.documentElement.getAttribute("data-theme")).toBe(
      getNextThemeId(getNextThemeId("liquid-dark"))
    );
  });

  it('does NOT open Theme Studio when typing "t" inside an <input>, <textarea>, or <select>', () => {
    renderStudioApp(
      <div>
        <input data-testid="text-input" type="text" />
        <textarea data-testid="text-area" />
        <select data-testid="select-input">
          <option value="a">A</option>
        </select>
      </div>
    );

    const input = screen.getByTestId("text-input");
    fireEvent.keyDown(input, { key: "t" });
    expect(screen.queryByTestId("theme-studio-modal")).not.toBeInTheDocument();

    const textarea = screen.getByTestId("text-area");
    fireEvent.keyDown(textarea, { key: "t" });
    expect(screen.queryByTestId("theme-studio-modal")).not.toBeInTheDocument();

    const select = screen.getByTestId("select-input");
    fireEvent.keyDown(select, { key: "t" });
    expect(screen.queryByTestId("theme-studio-modal")).not.toBeInTheDocument();

    // Shift+T inside an input should also not cycle the theme
    fireEvent.keyDown(input, { key: "T", shiftKey: true });
    expect(document.documentElement.getAttribute("data-theme")).toBe("liquid-dark");
  });

  it('ignores "t" when Ctrl, Meta, or Alt modifiers are held', () => {
    renderStudioApp();

    fireEvent.keyDown(window, { key: "t", ctrlKey: true });
    fireEvent.keyDown(window, { key: "t", metaKey: true });
    fireEvent.keyDown(window, { key: "t", altKey: true });

    expect(screen.queryByTestId("theme-studio-modal")).not.toBeInTheDocument();
  });
});

describe("4. ThemeStudio & FloatingNav UI Interactions", () => {
  it("opens the Theme Studio modal from dock-theme-studio-btn and renders all 8 theme preview cards", () => {
    renderStudioApp();

    const dockBtn = screen.getByTestId("dock-theme-studio-btn");
    expect(dockBtn).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(dockBtn);

    expect(screen.getByTestId("theme-studio-modal")).toBeInTheDocument();
    expect(dockBtn).toHaveAttribute("aria-expanded", "true");

    for (const id of ALL_THEME_IDS) {
      expect(screen.getByTestId(`theme-card-${id}`)).toBeInTheDocument();
    }
  });

  it("filters theme cards accurately across Retro, Futuristic, Editorial, Modern, and All categories", () => {
    renderStudioApp();
    fireEvent.click(screen.getByTestId("dock-theme-studio-btn"));

    const expectedByCategory: Record<ThemeCategory, ThemeId[]> = {
      Retro: ["pixel", "vaporwave"],
      Futuristic: ["cyberpunk", "terminal"],
      Editorial: ["monochrome", "neobrutal"],
      Modern: ["liquid-dark", "liquid-light"],
      All: ALL_THEME_IDS,
    };

    const categoriesOrder: ThemeCategory[] = [
      "Retro",
      "Futuristic",
      "Editorial",
      "Modern",
      "All",
    ];

    for (const category of categoriesOrder) {
      const expectedIds = expectedByCategory[category];
      const pattern = new RegExp(`^${category}\\s*\\(${expectedIds.length}\\)$`);
      const filterBtn = screen.getByText(
        (_, element) =>
          element?.tagName === "BUTTON" && pattern.test(element.textContent?.trim() ?? "")
      );
      fireEvent.click(filterBtn);

      for (const id of ALL_THEME_IDS) {
        const card = screen.queryByTestId(`theme-card-${id}`);
        if (expectedIds.includes(id)) {
          expect(card).toBeInTheDocument();
        } else {
          expect(card).not.toBeInTheDocument();
        }
      }
    }
  });

  it("switches data-theme to pixel and sets sound.profile to chiptune when clicking theme-card-pixel", () => {
    renderStudioApp();
    fireEvent.click(screen.getByTestId("dock-theme-studio-btn"));

    const pixelCard = screen.getByTestId("theme-card-pixel");
    expect(pixelCard).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(pixelCard);

    expect(document.documentElement.getAttribute("data-theme")).toBe("pixel");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(sound.profile).toBe("chiptune");
    expect(localStorage.getItem("portfolio_theme")).toBe("pixel");
    expect(pixelCard).toHaveAttribute("aria-pressed", "true");
  });

  it('sets data-fx="off" when clicking fx-option-off and updates other FX options', () => {
    renderStudioApp();
    fireEvent.click(screen.getByTestId("dock-theme-studio-btn"));

    const offBtn = screen.getByTestId("fx-option-off");
    const subtleBtn = screen.getByTestId("fx-option-subtle");
    const fullBtn = screen.getByTestId("fx-option-full");

    expect(fullBtn).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(offBtn);
    expect(document.documentElement.getAttribute("data-fx")).toBe("off");
    expect(localStorage.getItem("portfolio_fx")).toBe("off");
    expect(offBtn).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(subtleBtn);
    expect(document.documentElement.getAttribute("data-fx")).toBe("subtle");
    expect(localStorage.getItem("portfolio_fx")).toBe("subtle");
    expect(subtleBtn).toHaveAttribute("aria-pressed", "true");
  });

  it("switches to a different theme when clicking theme-randomize-btn", () => {
    renderStudioApp();
    fireEvent.click(screen.getByTestId("dock-theme-studio-btn"));

    const initialTheme = document.documentElement.getAttribute("data-theme");
    expect(initialTheme).toBe("liquid-dark");

    fireEvent.click(screen.getByTestId("theme-randomize-btn"));

    const nextTheme = document.documentElement.getAttribute("data-theme");
    expect(nextTheme).not.toBe(initialTheme);
    expect(isValidThemeId(nextTheme)).toBe(true);
    expect(localStorage.getItem("portfolio_theme")).toBe(nextTheme);
  });

  it("previews a theme on card hover without overwriting persisted theme, and reverts on mouse leave", () => {
    renderStudioApp();
    fireEvent.click(screen.getByTestId("dock-theme-studio-btn"));

    const neobrutalCard = screen.getByTestId("theme-card-neobrutal");
    fireEvent.mouseEnter(neobrutalCard);

    expect(document.documentElement.getAttribute("data-theme")).toBe("neobrutal");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("portfolio_theme")).toBe("liquid-dark");

    fireEvent.mouseLeave(neobrutalCard);

    expect(document.documentElement.getAttribute("data-theme")).toBe("liquid-dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("supports FloatingNav quick light/dark toggle and sound mute button", () => {
    renderStudioApp();

    const quickToggle = screen.getByRole("button", { name: "Toggle Light Dark Theme" });
    fireEvent.click(quickToggle);
    expect(document.documentElement.getAttribute("data-theme")).toBe("liquid-light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    const soundBtn = screen.getByRole("button", { name: "Toggle Sound" });
    expect(sound.muted).toBe(false);
    fireEvent.click(soundBtn);
    expect(sound.muted).toBe(true);
    expect(localStorage.getItem("sound_muted")).toBe("true");
  });
});

describe("5. SoundEngine Robustness", () => {
  it("notifies subscribers, supports unsubscribe, and persists sound_muted on toggleMute()", () => {
    const listenerA = vi.fn();
    const listenerB = vi.fn();

    const unsubA = sound.subscribe(listenerA);
    const unsubB = sound.subscribe(listenerB);

    expect(sound.muted).toBe(false);

    const mutedResult = sound.toggleMute();
    expect(mutedResult).toBe(true);
    expect(sound.muted).toBe(true);
    expect(localStorage.getItem("sound_muted")).toBe("true");
    expect(listenerA).toHaveBeenCalledTimes(1);
    expect(listenerA).toHaveBeenLastCalledWith(true);
    expect(listenerB).toHaveBeenCalledTimes(1);
    expect(listenerB).toHaveBeenLastCalledWith(true);

    unsubA();

    const unmutedResult = sound.toggleMute();
    expect(unmutedResult).toBe(false);
    expect(sound.muted).toBe(false);
    expect(localStorage.getItem("sound_muted")).toBe("false");
    expect(listenerA).toHaveBeenCalledTimes(1);
    expect(listenerB).toHaveBeenCalledTimes(2);
    expect(listenerB).toHaveBeenLastCalledWith(false);

    unsubB();
  });

  it("safely runs playTap, playPop, playSwitch, and playThemeChange across all profiles in jsdom without AudioContext", () => {
    expect(window.AudioContext).toBeUndefined();

    // Advance performance.now across calls so throttling does not skip execution paths
    let fakeNow = 1000;
    vi.spyOn(performance, "now").mockImplementation(() => {
      fakeNow += 200;
      return fakeNow;
    });

    for (const profile of ALL_SOUND_PROFILES) {
      sound.setProfile(profile);
      expect(sound.profile).toBe(profile);

      expect(() => sound.playTap()).not.toThrow();
      expect(() => sound.playPop()).not.toThrow();
      expect(() => sound.playSwitch(true)).not.toThrow();
      expect(() => sound.playSwitch(false)).not.toThrow();
      expect(() => sound.playThemeChange()).not.toThrow();
      expect(() => sound.playThemeChange(profile)).not.toThrow();
    }

    // Also confirm safe no-op behavior while muted
    sound.toggleMute();
    for (const profile of ALL_SOUND_PROFILES) {
      sound.setProfile(profile);
      expect(() => sound.playTap()).not.toThrow();
      expect(() => sound.playPop()).not.toThrow();
      expect(() => sound.playSwitch(true)).not.toThrow();
      expect(() => sound.playThemeChange(profile)).not.toThrow();
    }
  });

  it("synthesizes tones across every profile with a mocked AudioContext and survives AudioContext errors", async () => {
    const createOscillator = vi.fn(() => ({
      type: "sine" as OscillatorType,
      frequency: {
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
    }));

    const createGain = vi.fn(() => ({
      gain: {
        setValueAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
      connect: vi.fn(),
    }));

    const resume = vi.fn().mockResolvedValue(undefined);

    class MockAudioContext {
      state = "suspended";
      currentTime = 0;
      destination = {};
      resume = resume;
      createOscillator = createOscillator;
      createGain = createGain;
    }

    const originalAudioContext = window.AudioContext;
    Object.defineProperty(window, "AudioContext", {
      configurable: true,
      writable: true,
      value: MockAudioContext,
    });

    let fakeNow = 2000;
    vi.spyOn(performance, "now").mockImplementation(() => {
      fakeNow += 200;
      return fakeNow;
    });

    try {
      vi.resetModules();
      const { sound: isolatedSound } = await import("@/lib/audio");

      for (const profile of ALL_SOUND_PROFILES) {
        isolatedSound.setProfile(profile);
        expect(() => isolatedSound.playTap()).not.toThrow();
        expect(() => isolatedSound.playPop()).not.toThrow();
        expect(() => isolatedSound.playSwitch(true)).not.toThrow();
        expect(() => isolatedSound.playSwitch(false)).not.toThrow();
        expect(() => isolatedSound.playThemeChange(profile)).not.toThrow();
      }

      expect(resume).toHaveBeenCalled();
      expect(createOscillator).toHaveBeenCalled();
      expect(createGain).toHaveBeenCalled();

      // Verify resilience if AudioContext constructor throws
      Object.defineProperty(window, "AudioContext", {
        configurable: true,
        writable: true,
        value: class ThrowingAudioContext {
          constructor() {
            throw new Error("AudioContext blocked");
          }
        },
      });

      vi.resetModules();
      const { sound: throwingSound } = await import("@/lib/audio");
      expect(() => throwingSound.playTap()).not.toThrow();
      expect(() => throwingSound.playPop()).not.toThrow();
      expect(() => throwingSound.playSwitch(true)).not.toThrow();
      expect(() => throwingSound.playThemeChange("cyber")).not.toThrow();
    } finally {
      Object.defineProperty(window, "AudioContext", {
        configurable: true,
        writable: true,
        value: originalAudioContext,
      });
      vi.resetModules();
    }
  });
});
