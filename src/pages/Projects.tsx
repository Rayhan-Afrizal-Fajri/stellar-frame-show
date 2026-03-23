import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "CloudSync Dashboard",
    description: "Real-time cloud infrastructure monitoring dashboard with live metrics and alerts.",
    tech: ["React", "TypeScript", "Tailwind", "WebSocket"],
    demo: "#",
    github: "#",
  },
  {
    title: "DevFlow CLI",
    description: "A developer workflow automation tool for managing microservices deployments.",
    tech: ["Node.js", "Go", "Docker", "gRPC"],
    demo: "#",
    github: "#",
  },
  {
    title: "PixelCraft Editor",
    description: "Browser-based image editor with layer support, filters, and AI-powered enhancements.",
    tech: ["Next.js", "Canvas API", "Python", "OpenAI"],
    demo: "#",
    github: "#",
  },
  {
    title: "FinTrack Mobile",
    description: "Personal finance tracker with budgeting, expense categorization, and visual reports.",
    tech: ["React Native", "Supabase", "Chart.js"],
    demo: "#",
    github: "#",
  },
];

const Projects = () => (
  <PageTransition>
    <div className="container max-w-5xl mx-auto px-6 pt-24 sm:pt-32">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-2">Projects</h1>
        <p className="text-muted-foreground mb-12">A selection of things I've built and shipped.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="glass-card-hover p-6 flex flex-col gap-4"
          >
            <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-full bg-accent text-accent-foreground">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-3 pt-2">
              <a href={project.demo} className="inline-flex items-center gap-1.5 text-sm text-foreground font-medium hover:text-muted-foreground transition-colors">
                <ExternalLink size={14} /> Live Demo
              </a>
              <a href={project.github} className="inline-flex items-center gap-1.5 text-sm text-foreground font-medium hover:text-muted-foreground transition-colors">
                <Github size={14} /> GitHub
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </PageTransition>
);

export default Projects;
