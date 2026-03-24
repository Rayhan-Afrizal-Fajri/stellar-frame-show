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
export interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  demo: string;
  github: string;
  category: ProjectCategory;
  image?: string;
  introduction: string;
  purpose: string;
  features: string[];
  conclusion: string;
}

export const projects: Project[] = [
  {
    slug: "cloudsync-dashboard",
    title: "CloudSync Dashboard",
    description: "Real-time cloud infrastructure monitoring dashboard with live metrics and alerts.",
    tech: ["React", "TypeScript", "Tailwind", "WebSocket"],
    demo: "#",
    github: "#",
    category: "Web & Software",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    introduction: "Organizations struggle to monitor distributed cloud infrastructure in real time. CloudSync Dashboard was built to provide a unified view of all cloud resources with instant alerting capabilities.",
    purpose: "To simplify cloud infrastructure monitoring by providing a single, intuitive dashboard that aggregates metrics from multiple providers and delivers actionable insights in real time.",
    features: [
      "Real-time metrics streaming via WebSocket connections",
      "Multi-cloud provider support (AWS, GCP, Azure)",
      "Customizable alert thresholds and notification channels",
      "Interactive charts and resource topology visualization",
      "Role-based access control for team collaboration",
    ],
    conclusion: "Successfully delivered a production-ready monitoring solution that reduced incident response time by 60% and improved infrastructure visibility across the organization.",
  },
  {
    slug: "devflow-cli",
    title: "DevFlow CLI",
    description: "A developer workflow automation tool for managing microservices deployments.",
    tech: ["Node.js", "Go", "Docker", "gRPC"],
    demo: "#",
    github: "#",
    category: "Web & Software",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80",
    introduction: "Managing microservices deployments across multiple environments is complex and error-prone. DevFlow CLI automates the entire deployment pipeline with a simple command-line interface.",
    purpose: "To streamline developer workflows by automating repetitive deployment tasks, reducing human error, and enabling consistent deployments across environments.",
    features: [
      "One-command deployment across staging and production",
      "Automatic service dependency resolution",
      "Built-in health checks and rollback support",
      "gRPC-based inter-service communication setup",
      "Docker Compose generation for local development",
    ],
    conclusion: "DevFlow CLI reduced deployment time from hours to minutes and became the standard deployment tool adopted by multiple engineering teams.",
  },
  {
    slug: "pixelcraft-editor",
    title: "PixelCraft Editor",
    description: "Browser-based image editor with layer support, filters, and AI-powered enhancements.",
    tech: ["Next.js", "Canvas API", "Python", "OpenAI"],
    demo: "#",
    github: "#",
    category: "Web & Software",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
    introduction: "Professional image editing tools are often expensive and resource-heavy. PixelCraft brings powerful editing capabilities directly to the browser with AI-powered features.",
    purpose: "To democratize image editing by providing a free, browser-based tool with professional-grade features enhanced by artificial intelligence.",
    features: [
      "Layer-based editing with blend modes",
      "AI-powered background removal and enhancement",
      "Custom filter creation and preset library",
      "Real-time collaborative editing",
      "Export in multiple formats and resolutions",
    ],
    conclusion: "PixelCraft Editor gained over 10,000 active users within the first month, proving that powerful image editing can be accessible to everyone.",
  },
  {
    slug: "fintrack-mobile",
    title: "FinTrack Mobile",
    description: "Personal finance tracker with budgeting, expense categorization, and visual reports.",
    tech: ["React Native", "Supabase", "Chart.js"],
    demo: "#",
    github: "#",
    category: "Web & Software",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    introduction: "Many people struggle to track their spending and maintain budgets. FinTrack Mobile provides an intuitive way to manage personal finances with smart categorization.",
    purpose: "To help individuals take control of their finances through automated expense tracking, visual budgeting tools, and actionable spending insights.",
    features: [
      "Automatic expense categorization using AI",
      "Visual budget tracking with progress indicators",
      "Monthly and yearly spending reports with charts",
      "Recurring expense detection and reminders",
      "Data export for tax preparation",
    ],
    conclusion: "FinTrack helped users save an average of 15% more per month by providing clear visibility into their spending patterns.",
  },
  {
    slug: "tech-competition-poster",
    title: "Tech Competition Poster",
    description: "Eye-catching poster design for a national coding competition event.",
    tech: ["Figma", "Illustrator"],
    demo: "#",
    github: "#",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    introduction: "A national coding competition needed a visually striking poster that would attract participants and convey the event's innovative spirit.",
    purpose: "To create a compelling visual identity for the competition that communicates excitement, technology, and professionalism to potential participants.",
    features: [
      "Bold typography with custom lettering",
      "Dynamic geometric patterns representing code and innovation",
      "Responsive design adapted for print, web, and social media",
      "Color palette reflecting the tech industry aesthetic",
    ],
    conclusion: "The poster design contributed to a 40% increase in event registrations compared to the previous year.",
  },
  {
    slug: "social-media-campaign",
    title: "Social Media Campaign",
    description: "Complete social media design kit including stories, posts, and banners for a startup launch.",
    tech: ["Figma", "Canva", "Photoshop"],
    demo: "#",
    github: "#",
    category: "Design",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    introduction: "A startup preparing for launch needed a cohesive social media presence across multiple platforms to build brand awareness and attract early adopters.",
    purpose: "To establish a strong, consistent brand identity across all social media channels that resonates with the target audience and drives engagement.",
    features: [
      "Complete design system with brand guidelines",
      "Story templates for Instagram and Facebook",
      "Post templates for feed consistency",
      "Banner designs for LinkedIn and Twitter",
      "Animated content for engagement boost",
    ],
    conclusion: "The campaign launch generated over 50,000 impressions in the first week and established a recognizable brand identity for the startup.",
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
