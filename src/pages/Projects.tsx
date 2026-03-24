import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { projects, projectCategories, type ProjectCategory } from "@/data/portfolio";

function countByCategory(cat: ProjectCategory) {
  return cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
}

const Projects = () => {
  const [active, setActive] = useState<ProjectCategory>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <PageTransition>
      <div className="container max-w-5xl mx-auto px-6 pt-24 sm:pt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-2">Projects</h1>
          <p className="text-muted-foreground mb-8">A selection of things I've built and shipped.</p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-10">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                active === cat ? "bg-foreground text-background" : "bg-accent text-accent-foreground hover:bg-accent/80"
              }`}
            >
              {cat} ({countByCategory(cat)})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project, i) => (
            <motion.div key={project.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.07 }}>
              <Link to={`/projects/${project.slug}`} className="glass-card-hover p-6 flex flex-col gap-4 h-full group cursor-pointer">
                {project.image && (
                  <div className="rounded-xl overflow-hidden border border-border -mx-1 -mt-1">
                    <img src={project.image} alt={project.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-full bg-accent text-accent-foreground">{t}</span>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors pt-1">View Details →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Projects;
