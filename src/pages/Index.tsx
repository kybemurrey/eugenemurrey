import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Seo
        title="Eugene Kibet Murrey — ICT Specialist & Software Developer"
        description="Portfolio of Eugene Kibet Murrey — ICT specialist and full-stack developer in Mombasa, Kenya. Projects in C, Linux, web development, and AI."
        path="/"
      />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
