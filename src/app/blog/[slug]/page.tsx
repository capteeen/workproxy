import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, Calendar, User } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { author: { select: { name: true, email: true } } }
  });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <section className="section" style={{ background: "#ffffff", minHeight: "80vh", padding: "60px 0" }}>
        <div className="container" style={{ maxWidth: 900, marginLeft: "auto", marginRight: "auto" }}>
          <Link href="/blog" className="text-secondary hover-accent" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 32, textDecoration: "none", fontWeight: 600 }}>
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          <header style={{ marginBottom: 40 }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, marginBottom: 24, lineHeight: 1.25, color: "var(--text-primary)" }}>
              {post.title}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 24, color: "var(--text-muted)", fontSize: 15, paddingBottom: 24, borderBottom: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <User size={16} /> {post.author.name || post.author.email}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Calendar size={16} /> {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </header>

          {post.imageUrl && (
            <div style={{ width: '100%', borderRadius: 16, overflow: 'hidden', marginBottom: 48, background: '#f8fafc' }}>
              <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          )}

          <article className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </article>
        </div>
      </section>

      <Footer />

      <style>{`
        .hover-accent:hover { color: var(--accent-primary) !important; }
        
        .markdown-content {
          font-size: 17px;
          line-height: 1.8;
          color: #334155;
        }
        .markdown-content h1, .markdown-content h2, .markdown-content h3 {
          font-family: var(--font-display);
          color: var(--text-primary);
          margin-top: 2em;
          margin-bottom: 0.8em;
          font-weight: 700;
        }
        .markdown-content h2 { font-size: 28px; }
        .markdown-content h3 { font-size: 22px; }
        .markdown-content p { margin-bottom: 1.5em; }
        .markdown-content a { color: var(--accent-primary); text-decoration: underline; }
        .markdown-content ul, .markdown-content ol { margin-bottom: 1.5em; padding-left: 24px; }
        .markdown-content li { margin-bottom: 0.5em; }
        .markdown-content blockquote {
          border-left: 4px solid var(--accent-primary);
          padding-left: 16px;
          color: var(--text-secondary);
          font-style: italic;
          margin: 2em 0;
          background: #f8fafc;
          padding: 16px;
          border-radius: 0 8px 8px 0;
        }
        .markdown-content img {
          max-width: 100%;
          border-radius: 12px;
          margin: 2em 0;
        }
        .markdown-content pre {
          background: #0f172a;
          color: #f8fafc;
          padding: 16px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1.5em 0;
        }
        .markdown-content code {
          background: #f1f5f9;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.9em;
          color: #db2777;
        }
        .markdown-content pre code {
          background: transparent;
          color: inherit;
          padding: 0;
        }
      `}</style>
    </>
  );
}
