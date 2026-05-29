'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  GraduationCap, BookOpen, Award, Users, Clock, CheckCircle,
  ArrowRight, Star, Zap, Target, Send, Phone,
  Brain, Code2, MessageSquare, TrendingUp, Shield,
  ChevronDown, ChevronUp, BadgeCheck, Flame
} from "lucide-react";
import { useState } from "react";

const MONO = "ui-monospace, 'SF Mono', SFMono-Regular, Menlo, monospace";

const modules = [
  {
    week: "Week 1",
    title: "Platform Foundations",
    icon: <Target size={20} />,
    accent: "#F59E0B",
    glow: "245,158,11",
    topics: [
      "Account setup, profile optimization & verification",
      "Understanding the Outlier AI dashboard & task types",
      "How RLHF works and what AI trainers actually do",
      "Task ratings: what earns high scores vs. what gets flagged",
    ],
  },
  {
    week: "Week 2",
    title: "Prompt Writing Mastery",
    icon: <MessageSquare size={20} />,
    accent: "#60A5FA",
    glow: "37,99,235",
    topics: [
      "Anatomy of a perfect prompt — structure, clarity, depth",
      "Writing prompts that challenge the model correctly",
      "Common prompt mistakes that tank your rating",
      "Live prompt writing practice with real feedback",
    ],
  },
  {
    week: "Week 3",
    title: "Response Critique & Ranking",
    icon: <Brain size={20} />,
    accent: "#A78BFA",
    glow: "124,58,237",
    topics: [
      "Comparing AI responses — what makes one better",
      "Ranking methodology & how to justify your choices",
      "Spotting factual errors, hallucinations & safety issues",
      "How to write critique notes that reviewers love",
    ],
  },
  {
    week: "Week 4",
    title: "Coding & SWE Tasks",
    icon: <Code2 size={20} />,
    accent: "#34D399",
    glow: "16,185,129",
    topics: [
      "Software engineering task types on Outlier (SWE-bench)",
      "Debugging and code review for AI-generated code",
      "Writing test cases and edge-case prompts",
      "How to earn more on high-value coding tasks",
    ],
  },
  {
    week: "Week 5",
    title: "Earnings & Tier Strategy",
    icon: <TrendingUp size={20} />,
    accent: "#F472B6",
    glow: "244,114,182",
    topics: [
      "Time management — which tasks give best ROI",
      "How to unlock higher-paying task batches",
      "Maintaining a 4.5★+ rating long-term",
      "Withdrawal methods: Payoneer, Grey, USDT",
    ],
  },
  {
    week: "Week 6",
    title: "Assessment & Certification",
    icon: <BadgeCheck size={20} />,
    accent: "#22D3EE",
    glow: "8,145,178",
    topics: [
      "Full mock assessment under real conditions",
      "1-on-1 feedback session with your trainer",
      "Final certification exam & graded review",
      "Job placement matching through Work Proxy",
    ],
  },
];

const outcomes = [
  { icon: <Zap size={22} />, title: "Pass your Outlier assessment", desc: "First-try pass rate of 94% among graduates — higher score = higher-tier tasks immediately." },
  { icon: <TrendingUp size={22} />, title: "Earn $500–$2,000/month", desc: "Top graduates consistently earn in this range within their first 3 months on the platform." },
  { icon: <BadgeCheck size={22} />, title: "Certified & placed faster", desc: "Academy graduates skip the Work Proxy waitlist — direct placement into verified account matches." },
];

const benefits = [
  { icon: <GraduationCap size={22} />, title: "Official Certification", desc: "A recognized Work Proxy Academy certificate you can showcase to owners and employers." },
  { icon: <BookOpen size={22} />, title: "Real Task Practice", desc: "Practice on actual Outlier-style tasks with annotated model answers, not theory slides." },
  { icon: <Users size={22} />, title: "Private Student Community", desc: "Lifetime access to our WhatsApp cohort — active graduates share tips and new opportunities." },
  { icon: <Award size={22} />, title: "Priority Job Matching", desc: "Graduates jump the queue — you get first access to new account matches on the platform." },
  { icon: <Clock size={22} />, title: "Flexible, Self-Paced", desc: "All materials available 24/7. Two live sessions per week. Catch up anytime." },
  { icon: <Star size={22} />, title: "Lifetime Trainer Access", desc: "WhatsApp access to your trainer even after graduation. We stay invested in your earnings." },
];

