import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, X } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import { projects } from "@/data/portfolio";


const fadeUp = {
    hidden: {
        opacity: 0,
        y: 20
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4
        }
    }
};

// === KOMPONEN SLIDER & MODAL UNTUK HALAMAN DETAIL ===
const DetailImageSlider = ({ images, image, title }: { images?: string[]; image?: string; title: string }) => {
    const sliderImages = images && images.length > 0 ? images : image ? [image] : [];
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false); // State untuk Modal Lightbox
  
    // Mencegah scroll pada body/halaman utama saat modal terbuka
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
      setCurrentIndex((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    };
  
    const prevSlide = () => {
      setCurrentIndex((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
    };
  
    if (sliderImages.length === 0) return null;
  
    return (
      <>
        {/* SLIDER UTAMA DI HALAMAN */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-8 relative rounded-2xl overflow-hidden border border-border group/slider bg-background"
        >
          <div className="relative w-full flex items-center justify-center">
              <img
                src={sliderImages[currentIndex]}
                alt={`${title} - image ${currentIndex + 1}`}
                // Tambahkan cursor-pointer dan event onClick untuk membuka modal
                onClick={() => setIsModalOpen(true)}
                className="w-full max-h-[70vh] object-contain transition-transform duration-500 cursor-zoom-in"
              />
          </div>
    
          {sliderImages.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-black/80 z-10 shadow-md"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-black/80 z-10 shadow-md"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
    
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-10 bg-black/30 px-3 py-2 rounded-full backdrop-blur-sm">
                {sliderImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === currentIndex ? "bg-white" : "bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>

        {/* MODAL FULLSCREEN UNTUK ZOOM GAMBAR */}
        <AnimatePresence>
            {isModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    // Layar overlay hitam transparan
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-8"
                    // Tutup modal jika area background di-klik
                    onClick={() => setIsModalOpen(false)}
                >
                    {/* Tombol Close */}
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 text-white/70 hover:text-white transition-colors z-50 bg-black/20 rounded-full"
                    >
                        <X size={32} />
                    </button>

                    {/* Navigasi Modal (jika gambar > 1) */}
                    {sliderImages.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                                className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 p-2 sm:p-4 text-white/50 hover:text-white transition-colors z-50"
                            >
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                                className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 p-2 sm:p-4 text-white/50 hover:text-white transition-colors z-50"
                            >
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                            </button>
                        </>
                    )}

                    {/* Gambar Fullscreen */}
                    <motion.img
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        src={sliderImages[currentIndex]}
                        alt={`${title} fullscreen`}
                        className="max-w-full max-h-[90vh] object-contain select-none cursor-default"
                        // Mencegah modal tertutup saat gambar itu sendiri yang di-klik
                        onClick={(e) => e.stopPropagation()} 
                    />

                    {/* Indikator Angka di Bawah (Misal: 1 / 3) */}
                    {sliderImages.length > 1 && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 font-mono text-sm bg-black/40 px-4 py-1.5 rounded-full">
                            {currentIndex + 1} / {sliderImages.length}
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
      </>
    );
};

const ProjectDetail = () => {
    const {slug} = useParams<{ slug: string }>();
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return (
            <PageTransition>
                <div className="container max-w-3xl mx-auto px-6 pt-32 text-center">
                    <h1 className="text-3xl font-bold text-foreground mb-4">Project not found</h1>
                    <Link
                        to="/projects"
                        className="text-muted-foreground hover:text-foreground transition-colors">
                        ← Back to Projects
                    </Link>
                </div>
                <Footer/>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="container max-w-3xl mx-auto px-6 pt-24 sm:pt-32">
                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}>
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
                        <ArrowLeft size={16}/>
                        Back to Projects
                    </Link>
                </motion.div>


                {/* === IMAGE SLIDER === */}
                <DetailImageSlider 
                    images={project.images} 
                    image={project.image} 
                    title={project.title} 
                />


                {/* Title & Description */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: 0.05 }}>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
                        {project.title}
                    </h1>
                    <p className="text-muted-foreground mb-8">{project.description}</p>
                </motion.div>

                {/* Sections */}
                <div className="space-y-10">
                    <Section title="Introduction & Problem" delay={0.1}>
                        <p className="text-muted-foreground leading-relaxed">{project.introduction}</p>
                    </Section>

                    <Section title="Purpose & Benefit" delay={0.15}>
                        <p className="text-muted-foreground leading-relaxed">{project.purpose}</p>
                    </Section>

                    {
                        project.category !== "Design" && project.features && project.features.length > 0 && (
                            <Section title="Key Features" delay={0.2}>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    {project.features.map((f) => (<li key={f}>{f}</li>))}
                                </ul>
                            </Section>
                        )
                    }

                    <Section title="Tech Stack" delay={0.25}>
                        <div className="flex flex-wrap gap-2">
                            {
                                project.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="text-xs font-mono px-3 py-1.5 rounded-full bg-accent text-accent-foreground">
                                        {t}
                                    </span>
                                ))
                            }
                        </div>
                    </Section>

                    {
                        project.category !== "Design" && project.demo && project.demo !== "#" && (
                            <Section title="Live Demo" delay={0.3}>
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-foreground font-medium hover:text-muted-foreground transition-colors">
                                    <ExternalLink size={16}/>
                                    Visit Live Demo
                                </a>
                            </Section>
                        )
                    }

                    <Section title="Conclusion" delay={0.35}>
                        <p className="text-muted-foreground leading-relaxed">{project.conclusion}</p>
                    </Section>
                </div>
            </div>
            <Footer/>
        </PageTransition>
    );
};

const Section = ({
    title,
    children,
    delay = 0
}: {
    title: string;
    children: React.ReactNode;
    delay?: number
}) => (
    <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ delay }}>
        <h2 className="text-xl font-semibold text-foreground mb-3">{title}</h2>
        {children}
    </motion.div>
);

export default ProjectDetail;