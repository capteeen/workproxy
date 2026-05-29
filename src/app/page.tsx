import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Rocket, Briefcase, Shield, FileText, Banknote,
  LineChart, Scale, Activity, X, Check, Laptop,
  ArrowRight, Monitor, Star, Quote
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
  { icon: <Banknote size={26} />, title: "Escrow Payments", desc: "Every dollar flows through Work Proxy escrow. Workers paid weekly, owners monthly — full transparency, zero counterparty risk.", accent: "#34D399", glow: "16,185,129", featured: true },
  { icon: <Shield size={22} />, title: "Credential Vault", desc: "AES-256 encrypted storage. Credentials released only after both parties sign and escrow is funded.", accent: "#60A5FA", glow: "37,99,235" },
  { icon: <FileText size={22} />, title: "Smart Contracts", desc: "Auto-generated Account Management Agreements covering splits, duration, NDA, and ban liability.", accent: "#A78BFA", glow: "124,58,237" },
  { icon: <LineChart size={22} />, title: "Performance Tiers", desc: "Advance from Probation → Standard → Verified → Elite. Level up and your cut grows to 30%.", accent: "#FBBF24", glow: "217,119,6", wide: true },
  { icon: <Scale size={22} />, title: "Dispute Resolution", desc: "Admin mediates every dispute within 48hrs. Evidence-based outcomes with full audit trails — both parties protected.", accent: "#F472B6", glow: "219,39,119", wide: true },
  { icon: <Activity size={22} />, title: "Live Dashboards", desc: "Real-time earnings, weekly reports, tier progress, and payout history for every party — always in sync.", accent: "#22D3EE", glow: "8,145,178", wide: true },
];

