import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { blogPosts } from "@/data/blogPosts";
import { ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Seo
          title="Post Not Found — Eugene Kibet Blog"
          description="This blog post could not be found."
          path={`/blog/${id ?? ""}`}
        />
        <Navigation />
        <main className="pt-32 pb-32 text-center container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-primary hover:underline">← Back to Blog</Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Simple markdown-ish rendering
  const renderContent = (content: string) =>
    content.split("\n").map((line, i) => {
      if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold mt-8 mb-4">{line.slice(3)}</h2>;
      if (line.startsWith("- ")) return <li key={i} className="ml-6 text-muted-foreground mb-1">{line.slice(2)}</li>;
      if (line.trim() === "") return <br key={i} />;
      return <p key={i} className="text-muted-foreground leading-relaxed mb-3">{line}</p>;
    });

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${post.title} — Eugene Kibet Blog`}
        description={post.excerpt}
        path={`/blog/${post.id}`}
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          author: { "@type": "Person", name: post.author },
          datePublished: post.date,
          articleSection: post.category,
          url: `https://eugenemurrey.lovable.app/blog/${post.id}`,
        }}
      />
      <Navigation />
      <main>
      <article className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            <span className="section-label block mb-3">{post.category}</span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-10">
              <span>{post.author}</span>
              <span>·</span>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            <div className="prose max-w-none">{renderContent(post.content)}</div>
          </motion.div>
        </div>
      </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
