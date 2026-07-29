import { Github, Linkedin, Mail } from "lucide-react";
import { socials, personalInfo } from "@/data/portfolio";

const iconMap = { github: Github, linkedin: Linkedin, email: Mail } as const;

const Footer = () => (
  <footer className="border-t border-border mt-24 mb-24">
    <div className="container max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        © 2026 {personalInfo.fullName}. All rights reserved.
      </p>
      <div className="flex items-center gap-3">
        {socials
          .filter(({ type }) => type in iconMap)
          .map(({ label, href, type }) => {
            const Icon = iconMap[type as keyof typeof iconMap];
            return (
              <a target="_blank" key={label} href={href} aria-label={label} className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200">
                <Icon size={18} />
              </a>
            );
          })}
      </div>
    </div>
  </footer>
);

export default Footer;
