// High-Performance iOS-inspired Web Audio API sound engine
// Ultra-lightweight, 0 latency, rate-limited to eliminate stuttering

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private lastPlayTime: number = 0;
  private minIntervalMs: number = 90; // Rate limit to prevent sound spam and audio crackle

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
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== "undefined") {
      localStorage.setItem("sound_muted", String(this.isMuted));
    }
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

  // Soft tactile iOS tap
  public playTap() {
    if (this.isMuted || this.shouldThrottle()) return;
    try {
      if (!this.initContext() || !this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.035);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {
      // Fallback gracefully
    }
  }

  // Soft liquid bubble pop
  public playPop() {
    if (this.isMuted || this.shouldThrottle()) return;
    try {
      if (!this.initContext() || !this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(950, now + 0.05);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Fallback gracefully
    }
  }

  // Switch toggle click
  public playSwitch(toState: boolean) {
    if (this.isMuted) return;
    try {
      if (!this.initContext() || !this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      const startFreq = toState ? 500 : 700;
      const endFreq = toState ? 850 : 400;

      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.045);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Fallback gracefully
    }
  }
}

export const sound = new SoundEngine();
