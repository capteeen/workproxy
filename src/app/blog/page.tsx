import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { ArrowRight, BookOpen, Clock, User, TrendingUp, Zap, Bell } from "lucide-react";

export const dynamic = 'force-dynamic';

const MONO = "ui-monospace, 'SF Mono', SFMono-Regular, Menlo, monospace";

function cleanContent(text: string): string {
  let c = text;
  c = c.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}\u{FE0F}]/gu, '');
  c = c.replace(/\s*\*\*\s*$/gm, '').replace(/^\*\*\s*/gm, '').replace(/\*\s+\*/g, '').replace(/^\*\s*/gm, '').replace(/\s*\*\s*$/gm, '').replace(/ {2,}/g, ' ');
  return c.trim();
}

function readTime(content: string) {
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200));
}

function excerpt(content: string, len = 140) {
  const stripped = cleanContent(content.replace(/[#_*\[\]`>]/g, ''));
  return stripped.length > len ? stripped.substring(0, len).trimEnd() + '…' : stripped;
}

const COVER_GRADIENTS = [
  "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
  "linear-gradient(135deg, #D97706 0%, #DC2626 100%)",
  "linear-gradient(135deg, #059669 0%, #0891B2 100%)",
  "linear-gradient(135deg, #7C3AED 0%, #DB2777 100%)",
  "linear-gradient(135deg, #0891B2 0%, #2563EB 100%)",
  "linear-gradient(135deg, #D97706 0%, #7C3AED 100%)",
];

const POST_TAGS = ["Platform Update", "Strategy", "Announcement", "Guide", "News", "Tips"];

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { name: true, image: true } } }
  });

  const featured = posts[0] ?? null;
  const rest = posts.slice(1);

  return (
    <>
      <Navbar />

      {/* ── PAGE HEADER ── */}
      <section className="bl-header">
        <div className="bl-header-bg" />
        <div className="container bl-header-inner">
          <div className="bl-header-text">
            <span className="bl-eyebrow">
              <BookOpen size={13} /> Work Proxy Blog
            </span>
            <h1 className="bl-h1">
              Updates, guides &amp;<br />
              <span className="bl-h1-grad">earning insights.</span>
            </h1>
            <p className="bl-h1-sub">
              Platform news, tasker strategies, and deep-dives on everything
              Work Proxy — written by the team building it.
            </p>
          </div>
          <div className="bl-header-chips">
            {[
              { icon: <Bell size={13} />, label: "Announcements" },
              { icon: <TrendingUp size={13} />, label: "Strategies" },
              { icon: <Zap size={13} />, label: "Platform Updates" },
              { icon: <BookOpen size={13} />, label: "Guides" },
            ].map((c) => (
              <span key={c.label} className="bl-chip">
                {c.icon} {c.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="bl-body">
        <div className="container bl-container">

          {posts.length === 0 ? (
            /* ── EMPTY STATE ── */
            <div className="bl-empty">
              <div className="bl-empty-icon"><BookOpen size={40} /></div>
              <h2>No posts yet</h2>
              <p>The first article is being written. Check back soon.</p>
            </div>
          ) : (
            <>
              {/* ── FEATURED POST ── */}
              {featured && (
                <Link href={`/blog/${featured.slug}`} className="bl-featured reveal">
                  <div className="bl-featured-cover">
                    {featured.imageUrl ? (
                      <img src={featured.imageUrl} alt={cleanContent(featured.title)} className="bl-featured-img" />
                    ) : (
                      <div className="bl-featured-gradient" style={{ background: COVER_GRADIENTS[0] }}>
                        <div className="bl-cover-dots" />
                        <BookOpen size={56} className="bl-cover-icon" />
                      </div>
                    )}
                    <span className="bl-featured-badge">Featured</span>
                  </div>
                  <div className="bl-featured-body">
                    <span className="bl-tag">{POST_TAGS[0]}</span>
                    <h2 className="bl-featured-title">{cleanContent(featured.title)}</h2>
                    <p className="bl-featured-excerpt">{excerpt(featured.content, 200)}</p>
                    <div className="bl-featured-meta">
                      <div className="bl-author">
                        <div className="bl-avatar">{featured.author.image ? <img src={featured.author.image} alt={featured.author.name ?? 'Author'} className="bl-avatar-photo" /> : (featured.author.name ?? 'A').charAt(0).toUpperCase()}</div>
                        <span>{featured.author.name ?? 'Work Proxy'}</span>
                      </div>
                      <span className="bl-dot" />
                      <span className="bl-meta-item">
                        <Clock size={13} />
                        {readTime(featured.content)} min read
                      </span>
                      <span className="bl-dot" />
                      <span className="bl-meta-item">
                        {new Date(featured.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="bl-read-cta">
                      Read article <ArrowRight size={15} className="bl-arrow" />
                    </div>
                  </div>
                </Link>
              )}

              {/* ── DIVIDER ── */}
              {rest.length > 0 && (
                <div className="bl-divider">
                  <span className="bl-divider-label">All articles</span>
                </div>
              )}

              {/* ── POST GRID ── */}
              {rest.length > 0 && (
                <div className="bl-grid">
                  {rest.map((post, i) => (
                    <Link href={`/blog/${post.slug}`} key={post.id} className="bl-card reveal" style={{ ['--delay' as string]: `${i * 60}ms` }}>
                      <div className="bl-card-cover">
                        {post.imageUrl ? (
                          <img src={post.imageUrl} alt={cleanContent(post.title)} className="bl-card-img" />
                        ) : (
                          <div className="bl-card-gradient" style={{ background: COVER_GRADIENTS[(i + 1) % COVER_GRADIENTS.length] }}>
                            <div className="bl-cover-dots" />
                            <BookOpen size={32} className="bl-cover-icon" />
                          </div>
                        )}
                      </div>
                      <div className="bl-card-body">
                        <div className="bl-card-top">
                          <span className="bl-tag">{POST_TAGS[(i + 1) % POST_TAGS.length]}</span>
                          <span className="bl-read-time"><Clock size={12} /> {readTime(post.content)}m</span>
                        </div>
                        <h3 className="bl-card-title">{cleanContent(post.title)}</h3>
                        <p className="bl-card-excerpt">{excerpt(post.content)}</p>
                        <div className="bl-card-footer">
                          <div className="bl-author">
                            <div className="bl-avatar bl-avatar-sm">{post.author.image ? <img src={post.author.image} alt={post.author.name ?? 'Author'} className="bl-avatar-photo" /> : (post.author.name ?? 'A').charAt(0).toUpperCase()}</div>
                            <span>{post.author.name ?? 'Work Proxy'}</span>
                          </div>
                          <span className="bl-card-date">
                            {new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />

      <style>{`
        /* ── HEADER ── */
        .bl-header {
          position: relative; overflow: hidden;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
          padding: 80px 0 64px;
        }
        .bl-header-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 100% at 50% 0%, #000 30%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 100% at 50% 0%, #000 30%, transparent 100%);
        }
        .bl-header-inner {
          position: relative;
          display: flex; flex-direction: column; align-items: flex-start; gap: 28px;
        }
        .bl-header-text { max-width: 640px; }
        .bl-eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: ${MONO}; font-size: 12px; font-weight: 600; letter-spacing: .12em;
          text-transform: uppercase; color: var(--accent-primary);
          margin-bottom: 16px;
        }
        .bl-h1 {
          font-family: var(--font-display);
          font-size: clamp(34px, 5vw, 58px); font-weight: 800;
          letter-spacing: -.03em; line-height: 1.04;
          color: var(--text-primary); margin-bottom: 16px;
        }
        .bl-h1-grad {
          background: linear-gradient(120deg, #2563EB, #7C3AED);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .bl-h1-sub { font-size: 17px; color: var(--text-secondary); line-height: 1.7; max-width: 480px; }
        .bl-header-chips { display: flex; gap: 8px; flex-wrap: wrap; }
        .bl-chip {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 12.5px; font-weight: 600; color: var(--text-secondary);
          background: var(--bg-card); border: 1px solid var(--border);
          padding: 7px 14px; border-radius: var(--radius-full);
          transition: all .2s;
        }
        .bl-chip:hover { border-color: var(--border-accent); color: var(--accent-primary); }
        .bl-chip svg { color: var(--accent-primary); }

        /* ── BODY ── */
        .bl-body { background: var(--bg-primary); padding: 56px 0 88px; }
        .bl-container { max-width: 1100px; }

        /* ── EMPTY ── */
        .bl-empty {
          text-align: center; padding: 80px 40px;
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius-2xl); box-shadow: var(--shadow-xs);
        }
        .bl-empty-icon { color: var(--text-light); margin-bottom: 20px; }
        .bl-empty h2 { font-family: var(--font-display); font-size: 24px; font-weight: 700; margin-bottom: 8px; }
        .bl-empty p { color: var(--text-secondary); font-size: 16px; }

        /* ── FEATURED ── */
        .bl-featured {
          display: grid; grid-template-columns: 1.1fr 1fr; gap: 0;
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius-2xl); overflow: hidden;
          box-shadow: var(--shadow-md); text-decoration: none;
          transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s, border-color .35s;
          margin-bottom: 56px;
        }
        .bl-featured:hover { transform: translateY(-5px); box-shadow: var(--shadow-xl); border-color: var(--border-accent); }
        @media (max-width: 820px) { .bl-featured { grid-template-columns: 1fr; } }
        .bl-featured-cover { position: relative; min-height: 360px; overflow: hidden; }
        @media (max-width: 820px) { .bl-featured-cover { min-height: 240px; } }
        .bl-featured-img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s cubic-bezier(.22,1,.36,1); }
        .bl-featured:hover .bl-featured-img { transform: scale(1.04); }
        .bl-featured-gradient { width: 100%; height: 100%; position: relative; display: flex; align-items: center; justify-content: center; }
        .bl-featured-badge {
          position: absolute; top: 16px; left: 16px;
          font-size: 11px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
          color: #fff; background: var(--accent-primary); padding: 5px 12px; border-radius: var(--radius-full);
          box-shadow: var(--shadow-button);
        }
        .bl-featured-body {
          padding: 44px 40px; display: flex; flex-direction: column; justify-content: center;
        }
        @media (max-width: 540px) { .bl-featured-body { padding: 28px 24px; } }
        .bl-featured-title {
          font-family: var(--font-display); font-size: clamp(22px, 3vw, 34px); font-weight: 800;
          letter-spacing: -.02em; line-height: 1.15; color: var(--text-primary); margin: 14px 0 16px;
        }
        .bl-featured-excerpt { font-size: 15.5px; color: var(--text-secondary); line-height: 1.75; margin-bottom: 28px; flex: 1; }
        .bl-featured-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 24px; }
        .bl-read-cta {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 14.5px; font-weight: 700; color: var(--accent-primary);
          padding: 11px 20px;
          background: var(--bg-glass-blue); border: 1.5px solid var(--border-accent);
          border-radius: var(--radius-full); transition: all .2s; align-self: flex-start;
        }
        .bl-featured:hover .bl-read-cta { background: var(--accent-primary); color: #fff; border-color: var(--accent-primary); }
        .bl-featured:hover .bl-arrow { transform: translateX(4px); }

        /* ── DIVIDER ── */
        .bl-divider { display: flex; align-items: center; gap: 16px; margin-bottom: 36px; }
        .bl-divider::before, .bl-divider::after { content: ""; flex: 1; height: 1px; background: var(--border); }
        .bl-divider-label { font-family: ${MONO}; font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--text-muted); white-space: nowrap; }

        /* ── GRID ── */
        .bl-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 900px) { .bl-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .bl-grid { grid-template-columns: 1fr; } }

        /* ── CARD ── */
        .bl-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius-xl); overflow: hidden; text-decoration: none;
          display: flex; flex-direction: column;
          transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s, border-color .3s;
          box-shadow: var(--shadow-xs);
        }
        .bl-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); border-color: var(--border-accent); }
        .bl-card-cover { position: relative; height: 196px; overflow: hidden; flex-shrink: 0; }
        .bl-card-img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s cubic-bezier(.22,1,.36,1); }
        .bl-card:hover .bl-card-img { transform: scale(1.06); }
        .bl-card-gradient { width: 100%; height: 100%; position: relative; display: flex; align-items: center; justify-content: center; }
        .bl-card-body { padding: 24px; display: flex; flex-direction: column; flex: 1; }
        .bl-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .bl-card-title { font-family: var(--font-display); font-size: 19px; font-weight: 700; letter-spacing: -.015em; line-height: 1.3; color: var(--text-primary); margin-bottom: 10px; }
        .bl-card-excerpt { font-size: 13.5px; color: var(--text-secondary); line-height: 1.7; flex: 1; margin-bottom: 20px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .bl-card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 16px; border-top: 1px solid var(--border); margin-top: auto; }
        .bl-card-date { font-size: 12px; color: var(--text-muted); font-family: ${MONO}; }

        /* ── SHARED ATOMS ── */
        .bl-tag {
          font-family: ${MONO}; font-size: 11px; font-weight: 700; letter-spacing: .07em;
          text-transform: uppercase; color: var(--accent-primary);
          background: var(--bg-glass-blue); border: 1px solid var(--border);
          padding: 4px 10px; border-radius: var(--radius-full);
        }
        .bl-read-time { display: flex; align-items: center; gap: 4px; font-size: 12px; color: var(--text-muted); font-family: ${MONO}; }
        .bl-meta-item { display: flex; align-items: center; gap: 5px; font-size: 13px; color: var(--text-muted); font-weight: 500; }
        .bl-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--text-light); }
        .bl-author { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: var(--text-secondary); }
        .bl-avatar {
          width: 28px; height: 28px; border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-violet));
          color: #fff; font-size: 12px; font-weight: 700;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          overflow: hidden;
        }
        .bl-avatar-sm { width: 24px; height: 24px; font-size: 11px; }
        .bl-avatar-photo { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }

        /* ── COVER SHARED ── */
        .bl-cover-dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0);
          background-size: 22px 22px;
        }
        .bl-cover-icon { position: relative; color: rgba(255,255,255,0.5); }
        .bl-arrow { transition: transform .2s; }

        /* ── SCROLL REVEAL ── */
        .reveal { animation: revealIn 0.6s cubic-bezier(0.22,1,0.36,1) both; animation-delay: var(--delay,0ms); }
        @supports (animation-timeline: view()) {
          .reveal { animation: revealIn linear both; animation-timeline: view(); animation-range: entry 0% cover 28%; animation-delay: 0ms; }
        }
        @media (prefers-reduced-motion: reduce) { .reveal { animation: none !important; opacity: 1 !important; transform: none !important; } }
        @keyframes revealIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
}
