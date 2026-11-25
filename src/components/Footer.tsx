import { Github, Linkedin, Mail, Palette, Sparkles } from "lucide-react";
import { socials, personalInfo } from "@/data/portfolio";
import { sound } from "@/lib/audio";
import { useTheme } from "@/hooks/useTheme";

const iconMap = { github: Github, linkedin: Linkedin, email: Mail } as const;

export const Footer = () => {
  const { activeTheme, openStudio } = useTheme();

  return (
    <footer className="relative mt-24 mb-32 border-t border-border/50 overflow-hidden">
      {/* Theme-adaptive top specular glow line */}
      <div
        className="absolute top-0 inset-x-0 h-[1px] opacity-70"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--theme-accent), transparent)",
        }}
      />

      <div className="container max-w-5xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-1.5 text-center sm:text-left">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="font-semibold text-foreground text-sm tracking-tight">
              {personalInfo.fullName}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 theme-badge-accent text-[10px] font-mono">
              <Sparkles size={10} /> v3.0
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Built with precision, React, Tailwind CSS &amp; {activeTheme.footerCraft}.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-center">
          <button
            type="button"
            onClick={openStudio}
            className="inline-flex items-center gap-2 px-3 py-2 theme-surface text-xs font-mono text-foreground hover:border-[var(--theme-accent-border)] transition-all"
            style={{ borderRadius: "var(--theme-radius-md)" }}
            title="Open Theme Studio (Press T)"
          >
            <Palette size={13} className="theme-accent-text" />
            <span>{activeTheme.shortName}</span>
            <span className="flex items-center gap-0.5">
              <span
                className="w-2 h-2 inline-block"
                style={{
                  backgroundColor: activeTheme.swatches[2],
                  borderRadius: activeTheme.id === "pixel" ? "0px" : "999px",
                }}
              />
              <span
                className="w-2 h-2 inline-block"
                style={{
                  backgroundColor: activeTheme.swatches[3],
                  borderRadius: activeTheme.id === "pixel" ? "0px" : "999px",
                }}
              />
            </span>
          </button>

          {socials
            .filter(({ type }) => type in iconMap)
            .map(({ label, href, type }) => {
              const Icon = iconMap[type as keyof typeof iconMap];
              return (
                <a
                  key={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={href}
                  aria-label={label}
                  onClick={() => sound.playPop()}
                  className="w-10 h-10 theme-surface flex items-center justify-center text-muted-foreground hover:text-foreground hover:scale-105 active:scale-95 transition-all"
                  style={{ borderRadius: "var(--theme-radius-md)" }}
                >
                  <Icon size={16} />
                </a>
              );
            })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
