import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  CheckCircle2,
  Workflow,
  Target,
  Maximize2,
  Share2,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import { projects } from "@/data/portfolio";
import { sound } from "@/lib/audio";
import { toast } from "sonner";

// Detail Image Gallery Slider with Thumbnails and Fullscreen Modal Lightbox
const DetailImageGallery = ({
  images,
  image,
  title,
}: {
  images?: string[];
  image?: string;
  title: string;
}) => {
  const sliderImages = images && images.length > 0 ? images : image ? [image] : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextSlide = useCallback(() => {
    sound.playTap();
    setCurrentIndex((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  }, [sliderImages.length]);

  const prevSlide = useCallback(() => {
    sound.playTap();
    setCurrentIndex((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  }, [sliderImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) {
        if (e.key === "Escape") setIsModalOpen(false);
        if (e.key === "ArrowRight") nextSlide();
        if (e.key === "ArrowLeft") prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, nextSlide, prevSlide]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  if (sliderImages.length === 0) return null;

  return (
    <div className="mb-10 sm:mb-12">
      {/* Main Preview Frame */}
      <div className="theme-card theme-media-frame relative overflow-hidden group bg-black/5 dark:bg-black/30">
        <div
          className="relative w-full aspect-video sm:aspect-[16/10] flex items-center justify-center cursor-zoom-in"
          onClick={() => {
            sound.playPop();
            setIsModalOpen(true);
          }}
        >
          <img
            src={sliderImages[currentIndex]}
            alt={`${title} - view ${currentIndex + 1}`}
            className="theme-media-img w-full h-full object-contain p-2 sm:p-4 transition-transform duration-500 hover:scale-[1.01]"
          />

          {/* Zoom hint overlay */}
          <div
            className="absolute top-4 right-4 px-3 py-1.5 theme-surface text-xs font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 pointer-events-none shadow-md"
            style={{ borderRadius: "var(--theme-radius-pill)" }}
          >
            <Maximize2 size={13} />
            <span>Click to expand</span>
          </div>

          {/* Image index counter */}
          {sliderImages.length > 1 && (
            <div
              className="absolute bottom-4 right-4 px-3 py-1 bg-black/65 backdrop-blur-md text-white font-mono text-xs shadow-md"
              style={{ borderRadius: "var(--theme-radius-pill)" }}
            >
              {currentIndex + 1} / {sliderImages.length}
            </div>
          )}
        </div>

        {/* Prev / Next Arrows */}
        {sliderImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="theme-btn-secondary absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-foreground hover:scale-110 transition-all shadow-md opacity-0 group-hover:opacity-100 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="theme-btn-secondary absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-foreground hover:scale-110 transition-all shadow-md opacity-0 group-hover:opacity-100 z-10"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {sliderImages.length > 1 && (
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-2 scrollbar-none">
          {sliderImages.map((thumb, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                sound.playTap();
                setCurrentIndex(idx);
              }}
              style={{ borderRadius: "var(--theme-radius-md)" }}
              className={`theme-media-frame relative flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 overflow-hidden border-2 transition-all ${
                idx === currentIndex
                  ? "border-[var(--theme-accent)] scale-105 shadow-md ring-2 ring-[var(--theme-accent-soft)]"
                  : "border-border/60 opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={thumb}
                alt={`Thumbnail ${idx + 1}`}
                className="theme-media-img w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            >
              <X size={26} />
            </button>

            {/* Slider arrows in modal */}
            {sliderImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-50"
                >
                  <ChevronLeft size={30} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-50"
                >
                  <ChevronRight size={30} />
                </button>
              </>
            )}

            {/* Fullscreen Active Image */}
            <motion.img
              key={currentIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={sliderImages[currentIndex]}
              alt={`${title} fullscreen`}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl select-none"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Bottom counter */}
            {sliderImages.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 font-mono text-xs bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
                {currentIndex + 1} / {sliderImages.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[currentIndex];

  const prevProject =
    currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  const handleShare = () => {
    sound.playPop();
    if (navigator.share) {
      navigator.share({
        title: project?.title,
        text: project?.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (!project) {
    return (
      <PageTransition>
        <div className="container max-w-3xl mx-auto px-6 pt-32 text-center">
          <h1 className="theme-hero-title text-3xl font-bold text-foreground mb-4">
            System Project Not Found
          </h1>
          <Link
            to="/projects"
            className="theme-btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm"
          >
            <ArrowLeft size={16} /> Back to Projects
          </Link>
        </div>
        <Footer />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container max-w-4xl mx-auto px-5 sm:px-6 pt-24 sm:pt-32">
        {/* Navigation & Share Row */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/projects"
            onClick={() => sound.playTap()}
            className="theme-btn-secondary inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={15} />
            <span>All Projects</span>
          </Link>

          <button
            type="button"
            onClick={handleShare}
            className="theme-btn-secondary inline-flex items-center gap-1.5 px-3.5 py-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <Share2 size={14} />
            <span>Share</span>
          </button>
        </div>

        {/* Project Header Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="theme-badge-accent px-3 py-1 text-xs font-mono font-medium">
              {project.category}
            </span>
            {project.badge && (
              <span className="theme-chip px-3 py-1 text-xs font-mono font-medium text-foreground">
                {project.badge}
              </span>
            )}
          </div>

          <h1 className="theme-hero-title text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground mt-3 max-w-3xl leading-relaxed">
            {project.description}
          </p>

          {/* Quick Action links */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            {project.demo && project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playPop()}
                className="theme-btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm"
              >
                <ExternalLink size={15} />
                <span>Visit Live System</span>
              </a>
            )}

            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playPop()}
                className="theme-btn-secondary inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium"
              >
                <Github size={15} />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </motion.div>

        {/* Image Gallery Showcase */}
        <DetailImageGallery
          images={project.images}
          image={project.image}
          title={project.title}
        />

        {/* Structured Bento Grid of Project Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {/* Card 1: Problem & Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="theme-card p-6"
          >
            <div className="flex items-center gap-2 theme-accent-text mb-3">
              <Workflow size={18} />
              <h2 className="text-base font-bold text-foreground">
                Overview & Problem Context
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {project.introduction}
            </p>
          </motion.div>

          {/* Card 2: Purpose & Objectives */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="theme-card p-6"
          >
            <div className="flex items-center gap-2 theme-accent-2-text mb-3">
              <Target size={18} />
              <h2 className="text-base font-bold text-foreground">
                Strategic Purpose & Objectives
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {project.purpose}
            </p>
          </motion.div>
        </div>

        {/* Card 3: Key Features (Full Width) */}
        {project.features && project.features.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="theme-card p-6 sm:p-8 mb-10"
          >
            <div className="flex items-center gap-2 theme-accent-text mb-4">
              <Sparkles size={18} />
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                Engineered Modules & Architecture Features
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="theme-chip flex items-start gap-2.5 p-3 text-xs sm:text-sm text-muted-foreground"
                >
                  <CheckCircle2
                    size={16}
                    className="theme-accent-text mt-0.5 flex-shrink-0"
                  />
                  <span className="leading-snug">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tech Stack & Architecture Tokens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="theme-card p-6 mb-10"
        >
          <div className="flex items-center gap-2 theme-accent-2-text mb-3">
            <Layers size={18} />
            <h2 className="text-base font-bold text-foreground">
              Technology Stack Used
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tech.map((t) => (
              <span
                key={t}
                className="theme-chip-hot text-xs font-mono px-3 py-1.5"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Card 4: Impact & Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="theme-card p-6 sm:p-8 mb-14"
        >
          <h2 className="text-base sm:text-lg font-bold text-foreground mb-3">
            Outcomes & Business Impact
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {project.conclusion}
          </p>
        </motion.div>

        {/* Next & Previous Project Navigation */}
        <div className="pt-8 border-t border-border/40 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to={`/projects/${prevProject.slug}`}
            onClick={() => sound.playPop()}
            className="theme-card-hover p-4 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <ChevronLeft
                size={18}
                className="text-muted-foreground group-hover:text-[var(--theme-accent)] group-hover:-translate-x-1 transition-all"
              />
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground block">
                  Previous Project
                </span>
                <span className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-[var(--theme-accent)] transition-colors truncate max-w-[180px] block">
                  {prevProject.title}
                </span>
              </div>
            </div>
          </Link>

          <Link
            to={`/projects/${nextProject.slug}`}
            onClick={() => sound.playPop()}
            className="theme-card-hover p-4 flex items-center justify-between group text-right"
          >
            <div className="ml-auto flex items-center gap-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground block">
                  Next Project
                </span>
                <span className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-[var(--theme-accent)] transition-colors truncate max-w-[180px] block">
                  {nextProject.title}
                </span>
              </div>
              <ChevronRight
                size={18}
                className="text-muted-foreground group-hover:text-[var(--theme-accent)] group-hover:translate-x-1 transition-all"
              />
            </div>
          </Link>
        </div>
      </div>

      <Footer />
    </PageTransition>
  );
};

export default ProjectDetail;
