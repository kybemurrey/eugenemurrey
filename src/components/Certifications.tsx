import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, BookOpen, Sparkles } from "lucide-react";

const certs = [
  { icon: BookOpen, title: "Linux Fundamentals", issuer: "Self-study & Practice", year: "2023" },
  { icon: Award, title: "Web Development", issuer: "Online Courses", year: "2024" },
  { icon: Sparkles, title: "AI Tools & Automation", issuer: "Continuous Learning", year: "2024" },
];

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-24 md:py-32 bg-muted/50">
      <div className="container mx-auto px-6" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="section-label mb-3">Learning</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Certifications & <span className="gradient-text">Growth</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {certs.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className="glass-card-hover p-6 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <cert.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{cert.title}</h3>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                <p className="text-xs font-mono text-primary mt-2">{cert.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
