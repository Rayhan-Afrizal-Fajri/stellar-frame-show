// ============================================
// Central portfolio data — edit everything here
// ============================================

// --- Personal Info ---
export const personalInfo = {
  name: "Rayhan Afrizal",
  fullName: "Rayhan Afrizal Fajri",
  headline: "Full-stack developer crafting clean, performant web experiences.\nPassionate about design systems, open source, and turning ideas into reality.",
  location: "Indonesia",
  cvUrl: "#",
  email: "mailto:hello@example.com",
};

// --- Social Links ---
export const socials = [
  { label: "LinkedIn", href: "#", type: "linkedin" as const },
  { label: "GitHub", href: "#", type: "github" as const },
  { label: "Twitter", href: "#", type: "twitter" as const },
  { label: "Email", href: "mailto:hello@example.com", type: "email" as const },
];

// --- Experience ---
export const experiences = [
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

// --- Tech Stack ---
export const techStack = [
  "Laravel", "React", "Node.js", "TypeScript", "Tailwind CSS",
  "Next.js", "Vue.js", "Git", "Docker", "PostgreSQL",
  "MySQL", "Redis", "AWS", "Firebase", "Figma",
];

// --- Project Categories (add/remove freely) ---
export const projectCategories = ["All", "Web & Software", "Design"] as const;
export type ProjectCategory = (typeof projectCategories)[number];

// --- Projects ---
export const projects: {
  title: string;
  description: string;
  tech: string[];
  demo: string;
  github: string;
  category: ProjectCategory;
}[] = [
  {
    title: "CloudSync Dashboard",
    description: "Real-time cloud infrastructure monitoring dashboard with live metrics and alerts.",
    tech: ["React", "TypeScript", "Tailwind", "WebSocket"],
    demo: "#",
    github: "#",
    category: "Web & Software",
  },
  {
    title: "DevFlow CLI",
    description: "A developer workflow automation tool for managing microservices deployments.",
    tech: ["Node.js", "Go", "Docker", "gRPC"],
    demo: "#",
    github: "#",
    category: "Web & Software",
  },
  {
    title: "PixelCraft Editor",
    description: "Browser-based image editor with layer support, filters, and AI-powered enhancements.",
    tech: ["Next.js", "Canvas API", "Python", "OpenAI"],
    demo: "#",
    github: "#",
    category: "Web & Software",
  },
  {
    title: "FinTrack Mobile",
    description: "Personal finance tracker with budgeting, expense categorization, and visual reports.",
    tech: ["React Native", "Supabase", "Chart.js"],
    demo: "#",
    github: "#",
    category: "Web & Software",
  },
  {
    title: "Tech Competition Poster",
    description: "Eye-catching poster design for a national coding competition event.",
    tech: ["Figma", "Illustrator"],
    demo: "#",
    github: "#",
    category: "Design",
  },
  {
    title: "Social Media Campaign",
    description: "Complete social media design kit including stories, posts, and banners for a startup launch.",
    tech: ["Figma", "Canva", "Photoshop"],
    demo: "#",
    github: "#",
    category: "Design",
  },
];

// --- Certifications ---
export const certifications = [
  { title: "AWS Solutions Architect", issuer: "Amazon Web Services", date: "2024", color: "from-orange-500/20 to-orange-600/5" },
  { title: "Google Cloud Professional", issuer: "Google Cloud", date: "2024", color: "from-blue-500/20 to-blue-600/5" },
  { title: "Meta Front-End Developer", issuer: "Meta / Coursera", date: "2023", color: "from-sky-500/20 to-sky-600/5" },
  { title: "Certified Kubernetes Admin", issuer: "CNCF", date: "2023", color: "from-indigo-500/20 to-indigo-600/5" },
  { title: "React Advanced Patterns", issuer: "Frontend Masters", date: "2023", color: "from-cyan-500/20 to-cyan-600/5" },
  { title: "TypeScript Mastery", issuer: "Udemy", date: "2022", color: "from-emerald-500/20 to-emerald-600/5" },
];

// --- CTA ---
export const ctaSection = {
  title: "Let's work together",
  description: "Have a project in mind or just want to chat? I'm always open to new opportunities and collaborations.",
};
