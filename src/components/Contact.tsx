import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, MapPin, Phone, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", message: "" });
      toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
    }, 1500);
  };

  const socials = [
    { icon: Github, href: "https://github.com/kybemurrey", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/eugene-murrey-4815a7390", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/kybe_murrey?igsh=NHNlcTJ0djR3ZWVm", label: "Instagram" },
    { icon: Mail, href: "mailto:eugenekibetmurrey@gmail.com", label: "Email" },
    { icon: Phone, href: "https://wa.me/254700000000", label: "WhatsApp" },
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

          <div className="grid md:grid-cols-2 gap-12">
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="glass-card p-8 space-y-6"
            >
              <Input
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-lg"
                maxLength={100}
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-lg"
                maxLength={255}
              />
              <Textarea
                placeholder="Your Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="rounded-lg min-h-[140px]"
                maxLength={1000}
              />
              <Button type="submit" className="w-full rounded-full" disabled={sending}>
                {sending ? "Sending..." : "Send Message"}
              </Button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="glass-card p-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">Nairobi, Kenya</p>
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
                  <a href="mailto:eugenekibetmurrey@gmail.com">
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
