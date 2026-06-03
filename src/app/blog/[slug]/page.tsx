import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, Calendar, User, Clock, ArrowRight, BookOpen } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

const MONO = "ui-monospace, 'SF Mono', SFMono-Regular, Menlo, monospace";
const SITE = "https://workproxy.fun";

// Strip markdown to plain text (for meta description + schema)
function toPlain(md: string): string {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Parse a "## FAQ"/"Frequently Asked Questions" section into Q&A pairs for FAQ schema
function parseFaq(md: string): { q: string; a: string }[] {
  const out: { q: string; a: string }[] = [];
  let inFaq = false, q = "", a: string[] = [];
  const flush = () => { if (q && a.length) out.push({ q, a: toPlain(a.join(" ")) }); q = ""; a = []; };
  for (const line of md.split("\n")) {
    if (/^##\s/.test(line)) {
      flush();
      inFaq = /faq|frequently asked/i.test(line);
      continue;
    }
    if (!inFaq) continue;
    if (/^###\s/.test(line)) { flush(); q = line.replace(/^###\s+/, "").trim(); }
    else if (line.trim()) a.push(line.trim());
  }
  flush();
  return out;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return { title: "Article — Work Proxy" };
  const description = toPlain(post.content).slice(0, 155);
  const url = `${SITE}/blog/${slug}`;
  const images = post.imageUrl ? [post.imageUrl] : [];
  return {
    title: `${post.title} | Work Proxy`,
    description,
    alternates: { canonical: url },
    openGraph: { title: post.title, description, type: "article", url, images },
    twitter: { card: "summary_large_image", title: post.title, description, images },
  };
}

function cleanContent(text: string): string {
  let c = text;
  c = c.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}\u{FE0F}]/gu, '');
  c = c.replace(/\s*\*\*\s*$/gm, '').replace(/^\s*[\*\-_]{3,}\s*$/gm, '').replace(/^\*\*\s*/gm, '').replace(/\*\s+\*/g, '').replace(/^\*\s*/gm, '- ').replace(/\s*\*\s*$/gm, '').replace(/^\s*[-*+]\s*$/gm, '');
  c = c.replace(/([^\n])(#{1,6}\s)/g, '$1\n\n$2').replace(/([^\n\d])(\d+\.\s)/g, '$1\n\n$2').replace(/([^\n])(- )/g, '$1\n$2');
  c = c.replace(/\n{3,}/g, '\n\n').replace(/ {2,}/g, ' ');
  return c.trim();
}

function readTime(content: string) {
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [post, morePosts] = await Promise.all([
    prisma.blogPost.findUnique({
      where: { slug },
      include: { author: { select: { name: true, email: true } } }
    }),
    prisma.blogPost.findMany({
      where: { published: true, NOT: { slug } },
      orderBy: { createdAt: 'desc' },
      take: 3,
      include: { author: { select: { name: true } } }
    }),
  ]);

  if (!post || !post.published) notFound();

  const mins = readTime(post.content);
  const initials = (post.author.name ?? post.author.email ?? 'W').substring(0, 2).toUpperCase();

  // Structured data: Article (+ FAQ if the post has an FAQ section)
  const url = `${SITE}/blog/${slug}`;
  const faqs = parseFaq(post.content);
  const graph: any[] = [
    {
      "@type": "Article",
      headline: post.title,
      description: toPlain(post.content).slice(0, 155),
      image: post.imageUrl ? [post.imageUrl] : undefined,
      datePublished: new Date(post.createdAt).toISOString(),
      dateModified: new Date(post.updatedAt).toISOString(),
      author: { "@type": "Organization", name: "Work Proxy", url: SITE },
      publisher: { "@type": "Organization", name: "Work Proxy", logo: { "@type": "ImageObject", url: `${SITE}/logo.jpg` } },
      mainEntityOfPage: url,
    },
  ];
  if (faqs.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      {/* ── POST HERO ── */}
      <div className="bp-hero">
        {post.imageUrl ? (
          <div className="bp-hero-img-wrap">
            <img src={post.imageUrl} alt={cleanContent(post.title)} className="bp-hero-img" />
            <div className="bp-hero-img-overlay" />
          </div>
        ) : (
          <div className="bp-hero-gradient">
            <div className="bp-hero-dots" />
          </div>
        )}
        <div className="container bp-hero-content">
          <Link href="/blog" className="bp-back">
            <ArrowLeft size={15} /> All articles
          </Link>
          <div className="bp-hero-tags">
            <span className="bp-tag">Platform Update</span>
          </div>
          <h1 className="bp-title">{cleanContent(post.title)}</h1>
          <div className="bp-meta">
            <div className="bp-author-chip">
              <div className="bp-avatar">{initials}</div>
              <span>{post.author.name ?? post.author.email}</span>
            </div>
            <span className="bp-meta-dot" />
            <span className="bp-meta-item">
              <Calendar size={14} />
              {new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="bp-meta-dot" />
            <span className="bp-meta-item">
              <Clock size={14} /> {mins} min read
            </span>
          </div>
        </div>
      </div>

      {/* ── ARTICLE BODY ── */}
      <div className="bp-layout">
        <div className="container">
          <div className="bp-content-wrap">
            <article className="bp-article markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {cleanContent(post.content)}
              </ReactMarkdown>
            </article>

            {/* ── AUTHOR CARD ── */}
            <div className="bp-author-card">
              <div className="bp-author-avatar-lg">{initials}</div>
              <div>
                <div className="bp-author-name">{post.author.name ?? post.author.email}</div>
                <div className="bp-author-role">Work Proxy Team</div>
              </div>
            </div>

            {/* ── BACK LINK ── */}
            <Link href="/blog" className="bp-back-btn">
              <ArrowLeft size={16} /> Back to all articles
            </Link>
          </div>
        </div>
      </div>

      {/* ── MORE ARTICLES ── */}
      {morePosts.length > 0 && (
        <div className="bp-more">
          <div className="container">
            <div className="bp-more-head">
              <h2 className="bp-more-title">More articles</h2>
              <Link href="/blog" className="bp-more-all">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="bp-more-grid">
              {morePosts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="bp-more-card">
                  {p.imageUrl ? (
                    <div className="bp-more-cover">
                      <img src={p.imageUrl} alt={cleanContent(p.title)} className="bp-more-img" />
                    </div>
                  ) : (
                    <div className="bp-more-cover bp-more-cover--grad" style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}>
                      <div className="bp-more-dots" />
                      <BookOpen size={24} className="bp-more-icon" />
                    </div>
                  )}
                  <div className="bp-more-body">
                    <h3 className="bp-more-card-title">{cleanContent(p.title)}</h3>
                    <div className="bp-more-meta">
                      <span className="bp-meta-item" style={{ fontSize: 12 }}>
                        <Clock size={12} /> {readTime(p.content)} min
                      </span>
                      <span className="bp-meta-item" style={{ fontSize: 12 }}>
                        {new Date(p.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style>{`
        /* ── HERO ── */
        .bp-hero { position: relative; min-height: 400px; display: flex; align-items: flex-end; }
        .bp-hero-img-wrap { position: absolute; inset: 0; overflow: hidden; }
        .bp-hero-img { width: 100%; height: 100%; object-fit: cover; }
        .bp-hero-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(7,11,20,0.92) 0%, rgba(7,11,20,0.5) 60%, rgba(7,11,20,0.2) 100%); }
        .bp-hero-gradient { position: absolute; inset: 0; background: linear-gradient(135deg, #0B1220 0%, #1E1B4B 60%, #0B1120 100%); }
        .bp-hero-dots { position: absolute; inset: 0; background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.07) 1px, transparent 0); background-size: 28px 28px; }

        .bp-hero-content { position: relative; padding-bottom: 52px; padding-top: 80px; max-width: 820px; }
        .bp-back {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.6);
          margin-bottom: 24px; text-decoration: none; transition: color .2s;
          font-family: ${MONO};
        }
        .bp-back:hover { color: #fff; }
        .bp-hero-tags { margin-bottom: 16px; }
        .bp-tag {
          font-family: ${MONO}; font-size: 11px; font-weight: 700; letter-spacing: .07em;
          text-transform: uppercase; color: #fff;
          background: rgba(37,99,235,0.6); border: 1px solid rgba(37,99,235,0.4);
          padding: 4px 12px; border-radius: var(--radius-full);
        }
        .bp-title {
          font-family: var(--font-display);
          font-size: clamp(26px, 4vw, 46px); font-weight: 800;
          letter-spacing: -.03em; line-height: 1.1;
          color: #fff; margin-bottom: 24px;
        }
        .bp-meta { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .bp-author-chip { display: flex; align-items: center; gap: 8px; }
        .bp-avatar {
          width: 30px; height: 30px; border-radius: 50%;
          background: linear-gradient(135deg, #2563EB, #7C3AED);
          color: #fff; font-size: 12px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
        }
        .bp-author-chip span { font-size: 13.5px; font-weight: 600; color: rgba(255,255,255,0.85); }
        .bp-meta-dot { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,0.3); }
        .bp-meta-item { display: flex; align-items: center; gap: 5px; font-size: 13px; color: rgba(255,255,255,0.6); }

        /* ── LAYOUT ── */
        .bp-layout { background: var(--bg-secondary); padding: 56px 0 72px; }
        .bp-content-wrap { max-width: 720px; margin: 0 auto; }

        /* ── ARTICLE TYPOGRAPHY ── */
        .markdown-content {
          font-size: 17.5px; line-height: 1.85; color: var(--text-secondary);
          margin-bottom: 52px;
        }
        .markdown-content h1, .markdown-content h2, .markdown-content h3, .markdown-content h4 {
          font-family: var(--font-display); color: var(--text-primary);
          letter-spacing: -.02em; line-height: 1.2;
        }
        .markdown-content h1 { font-size: clamp(26px, 3vw, 36px); font-weight: 800; margin: 2.4em 0 .8em; }
        .markdown-content h2 { font-size: clamp(22px, 2.5vw, 28px); font-weight: 700; margin: 2em 0 .7em; padding-bottom: 10px; border-bottom: 1px solid var(--border); }
        .markdown-content h3 { font-size: 21px; font-weight: 700; margin: 1.8em 0 .6em; }
        .markdown-content h4 { font-size: 17px; font-weight: 700; margin: 1.5em 0 .5em; color: var(--text-secondary); }
        .markdown-content p { margin-bottom: 1.6em; }
        .markdown-content a { color: var(--accent-primary); text-decoration: underline; text-underline-offset: 3px; }
        .markdown-content a:hover { color: var(--accent-secondary); }
        .markdown-content ul, .markdown-content ol {
          margin-bottom: 1.6em; padding-left: 26px; display: flex; flex-direction: column; gap: 8px;
        }
        .markdown-content li { line-height: 1.7; }
        .markdown-content blockquote {
          border-left: 3px solid var(--accent-primary);
          margin: 2em 0; padding: 20px 24px;
          background: var(--bg-glass-blue); border-radius: 0 var(--radius-md) var(--radius-md) 0;
          font-size: 18px; font-style: italic; color: var(--text-primary); line-height: 1.7;
        }
        .markdown-content blockquote p { margin-bottom: 0; }
        .markdown-content img { max-width: 100%; border-radius: var(--radius-lg); margin: 2em 0; box-shadow: var(--shadow-md); }
        .markdown-content pre {
          background: #0B1220; color: #CBD5E1;
          padding: 22px; border-radius: var(--radius-md); overflow-x: auto;
          margin: 1.8em 0; font-family: ${MONO}; font-size: 14px; line-height: 1.75;
          border: 1px solid rgba(255,255,255,0.07);
        }
        .markdown-content code {
          font-family: ${MONO}; background: rgba(37,99,235,0.08); color: var(--accent-primary);
          padding: 2px 7px; border-radius: 5px; font-size: 0.88em;
          border: 1px solid var(--border);
        }
        .markdown-content pre code { background: transparent; color: inherit; padding: 0; border: none; font-size: 1em; }
        .markdown-content hr { border: none; border-top: 1px solid var(--border); margin: 2.4em 0; }
        .markdown-content strong { color: var(--text-primary); font-weight: 700; }
        .markdown-content table { width: 100%; border-collapse: collapse; margin: 2em 0; font-size: 15px; }
        .markdown-content th { background: var(--bg-glass-blue); color: var(--text-primary); font-weight: 700; padding: 12px 16px; text-align: left; border: 1px solid var(--border); }
        .markdown-content td { padding: 11px 16px; border: 1px solid var(--border); color: var(--text-secondary); }
        .markdown-content tr:nth-child(even) td { background: var(--bg-glass-blue); }

        /* ── AUTHOR CARD ── */
        .bp-author-card {
          display: flex; align-items: center; gap: 16px;
          padding: 24px 28px; background: var(--bg-card);
          border: 1px solid var(--border); border-radius: var(--radius-xl);
          box-shadow: var(--shadow-xs); margin-bottom: 32px;
        }
        .bp-author-avatar-lg {
          width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, #2563EB, #7C3AED);
          color: #fff; font-size: 18px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
        }
        .bp-author-name { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--text-primary); }
        .bp-author-role { font-size: 13px; color: var(--text-muted); margin-top: 2px; }

        .bp-back-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 14px; font-weight: 600; color: var(--text-secondary);
          text-decoration: none; padding: 10px 18px;
          border: 1px solid var(--border); border-radius: var(--radius-full);
          transition: all .2s;
        }
        .bp-back-btn:hover { color: var(--accent-primary); border-color: var(--border-accent); background: var(--bg-glass-blue); }

        /* ── MORE ── */
        .bp-more { background: var(--bg-primary); padding: 56px 0 80px; border-top: 1px solid var(--border); }
        .bp-more-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; }
        .bp-more-title { font-family: var(--font-display); font-size: 24px; font-weight: 800; color: var(--text-primary); }
        .bp-more-all { display: flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; color: var(--accent-primary); text-decoration: none; }
        .bp-more-all:hover { gap: 10px; }
        .bp-more-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 900px) { .bp-more-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .bp-more-grid { grid-template-columns: 1fr; } }
        .bp-more-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; text-decoration: none; transition: all .25s cubic-bezier(.22,1,.36,1); }
        .bp-more-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: var(--border-accent); }
        .bp-more-cover { height: 140px; overflow: hidden; position: relative; display: flex; align-items: center; justify-content: center; }
        .bp-more-img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s; }
        .bp-more-card:hover .bp-more-img { transform: scale(1.05); }
        .bp-more-dots { position: absolute; inset: 0; background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.12) 1px, transparent 0); background-size: 20px 20px; }
        .bp-more-icon { position: relative; color: rgba(255,255,255,0.5); }
        .bp-more-body { padding: 18px; }
        .bp-more-card-title { font-family: var(--font-display); font-size: 15px; font-weight: 700; color: var(--text-primary); line-height: 1.35; margin-bottom: 10px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .bp-more-meta { display: flex; gap: 12px; }
      `}</style>
    </>
  );
}
