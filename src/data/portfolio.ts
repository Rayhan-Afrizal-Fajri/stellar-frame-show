// ============================================
// Central portfolio data — Rayhan Afrizal Fajri
// ============================================

import VictoryCore1 from '../assets/projects/victory-core/victory-dashboard.png';
import VictoryCore2 from '../assets/projects/victory-core/victory-kanban.png';
import VictoryCore3 from '../assets/projects/victory-core/victory-production.png';
import VictoryCore4 from '../assets/projects/victory-core/victory-profit-loss.png';
import VictoryCore5 from '../assets/projects/victory-core/victory-purchasing.png';
import VictoryCore6 from '../assets/projects/victory-core/victory-sample.png';

import Central1 from '../assets/projects/central-buah/central-dashboard.png';
import Central2 from '../assets/projects/central-buah/central-do.png';
import Central3 from '../assets/projects/central-buah/central-pos.png';
import Central4 from '../assets/projects/central-buah/central-report.png';
import Central5 from '../assets/projects/central-buah/central-schedule.png';
import Central6 from '../assets/projects/central-buah/central-stock.png';
import Central7 from '../assets/projects/central-buah/central-landing.png';

import Jagatara from '../assets/projects/jagatara/jagatara-landing.png';
import Akrom from '../assets/projects/akrom/akrom-landing.png';
import Kampoeng from '../assets/projects/kampoeng/kampoeng-landing.png';

// --- Personal Info ---
export const personalInfo = {
    name: "Rayhan Afrizal",
    fullName: "Rayhan Afrizal Fajri",
    title: "Full-Stack Developer & ERP Specialist",
    headline: "Full-stack web developer focused on building structured, scalable systems.\nPassionate about backend logic, business processes, and enterprise system architecture.",
    bio: "Passionate Informatics Engineering graduate dedicated to architecting robust enterprise software, manufacturing workflows, and high-performance databases with clean, maintainable code.",
    location: "Indonesia",
    status: "Available for Hire",
    cvUrl: "#",
    email: "mailto:afrizalfajri23@gmail.com",
    stats: [
        { label: "Systems Shipped", value: "6+", sub: "ERP & Web Apps" },
        { label: "Architecture", value: "MVC & ERD", sub: "Enterprise Grade" },
        { label: "Core Stack", value: "Laravel & React", sub: "Full-Stack" },
        { label: "Code Quality", value: "100%", sub: "Modern Standards" }
    ]
};

// --- Social Links ---
export const socials = [
    {
        label: "LinkedIn",
        href: "https://linkedin.com/in/rayhan-afrizal-fajri/",
        type: "linkedin" as const
    },
    {
        label: "GitHub",
        href: "https://github.com/Rayhan-Afrizal-Fajri",
        type: "github" as const
    },
    {
        label: "Email",
        href: "mailto:afrizalfajri23@gmail.com",
        type: "email" as const
    }
];

// --- Experience ---
export interface Experience {
    role: string;
    company: string;
    time: string;
    location: string;
    image: string;
    description?: string[];
    featured?: boolean;
}

export const experiences: Experience[] = [
    {
        role: "Freelance Full-Stack Developer",
        company: "Self-Employed",
        time: "2025 – Present",
        location: "Indonesia",
        image: "https://ui-avatars.com/api/?name=RF&background=2563eb&color=fff&size=80",
        featured: true,
        description: [
            "Architected and deployed Victory Core, an enterprise ERP for textile manufacturing spanning order entry, MRP, costing, and P&L analytics.",
            "Engineered Central Buah Inventory System, digitizing multi-branch stock flow, POS registers, and real-time replenishment alerts.",
            "Designed and implemented high-throughput relational schemas in MySQL with optimized indexing and transaction isolation."
        ]
    },
    {
        role: "UI/UX Intern",
        company: "PT Wiratek Solusi Asia",
        time: "Oct 2025 – Jan 2026",
        location: "Indonesia",
        image: "https://ui-avatars.com/api/?name=WS&background=0284c7&color=fff&size=80",
        description: [
            "Collaborated on user research, user journey mapping, and wireframing for client-facing software applications.",
            "Established scalable Figma component libraries and interactive high-fidelity prototypes ensuring seamless developer handoff."
        ]
    },
    {
        role: "Web Developer Intern",
        company: "LAZISNU Cilacap",
        time: "Aug 2024 – Dec 2024",
        location: "Cilacap, Indonesia",
        image: "https://ui-avatars.com/api/?name=LZ&background=059669&color=fff&size=80",
        description: [
            "Developed an internal web management system to coordinate fund distributions and generate automated transparency reports.",
            "Implemented role-based permission tiers and relational data management in Laravel & MySQL."
        ]
    }
];

