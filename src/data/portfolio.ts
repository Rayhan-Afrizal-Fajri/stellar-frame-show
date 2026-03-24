// ============================================ Central portfolio data — Rayhan
// Afrizal Fajri ============================================ --- Personal Info
// ---
export const personalInfo = {
    name: "Rayhan Afrizal",
    fullName: "Rayhan Afrizal Fajri",
    headline: "Full-stack web developer focused on building structured, scalable systems.\nPa" +
            "ssionate about backend logic, business processes, and enterprise system develo" +
            "pment.",
    location: "Indonesia",
    cvUrl: "#",
    email: "mailto:afrizalfajri23@gmail.com"
};

// --- Social Links ---
export const socials = [
    {
        label: "LinkedIn",
        href: "https://linkedin.com/in/rayhan-afrizal-fajri/",
        type: "linkedin" as const
    }, {
        label: "GitHub",
        href: "#",
        type: "github" as const
    }, {
        label: "Portfolio",
        href: "https://portfolio-rayhan.netlify.app",
        type: "website" as const
    }, {
        label: "Email",
        href: "mailto:afrizalfajri23@gmail.com",
        type: "email" as const
    }
];

// --- Experience ---
export const experiences = [
    {
        role: "Freelance Web / System Developer",
        company: "Self-employed",
        time: "2025 – Present",
        location: "Indonesia",
        image: "https://ui-avatars.com/api/?name=RD&background=0a0a0a&color=fff&size=80"
    }, {
        role: "UI/UX Intern",
        company: "PT Wiratek Solusi Asia",
        time: "Oct 2025 – Jan 2026",
        location: "Indonesia",
        image: "https://ui-avatars.com/api/?name=WS&background=0a0a0a&color=fff&size=80"
    }, {
        role: "Web Developer Intern",
        company: "LAZISNU Cilacap",
        time: "2024",
        location: "Cilacap, Indonesia",
        image: "https://ui-avatars.com/api/?name=LZ&background=0a0a0a&color=fff&size=80"
    }
];

// --- Tech Stack ---
export const techStack = [
    "Laravel",
    "React",
    "JavaScript",
    "PHP",
    "MySQL",
    "Tailwind CSS",
    "HTML",
    "CSS",
    "Git",
    "MVC Architecture",
    "REST API",
    "ERD Design",
    "System Design"
];

// --- Project Categories ---
export const projectCategories = ["All", "Web & System", "Design"] as const;
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
    images?: string[];
    introduction: string;
    purpose: string;
    features?: string[];
    conclusion: string;
}

