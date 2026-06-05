import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const categories = ["ALL", ...Array.from(new Set(blogPosts.map((p) => p.category)))];
  const filtered = activeCategory === "ALL" ? blogPosts : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Blog — Tech Insights by Eugene Kibet"
        description="Tutorials, Linux tips, AI tools, and lessons from building real-world projects, by Eugene Kibet Murrey."
        path="/blog"
      />
      <Navigation />

      <main>
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="section-label mb-3">Blog</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tech <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-10">
              Tutorials, Linux tips, AI tools, and lessons from building real-world projects.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-mono tracking-wider px-4 py-2 rounded-full border transition-colors duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.id}`} className="glass-card-hover block h-full p-6">
                  <span className="text-xs font-mono text-primary">{post.category}</span>
                  <h2 className="text-lg font-semibold mt-2 mb-3 hover:text-primary transition-colors">{post.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-xs text-muted-foreground gap-3 mt-auto">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
