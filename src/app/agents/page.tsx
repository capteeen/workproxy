import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  ArrowRight, BadgeCheck, Banknote, CalendarClock, CheckCircle2,
  FileSignature, Globe2, HandCoins, ShieldCheck, Sparkles, TrendingUp, Users
} from "lucide-react";

export const metadata = {
  title: "Become a Work Proxy Agent — Earn 5–10% Weekly",
  description:
    "Refer people to register and run managed accounts on Outlier, OneForma and Handshake. Earn 5–10% of every account, paid weekly. Open to agents in the UK, Australia, Canada, US and Nigeria.",
};

const COUNTRIES = [
  { flag: "🇬🇧", name: "United Kingdom" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇨🇦", name: "Canada" },
  { flag: "🇺🇸", name: "United States" },
  { flag: "🇳🇬", name: "Nigeria" },
];

const TIERS = [
  {
    name: "Tier 1 · Standard",
    pct: "5%",
    tag: "New agents",
    desc: "Where every agent starts. Earn 5% of each account you bring, every week.",
    accent: "var(--accent-primary)",
  },
  {
    name: "Tier 2 · Performer",
    pct: "7%",
    tag: "Consistent results",
    desc: "Refer quality people consistently and move up to 7% on your accounts.",
    accent: "var(--accent-violet)",
    featured: true,
  },
  {
    name: "Tier 3 · Top Agent",
    pct: "10%",
    tag: "High performers",
    desc: "Our best-performing agents earn the maximum 10% share, paid weekly.",
    accent: "var(--accent-amber)",
  },
];

const STEPS = [
  {
    icon: <FileSignature size={22} />,
    title: "Apply & sign the agreement",
    body: "Open the Agent Partnership Agreement, fill in your details, and sign it online in two minutes. That's your official onboarding.",
  },
  {
    icon: <Users size={22} />,
    title: "Refer qualified people",
    body: "Introduce friends and contacts who can register and run accounts. The account holders you refer must be based outside Nigeria (platform requirement).",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "We onboard & manage",
    body: "Work Proxy handles registration, assessments, training and account management — so your referrals actually start earning.",
  },
  {
    icon: <HandCoins size={22} />,
    title: "Earn every week",
    body: "You receive your commission on each active account you brought, paid weekly — for as long as the account stays active.",
  },
];

const RULES = [
  "Refer only qualified people: 18+, valid government ID, stable internet and a working PC, and based outside Nigeria.",
  "Represent Work Proxy accurately — never promise guaranteed income or platform approval.",
  "Submit every referral through the official Work Proxy channel (WhatsApp or agent intake).",
  "Never collect payments, fees or deposits from the people you refer — all money is handled by Work Proxy.",
  "Keep Work Proxy's processes and any shared information confidential.",
  "Communicate professionally and respectfully at all times.",
];

const CONTRACT_URL = "/agreements/work-proxy-agent-agreement.html";
const WHATSAPP_URL =
  "https://wa.me/2347076245153?text=" +
  encodeURIComponent("Hi Work Proxy, I'd like to become an Agent. Here are my details:\nName:\nCountry:\nEmail:");

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />

      {/* HERO */}
      <section className="svc-hero">
        <div className="container">
          <div className="svc-hero-inner" style={{ textAlign: "center" }}>
            <span className="badge badge-purple" style={{ marginBottom: 20 }}>
              <Sparkles size={14} style={{ marginRight: 6 }} /> Work Proxy Agent Programme
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 800,
                marginBottom: 20,
                lineHeight: 1.1,
              }}
            >
              Become a <span className="gradient-text">Work Proxy Agent</span>
            </h1>
            <p
              className="text-secondary"
              style={{ maxWidth: 660, margin: "0 auto 28px", fontSize: 18, lineHeight: 1.7 }}
            >
              Bring people to register and run managed accounts on Outlier, OneForma and Handshake —
              and earn <strong>5%–10% of every account, paid weekly.</strong> No upfront cost. Just refer, and earn.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={CONTRACT_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Open the Agent Agreement <ArrowRight size={18} />
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 16,
            }}
          >
            {[
              { icon: <TrendingUp size={22} />, big: "5–10%", small: "Commission per account" },
              { icon: <CalendarClock size={22} />, big: "Weekly", small: "Paid every Friday" },
              { icon: <Banknote size={22} />, big: "₦0", small: "Cost to join" },
              { icon: <Globe2 size={22} />, big: "5", small: "Eligible countries" },
            ].map((s, i) => (
              <div key={i} className="card shadow-sm" style={{ padding: 24, textAlign: "center" }}>
                <div
                  className="avatar avatar-md"
                  style={{ background: "var(--bg-glass-blue)", color: "var(--accent-primary)", margin: "0 auto 12px" }}
                >
                  {s.icon}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800 }}>{s.big}</div>
                <div className="text-sm text-muted">{s.small}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO CAN APPLY */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="card shadow-md" style={{ padding: "36px 32px" }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <span className="badge" style={{ marginBottom: 12 }}>Who can apply</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px,3vw,32px)", fontWeight: 800 }}>
                Open to agents in these countries
              </h2>
              <p className="text-secondary" style={{ maxWidth: 620, margin: "10px auto 0" }}>
                You can be an agent if you're based in any of the countries below. Note: the <strong>account holders you
                refer</strong> must be located <strong>outside Nigeria</strong> to meet platform requirements.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: 14,
              }}
            >
              {COUNTRIES.map((c) => (
                <div
                  key={c.name}
                  className="card"
                  style={{
                    padding: "18px 16px",
                    textAlign: "center",
                    border: "1.5px solid var(--border-accent)",
                  }}
                >
                  <div style={{ fontSize: 34, lineHeight: 1, marginBottom: 8 }}>{c.flag}</div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMMISSION TIERS */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <span className="badge badge-purple" style={{ marginBottom: 12 }}>Commission tiers</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px,3vw,32px)", fontWeight: 800 }}>
              The better you perform, the more you earn
            </h2>
            <p className="text-secondary" style={{ maxWidth: 620, margin: "10px auto 0" }}>
              Every agent starts at Tier 1. As you refer quality people consistently, you move up — and your share of
              every account goes up with you.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 18,
            }}
          >
            {TIERS.map((t) => (
              <div
                key={t.name}
                className="card shadow-md"
                style={{
                  padding: 28,
                  position: "relative",
                  border: t.featured ? "2px solid var(--accent-violet)" : "1px solid var(--border)",
                }}
              >
                {t.featured && (
                  <span
                    className="badge badge-purple"
                    style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)" }}
                  >
                    Most agents
                  </span>
                )}
                <div className="text-sm text-muted" style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {t.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 56,
                    fontWeight: 800,
                    lineHeight: 1,
                    color: t.accent,
                    margin: "10px 0 6px",
                  }}
                >
                  {t.pct}
                </div>
                <div className="text-sm" style={{ fontWeight: 600, marginBottom: 12 }}>{t.tag}</div>
                <p className="text-secondary text-sm" style={{ lineHeight: 1.6 }}>{t.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted" style={{ textAlign: "center", marginTop: 18 }}>
            Commission is earned on each verified, active account you bring — paid weekly, for the lifetime of the account.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <span className="badge" style={{ marginBottom: 12 }}>How to do it properly</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px,3vw,32px)", fontWeight: 800 }}>
              From sign-up to your first payout
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 18,
            }}
          >
            {STEPS.map((s, i) => (
              <div key={i} className="card shadow-sm" style={{ padding: 26 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div
                    className="avatar avatar-md"
                    style={{ background: "var(--accent-primary)", color: "#fff", flexShrink: 0 }}
                  >
                    {s.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 13,
                      fontWeight: 800,
                      color: "var(--accent-primary)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Step {i + 1}
                  </div>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                <p className="text-secondary text-sm" style={{ lineHeight: 1.6 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RULES / DO IT PROPERLY */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="card shadow-md" style={{ padding: "36px 32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div className="avatar avatar-md" style={{ background: "var(--accent-emerald)", color: "#fff" }}>
                <BadgeCheck size={20} />
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,3vw,28px)", fontWeight: 800 }}>
                The rules — do it right and keep your commission
              </h2>
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {RULES.map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <CheckCircle2 size={20} style={{ color: "var(--accent-emerald)", flexShrink: 0, marginTop: 2 }} />
                  <span className="text-secondary" style={{ fontSize: 15, lineHeight: 1.6 }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div
            className="card shadow-xl"
            style={{
              padding: "44px 32px",
              textAlign: "center",
              background: "var(--grad-primary)",
              color: "#fff",
              border: "none",
            }}
          >
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 800, marginBottom: 12 }}>
              Ready to start earning?
            </h2>
            <p style={{ maxWidth: 560, margin: "0 auto 26px", fontSize: 17, opacity: 0.95, lineHeight: 1.7 }}>
              Open the Agent Partnership Agreement, fill in your details and sign online. You'll be ready to refer your
              first people today.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href={CONTRACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{ background: "#fff", color: "var(--accent-primary)", fontWeight: 700 }}
              >
                Open the Agent Agreement <ArrowRight size={18} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)" }}
              >
                Ask a question on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
