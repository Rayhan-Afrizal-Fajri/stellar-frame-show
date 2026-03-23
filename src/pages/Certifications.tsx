import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import { Award } from "lucide-react";
import { certifications } from "@/data/portfolio";

const Certifications = () => (
  <PageTransition>
    <div className="container max-w-5xl mx-auto px-6 pt-24 sm:pt-32">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-2">Certifications</h1>
        <p className="text-muted-foreground mb-12">Professional certifications and courses I've completed.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certifications.map((cert, i) => (
          <motion.div key={cert.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }} className="glass-card-hover p-6 flex flex-col gap-4 cursor-default">
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
    <Footer />
  </PageTransition>
);

export default Certifications;
