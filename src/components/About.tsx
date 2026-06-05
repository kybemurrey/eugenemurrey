import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Terminal, Server, Globe, Cpu } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      icon: Terminal,
      title: "System Development",
      description: "Building robust systems using SDLC methodology, from requirements to deployment.",
    },
    {
      icon: Server,
      title: "Linux Environments",
      description: "Deep experience with Debian/Ubuntu — server setup, scripting, and system administration.",
    },
    {
      icon: Globe,
      title: "Full-Stack Web Dev",
      description: "Creating responsive, modern web applications with React, Node.js, and databases.",
    },
    {
      icon: Cpu,
      title: "AI Exploration",
      description: "Leveraging AI tools to enhance productivity, learning, and software development.",
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container mx-auto px-6" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="section-label mb-3">About Me</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Turning Ideas Into <span className="gradient-text">Real Solutions</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              I'm Eugene Kibet, a motivated IT specialist and prompt engineer based in Mombasa, Kenya.
              Currently studying at the Technical University of Mombasa, I combine academic learning
              with hands-on experience in full-stack development, AI/ML, and networking.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className="glass-card-hover p-6"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <card.icon size={24} className="text-primary" />
                </div>
                <h2 className="text-lg font-semibold mb-2">{card.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
