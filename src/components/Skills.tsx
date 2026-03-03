import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SkillBarProps {
  name: string;
  level: number;
  delay: number;
  inView: boolean;
}

const SkillBar = ({ name, level, delay, inView }: SkillBarProps) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="font-medium">{name}</span>
      <span className="text-muted-foreground font-mono">{level}%</span>
    </div>
    <div className="h-2 rounded-full bg-secondary overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : {}}
        transition={{ duration: 1, delay, ease: "easeOut" }}
        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
      />
    </div>
  </div>
);

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = [
    {
      title: "Programming",
      skills: [
        { name: "C", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "HTML & CSS", level: 90 },
        { name: "TypeScript", level: 70 },
      ],
    },
    {
      title: "Tools & Platforms",
      skills: [
        { name: "Git & GitHub", level: 85 },
        { name: "Linux (Debian/Ubuntu)", level: 90 },
        { name: "VS Code", level: 88 },
        { name: "MongoDB", level: 65 },
      ],
    },
    {
      title: "Concepts",
      skills: [
        { name: "SDLC", level: 88 },
        { name: "System Design", level: 75 },
        { name: "API Development", level: 72 },
        { name: "Responsive Design", level: 85 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 md:py-32 bg-muted/50">
      <div className="container mx-auto px-6" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="section-label mb-3">Skills</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              My <span className="gradient-text">Tech Stack</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A blend of programming languages, development tools, and engineering concepts I work with daily.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((cat, catIdx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * catIdx }}
                className="glass-card p-6 space-y-6"
              >
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {cat.title}
                </h3>
                <div className="space-y-5">
                  {cat.skills.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={0.2 + i * 0.1}
                      inView={isInView}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
