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
                className="absolute -inset-3 sm:-inset-4 rounded-full bg-gradient-to-tr from-blue-500/40 via-indigo-500/30 to-purple-500/40 blur-xl opacity-75 dark:opacity-60 animate-pulse-glow"
                aria-hidden="true"
              />

              <div className="relative group">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-[32px] sm:rounded-[38px] overflow-hidden p-1 bg-gradient-to-b from-white/80 via-white/20 to-white/60 dark:from-white/25 dark:via-transparent dark:to-white/10 shadow-2xl backdrop-blur-md">
                  <img
                    src={profileImg}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover rounded-[28px] sm:rounded-[34px] group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Live Status Pill badge */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full ios-glass border border-white/50 dark:border-white/15 shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    Open to Work
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Headline and Intro */}
            <motion.div variants={itemVariants} className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ios-glass border border-white/40 dark:border-white/10 text-xs text-muted-foreground shadow-sm">
                <Sparkles size={13} className="text-amber-500" />
                <span>{personalInfo.title}</span>
                <span>·</span>
                <span className="flex items-center gap-1 text-foreground font-medium">
                  <MapPin size={12} className="text-blue-500" /> {personalInfo.location}
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
                Engineering Scalable Systems With{" "}
                <span className="text-gradient-ios">Precision</span>
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
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-sm shadow-[0_4px_20px_rgba(59,130,246,0.35)] hover:shadow-[0_6px_24px_rgba(59,130,246,0.5)] hover:scale-[1.02] active:scale-95 transition-all"
              >
                <Briefcase size={16} />
                <span>Explore Projects</span>
                <ArrowRight size={15} />
              </Link>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full ios-glass border border-white/50 dark:border-white/15 text-foreground font-medium text-sm hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all shadow-sm"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-emerald-500" />
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
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full ios-glass border border-white/50 dark:border-white/15 text-foreground font-medium text-sm hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all shadow-sm"
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
                className="ios-glass-card p-4 sm:p-5 rounded-3xl flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-muted-foreground text-xs mb-3">
                  <span className="font-mono uppercase tracking-wider text-[10px]">
                    {stat.label}
                  </span>
                  {i === 0 && <Layers size={14} className="text-blue-500" />}
                  {i === 1 && <Database size={14} className="text-indigo-500" />}
                  {i === 2 && <Code2 size={14} className="text-purple-500" />}
                  {i === 3 && <Sparkles size={14} className="text-emerald-500" />}
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium mb-2">
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
                  className="ios-glass-card-hover p-4 sm:p-5 flex flex-col gap-3.5 h-full rounded-3xl group cursor-pointer"
                >
                  {project.image && (
                    <div className="relative rounded-2xl overflow-hidden border border-border/50 aspect-video bg-black/5 dark:bg-black/30">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {project.badge && (
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full ios-glass border border-white/40 dark:border-white/10 text-[10px] font-mono font-medium text-foreground shadow-sm">
                          {project.badge}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex-1 flex flex-col">
                    <h3 className="font-semibold text-foreground text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight
                        size={15}
                        className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-blue-500"
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
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full text-muted-foreground/60">
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-medium mb-2">
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
                className="ios-glass-card p-5 sm:p-6 rounded-3xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={exp.image}
                      alt={exp.company}
                      className="w-12 h-12 rounded-2xl object-cover ring-1 ring-border shadow-sm flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-semibold text-base text-foreground flex items-center gap-2">
                        {exp.role}
                        {exp.featured && (
                          <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-mono">
                            Current
                          </span>
                        )}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-muted-foreground self-start sm:self-center">
                    {exp.time}
                  </span>
                </div>

                {exp.description && exp.description.length > 0 && (
                  <ul className="mt-3.5 pt-3.5 border-t border-border/40 space-y-1.5 text-xs sm:text-sm text-muted-foreground">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/80 mt-1.5 flex-shrink-0" />
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium mb-2">
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
                className="ios-glass-card p-5 rounded-3xl flex flex-col gap-3"
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
                      className={`text-xs font-mono px-3 py-1.5 rounded-2xl cursor-default transition-all shadow-sm ${
                        skill.hot
                          ? "ios-glass bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/25"
                          : "bg-black/5 dark:bg-white/10 text-foreground border border-border/60 hover:bg-black/10 dark:hover:bg-white/15"
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
            className="ios-glass-card p-8 sm:p-14 text-center rounded-[36px] relative overflow-hidden"
          >
            {/* Ambient liquid glow in CTA */}
            <div
              className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blue-500/25 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-purple-500/25 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 space-y-4 max-w-lg mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium">
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
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-sm shadow-[0_4px_20px_rgba(59,130,246,0.35)] hover:scale-105 active:scale-95 transition-all"
                >
                  <Mail size={16} />
                  <span>Start a Conversation</span>
                  <ArrowRight size={15} />
                </Link>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full ios-glass border border-white/50 dark:border-white/15 text-foreground font-medium text-sm hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all shadow-sm"
                >
                  {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
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
