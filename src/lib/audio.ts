// High-Performance Theme-Aware Web Audio API Synthesizer
// Zero external audio assets, 0 latency, rate-limited, tailored sonic profiles per theme

import type { SoundProfile } from "@/config/themes";

type MuteListener = (muted: boolean) => void;

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private currentProfile: SoundProfile = "liquid";
  private lastPlayTime: number = 0;
  private minIntervalMs: number = 75;
  private listeners: Set<MuteListener> = new Set();

  constructor() {
    if (typeof window !== "undefined") {
      this.isMuted = localStorage.getItem("sound_muted") === "true";
    }
  }

  private initContext(): boolean {
    if (typeof window === "undefined") return false;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return !!this.ctx;
  }

  public get muted(): boolean {
    return this.isMuted;
  }

  public get profile(): SoundProfile {
    return this.currentProfile;
  }

  public setProfile(profile: SoundProfile) {
    this.currentProfile = profile;
  }

  public subscribe(listener: MuteListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((fn) => fn(this.isMuted));
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== "undefined") {
      localStorage.setItem("sound_muted", String(this.isMuted));
    }
    this.notifyListeners();
    if (!this.isMuted) {
      this.playTap();
    }
    return this.isMuted;
  }

  private shouldThrottle(): boolean {
    const now = performance.now();
    if (now - this.lastPlayTime < this.minIntervalMs) {
      return true;
    }
    this.lastPlayTime = now;
    return false;
  }

  private playTone(
    type: OscillatorType,
    startFreq: number,
    endFreq: number,
    duration: number,
    volume: number,
    delay = 0
  ) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(Math.max(20, startFreq), now);
    if (endFreq !== startFreq) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), now + duration);
    }

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(volume, now + Math.min(0.006, duration * 0.2));
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.01);
  }

  // Soft tactile tap adapted to the active theme's sonic character
  public playTap() {
    if (this.isMuted || this.shouldThrottle()) return;
    try {
      if (!this.initContext()) return;
      switch (this.currentProfile) {
        case "chiptune":
          this.playTone("square", 660, 880, 0.045, 0.03);
          break;
        case "cyber":
          this.playTone("sawtooth", 1200, 420, 0.04, 0.025);
          break;
        case "mechanical":
          this.playTone("triangle", 1400, 260, 0.022, 0.05);
          break;
        case "terminal":
          this.playTone("square", 980, 980, 0.025, 0.022);
          break;
        case "brutal":
          this.playTone("triangle", 320, 140, 0.045, 0.075);
          break;
        case "vapor":
          this.playTone("triangle", 523.25, 659.25, 0.07, 0.045);
          break;
        case "liquid":
        default:
          this.playTone("sine", 600, 300, 0.035, 0.06);
          break;
      }
    } catch {
      // Fallback gracefully
    }
  }

  // Positive selection / pop sound
  public playPop() {
    if (this.isMuted || this.shouldThrottle()) return;
    try {
      if (!this.initContext()) return;
      switch (this.currentProfile) {
        case "chiptune":
          this.playTone("square", 523.25, 523.25, 0.04, 0.028, 0);
          this.playTone("square", 783.99, 783.99, 0.055, 0.028, 0.04);
          break;
        case "cyber":
          this.playTone("sawtooth", 440, 1320, 0.065, 0.025, 0);
          this.playTone("sine", 1320, 880, 0.05, 0.03, 0.045);
          break;
        case "mechanical":
          this.playTone("triangle", 1800, 340, 0.02, 0.055, 0);
          this.playTone("sine", 700, 220, 0.02, 0.04, 0.025);
          break;
        case "terminal":
          this.playTone("square", 1100, 1100, 0.025, 0.022, 0);
          this.playTone("square", 1480, 1480, 0.03, 0.022, 0.032);
          break;
        case "brutal":
          this.playTone("triangle", 220, 440, 0.055, 0.07, 0);
          break;
        case "vapor":
          this.playTone("triangle", 440, 659.25, 0.09, 0.04, 0);
          this.playTone("sine", 659.25, 880, 0.11, 0.035, 0.03);
          break;
        case "liquid":
        default:
          this.playTone("sine", 450, 950, 0.05, 0.05);
          break;
      }
    } catch {
      // Fallback gracefully
    }
  }

  // Switch toggle sound
  public playSwitch(toState: boolean) {
    if (this.isMuted) return;
    try {
      if (!this.initContext()) return;
      const up = toState;
      switch (this.currentProfile) {
        case "chiptune":
          this.playTone("square", up ? 440 : 660, up ? 880 : 330, 0.055, 0.028);
          break;
        case "cyber":
          this.playTone("sawtooth", up ? 380 : 960, up ? 1120 : 320, 0.06, 0.025);
          break;
        case "mechanical":
          this.playTone("triangle", up ? 1200 : 850, up ? 400 : 220, 0.026, 0.055);
          break;
        case "terminal":
          this.playTone("square", up ? 760 : 1200, up ? 1200 : 760, 0.035, 0.022);
          break;
        case "brutal":
          this.playTone("triangle", up ? 240 : 380, up ? 420 : 170, 0.05, 0.075);
          break;
        case "vapor":
          this.playTone("triangle", up ? 392 : 587.33, up ? 587.33 : 392, 0.09, 0.045);
          break;
        case "liquid":
        default:
          this.playTone("sine", up ? 500 : 700, up ? 850 : 400, 0.045, 0.05);
          break;
      }
    } catch {
      // Fallback gracefully
    }
  }

  // Signature sonic jingle when switching into a theme
  public playThemeChange(profileOverride?: SoundProfile) {
    if (this.isMuted) return;
    const target = profileOverride ?? this.currentProfile;
    try {
      if (!this.initContext()) return;
      switch (target) {
        case "chiptune":
          // Classic 8-bit power-up arpeggio (C5 - E5 - G5 - C6)
          this.playTone("square", 523.25, 523.25, 0.055, 0.03, 0);
          this.playTone("square", 659.25, 659.25, 0.055, 0.03, 0.055);
          this.playTone("square", 783.99, 783.99, 0.055, 0.03, 0.11);
          this.playTone("square", 1046.5, 1046.5, 0.11, 0.032, 0.165);
          break;
        case "cyber":
          // Cybernetic HUD power-up sweep + lock harmonic
          this.playTone("sawtooth", 180, 960, 0.14, 0.026, 0);
          this.playTone("sine", 960, 1440, 0.09, 0.032, 0.1);
          break;
        case "mechanical":
          // Precision twin camera shutter release
          this.playTone("triangle", 1900, 320, 0.024, 0.06, 0);
          this.playTone("triangle", 1300, 200, 0.03, 0.05, 0.048);
          break;
        case "terminal":
          // Retro BIOS / CRT boot chirp
          this.playTone("square", 880, 880, 0.045, 0.025, 0);
          this.playTone("square", 1320, 1320, 0.075, 0.025, 0.065);
          break;
        case "brutal":
          // Bold tactile double-thock pop
          this.playTone("triangle", 200, 95, 0.05, 0.08, 0);
          this.playTone("triangle", 360, 540, 0.065, 0.07, 0.05);
          break;
        case "vapor":
          // Dreamy Outrun Major 7th synth shimmer
          this.playTone("triangle", 392.0, 392.0, 0.22, 0.04, 0);
          this.playTone("triangle", 493.88, 493.88, 0.22, 0.035, 0.045);
          this.playTone("sine", 587.33, 587.33, 0.24, 0.035, 0.09);
          this.playTone("sine", 739.99, 745.0, 0.26, 0.03, 0.135);
          break;
        case "liquid":
        default:
          // Silky glass harmonic chime
          this.playTone("sine", 523.25, 659.25, 0.1, 0.045, 0);
          this.playTone("sine", 783.99, 1046.5, 0.14, 0.04, 0.055);
          break;
      }
    } catch {
      // Fallback gracefully
    }
  }
}

export const sound = new SoundEngine();
