import React, { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import {
  Award,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { certifications } from "@/data/portfolio";
import { sound } from "@/lib/audio";
import { toast } from "sonner";

export const Certifications: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyId = (id: string) => {
    sound.playPop();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    toast.success("Credential ID copied!", { description: id });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <PageTransition>
      <div className="container max-w-5xl mx-auto px-5 sm:px-6 pt-24 sm:pt-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 sm:mb-12"
        >
          <div className="theme-badge-accent inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium mb-3">
            <Award size={13} />
            <span>Verified Credentials</span>
          </div>
          <h1 className="theme-hero-title text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Certifications & Training
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl text-sm sm:text-base leading-relaxed">
            Accredited courseworks in cloud architectures, relational database programming, and modern software development.
          </p>
        </motion.div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="theme-card-hover p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Top ambient theme-adaptive gradient */}
              <div
                className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-2xl pointer-events-none opacity-45 group-hover:opacity-75 transition-opacity"
                style={{ background: "var(--theme-accent-soft)" }}
                aria-hidden="true"
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="theme-chip w-12 h-12 flex items-center justify-center shadow-sm flex-shrink-0">
                    <Award size={22} className="theme-accent-text" />
                  </div>

                  <span className="theme-status-pill inline-flex items-center gap-1 px-3 py-1 text-[11px] font-mono font-medium">
                    <ShieldCheck size={12} />
                    {cert.badge}
                  </span>
                </div>

                <h3 className="font-bold text-lg sm:text-xl text-foreground group-hover:text-[var(--theme-accent)] transition-colors leading-snug">
                  {cert.title}
                </h3>

                <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground/80">
                    {cert.issuer}
                  </span>
                  <span>·</span>
                  <span className="font-mono">{cert.date}</span>
                </div>

                {/* Skill Badges */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="theme-chip text-[11px] font-mono px-2.5 py-1 text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Verification Footer */}
              <div className="relative z-10 pt-5 mt-6 border-t border-border/40 flex items-center justify-between text-xs">
                <div className="font-mono text-[11px] text-muted-foreground">
                  ID: {cert.credentialId}
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyId(cert.credentialId)}
                  className="theme-btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-muted-foreground hover:text-foreground text-[11px] font-medium"
                >
                  {copiedId === cert.credentialId ? (
                    <>
                      <Check size={12} style={{ color: "var(--theme-status)" }} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy ID</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education & Continuous Learning Bento Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="theme-card p-6 sm:p-8 mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="theme-chip-hot w-12 h-12 flex items-center justify-center flex-shrink-0">
              <BookOpen size={24} />
            </div>
            <div>
              <h4 className="font-bold text-foreground text-base">
                Informatics Engineering Degree
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Strong theoretical foundation in Data Structures, Relational Database Theory, Software Architecture, and Distributed Systems.
              </p>
            </div>
          </div>

          <span className="theme-chip px-3.5 py-1.5 text-xs font-mono text-muted-foreground whitespace-nowrap self-start sm:self-center">
            Completed Degree
          </span>
        </motion.div>
      </div>

      <Footer />
    </PageTransition>
  );
};

export default Certifications;
