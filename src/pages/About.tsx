import Navigation from "@/components/Navigation";
import AboutSection from "@/components/About";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Footer from "@/components/Footer";

const About = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <div className="pt-20">
      <AboutSection />
      <Skills />
      <Certifications />
    </div>
    <Footer />
  </div>
);

export default About;
