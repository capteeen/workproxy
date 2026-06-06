'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Video, Shirt, Star, CheckCircle, ArrowRight, Copy, Check } from "lucide-react";

const EMAIL_SUBJECT = "Work Proxy x [Your Name] — Creator Collab 🎯";

const EMAIL_BODY = `Hey [Name] 👋

I came across your TikTok and genuinely love your content — your energy is exactly what we're looking for.

I'm reaching out from Work Proxy (workproxy.fun) — we help people access remote income opportunities on platforms like Outlier AI, and we're building our creator community.

We'd love to partner with you on a simple monthly content deal:

✅ 4 videos per month (1-month contract, renewable)
→ 2 videos talking about Work Proxy — what it is and how it works
→ 2 videos just rocking our merch — your style, your vibe

In return, we send you Work Proxy merch and handle everything on our end.

No crazy scripts. No selling. Just authentic content that fits your feed.

I've attached a one-pager with the full details. If this sounds interesting, just reply and we'll get you set up.

Looking forward to working with you 🙌

— The Work Proxy Team
workproxy.fun`;

function CopyBlock({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: "0.07em", textTransform: "uppercase" }}>{label}</span>
        <button
          onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: copied ? "#059669" : "#2563eb", background: copied ? "rgba(5,150,105,0.08)" : "rgba(37,99,235,0.08)", border: `1px solid ${copied ? "rgba(5,150,105,0.2)" : "rgba(37,99,235,0.2)"}`, borderRadius: 9999, padding: "4px 12px", cursor: "pointer" }}
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "14px 16px", fontSize: 13, color: "#334155", lineHeight: 1.75, whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0, fontFamily: "'Instrument Sans', system-ui, sans-serif" }}>
        {value}
      </pre>
    </div>
  );
}

