export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "getting-started-with-c-programming",
    title: "Getting Started with C Programming for System Development",
    excerpt: "A beginner-friendly guide to learning C programming and how it applies to building real-world systems.",
    content: `C remains one of the most powerful languages for system-level programming. In this guide, we'll explore the fundamentals and how to apply them to real projects like student management systems.\n\n## Why C?\n\nC gives you direct control over memory and hardware, making it ideal for embedded systems, operating systems, and performance-critical applications.\n\n## Key Concepts\n\n- Pointers and memory management\n- Structs for data modeling\n- File I/O for persistence\n- Modular design with header files\n\n## Building a Student System\n\nStart with defining your data structures, then implement CRUD operations using file-based storage. Follow SDLC phases: requirements, design, implementation, testing, and deployment.`,
    author: "Eugene Kibet",
    date: "2024-03-15",
    readTime: "6 min read",
    category: "PROGRAMMING",
  },
  {
    id: "upgrading-debian-11-to-12",
    title: "How I Upgraded from Debian 11 to Debian 12 (Bookworm)",
    excerpt: "Step-by-step walkthrough of upgrading a Debian system with troubleshooting tips for common issues.",
    content: `Upgrading your Debian system can feel daunting, but with the right approach it's straightforward. Here's my experience upgrading from Bullseye to Bookworm.\n\n## Preparation\n\n1. Back up all important data\n2. Update current system fully\n3. Review third-party repositories\n\n## The Upgrade Process\n\nUpdate your sources.list to point to bookworm, then run apt update && apt full-upgrade. Monitor the process and resolve any dependency conflicts.\n\n## Post-Upgrade\n\n- Verify all services are running\n- Check kernel version\n- Remove obsolete packages\n- Test applications`,
    author: "Eugene Kibet",
    date: "2024-02-20",
    readTime: "8 min read",
    category: "LINUX",
  },
  {
    id: "ai-tools-for-students",
    title: "Top AI Tools Every Student Should Know in 2024",
    excerpt: "Discover AI-powered tools that can supercharge your studies, coding, and productivity.",
    content: `AI is transforming how we learn and work. Here are the tools I recommend for students.\n\n## For Coding\n\n- GitHub Copilot for code suggestions\n- ChatGPT for debugging and explanations\n- Cursor for AI-first coding\n\n## For Productivity\n\n- Notion AI for note organization\n- Grammarly for writing\n- Otter.ai for lecture transcription\n\n## For Research\n\n- Perplexity AI for quick research\n- Elicit for academic paper analysis\n- SciSpace for understanding papers\n\n## Tips for Effective Use\n\nAlways verify AI outputs. Use these tools to accelerate learning, not replace understanding.`,
    author: "Eugene Kibet",
    date: "2024-01-10",
    readTime: "5 min read",
    category: "AI",
  },
];
