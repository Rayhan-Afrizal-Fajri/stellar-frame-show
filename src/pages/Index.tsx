import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Copy,
  Check,
  Sparkles,
  Database,
  Cpu,
  Layers,
  Code2,
  Workflow,
  ExternalLink,
  ChevronRight,
  Palette,
} from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import profileImg from "@/assets/profile.png";
import {
  personalInfo,
  experiences,
  groupedTechStack,
  projects,
  ctaSection,
} from "@/data/portfolio";
import { sound } from "@/lib/audio";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

export const Index: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTechCategory, setActiveTechCategory] = useState<string>("All");
  const { activeTheme, openStudio } = useTheme();

  const handleCopyEmail = () => {
    sound.playPop();
    const cleanEmail = personalInfo.email.replace("mailto:", "");
    navigator.clipboard.writeText(cleanEmail);
    setCopied(true);
    toast.success("Email copied to clipboard!", {
      description: cleanEmail,
    });
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <PageTransition>
      <div className="relative pt-24 sm:pt-32">
        {/* ======================================================== */}
        {/* 1. HERO SECTION                                          */}
        {/* ======================================================== */}
        <section className="container max-w-4xl mx-auto px-5 sm:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center text-center gap-7 sm:gap-9"
          >
            {/* Profile Avatar with Liquid Ambient Ring */}
            <motion.div variants={itemVariants} className="relative">
              {/* Outer Liquid Breathing Halo */}
              <div
                className="absolute -inset-3 sm:-inset-4 rounded-full blur-xl opacity-35 dark:opacity-30 animate-pulse-glow"
                style={{
                  background:
                    "linear-gradient(135deg, var(--theme-accent), var(--theme-accent-2))",
                }}
                aria-hidden="true"
              />

              <div className="relative group">
                <div
                  className="w-32 h-32 sm:w-40 sm:h-40 theme-avatar-frame overflow-hidden p-1 shadow-2xl backdrop-blur-md"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--theme-accent), var(--theme-accent-2))",
                  }}
                >
                  <img
                    src={profileImg}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover theme-avatar-frame theme-media-img group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Live Status Pill badge */}
                <div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 theme-surface-strong flex items-center gap-1.5 whitespace-nowrap shadow-lg"
                  style={{
                    borderRadius: "var(--theme-radius-pill)",
                    borderColor: "color-mix(in srgb, var(--theme-status) 55%, var(--ios-glass-border))",
                  }}
                >
                  <span className="flex h-2 w-2 relative">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ backgroundColor: "var(--theme-status)" }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2 w-2"
                      style={{ backgroundColor: "var(--theme-status)" }}
                    />
                  </span>
                  <span className="text-[11px] font-medium">
                    Open to Work
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Headline and Intro */}
            <motion.div variants={itemVariants} className="space-y-4 max-w-2xl">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <div
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 theme-surface text-xs text-muted-foreground shadow-sm"
                  style={{ borderRadius: "var(--theme-radius-pill)" }}
                >
                  <Sparkles size={13} className="theme-accent-2-text" />
                  <span>{personalInfo.title}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-foreground font-medium">
                    <MapPin size={12} className="theme-accent-text" /> {personalInfo.location}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    sound.playTap();
                    openStudio();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 theme-badge-accent text-xs font-medium hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                  title="Switch visual theme (Press T)"
                >
                  <Palette size={12} />
                  <span>Theme: {activeTheme.shortName}</span>
                </button>
              </div>

              <h1 className="theme-hero-title text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
                Engineering Scalable Systems With{" "}
                <span className="theme-text-gradient">Precision</span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Full-stack developer architecting enterprise ERP systems, complex business logic,
                and high-throughput database workflows.
              </p>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-3 pt-1"
            >
              <Link
                to="/projects"
                onClick={() => sound.playPop()}
                className="theme-btn-primary inline-flex items-center gap-2.5 px-6 py-3.5 text-sm"
              >
                <Briefcase size={16} />
                <span>Explore Projects</span>
                <ArrowRight size={15} />
              </Link>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="theme-btn-secondary inline-flex items-center gap-2 px-5 py-3.5 font-medium text-sm"
              >
                {copied ? (
                  <>
                    <Check size={16} style={{ color: "var(--theme-status)" }} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <Link
                to="/contact"
                onClick={() => sound.playTap()}
                className="theme-btn-secondary inline-flex items-center gap-2 px-5 py-3.5 font-medium text-sm"
              >
                <Mail size={16} />
                <span>Contact</span>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* ======================================================== */}
        {/* 2. BENTO STATS & ARCHITECTURE HIGHLIGHTS WIDGETS        */}
        {/* ======================================================== */}
        <section className="container max-w-4xl mx-auto px-5 sm:px-6 mt-16 sm:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
          >
            {personalInfo.stats.map((stat, i) => (
              <div
                key={stat.label}
                className="theme-card p-4 sm:p-5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-muted-foreground text-xs mb-3">
                  <span className="font-mono uppercase tracking-wider text-[10px]">
                    {stat.label}
                  </span>
                  {i === 0 && <Layers size={14} className="theme-accent-text" />}
                  {i === 1 && <Database size={14} className="theme-accent-2-text" />}
                  {i === 2 && <Code2 size={14} className="theme-accent-text" />}
                  {i === 3 && <Sparkles size={14} style={{ color: "var(--theme-status)" }} />}
                </div>
                <div>
                  <div className="theme-stat-value text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {stat.sub}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ======================================================== */}
        {/* 3. RECENT FEATURED PROJECTS (Liquid Glass Cards)         */}
        {/* ======================================================== */}
        <section className="container max-w-4xl mx-auto px-5 sm:px-6 mt-24 sm:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-end justify-between mb-8 sm:mb-10"
          >
            <div>
              <div className="theme-badge-accent inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium mb-2">
                <Workflow size={13} />
                <span>Featured Systems</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Production Case Studies
              </h2>
            </div>

            <Link
              to="/projects"
              onClick={() => sound.playTap()}
              className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>All Projects</span>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  onClick={() => sound.playPop()}
                  className="theme-card-hover p-4 sm:p-5 flex flex-col gap-3.5 h-full group cursor-pointer"
                >
                  {project.image && (
                    <div
                      className="theme-media-frame relative overflow-hidden border border-border/50 aspect-video bg-black/5 dark:bg-black/30"
                      style={{ borderRadius: "var(--theme-radius-md)" }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="theme-media-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {project.badge && (
                        <span
                          className="absolute top-2.5 left-2.5 px-2.5 py-0.5 theme-surface text-[10px] font-mono font-medium text-foreground shadow-sm"
                          style={{ borderRadius: "var(--theme-radius-pill)" }}
                        >
                          {project.badge}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex-1 flex flex-col">
                    <h3 className="font-semibold text-foreground text-base group-hover:text-[var(--theme-accent)] transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight
                        size={15}
                        className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all theme-accent-text"
                      />
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1.5 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="theme-chip text-[10px] font-mono px-2 py-0.5 text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 text-muted-foreground/60">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. WORK EXPERIENCE TIMELINE (iOS System Card Style)       */}
        {/* ======================================================== */}
        <section className="container max-w-4xl mx-auto px-5 sm:px-6 mt-24 sm:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <div className="theme-badge-accent inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium mb-2">
              <Briefcase size={13} />
              <span>Career Trajectory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Work Experience
            </h2>
          </motion.div>

          <div className="flex flex-col gap-4">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="theme-card p-5 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="theme-media-frame w-12 h-12 overflow-hidden ring-1 ring-border shadow-sm flex-shrink-0"
                      style={{ borderRadius: "var(--theme-radius-md)" }}
                    >
                      <img
                        src={exp.image}
                        alt={exp.company}
                        className="theme-media-img w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base text-foreground flex items-center gap-2">
                        {exp.role}
                        {exp.featured && (
                          <span className="theme-badge-accent px-2 py-0.5 text-[10px] font-mono">
                            Current
                          </span>
                        )}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                  </div>

                  <span className="theme-chip text-xs font-mono px-3 py-1 text-muted-foreground self-start sm:self-center">
                    {exp.time}
                  </span>
                </div>

                {exp.description && exp.description.length > 0 && (
                  <ul className="mt-3.5 pt-3.5 border-t border-border/40 space-y-1.5 text-xs sm:text-sm text-muted-foreground">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: "var(--theme-accent)" }}
                        />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 5. TECH STACK & SYSTEM ARCHITECTURE CAPABILITIES        */}
        {/* ======================================================== */}
        <section className="container max-w-4xl mx-auto px-5 sm:px-6 mt-24 sm:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <div className="theme-badge-accent inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium mb-2">
              <Cpu size={13} />
              <span>Technical Arsenal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Skills & Engineering Stack
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {groupedTechStack.map((group) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="theme-card p-5 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-border/40">
                  <h3 className="font-semibold text-sm text-foreground">
                    {group.category}
                  </h3>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {group.skills.length} skills
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {group.skills.map((skill) => (
                    <motion.span
                      key={skill.name}
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => sound.playTap()}
                      className={`text-xs font-mono px-3 py-1.5 cursor-default transition-all shadow-sm ${
                        skill.hot
                          ? "theme-chip-hot"
                          : "theme-chip text-foreground"
                      }`}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 6. CALL TO ACTION (Liquid Frosted Glass Banner)           */}
        {/* ======================================================== */}
        <section className="container max-w-4xl mx-auto px-5 sm:px-6 mt-24 sm:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="theme-card p-8 sm:p-14 text-center relative overflow-hidden"
          >
            {/* Ambient liquid glow in CTA */}
            <div
              className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-20"
              style={{ backgroundColor: "var(--theme-accent)" }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-20"
              style={{ backgroundColor: "var(--theme-accent-2)" }}
              aria-hidden="true"
            />

            <div className="relative z-10 space-y-4 max-w-lg mx-auto">
              <span className="theme-badge-accent inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium">
                <Sparkles size={13} />
                <span>Let's Build</span>
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                {ctaSection.title}
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {ctaSection.description}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <Link
                  to="/contact"
                  onClick={() => sound.playPop()}
                  className="theme-btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm"
                >
                  <Mail size={16} />
                  <span>Start a Conversation</span>
                  <ArrowRight size={15} />
                </Link>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="theme-btn-secondary inline-flex items-center gap-2 px-6 py-3.5 font-medium text-sm"
                >
                  {copied ? (
                    <Check size={16} style={{ color: "var(--theme-status)" }} />
                  ) : (
                    <Copy size={16} />
                  )}
                  <span>{copied ? "Copied!" : "Copy Email"}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Global Footer */}
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
