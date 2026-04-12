import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Rocket, Briefcase, Shield, FileText, Banknote, 
  LineChart, Scale, Activity, X, Check, Laptop,
  ArrowRight, Monitor
} from "lucide-react";

const platforms = [
  { name: "Outlier AI", type: "AI Training, Writing, Coding", restricted: true, color: "#111111", active: true },
  { name: "OneForma", type: "Transcription, Translation", restricted: true, color: "#777777", active: true },
  { name: "Scale AI", type: "AI Data Labeling, RLHF", restricted: true, color: "#333333", active: false },
  { name: "Telus International", type: "Content Rating, Annotation", restricted: true, color: "#555555", active: false },
  { name: "Appen", type: "Data Annotation, Search Rating", restricted: false, color: "#111111", active: false },
  { name: "Remotasks", type: "Micro-tasks, 3D Annotation", restricted: true, color: "#333333", active: false },
];

const earningsRows = [
  { label: "Probation (New)", platform: "50%", worker: "10%", owner: "40%" },
  { label: "Standard (1+ mo)", platform: "47%", worker: "16.5%", owner: "36.5%" },
  { label: "Verified (3+ mo)", platform: "44%", worker: "23%", owner: "33%" },
  { label: "Elite (6+ mo)", platform: "40%", worker: "30%", owner: "30%" },
];

const features = [
  { icon: <Shield size={32} />, title: "Credential Vault", desc: "AES-256 encrypted storage. Credentials released only after both parties sign the agreement and escrow is funded." },
  { icon: <FileText size={32} />, title: "Smart Contracts", desc: "Auto-generated Account Management Agreements covering splits, duration, NDA, and account ban liability." },
  { icon: <Banknote size={32} />, title: "Escrow Payments", desc: "Every dollar flows through Work Proxy escrow. Workers paid weekly, owners monthly. Full transparency." },
  { icon: <LineChart size={32} />, title: "Performance Tiers", desc: "Workers advance from Probation → Standard → Verified → Elite. As you level up, Work Proxy reduces its fee and your cut grows — up to 30%." },
  { icon: <Scale size={32} />, title: "Dispute Resolution", desc: "Admin panel mediates all disputes within 48hrs. Evidence-based resolution with audit trails." },
  { icon: <Activity size={32} />, title: "Live Dashboards", desc: "Real-time earnings tracking, weekly reports, tier progress, and payout history for all parties." },
];

