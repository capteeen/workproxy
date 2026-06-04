'use client';

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Infinity, TrendingUp, RefreshCw, Zap, User, Users, Wallet, X, PenLine, RotateCcw, Send, CheckCircle } from "lucide-react";

/* ─── static data ─── */
const tiers = [
  {
    label: "Starter", range: "1 – 9 accounts", pct: 5,
    color: "#2563EB", bg: "rgba(37,99,235,0.07)", border: "rgba(37,99,235,0.2)",
    rows: [
      { accounts: 1, weekly: 60,  monthly: 240  },
      { accounts: 3, weekly: 180, monthly: 720  },
      { accounts: 5, weekly: 300, monthly: 1200 },
      { accounts: 9, weekly: 540, monthly: 2160 },
    ],
  },
  {
    label: "Builder", range: "10 – 19 accounts", pct: 7,
    color: "#7C3AED", bg: "rgba(124,58,237,0.07)", border: "rgba(124,58,237,0.2)",
    rows: [
      { accounts: 10, weekly: 840,  monthly: 3360 },
      { accounts: 13, weekly: 1092, monthly: 4368 },
      { accounts: 16, weekly: 1344, monthly: 5376 },
      { accounts: 19, weekly: 1596, monthly: 6384 },
    ],
  },
  {
    label: "Elite", range: "20+ accounts", pct: 10,
    color: "#D97706", bg: "rgba(217,119,6,0.07)", border: "rgba(217,119,6,0.2)",
    rows: [
      { accounts: 20, weekly: 2400, monthly: 9600  },
      { accounts: 25, weekly: 3000, monthly: 12000 },
      { accounts: 30, weekly: 3600, monthly: 14400 },
      { accounts: 50, weekly: 6000, monthly: 24000 },
    ],
  },
];

const progression = [
  { month: "Month 1",  accounts: 2,  tier: "Starter", weekly: 120,  monthly: 480,   cumulative: 480   },
  { month: "Month 2",  accounts: 4,  tier: "Starter", weekly: 240,  monthly: 960,   cumulative: 1440  },
  { month: "Month 3",  accounts: 6,  tier: "Starter", weekly: 360,  monthly: 1440,  cumulative: 2880  },
  { month: "Month 4",  accounts: 8,  tier: "Starter", weekly: 480,  monthly: 1920,  cumulative: 4800  },
  { month: "Month 5",  accounts: 10, tier: "Builder", weekly: 840,  monthly: 3360,  cumulative: 8160  },
  { month: "Month 6",  accounts: 12, tier: "Builder", weekly: 1008, monthly: 4032,  cumulative: 12192 },
  { month: "Month 7",  accounts: 15, tier: "Builder", weekly: 1260, monthly: 5040,  cumulative: 17232 },
  { month: "Month 8",  accounts: 18, tier: "Builder", weekly: 1512, monthly: 6048,  cumulative: 23280 },
  { month: "Month 9",  accounts: 20, tier: "Elite",   weekly: 2400, monthly: 9600,  cumulative: 32880 },
  { month: "Month 10", accounts: 25, tier: "Elite",   weekly: 3000, monthly: 12000, cumulative: 44880 },
  { month: "Month 11", accounts: 30, tier: "Elite",   weekly: 3600, monthly: 14400, cumulative: 59280 },
  { month: "Month 12", accounts: 35, tier: "Elite",   weekly: 4200, monthly: 16800, cumulative: 76080 },
];

const tierColor: Record<string, string> = { Starter: "#2563EB", Builder: "#7C3AED", Elite: "#D97706" };
const tierBg: Record<string, string> = { Starter: "rgba(37,99,235,0.1)", Builder: "rgba(124,58,237,0.1)", Elite: "rgba(217,119,6,0.1)" };
const fmt = (n: number) => "$" + n.toLocaleString();

const WA_NUMBER = "2347076245153";

