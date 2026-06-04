'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Infinity, TrendingUp, RefreshCw, Zap } from "lucide-react";

const tiers = [
  {
    label: "Starter",
    range: "1 – 9 accounts",
    pct: 5,
    color: "#2563EB",
    bg: "rgba(37,99,235,0.07)",
    border: "rgba(37,99,235,0.2)",
    rows: [
      { accounts: 1,  weekly: 60,   monthly: 240  },
      { accounts: 3,  weekly: 180,  monthly: 720  },
      { accounts: 5,  weekly: 300,  monthly: 1200 },
      { accounts: 9,  weekly: 540,  monthly: 2160 },
    ],
  },
  {
    label: "Builder",
    range: "10 – 19 accounts",
    pct: 7,
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.07)",
    border: "rgba(124,58,237,0.2)",
    rows: [
      { accounts: 10, weekly: 840,  monthly: 3360 },
      { accounts: 13, weekly: 1092, monthly: 4368 },
      { accounts: 16, weekly: 1344, monthly: 5376 },
      { accounts: 19, weekly: 1596, monthly: 6384 },
    ],
  },
  {
    label: "Elite",
    range: "20+ accounts",
    pct: 10,
    color: "#D97706",
    bg: "rgba(217,119,6,0.07)",
    border: "rgba(217,119,6,0.2)",
    rows: [
      { accounts: 20, weekly: 2400,  monthly: 9600  },
      { accounts: 25, weekly: 3000,  monthly: 12000 },
      { accounts: 30, weekly: 3600,  monthly: 14400 },
      { accounts: 50, weekly: 6000,  monthly: 24000 },
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

const tierColor: Record<string, string> = {
  Starter: "#2563EB",
  Builder: "#7C3AED",
  Elite:   "#D97706",
};
const tierBg: Record<string, string> = {
  Starter: "rgba(37,99,235,0.1)",
  Builder: "rgba(124,58,237,0.1)",
  Elite:   "rgba(217,119,6,0.1)",
};

function fmt(n: number) {
  return "$" + n.toLocaleString();
}

export default function AgentReferralPage() {
  const [showLogo, setShowLogo] = useState(true);

  return (
    <>
      {/* ── Toolbar ── */}
      <div className="toolbar no-print">
        <Link href="/" className="back-link">
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <div className="toolbar-right">
          <button
            className={`logo-toggle ${showLogo ? "active" : ""}`}
            onClick={() => setShowLogo(!showLogo)}
          >
            {showLogo ? "Logo: On" : "Logo: Off"}
          </button>
          <button className="dl-btn" onClick={() => window.print()}>
            <Download size={14} /> Download PDF
          </button>
        </div>
      </div>

      {/* ── Document ── */}
      <div className="doc-wrap">
        <div className="doc">

          {/* ── Header ── */}
          <div className="doc-header">
            {showLogo && (
              <div className="doc-logo">
                <img src="/logo.jpg" alt="Work Proxy" />
                <span>Work Proxy</span>
              </div>
            )}

            <div className="hero-badge">Agent Referral Programme</div>
            <h1>Get Paid Every Week.<br />For Every Person You Bring.</h1>
            <p className="hero-sub">
              As a Work Proxy Agent, you earn a percentage of every account
              you refer — week after week, for as long as they work.
              No cap. No ceiling. The more people you bring, the higher
              your commission rate climbs.
            </p>
            <div className="doc-divider" />
          </div>

          {/* ── How it works ── */}
          <div className="section-title">How It Works</div>
          <div className="how-grid">
            <div className="how-card">
              <div className="how-num">1</div>
              <div>
                <strong>Refer someone</strong>
                <p>Share your agent link or personally bring someone to register an Outlier account under Work Proxy.</p>
              </div>
            </div>
            <div className="how-card">
              <div className="how-num">2</div>
              <div>
                <strong>They start earning</strong>
                <p>Your referral works a minimum of 12 hours daily on Outlier AI, averaging <strong>$1,200 per week</strong> per account.</p>
              </div>
            </div>
            <div className="how-card">
              <div className="how-num">3</div>
              <div>
                <strong>You get paid</strong>
                <p>Every Wednesday (UK) or Thursday (US/Canada), your commission lands — automatically, for every active account you own.</p>
              </div>
            </div>
          </div>

          <div className="rule" />

          {/* ── Tier breakdown ── */}
          <div className="section-title" style={{ marginTop: 28 }}>Commission Tiers</div>
          <p className="section-sub">
            Your rate upgrades automatically the moment you hit the next threshold.
            Once upgraded, <strong>all your accounts</strong> earn at the new rate — not just new ones.
          </p>

          {tiers.map((tier) => (
            <div key={tier.label} className="tier-block" style={{ borderColor: tier.border, background: tier.bg }}>
              <div className="tier-header">
                <div>
                  <span className="tier-badge" style={{ color: tier.color, background: `${tier.bg}`, border: `1px solid ${tier.border}` }}>
                    {tier.label}
                  </span>
                  <span className="tier-range">{tier.range}</span>
                </div>
                <div className="tier-pct" style={{ color: tier.color }}>{tier.pct}%<span> / account / week</span></div>
              </div>

              <table className="earn-table">
                <thead>
                  <tr>
                    <th>Accounts</th>
                    <th>Weekly earnings</th>
                    <th>Monthly earnings</th>
                  </tr>
                </thead>
                <tbody>
                  {tier.rows.map((r) => (
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

          {/* ── 1-year progression ── */}
          <div className="section-title" style={{ marginTop: 28 }}>Your Year 1 Journey</div>
          <p className="section-sub">
            Based on a consistent growth of 2–5 new accounts per month, here is what a
            typical agent trajectory looks like over 12 months.
          </p>

          <table className="prog-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Accounts</th>
                <th>Tier</th>
                <th>Weekly</th>
                <th>Monthly</th>
                <th>Total earned</th>
              </tr>
            </thead>
            <tbody>
              {progression.map((p, i) => (
                <tr key={i} className={p.tier === "Elite" ? "row-elite" : p.tier === "Builder" ? "row-builder" : ""}>
                  <td>{p.month}</td>
                  <td>{p.accounts}</td>
                  <td>
                    <span className="prog-tier" style={{ color: tierColor[p.tier], background: tierBg[p.tier] }}>
                      {p.tier}
                    </span>
                  </td>
                  <td><strong>{fmt(p.weekly)}</strong></td>
                  <td>{fmt(p.monthly)}</td>
                  <td>{fmt(p.cumulative)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Year 1 total callout */}
          <div className="year-total">
            <div className="year-total-left">
              <div className="year-total-label">Projected Year 1 Total Earnings</div>
              <div className="year-total-note">Based on consistent referral growth of 2–5 accounts per month. Actual results depend on your activity.</div>
            </div>
            <div className="year-total-amount">$76,080</div>
          </div>

          <div className="rule" style={{ marginTop: 8 }} />

          {/* ── Why this works ── */}
          <div className="section-title" style={{ marginTop: 28 }}>Why Agents Win</div>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon"><Infinity size={20} color="#2563eb" /></div>
              <strong>No cap on accounts</strong>
              <p>There is no limit to how many accounts you can refer. Every single one pays you every single week.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><TrendingUp size={20} color="#7c3aed" /></div>
              <strong>Rate goes up, never down</strong>
              <p>Once you unlock a higher tier, your entire portfolio earns at the new rate. Growth compounds.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><RefreshCw size={20} color="#059669" /></div>
              <strong>Recurring, not one-time</strong>
              <p>You refer once. You earn every week for the lifetime of that account. This is passive income.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><Zap size={20} color="#d97706" /></div>
              <strong>Fast payouts</strong>
              <p>Commissions are paid every Wednesday (UK) or Thursday (US/CA) — no waiting, no chasing.</p>
            </div>
          </div>

          <div className="rule" />

          {/* ── Footer ── */}
          <div className="doc-footer">
            <p>
              Ready to start? Apply to become a Work Proxy Agent at{" "}
              <strong>workproxy.fun/agents</strong> and your first referral link will
              be set up within 24 hours of approval.
            </p>
            {showLogo && (
              <p className="doc-footer-meta">
                Work Proxy · workproxy.fun · Agent Programme · Confidential
              </p>
            )}
          </div>

        </div>
      </div>

      <style>{`
        /* ── Toolbar ── */
        .toolbar {
          position: sticky; top: 0; z-index: 50;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(37,99,235,0.1);
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 12px 24px; gap: 16px;
        }
        .back-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; color: #64748b; text-decoration: none;
          transition: color 0.15s;
        }
        .back-link:hover { color: #2563eb; }
        .toolbar-right { display: flex; align-items: center; gap: 10px; }
        .logo-toggle {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 500; color: #64748b;
          background: #f1f5f9; border: 1px solid #e2e8f0;
          border-radius: 9999px; padding: 7px 14px;
          cursor: pointer; transition: all 0.15s;
        }
        .logo-toggle.active {
          color: #2563eb; background: rgba(37,99,235,0.08);
          border-color: rgba(37,99,235,0.25);
        }
        .dl-btn {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 13px; font-weight: 600; color: #fff;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          border: none; border-radius: 9999px; padding: 8px 18px;
          cursor: pointer; box-shadow: 0 4px 14px rgba(37,99,235,0.3);
          transition: opacity 0.15s;
        }
        .dl-btn:hover { opacity: 0.88; }

        /* ── Doc wrapper ── */
        .doc-wrap {
          background: #e2e8f0; min-height: 100vh;
          padding: 40px 20px; display: flex; justify-content: center;
        }
        .doc {
          background: #fff; width: 100%; max-width: 800px;
          border-radius: 12px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.1);
          padding: 56px 64px;
          font-family: 'Instrument Sans', system-ui, sans-serif;
          color: #0b1120;
        }

        /* ── Header ── */
        .doc-header { margin-bottom: 36px; }
        .doc-logo {
          display: flex; align-items: center; gap: 9px; margin-bottom: 20px;
        }
        .doc-logo img { width: 36px; height: 36px; border-radius: 6px; object-fit: cover; }
        .doc-logo span {
          font-family: 'Bricolage Grotesque', system-ui, sans-serif;
          font-size: 18px; font-weight: 700; color: #0b1120;
        }
        .hero-badge {
          display: inline-flex; align-items: center;
          font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: #d97706;
          background: rgba(217,119,6,0.1); border: 1px solid rgba(217,119,6,0.25);
          border-radius: 9999px; padding: 5px 12px; margin-bottom: 16px;
        }
        .doc h1 {
          font-family: 'Bricolage Grotesque', system-ui, sans-serif;
          font-size: 32px; font-weight: 900; color: #0b1120;
          line-height: 1.15; margin-bottom: 14px;
        }
        .hero-sub {
          font-size: 14.5px; color: #475569; line-height: 1.75;
          max-width: 600px; margin-bottom: 4px;
        }
        .doc-divider {
          height: 3px; margin-top: 28px;
          background: linear-gradient(90deg, #2563eb, #7c3aed, #d97706, transparent);
          border-radius: 2px;
        }

        /* ── Section titles ── */
        .section-title {
          font-family: 'Bricolage Grotesque', system-ui, sans-serif;
          font-size: 15px; font-weight: 800; letter-spacing: 0.05em;
          text-transform: uppercase; color: #64748b; margin-bottom: 14px;
        }
        .section-sub {
          font-size: 13.5px; color: #475569; line-height: 1.7;
          margin-bottom: 18px; max-width: 620px;
        }

        /* ── How it works ── */
        .how-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 14px; margin-bottom: 28px;
        }
        .how-card {
          display: flex; gap: 12px; align-items: flex-start;
          background: #f8fafc; border: 1px solid #e2e8f0;
          border-radius: 10px; padding: 16px;
        }
        .how-card strong { display: block; font-size: 13px; color: #0b1120; margin-bottom: 4px; }
        .how-card p { font-size: 12.5px; color: #475569; line-height: 1.6; margin: 0; }
        .how-num {
          width: 26px; height: 26px; border-radius: 50%;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: #fff; font-size: 12px; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        /* ── Tier blocks ── */
        .tier-block {
          border: 1px solid; border-radius: 12px;
          padding: 20px 24px; margin-bottom: 16px;
        }
        .tier-header {
          display: flex; align-items: center;
          justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;
        }
        .tier-badge {
          display: inline-block; font-size: 11px; font-weight: 800;
          letter-spacing: 0.06em; text-transform: uppercase;
          border-radius: 9999px; padding: 3px 10px; margin-right: 10px;
        }
        .tier-range { font-size: 13px; color: #475569; }
        .tier-pct {
          font-family: 'Bricolage Grotesque', system-ui, sans-serif;
          font-size: 28px; font-weight: 900; line-height: 1;
        }
        .tier-pct span { font-size: 13px; font-weight: 500; color: #64748b; }

        /* ── Earnings table ── */
        .earn-table {
          width: 100%; border-collapse: collapse; font-size: 13px;
        }
        .earn-table th {
          background: rgba(255,255,255,0.6); color: #64748b;
          font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase;
          font-weight: 600; padding: 8px 12px; text-align: left;
          border: 1px solid rgba(0,0,0,0.06);
        }
        .earn-table td {
          padding: 9px 12px; border: 1px solid rgba(0,0,0,0.06);
          color: #334155;
        }

        /* ── Progression table ── */
        .prog-table {
          width: 100%; border-collapse: collapse;
          font-size: 12.5px; margin-bottom: 20px;
        }
        .prog-table th {
          background: #f1f5f9; color: #64748b;
          font-size: 10.5px; letter-spacing: 0.07em; text-transform: uppercase;
          font-weight: 600; padding: 9px 12px; text-align: left;
          border: 1px solid #e2e8f0;
        }
        .prog-table td {
          padding: 9px 12px; border: 1px solid #e2e8f0; color: #334155;
        }
        .prog-table tr.row-builder td { background: rgba(124,58,237,0.03); }
        .prog-table tr.row-elite td { background: rgba(217,119,6,0.04); }
        .prog-tier {
          display: inline-block; font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.05em; text-transform: uppercase;
          border-radius: 9999px; padding: 2px 8px;
        }

        /* ── Year total ── */
        .year-total {
          display: flex; align-items: center; justify-content: space-between;
          background: linear-gradient(135deg, #0b1120, #1e1b4b);
          border-radius: 12px; padding: 24px 28px; gap: 20px;
          margin-bottom: 28px; flex-wrap: wrap;
        }
        .year-total-label {
          font-family: 'Bricolage Grotesque', system-ui, sans-serif;
          font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 6px;
        }
        .year-total-note { font-size: 12px; color: rgba(255,255,255,0.55); line-height: 1.5; max-width: 340px; }
        .year-total-amount {
          font-family: 'Bricolage Grotesque', system-ui, sans-serif;
          font-size: 42px; font-weight: 900;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          white-space: nowrap;
        }

        /* ── Why grid ── */
        .why-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 14px; margin-bottom: 28px;
        }
        .why-card {
          background: #f8fafc; border: 1px solid #e2e8f0;
          border-radius: 10px; padding: 18px;
        }
        .why-icon { display: flex; align-items: center; margin-bottom: 10px; }
        .why-card strong { display: block; font-size: 13.5px; color: #0b1120; margin-bottom: 6px; }
        .why-card p { font-size: 13px; color: #475569; line-height: 1.65; margin: 0; }

        /* ── Rule ── */
        .rule { height: 1px; background: #e2e8f0; margin: 28px 0; }

        /* ── Doc footer ── */
        .doc-footer { padding-top: 24px; border-top: 2px solid #e2e8f0; }
        .doc-footer p { font-size: 13.5px; color: #334155; line-height: 1.7; margin-bottom: 8px; }
        .doc-footer-meta { color: #94a3b8 !important; font-size: 12px !important; }

        /* ── Print ── */
        @media print {
          .no-print { display: none !important; }
          body { background: #fff; margin: 0; }
          .doc-wrap { background: transparent; padding: 0; min-height: unset; }
          .doc {
            max-width: 100%; width: 100%; box-shadow: none;
            border-radius: 0; padding: 32px 48px;
          }
          .year-total-amount { -webkit-text-fill-color: #d97706; }
          a { text-decoration: none; color: inherit; }
        }

        @media (max-width: 640px) {
          .doc { padding: 32px 20px; }
          .how-grid { grid-template-columns: 1fr; }
          .why-grid { grid-template-columns: 1fr; }
          .toolbar { padding: 10px 16px; }
          .year-total { flex-direction: column; }
          .year-total-amount { font-size: 32px; }
        }
      `}</style>
    </>
  );
}
