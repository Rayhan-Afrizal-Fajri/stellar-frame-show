import {useParams, Link} from "react-router-dom";
import {motion} from "framer-motion";
import {ArrowLeft, ExternalLink} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import {projects} from "@/data/portfolio";

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

const ProjectDetail = () => {
    const {slug} = useParams < {
        slug: string
    } > ();
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
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    transition={{
                        duration: 0.3
                    }}>
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
                        <ArrowLeft size={16}/>
                        Back to Projects
                    </Link>
                </motion.div>


                {/* Image / Gallery */}
                {
                    project.category === "Design" && project.images
                        ? (
                            <motion.div
                                variants={fadeUp}
                                initial="hidden"
                                animate="show"
                                className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {
                                    project
                                        .images
                                        .map((img, i) => (
                                            <img
                                                key={i}
                                                src={img}
                                                alt={project.title}
                                                className="rounded-xl border border-border object-cover w-full h-[220px]"/>
                                        ))
                                }
                            </motion.div>
                        )
                        : (project.image && (
                            <motion.div
                                variants={fadeUp}
                                initial="hidden"
                                animate="show"
                                className="mb-8 rounded-2xl overflow-hidden border border-border">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-auto object-cover max-h-[400px]"/>
                            </motion.div>
                        ))
                }

                {/* Title & Description */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    transition={{
                        delay: 0.05
                    }}>
                    <h1
                        className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">{project.title}</h1>
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
                                    {
                                        project
                                            .features
                                            .map((f) => (<li key={f}>{f}</li>))
                                    }
                                </ul>
                            </Section>
                        )
                    }

                    <Section title="Tech Stack" delay={0.25}>
                        <div className="flex flex-wrap gap-2">
                            {
                                project
                                    .tech
                                    .map((t) => (
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
} : {
    title: string;
    children: React.ReactNode;
    delay?: number
}) => (
    <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{
            delay
        }}>
        <h2 className="text-xl font-semibold text-foreground mb-3">{title}</h2>
        {children}
    </motion.div>
);

export default ProjectDetail;