export const projects: Project[] = [
    {
      slug: "central-buah-inventory",
      title: "Central Buah Inventory System",
      description: "Inventory management system for tracking stock and transactions.",
      tech: [
          "Laravel", "React", "MySQL"
      ],
      demo: "#",
      github: "#",
      category: "Web & System",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      introduction: "An internal system designed to manage inventory and stock flow for a fruit sto" +
              "re.",
      purpose: "To ensure accurate stock tracking and support daily operational processes.",
      features: [
          "Stock management (in & out)", "Transaction recording", "Reporting and dashboard", "Data filtering and monitoring"
      ],
      conclusion: "Provided better visibility of stock and reduced inconsistencies in inventory t" +
              "racking."
    }, {
      slug: "jagatara-charcoal-cms",
      title: "Jagatara Charcoal CMS",
      description: "Content Management System for managing products and business content of a charcoal company.",
      tech: ["Laravel", "React", "MySQL"],
      demo: "#",
      github: "#",
      category: "Web & System",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80",
      introduction: "Jagatara Charcoal required a system to manage product data, company information, and digital content efficiently.",
      purpose: "To provide a centralized system for managing business content, enabling easier updates and better content organization.",
      features: [
        "Admin dashboard for content management",
        "Product management (CRUD)",
        "Dynamic content rendering",
        "Authentication and role-based access",
      ],
      conclusion: "Simplified content management process and improved efficiency in updating company information.",
    }, {
      slug: "akrom-rental",
      title: "Akrom Rental Motor System",
      description: "Rental management system for handling vehicle bookings and transactions.",
      tech: [
          "Laravel", "MySQL"
      ],
      demo: "#",
      github: "#",
      category: "Web & System",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      introduction: "A system to manage rental operations including booking, transactions, and cust" +
              "omer data.",
      purpose: "To digitize rental processes and improve data management.",
      features: [
          "Booking management", "Customer data tracking", "Transaction reports", "Admin dashboard"
      ],
      conclusion: "Simplified rental operations and improved data organization."
    }, {
      slug: "edisday-system",
      title: "e-DisDay System",
      description: "Fund distribution management system with approval workflow and reporting.",
      tech: [
          "Laravel", "MySQL", "Blade"
      ],
      demo: "#",
      github: "#",
      category: "Web & System",
      image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80",
      introduction: "A system designed to manage fund distribution processes with structured workfl" +
              "ows and data tracking.",
      purpose: "To digitize and streamline fund distribution processes, ensuring transparency " +
              "and efficiency.",
      features: [
          "Role-based access control (admin & staff)", "Approval workflow for fund distribution", "Transaction and reporting system", "Dashboard for monitoring activities"
      ],
      conclusion: "Improved process efficiency and reduced manual errors in fund distribution man" +
              "agement."
    }, {
      slug: "kampoeng-kepiting",
      title: "Kampoeng Kepiting System",
      description: "Tourism and ordering system for managing visitors and orders.",
      tech: [
          "Laravel", "MySQL", "JavaScript"
      ],
      demo: "#",
      github: "#",
      category: "Web & System",
      image: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=800&q=80",
      introduction: "A web-based system developed for managing tourism services and customer orders" +
              ".",
      purpose: "To support business operations by integrating booking and ordering processes i" +
              "nto one system.",
      features: [
          "Online booking system", "Order management", "Customer data management", "Admin dashboard"
      ],
      conclusion: "Helped improve service efficiency and customer management for the business."
    }, {
      slug: "siwali-jkb",
      title: "SIWALI JKB (Academic Advisory System)",
      description: "Academic advisory reporting system for lecturers to manage student progress and generate reports.",
      tech: ["Laravel", "MySQL", "Blade"],
      demo: "#",
      github: "#",
      category: "Web & System",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
      introduction: "SIWALI JKB is a final project developed to support academic advisors in managing student data and generating structured reports.",
      purpose: "To reduce manual work and minimize errors in academic reporting processes for lecturers.",
      features: [
        "Student data management",
        "GPA tracking and reporting",
        "Automated report generation",
        "Filtering based on semester and period",
        "Dashboard for monitoring student performance",
      ],
      conclusion: "Successfully reduced reporting complexity and improved accuracy in academic advisory processes.",
    }, {
      slug: "intermedia-itc-2024",
      title: "Intermedia IT Competition 2024 - Poster Design",
      description: "1st place winner in national digital poster competition with the theme 'Lingkaran Judi Online'.",
      tech: ["Adobe Illustrator", "Photoshop"],
      demo: "",
      github: "",
      category: "Design",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
        "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&q=80",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
      ],
      introduction: "A national-level design competition focused on raising awareness about online gambling issues through visual storytelling.",
      purpose: "To create a visually impactful poster that communicates the dangers of online gambling using strong visual hierarchy and storytelling.",
      features: [],
      conclusion: "Successfully achieved 1st place by delivering a strong concept, impactful visuals, and clear message delivery.",
    },
    {
      slug: "rsi-fatimah-social-media",
      title: "Social Media Designer – RSI Fatimah Cilacap",
      description: "Handled social media content design for a hospital for 1 year, including posters, banners, and campaigns.",
      tech: ["Illustrator", "Photoshop", "Canva"],
      demo: "",
      github: "",
      category: "Design",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
        "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&q=80",
        "https://images.unsplash.com/photo-1529336953121-a0c3d45b6e78?w=800&q=80",
      ],
      introduction: "Worked as part of a Teaching Factory team to manage and design social media content for RSI Fatimah Cilacap.",
      purpose: "To improve the hospital’s digital presence through consistent and engaging visual content.",
      features: [],
      conclusion: "Delivered consistent and professional visual content that improved engagement and brand presentation.",
    },
];

// --- Certifications ---
export const certifications = [
  { title: "Belajar Dasar Pemrograman JavaScript", issuer: "Dicoding", date: "", color: "from-yellow-500/20 to-yellow-600/5" },
  { title: "Belajar Dasar Cloud dan Gen AI di AWS", issuer: "Dicoding", date: "", color: "from-orange-500/20 to-orange-600/5" },
  { title: "Oracle Database Programming With SQL", issuer: "Oracle Academy", date: "", color: "from-red-500/20 to-red-600/5" },
  { title: "Oracle Database Design", issuer: "Oracle Academy", date: "", color: "from-purple-500/20 to-purple-600/5" },
];

// --- CTA ---
export const ctaSection = {
    title: "Let's work together",
    description: "Interested in building systems or collaborating on a project? Feel free to rea" +
            "ch out."
};