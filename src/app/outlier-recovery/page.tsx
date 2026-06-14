'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ShieldCheck, RotateCcw, Ban, FileX, MoonStar, Power,
  CheckCircle2, Clock, MessageCircle, Sparkles, Lock,
} from "lucide-react";

const WHATSAPP = "2347076245153";
const DISCOUNT_HOURS = 24;
const STORAGE_KEY = "wp_outlier_recovery_deadline";

function waLink(plan: string) {
  const msg = `Hi Work Proxy 👋 I want the Outlier Account Recovery service (${plan}). My account is: [banned / failed assessment / deactivated]. Here are the details:`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

function useCountdown() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    let deadline = Number(localStorage.getItem(STORAGE_KEY));
    if (!deadline || Number.isNaN(deadline) || deadline < Date.now()) {
      // First visit (or expired) — start a fresh 24h window for this visitor.
      if (!deadline) {
        deadline = Date.now() + DISCOUNT_HOURS * 3600 * 1000;
        localStorage.setItem(STORAGE_KEY, String(deadline));
      }
    }
    const tick = () => setLeft(Math.max(0, deadline - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return left;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function OutlierRecoveryPage() {
  const left = useCountdown();
  const expired = left !== null && left <= 0;

  const h = left !== null ? Math.floor(left / 3600000) : 0;
  const m = left !== null ? Math.floor((left % 3600000) / 60000) : 0;
  const s = left !== null ? Math.floor((left % 60000) / 1000) : 0;

  return (
    <div className="orx">
      <div className="toolbar">
        <Link href="/" className="back"><ArrowLeft size={14} /> Back to Home</Link>
        <span className="brand"><img src="/logo.jpg" alt="" /> Work Proxy</span>
      </div>

      {/* HERO */}
      <header className="hero">
        <span className="badge"><RotateCcw size={13} /> Account Recovery Service</span>
        <h1>Got your Outlier account back? <span className="grad">We do.</span></h1>
        <p className="sub">
          Banned. Failed assessment. Gone inactive or deactivated on Aether. Whatever happened to your
          Outlier account, bring it to Work Proxy. We recover it, get it back in good standing, and make
          sure there is real work waiting on the other side.
        </p>

        {/* COUNTDOWN */}
        <div className={`timer ${expired ? "off" : ""}`}>
          <Clock size={15} />
          {expired ? (
            <span>Launch discount has ended — standard pricing now applies.</span>
          ) : (
            <span>
              Launch discount ends in{" "}
              <b>{pad(h)}:{pad(m)}:{pad(s)}</b>
            </span>
          )}
        </div>
      </header>

      {/* WHAT WE RECOVER */}
      <section className="block">
        <h2 className="h2">What we bring back</h2>
        <div className="grid4">
          <div className="mini"><Ban size={18} /><b>Banned accounts</b><span>Suspended or banned on Outlier</span></div>
          <div className="mini"><FileX size={18} /><b>Failed assessment</b><span>Locked out after a failed test</span></div>
          <div className="mini"><MoonStar size={18} /><b>Inactive accounts</b><span>Aether went quiet, no tasks</span></div>
          <div className="mini"><Power size={18} /><b>Deactivated</b><span>Account fully deactivated</span></div>
        </div>
      </section>

      {/* PRICING */}
      <section className="block">
        <h2 className="h2">Choose your recovery</h2>
        <div className="pricing">
          {/* Managed */}
          <div className="card featured">
            <span className="tag">Most popular</span>
            <h3>Managed Recovery</h3>
            <p className="cardsub">We recover your account and manage it for you, so projects keep coming. Hands-off for you.</p>
            <div className="price">
              {!expired && <span className="old">₦100,000</span>}
              <span className="now">₦{expired ? "100,000" : "80,000"}</span>
            </div>
            {!expired && <div className="save">Save ₦20,000 today</div>}
            <ul className="feats">
              <li><CheckCircle2 size={15} /> Full account recovery</li>
              <li><CheckCircle2 size={15} /> We manage and run it for you</li>
              <li><CheckCircle2 size={15} /> Projects guaranteed</li>
              <li><CheckCircle2 size={15} /> Ongoing support</li>
            </ul>
            <a className="cta" href={waLink("Managed Recovery")} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> Start on WhatsApp
            </a>
          </div>

          {/* Recovery only */}
          <div className="card">
            <h3>Recovery Only</h3>
            <p className="cardsub">We recover your account and hand it fully back to you. You run it yourself.</p>
            <div className="price">
              {!expired && <span className="old">₦200,000</span>}
              <span className="now">₦{expired ? "200,000" : "150,000"}</span>
            </div>
            {!expired && <div className="save">Save ₦50,000 today</div>}
            <ul className="feats">
              <li><CheckCircle2 size={15} /> Full account recovery</li>
              <li><CheckCircle2 size={15} /> Account handed back to you</li>
              <li><CheckCircle2 size={15} /> Projects guaranteed at handover</li>
              <li><CheckCircle2 size={15} /> You manage it going forward</li>
            </ul>
            <a className="cta ghost" href={waLink("Recovery Only")} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> Start on WhatsApp
            </a>
          </div>
        </div>
        <p className="finePrint"><Lock size={12} /> Payment after we confirm your account can be recovered. No upfront risk.</p>
      </section>

      {/* HOW IT WORKS */}
      <section className="block">
        <h2 className="h2">How it works</h2>
        <div className="steps">
          <div className="step"><span className="n">1</span><div><b>Send us the account</b><p>Message us on WhatsApp with what happened — banned, failed assessment, inactive or deactivated.</p></div></div>
          <div className="step"><span className="n">2</span><div><b>We recover &amp; verify</b><p>Our team works the account back into good standing and confirms it is active again.</p></div></div>
          <div className="step"><span className="n">3</span><div><b>You get projects</b><p>We make sure there is real work waiting. Keep it yourself, or let us manage it for you.</p></div></div>
        </div>
      </section>

      {/* ASSURANCE */}
      <section className="block">
        <div className="assure">
          <ShieldCheck size={22} />
          <div>
            <b>Our assurance</b>
            <p>We do not just unlock the account and disappear. Every recovery comes with projects, so you are actually back to earning, not staring at an empty dashboard.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="block">
        <h2 className="h2">Questions</h2>
        <div className="faq">
          <details><summary>What kind of accounts can you recover?</summary><p>Banned and suspended accounts, accounts locked after a failed assessment, accounts that have gone inactive with no tasks on Aether, and fully deactivated accounts.</p></details>
          <details><summary>Do I pay before or after?</summary><p>You pay once we confirm your account can be recovered. We check first, then you decide.</p></details>
          <details><summary>What is the difference between the two plans?</summary><p>Managed Recovery (₦80,000 today) means we recover it and keep running it for you, with projects coming in. Recovery Only (₦150,000 today) means we recover it and hand it fully back so you manage it yourself.</p></details>
          <details><summary>Is the discount really only for today?</summary><p>Yes. The launch prices hold until the timer above hits zero, then standard pricing (₦100,000 managed / ₦200,000 recovery only) applies.</p></details>
          <details><summary>How do I start?</summary><p>Tap any “Start on WhatsApp” button and tell us what happened to your account. We take it from there.</p></details>
        </div>
        <a className="cta big" href={waLink("Account Recovery")} target="_blank" rel="noreferrer">
          <MessageCircle size={18} /> Recover my account
        </a>
        <p className="foot"><Sparkles size={12} /> Work Proxy · workproxy.fun</p>
      </section>

      <style>{`
        body { background: #070b14; }
        .orx { max-width: 920px; margin: 0 auto; padding: 0 20px 80px; color: #e7ecf5; font-family: 'Instrument Sans', system-ui, sans-serif; }
        .orx * { box-sizing: border-box; }
        .orx .toolbar { display: flex; align-items: center; justify-content: space-between; padding: 20px 0; }
        .orx .back { display: inline-flex; align-items: center; gap: 6px; color: #94a3b8; text-decoration: none; font-size: 13px; font-weight: 600; }
        .orx .back:hover { color: #fff; }
        .orx .brand { display: inline-flex; align-items: center; gap: 8px; font-weight: 800; font-size: 15px; color: #fff; }
        .orx .brand img { width: 24px; height: 24px; border-radius: 6px; object-fit: cover; }

        .orx .hero { text-align: center; padding: 28px 0 8px; }
        .orx .badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; color: #6ee7b7; background: rgba(16,185,129,.1); border: 1px solid rgba(16,185,129,.25); padding: 6px 12px; border-radius: 9999px; }
        .orx .hero h1 { font-size: clamp(30px, 5.5vw, 52px); line-height: 1.05; font-weight: 900; letter-spacing: -.02em; margin: 18px 0 0; color: #fff; }
        .orx .grad { background: linear-gradient(90deg, #22d3ee, #22c55e); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .orx .sub { max-width: 640px; margin: 16px auto 0; color: #aab4c5; font-size: 16px; line-height: 1.7; }

        .orx .timer { display: inline-flex; align-items: center; gap: 8px; margin-top: 24px; background: rgba(220,38,38,.12); border: 1px solid rgba(220,38,38,.3); color: #fca5a5; padding: 10px 16px; border-radius: 9999px; font-size: 14px; font-weight: 600; }
        .orx .timer b { color: #fff; font-variant-numeric: tabular-nums; font-size: 15px; }
        .orx .timer.off { background: rgba(100,116,139,.12); border-color: rgba(100,116,139,.3); color: #94a3b8; }

        .orx .block { margin-top: 56px; }
        .orx .h2 { font-size: 22px; font-weight: 800; color: #fff; text-align: center; margin: 0 0 24px; }

        .orx .grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .orx .mini { background: #0f1629; border: 1px solid #1e293b; border-radius: 14px; padding: 18px 16px; display: flex; flex-direction: column; gap: 6px; color: #22d3ee; }
        .orx .mini b { color: #fff; font-size: 14px; }
        .orx .mini span { color: #8a96a8; font-size: 12.5px; }

        .orx .pricing { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .orx .card { position: relative; background: #0f1629; border: 1px solid #1e293b; border-radius: 18px; padding: 28px 24px; }
        .orx .card.featured { border-color: rgba(34,197,94,.4); box-shadow: 0 0 0 1px rgba(34,197,94,.15), 0 20px 50px -20px rgba(34,197,94,.25); }
        .orx .tag { position: absolute; top: -11px; left: 24px; background: linear-gradient(90deg,#22d3ee,#22c55e); color: #04121b; font-size: 11px; font-weight: 800; padding: 4px 11px; border-radius: 9999px; text-transform: uppercase; letter-spacing: .04em; }
        .orx .card h3 { font-size: 19px; font-weight: 800; color: #fff; margin: 0 0 6px; }
        .orx .cardsub { color: #95a1b3; font-size: 13.5px; line-height: 1.6; margin: 0 0 18px; min-height: 44px; }
        .orx .price { display: flex; align-items: baseline; gap: 10px; }
        .orx .old { color: #64748b; text-decoration: line-through; font-size: 18px; font-weight: 600; }
        .orx .now { color: #fff; font-size: 34px; font-weight: 900; letter-spacing: -.02em; }
        .orx .save { margin-top: 6px; color: #6ee7b7; font-size: 13px; font-weight: 700; }
        .orx .feats { list-style: none; padding: 0; margin: 18px 0 22px; display: flex; flex-direction: column; gap: 10px; }
        .orx .feats li { display: flex; align-items: center; gap: 8px; color: #cdd6e4; font-size: 13.5px; }
        .orx .feats svg { color: #22c55e; flex-shrink: 0; }

        .orx .cta { display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; background: linear-gradient(90deg,#22c55e,#16a34a); color: #04121b; font-weight: 800; font-size: 15px; padding: 13px 18px; border-radius: 12px; text-decoration: none; border: none; }
        .orx .cta:hover { filter: brightness(1.05); }
        .orx .cta.ghost { background: transparent; border: 1px solid #2c3a52; color: #fff; }
        .orx .cta.big { width: auto; margin: 28px auto 0; padding: 15px 32px; display: flex; max-width: 320px; }
        .orx .finePrint { display: flex; align-items: center; justify-content: center; gap: 6px; color: #8a96a8; font-size: 12.5px; margin-top: 16px; }

        .orx .steps { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
        .orx .step { background: #0f1629; border: 1px solid #1e293b; border-radius: 14px; padding: 20px 18px; }
        .orx .step .n { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 9999px; background: rgba(34,211,238,.12); color: #22d3ee; font-weight: 800; margin-bottom: 12px; }
        .orx .step b { color: #fff; font-size: 15px; }
        .orx .step p { color: #95a1b3; font-size: 13px; line-height: 1.6; margin: 6px 0 0; }

        .orx .assure { display: flex; gap: 14px; align-items: flex-start; background: rgba(34,197,94,.06); border: 1px solid rgba(34,197,94,.22); border-radius: 16px; padding: 22px; color: #22c55e; }
        .orx .assure b { color: #fff; font-size: 16px; }
        .orx .assure p { color: #aab4c5; font-size: 14px; line-height: 1.65; margin: 6px 0 0; }

        .orx .faq { display: flex; flex-direction: column; gap: 10px; }
        .orx .faq details { background: #0f1629; border: 1px solid #1e293b; border-radius: 12px; padding: 4px 18px; }
        .orx .faq summary { cursor: pointer; color: #fff; font-weight: 700; font-size: 14.5px; padding: 14px 0; list-style: none; }
        .orx .faq summary::-webkit-details-marker { display: none; }
        .orx .faq p { color: #95a1b3; font-size: 13.5px; line-height: 1.65; margin: 0 0 14px; }
        .orx .foot { display: flex; align-items: center; justify-content: center; gap: 6px; color: #64748b; font-size: 12px; margin-top: 26px; }

        @media (max-width: 720px) {
          .orx .grid4, .orx .pricing, .orx .steps { grid-template-columns: 1fr; }
          .orx .grid4 { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  );
}