// --- Grouped Tech Stack ---
export interface TechGroup {
    category: string;
    skills: { name: string; icon?: string; hot?: boolean }[];
}

export const groupedTechStack: TechGroup[] = [
    {
        category: "Backend & Systems",
        skills: [
            { name: "Laravel", hot: true },
            { name: "PHP", hot: true },
            { name: "MySQL", hot: true },
            { name: "RESTful API", hot: true },
            { name: "MVC Architecture" },
            { name: "ERD Design" },
            { name: "System Architecture" },
        ]
    },
    {
        category: "Frontend & UI",
        skills: [
            { name: "React", hot: true },
            { name: "TypeScript", hot: true },
            { name: "JavaScript" },
            { name: "Tailwind CSS", hot: true },
            { name: "Framer Motion" },
            { name: "HTML5 / CSS3" }
        ]
    },
    {
        category: "Tooling & Workflow",
        skills: [
            { name: "Git / GitHub" },
            { name: "Postman" },
            { name: "Vite" },
            { name: "Figma" },
            { name: "Database Indexing" }
        ]
    }
];

export const techStack = [
    "Laravel",
    "React",
    "PHP",
    "MySQL",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "REST API",
    "MVC Architecture",
    "ERD Design",
    "System Design",
    "Git",
    "HTML5",
    "CSS3"
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
    featured?: boolean;
    badge?: string;
}