export default function CreatorProgramPage() {
  const [tab, setTab] = useState<"pdf" | "email">("pdf");

  return (
    <>
      {/* Toolbar */}
      <div className="toolbar no-print">
        <Link href="/" className="back-link"><ArrowLeft size={14} /> Back to Home</Link>
        <div style={{ display: "flex", gap: 8 }}>
          <button className={`tab-btn ${tab === "pdf" ? "active" : ""}`} onClick={() => setTab("pdf")}>PDF / Programme</button>
          <button className={`tab-btn ${tab === "email" ? "active" : ""}`} onClick={() => setTab("email")}>Email Template</button>
          {tab === "pdf" && (
            <button className="dl-btn" onClick={() => window.print()}>
              <Download size={14} /> Download PDF
            </button>
          )}
        </div>
      </div>

      {/* ── EMAIL TAB ── */}
      {tab === "email" && (
        <div className="email-wrap no-print">
          <div className="email-card">
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <img src="/logo.jpg" alt="" style={{ width: 28, height: 28, borderRadius: 6, objectFit: "cover" }} />
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "#0b1120" }}>Creator Outreach Template</span>
              </div>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                Use this to message creators via TikTok DM, Instagram, or email. Personalise the <span style={{ background: "#fef3c7", padding: "1px 4px", borderRadius: 3, fontWeight: 600 }}>[highlighted]</span> fields before sending.
              </p>
            </div>

            <CopyBlock label="Subject line (for email)" value={EMAIL_SUBJECT} />
            <CopyBlock label="Message body" value={EMAIL_BODY} />

            <div style={{ background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.15)", borderRadius: 10, padding: "12px 16px", marginTop: 8 }}>
              <p style={{ fontSize: 12, color: "#1e40af", margin: 0, lineHeight: 1.65 }}>
                <strong>Tip:</strong> For TikTok DMs, shorten to the first 3 paragraphs and drop the subject line. Always personalise the creator's name and mention one specific video of theirs — it dramatically increases reply rate.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── PDF TAB ── */}
      {tab === "pdf" && (
        <div className="doc-wrap">
          <div className="doc">

            {/* Header */}
            <div className="doc-header">
              <div className="doc-logo">
                <img src="/logo.jpg" alt="Work Proxy" />
                <span>Work Proxy</span>
              </div>
              <div className="hero-badge">Creator Programme</div>
              <h1>Get Paid in Merch.<br />Just Be Yourself on Camera.</h1>
              <p className="hero-sub">
                Work Proxy is partnering with small TikTok creators for a simple monthly
                content deal. Four videos. Free merch. No scripts. Just real content
                that fits your feed and helps your audience discover how to earn online.
              </p>
              <div className="doc-divider" />
            </div>

            {/* What is Work Proxy */}
            <div className="section-label">What is Work Proxy?</div>
            <p className="body-text">
              Work Proxy connects people with remote income opportunities on global AI platforms
              like <strong>Outlier AI</strong> — where workers can earn up to <strong>$1,200 per week</strong> doing
              tasks like writing, reviewing, and training AI models. We handle the technical side
              so people can focus on earning.
            </p>

            <div className="rule" />

            {/* The deal */}
            <div className="section-label" style={{ marginTop: 28 }}>The Deal — What You Need to Do</div>
            <p className="body-text" style={{ marginBottom: 20 }}>
              It is a <strong>1-month rolling contract</strong>. Each month you post <strong>4 videos</strong> to your TikTok.
              That is it. Here is exactly what the 4 videos look like:
            </p>

            <div className="video-grid">
              <div className="video-card" style={{ borderColor: "rgba(37,99,235,0.2)", background: "rgba(37,99,235,0.04)" }}>
                <div className="video-num" style={{ background: "rgba(37,99,235,0.12)", color: "#2563EB" }}>
                  <Video size={16} />
                </div>
                <div>
                  <div className="video-tag" style={{ color: "#2563EB" }}>Video 1 &amp; 2 — Talk Content</div>
                  <div className="video-title">Talking About Work Proxy</div>
                  <ul className="video-list">
                    <li>Explain what Work Proxy is and how it works</li>
                    <li>Talk about the earning opportunity on Outlier AI</li>
                    <li>Your own take — no script, just natural</li>
                    <li>Can be a voiceover, a talking head, or a POV format</li>
                    <li>Minimum 30 seconds, up to you on length</li>
                  </ul>
                  <div className="video-example">Example caption: <em>"This is how people are making $1,200 a week from home 👀 #WorkProxy #EarnOnline"</em></div>
                </div>
              </div>

              <div className="video-card" style={{ borderColor: "rgba(124,58,237,0.2)", background: "rgba(124,58,237,0.04)" }}>
                <div className="video-num" style={{ background: "rgba(124,58,237,0.12)", color: "#7C3AED" }}>
                  <Shirt size={16} />
                </div>
                <div>
                  <div className="video-tag" style={{ color: "#7C3AED" }}>Video 3 &amp; 4 — Merch Content</div>
                  <div className="video-title">Wearing Work Proxy Merch</div>
                  <ul className="video-list">
                    <li>Wear your Work Proxy merch — hoodie, tee, or cap</li>
                    <li>No need to talk about us — just wear it on camera</li>
                    <li>Post it as a regular lifestyle, GRWM, or fit check video</li>
                    <li>Tag <strong>@workproxy</strong> and use <strong>#WorkProxy</strong></li>
                    <li>Your normal content style — we just want the brand visible</li>
                  </ul>
                  <div className="video-example">Example: A daily vlog, GRWM, or outfit video where you happen to be wearing the merch.</div>
                </div>
              </div>
            </div>

            <div className="rule" />

            {/* What you get */}
            <div className="section-label" style={{ marginTop: 28 }}>What You Get</div>
            <div className="perks-grid">
              {[
                { icon: <Shirt size={18} />, color: "#7C3AED", bg: "rgba(124,58,237,0.1)", title: "Free Work Proxy Merch", body: "We ship you a full merch pack — hoodie, tee, and cap — before the contract starts. Yours to keep regardless." },
                { icon: <Star size={18} />, color: "#D97706", bg: "rgba(217,119,6,0.1)", title: "Featured on Our Platform", body: "Your TikTok profile gets featured on the Work Proxy website and shared to our community of workers and account holders." },
                { icon: <CheckCircle size={18} />, color: "#059669", bg: "rgba(5,150,105,0.1)", title: "Monthly Renewal", body: "If both sides are happy at the end of the month, the contract auto-renews. Long-term creators unlock exclusive perks." },
                { icon: <ArrowRight size={18} />, color: "#2563EB", bg: "rgba(37,99,235,0.1)", title: "Affiliate Opportunity", body: "Top-performing creators get access to our referral link — earn a commission every time someone signs up through your content." },
              ].map(p => (
                <div key={p.title} className="perk-card">
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: p.color }}>{p.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0b1120", marginBottom: 4 }}>{p.title}</div>
                    <div style={{ fontSize: 12.5, color: "#475569", lineHeight: 1.6 }}>{p.body}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rule" />

            {/* Rules */}
            <div className="section-label" style={{ marginTop: 28 }}>The Rules — Keep It Simple</div>
            <div className="rules-grid">
              {[
                ["4 videos per calendar month", "Any day, any time — you control the schedule"],
                ["Videos must be posted on TikTok", "Reposts to Instagram Reels are a bonus, not a requirement"],
                ["Tag @workproxy + use #WorkProxy", "Required on all 4 videos for us to track them"],
                ["No false claims", "Do not make up earnings figures — stick to what is real"],
                ["Merch must be clearly visible", "In the 2 merch videos, the logo should be readable on screen"],
                ["Minimum 300 followers", "We work with micro creators — you do not need a huge audience"],
              ].map(([rule, note]) => (
                <div key={rule} className="rule-item">
                  <CheckCircle size={13} color="#059669" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#0b1120" }}>{rule}</div>
                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 1 }}>{note}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rule" />

            {/* How to apply */}
            <div className="section-label" style={{ marginTop: 28 }}>How to Get Started</div>
            <div className="steps-row">
              {[
                { n: "1", label: "Reply to this message", sub: "Just say you're interested — we'll handle the rest" },
                { n: "2", label: "We send your merch pack", sub: "You'll receive it before filming starts" },
                { n: "3", label: "Post your 4 videos", sub: "Spread them across the month however you like" },
                { n: "4", label: "Contract renews", sub: "Keep going or wrap up — totally your call" },
              ].map(s => (
                <div key={s.n} className="step-card">
                  <div className="step-num">{s.n}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#0b1120", marginBottom: 3 }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.5 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="doc-footer">
              <p>Questions? Message us at <strong>workproxy.fun</strong> or reply directly to this message.</p>
              <p className="doc-footer-meta">Work Proxy Creator Programme · workproxy.fun · 2025</p>
            </div>

          </div>
        </div>
      )}

      <style>{`
        .toolbar {
          position: sticky; top: 0; z-index: 50;
          background: rgba(255,255,255,0.92); backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(37,99,235,0.1);
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 24px; gap: 16px; font-family: 'Instrument Sans',system-ui,sans-serif;
        }
        .back-link { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: #64748b; text-decoration: none; transition: color 0.15s; }
        .back-link:hover { color: #2563eb; }
        .tab-btn {
          font-size: 13px; font-weight: 500; color: #64748b;
          background: #f1f5f9; border: 1px solid #e2e8f0;
          border-radius: 9999px; padding: 7px 16px; cursor: pointer;
          font-family: inherit; transition: all 0.15s;
        }
        .tab-btn.active { color: #2563eb; background: rgba(37,99,235,0.08); border-color: rgba(37,99,235,0.25); }
        .dl-btn {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 13px; font-weight: 600; color: #fff;
          background: linear-gradient(135deg,#2563eb,#7c3aed);
          border: none; border-radius: 9999px; padding: 8px 18px;
          cursor: pointer; box-shadow: 0 4px 14px rgba(37,99,235,0.3);
          transition: opacity 0.15s; font-family: inherit;
        }
        .dl-btn:hover { opacity: 0.88; }

        /* Email tab */
        .email-wrap { background: #e2e8f0; min-height: calc(100vh - 57px); padding: 40px 20px; display: flex; justify-content: center; align-items: flex-start; }
        .email-card { background: #fff; width: 100%; max-width: 680px; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.08); padding: 36px 40px; font-family: 'Instrument Sans',system-ui,sans-serif; }

        /* Doc */
        .doc-wrap { background: #e2e8f0; min-height: calc(100vh - 57px); padding: 40px 20px; display: flex; justify-content: center; }
        .doc { background: #fff; width: 100%; max-width: 800px; border-radius: 12px; box-shadow: 0 8px 40px rgba(0,0,0,0.1); padding: 56px 64px; font-family: 'Instrument Sans',system-ui,sans-serif; color: #0b1120; }

        .doc-header { margin-bottom: 32px; }
        .doc-logo { display: flex; align-items: center; gap: 9px; margin-bottom: 18px; }
        .doc-logo img { width: 36px; height: 36px; border-radius: 6px; object-fit: cover; }
        .doc-logo span { font-family: 'Bricolage Grotesque',system-ui,sans-serif; font-size: 18px; font-weight: 700; color: #0b1120; }
        .hero-badge { display: inline-flex; align-items: center; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #7c3aed; background: rgba(124,58,237,0.1); border: 1px solid rgba(124,58,237,0.25); border-radius: 9999px; padding: 5px 12px; margin-bottom: 14px; }
        .doc h1 { font-family: 'Bricolage Grotesque',system-ui,sans-serif; font-size: 30px; font-weight: 900; color: #0b1120; line-height: 1.18; margin-bottom: 14px; }
        .hero-sub { font-size: 14.5px; color: #475569; line-height: 1.75; max-width: 600px; }
        .doc-divider { height: 3px; margin-top: 28px; background: linear-gradient(90deg,#2563eb,#7c3aed,#d97706,transparent); border-radius: 2px; }

        .section-label { font-family: 'Bricolage Grotesque',system-ui,sans-serif; font-size: 11px; font-weight: 800; letter-spacing: 0.07em; text-transform: uppercase; color: #64748b; margin-bottom: 12px; }
        .body-text { font-size: 14px; color: #334155; line-height: 1.75; }

        .video-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 8px; }
        .video-card { border: 1px solid; border-radius: 12px; padding: 18px; display: flex; flex-direction: column; gap: 12px; }
        .video-num { width: 36px; height: 36px; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .video-tag { font-size: 10px; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; margin-bottom: 4px; }
        .video-title { font-family: 'Bricolage Grotesque',system-ui,sans-serif; font-size: 15px; font-weight: 800; color: #0b1120; margin-bottom: 10px; }
        .video-list { padding: 0; margin: 0 0 10px 0; list-style: none; display: flex; flex-direction: column; gap: 5px; }
        .video-list li { display: flex; align-items: flex-start; gap: 7px; font-size: 12.5px; color: #475569; line-height: 1.6; }
        .video-list li::before { content: "→"; font-weight: 700; color: #94a3b8; flex-shrink: 0; margin-top: 1px; }
        .video-example { font-size: 11.5px; color: #94a3b8; font-style: italic; line-height: 1.5; border-top: 1px solid #f1f5f9; padding-top: 8px; }

        .perks-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .perk-card { display: flex; gap: 12px; align-items: flex-start; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; }

        .rules-grid { display: flex; flex-direction: column; gap: 10px; }
        .rule-item { display: flex; align-items: flex-start; gap: 10px; }

        .steps-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; margin-bottom: 28px; }
        .step-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 12px; text-align: center; }
        .step-num { width: 28px; height: 28px; background: linear-gradient(135deg,#2563eb,#7c3aed); color: #fff; font-size: 13px; font-weight: 800; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; }

        .rule { height: 1px; background: #e2e8f0; margin: 28px 0; }
        .doc-footer { padding-top: 24px; border-top: 2px solid #e2e8f0; }
        .doc-footer p { font-size: 13px; color: #334155; line-height: 1.7; margin-bottom: 6px; }
        .doc-footer-meta { color: #94a3b8 !important; font-size: 11px !important; }

        @media print {
          .no-print { display: none !important; }
          body { background: #fff; }
          .doc-wrap { background: transparent; padding: 0; min-height: unset; }
          .doc { max-width: 100%; box-shadow: none; border-radius: 0; padding: 32px 48px; }
          a { color: inherit; text-decoration: none; }
        }
        @media (max-width: 640px) {
          .doc { padding: 32px 20px; }
          .video-grid, .perks-grid, .steps-row { grid-template-columns: 1fr; }
          .toolbar { flex-wrap: wrap; gap: 8px; }
        }
      `}</style>
    </>
  );
}