const faqs = [
  { q: "Is this legal?", a: "Work Proxy operates as a professional account management service. We provide legal disclaimers and our contracts clearly define liability. The platform is not responsible for platform ToS decisions — users accept risk through the agreement." },
  { q: "How do workers receive credentials?", a: "Only after both parties digitally sign the Account Management Agreement AND the owner funds the escrow. Credentials are AES-256 encrypted and accessed via our secure vault." },
  { q: "What if an account gets banned?", a: "Our contract has a liability clause. If the ban is due to worker negligence, the worker bears liability. If it's a platform-wide action, neither party is liable. Admin mediates the review." },
  { q: "How fast do workers get paid?", a: "Workers are paid weekly or bi-weekly based on verified account earnings. Payout methods include Payoneer, Grey, Geegpay, and USDT." },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-bg" />
        <div className="container">
          <div className="hero-inner">
            <div className="hero-badge">
              <span className="badge badge-teal">🚀 MVP Launch — April 2026</span>
            </div>
            <h1 className="hero-title">
              Bridge the Gap Between<br />
              <span className="gradient-text">Global Platforms & Local Talent</span>
            </h1>
            <p className="hero-desc">
              Work Proxy connects UK/US account holders with skilled Nigerian workers to unlock income from platforms like Outlier AI and OneForma — through verified contracts and escrow payments.
            </p>
            <div className="hero-actions">
              <Link href="/auth/register?role=worker" className="btn btn-primary btn-lg" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Rocket size={20} /> I Want to Work
              </Link>
              <Link href="/services" className="btn btn-outline btn-lg" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Activity size={20} /> View Onboarding Services
              </Link>
              <Link href="/auth/register?role=owner" className="btn btn-ghost btn-lg" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Briefcase size={20} /> List My Account
              </Link>
            </div>
            <div className="hero-stats">
              {[
                { value: "30%", label: "Max Worker Earn" },
                { value: "2", label: "Active Platforms" },
                { value: "48h", label: "Dispute Resolution" },
              ].map((s) => (
                <div key={s.label} className="hero-stat">
                  <span className="hero-stat-value">{s.value}</span>
                  <span className="hero-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-purple">The Problem</span>
            <h2 className="section-title">High-Paying Platforms Are Locked Away</h2>
            <p className="section-desc">Skilled Nigerian workers can&apos;t access some of the best remote income platforms due to geo-restrictions. Account owners in the UK/US have idle accounts. Work Proxy fixes both.</p>
          </div>
          <div className="problem-grid">
            <div className="problem-card problem-card--red">
              <div className="problem-icon"><X size={32} /></div>
              <h3>Without Work Proxy</h3>
              <ul className="problem-list">
                <li>Workers blocked from $500–$2,000/mo platforms</li>
                <li>Account owners' accounts sit idle and unused</li>
                <li>No trusted system for informal account sharing</li>
                <li>Credential theft, no contracts, no recourse</li>
              </ul>
            </div>
            <div className="problem-card problem-card--green">
              <div className="problem-icon"><Check size={32} /></div>
              <h3>With Work Proxy</h3>
              <ul className="problem-list">
                <li>Workers earn real income from otherwise inaccessible platforms</li>
                <li>Account owners earn 30–40% passively with zero effort</li>
                <li>Verified contracts + escrow protect all parties</li>
                <li>AES-256 credential vault with full audit logs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="section" style={{ background: "linear-gradient(0deg, #080f20 0%, transparent 100%)" }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue">Supported Platforms — MVP</span>
            <h2 className="section-title">High-Earning Platforms, Day One</h2>
            <p className="section-desc">All platforms below are geo-restricted in Nigeria. We bridge access through structured account management.</p>
          </div>
          <div className="grid-3">
            {platforms.map((p) => (
              <div key={p.name} className="listing-card" style={{ opacity: p.active ? 1 : 0.6, position: "relative" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div className="platform-dot" style={{ background: p.color, width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                    <Laptop size={22} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <span className={`badge ${p.restricted ? "badge-rose" : "badge-amber"}`}>
                      {p.restricted ? "🔒 Restricted" : "⚠️ Partial"}
                    </span>
                    {!p.active && <span className="badge badge-purple" style={{ fontSize: 10 }}>Coming Soon</span>}
                  </div>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 4 }}>{p.name}</h3>
                <p className="text-sm text-secondary" style={{ marginBottom: 12 }}>{p.type}</p>
                {p.active && (
                  <Link href="/services" className="text-xs font-bold text-accent hover:underline" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    View Setup Guide <ArrowRight size={12} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Account Success Services */}
      <section className="section">
        <div className="container">
          <div className="svc-highlight-box">
            <div className="svc-highlight-grid">
              <div className="svc-highlight-text">
                <span className="badge badge-purple" style={{ marginBottom: 20 }}>Work Proxy Onboarding Services</span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, marginBottom: 20 }}>Expert Guidance for <br />Competitive Platforms</h2>
                <p className="text-secondary" style={{ marginBottom: 24, lineHeight: 1.8 }}>
                  Don't risk failing your assessment or messing up your registration. Our experts will handle the entire process for you, ensuring guaranteed results.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
                   {[
                      { icon: <Check size={16} />, title: "Onboarding Assessment Writing", desc: "₦40,000 — We write the qualification test for you to guarantee success." },
                      { icon: <Check size={16} />, title: "Managed Account Registration", desc: "₦60,000 — We handle the end-to-end registration and setup for you." },
                      { icon: <Check size={16} />, title: "Professional Tasker Training", desc: "₦60,000 — Intensive training to master tasking and avoid bans." },
                   ].map((item, i) => (
                     <div key={i} style={{ display: "flex", gap: 12 }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(0,153,255,0.1)", color: "var(--accent-primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {item.icon}
                        </div>
                        <div>
                          <p style={{ fontSize: 14, fontWeight: 700 }}>{item.title}</p>
                          <p className="text-xs text-muted">{item.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
                <Link href="/services" className="btn btn-primary">
                  Explore Onboarding Services
                </Link>
              </div>
              <div className="svc-highlight-visual">
                <div className="svc-visual-card">
                  <div className="svc-visual-header">
                    <Monitor size={18} />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Outlier Onboarding</span>
                  </div>
                  <div className="svc-visual-body">
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                      <span style={{ fontSize: 11, fontWeight: 600 }}>Progress</span>
                      <span style={{ fontSize: 11, fontWeight: 800, color: "var(--accent-primary)" }}>60%</span>
                    </div>
                    <div className="progress-bar" style={{ height: 6, marginBottom: 20 }}>
                      <div className="progress-fill" style={{ width: "60%" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <div className="svc-visual-step done"><Check size={14} /> Account Registration</div>
                      <div className="svc-visual-step done"><Check size={14} /> Profile Completion</div>
                      <div className="svc-visual-step active"><div className="dot" /> Take Onboarding Quiz</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          .svc-highlight-box {
            background: #ffffff;
            border: 1.5px solid var(--border);
            border-radius: var(--radius-2xl);
            padding: 60px;
            box-shadow: 0 12px 48px rgba(0,0,0,0.03);
            overflow: hidden;
            position: relative;
          }
          @media (max-width: 768px) { .svc-highlight-box { padding: 40px 20px; } }
          
          .svc-highlight-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            align-items: center;
          }
          @media (max-width: 900px) { .svc-highlight-grid { grid-template-columns: 1fr; } }
          
          .svc-highlight-visual {
            display: flex;
            justify-content: center;
            position: relative;
          }
          .svc-visual-card {
            width: 100%;
            max-width: 340px;
            background: #ffffff;
            border: 1px solid var(--border-accent);
            border-radius: var(--radius-lg);
            padding: 24px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.08);
            animation: float 6s ease-in-out infinite;
          }
          .svc-visual-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; color: var(--accent-primary); }
          .svc-visual-step { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--text-muted); }
          .svc-visual-step.done { color: #10b981; }
          .svc-visual-step.active { color: var(--text-primary); font-weight: 600; }
          .svc-visual-step .dot { width: 14px; height: 14px; border-radius: 50%; border: 2px solid var(--accent-primary); }
          
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }
        `}</style>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-teal">How It Works</span>
            <h2 className="section-title">Three Parties, One Ecosystem</h2>
          </div>
          <div className="how-it-works">
            <div className="how-card">
              <div className="how-num">01</div>
              <h3>Account Owner Lists</h3>
              <p className="text-secondary text-sm">UK/US holders submit platform accounts, set their preferred split, and verify account authenticity with earnings proof.</p>
              <div className="how-earn">Earns 30–40% passively</div>
            </div>
            <div className="how-arrow"><ArrowRight /></div>
            <div className="how-card how-card--center">
              <div className="how-num how-num--accent"><Briefcase size={18} /></div>
              <h3>Work Proxy Matches</h3>
              <p className="text-secondary text-sm">We vet both parties, generate contracts, manage escrow, track performance, and mediate disputes.</p>
              <div className="how-earn">Takes 50% always</div>
            </div>
            <div className="how-arrow"><ArrowRight /></div>
            <div className="how-card">
              <div className="how-num">02</div>
              <h3>Worker Manages</h3>
              <p className="text-secondary text-sm">Verified workers apply, sign the agreement, access credentials, do the work, and earn weekly.</p>
              <div className="how-earn">Earns 10–20% by tier</div>
            </div>
          </div>
        </div>
      </section>

      {/* Worker Earnings Growth */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-amber">Worker Growth</span>
            <h2 className="section-title">The Longer You Stay, The More You Earn</h2>
            <p className="section-desc">Dedicated workers unlock higher earning tiers. Your income grows automatically as you build trust and deliver quality work.</p>
          </div>
          <div className="growth-path">
            {[
              { tier: "Probation", time: "First 2 weeks", multiplier: "1×", desc: "Start earning from day one while we verify your work quality", color: "#94a3b8", cls: "tier-probation" },
              { tier: "Standard", time: "After 1 month", multiplier: "1.6×", desc: "Your earnings grow as you prove consistency and reliability", color: "#0099ff", cls: "tier-standard" },
              { tier: "Verified", time: "After 3 months", multiplier: "2.3×", desc: "Trusted workers unlock significantly higher income", color: "var(--accent-primary)", cls: "tier-verified" },
              { tier: "Elite", time: "After 6 months", multiplier: "3×", desc: "Top performers earn the maximum — 3x your starting rate", color: "#f59e0b", cls: "tier-elite" },
            ].map((t, i) => (
              <div key={t.tier} className="growth-card">
                <div className="growth-step">
                  <div className="growth-dot" style={{ background: t.color }} />
                  {i < 3 && <div className="growth-line" />}
                </div>
                <div className="growth-info">
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <span className={`badge ${t.cls}`}>{t.tier}</span>
                    <span className="text-xs text-muted">{t.time}</span>
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, color: t.color, marginBottom: 6 }}>{t.multiplier}</div>
                  <p className="text-sm text-secondary" style={{ lineHeight: 1.6 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .growth-path {
            display: flex;
            flex-direction: column;
            gap: 0;
            max-width: 600px;
            margin: 0 auto;
          }
          .growth-card {
            display: flex;
            gap: 20px;
            align-items: flex-start;
          }
          .growth-step {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-shrink: 0;
            padding-top: 4px;
          }
          .growth-dot {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            flex-shrink: 0;
            box-shadow: 0 0 0 4px rgba(0,0,0,0.05);
          }
          .growth-line {
            width: 2px;
            height: 100%;
            min-height: 60px;
            background: var(--border);
          }
          .growth-info {
            padding-bottom: 28px;
          }
        `}</style>
      </section>

      {/* Features */}
      <section className="section" style={{ background: "linear-gradient(180deg, #080f20 0%, transparent 100%)" }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-purple">Platform Features</span>
            <h2 className="section-title">Built for Trust. Built for Scale.</h2>
          </div>
          <div className="grid-3">
            {features.map((f) => (
              <div key={f.title} className="card card-gradient" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ color: "var(--accent-primary)" }}>{f.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>{f.title}</h3>
                <p className="text-secondary text-sm" style={{ lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Worker Tiers */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-teal">Performance Tiers</span>
            <h2 className="section-title">The More You Perform, The More You Earn</h2>
          </div>
          <div className="grid-4">
            {[
              { tier: "Probation", pct: "10%", reqs: "New — first 2 weeks", color: "#94a3b8", cls: "tier-probation" },
              { tier: "Standard", pct: "16.5%", reqs: "1+ month, 3.5★+", color: "#0099ff", cls: "tier-standard" },
              { tier: "Verified", pct: "23%", reqs: "3+ months, 4.0★+", color: "var(--accent-primary)", cls: "tier-verified" },
              { tier: "Elite", pct: "30%", reqs: "6+ months, 5★, top 10%", color: "#f59e0b", cls: "tier-elite" },
            ].map((t) => (
              <div key={t.tier} className="card" style={{ textAlign: "center" }}>
                <span className={`badge ${t.cls}`} style={{ marginBottom: 16, display: "inline-flex" }}>{t.tier}</span>
                <div style={{ fontSize: 40, fontFamily: "var(--font-display)", fontWeight: 800, color: t.color, marginBottom: 8 }}>{t.pct}</div>
                <p className="text-sm text-secondary">{t.reqs}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container" style={{ maxWidth: 780 }}>
          <div className="section-header">
            <span className="badge badge-blue">FAQ</span>
            <h2 className="section-title">Common Questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {faqs.map((faq) => (
              <div key={faq.q} className="card">
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, marginBottom: 8 }}>{faq.q}</h3>
                <p className="text-secondary text-sm" style={{ lineHeight: 1.8 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-box">
            <div className="cta-glow" />
            <span className="badge" style={{ marginBottom: 20, background: "rgba(0,212,170,0.15)", color: "#00d4aa", border: "1px solid rgba(0,212,170,0.3)" }}>Join the Waitlist</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 800, marginBottom: 16, color: "#ffffff" }}>
              Ready to Start Earning?
            </h2>
            <p style={{ maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.8, color: "#cbd5e1" }}>
              Whether you have an idle account or you&apos;re a skilled worker looking to access global platforms — Work Proxy is your launchpad.
            </p>
            <div className="flex gap-4 justify-center" style={{ flexWrap: "wrap" }}>
              <Link href="/auth/register?role=worker" className="btn btn-primary btn-lg" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Rocket size={18} /> Get Started as Worker
              </Link>
              <Link href="/auth/register?role=owner" className="btn btn-outline btn-lg" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Briefcase size={18} /> List Your Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .hero-section {
          position: relative;
          padding: 140px 0 100px;
          overflow: hidden;
          background: #ffffff;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 90% 70% at 50% -10%, rgba(0,0,0,0.03) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 85% 30%, rgba(0,0,0,0.02) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 15% 70%, rgba(0,0,0,0.02) 0%, transparent 55%);
          pointer-events: none;
        }
        .hero-inner {
          text-align: center;
          max-width: 840px;
          margin: 0 auto;
          animation: fadeInUp 0.6s ease;
        }
        .hero-badge { margin-bottom: 24px; }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(36px, 5vw, 66px);
          font-weight: 800;
          line-height: 1.08;
          margin-bottom: 24px;
          letter-spacing: -0.025em;
        }
        .hero-desc {
          font-size: 18px;
          color: var(--text-secondary);
          line-height: 1.8;
          max-width: 640px;
          margin: 0 auto 44px;
        }
        .hero-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 64px;
        }
        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 0;
          border: 1px solid var(--border);
          border-radius: var(--radius-2xl);
          background: #ffffff;
          box-shadow: 0 8px 32px rgba(0,0,0,0.04);
          overflow: hidden;
          max-width: 620px;
          margin: 0 auto;
        }
        .hero-stat {
          flex: 1;
          padding: 22px 16px;
          text-align: center;
          border-right: 1px solid var(--border);
          transition: background var(--transition);
        }
        .hero-stat:hover { background: #fafafa; }
        .hero-stat:last-child { border-right: none; }
        .hero-stat-value {
          display: block;
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 800;
          color: var(--accent-primary);
        }
        .hero-stat-label {
          font-size: 11px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-top: 3px;
          display: block;
        }
        .section-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .section-header .badge { margin-bottom: 16px; }
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 3.5vw, 46px);
          font-weight: 700;
          margin-bottom: 16px;
          letter-spacing: -0.022em;
        }
        .section-desc {
          font-size: 16px;
          color: var(--text-secondary);
          max-width: 560px;
          margin: 0 auto;
          line-height: 1.8;
        }
        .problem-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 768px) {
          .problem-grid { grid-template-columns: 1fr; }
        }
        .problem-card {
          border-radius: var(--radius-xl);
          padding: 32px;
          border: 1px solid var(--border);
          background: #ffffff;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          position: relative;
        }
        .problem-card h3 {
          font-family: var(--font-display);
          font-size: 20px;
          margin-bottom: 16px;
        }
        .problem-card--red .problem-icon { color: var(--accent-rose); margin-bottom: 16px; }
        .problem-card--green .problem-icon { color: #10b981; margin-bottom: 16px; }

        .problem-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .problem-list li {
          font-size: 14px;
          color: var(--text-secondary);
          padding-left: 20px;
          position: relative;
          line-height: 1.6;
        }
        .problem-list li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--text-muted);
        }
        .how-it-works {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        @media (max-width: 768px) {
          .how-it-works { flex-direction: column; }
          .how-arrow { transform: rotate(90deg); }
        }
        .how-card {
          flex: 1;
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 32px 24px;
          text-align: center;
          box-shadow: 0 4px 16px rgba(0,0,0,0.02);
          transition: all var(--transition);
        }
        .how-card:hover {
          border-color: var(--accent-primary);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.05);
        }
        .how-card--center {
          background: #fafafa;
          border-color: var(--border-accent);
          box-shadow: 0 8px 24px rgba(0,0,0,0.05);
        }
        .how-num {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid var(--border-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 16px;
          color: var(--accent-primary);
          background: #ffffff;
        }
        .how-num--accent {
          background: var(--accent-primary);
          border: none;
          color: #ffffff;
          font-size: 14px;
        }
        .how-card h3 {
          font-family: var(--font-display);
          font-size: 18px;
          margin-bottom: 10px;
        }
        .how-earn {
          margin-top: 16px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--accent-primary);
        }
        .how-arrow {
          font-size: 20px;
          color: var(--text-muted);
          flex-shrink: 0;
        }
        .cta-box {
          background: #0f172a;
          color: #ffffff;
          border-radius: var(--radius-2xl);
          padding: 88px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 16px 48px rgba(0,0,0,0.1);
        }
        .cta-box .text-secondary { color: #94a3b8; }
        .cta-box .btn-outline { color: #fff; border-color: rgba(255,255,255,0.2); }
        .cta-box .btn-outline:hover { background: rgba(255,255,255,0.1); }
        .cta-box .btn-primary { background: #ffffff; color: #0f172a; }
        .cta-box .btn-primary:hover { background: #f8fafc; color: #0f172a; }

        .cta-glow {
          position: absolute;
          top: -40%;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 360px;
          background: radial-gradient(ellipse, rgba(255,255,255,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .platform-dot { flex-shrink: 0; }
      `}</style>
    </>
  );
}
