import { Github, Linkedin, Mail, Instagram } from "lucide-react";

const Footer = () => (
  <footer className="py-12 border-t border-border">
    <div className="container mx-auto px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Eugene Kibet Murrey. Built with React & Tailwind.
        </p>
        <div className="flex gap-4">
          {[
            { icon: Github, href: "https://github.com/kybemurrey" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/eugene-murrey-4815a7390" },
            { icon: Instagram, href: "https://www.instagram.com/kybe_murrey?igsh=NHNlcTJ0djR3ZWVm" },
            { icon: Mail, href: "mailto:eugenekibetmurrey@gmail.com" },
          ].map(({ icon: Icon, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Social link"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