/* ─── Signature canvas ─── */
function SignaturePad({ onSign }: { onSign: (dataUrl: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [signed, setSigned] = useState(false);

  const getPos = (e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const src = "touches" in e ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  };

  const start = useCallback((e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const pos = getPos(e, canvas);
    ctx.beginPath(); ctx.moveTo(pos.x, pos.y);
    drawing.current = true;
  }, []);

  const move = useCallback((e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    if (!drawing.current) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const pos = getPos(e, canvas);
    ctx.lineWidth = 2; ctx.lineCap = "round"; ctx.strokeStyle = "#0b1120";
    ctx.lineTo(pos.x, pos.y); ctx.stroke();
  }, []);

  const end = useCallback(() => {
    drawing.current = false;
    const canvas = canvasRef.current; if (!canvas) return;
    setSigned(true);
    onSign(canvas.toDataURL("image/png"));
  }, [onSign]);

  const clear = () => {
    const canvas = canvasRef.current; if (!canvas) return;
    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
    setSigned(false); onSign("");
  };

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", move);
    canvas.addEventListener("mouseup", end);
    canvas.addEventListener("touchstart", start, { passive: false });
    canvas.addEventListener("touchmove", move, { passive: false });
    canvas.addEventListener("touchend", end);
    return () => {
      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mousemove", move);
      canvas.removeEventListener("mouseup", end);
      canvas.removeEventListener("touchstart", start);
      canvas.removeEventListener("touchmove", move);
      canvas.removeEventListener("touchend", end);
    };
  }, [start, move, end]);

  return (
    <div>
      <div style={{ position: "relative", border: "1.5px solid #e2e8f0", borderRadius: 8, background: "#fafafa", overflow: "hidden" }}>
        <canvas ref={canvasRef} width={560} height={110} style={{ display: "block", width: "100%", cursor: "crosshair", touchAction: "none" }} />
        <span style={{ position: "absolute", bottom: 8, left: 12, fontSize: 11, color: "#cbd5e1", pointerEvents: "none", userSelect: "none" }}>Sign here</span>
        {signed && (
          <button type="button" onClick={clear} style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.06)", border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#64748b" }}>
            <RotateCcw size={11} /> Clear
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Apply Modal ─── */
function ApplyModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", country: "", weeklyReferrals: "", agreed: false });
  const [sig, setSig] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const up = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const valid = form.fullName && form.email && form.phone && form.country && form.weeklyReferrals && form.agreed && sig.startsWith("data:image");

  const handleSubmit = async () => {
    setLoading(true); setErr("");
    try {
      const res = await fetch("/api/contracts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          docType: "AGENT_AGREEMENT",
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          country: form.country,
          commissionRate: "5% (Starter) — upgrades to 7% at 10 accounts, 10% at 20 accounts",
          teamLead: `Weekly referral estimate: ${form.weeklyReferrals} people`,
          signatureImage: sig,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");

      // Build WhatsApp message
      const msg = [
        `*NEW AGENT APPLICATION — Work Proxy*`,
        ``,
        `*Name:* ${form.fullName}`,
        `*Email:* ${form.email}`,
        `*Phone/WhatsApp:* ${form.phone}`,
        `*Country:* ${form.country}`,
        `*People they can bring weekly:* ${form.weeklyReferrals}`,
        ``,
        `*Contract Reference:* ${data.id}`,
        `*Signed:* ${new Date(data.signedAt).toUTCString()}`,
        ``,
        `Agent Agreement signed and saved. Please review and confirm onboarding.`,
      ].join("\n");

      window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
      setDone(true);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(11,17,32,0.6)", backdropFilter: "blur(8px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>

        {/* Modal header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 28px 0" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#d97706", marginBottom: 4 }}>Work Proxy</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800, color: "#0b1120", margin: 0 }}>Agent Application</h2>
          </div>
          <button onClick={onClose} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, width: 34, height: 34, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={16} color="#64748b" />
          </button>
        </div>

        <div style={{ padding: "20px 28px 28px" }}>
          {done ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(5,150,105,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <CheckCircle size={28} color="#059669" />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 800, color: "#0b1120", marginBottom: 8 }}>Application Submitted</h3>
              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.65, maxWidth: 360, margin: "0 auto 24px" }}>
                Your signed contract has been saved and your details have been sent to the Work Proxy onboarding team via WhatsApp. You will be contacted within 24 hours.
              </p>
              <button onClick={onClose} style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)", color: "#fff", border: "none", borderRadius: 9999, padding: "10px 28px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                Done
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.65, margin: 0 }}>
                Fill in your details below. Your signed application will be sent directly to our onboarding team on WhatsApp along with your contract.
              </p>

              {/* Fields */}
              {[
                { label: "Full Name *", key: "fullName", placeholder: "e.g. James Okafor", type: "text" },
                { label: "Email Address *", key: "email", placeholder: "you@example.com", type: "email" },
                { label: "Phone / WhatsApp Number *", key: "phone", placeholder: "+234 800 000 0000", type: "tel" },
                { label: "Country *", key: "country", placeholder: "e.g. Nigeria", type: "text" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={(form as any)[f.key]}
                    onChange={e => up(f.key, e.target.value)}
                    style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 8, padding: "10px 14px", fontSize: 14, color: "#0b1120", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                  />
                </div>
              ))}

              {/* Weekly referrals */}
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>How many people can you bring per week? *</label>
                <select
                  value={form.weeklyReferrals}
                  onChange={e => up("weeklyReferrals", e.target.value)}
                  style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 8, padding: "10px 14px", fontSize: 14, color: form.weeklyReferrals ? "#0b1120" : "#94a3b8", outline: "none", background: "#fff", fontFamily: "inherit" }}
                >
                  <option value="">Select an estimate...</option>
                  <option value="1–2 people">1–2 people</option>
                  <option value="3–5 people">3–5 people</option>
                  <option value="6–10 people">6–10 people</option>
                  <option value="10–20 people">10–20 people</option>
                  <option value="20+ people">20+ people</option>
                </select>
              </div>

              {/* Signature */}
              <div>
                <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                  <PenLine size={13} /> Your Signature *
                </label>
                <SignaturePad onSign={setSig} />
                <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 6 }}>Draw your signature above. This constitutes your digital agreement to the Work Proxy Agent Terms.</p>
              </div>

              {/* Agreement checkbox */}
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={form.agreed}
                  onChange={e => up("agreed", e.target.checked)}
                  style={{ marginTop: 3, flexShrink: 0, accentColor: "#2563eb", width: 15, height: 15 }}
                />
                <span style={{ fontSize: 13, color: "#475569", lineHeight: 1.6 }}>
                  I agree to the <strong style={{ color: "#2563eb" }}>Work Proxy Agent Agreement</strong> — I understand the commission tiers, payout schedule, and my responsibilities as a referring agent.
                </span>
              </label>

              {err && <p style={{ fontSize: 13, color: "#dc2626", background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.15)", borderRadius: 8, padding: "10px 14px", margin: 0 }}>{err}</p>}

              <button
                onClick={handleSubmit}
                disabled={!valid || loading}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: valid && !loading ? "linear-gradient(135deg,#2563eb,#7c3aed)" : "#e2e8f0", color: valid && !loading ? "#fff" : "#94a3b8", border: "none", borderRadius: 9999, padding: "13px 24px", fontWeight: 700, fontSize: 14, cursor: valid && !loading ? "pointer" : "not-allowed", transition: "all 0.15s", marginTop: 4 }}
              >
                {loading ? <span style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} /> : <><Send size={15} /> Submit Application via WhatsApp</>}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main page ─── */
