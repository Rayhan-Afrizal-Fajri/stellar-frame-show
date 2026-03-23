import { motion } from "framer-motion";
import { MapPin, Download, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import profileImg from "@/assets/profile.jpg";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Index = () => (
  <PageTransition>
    <div className="relative overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-muted/50 blur-3xl animate-float" />
      <div className="absolute bottom-20 -right-32 w-80 h-80 rounded-full bg-muted/30 blur-3xl animate-float" style={{ animationDelay: "3s" }} />

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
              Hi, I'm <span className="text-gradient">Alex Carter</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Full-stack developer crafting clean, performant web experiences. 
              Passionate about design systems, open source, and turning ideas into reality.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={16} />
            <span className="text-sm">San Francisco, CA</span>
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
    </div>
  </PageTransition>
);

export default Index;
