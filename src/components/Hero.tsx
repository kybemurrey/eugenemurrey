import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Instagram } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profilePhoto from "@/assets/eugene-profile.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden tech-grid">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex justify-center"
          >
            <Avatar className="w-32 h-32 border-4 border-primary/30 shadow-xl shadow-primary/10">
              <AvatarImage src={profilePhoto} alt="Eugene Kibet Murrey" className="object-cover object-top" />
              <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-primary to-accent text-primary-foreground">
                EK
              </AvatarFallback>
            </Avatar>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-label mb-6">ICT Specialist · Software Developer · Linux Enthusiast</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            Hi, I'm{" "}
            <span className="gradient-text">Eugene Kibet</span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-5xl font-light text-muted-foreground">
              <TypeAnimation
                sequence={[
                  "Building Systems That Solve Real Problems.",
                  3000,
                  "Crafting Full-Stack Web Applications.",
                  3000,
                  "Exploring AI & Linux Environments.",
                  3000,
                ]}
                repeat={Infinity}
                speed={40}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Passionate about system development, full-stack web solutions, and leveraging technology
            to create impactful software from Nairobi, Kenya.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Button asChild size="lg" className="rounded-full px-8 gap-2">
              <a href="#projects">View Projects <ArrowDown size={16} /></a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <a href="/Eugene_Kibet_CV.pdf" download>Download CV</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center gap-4"
          >
            {[
              { icon: Github, href: "https://github.com/kybemurrey", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/eugene-murrey-4815a7390", label: "LinkedIn" },
              { icon: Instagram, href: "https://www.instagram.com/kybe_murrey?igsh=NHNlcTJ0djR3ZWVm", label: "Instagram" },
              { icon: Mail, href: "mailto:eugenekibetmurrey@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors duration-300"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