export default function AgentReferralPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {modalOpen && <ApplyModal onClose={() => setModalOpen(false)} />}

      {/* ── Toolbar ── */}
      <div className="toolbar no-print">
        <Link href="/" className="back-link">
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <div className="toolbar-right">
          <button className="dl-btn" onClick={() => window.print()}>
            <Download size={14} /> Download PDF
          </button>
        </div>
      </div>

      {/* ── Document ── */}
      <div className="doc-wrap">
        <div className="doc">

          {/* Header */}
          <div className="doc-header">
            <div className="doc-logo">
              <img src="/logo.jpg" alt="Work Proxy" />
              <span>Work Proxy</span>
            </div>
            <div className="hero-badge">Agent Referral Programme</div>
            <h1>Get Paid Every Week.<br />For Every Person You Bring.</h1>
            <p className="hero-sub">
              As a Work Proxy Agent, you earn a percentage of every account you refer — week after week, for as long as they work. No cap. No ceiling. The more people you bring, the higher your commission rate climbs.
            </p>
            <div className="doc-divider" />
          </div>

          {/* How it works */}
          <div className="section-title">How It Works</div>
          <div className="how-grid">
            {[
              { n: "1", title: "Refer someone", body: "Personally bring someone to register an Outlier account under Work Proxy." },
              { n: "2", title: "They start earning", body: "Your referral works a minimum of 12 hours daily on Outlier AI, averaging $1,200 per week per account." },
              { n: "3", title: "You get paid", body: "Every Wednesday (UK) or Thursday (US/Canada), your commission lands automatically." },
            ].map(c => (
              <div key={c.n} className="how-card">
                <div className="how-num">{c.n}</div>
                <div><strong>{c.title}</strong><p>{c.body}</p></div>
              </div>
            ))}
          </div>

          <div className="rule" />

          {/* Pay split */}
          <div className="section-title" style={{ marginTop: 28 }}>How Each Account's Pay Is Split</div>
          <p className="section-sub">Every active account generates an average of <strong>$1,200 per week</strong>. Here is exactly how that is distributed.</p>

          <div className="split-block">
            <div className="split-bar-wrap">
              <div className="split-bar-seg" style={{ width: "50%", background: "#059669" }} />
              <div className="split-bar-seg" style={{ width: "10%", background: "#D97706" }} />
              <div className="split-bar-seg" style={{ width: "40%", background: "#e2e8f0" }} />
            </div>
            {[
              { dot: "#059669", label: "Account Owner", pct: "50%" },
              { dot: "#D97706", label: "Agent Commission (up to)", pct: "5 – 10%" },
              { dot: "#cbd5e1", label: "Work Proxy Operations", pct: "40 – 45%" },
            ].map(l => (
              <div key={l.label} className="split-legend">
                <span className="split-dot" style={{ background: l.dot }} />
                <span className="split-legend-label">{l.label}</span>
                <span className="split-legend-pct">{l.pct}</span>
              </div>
            ))}
          </div>

          <div className="owner-cards">
            <div className="owner-card" style={{ borderColor: "rgba(5,150,105,0.25)", background: "rgba(5,150,105,0.05)" }}>
              <div className="owner-card-icon" style={{ background: "rgba(5,150,105,0.12)", color: "#059669" }}><User size={18} /></div>
              <div>
                <div className="owner-card-title">Account Owner</div>
                <div className="owner-card-amount" style={{ color: "#059669" }}>$600 / week</div>
                <div className="owner-card-note">Fixed 50% of account earnings. Paid every Wednesday (UK) or Thursday (US/CA).</div>
              </div>
            </div>
            <div className="owner-card" style={{ borderColor: "rgba(217,119,6,0.25)", background: "rgba(217,119,6,0.05)" }}>
              <div className="owner-card-icon" style={{ background: "rgba(217,119,6,0.12)", color: "#D97706" }}><Users size={18} /></div>
              <div>
                <div className="owner-card-title">Agent (you)</div>
                <div className="owner-card-amount" style={{ color: "#D97706" }}>$60 – $120 / account / week</div>
                <div className="owner-card-note">5% to 10% depending on your tier. Grows as you refer more accounts.</div>
              </div>
            </div>
            <div className="owner-card" style={{ borderColor: "rgba(37,99,235,0.18)", background: "rgba(37,99,235,0.04)" }}>
              <div className="owner-card-icon" style={{ background: "rgba(37,99,235,0.1)", color: "#2563EB" }}><Wallet size={18} /></div>
              <div>
                <div className="owner-card-title">Work Proxy</div>
                <div className="owner-card-amount" style={{ color: "#2563EB" }}>$480 – $540 / account / week</div>
                <div className="owner-card-note">Covers platform management, compliance, infrastructure, and support.</div>
              </div>
            </div>
          </div>

          <div className="rule" />

          {/* Tiers */}
          <div className="section-title" style={{ marginTop: 28 }}>Commission Tiers</div>
          <p className="section-sub">Your rate upgrades automatically the moment you hit the next threshold. Once upgraded, <strong>all your accounts</strong> earn at the new rate.</p>

          {tiers.map(tier => (
            <div key={tier.label} className="tier-block" style={{ borderColor: tier.border, background: tier.bg }}>
              <div className="tier-header">
                <div>
                  <span className="tier-badge" style={{ color: tier.color, background: tier.bg, border: `1px solid ${tier.border}` }}>{tier.label}</span>
                  <span className="tier-range">{tier.range}</span>
                </div>
                <div className="tier-pct" style={{ color: tier.color }}>{tier.pct}%<span> / account / week</span></div>
              </div>
              <table className="earn-table">
                <thead><tr><th>Accounts</th><th>Weekly earnings</th><th>Monthly earnings</th></tr></thead>
                <tbody>
                  {tier.rows.map(r => (
                    <tr key={r.accounts}>
                      <td>{r.accounts} {r.accounts === 1 ? "account" : "accounts"}</td>
                      <td><strong>{fmt(r.weekly)}</strong></td>
                      <td>{fmt(r.monthly)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          <div className="rule" style={{ marginTop: 8 }} />

          {/* 1-year progression */}
          <div className="section-title" style={{ marginTop: 28 }}>Your Year 1 Journey</div>
          <p className="section-sub">Based on consistent growth of 2–5 new accounts per month, here is what a typical agent trajectory looks like over 12 months.</p>

          <table className="prog-table">
            <thead>
              <tr><th>Month</th><th>Accounts</th><th>Tier</th><th>Weekly</th><th>Monthly</th><th>Total earned</th></tr>
            </thead>
            <tbody>
              {progression.map((p, i) => (
                <tr key={i} className={p.tier === "Elite" ? "row-elite" : p.tier === "Builder" ? "row-builder" : ""}>
                  <td>{p.month}</td>
                  <td>{p.accounts}</td>
                  <td><span className="prog-tier" style={{ color: tierColor[p.tier], background: tierBg[p.tier] }}>{p.tier}</span></td>
                  <td><strong>{fmt(p.weekly)}</strong></td>
                  <td>{fmt(p.monthly)}</td>
                  <td>{fmt(p.cumulative)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="year-total">
            <div className="year-total-left">
              <div className="year-total-label">Projected Year 1 Total Earnings</div>
              <div className="year-total-note">Based on consistent referral growth of 2–5 accounts per month.</div>
            </div>
            <div className="year-total-amount">$76,080</div>
          </div>

          <div className="rule" style={{ marginTop: 8 }} />

          {/* Why agents win */}
          <div className="section-title" style={{ marginTop: 28 }}>Why Agents Win</div>
          <div className="why-grid">
            {[
              { icon: <Infinity size={20} color="#2563eb" />, title: "No cap on accounts", body: "There is no limit to how many accounts you can refer. Every single one pays you every single week." },
              { icon: <TrendingUp size={20} color="#7c3aed" />, title: "Rate goes up, never down", body: "Once you unlock a higher tier, your entire portfolio earns at the new rate. Growth compounds." },
              { icon: <RefreshCw size={20} color="#059669" />, title: "Recurring, not one-time", body: "You refer once. You earn every week for the lifetime of that account. This is passive income." },
              { icon: <Zap size={20} color="#d97706" />, title: "Fast payouts", body: "Commissions are paid every Wednesday (UK) or Thursday (US/CA) — no waiting, no chasing." },
            ].map(c => (
              <div key={c.title} className="why-card">
                <div className="why-icon">{c.icon}</div>
                <strong>{c.title}</strong>
                <p>{c.body}</p>
              </div>
            ))}
          </div>

          <div className="rule" />

          {/* CTA */}
          <div className="cta-block no-print">
            <div className="cta-text">
              <div className="cta-title">Ready to start earning?</div>
              <div className="cta-sub">Apply now — your signed contract and details go straight to our team via WhatsApp. Onboarding confirmation within 24 hours.</div>
            </div>
            <button className="cta-btn" onClick={() => setModalOpen(true)}>
              Apply to Become an Agent
            </button>
          </div>

          {/* Doc footer */}
          <div className="doc-footer">
            <p>Work Proxy Agent Programme · workproxy.fun/agent-referral · For questions contact your onboarding manager</p>
          </div>

        </div>
      </div>

      <style>{`
        .toolbar {
          position: sticky; top: 0; z-index: 50;
          background: rgba(255,255,255,0.92); backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(37,99,235,0.1);
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 24px; gap: 16px;
        }
        .back-link { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: #64748b; text-decoration: none; transition: color 0.15s; }
        .back-link:hover { color: #2563eb; }
        .toolbar-right { display: flex; align-items: center; gap: 10px; }
        .dl-btn {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 13px; font-weight: 600; color: #fff;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          border: none; border-radius: 9999px; padding: 8px 18px;
          cursor: pointer; box-shadow: 0 4px 14px rgba(37,99,235,0.3); transition: opacity 0.15s;
        }
        .dl-btn:hover { opacity: 0.88; }

        .doc-wrap { background: #e2e8f0; min-height: 100vh; padding: 40px 20px; display: flex; justify-content: center; }
        .doc {
          background: #fff; width: 100%; max-width: 800px;
          border-radius: 12px; box-shadow: 0 8px 40px rgba(0,0,0,0.1);
          padding: 56px 64px; font-family: 'Instrument Sans', system-ui, sans-serif; color: #0b1120;
        }

        .doc-header { margin-bottom: 36px; }
        .doc-logo { display: flex; align-items: center; gap: 9px; margin-bottom: 20px; }
        .doc-logo img { width: 36px; height: 36px; border-radius: 6px; object-fit: cover; }
        .doc-logo span { font-family: 'Bricolage Grotesque', system-ui, sans-serif; font-size: 18px; font-weight: 700; color: #0b1120; }
        .hero-badge {
          display: inline-flex; align-items: center;
          font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          color: #d97706; background: rgba(217,119,6,0.1); border: 1px solid rgba(217,119,6,0.25);
          border-radius: 9999px; padding: 5px 12px; margin-bottom: 16px;
        }
        .doc h1 { font-family: 'Bricolage Grotesque', system-ui, sans-serif; font-size: 32px; font-weight: 900; color: #0b1120; line-height: 1.15; margin-bottom: 14px; }
        .hero-sub { font-size: 14.5px; color: #475569; line-height: 1.75; max-width: 600px; margin-bottom: 4px; }
        .doc-divider { height: 3px; margin-top: 28px; background: linear-gradient(90deg, #2563eb, #7c3aed, #d97706, transparent); border-radius: 2px; }

        .section-title { font-family: 'Bricolage Grotesque', system-ui, sans-serif; font-size: 15px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; color: #64748b; margin-bottom: 14px; }
        .section-sub { font-size: 13.5px; color: #475569; line-height: 1.7; margin-bottom: 18px; max-width: 620px; }

        .how-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 28px; }
        .how-card { display: flex; gap: 12px; align-items: flex-start; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; }
        .how-card strong { display: block; font-size: 13px; color: #0b1120; margin-bottom: 4px; }
        .how-card p { font-size: 12.5px; color: #475569; line-height: 1.6; margin: 0; }
        .how-num { width: 26px; height: 26px; border-radius: 50%; background: linear-gradient(135deg, #2563eb, #7c3aed); color: #fff; font-size: 12px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

        .split-block { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px 24px; margin-bottom: 16px; }
        .split-bar-wrap { display: flex; height: 12px; border-radius: 9999px; overflow: hidden; margin-bottom: 16px; gap: 2px; }
        .split-bar-seg { height: 100%; border-radius: 9999px; }
        .split-legend { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #334155; margin-bottom: 8px; }
        .split-legend:last-child { margin-bottom: 0; }
        .split-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .split-legend-label { flex: 1; }
        .split-legend-pct { font-weight: 700; color: #0b1120; }

        .owner-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 8px; }
        .owner-card { display: flex; gap: 12px; align-items: flex-start; border: 1px solid; border-radius: 10px; padding: 16px; }
        .owner-card-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .owner-card-title { font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #64748b; margin-bottom: 4px; }
        .owner-card-amount { font-family: 'Bricolage Grotesque', system-ui, sans-serif; font-size: 15px; font-weight: 800; margin-bottom: 6px; line-height: 1.2; }
        .owner-card-note { font-size: 12px; color: #64748b; line-height: 1.55; }

        .tier-block { border: 1px solid; border-radius: 12px; padding: 20px 24px; margin-bottom: 16px; }
        .tier-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 8px; }
        .tier-badge { display: inline-block; font-size: 11px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; border-radius: 9999px; padding: 3px 10px; margin-right: 10px; }
        .tier-range { font-size: 13px; color: #475569; }
        .tier-pct { font-family: 'Bricolage Grotesque', system-ui, sans-serif; font-size: 28px; font-weight: 900; line-height: 1; }
        .tier-pct span { font-size: 13px; font-weight: 500; color: #64748b; }
        .earn-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .earn-table th { background: rgba(255,255,255,0.6); color: #64748b; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; font-weight: 600; padding: 8px 12px; text-align: left; border: 1px solid rgba(0,0,0,0.06); }
        .earn-table td { padding: 9px 12px; border: 1px solid rgba(0,0,0,0.06); color: #334155; }

        .prog-table { width: 100%; border-collapse: collapse; font-size: 12.5px; margin-bottom: 20px; }
        .prog-table th { background: #f1f5f9; color: #64748b; font-size: 10.5px; letter-spacing: 0.07em; text-transform: uppercase; font-weight: 600; padding: 9px 12px; text-align: left; border: 1px solid #e2e8f0; }
        .prog-table td { padding: 9px 12px; border: 1px solid #e2e8f0; color: #334155; }
        .prog-table tr.row-builder td { background: rgba(124,58,237,0.03); }
        .prog-table tr.row-elite td { background: rgba(217,119,6,0.04); }
        .prog-tier { display: inline-block; font-size: 10.5px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; border-radius: 9999px; padding: 2px 8px; }

        .year-total { display: flex; align-items: center; justify-content: space-between; background: linear-gradient(135deg, #0b1120, #1e1b4b); border-radius: 12px; padding: 24px 28px; gap: 20px; margin-bottom: 28px; flex-wrap: wrap; }
        .year-total-label { font-family: 'Bricolage Grotesque', system-ui, sans-serif; font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 6px; }
        .year-total-note { font-size: 12px; color: rgba(255,255,255,0.55); line-height: 1.5; max-width: 340px; }
        .year-total-amount { font-family: 'Bricolage Grotesque', system-ui, sans-serif; font-size: 42px; font-weight: 900; background: linear-gradient(135deg, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; white-space: nowrap; }

        .why-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-bottom: 28px; }
        .why-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px; }
        .why-icon { display: flex; align-items: center; margin-bottom: 10px; }
        .why-card strong { display: block; font-size: 13.5px; color: #0b1120; margin-bottom: 6px; }
        .why-card p { font-size: 13px; color: #475569; line-height: 1.65; margin: 0; }

        .cta-block { display: flex; align-items: center; justify-content: space-between; gap: 20px; background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); border-radius: 14px; padding: 28px 32px; margin-bottom: 28px; flex-wrap: wrap; }
        .cta-title { font-family: 'Bricolage Grotesque', system-ui, sans-serif; font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 6px; }
        .cta-sub { font-size: 13px; color: rgba(255,255,255,0.8); line-height: 1.6; max-width: 380px; }
        .cta-btn { background: #fff; color: #2563eb; border: none; border-radius: 9999px; padding: 13px 24px; font-weight: 700; font-size: 14px; cursor: pointer; white-space: nowrap; box-shadow: 0 4px 16px rgba(0,0,0,0.12); transition: transform 0.15s; flex-shrink: 0; }
        .cta-btn:hover { transform: scale(1.03); }

        .rule { height: 1px; background: #e2e8f0; margin: 28px 0; }
        .doc-footer { padding-top: 20px; border-top: 1px solid #e2e8f0; }
        .doc-footer p { font-size: 12px; color: #94a3b8; line-height: 1.6; }

        @keyframes spin { to { transform: rotate(360deg); } }

        @media print {
          .no-print { display: none !important; }
          body { background: #fff; margin: 0; }
          .doc-wrap { background: transparent; padding: 0; min-height: unset; }
          .doc { max-width: 100%; width: 100%; box-shadow: none; border-radius: 0; padding: 32px 48px; }
          .year-total-amount { -webkit-text-fill-color: #d97706; }
          a { text-decoration: none; color: inherit; }
        }
        @media (max-width: 640px) {
          .doc { padding: 32px 20px; }
          .how-grid, .owner-cards, .why-grid { grid-template-columns: 1fr; }
          .toolbar { padding: 10px 16px; }
          .year-total, .cta-block { flex-direction: column; }
          .year-total-amount { font-size: 32px; }
        }
      `}</style>
    </>
  );
}
