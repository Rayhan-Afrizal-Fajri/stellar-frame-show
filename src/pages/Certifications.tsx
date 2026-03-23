import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Award } from "lucide-react";

const certs = [
  { title: "AWS Solutions Architect", issuer: "Amazon Web Services", date: "2024", color: "from-orange-500/20 to-orange-600/5" },
  { title: "Google Cloud Professional", issuer: "Google Cloud", date: "2024", color: "from-blue-500/20 to-blue-600/5" },
  { title: "Meta Front-End Developer", issuer: "Meta / Coursera", date: "2023", color: "from-sky-500/20 to-sky-600/5" },
  { title: "Certified Kubernetes Admin", issuer: "CNCF", date: "2023", color: "from-indigo-500/20 to-indigo-600/5" },
  { title: "React Advanced Patterns", issuer: "Frontend Masters", date: "2023", color: "from-cyan-500/20 to-cyan-600/5" },
  { title: "TypeScript Mastery", issuer: "Udemy", date: "2022", color: "from-emerald-500/20 to-emerald-600/5" },
];

const Certifications = () => (
  <PageTransition>
    <div className="container max-w-5xl mx-auto px-6 pt-24 sm:pt-32">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-2">Certifications</h1>
        <p className="text-muted-foreground mb-12">Professional certifications and courses I've completed.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certs.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="glass-card-hover p-6 flex flex-col gap-4 cursor-default"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center`}>
              <Award size={22} className="text-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{cert.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{cert.issuer}</p>
            </div>
            <span className="text-xs text-muted-foreground font-mono mt-auto">{cert.date}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </PageTransition>
);

export default Certifications;
