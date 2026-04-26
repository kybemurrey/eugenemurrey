import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, MapPin, Phone, Instagram } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const socials = [
    { icon: Github, href: "https://github.com/kybemurrey", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/eugene-murrey-4815a7390", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/kybe_murrey?igsh=NHNlcTJ0djR3ZWVm", label: "Instagram" },
    { icon: Mail, href: "mailto:murreyoxgene@gmail.com", label: "Email" },
  ];

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container mx-auto px-6" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="section-label mb-3">Contact</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Let's <span className="gradient-text">Connect</span>
            </h2>
          </motion.div>

          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-8"
            >
              <div className="glass-card p-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">Mombasa, Kenya</p>
                </div>
              </div>

              <div className="glass-card p-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:murreyoxgene@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    murreyoxgene@gmail.com
                  </a>
                </div>
              </div>

              <div className="glass-card p-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">Mobile</p>
                  <a href="tel:+254715011455" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    0715 011 455
                  </a>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-4">Find me online</p>
                <div className="flex gap-3">
                  {socials.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors duration-300"
                      aria-label={label}
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Hire Me Banner */}
              <div className="glass-card p-6 bg-gradient-to-br from-primary/10 to-accent/10">
                <h3 className="font-bold text-lg mb-2">🚀 Open for Opportunities</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Looking for internships, freelance projects, and collaborations.
                </p>
                <Button asChild className="rounded-full gap-2">
                  <a href="mailto:murreyoxgene@gmail.com">
                    <Mail size={16} /> Hire Me
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