export const projects: Project[] = [
    {
        slug: "victory-core",
        title: "Victory Core",
        description:
            "A comprehensive ERP-like manufacturing execution system for managing the complete textile production lifecycle, from customer orders to profitability analysis.",
        tech: ["Laravel", "React", "MySQL", "Tailwind CSS"],
        demo: "#",
        github: "https://github.com/Rayhan-Afrizal-Fajri/victory-core",
        category: "Web & System",
        image: VictoryCore1,
        images: [
            VictoryCore1, VictoryCore2, VictoryCore3, VictoryCore4, VictoryCore5, VictoryCore6
        ],
        featured: true,
        badge: "Flagship ERP",
        introduction:
            "Victory Core is an enterprise internal management system engineered for a textile manufacturing company. The platform centralizes multi-department operations by managing the end-to-end production pipeline: customer order entry, automated costing, procurement & MRP, sampling approvals, factory-floor scheduling, dispatching, invoicing, and real-time profit & loss (P&L) reporting.",
        purpose:
            "To eliminate fragmented manual paperwork, synchronize production schedules across sales, inventory, and floor supervisors, and furnish executives with instant profitability transparency.",
        features: [
            "Digital Purchase Order & Multi-Tier Order Processing",
            "Real-time Production Lifecycle Tracking with Milestone Stages",
            "Interactive Visual Kanban Board & Task Scheduling",
            "Bill of Materials (BOM) & Material Requirement Planning (MRP)",
            "Costing Engine & Dynamic Quotation Generation",
            "Sample Production Approval Workflow",
            "Real-time Production Analytics & Executive KPI Dashboard",
            "Automated Invoicing & Balance Ledger Tracking",
            "Granular Profit & Loss (P&L) Variance Reporting",
            "Role-Based Access Control (RBAC) & Immutable Activity Logs"
        ],
        conclusion:
            "Victory Core streamlined the company's entire manufacturing throughput. It eliminated spreadsheet discrepancies, reduced administrative lead time by over 40%, and empowered leadership with live financial and operational intelligence."
    },
    {
        slug: "central-buah-inventory",
        title: "Central Buah Inventory System",
        description: "High-accuracy inventory management and POS system for real-time stock control, multi-warehouse transfers, and batch expiration tracking.",
        tech: ["Laravel", "React", "MySQL"],
        demo: "#",
        github: "https://github.com/Rayhan-Afrizal-Fajri/victory-core",
        category: "Web & System",
        image: Central1,
        images: [
            Central1, Central2, Central3, Central4, Central5, Central6, Central7,
        ],
        featured: true,
        badge: "Inventory & POS",
        introduction: "An internal enterprise management solution engineered to supervise perishable fruit inventory, monitor multi-store supply transfers, and automate point-of-sale registers.",
        purpose: "To guarantee stock reconciliation accuracy, eliminate inventory shrinkage, and optimize daily procurement cycles.",
        features: [
            "Inbound & Outbound Stock Batch Tracking",
            "Multi-Location Inventory Balancing & Transfer Vouchers",
            "Real-Time POS Cashier Registers with Receipt Generation",
            "Automated Low-Stock Threshold Notifications",
            "Daily Turnover & Reconciliation Reports",
            "Auditing Dashboard with Role-Specific Visualizations"
        ],
        conclusion: "Delivered crystal-clear inventory visibility, reduced spoilage rates, and established consistent transaction records across all branch locations."
    },
    {
        slug: "jagatara-charcoal-cms",
        title: "Jagatara Charcoal CMS",
        description: "Enterprise Content Management System & product catalog orchestrating international export inquiries and company media.",
        tech: ["Laravel", "React", "MySQL"],
        demo: "#",
        github: "#",
        category: "Web & System",
        image: Jagatara,
        featured: true,
        badge: "Export CMS",
        introduction: "Jagatara Charcoal required a high-performance digital CMS platform to showcase export-grade coconut charcoal products, manage international RFQ inquiries, and administer digital assets.",
        purpose: "To equip the business with an agile content publishing pipeline and elevate its global export brand identity.",
        features: [
            "Admin Management Console with Granular Media Library",
            "Dynamic Product Catalog with Technical Specification Sheets",
            "International RFQ & Lead Capture Pipeline",
            "SEO-Optimized Dynamic Content Engine",
            "Two-Factor Authentication & Administrative Security"
        ],
        conclusion: "Streamlined global content publishing and drastically expedited customer quote turnarounds for overseas buyers."
    },
    {
        slug: "akrom-rental",
        title: "Akrom Rental Motor System",
        description: "Fleet booking, reservation schedule, and customer transaction engine for vehicle rental businesses.",
        tech: ["Laravel", "MySQL"],
        demo: "#",
        github: "#",
        category: "Web & System",
        image: Akrom,
        introduction: "A digitized fleet reservation platform handling motorcycle dispatching, return conditions, customer identification deposits, and automated payment receipts.",
        purpose: "To replace paper booking ledgers with an automated scheduling calendar preventing double bookings.",
        features: [
            "Live Booking & Availability Calendar",
            "Customer Verification & Identity Archiving",
            "Vehicle Maintenance & Service Logging",
            "Dynamic Pricing with Overdue Late Fee Calculation",
            "Executive Income & Utilization Analytics"
        ],
        conclusion: "Accelerated booking check-ins and safeguarded rental assets through verified operational audit trails."
    },
    {
        slug: "sibaznas",
        title: "SIBAZNAS Fund Distribution",
        description: "Transparent fund distribution, applicant vetting, and multi-tier approval workflow system.",
        tech: ["Laravel", "MySQL", "Blade"],
        demo: "#",
        github: "#",
        category: "Web & System",
        image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80",
        introduction: "A governance and social fund allocation system designed to manage aid programs, verify eligible beneficiaries, and track disbursements through hierarchical sign-offs.",
        purpose: "To ensure full financial transparency, prevent duplicate distributions, and maintain strict compliance with audit standards.",
        features: [
            "Beneficiary Eligibility Verification & Demographic Indexing",
            "Multi-Tier Approval Hierarchy (Staff -> Supervisor -> Director)",
            "Automated Fund Disbursement Vouchers",
            "Comprehensive Audit Logs & Real-Time Expenditure Visuals"
        ],
        conclusion: "Eliminated processing delays, ensured 100% auditable fund trails, and boosted institutional donor confidence."
    },
    {
        slug: "kampoeng-kepiting",
        title: "Kampoeng Kepiting System",
        description: "Integrated ecotourism reservation, tour package ticketing, and culinary order management system.",
        tech: ["Laravel", "MySQL", "JavaScript"],
        demo: "#",
        github: "#",
        category: "Web & System",
        image: Kampoeng,
        introduction: "A unified hospitality platform integrating mangrove ecotourism ticket reservations with on-premise seafood dining orders and visitor capacity tracking.",
        purpose: "To synchronize kitchen orders with visitor volume and maximize daily tourism throughput.",
        features: [
            "Online Tour & Boat Reservation Gateway",
            "Integrated Kitchen POS Order Routing",
            "Real-Time Visitor Headcount & Ecotourism Quota Control",
            "Consolidated Daily Revenue Analytics"
        ],
        conclusion: "Dramatically minimized guest wait times and harmonized kitchen inventory with real-time dining requests."
    },
    {
        slug: "intermedia-itc-2024",
        title: "Intermedia IT Competition 2024 - Poster Design",
        description: "1st Place Winner in National Digital Poster Competition with the theme 'Lingkaran Judi Online'.",
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
        introduction: "A national-level design competition evaluating conceptual depth, narrative impact, and aesthetic execution on social hazards.",
        purpose: "To convey the psychological trap and socioeconomic perils of online gambling through compelling visual metaphors.",
        features: [
            "Conceptual Storyboarding & Symbolism",
            "Dynamic Color Contrast & Typography Hierarchy",
            "Awarded 1st Place Champion Nationally"
        ],
        conclusion: "Clinched 1st place among nationwide competitors for exceptional concept execution, emotive color mastery, and visceral messaging."
    },
    {
        slug: "rsi-fatimah-social-media",
        title: "Social Media Designer – RSI Fatimah Cilacap",
        description: "Handled social media visual communication and health campaign branding for a hospital for 1 full year.",
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
        introduction: "Led visual content design under the hospital's Teaching Factory initiative, designing public health advisories, emergency protocols, and institutional branding.",
        purpose: "To communicate critical healthcare information with empathy, scientific clarity, and strong brand presence.",
        features: [
            "High-Volume Health Infographic Design",
            "Standardized Hospital Visual Brand Guidelines",
            "Patient Engagement Campaign Visuals"
        ],
        conclusion: "Elevated the hospital's public digital engagement by 65% with consistent, trustworthy visual assets."
    }
];

