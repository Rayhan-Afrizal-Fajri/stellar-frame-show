import React, { useState, useEffect } from "react";
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
  }, [isModalOpen, sliderImages.length]);

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

  const nextSlide = () => {
    sound.playTap();
    setCurrentIndex((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    sound.playTap();
    setCurrentIndex((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  if (sliderImages.length === 0) return null;

  return (
    <div className="mb-10 sm:mb-12">
      {/* Main Preview Frame */}
      <div className="relative rounded-3xl ios-glass overflow-hidden border border-white/50 dark:border-white/10 group shadow-lg bg-black/5 dark:bg-black/30">
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
            className="w-full h-full object-contain p-2 sm:p-4 transition-transform duration-500 hover:scale-[1.01]"
          />

          {/* Zoom hint overlay */}
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full ios-glass border border-white/30 text-xs font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 pointer-events-none shadow-md">
            <Maximize2 size={13} />
            <span>Click to expand</span>
          </div>

          {/* Image index counter */}
          {sliderImages.length > 1 && (
            <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-xs shadow-md">
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
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full ios-glass flex items-center justify-center text-foreground hover:scale-110 active:scale-95 transition-all shadow-md opacity-0 group-hover:opacity-100 z-10"
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
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full ios-glass flex items-center justify-center text-foreground hover:scale-110 active:scale-95 transition-all shadow-md opacity-0 group-hover:opacity-100 z-10"
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
              className={`relative flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden border-2 transition-all ${
                idx === currentIndex
                  ? "border-blue-500 scale-105 shadow-md ring-2 ring-blue-500/30"
                  : "border-border/60 opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={thumb}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
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
          <h1 className="text-3xl font-bold text-foreground mb-4">
            System Project Not Found
          </h1>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full ios-glass border border-white/50 dark:border-white/10 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-all shadow-sm"
          >
            <ArrowLeft size={15} />
            <span>All Projects</span>
          </Link>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full ios-glass border border-white/50 dark:border-white/10 text-xs text-muted-foreground hover:text-foreground transition-all shadow-sm"
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
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono font-medium">
              {project.category}
            </span>
            {project.badge && (
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-medium">
                {project.badge}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm font-medium shadow-[0_4px_16px_rgba(59,130,246,0.35)] hover:scale-105 active:scale-95 transition-all"
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full ios-glass border border-white/50 dark:border-white/10 text-foreground text-xs sm:text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-all shadow-sm"
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
            className="ios-glass-card p-6 rounded-3xl"
          >
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-3">
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
            className="ios-glass-card p-6 rounded-3xl"
          >
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-3">
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
            className="ios-glass-card p-6 sm:p-8 rounded-3xl mb-10"
          >
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-4">
              <Sparkles size={18} />
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                Engineered Modules & Architecture Features
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-border/30 text-xs sm:text-sm text-muted-foreground"
                >
                  <CheckCircle2
                    size={16}
                    className="text-emerald-500 mt-0.5 flex-shrink-0"
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
          className="ios-glass-card p-6 rounded-3xl mb-10"
        >
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-3">
            <Layers size={18} />
            <h2 className="text-base font-bold text-foreground">
              Technology Stack Used
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs font-mono px-3 py-1.5 rounded-2xl ios-glass bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20"
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
          className="ios-glass-card p-6 sm:p-8 rounded-3xl mb-14"
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
            className="ios-glass-card p-4 rounded-2xl flex items-center justify-between group hover:border-blue-500/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <ChevronLeft
                size={18}
                className="text-muted-foreground group-hover:-translate-x-1 transition-transform"
              />
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground block">
                  Previous Project
                </span>
                <span className="text-xs sm:text-sm font-semibold text-foreground truncate max-w-[180px] block">
                  {prevProject.title}
                </span>
              </div>
            </div>
          </Link>

          <Link
            to={`/projects/${nextProject.slug}`}
            onClick={() => sound.playPop()}
            className="ios-glass-card p-4 rounded-2xl flex items-center justify-between group hover:border-blue-500/30 transition-all text-right"
          >
            <div className="ml-auto flex items-center gap-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground block">
                  Next Project
                </span>
                <span className="text-xs sm:text-sm font-semibold text-foreground truncate max-w-[180px] block">
                  {nextProject.title}
                </span>
              </div>
              <ChevronRight
                size={18}
                className="text-muted-foreground group-hover:translate-x-1 transition-transform"
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
