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
        <div className="hero-glow hero-glow--1" />
        <div className="hero-glow hero-glow--2" />
        <div className="container">
          <div className="hero-inner">
            <div className="hero-badge">
              <span className="badge badge-teal" style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.25)" }}>🚀 MVP Launch — April 2026</span>
            </div>
            <h1 className="hero-title">
              Bridge the Gap Between<br />
              <span className="hero-gradient-text">Global Platforms & Local Talent</span>
            </h1>
            <p className="hero-desc">
              Work Proxy connects UK/US account holders with skilled Nigerian workers to unlock income from platforms like Outlier AI and OneForma — through verified contracts and escrow payments.
            </p>
            <div className="hero-actions">
              <Link href="/workers/apply" className="btn btn-primary btn-lg" style={{ display: "flex", alignItems: "center", gap: 8 }}>
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

      {/* Trust Strip */}
      <div className="trust-strip">
        <div className="container">
          <div className="trust-strip-inner">
            {[
              { icon: <Shield size={15} />, label: "AES-256 Encrypted" },
              { icon: <FileText size={15} />, label: "Legal Contracts" },
              { icon: <Banknote size={15} />, label: "Escrow Payments" },
              { icon: <Scale size={15} />, label: "Dispute Protection" },
              { icon: <Activity size={15} />, label: "Weekly Payouts" },
            ].map((t) => (
              <div key={t.label} className="trust-item">
                {t.icon}
                <span>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

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
            <span className="badge badge-amber">Performance Tiers</span>
            <h2 className="section-title">The Longer You Stay, The More You Earn</h2>
            <p className="section-desc">Dedicated workers unlock higher earning tiers automatically. Your cut grows from 10% all the way to 30% as you build trust.</p>
          </div>
          <div className="tiers-grid">
            {[
              { tier: "Probation", pct: "10%", time: "First 2 weeks", reqs: "New — verification period", color: "#94a3b8", cls: "tier-probation", mult: "1×" },
              { tier: "Standard", pct: "16.5%", time: "After 1 month", reqs: "3.5★+ rating", color: "#0099ff", cls: "tier-standard", mult: "1.6×" },
              { tier: "Verified", pct: "23%", time: "After 3 months", reqs: "4.0★+ rating", color: "#6366f1", cls: "tier-verified", mult: "2.3×" },
              { tier: "Elite", pct: "30%", time: "After 6 months", reqs: "5★ · Top 10%", color: "#f59e0b", cls: "tier-elite", mult: "3×" },
            ].map((t, i) => (
              <div key={t.tier} className="tier-card">
                <div className="tier-card-top" style={{ borderColor: t.color }}>
                  <span className={`badge ${t.cls}`}>{t.tier}</span>
                  <span className="text-xs text-muted">{t.time}</span>
                </div>
                <div style={{ fontSize: 48, fontFamily: "var(--font-display)", fontWeight: 800, color: t.color, lineHeight: 1, margin: "16px 0 8px" }}>{t.pct}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: t.color, marginBottom: 12, opacity: 0.7 }}>{t.mult} your starting rate</div>
                <p className="text-sm text-secondary">{t.reqs}</p>
                {i < 3 && <div className="tier-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .tiers-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0;
            border: 1px solid var(--border);
            border-radius: var(--radius-xl);
            overflow: hidden;
            background: #fff;
            box-shadow: 0 4px 24px rgba(0,0,0,0.05);
          }
          @media (max-width: 900px) { .tiers-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 560px) { .tiers-grid { grid-template-columns: 1fr; } }
          .tier-card {
            padding: 32px 24px;
            border-right: 1px solid var(--border);
            position: relative;
            transition: background var(--transition);
          }
          .tier-card:last-child { border-right: none; }
          .tier-card:hover { background: #fafafa; }
          .tier-card-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 12px;
            border-bottom: 2px solid;
            margin-bottom: 4px;
          }
          .tier-arrow {
            position: absolute;
            right: -14px;
            top: 50%;
            transform: translateY(-50%);
            width: 28px;
            height: 28px;
            background: #fff;
            border: 1px solid var(--border);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            color: var(--text-muted);
            z-index: 1;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          }
          @media (max-width: 900px) { .tier-arrow { display: none; } }
        `}</style>
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
            <div className="cta-glow cta-glow--2" />
            <span className="badge" style={{ marginBottom: 20, background: "rgba(99,102,241,0.2)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.35)" }}>Join the Waitlist</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 800, marginBottom: 16, color: "#ffffff" }}>
              Ready to Start Earning?
            </h2>
            <p style={{ maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.8, color: "#cbd5e1" }}>
              Whether you have an idle account or you&apos;re a skilled worker looking to access global platforms — Work Proxy is your launchpad.
            </p>
            <div className="flex gap-4 justify-center" style={{ flexWrap: "wrap" }}>
              <Link href="/workers/apply" className="btn btn-lg" style={{ display: "flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", boxShadow: "0 8px 24px rgba(99,102,241,0.4)" }}>
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
            radial-gradient(ellipse 90% 70% at 50% -10%, rgba(99,102,241,0.06) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 85% 30%, rgba(139,92,246,0.04) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 15% 70%, rgba(59,130,246,0.04) 0%, transparent 55%);
          pointer-events: none;
        }
        .hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .hero-glow--1 {
          width: 500px;
          height: 300px;
          background: rgba(99,102,241,0.12);
          top: -60px;
          left: 50%;
          transform: translateX(-50%);
        }
        .hero-glow--2 {
          width: 300px;
          height: 200px;
          background: rgba(245,158,11,0.08);
          bottom: 20px;
          right: 10%;
        }
        .hero-gradient-text {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 40%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .trust-strip {
          background: #f8fafc;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 16px 0;
        }
        .trust-strip-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
        }
        .trust-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .trust-item svg { color: #6366f1; }
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
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
          color: #ffffff;
          border-radius: var(--radius-2xl);
          padding: 88px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 16px 64px rgba(99,102,241,0.2), 0 4px 24px rgba(0,0,0,0.15);
        }
        .cta-box .text-secondary { color: #94a3b8; }
        .cta-box .btn-outline { color: #fff; border-color: rgba(255,255,255,0.25); }
        .cta-box .btn-outline:hover { background: rgba(255,255,255,0.1); }

        .cta-glow {
          position: absolute;
          top: -40%;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 360px;
          background: radial-gradient(ellipse, rgba(99,102,241,0.25) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-glow--2 {
          top: auto;
          bottom: -30%;
          left: 30%;
          width: 400px;
          height: 240px;
          background: radial-gradient(ellipse, rgba(139,92,246,0.15) 0%, transparent 70%);
        }
        .platform-dot { flex-shrink: 0; }
      `}</style>
    </>
  );
}
