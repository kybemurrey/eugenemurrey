import Navigation from "@/components/Navigation";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

const Work = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <div className="pt-20">
      <Projects />
    </div>
    <Footer />
  </div>
);

export default Work;
