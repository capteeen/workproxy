import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, Calendar, User } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const dynamic = 'force-dynamic';

function cleanContent(text: string): string {
  let cleaned = text;

  // Strip emojis
  cleaned = cleaned.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}\u{FE0F}]/gu, '');

  // Remove ** at end of lines (used as section dividers)
  cleaned = cleaned.replace(/\s*\*\*\s*$/gm, '');

  // Remove horizontal rules (*** or --- or ___) 
  cleaned = cleaned.replace(/^\s*[\*\-_]{3,}\s*$/gm, '');

  // Remove ** at start of lines (broken bold attempts)
  cleaned = cleaned.replace(/^\*\*\s*/gm, '');

  // Remove stray * * patterns (spaced double asterisks)
  cleaned = cleaned.replace(/\*\s+\*/g, '');

  // Convert * at start of line to proper bullet (- )
  cleaned = cleaned.replace(/^\*\s*/gm, '- ');

  // Remove trailing lone * at end of lines
  cleaned = cleaned.replace(/\s*\*\s*$/gm, '');

  // Remove empty list items (- with no text after)
  cleaned = cleaned.replace(/^\s*[-*+]\s*$/gm, '');

  // Ensure ## headings are on their own line
  cleaned = cleaned.replace(/([^\n])(#{1,6}\s)/g, '$1\n\n$2');

  // Ensure numbered list items (2. 3. etc.) start on new lines
  cleaned = cleaned.replace(/([^\n\d])(\d+\.\s)/g, '$1\n\n$2');

  // Ensure bullet items start on new lines
  cleaned = cleaned.replace(/([^\n])(- )/g, '$1\n$2');

  // Clean up excessive newlines
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  // Clean up extra spaces
  cleaned = cleaned.replace(/ {2,}/g, ' ');

  return cleaned.trim();
}

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
              {cleanContent(post.title)}
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
              {cleanContent(post.content)}
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
