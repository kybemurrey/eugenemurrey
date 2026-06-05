import Navigation from "@/components/Navigation";
import ContactSection from "@/components/Contact";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const Contact = () => (
  <div className="min-h-screen bg-background">
    <Seo
      title="Contact Eugene Kibet — Get in Touch"
      description="Reach Eugene Kibet Murrey for collaboration, freelance projects, or internship opportunities. Based in Mombasa, Kenya."
      path="/contact"
    />
    <Navigation />
    <main className="pt-20">
      <h1 className="sr-only">Contact Eugene Kibet Murrey</h1>
      <ContactSection />
    </main>
    <Footer />
  </div>
);

export default Contact;