// --- Certifications ---
export const certifications = [
    {
        title: "Belajar Dasar Pemrograman JavaScript",
        issuer: "Dicoding Indonesia",
        date: "2024",
        credentialId: "DICODING-JS-2024",
        color: "from-amber-500/20 via-yellow-500/10 to-transparent",
        badge: "Verified Certificate",
        skills: ["ES6+", "Async/Await", "Event Loop", "OOP in JS"]
    },
    {
        title: "Belajar Dasar Cloud dan Gen AI di AWS",
        issuer: "Dicoding Indonesia",
        date: "2024",
        credentialId: "DICODING-AWS-2024",
        color: "from-orange-500/20 via-amber-500/10 to-transparent",
        badge: "AWS & AI",
        skills: ["Cloud Architecture", "AWS Bedrock", "S3 & EC2", "GenAI Principles"]
    },
    {
        title: "Oracle Database Programming With SQL",
        issuer: "Oracle Academy",
        date: "2023",
        credentialId: "ORACLE-SQL-2023",
        color: "from-red-500/20 via-rose-500/10 to-transparent",
        badge: "Database Master",
        skills: ["Complex Queries", "Joins & Subqueries", "PL/SQL", "Data Integrity"]
    },
    {
        title: "Oracle Database Design",
        issuer: "Oracle Academy",
        date: "2023",
        credentialId: "ORACLE-DESIGN-2023",
        color: "from-purple-500/20 via-indigo-500/10 to-transparent",
        badge: "System Architecture",
        skills: ["ERD Normalization", "Relational Modeling", "Schema Constraints", "DDL/DML"]
    }
];

// --- CTA Section ---
export const ctaSection = {
    title: "Ready to engineer your next system?",
    description: "Whether you need an enterprise ERP, an automated inventory pipeline, or a full-stack web application, let's turn your vision into high-performance software."
};
