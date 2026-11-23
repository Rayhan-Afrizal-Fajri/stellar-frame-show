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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium mb-3">
            <Layers size={13} />
            <span>Systems & Creative Works</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Featured Projects
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl text-sm sm:text-base leading-relaxed">
            Enterprise management solutions, automated inventory systems, and award-winning design case studies.
          </p>
        </motion.div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 sm:mb-10">
          {/* iOS Segmented Control Tabs */}
          <div className="flex items-center p-1 rounded-2xl ios-glass border border-white/50 dark:border-white/10 shadow-sm self-start overflow-x-auto max-w-full">
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
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    isSelected
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="project-category-pill"
                      className="absolute inset-0 rounded-xl bg-white dark:bg-zinc-800 shadow-sm border border-border/50"
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
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isSelected
                          ? "bg-blue-500 text-white"
                          : "bg-black/5 dark:bg-white/10 text-muted-foreground"
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
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack, ERP, keywords..."
              className="w-full pl-9 pr-9 py-2.5 rounded-2xl ios-glass text-xs sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/40 border border-white/40 dark:border-white/10 text-foreground"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
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
                    className="ios-glass-card-hover p-5 sm:p-6 flex flex-col gap-4 h-full rounded-[28px] group cursor-pointer"
                  >
                    {/* Project Thumbnail Image */}
                    {project.image && (
                      <div className="relative rounded-2xl overflow-hidden border border-border/50 aspect-video bg-black/5 dark:bg-black/40">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        {project.badge && (
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full ios-glass text-[11px] font-mono font-medium text-foreground border border-white/40 dark:border-white/10 shadow-sm">
                            {project.badge}
                          </span>
                        )}

                        <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          View Details <ArrowUpRight size={12} />
                        </span>
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {project.title}
                          </h3>
                          <ArrowUpRight
                            size={18}
                            className="text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0"
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
                            className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 text-foreground border border-border/40"
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
              className="ios-glass-card p-12 text-center rounded-3xl max-w-md mx-auto my-12"
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
                className="mt-4 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-medium hover:opacity-90"
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
