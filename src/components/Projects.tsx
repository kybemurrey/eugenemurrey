import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  github?: string;
  demo?: string;
  color: string;
}

const projects: Project[] = [
  {
    title: "Student Examination Management System",
    description: "Complete exam coordination system built with C, following SDLC methodology.",
    longDescription:
      "A terminal-based application managing student marks and exam coordination. Features role-based access for students and coordinators, data persistence, and structured reporting. Built entirely in C with careful attention to memory management and modular design.",
    tech: ["C", "SDLC", "File I/O", "Data Structures"],
    github: "https://github.com/eugenekibet/exam-system",
    color: "from-primary/20 to-primary/5",
  },
  {
    title: "Metal Fabrication Business Website",
    description: "Full-stack platform for portfolio showcase and lead generation.",
    longDescription:
      "A professional web platform for a metal fabrication business featuring project galleries, service listings, quote request forms, and client testimonials. Built with React frontend and Node.js backend with MongoDB for data storage.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/eugenekibet/metal-fab",
    demo: "#",
    color: "from-accent/20 to-accent/5",
  },
  {
    title: "Linux Environment Setup Guide",
    description: "Documentation-style project covering Debian 11 to 12 upgrade experience.",
    longDescription:
      "A comprehensive technical guide documenting the process of upgrading from Debian 11 (Bullseye) to Debian 12 (Bookworm), including troubleshooting steps, package management strategies, and post-upgrade optimization tips.",
    tech: ["Linux", "Debian", "Shell Scripting", "Documentation"],
    github: "https://github.com/eugenekibet/linux-guide",
    color: "from-green-500/20 to-green-500/5",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" className="py-24 md:py-32">
        <div className="container mx-auto px-6" ref={ref}>
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <p className="section-label mb-3">Projects</p>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Featured <span className="gradient-text">Work</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Real-world projects demonstrating system design, full-stack development, and Linux expertise.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                  onClick={() => setSelected(project)}
                  className="glass-card-hover cursor-pointer group overflow-hidden"
                >
                  <div className={`h-40 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                    <span className="font-mono text-sm text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity">
                      {`{ project_${String(index + 1).padStart(2, "0")} }`}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="text-xs font-mono px-2 py-1 rounded-md bg-secondary text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card max-w-lg w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close project details"
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </button>
            <h3 className="text-2xl font-bold mb-4">{selected.title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">{selected.longDescription}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {selected.tech.map((t) => (
                <span key={t} className="text-xs font-mono px-2 py-1 rounded-md bg-secondary text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              {selected.github && (
                <Button asChild variant="outline" size="sm" className="gap-2 rounded-full">
                  <a href={selected.github} target="_blank" rel="noopener noreferrer">
                    <Github size={16} /> GitHub
                  </a>
                </Button>
              )}
              {selected.demo && (
                <Button asChild size="sm" className="gap-2 rounded-full">
                  <a href={selected.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Projects;
