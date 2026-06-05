import Navigation from "@/components/Navigation";
import AboutSection from "@/components/About";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const About = () => (
  <div className="min-h-screen bg-background">
    <Seo
      title="About Eugene Kibet — ICT Specialist in Mombasa"
      description="Eugene Kibet Murrey is an IT specialist and prompt engineer studying at the Technical University of Mombasa with skills in full-stack, AI/ML, and networking."
      path="/about"
    />
    <Navigation />
    <main className="pt-20">
      <h1 className="sr-only">About Eugene Kibet Murrey</h1>
      <AboutSection />
      <Skills />
      <Certifications />
    </main>
    <Footer />
  </div>
);

export default About;
