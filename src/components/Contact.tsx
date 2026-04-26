import { motion, useInView } from "framer-motion";
import { FormEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Github, Linkedin, Loader2, Mail, MapPin, Phone, Instagram, Send } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({ title: "Missing details", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    });

    setIsSubmitting(false);

    if (error) {
      toast({ title: "Message not sent", description: error.message, variant: "destructive" });
      return;
    }

    setFormData({ name: "", email: "", message: "" });
    toast({ title: "Message sent", description: "Thanks — Eugene will receive it in the website inbox." });
  };

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

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card p-8"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Send size={24} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Send a direct message</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Reach out about internships, freelance work, collaborations, or ICT support.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  value={formData.name}
                  onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Your name"
                  autoComplete="name"
                  disabled={isSubmitting}
                />
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                  placeholder="Your email"
                  autoComplete="email"
                  disabled={isSubmitting}
                />
                <Textarea
                  value={formData.message}
                  onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
                  placeholder="Write your message"
                  className="min-h-36 resize-none"
                  disabled={isSubmitting}
                />
                <Button type="submit" className="w-full rounded-full gap-2" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>

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