const faqs = [
  { q: "Do I need coding experience?", a: "No. Week 4 covers coding tasks but only basic logic is needed. Most students earn well on writing and critique tasks which require zero coding." },
  { q: "How long does the course take?", a: "6 weeks at roughly 2–4 hours per day. You can go faster — most students complete assessments by week 4." },
  { q: "What happens after I finish?", a: "You sit the certification exam. Graduates get a certificate and direct placement access through Work Proxy's verified account network." },
  { q: "Will I definitely pass the Outlier assessment?", a: "We can't guarantee it 100%, but our 94% first-try pass rate speaks for itself. If you fail, we give you extra sessions at no charge." },
  { q: "How is payment made?", a: "One-time ₦100,000 payment via bank transfer or USDT. After WhatsApp confirmation, you get immediate access to all materials." },
];

export default function AcademyPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", experience: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `🎓 *WORK PROXY ACADEMY — OUTLIER AI ENROLMENT*%0A%0A*Name:* ${formData.fullName}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Experience:* ${formData.experience || "None provided"}%0A%0ACourse: Outlier AI Mastery (6 weeks · ₦100,000)`;
    window.open(`https://wa.me/2349027406685?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="ac-hero">
        <div className="ac-hero-grid" />
        <div className="ac-hero-glow" />
        <div className="container ac-hero-inner">
          <div className="ac-hero-text">
            <span className="badge badge-amber reveal" style={{ marginBottom: 22 }}>
              <GraduationCap size={13} style={{ display: "inline", marginRight: 6 }} />
              Work Proxy Academy
            </span>
            <h1 className="ac-h1 reveal" style={{ ['--delay' as string]: '50ms' }}>
              Master Outlier AI.<br />
              <span className="ac-h1-grad">Get certified.<br />Start earning.</span>
            </h1>
            <p className="ac-sub reveal" style={{ ['--delay' as string]: '100ms' }}>
              A 6-week intensive training programme that takes you from zero to certified Outlier
              AI tasker — with real task practice, live sessions, and guaranteed job placement support.
            </p>
            <div className="ac-hero-actions reveal" style={{ ['--delay' as string]: '150ms' }}>
              <a href="#enroll" className="btn btn-primary btn-lg" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Flame size={18} /> Enroll Now — ₦100,000
              </a>
              <a href="#curriculum" className="btn btn-ghost" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15 }}>
                View Curriculum <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* floating course card */}
          <div className="ac-hero-card reveal" style={{ ['--delay' as string]: '180ms' }}>
            <div className="ac-card-header">
              <div className="ac-card-platform">
                <div className="ac-card-dot" />
                <span>Outlier AI Mastery</span>
              </div>
              <span className="ac-card-live">ENROLLING</span>
            </div>
            <div className="ac-card-price">₦100,000</div>
            <div className="ac-card-meta">One-time · All 6 weeks included</div>

            <div className="ac-card-items">
              {[
                "6 weeks of structured training",
                "Real task practice with feedback",
                "2× live sessions per week",
                "Mock assessment + 1-on-1 review",
                "Official certification on graduation",
                "Direct job placement matching",
              ].map((item) => (
                <div key={item} className="ac-card-item">
                  <CheckCircle size={14} className="ac-card-check" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="ac-card-stats">
              <div className="ac-card-stat"><span>94%</span><small>pass rate</small></div>
              <div className="ac-card-divider" />
              <div className="ac-card-stat"><span>6 wks</span><small>duration</small></div>
              <div className="ac-card-divider" />
              <div className="ac-card-stat"><span>$2K</span><small>top earner</small></div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STAT STRIP ─── */}
      <div className="ac-strip">
        <div className="container">
          <div className="ac-strip-grid">
            {[
              { value: "94%", label: "First-try pass rate" },
              { value: "$2,000", label: "Top monthly earning" },
              { value: "6 weeks", label: "Full programme" },
              { value: "48h", label: "Placement turnaround" },
            ].map((s) => (
              <div key={s.label} className="ac-strip-item reveal">
                <span className="ac-strip-val">{s.value}</span>
                <span className="ac-strip-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── CURRICULUM ─── */}
      <section className="ac-section ac-dark" id="curriculum">
        <div className="container">
          <div className="ac-head">
            <span className="ac-eyebrow amber">Curriculum</span>
            <h2 className="ac-h2 light">6 weeks. <span className="ac-grad-amber">One platform mastered.</span></h2>
            <p className="ac-head-sub light">Every module is built around real Outlier tasks — not theory. You leave each week able to do the work, not just understand it.</p>
          </div>

          <div className="ac-modules">
            {modules.map((m, i) => (
              <article
                key={m.week}
                className="ac-module reveal"
                style={{
                  ['--accent' as string]: m.accent,
                  ['--glow' as string]: m.glow,
                  ['--delay' as string]: `${i * 60}ms`,
                }}
              >
                <div className="ac-module-glow" />
                <div className="ac-module-top">
                  <div className="ac-module-icon">{m.icon}</div>
                  <span className="ac-module-week">{m.week}</span>
                </div>
                <h3 className="ac-module-title">{m.title}</h3>
                <ul className="ac-module-list">
                  {m.topics.map((t) => (
                    <li key={t}><CheckCircle size={13} className="ac-mod-check" />{t}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OUTCOMES ─── */}
      <section className="ac-section">
        <div className="container">
          <div className="ac-head">
            <span className="ac-eyebrow">Outcomes</span>
            <h2 className="ac-h2">What graduation unlocks.</h2>
            <p className="ac-head-sub">These aren't hypotheticals — they're what our last cohort achieved.</p>
          </div>
          <div className="ac-outcomes">
            {outcomes.map((o, i) => (
              <div key={o.title} className="ac-outcome reveal" style={{ ['--delay' as string]: `${i * 80}ms` }}>
                <div className="ac-outcome-icon">{o.icon}</div>
                <h3 className="ac-outcome-title">{o.title}</h3>
                <p className="ac-outcome-desc">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <section className="ac-section" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(37,99,235,0.04) 100%)" }}>
        <div className="container">
          <div className="ac-head">
            <span className="ac-eyebrow">Why Join</span>
            <h2 className="ac-h2">More than a course.</h2>
            <p className="ac-head-sub">Training is the start. Everything around it is what sets our graduates apart.</p>
          </div>
          <div className="ac-benefits">
            {benefits.map((b, i) => (
              <div key={b.title} className="ac-benefit reveal" style={{ ['--delay' as string]: `${i * 60}ms` }}>
                <div className="ac-benefit-icon">{b.icon}</div>
                <h3 className="ac-benefit-title">{b.title}</h3>
                <p className="ac-benefit-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STEPS ─── */}
      <section className="ac-section">
        <div className="container">
          <div className="ac-head">
            <span className="ac-eyebrow">Process</span>
            <h2 className="ac-h2">From sign-up to first paycheque.</h2>
          </div>
          <div className="ac-steps">
            {[
              { n: "01", title: "Enroll & Pay", desc: "Fill the form below. Pay ₦100,000 via bank transfer or USDT. Instant access to all course materials." },
              { n: "02", title: "Train for 6 Weeks", desc: "Work through modules at your pace. Attend 2 live sessions weekly. Submit practise tasks for feedback." },
              { n: "03", title: "Sit the Assessment", desc: "A real mock Outlier assessment under timed conditions. 1-on-1 feedback call with your trainer after." },
              { n: "04", title: "Get Certified & Placed", desc: "Receive your certificate. Get matched to a verified Outlier account through Work Proxy — skip the queue." },
            ].map((s, i) => (
              <div key={s.n} className="ac-step reveal" style={{ ['--delay' as string]: `${i * 70}ms` }}>
                <div className="ac-step-num">{s.n}</div>
                {i < 3 && <div className="ac-step-line" />}
                <h3 className="ac-step-title">{s.title}</h3>
                <p className="ac-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="ac-section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="ac-head">
            <span className="ac-eyebrow">FAQ</span>
            <h2 className="ac-h2">Common questions.</h2>
          </div>
          <div className="ac-faqs">
            {faqs.map((f, i) => (
              <div key={f.q} className={`ac-faq reveal ${openFaq === i ? "open" : ""}`} style={{ ['--delay' as string]: `${i * 50}ms` }}>
                <button className="ac-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  {openFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {openFaq === i && <p className="ac-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ENROLLMENT FORM ─── */}
      <section className="ac-section" id="enroll">
        <div className="container" style={{ maxWidth: 600 }}>
          <div className="ac-head">
            <span className="badge badge-amber reveal"><GraduationCap size={13} style={{ display: "inline", marginRight: 6 }} />Enrolment</span>
            <h2 className="ac-h2 reveal" style={{ ['--delay' as string]: '50ms' }}>Join the next cohort.</h2>
            <p className="ac-head-sub reveal" style={{ ['--delay' as string]: '100ms' }}>
              Fill in your details below. You'll be taken to WhatsApp to confirm payment — then you're in.
            </p>
          </div>

          {submitted ? (
            <div className="ac-success reveal">
              <div className="ac-success-icon"><CheckCircle size={52} /></div>
              <h3>Application sent!</h3>
              <p>Check your WhatsApp — our team will confirm your payment and send you access details within a few hours. Welcome to Work Proxy Academy 🎓</p>
              <button className="btn btn-outline" onClick={() => setSubmitted(false)}>Submit another</button>
            </div>
          ) : (
            <form className="ac-form reveal" style={{ ['--delay' as string]: '120ms' }} onSubmit={handleSubmit}>
              <div className="ac-form-course">
                <div className="ac-form-course-icon"><Target size={22} /></div>
                <div>
                  <div className="ac-form-course-name">Outlier AI Mastery</div>
                  <div className="ac-form-course-meta">6 weeks · Live sessions · Certificate included</div>
                </div>
                <div className="ac-form-course-price">₦100,000</div>
              </div>

              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="form-input" placeholder="Enter your full name" required />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label className="form-label">WhatsApp Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input" placeholder="+234 XXX XXX XXXX" required />
              </div>
              <div className="form-group">
                <label className="form-label">Any prior remote / freelance experience? <span className="text-muted" style={{ fontWeight: 400 }}>(optional)</span></label>
                <textarea name="experience" value={formData.experience} onChange={handleChange} className="form-input" placeholder="Brief description or leave blank" rows={3} style={{ resize: "vertical" }} />
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-full" style={{ justifyContent: "center", gap: 10 }}>
                <Send size={17} /> Enroll via WhatsApp
              </button>
              <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>
                You'll be redirected to WhatsApp to complete payment. One-time fee. No subscriptions.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="ac-section">
        <div className="container">
          <div className="ac-cta">
            <div className="ac-cta-glow" />
            <span className="badge" style={{ marginBottom: 20, background: "rgba(245,158,11,0.15)", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.3)" }}>
              <Flame size={13} style={{ display: "inline", marginRight: 6 }} />Limited Cohort Spots
            </span>
            <h2 className="ac-cta-h">Don't wait — spots fill up.</h2>
            <p className="ac-cta-sub">
              Every cohort is capped to ensure trainer quality. The next intake opens soon.
              Secure your place now.
            </p>
            <div className="ac-cta-actions">
              <a href="#enroll" className="btn btn-lg" style={{ background: "#fff", color: "#0B1120", fontWeight: 700, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
                <GraduationCap size={18} /> Enroll — ₦100,000
              </a>
              <a href="https://wa.me/2349027406685" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.22)", display: "flex", alignItems: "center", gap: 8 }}>
                <Phone size={18} /> Ask a Question
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        /* ── HERO ── */
        .ac-hero {
          position: relative; overflow: hidden;
          background: var(--bg-dark);
          padding: 100px 0 88px;
        }
        .ac-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(245,158,11,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.06) 1px, transparent 1px);
          background-size: 50px 50px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 100%);
        }
        .ac-hero-glow {
          position: absolute; top: -180px; left: 50%; transform: translateX(-50%);
          width: 800px; height: 500px;
          background: radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 65%);
          filter: blur(20px); pointer-events: none;
        }
        .ac-hero-inner {
          position: relative;
          display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center;
        }
        @media (max-width: 900px) {
          .ac-hero-inner { grid-template-columns: 1fr; }
          .ac-hero-card { order: -1; }
        }
        .ac-hero-text { color: #fff; }
        .ac-h1 {
          font-family: var(--font-display); font-size: clamp(36px, 5vw, 60px);
          font-weight: 800; line-height: 1.04; letter-spacing: -0.03em; margin-bottom: 20px;
        }
        .ac-h1-grad {
          background: linear-gradient(120deg, #F59E0B, #FCD34D 50%, #F97316);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .ac-sub { font-size: 17px; line-height: 1.75; color: #94A3B8; margin-bottom: 32px; max-width: 480px; }
        .ac-hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }

        /* floating card */
        .ac-hero-card {
          background: #0B1220; border: 1px solid rgba(245,158,11,0.2);
          border-radius: var(--radius-xl); overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5);
          animation: float 7s ease-in-out infinite;
        }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        .ac-card-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
        }
        .ac-card-platform { display: flex; align-items: center; gap: 9px; font-size: 13px; font-weight: 600; color: #CBD5E1; }
        .ac-card-dot { width: 8px; height: 8px; border-radius: 50%; background: #F59E0B; box-shadow: 0 0 8px rgba(245,158,11,0.7); animation: ledBlink 2s ease-in-out infinite; }
        @keyframes ledBlink { 0%,100%{opacity:1} 50%{opacity:.3} }
        .ac-card-live { font-size: 10px; font-weight: 700; letter-spacing: .1em; color: #F59E0B; background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.25); padding: 3px 9px; border-radius: var(--radius-full); }
        .ac-card-price { font-family: var(--font-display); font-size: 40px; font-weight: 800; color: #fff; padding: 20px 20px 4px; line-height: 1; }
        .ac-card-meta { font-size: 12px; color: #64748B; padding: 0 20px 20px; }
        .ac-card-items { display: flex; flex-direction: column; gap: 12px; padding: 0 20px 20px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .ac-card-item { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #CBD5E1; }
        .ac-card-check { color: #F59E0B; flex-shrink: 0; }
        .ac-card-stats { display: flex; align-items: center; padding: 16px 20px; gap: 0; }
        .ac-card-stat { flex: 1; text-align: center; }
        .ac-card-stat span { display: block; font-family: var(--font-display); font-size: 22px; font-weight: 800; color: #fff; }
        .ac-card-stat small { font-size: 11px; color: #64748B; font-weight: 500; }
        .ac-card-divider { width: 1px; height: 36px; background: rgba(255,255,255,0.07); }

        /* STRIP */
        .ac-strip { background: var(--bg-secondary); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 0; }
        .ac-strip-grid { display: grid; grid-template-columns: repeat(4,1fr); }
        @media (max-width: 768px) { .ac-strip-grid { grid-template-columns: repeat(2,1fr); } }
        .ac-strip-item { padding: 28px 24px; text-align: center; border-right: 1px solid var(--border); transition: background .2s; }
        .ac-strip-item:last-child { border-right: none; }
        @media (max-width: 768px) {
          .ac-strip-item:nth-child(2) { border-right: none; }
          .ac-strip-item:nth-child(1), .ac-strip-item:nth-child(2) { border-bottom: 1px solid var(--border); }
        }
        .ac-strip-val { display: block; font-family: var(--font-display); font-size: 32px; font-weight: 800; background: linear-gradient(120deg, #D97706, #F59E0B); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .ac-strip-label { font-size: 12px; color: var(--text-muted); font-weight: 600; margin-top: 4px; display: block; }

        /* SECTIONS */
        .ac-section { padding: 88px 0; }
        .ac-dark { background: var(--bg-dark); }
        .ac-head { text-align: center; max-width: 680px; margin: 0 auto 52px; }
        .ac-eyebrow { font-family: ${MONO}; font-size: 12px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: var(--accent-primary); display: inline-block; margin-bottom: 14px; }
        .ac-eyebrow.amber { color: #F59E0B; }
        .ac-h2 { font-family: var(--font-display); font-size: clamp(28px, 4vw, 44px); font-weight: 800; letter-spacing: -.025em; line-height: 1.1; margin-bottom: 14px; color: var(--text-primary); }
        .ac-h2.light { color: #fff; }
        .ac-grad-amber { background: linear-gradient(120deg, #F59E0B, #FCD34D); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .ac-head-sub { color: var(--text-secondary); font-size: 16px; line-height: 1.75; max-width: 560px; margin: 0 auto; }
        .ac-head-sub.light { color: #94A3B8; }

        /* MODULES */
        .ac-modules { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; }
        @media (max-width: 900px) { .ac-modules { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 560px) { .ac-modules { grid-template-columns: 1fr; } }
        .ac-module {
          position: relative; overflow: hidden;
          background: linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015));
          border: 1px solid rgba(255,255,255,0.07); border-radius: var(--radius-xl); padding: 26px;
          transition: transform .35s cubic-bezier(.22,1,.36,1), border-color .35s;
        }
        .ac-module:hover { transform: translateY(-5px); border-color: color-mix(in srgb, var(--accent) 45%, transparent); }
        .ac-module-glow {
          position: absolute; top: -40%; right: -20%; width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(var(--glow),.22), transparent 70%);
          opacity: 0; transition: opacity .4s; pointer-events: none;
        }
        .ac-module:hover .ac-module-glow { opacity: 1; }
        .ac-module-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .ac-module-icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--accent); background: color-mix(in srgb, var(--accent) 14%, transparent); border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent); transition: transform .35s cubic-bezier(.22,1,.36,1); }
        .ac-module:hover .ac-module-icon { transform: scale(1.08) rotate(-3deg); }
        .ac-module-week { font-family: ${MONO}; font-size: 12px; font-weight: 700; color: rgba(255,255,255,.25); letter-spacing: .06em; }
        .ac-module-title { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: #F1F5F9; margin-bottom: 14px; }
        .ac-module-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .ac-module-list li { display: flex; align-items: flex-start; gap: 9px; font-size: 13.5px; color: #94A3B8; line-height: 1.55; }
        .ac-mod-check { color: #F59E0B; flex-shrink: 0; margin-top: 2px; }

        /* OUTCOMES */
        .ac-outcomes { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        @media (max-width: 768px) { .ac-outcomes { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; } }
        .ac-outcome {
          background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-xl);
          padding: 32px 28px; box-shadow: var(--shadow-xs); transition: all .25s cubic-bezier(.22,1,.36,1);
        }
        .ac-outcome:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: var(--border-accent); }
        .ac-outcome-icon { width: 48px; height: 48px; border-radius: var(--radius-md); background: var(--bg-glass-blue); border: 1px solid var(--border); display: grid; place-items: center; color: var(--accent-primary); margin-bottom: 18px; }
        .ac-outcome-title { font-family: var(--font-display); font-size: 19px; font-weight: 700; margin-bottom: 10px; color: var(--text-primary); }
        .ac-outcome-desc { font-size: 14px; color: var(--text-secondary); line-height: 1.7; }

        /* BENEFITS */
        .ac-benefits { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        @media (max-width: 900px) { .ac-benefits { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 560px) { .ac-benefits { grid-template-columns: 1fr; } }
        .ac-benefit { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 28px 24px; transition: all .2s; }
        .ac-benefit:hover { border-color: var(--border-accent); box-shadow: var(--shadow-md); }
        .ac-benefit-icon { width: 42px; height: 42px; border-radius: var(--radius-sm); background: var(--bg-glass-blue); display: grid; place-items: center; color: var(--accent-primary); margin-bottom: 16px; border: 1px solid var(--border); }
        .ac-benefit-title { font-family: var(--font-display); font-size: 17px; font-weight: 700; margin-bottom: 8px; color: var(--text-primary); }
        .ac-benefit-desc { font-size: 13.5px; color: var(--text-secondary); line-height: 1.7; }

        /* STEPS */
        .ac-steps { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; position: relative; }
        @media (max-width: 900px) { .ac-steps { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 560px) { .ac-steps { grid-template-columns: 1fr; } }
        .ac-step { position: relative; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-xl); padding: 28px 22px; transition: all .2s cubic-bezier(.22,1,.36,1); }
        .ac-step:hover { border-color: var(--border-accent); transform: translateY(-3px); box-shadow: var(--shadow-md); }
        .ac-step-num { width: 46px; height: 46px; border-radius: 50%; background: var(--accent-primary); color: #fff; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-weight: 800; font-size: 16px; margin-bottom: 16px; box-shadow: var(--shadow-button); }
        .ac-step-line { display: none; }
        .ac-step-title { font-family: var(--font-display); font-size: 17px; font-weight: 700; margin-bottom: 8px; color: var(--text-primary); }
        .ac-step-desc { font-size: 13.5px; color: var(--text-secondary); line-height: 1.7; }

        /* FAQ */
        .ac-faqs { display: flex; flex-direction: column; gap: 12px; }
        .ac-faq { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; transition: border-color .2s; }
        .ac-faq.open { border-color: var(--border-accent); }
        .ac-faq-q { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 18px 22px; cursor: pointer; font-size: 15px; font-weight: 600; color: var(--text-primary); text-align: left; }
        .ac-faq-q svg { flex-shrink: 0; color: var(--accent-primary); }
        .ac-faq-a { padding: 0 22px 18px; font-size: 14px; color: var(--text-secondary); line-height: 1.75; }

        /* FORM */
        .ac-form { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-2xl); padding: 40px; box-shadow: var(--shadow-lg); display: flex; flex-direction: column; gap: 20px; }
        @media (max-width: 540px) { .ac-form { padding: 24px 20px; } }
        .ac-form-course { display: flex; align-items: center; gap: 14px; background: rgba(245,158,11,0.06); border: 1px solid rgba(245,158,11,0.2); border-radius: var(--radius-lg); padding: 16px; }
        .ac-form-course-icon { width: 44px; height: 44px; border-radius: var(--radius-sm); background: rgba(245,158,11,0.12); display: grid; place-items: center; color: #D97706; flex-shrink: 0; }
        .ac-form-course-name { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--text-primary); }
        .ac-form-course-meta { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
        .ac-form-course-price { margin-left: auto; font-family: var(--font-display); font-size: 22px; font-weight: 800; color: #D97706; white-space: nowrap; }

        /* SUCCESS */
        .ac-success { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-2xl); padding: 60px 40px; text-align: center; box-shadow: var(--shadow-lg); }
        .ac-success-icon { color: var(--accent-emerald); margin-bottom: 20px; }
        .ac-success h3 { font-family: var(--font-display); font-size: 28px; font-weight: 800; margin-bottom: 12px; }
        .ac-success p { color: var(--text-secondary); line-height: 1.8; margin-bottom: 24px; }

        /* CTA */
        .ac-cta { background: linear-gradient(135deg, #0B1120 0%, #1E1B4B 45%, #0B1120 100%); border-radius: var(--radius-3xl); padding: 96px 40px; text-align: center; position: relative; overflow: hidden; box-shadow: 0 24px 80px rgba(37,99,235,0.25); border: 1px solid rgba(37,99,235,0.15); }
        .ac-cta-glow { position: absolute; top: -40%; left: 50%; transform: translateX(-50%); width: 700px; height: 360px; background: radial-gradient(ellipse, rgba(245,158,11,0.2) 0%, transparent 70%); pointer-events: none; }
        .ac-cta-h { font-family: var(--font-display); font-size: clamp(26px, 4vw, 42px); font-weight: 800; color: #fff; letter-spacing: -.025em; margin-bottom: 14px; }
        .ac-cta-sub { color: #94A3B8; font-size: 17px; max-width: 480px; margin: 0 auto 32px; line-height: 1.7; }
        .ac-cta-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
      `}</style>
    </div>
  );
}
