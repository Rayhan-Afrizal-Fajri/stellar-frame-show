import { motion } from "framer-motion";
import { MapPin, Download, Mail, ExternalLink, Github, ArrowRight, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import profileImg from "@/assets/profile.jpg";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const experiences = [
  {
    role: "Senior Full-Stack Developer",
    company: "TechCorp Inc.",
    time: "Mar 2024 – Present",
    location: "Remote",
    image: "https://ui-avatars.com/api/?name=TC&background=0a0a0a&color=fff&size=80",
  },
  {
    role: "Full-Stack Developer",
    company: "Digital Agency",
    time: "Feb 2023 – Feb 2024",
    location: "Jakarta, Indonesia",
    image: "https://ui-avatars.com/api/?name=DA&background=0a0a0a&color=fff&size=80",
  },
  {
    role: "Frontend Developer",
    company: "StartupXYZ",
    time: "Jun 2022 – Jan 2023",
    location: "Remote",
    image: "https://ui-avatars.com/api/?name=SX&background=0a0a0a&color=fff&size=80",
  },
];

const techStack = [
  "Laravel", "React", "Node.js", "TypeScript", "Tailwind CSS",
  "Next.js", "Vue.js", "Git", "Docker", "PostgreSQL",
  "MySQL", "Redis", "AWS", "Firebase", "Figma",
];

const recentProjects = [
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
];

const Index = () => (
  <PageTransition>
    <div className="relative overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-muted/50 blur-3xl animate-float" />
      <div className="absolute bottom-20 -right-32 w-80 h-80 rounded-full bg-muted/30 blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      {/* Hero */}
      <div className="container max-w-4xl mx-auto px-6 pt-24 sm:pt-32">
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col items-center text-center gap-8">
          <motion.div variants={fadeUp}>
            <div className="relative">
              <img
                src={profileImg}
                alt="Profile"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-border shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-background" />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground">
              Hi, I'm <span className="text-gradient">Rayhan Afrizal</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Full-stack developer crafting clean, performant web experiences.
              Passionate about design systems, open source, and turning ideas into reality.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={16} />
            <span className="text-sm">Indonesia</span>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity duration-200"
            >
              <Download size={16} />
              Download CV
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium text-sm hover:bg-accent transition-colors duration-200"
            >
              <Mail size={16} />
              Contact Me
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Experience */}
      <section className="container max-w-4xl mx-auto px-6 mt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-8">Experience</h2>
        </motion.div>
        <div className="flex flex-col gap-4">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card-hover p-5 flex items-center gap-5"
            >
              <img
                src={exp.image}
                alt={exp.company}
                className="w-12 h-12 rounded-xl object-cover border border-border flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{exp.role}</h3>
                <p className="text-sm text-muted-foreground">{exp.company}</p>
              </div>
              <div className="hidden sm:flex flex-col items-end text-right flex-shrink-0">
                <span className="text-sm text-muted-foreground">{exp.time}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Briefcase size={12} /> {exp.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="container max-w-4xl mx-auto px-6 mt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-8">Tech Stack</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap gap-2"
        >
          {techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-3 py-1.5 rounded-full bg-accent text-accent-foreground border border-border hover:bg-muted transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </section>

      {/* Recent Projects */}
      <section className="container max-w-4xl mx-auto px-6 mt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Recent Projects</h2>
          <Link to="/projects" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            View all <ArrowRight size={14} />
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recentProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card-hover p-5 flex flex-col gap-3"
            >
              <h3 className="font-semibold text-foreground">{project.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 pt-1">
                <a href={project.demo} className="inline-flex items-center gap-1 text-sm text-foreground font-medium hover:text-muted-foreground transition-colors">
                  <ExternalLink size={13} /> Demo
                </a>
                <a href={project.github} className="inline-flex items-center gap-1 text-sm text-foreground font-medium hover:text-muted-foreground transition-colors">
                  <Github size={13} /> GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container max-w-4xl mx-auto px-6 mt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="glass-card p-10 sm:p-14 text-center"
        >
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Let's work together
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Have a project in mind or just want to chat? I'm always open to new opportunities and collaborations.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity duration-200"
          >
            <Mail size={16} />
            Get in Touch
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  </PageTransition>
);

export default Index;
