import { Github, Linkedin, Mail, Heart, Sparkles } from "lucide-react";
import { socials, personalInfo } from "@/data/portfolio";
import { sound } from "@/lib/audio";

const iconMap = { github: Github, linkedin: Linkedin, email: Mail } as const;

export const Footer = () => (
  <footer className="relative mt-24 mb-32 border-t border-border/40 overflow-hidden">
    {/* Subtle specular glow line */}
    <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

    <div className="container max-w-5xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex flex-col items-center sm:items-start gap-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground text-sm tracking-tight">
            {personalInfo.fullName}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-mono">
            <Sparkles size={10} /> v2.0
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Built with precision, React, Tailwind CSS & iOS Liquid Glass aesthetics.
        </p>
      </div>

      <div className="flex items-center gap-2">
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
                className="w-10 h-10 rounded-2xl ios-glass flex items-center justify-center text-muted-foreground hover:text-foreground hover:scale-105 active:scale-95 transition-all shadow-sm"
              >
                <Icon size={16} />
              </a>
            );
          })}
      </div>
    </div>
  </footer>
);

export default Footer;
