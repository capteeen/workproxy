import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { ArrowRight, BookOpen } from "lucide-react";

export const dynamic = 'force-dynamic';

function cleanContent(text: string): string {
  let cleaned = text;
  cleaned = cleaned.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}\u{FE0F}]/gu, '');
  cleaned = cleaned.replace(/\s*\*\*\s*$/gm, '');
  cleaned = cleaned.replace(/^\*\*\s*/gm, '');
  cleaned = cleaned.replace(/\*\s+\*/g, '');
  cleaned = cleaned.replace(/^\*\s*/gm, '- ');
  cleaned = cleaned.replace(/\s*\*\s*$/gm, '');
  cleaned = cleaned.replace(/ {2,}/g, ' ');
  return cleaned.trim();
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { name: true } } }
  });

  return (
    <>
      <Navbar />

      <section className="section" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)", minHeight: "80vh" }}>
        <div className="container" style={{ maxWidth: 1100 }}>
          <div className="section-header" style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="badge badge-purple" style={{ marginBottom: 16 }}><BookOpen size={14} style={{ display: 'inline', marginRight: 6 }}/>Work Proxy Blog</span>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5vw, 48px)", fontWeight: 800, marginBottom: 16 }}>
              Updates & Insights
            </h1>
            <p className="text-secondary" style={{ fontSize: 18, lineHeight: 1.8, maxWidth: 600, margin: "0 auto" }}>
              Learn about platform updates, earning strategies, and the latest from Work Proxy.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: 32 }}>
            {posts.length === 0 ? (
              <div className="card" style={{ textAlign: "center", padding: 60, gridColumn: "1 / -1" }}>
                <p className="text-secondary" style={{ fontSize: 18 }}>No blog posts available yet. Check back soon!</p>
              </div>
            ) : (
              posts.map((post, i) => (
                <Link href={`/blog/${post.slug}`} key={post.id} style={{ textDecoration: 'none', display: 'flex' }}>
                  <div className="card hover-lift" style={{ display: "flex", flexDirection: "column", padding: 0, overflow: 'hidden', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'pointer', flex: 1, border: '1px solid var(--border)', background: '#ffffff' }}>
                    {post.imageUrl ? (
                      <div style={{ width: '100%', height: 220, background: '#f1f5f9' }}>
                        <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ) : (
                      <div style={{ width: '100%', height: 160, background: `linear-gradient(135deg, ${i % 2 === 0 ? '#0ea5e9, #6366f1' : '#f59e0b, #f43f5e'})`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <div style={{ position: 'absolute', inset: 0, opacity: 0.2, backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                         <BookOpen size={48} color="white" style={{ opacity: 0.8 }} />
                      </div>
                    )}
                    
                    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--text-muted)", fontSize: 13, marginBottom: 16, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--border-accent)' }}></span>
                        <span>{post.author.name || 'Admin'}</span>
                      </div>
                      
                      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                        {cleanContent(post.title)}
                      </h2>
                      
                      <p className="text-secondary" style={{ lineHeight: 1.6, marginBottom: 24, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1 }}>
                        {cleanContent(post.content.replace(/[#_*\[\\]`>]/g, '').substring(0, 150))}...
                      </p>
                      
                      <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                        <div style={{ color: "var(--accent-primary)", fontWeight: 600, display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}>
                          Read Article <ArrowRight size={16} className="arrow-icon" style={{ transition: 'transform 0.2s' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          border-color: var(--accent-primary);
        }
        .hover-lift:hover .arrow-icon {
          transform: translateX(4px);
        }
        @media (max-width: 768px) {
          .section-header { text-align: left !important; }
          .section-header p { margin: 0 !important; }
        }
      `}</style>
    </>
  );
}
