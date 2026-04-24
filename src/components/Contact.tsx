import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, MapPin, Phone, Instagram, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name (at least 2 characters).")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address (e.g. you@example.com).")
    .max(255, "Email must be 255 characters or fewer."),
  message: z
    .string()
    .trim()
    .min(10, "Message is too short — please write at least 10 characters.")
    .max(2000, "Message must be 2000 characters or fewer."),
});

type FormState = { name: string; email: string; message: string };
type FieldErrors = Partial<Record<keyof FormState, string>>;
type TouchedState = Partial<Record<keyof FormState, boolean>>;

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<TouchedState>({});
  const [sending, setSending] = useState(false);

  const validateField = (field: keyof FormState, value: string): string | undefined => {
    const fieldSchema = contactSchema.shape[field];
    const result = fieldSchema.safeParse(value);
    return result.success ? undefined : result.error.issues[0]?.message;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, form[field]) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState | undefined;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setTouched({ name: true, email: true, message: true });
      toast({
        title: "Please fix the highlighted fields",
        description: "A few details still need your attention before sending.",
        variant: "destructive",
      });
      return;
    }
    setSending(true);
    const { error } = await supabase.from("contact_submissions").insert(parsed.data);
    setSending(false);
    if (error) {
      const friendly =
        error.code === "23514"
          ? "One of your fields didn't meet our limits. Please shorten it and try again."
          : error.message?.toLowerCase().includes("network") || error.message?.toLowerCase().includes("fetch")
          ? "Network error — please check your connection and try again."
          : "Something went wrong on our end. Please try again in a moment.";
      toast({
        title: "Could not send message",
        description: friendly,
        variant: "destructive",
      });
      return;
    }
    setForm({ name: "", email: "", message: "" });
    setErrors({});
    setTouched({});
    toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
  };

  const socials = [
    { icon: Github, href: "https://github.com/kybemurrey", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/eugene-murrey-4815a7390", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/kybe_murrey?igsh=NHNlcTJ0djR3ZWVm", label: "Instagram" },
    { icon: Mail, href: "mailto:murreyoxgene@gmail.com", label: "Email" },
    { icon: Phone, href: "https://wa.me/254715011455", label: "WhatsApp" },
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
              noValidate
              className="glass-card p-8 space-y-6"
            >
              <FormField
                id="contact-name"
                label="Name"
                error={errors.name}
                touched={touched.name}
                value={form.name}
              >
                <Input
                  id="contact-name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  className={`rounded-lg ${errors.name && touched.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  maxLength={100}
                  aria-invalid={!!(errors.name && touched.name)}
                  aria-describedby="contact-name-error"
                  autoComplete="name"
                />
              </FormField>

              <FormField
                id="contact-email"
                label="Email"
                error={errors.email}
                touched={touched.email}
                value={form.email}
              >
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  className={`rounded-lg ${errors.email && touched.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  maxLength={255}
                  aria-invalid={!!(errors.email && touched.email)}
                  aria-describedby="contact-email-error"
                  autoComplete="email"
                />
              </FormField>

              <FormField
                id="contact-message"
                label="Message"
                error={errors.message}
                touched={touched.message}
                value={form.message}
                showCount
                maxLength={2000}
              >
                <Textarea
                  id="contact-message"
                  placeholder="Tell me a bit about your project or idea…"
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  className={`rounded-lg min-h-[140px] ${errors.message && touched.message ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  maxLength={2000}
                  aria-invalid={!!(errors.message && touched.message)}
                  aria-describedby="contact-message-error"
                />
              </FormField>

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