const testimonials = [
  { quote: "I went from zero access to earning steady income on Outlier within my first month. The escrow system meant I never worried about getting paid.", name: "Chinedu O.", role: "Verified Worker · Lagos", initials: "CO", tier: "Verified", cls: "tier-verified" },
  { quote: "My Appen account was sitting idle for two years. Now it earns me a passive cut every month with zero effort on my end. Completely hands-off.", name: "James W.", role: "Account Owner · Manchester, UK", initials: "JW", tier: "Owner", cls: "tier-standard" },
  { quote: "The onboarding training was worth every naira. I passed my assessment first try and hit Elite tier in six months. Best decision I made this year.", name: "Aisha B.", role: "Elite Worker · Abuja", initials: "AB", tier: "Elite", cls: "tier-elite" },
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
              <span className="badge badge-blue">🚀 MVP Launch — April 2026</span>
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
          <div className="section-header reveal">
            <span className="badge badge-purple">The Problem</span>
            <h2 className="section-title">High-Paying Platforms Are Locked Away</h2>
            <p className="section-desc">Skilled Nigerian workers can&apos;t access some of the best remote income platforms due to geo-restrictions. Account owners in the UK/US have idle accounts. Work Proxy fixes both.</p>
          </div>
          <div className="problem-grid reveal">
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
      <section className="section" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(37,99,235,0.04) 100%)" }}>
        <div className="container">
          <div className="section-header reveal">
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
                      <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>Progress</span>
                      <span style={{ fontSize: 11, fontWeight: 800, color: "#60A5FA" }}>60%</span>
                    </div>
                    <div className="progress-bar" style={{ height: 6, marginBottom: 20, background: "rgba(255,255,255,0.1)" }}>
                      <div className="progress-fill" style={{ width: "60%", background: "linear-gradient(90deg, #2563EB, #7C3AED)" }} />
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
            box-shadow: var(--shadow-lg);
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
            background: linear-gradient(135deg, #0B1120 0%, #1E1B4B 100%);
            border: 1px solid rgba(37,99,235,0.25);
            border-radius: var(--radius-lg);
            padding: 24px;
            box-shadow: 0 24px 48px rgba(37,99,235,0.2);
            animation: float 6s ease-in-out infinite;
          }
          .svc-visual-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; color: #60A5FA; font-size: 13px; font-weight: 600; }
          .svc-visual-step { display: flex; align-items: center; gap: 10px; font-size: 13px; color: rgba(255,255,255,0.4); }
          .svc-visual-step.done { color: #34D399; }
          .svc-visual-step.active { color: #F1F5F9; font-weight: 600; }
          .svc-visual-step .dot { width: 14px; height: 14px; border-radius: 50%; border: 2px solid #60A5FA; }
          
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
          <div className="section-header reveal">
            <span className="badge badge-teal">How It Works</span>
            <h2 className="section-title">Three Parties, One Ecosystem</h2>
          </div>
          <div className="how-it-works reveal">
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
      <section className="features-section">
        <div className="features-grid-bg" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="features-head reveal">
            <div>
              <span className="badge" style={{ background: "rgba(124,58,237,0.18)", color: "#C4B5FD", border: "1px solid rgba(124,58,237,0.3)" }}>Platform Features</span>
              <h2 className="features-title">Built for trust.<br /><span className="features-title-accent">Built for scale.</span></h2>
            </div>
            <p className="features-sub">Six systems working together so workers, owners, and Work Proxy can transact with zero blind trust.</p>
          </div>

          <div className="bento">
            {features.map((f, i) => (
              <article
                key={f.title}
                className={`bento-card reveal${f.featured ? " bento-card--featured" : ""}${f.wide ? " bento-card--wide" : ""}`}
                style={{
                  ['--accent' as string]: f.accent,
                  ['--glow' as string]: f.glow,
                  ['--delay' as string]: `${i * 70}ms`,
                }}
              >
                <div className="bento-card-glow" />
                <div className="bento-top">
                  <div className="bento-icon">{f.icon}</div>
                  <span className="bento-index">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="bento-title">{f.title}</h3>
                <p className="bento-desc">{f.desc}</p>

                {f.featured && (
                  <div className="bento-visual">
                    <div className="bento-visual-row">
                      <span>Owner funds escrow</span><Check size={13} />
                    </div>
                    <div className="bento-visual-bar"><span style={{ width: "100%" }} /></div>
                    <div className="bento-visual-row">
                      <span>Worker paid weekly</span><span className="bento-amt">+$420</span>
                    </div>
                    <div className="bento-visual-bar"><span style={{ width: "72%" }} /></div>
                  </div>
                )}
                {f.wide && (
                  <div className="bento-tiers">
                    {["Probation", "Standard", "Verified", "Elite"].map((t, ti) => (
                      <span key={t} className="bento-tier" style={{ opacity: 0.55 + ti * 0.15 }}>{t}</span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>

        <style>{`
          .features-section {
            position: relative;
            padding: 96px 0 104px;
            background: radial-gradient(ellipse 100% 60% at 50% 0%, #131C3A 0%, #070B14 60%);
            overflow: hidden;
          }
          .features-grid-bg {
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px);
            background-size: 56px 56px;
            mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, #000 0%, transparent 75%);
            -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, #000 0%, transparent 75%);
            pointer-events: none;
          }
          .features-head {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            gap: 40px;
            margin-bottom: 48px;
          }
          @media (max-width: 820px) { .features-head { flex-direction: column; align-items: flex-start; gap: 16px; } }
          .features-title {
            font-family: var(--font-display);
            font-size: clamp(30px, 4vw, 52px);
            font-weight: 800;
            letter-spacing: -0.03em;
            line-height: 1.04;
            margin-top: 16px;
            color: #F8FAFC;
          }
          .features-title-accent {
            background: linear-gradient(120deg, #60A5FA, #A78BFA, #34D399);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .features-sub {
            font-size: 15px;
            line-height: 1.75;
            color: #94A3B8;
            max-width: 340px;
            padding-bottom: 8px;
          }

          .bento {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: minmax(150px, auto);
            gap: 16px;
          }
          @media (max-width: 900px) { .bento { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 560px) { .bento { grid-template-columns: 1fr; } }

          .bento-card {
            position: relative;
            background: linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%);
            border: 1px solid rgba(255,255,255,0.07);
            border-radius: var(--radius-xl);
            padding: 26px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, background 0.4s ease;
            backdrop-filter: blur(6px);
          }
          .bento-card:hover {
            transform: translateY(-5px);
            border-color: color-mix(in srgb, var(--accent) 45%, transparent);
            background: linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
          }
          /* featured tile: spans 2 cols + 2 rows */
          .bento-card--featured { grid-column: span 2; grid-row: span 2; }
          /* wide tile: spans 2 cols */
          .bento-card--wide { grid-column: span 2; }
          @media (max-width: 900px) {
            .bento-card--featured { grid-column: span 2; grid-row: span 2; }
            .bento-card--wide { grid-column: span 2; }
          }
          @media (max-width: 560px) {
            .bento-card--featured, .bento-card--wide { grid-column: span 1; grid-row: auto; }
          }

          .bento-card-glow {
            position: absolute;
            top: -50%; right: -30%;
            width: 220px; height: 220px;
            background: radial-gradient(circle, rgba(var(--glow),0.22) 0%, transparent 70%);
            opacity: 0;
            transition: opacity 0.45s ease;
            pointer-events: none;
          }
          .bento-card:hover .bento-card-glow { opacity: 1; }

          .bento-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 18px;
          }
          .bento-icon {
            width: 44px; height: 44px;
            border-radius: 12px;
            display: flex; align-items: center; justify-content: center;
            color: var(--accent);
            background: color-mix(in srgb, var(--accent) 14%, transparent);
            border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent);
            transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
          }
          .bento-card:hover .bento-icon { transform: scale(1.08) rotate(-3deg); }
          .bento-index {
            font-family: var(--font-display);
            font-size: 13px;
            font-weight: 700;
            color: rgba(255,255,255,0.22);
            letter-spacing: 0.05em;
          }
          .bento-title {
            font-family: var(--font-display);
            font-size: 18px;
            font-weight: 700;
            color: #F1F5F9;
            margin-bottom: 8px;
          }
          .bento-card--featured .bento-title { font-size: 24px; }
          .bento-desc {
            font-size: 13.5px;
            line-height: 1.72;
            color: #94A3B8;
          }
          .bento-card--featured .bento-desc { font-size: 14.5px; max-width: 380px; }

          /* featured embedded visual */
          .bento-visual {
            margin-top: auto;
            padding-top: 24px;
            display: flex;
            flex-direction: column;
            gap: 9px;
          }
          .bento-visual-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12.5px;
            color: #CBD5E1;
            font-weight: 500;
          }
          .bento-visual-row svg { color: var(--accent); }
          .bento-amt { color: var(--accent); font-weight: 700; }
          .bento-visual-bar {
            height: 6px;
            border-radius: 99px;
            background: rgba(255,255,255,0.07);
            overflow: hidden;
          }
          .bento-visual-bar span {
            display: block;
            height: 100%;
            border-radius: 99px;
            background: linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 40%, #2563EB));
          }

          /* wide tile tier chips */
          .bento-tiers {
            margin-top: 18px;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          .bento-tier {
            font-size: 11.5px;
            font-weight: 600;
            color: var(--accent);
            padding: 4px 10px;
            border-radius: 99px;
            background: color-mix(in srgb, var(--accent) 12%, transparent);
            border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
          }
        `}</style>
      </section>

      {/* Worker Tiers */}
      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <span className="badge badge-amber">Performance Tiers</span>
            <h2 className="section-title">The Longer You Stay, The More You Earn</h2>
            <p className="section-desc">Dedicated workers unlock higher earning tiers automatically. Your cut grows from 10% all the way to 30% as you build trust.</p>
          </div>
          <div className="tiers-grid reveal">
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

      {/* Social Proof */}
      <section className="section" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(37,99,235,0.04) 50%, transparent 100%)" }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="badge badge-green">Social Proof</span>
            <h2 className="section-title">Trusted by Workers & Owners Alike</h2>
            <p className="section-desc">Real people, real income. Here&apos;s what early members of the Work Proxy network are saying.</p>
          </div>

          <div className="proof-stats reveal">
            {[
              { value: "$2,000", label: "Top monthly worker earnings" },
              { value: "98%", label: "On-time weekly payouts" },
              { value: "4.8★", label: "Average worker rating" },
              { value: "48h", label: "Avg. dispute resolution" },
            ].map((s) => (
              <div key={s.label} className="proof-stat">
                <span className="proof-stat-value">{s.value}</span>
                <span className="proof-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="testimonial-grid">
            {testimonials.map((t, i) => (
              <figure key={t.name} className="testimonial-card reveal" style={{ ['--delay' as string]: `${i * 90}ms` }}>
                <Quote className="testimonial-quote-icon" size={28} />
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#D97706" stroke="#D97706" />)}
                </div>
                <blockquote className="testimonial-text">{t.quote}</blockquote>
                <figcaption className="testimonial-author">
                  <div className="avatar avatar-md">{t.initials}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                  <span className={`badge ${t.cls}`} style={{ marginLeft: "auto" }}>{t.tier}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <style>{`
          .proof-stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0;
            border: 1px solid var(--border);
            border-radius: var(--radius-xl);
            background: #fff;
            box-shadow: var(--shadow-sm);
            overflow: hidden;
            margin-bottom: 48px;
          }
          @media (max-width: 768px) { .proof-stats { grid-template-columns: repeat(2, 1fr); } }
          .proof-stat {
            padding: 28px 20px;
            text-align: center;
            border-right: 1px solid var(--border);
          }
          .proof-stat:last-child { border-right: none; }
          @media (max-width: 768px) {
            .proof-stat:nth-child(2) { border-right: none; }
            .proof-stat:nth-child(1), .proof-stat:nth-child(2) { border-bottom: 1px solid var(--border); }
          }
          .proof-stat-value {
            display: block;
            font-family: var(--font-display);
            font-size: 34px;
            font-weight: 800;
            background: var(--grad-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .proof-stat-label {
            display: block;
            font-size: 12px;
            color: var(--text-muted);
            margin-top: 6px;
            font-weight: 500;
          }
          .testimonial-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
          @media (max-width: 900px) { .testimonial-grid { grid-template-columns: 1fr; max-width: 540px; margin: 0 auto; } }
          .testimonial-card {
            position: relative;
            background: #fff;
            border: 1px solid var(--border);
            border-radius: var(--radius-xl);
            padding: 32px 28px;
            box-shadow: var(--shadow-xs);
            transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
            overflow: hidden;
          }
          .testimonial-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lg);
            border-color: var(--border-accent);
          }
          .testimonial-quote-icon {
            color: var(--accent-primary);
            opacity: 0.14;
            position: absolute;
            top: 20px;
            right: 22px;
          }
          .testimonial-stars { display: flex; gap: 2px; margin-bottom: 16px; }
          .testimonial-text {
            font-size: 14.5px;
            line-height: 1.75;
            color: var(--text-secondary);
            margin-bottom: 24px;
            font-style: normal;
          }
          .testimonial-author {
            display: flex;
            align-items: center;
            gap: 12px;
            padding-top: 18px;
            border-top: 1px solid var(--border);
          }
          .testimonial-name { font-size: 14px; font-weight: 700; color: var(--text-primary); }
          .testimonial-role { font-size: 12px; color: var(--text-muted); margin-top: 1px; }
        `}</style>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container" style={{ maxWidth: 780 }}>
          <div className="section-header reveal">
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
        /* ── Hero ── */
        .hero-section {
          position: relative;
          padding: 148px 0 108px;
          overflow: hidden;
          background: #EEF2FF;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 100% 80% at 50% -5%, rgba(37,99,235,0.09) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 88% 30%, rgba(124,58,237,0.06) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 12% 75%, rgba(37,99,235,0.05) 0%, transparent 55%);
          pointer-events: none;
        }
        .hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }
        .hero-glow--1 {
          width: 600px; height: 320px;
          background: rgba(37,99,235,0.14);
          top: -80px; left: 50%;
          transform: translateX(-50%);
        }
        .hero-glow--2 {
          width: 320px; height: 220px;
          background: rgba(124,58,237,0.1);
          bottom: 0; right: 8%;
        }
        .hero-gradient-text {
          background: linear-gradient(135deg, #2563EB 0%, #7C3AED 55%, #2563EB 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerText 4s linear infinite;
        }
        @keyframes shimmerText {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        /* ── Trust Strip ── */
        .trust-strip {
          background: #ffffff;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 14px 0;
        }
        .trust-strip-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 36px;
          flex-wrap: wrap;
        }
        .trust-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 12.5px;
          font-weight: 600;
          color: var(--text-secondary);
          letter-spacing: 0.01em;
        }
        .trust-item svg { color: var(--accent-primary); }

        /* ── Hero inner ── */
        .hero-inner {
          text-align: center;
          max-width: 860px;
          margin: 0 auto;
          animation: fadeInUp 0.6s ease;
        }
        .hero-badge { margin-bottom: 24px; }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(38px, 5.5vw, 70px);
          font-weight: 800;
          line-height: 1.06;
          margin-bottom: 24px;
          letter-spacing: -0.03em;
        }
        .hero-desc {
          font-size: 18px;
          color: var(--text-secondary);
          line-height: 1.85;
          max-width: 640px;
          margin: 0 auto 48px;
        }
        .hero-actions {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 64px;
        }
        .hero-stats {
          display: flex;
          justify-content: center;
          border: 1px solid var(--border);
          border-radius: var(--radius-2xl);
          background: #ffffff;
          box-shadow: var(--shadow-md);
          overflow: hidden;
          max-width: 600px;
          margin: 0 auto;
        }
        .hero-stat {
          flex: 1;
          padding: 22px 16px;
          text-align: center;
          border-right: 1px solid var(--border);
          transition: background var(--transition);
        }
        .hero-stat:hover { background: rgba(37,99,235,0.03); }
        .hero-stat:last-child { border-right: none; }
        .hero-stat-value {
          display: block;
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 800;
          color: var(--accent-primary);
        }
        .hero-stat-label {
          font-size: 10.5px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 4px;
          display: block;
          font-weight: 600;
        }

        /* ── Section header ── */
        .section-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .section-header .badge { margin-bottom: 14px; }
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 3.5vw, 46px);
          font-weight: 800;
          margin-bottom: 16px;
          letter-spacing: -0.025em;
        }
        .section-desc {
          font-size: 16px;
          color: var(--text-secondary);
          max-width: 560px;
          margin: 0 auto;
          line-height: 1.85;
        }

        /* ── Problem/Solution ── */
        .problem-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 768px) { .problem-grid { grid-template-columns: 1fr; } }
        .problem-card {
          border-radius: var(--radius-xl);
          padding: 36px;
          border: 1px solid var(--border);
          background: #ffffff;
          box-shadow: var(--shadow-sm);
          position: relative;
          overflow: hidden;
        }
        .problem-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
        }
        .problem-card--red::before { background: linear-gradient(90deg, var(--accent-rose), #f97316); }
        .problem-card--green::before { background: linear-gradient(90deg, var(--accent-emerald), #10b981); }
        .problem-card h3 {
          font-family: var(--font-display);
          font-size: 20px;
          margin-bottom: 18px;
          font-weight: 700;
        }
        .problem-card--red .problem-icon { color: var(--accent-rose); margin-bottom: 18px; }
        .problem-card--green .problem-icon { color: var(--accent-emerald); margin-bottom: 18px; }
        .problem-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }
        .problem-list li {
          font-size: 14px;
          color: var(--text-secondary);
          padding-left: 18px;
          position: relative;
          line-height: 1.65;
        }
        .problem-list li::before {
          content: '–';
          position: absolute;
          left: 0;
          color: var(--text-muted);
          font-weight: 700;
        }

        /* ── How it works ── */
        .how-it-works {
          display: flex;
          align-items: stretch;
          gap: 12px;
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
          box-shadow: var(--shadow-xs);
          transition: all var(--transition);
        }
        .how-card:hover {
          border-color: var(--border-accent);
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .how-card--center {
          background: linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%);
          border-color: var(--border-accent);
          box-shadow: var(--shadow-md);
        }
        .how-num {
          width: 48px; height: 48px;
          border-radius: 50%;
          border: 2px solid var(--border-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 16px;
          color: var(--accent-primary);
          background: #ffffff;
        }
        .how-num--accent {
          background: var(--grad-primary);
          border: none;
          color: #ffffff;
          font-size: 14px;
          box-shadow: var(--shadow-button);
        }
        .how-card h3 {
          font-family: var(--font-display);
          font-size: 18px;
          margin-bottom: 10px;
          font-weight: 700;
        }
        .how-earn {
          margin-top: 18px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--accent-primary);
          text-transform: uppercase;
          background: rgba(37,99,235,0.08);
          display: inline-block;
          padding: 4px 10px;
          border-radius: var(--radius-full);
        }
        .how-arrow {
          display: flex;
          align-items: center;
          color: var(--border-accent);
          flex-shrink: 0;
        }

        /* ── CTA ── */
        .cta-box {
          background: linear-gradient(135deg, #0B1120 0%, #1E1B4B 45%, #0B1120 100%);
          color: #ffffff;
          border-radius: var(--radius-3xl);
          padding: 96px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(37,99,235,0.25), 0 8px 32px rgba(0,0,0,0.2);
          border: 1px solid rgba(37,99,235,0.15);
        }
        .cta-box .btn-outline {
          color: #fff;
          border-color: rgba(255,255,255,0.25);
        }
        .cta-box .btn-outline:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.5);
        }
        .cta-glow {
          position: absolute;
          top: -40%; left: 50%;
          transform: translateX(-50%);
          width: 800px; height: 400px;
          background: radial-gradient(ellipse, rgba(37,99,235,0.3) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-glow--2 {
          top: auto; bottom: -30%; left: 25%;
          width: 500px; height: 280px;
          background: radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, transparent 70%);
        }
        .platform-dot { flex-shrink: 0; }
      `}</style>
    </>
  );
}
