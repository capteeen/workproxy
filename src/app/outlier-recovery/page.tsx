'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, RotateCcw, Ban, FileX, MoonStar, Power,
  CheckCircle2, MessageCircle, ShieldCheck,
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
    if (!deadline || Number.isNaN(deadline)) {
      deadline = Date.now() + DISCOUNT_HOURS * 3600 * 1000;
      localStorage.setItem(STORAGE_KEY, String(deadline));
    }
    const tick = () => setLeft(Math.max(0, deadline - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return left;
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function OutlierRecoveryPage() {
  const left = useCountdown();
  const expired = left !== null && left <= 0;
  const h = left !== null ? Math.floor(left / 3600000) : 0;
  const m = left !== null ? Math.floor((left % 3600000) / 60000) : 0;
  const s = left !== null ? Math.floor((left % 60000) / 1000) : 0;

  return (
    <div className="orx">
      <div className="gridbg" aria-hidden />
      <div className="glow" aria-hidden />

      <div className="toolbar">
        <Link href="/" className="back"><ArrowLeft size={14} /> BACK</Link>
        <span className="brand"><img src="/logo.jpg" alt="" /> WORK&nbsp;PROXY</span>
      </div>

      {/* HERO */}
      <header className="hero">
        <span className="badge"><RotateCcw size={12} /> ACCOUNT RECOVERY · SYSTEM ONLINE</span>
        <h1>Get your Outlier<br /><span className="grad">account back.</span></h1>
        <p className="sub">
          Banned. Failed assessment. Gone inactive or deactivated on Aether. Whatever happened to your
          Outlier account, bring it to Work Proxy. We recover it, restore good standing, and make sure
          real work is waiting on the other side.
        </p>

        {/* BIG COUNTDOWN */}
        <div className={`timer ${expired ? "off" : ""}`}>
          <div className="tlabel">{expired ? "// DISCOUNT WINDOW CLOSED" : "// LAUNCH DISCOUNT ENDS IN"}</div>
          {expired ? (
            <div className="tclosed">STANDARD PRICING ACTIVE</div>
          ) : (
            <div className="digits">
              <div className="dgroup"><span className="dnum">{pad(h)}</span><span className="dlab">HRS</span></div>
              <span className="colon">:</span>
              <div className="dgroup"><span className="dnum">{pad(m)}</span><span className="dlab">MIN</span></div>
              <span className="colon">:</span>
              <div className="dgroup"><span className="dnum">{pad(s)}</span><span className="dlab">SEC</span></div>
            </div>
          )}
        </div>
      </header>

      {/* WHAT WE RECOVER */}
      <section className="block">
        <div className="seclabel">// WHAT WE BRING BACK</div>
        <div className="grid4">
          <div className="mini"><Ban size={18} /><b>Banned</b><span>Suspended or banned on Outlier</span></div>
          <div className="mini"><FileX size={18} /><b>Failed assessment</b><span>Locked out after a failed test</span></div>
          <div className="mini"><MoonStar size={18} /><b>Inactive</b><span>Aether went quiet, no tasks</span></div>
          <div className="mini"><Power size={18} /><b>Deactivated</b><span>Account fully deactivated</span></div>
        </div>
      </section>

      {/* PRICING */}
      <section className="block">
        <div className="seclabel">// CHOOSE YOUR RECOVERY</div>
        <div className="pricing">
          <div className="card featured">
            <span className="tag">MOST POPULAR</span>
            <h3>Managed Recovery</h3>
            <p className="cardsub">We recover your account and manage it for you, so projects keep coming. Hands-off.</p>
            <div className="price">
              {!expired && <span className="old">₦100,000</span>}
              <span className="now">₦{expired ? "100,000" : "80,000"}</span>
            </div>
            {!expired && <div className="save">SAVE ₦20,000 TODAY</div>}
            <ul className="feats">
              <li><CheckCircle2 size={15} /> Full account recovery</li>
              <li><CheckCircle2 size={15} /> We manage and run it for you</li>
              <li><CheckCircle2 size={15} /> Projects guaranteed</li>
              <li><CheckCircle2 size={15} /> Ongoing support</li>
            </ul>
            <a className="cta" href={waLink("Managed Recovery")} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> START ON WHATSAPP
            </a>
          </div>

          <div className="card">
            <h3>Recovery Only</h3>
            <p className="cardsub">We recover your account and hand it fully back. You run it yourself.</p>
            <div className="price">
              {!expired && <span className="old">₦200,000</span>}
              <span className="now">₦{expired ? "200,000" : "150,000"}</span>
            </div>
            {!expired && <div className="save">SAVE ₦50,000 TODAY</div>}
            <ul className="feats">
              <li><CheckCircle2 size={15} /> Full account recovery</li>
              <li><CheckCircle2 size={15} /> Account handed back to you</li>
              <li><CheckCircle2 size={15} /> Projects guaranteed at handover</li>
              <li><CheckCircle2 size={15} /> You manage it going forward</li>
            </ul>
            <a className="cta ghost" href={waLink("Recovery Only")} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> START ON WHATSAPP
            </a>
          </div>
        </div>
        <p className="finePrint">// PAYMENT AFTER WE CONFIRM RECOVERY IS POSSIBLE · NO UPFRONT RISK</p>
      </section>

      {/* HOW IT WORKS */}
      <section className="block">
        <div className="seclabel">// HOW IT WORKS</div>
        <div className="steps">
          <div className="step"><span className="n">01</span><b>Send us the account</b><p>Message us on WhatsApp with what happened — banned, failed assessment, inactive or deactivated.</p></div>
          <div className="step"><span className="n">02</span><b>We recover &amp; verify</b><p>Our team works the account back into good standing and confirms it is active again.</p></div>
          <div className="step"><span className="n">03</span><b>You get projects</b><p>We make sure real work is waiting. Keep it yourself, or let us manage it for you.</p></div>
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
        <div className="seclabel">// QUESTIONS</div>
        <div className="faq">
          <details><summary>What kind of accounts can you recover?</summary><p>Banned and suspended accounts, accounts locked after a failed assessment, accounts gone inactive with no tasks on Aether, and fully deactivated accounts.</p></details>
          <details><summary>Do I pay before or after?</summary><p>You pay once we confirm your account can be recovered. We check first, then you decide.</p></details>
          <details><summary>What is the difference between the two plans?</summary><p>Managed Recovery (₦80,000 today) means we recover it and keep running it for you, with projects coming in. Recovery Only (₦150,000 today) means we recover it and hand it fully back so you manage it yourself.</p></details>
          <details><summary>Is the discount really only for today?</summary><p>Yes. The launch prices hold until the timer above hits zero, then standard pricing (₦100,000 managed / ₦200,000 recovery only) applies.</p></details>
          <details><summary>How do I start?</summary><p>Tap any “Start on WhatsApp” button and tell us what happened to your account. We take it from there.</p></details>
        </div>
        <a className="cta big" href={waLink("Account Recovery")} target="_blank" rel="noreferrer">
          <MessageCircle size={18} /> RECOVER MY ACCOUNT
        </a>
        <p className="foot">WORK PROXY · workproxy.fun</p>
      </section>

      <style>{`
        body { background: #050505; }
        .orx { position: relative; max-width: 960px; margin: 0 auto; padding: 0 20px 90px; color: #FFFFFF; font-family: 'Inter', var(--font-display), system-ui, sans-serif; overflow: hidden; }
        .orx * { box-sizing: border-box; }
        .orx .gridbg { position: fixed; inset: 0; z-index: 0; pointer-events: none; background-image: linear-gradient(rgba(0,229,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,.04) 1px, transparent 1px); background-size: 48px 48px; mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 0%, transparent 75%); -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 0%, transparent 75%); }
        .orx .glow { position: fixed; top: -260px; left: 50%; transform: translateX(-50%); width: 760px; height: 520px; z-index: 0; pointer-events: none; background: radial-gradient(circle, rgba(0,229,255,.18) 0%, transparent 65%); filter: blur(20px); }
        .orx > *:not(.gridbg):not(.glow) { position: relative; z-index: 1; }

        .orx .mono, .orx .seclabel, .orx .badge, .orx .tlabel, .orx .dlab, .orx .tag, .orx .save, .orx .finePrint, .orx .foot, .orx .back, .orx .step .n, .orx .cta { font-family: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace; }

        .orx .toolbar { display: flex; align-items: center; justify-content: space-between; padding: 22px 0; }
        .orx .back { display: inline-flex; align-items: center; gap: 7px; color: #A1A1AA; text-decoration: none; font-size: 12px; font-weight: 600; letter-spacing: .12em; }
        .orx .back:hover { color: #00E5FF; }
        .orx .brand { display: inline-flex; align-items: center; gap: 9px; font-weight: 700; font-size: 13px; color: #fff; letter-spacing: .14em; font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .orx .brand img { width: 22px; height: 22px; border-radius: 5px; object-fit: cover; }

        .orx .hero { text-align: center; padding: 40px 0 8px; }
        .orx .badge { display: inline-flex; align-items: center; gap: 7px; font-size: 11px; font-weight: 600; letter-spacing: .16em; color: #00E5FF; background: rgba(0,229,255,.07); border: 1px solid rgba(0,229,255,.28); padding: 7px 14px; border-radius: 9999px; }
        .orx .hero h1 { font-size: clamp(38px, 7vw, 72px); line-height: 1.04; font-weight: 600; letter-spacing: -.02em; margin: 22px 0 0; color: #fff; }
        .orx .grad { background: linear-gradient(90deg, #00E5FF, #00CCE5); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .orx .sub { max-width: 660px; margin: 20px auto 0; color: #A1A1AA; font-size: 16px; line-height: 1.6; font-family: 'JetBrains Mono', ui-monospace, monospace; }

        /* BIG TIMER */
        .orx .timer { margin: 40px auto 0; max-width: 560px; background: #18181B; border: 1px solid #27272A; border-radius: 20px; padding: 26px 24px; box-shadow: 0 0 0 1px rgba(0,229,255,.08), 0 30px 80px -40px rgba(0,229,255,.4); }
        .orx .tlabel { font-size: 12px; letter-spacing: .2em; color: #00E5FF; margin-bottom: 18px; }
        .orx .digits { display: flex; align-items: stretch; justify-content: center; gap: 12px; }
        .orx .dgroup { display: flex; flex-direction: column; align-items: center; gap: 8px; background: #0A0A0A; border: 1px solid #27272A; border-radius: 14px; padding: 16px 10px; min-width: 104px; }
        .orx .dnum { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: clamp(44px, 9vw, 68px); font-weight: 700; line-height: 1; color: #fff; font-variant-numeric: tabular-nums; }
        .orx .dlab { font-size: 11px; letter-spacing: .2em; color: #71717A; }
        .orx .colon { font-size: clamp(40px, 8vw, 60px); font-weight: 700; color: #00E5FF; align-self: center; line-height: 1; opacity: .8; }
        .orx .timer.off { box-shadow: none; }
        .orx .timer.off .tlabel { color: #71717A; }
        .orx .tclosed { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 20px; font-weight: 700; letter-spacing: .12em; color: #A1A1AA; }

        .orx .block { margin-top: 72px; }
        .orx .seclabel { font-size: 12px; letter-spacing: .2em; color: #00E5FF; margin-bottom: 22px; }

        .orx .grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .orx .mini { background: #18181B; border: 1px solid #27272A; border-radius: 16px; padding: 20px 18px; display: flex; flex-direction: column; gap: 8px; color: #00E5FF; }
        .orx .mini b { color: #fff; font-size: 14px; font-weight: 600; }
        .orx .mini span { color: #A1A1AA; font-size: 12.5px; line-height: 1.5; font-family: 'JetBrains Mono', ui-monospace, monospace; }

        .orx .pricing { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .orx .card { position: relative; background: #18181B; border: 1px solid #27272A; border-radius: 20px; padding: 30px 26px; }
        .orx .card.featured { border-color: rgba(0,229,255,.45); box-shadow: 0 0 0 1px rgba(0,229,255,.12), 0 30px 70px -36px rgba(0,229,255,.35); }
        .orx .tag { position: absolute; top: -11px; left: 26px; background: linear-gradient(90deg,#00E5FF,#00CCE5); color: #050505; font-size: 10px; font-weight: 700; padding: 5px 12px; border-radius: 9999px; letter-spacing: .14em; }
        .orx .card h3 { font-size: 21px; font-weight: 600; color: #fff; margin: 0 0 8px; }
        .orx .cardsub { color: #A1A1AA; font-size: 13.5px; line-height: 1.6; margin: 0 0 20px; min-height: 44px; font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .orx .price { display: flex; align-items: baseline; gap: 12px; }
        .orx .old { color: #71717A; text-decoration: line-through; font-size: 18px; font-weight: 500; }
        .orx .now { color: #00E5FF; font-size: 38px; font-weight: 700; letter-spacing: -.02em; font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .orx .save { margin-top: 8px; color: #00E5FF; font-size: 11px; font-weight: 600; letter-spacing: .12em; }
        .orx .feats { list-style: none; padding: 0; margin: 20px 0 24px; display: flex; flex-direction: column; gap: 11px; }
        .orx .feats li { display: flex; align-items: center; gap: 9px; color: #D4D4D8; font-size: 13.5px; }
        .orx .feats svg { color: #00E5FF; flex-shrink: 0; }

        .orx .cta { display: inline-flex; align-items: center; justify-content: center; gap: 9px; width: 100%; background: linear-gradient(90deg,#00E5FF,#00CCE5); color: #050505; font-weight: 700; font-size: 13px; letter-spacing: .1em; padding: 14px 18px; border-radius: 8px; text-decoration: none; border: none; }
        .orx .cta:hover { filter: brightness(1.08); }
        .orx .cta.ghost { background: transparent; border: 1px solid #3F3F46; color: #fff; }
        .orx .cta.ghost:hover { border-color: #00E5FF; }
        .orx .cta.big { width: auto; margin: 32px auto 0; padding: 16px 36px; display: flex; max-width: 360px; font-size: 14px; }
        .orx .finePrint { text-align: center; color: #71717A; font-size: 11px; letter-spacing: .1em; margin-top: 18px; }

        .orx .steps { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
        .orx .step { background: #18181B; border: 1px solid #27272A; border-radius: 16px; padding: 22px 20px; }
        .orx .step .n { display: inline-block; font-size: 13px; letter-spacing: .1em; color: #00E5FF; margin-bottom: 14px; }
        .orx .step b { display: block; color: #fff; font-size: 15px; font-weight: 600; margin-bottom: 6px; }
        .orx .step p { color: #A1A1AA; font-size: 13px; line-height: 1.6; margin: 0; font-family: 'JetBrains Mono', ui-monospace, monospace; }

        .orx .assure { display: flex; gap: 14px; align-items: flex-start; background: rgba(0,229,255,.05); border: 1px solid rgba(0,229,255,.22); border-radius: 20px; padding: 24px; color: #00E5FF; }
        .orx .assure b { color: #fff; font-size: 16px; font-weight: 600; }
        .orx .assure p { color: #A1A1AA; font-size: 14px; line-height: 1.65; margin: 6px 0 0; font-family: 'JetBrains Mono', ui-monospace, monospace; }

        .orx .faq { display: flex; flex-direction: column; gap: 10px; }
        .orx .faq details { background: #18181B; border: 1px solid #27272A; border-radius: 12px; padding: 4px 20px; }
        .orx .faq summary { cursor: pointer; color: #fff; font-weight: 600; font-size: 14.5px; padding: 15px 0; list-style: none; }
        .orx .faq summary::-webkit-details-marker { display: none; }
        .orx .faq p { color: #A1A1AA; font-size: 13.5px; line-height: 1.65; margin: 0 0 15px; font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .orx .foot { text-align: center; color: #52525B; font-size: 11px; letter-spacing: .14em; margin-top: 28px; }

        @media (max-width: 720px) {
          .orx .grid4, .orx .pricing, .orx .steps { grid-template-columns: 1fr; }
          .orx .grid4 { grid-template-columns: 1fr 1fr; }
          .orx .dgroup { min-width: 0; flex: 1; padding: 14px 4px; }
          .orx .digits { gap: 6px; }
        }
      `}</style>
    </div>
  );
}
