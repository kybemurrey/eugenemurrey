import Navigation from "@/components/Navigation";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const Work = () => (
  <div className="min-h-screen bg-background">
    <Seo
      title="Projects — Eugene Kibet Murrey"
      description="Portfolio projects by Eugene Kibet — system development in C, full-stack web platforms, and Linux engineering work."
      path="/projects"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Portfolio Projects",
        url: "https://eugenemurrey.lovable.app/projects",
        author: { "@type": "Person", name: "Eugene Kibet Murrey" },
      }}
    />
    <Navigation />
    <main className="pt-20">
      <h1 className="sr-only">Portfolio Projects</h1>
      <Projects />
    </main>
    <Footer />
  </div>
);

export default Work;
