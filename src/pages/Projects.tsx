import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import {
  projects,
  projectCategories,
  type ProjectCategory,
} from "@/data/portfolio";
import { sound } from "@/lib/audio";
import {
  Search,
  X,
  Layers,
  ArrowUpRight,
  ExternalLink,
  Github,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.tech.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const countByCategory = (cat: ProjectCategory) => {
    return cat === "All"
      ? projects.length
      : projects.filter((p) => p.category === cat).length;
  };

  return (
    <PageTransition>
      <div className="container max-w-5xl mx-auto px-5 sm:px-6 pt-24 sm:pt-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 sm:mb-12"
        >
          <div className="theme-badge-accent inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium mb-3">
            <Layers size={13} />
            <span>Systems & Creative Works</span>
          </div>
          <h1 className="theme-hero-title text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Featured Projects
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl text-sm sm:text-base leading-relaxed">
            Enterprise management solutions, automated inventory systems, and award-winning design case studies.
          </p>
        </motion.div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 sm:mb-10">
          {/* Segmented Control Tabs */}
          <div
            className="flex items-center p-1 theme-surface shadow-sm self-start overflow-x-auto max-w-full"
            style={{ borderRadius: "var(--theme-radius-md)" }}
          >
            {projectCategories.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    sound.playTap();
                    setActiveCategory(category);
                  }}
                  style={
                    isSelected
                      ? { color: "var(--theme-accent-fg)" }
                      : undefined
                  }
                  className={`relative px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    isSelected
                      ? "font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="project-category-pill"
                      className="absolute inset-0 shadow-sm"
                      style={{
                        background: "var(--theme-btn-gradient)",
                        borderRadius: "var(--theme-radius-md)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {category}
                    <span
                      style={
                        isSelected
                          ? {
                              backgroundColor:
                                "color-mix(in srgb, var(--theme-accent-fg) 16%, transparent)",
                              color: "var(--theme-accent-fg)",
                              borderColor: "currentColor",
                              borderRadius: "var(--theme-radius-pill)",
                            }
                          : { borderRadius: "var(--theme-radius-pill)" }
                      }
                      className={`text-[10px] font-mono px-1.5 py-0.5 ${
                        isSelected
                          ? "border"
                          : "theme-chip text-muted-foreground"
                      }`}
                    >
                      {countByCategory(category)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-72">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack, ERP, keywords..."
              className="theme-input w-full pl-9 pr-9 py-2.5 text-xs sm:text-sm placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded-full"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  <Link
                    to={`/projects/${project.slug}`}
                    onClick={() => sound.playPop()}
                    className="theme-card-hover p-5 sm:p-6 flex flex-col gap-4 h-full group cursor-pointer"
                  >
                    {/* Project Thumbnail Image */}
                    {project.image && (
                      <div
                        className="theme-media-frame relative overflow-hidden border border-border/50 aspect-video bg-black/5 dark:bg-black/40"
                        style={{ borderRadius: "var(--theme-radius-md)" }}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="theme-media-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        {project.badge && (
                          <span
                            className="absolute top-3 left-3 px-2.5 py-1 theme-surface text-[11px] font-mono font-medium text-foreground shadow-sm"
                            style={{ borderRadius: "var(--theme-radius-pill)" }}
                          >
                            {project.badge}
                          </span>
                        )}

                        <span
                          className="absolute bottom-3 right-3 px-3 py-1 theme-surface-strong text-foreground text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                          style={{ borderRadius: "var(--theme-radius-pill)" }}
                        >
                          View Details <ArrowUpRight size={12} />
                        </span>
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-[var(--theme-accent)] transition-colors">
                            {project.title}
                          </h3>
                          <ArrowUpRight
                            size={18}
                            className="text-muted-foreground group-hover:text-[var(--theme-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0"
                          />
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1 line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-4 mt-2 border-t border-border/40">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="theme-chip text-[11px] font-mono px-2.5 py-1 text-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="theme-card p-12 text-center max-w-md mx-auto my-12"
            >
              <SlidersHorizontal
                size={36}
                className="text-muted-foreground mx-auto mb-3 opacity-60"
              />
              <h3 className="text-base font-semibold text-foreground">
                No matching projects found
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Try searching for other keywords like "Laravel", "React", or reset your category filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  sound.playTap();
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="theme-btn-primary mt-4 px-5 py-2.5 text-xs"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </PageTransition>
  );
};

export default Projects;
