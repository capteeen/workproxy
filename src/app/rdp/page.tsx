'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import {
  Cpu, MemoryStick, HardDrive, Infinity as InfinityIcon,
  Network, Globe2, MonitorCheck, ArrowRight, Check,
  Copy, CheckCheck, Zap, ShieldCheck, Snowflake, Flame,
  Cctv, Server, Activity, Gauge
} from "lucide-react";

const MONO = "ui-monospace, 'SF Mono', SFMono-Regular, 'JetBrains Mono', Menlo, monospace";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 20,
    tagline: "Light automation & single-session workloads",
    cores: "1 vCore",
    ram: "2 GB RAM",
    disk: "30 GB NVMe",
    accent: "#60A5FA",
    glow: "37,99,235",
  },
  {
    id: "pro",
    name: "Professional",
    price: 30,
    tagline: "Daily-driver remote desktop for power users",
    cores: "2 vCore",
    ram: "4 GB RAM",
    disk: "50 GB NVMe",
    accent: "#22D3EE",
    glow: "8,145,178",
    featured: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: 40,
    tagline: "Heavy multitasking, builds & parallel sessions",
    cores: "4 vCore",
    ram: "8 GB RAM",
    disk: "100 GB NVMe",
    accent: "#A78BFA",
    glow: "124,58,237",
  },
];

const sharedFeatures = [
  { icon: <InfinityIcon size={18} />, label: "Unmetered Bandwidth" },
  { icon: <Network size={18} />, label: "Dual 25 Gbps Network" },
  { icon: <Globe2 size={18} />, label: "1 Dedicated IP" },
  { icon: <MonitorCheck size={18} />, label: "Licensed Windows" },
];

const specStrip = [
  { icon: <Cpu size={22} />, title: "Dedicated vCores", desc: "Real compute, never overbooked or throttled." },
  { icon: <HardDrive size={22} />, title: "NVMe Storage", desc: "Flash-speed disk on every plan, no spinning rust." },
  { icon: <Network size={22} />, title: "Dual 25 Gbps", desc: "Redundant uplinks engineered for zero downtime." },
  { icon: <ShieldCheck size={22} />, title: "Licensed Windows", desc: "Genuine, activated Windows Server out of the box." },
];

const locations = [
  { city: "London", country: "United Kingdom", flag: "🇬🇧", dc: "Equinix LD8", ip: "45.87.60.12", region: "Europe" },
  { city: "Amsterdam", country: "Netherlands", flag: "🇳🇱", dc: "Equinix AM5", ip: "89.37.99.43", region: "Europe" },
  { city: "Frankfurt", country: "Germany", flag: "🇩🇪", dc: "Maincubes FRA01", ip: "103.199.99.1", region: "Europe" },
  { city: "Dublin", country: "Ireland", flag: "🇮🇪", dc: "Equinix DB3", ip: "207.189.21.1", region: "Europe" },
  { city: "New York", country: "New York, US", flag: "🇺🇸", dc: "Equinix NY2/NY4", ip: "45.61.175.191", region: "Americas" },
  { city: "Ashburn", country: "Virginia, US", flag: "🇺🇸", dc: "Equinix DC10", ip: "130.51.40.113", region: "Americas" },
  { city: "Dallas", country: "Texas, US", flag: "🇺🇸", dc: "Equinix DA11", ip: "45.87.62.74", region: "Americas" },
  { city: "Chicago", country: "Illinois, US", flag: "🇺🇸", dc: "Coresite CH1", ip: "38.240.45.146", region: "Americas" },
  { city: "Miami", country: "Florida, US", flag: "🇺🇸", dc: "Colohouse Miami", ip: "167.94.47.1", region: "Americas" },
  { city: "Los Angeles", country: "California, US", flag: "🇺🇸", dc: "Coresite LA2", ip: "194.49.68.59", region: "Americas" },
  { city: "Phoenix", country: "Arizona, US", flag: "🇺🇸", dc: "PhoenixNAP", ip: "207.189.22.1", region: "Americas" },
  { city: "Bend", country: "Oregon, US", flag: "🇺🇸", dc: "Fort Rock", ip: "207.189.25.1", region: "Americas" },
  { city: "Charlotte", country: "N. Carolina, US", flag: "🇺🇸", dc: "Serga CLT2", ip: "207.189.24.1", region: "Americas" },
  { city: "Toronto", country: "Canada", flag: "🇨🇦", dc: "Equinix TR1", ip: "38.240.59.1", region: "Americas" },
  { city: "Singapore", country: "Singapore", flag: "🇸🇬", dc: "Equinix SG3", ip: "178.173.239.1", region: "Asia-Pacific" },
  { city: "Tokyo", country: "Japan", flag: "🇯🇵", dc: "Equinix TY8", ip: "103.131.131.1", region: "Asia-Pacific" },
  { city: "Hong Kong", country: "Hong Kong SAR", flag: "🇭🇰", dc: "Equinix HK3", ip: "103.131.130.1", region: "Asia-Pacific" },
  { city: "Sydney", country: "Australia", flag: "🇦🇺", dc: "Equinix SY5", ip: "103.96.83.1", region: "Asia-Pacific" },
];

const regions = ["All", "Europe", "Americas", "Asia-Pacific"];

const facilitySpecs = [
  {
    icon: <Server size={18} />,
    title: "Facility",
    items: [
      "23,000 sq ft of dedicated space",
      "24×7 on-site support staff",
      "Tier 2/3 aligned facility",
      "ISO 9001 & ISO 27001 certified",
    ],
  },
  {
    icon: <Flame size={18} />,
    title: "Power & Cooling",
    items: [
      "2× 1.5MVA generators (N+1), 96h fuel",
      "98% efficient flywheel UPS (N+1)",
      "Cold-aisle containment systems",
      "N+1 cooling, minimum redundancy",
    ],
  },
  {
    icon: <Cctv size={18} />,
    title: "Security",
    items: [
      "24/7 CCTV monitoring",
      "24/7 secured entrance",
      "Locking cages & private suites",
      "Card-key access into the floor",
    ],
  },
  {
    icon: <Snowflake size={18} />,
    title: "Safety",
    items: [
      "FM200 fire suppression system",
      "VESDA smoke detection",
      "Multi-zone environmental sensors",
      "Continuous thermal mapping",
    ],
  },
];

export default function RdpPage() {
  const [selected, setSelected] = useState(plans[1].id);
  const [activeRegion, setActiveRegion] = useState("All");
  const [copied, setCopied] = useState<string | null>(null);

  const selectedPlan = plans.find((p) => p.id === selected) ?? plans[1];
  const filtered = activeRegion === "All" ? locations : locations.filter((l) => l.region === activeRegion);

  const copyIp = (ip: string) => {
    navigator.clipboard?.writeText(ip);
    setCopied(ip);
    setTimeout(() => setCopied(null), 1400);
  };

  const order = () => {
    const message = `Hello Work Proxy, I'd like to order an RDP plan:

*Plan:* ${selectedPlan.name} — $${selectedPlan.price}/mo
*Specs:* ${selectedPlan.cores} · ${selectedPlan.ram} · ${selectedPlan.disk}
*Includes:* Unmetered Bandwidth, Dual 25 Gbps, 1 Dedicated IP, Licensed Windows

Please share the available locations and payment details.`;
    window.open(`https://wa.me/2347076245153?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="rdp-root">
      <Navbar />

      {/* ───────────────── HERO ───────────────── */}
      <section className="rdp-hero">
        <div className="rdp-hero-grid" aria-hidden />
        <div className="rdp-hero-glow" aria-hidden />
        <div className="container rdp-hero-inner">
          <span className="rdp-pill reveal">
            <span className="rdp-dot" /> 18 global locations · online now
          </span>
          <h1 className="rdp-h1 reveal" style={{ ['--delay' as string]: '60ms' }}>
            Enterprise RDP,<br />
            <span className="rdp-h1-accent">racked in real datacenters.</span>
          </h1>
          <p className="rdp-sub reveal" style={{ ['--delay' as string]: '120ms' }}>
            Genuine licensed Windows on dedicated vCores, NVMe storage and dual
            25 Gbps uplinks — from <strong>$20/month</strong>. Pick a city, get a
            dedicated IP, log in in minutes.
          </p>
          <div className="rdp-hero-cta reveal" style={{ ['--delay' as string]: '180ms' }}>
            <a href="#pricing" className="btn btn-primary">View plans <ArrowRight size={16} /></a>
            <a href="#locations" className="btn btn-ghost-dark">Browse locations</a>
          </div>

          {/* terminal card */}
          <div className="rdp-term reveal" style={{ ['--delay' as string]: '240ms' }}>
            <div className="rdp-term-bar">
              <span /><span /><span />
              <span className="rdp-term-title">rdp · session</span>
            </div>
            <pre className="rdp-term-body">
{`> connect --location london --plan pro
✓ provisioning Equinix LD8 ........... done
✓ assigning dedicated IP ............. 45.87.60.12
✓ activating Windows license ......... genuine
✓ link state ......................... 2×25 Gbps
session ready in 47s — welcome aboard.`}
            </pre>
          </div>
        </div>
      </section>

      {/* ───────────────── SPEC STRIP ───────────────── */}
      <section className="rdp-strip">
        <div className="container rdp-strip-grid">
          {specStrip.map((s) => (
            <div key={s.title} className="rdp-strip-item reveal">
              <div className="rdp-strip-icon">{s.icon}</div>
              <div>
                <div className="rdp-strip-title">{s.title}</div>
                <div className="rdp-strip-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────── PRICING ───────────────── */}
      <section className="rdp-section" id="pricing">
        <div className="container">
          <div className="rdp-head">
            <span className="rdp-eyebrow">Pricing</span>
            <h2 className="rdp-h2">Three tiers. <span className="rdp-grad">Zero compromises.</span></h2>
            <p className="rdp-head-sub">
              Every plan ships with the same backbone — unmetered bandwidth, dual
              25 Gbps, a dedicated IP and a licensed Windows install. Scale the
              compute, keep the foundation.
            </p>
          </div>

          <div className="rdp-plans">
            {plans.map((p) => {
              const active = selected === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  className={`rdp-plan ${p.featured ? "is-featured" : ""} ${active ? "is-active" : ""}`}
                  style={{ ['--accent' as string]: p.accent, ['--glow' as string]: p.glow }}
                >
                  {p.featured && <span className="rdp-plan-tag">Most popular</span>}
                  <div className="rdp-plan-name">{p.name}</div>
                  <div className="rdp-plan-price">
                    <span className="rdp-plan-cur">$</span>{p.price}
                    <span className="rdp-plan-per">/mo</span>
                  </div>
                  <p className="rdp-plan-tagline">{p.tagline}</p>

                  <div className="rdp-plan-core">
                    <div className="rdp-core-row"><Cpu size={15} /> {p.cores}</div>
                    <div className="rdp-core-row"><MemoryStick size={15} /> {p.ram}</div>
                    <div className="rdp-core-row"><HardDrive size={15} /> {p.disk}</div>
                  </div>

                  <div className="rdp-plan-shared">
                    {sharedFeatures.map((f) => (
                      <div key={f.label} className="rdp-shared-row">
                        <Check size={13} className="rdp-check" /> {f.label}
                      </div>
                    ))}
                  </div>

                  <span className={`rdp-plan-select ${active ? "sel" : ""}`}>
                    {active ? "Selected" : "Select plan"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="rdp-order-bar reveal">
            <div>
              <div className="rdp-order-label">Selected</div>
              <div className="rdp-order-plan">
                {selectedPlan.name} — <span style={{ fontFamily: MONO }}>{selectedPlan.cores} · {selectedPlan.ram} · {selectedPlan.disk}</span>
              </div>
            </div>
            <div className="rdp-order-right">
              <div className="rdp-order-price">${selectedPlan.price}<span>/mo</span></div>
              <button className="btn btn-primary" onClick={order}>
                Order on WhatsApp <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── LOCATIONS ───────────────── */}
      <section className="rdp-section rdp-dark" id="locations">
        <div className="container">
          <div className="rdp-head">
            <span className="rdp-eyebrow rdp-eyebrow-cyan">Network</span>
            <h2 className="rdp-h2 light">Deploy in <span className="rdp-grad-cyan">18 cities</span> across 3 continents</h2>
            <p className="rdp-head-sub light">
              Tier-1 carrier-grade datacenters with public test IPs you can ping
              before you buy. Tap any IP to copy it.
            </p>
          </div>

          <div className="rdp-region-tabs">
            {regions.map((r) => (
              <button
                key={r}
                className={`rdp-region-tab ${activeRegion === r ? "on" : ""}`}
                onClick={() => setActiveRegion(r)}
              >
                {r}
                {r !== "All" && <span className="rdp-region-count">{locations.filter((l) => l.region === r).length}</span>}
              </button>
            ))}
          </div>

          <div className="rdp-loc-grid">
            {filtered.map((l) => (
              <div key={l.city} className="rdp-loc reveal">
                <div className="rdp-loc-top">
                  <span className="rdp-loc-flag">{l.flag}</span>
                  <div>
                    <div className="rdp-loc-city">{l.city}</div>
                    <div className="rdp-loc-country">{l.country}</div>
                  </div>
                </div>
                <div className="rdp-loc-dc">{l.dc}</div>
                <button className="rdp-loc-ip" onClick={() => copyIp(l.ip)} title="Copy test IP">
                  <span>{l.ip}</span>
                  {copied === l.ip ? <CheckCheck size={14} className="rdp-ip-ok" /> : <Copy size={14} />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── DATACENTER DEEP DIVE ───────────────── */}
      <section className="rdp-section">
        <div className="container">
          <div className="rdp-dc-wrap">
            <div className="rdp-dc-intro">
              <span className="rdp-eyebrow">Flagship facility</span>
              <h2 className="rdp-h2">London <span className="rdp-grad">City Reach</span></h2>
              <p className="rdp-head-sub" style={{ marginLeft: 0 }}>
                A look inside one of our European hubs — built to the same
                redundancy and security standard as every location we run.
              </p>

              <div className="rdp-dc-net">
                <div className="rdp-dc-net-row">
                  <Activity size={15} /> <span className="rdp-dc-net-k">Network</span>
                  <span className="rdp-dc-net-v">AS25369 · LINX · AMS-IX · LoNAP</span>
                </div>
                <div className="rdp-dc-net-row">
                  <Gauge size={15} /> <span className="rdp-dc-net-k">Transits</span>
                  <span className="rdp-dc-net-v">Telia · Cogent · NTT · GTT</span>
                </div>
                <div className="rdp-dc-net-row">
                  <Globe2 size={15} /> <span className="rdp-dc-net-k">Test IPv4</span>
                  <button className="rdp-loc-ip inline" onClick={() => copyIp("89.34.96.126")}>
                    <span>89.34.96.126</span>
                    {copied === "89.34.96.126" ? <CheckCheck size={13} className="rdp-ip-ok" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="rdp-dc-specs">
              {facilitySpecs.map((g) => (
                <div key={g.title} className="rdp-dc-card reveal">
                  <div className="rdp-dc-card-head">
                    <span className="rdp-dc-card-icon">{g.icon}</span>
                    {g.title}
                  </div>
                  <ul className="rdp-dc-list">
                    {g.items.map((it) => (
                      <li key={it}><Check size={13} className="rdp-check" /> {it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── CTA ───────────────── */}
      <section className="rdp-cta">
        <div className="container rdp-cta-inner">
          <Zap size={28} className="rdp-cta-spark" />
          <h2 className="rdp-cta-h">Spin up your remote desktop today.</h2>
          <p className="rdp-cta-sub">Pick a plan, choose a city, and we'll have your licensed Windows RDP live within the hour.</p>
          <button className="btn btn-primary btn-lg" onClick={order}>
            Order {selectedPlan.name} — ${selectedPlan.price}/mo <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <Footer />

      <style>{`
        .rdp-root { background: var(--bg-primary); min-height: 100vh; }

        /* HERO */
        .rdp-hero {
          position: relative;
          background: var(--bg-dark);
          color: #fff;
          overflow: hidden;
          padding: 96px 0 80px;
        }
        .rdp-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(96,165,250,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96,165,250,0.07) 1px, transparent 1px);
          background-size: 46px 46px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%);
        }
        .rdp-hero-glow {
          position: absolute; top: -160px; left: 50%; transform: translateX(-50%);
          width: 680px; height: 480px;
          background: radial-gradient(circle, rgba(34,211,238,0.22), transparent 65%);
          filter: blur(20px); pointer-events: none;
        }
        .rdp-hero-inner { position: relative; text-align: center; }
        .rdp-pill {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 13px; font-weight: 600; letter-spacing: 0.01em;
          color: #93C5FD;
          background: rgba(96,165,250,0.1);
          border: 1px solid rgba(96,165,250,0.25);
          padding: 7px 16px; border-radius: var(--radius-full);
          margin-bottom: 26px;
        }
        .rdp-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #22D3EE;
          box-shadow: 0 0 0 0 rgba(34,211,238,0.6); animation: rdpPulse 1.8s infinite;
        }
        @keyframes rdpPulse {
          0% { box-shadow: 0 0 0 0 rgba(34,211,238,0.6); }
          70% { box-shadow: 0 0 0 8px rgba(34,211,238,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,211,238,0); }
        }
        .rdp-h1 {
          font-family: var(--font-display);
          font-size: clamp(36px, 6vw, 68px);
          font-weight: 800; line-height: 1.02; letter-spacing: -0.03em;
          margin-bottom: 22px;
        }
        .rdp-h1-accent {
          background: linear-gradient(100deg, #60A5FA, #22D3EE 60%, #A78BFA);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .rdp-sub {
          max-width: 620px; margin: 0 auto 32px;
          font-size: 18px; line-height: 1.7; color: #94A3B8;
        }
        .rdp-sub strong { color: #fff; }
        .rdp-hero-cta { display: flex; gap: 12px; justify-content: center; margin-bottom: 56px; flex-wrap: wrap; }
        .btn-ghost-dark {
          color: #fff; border: 1.5px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.03);
        }
        .btn-ghost-dark:hover { border-color: rgba(255,255,255,0.4); background: rgba(255,255,255,0.07); }

        .rdp-term {
          max-width: 560px; margin: 0 auto; text-align: left;
          background: #0B1220; border: 1px solid rgba(96,165,250,0.18);
          border-radius: var(--radius-lg);
          box-shadow: 0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.02);
          overflow: hidden;
        }
        .rdp-term-bar {
          display: flex; align-items: center; gap: 7px;
          padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
        }
        .rdp-term-bar span:not(.rdp-term-title) { width: 11px; height: 11px; border-radius: 50%; background: #334155; }
        .rdp-term-bar span:nth-child(1) { background: #ef4444; }
        .rdp-term-bar span:nth-child(2) { background: #eab308; }
        .rdp-term-bar span:nth-child(3) { background: #22c55e; }
        .rdp-term-title { margin-left: auto; font-size: 12px; color: #64748B; font-family: ${MONO}; }
        .rdp-term-body {
          margin: 0; padding: 20px; font-family: ${MONO};
          font-size: 12.5px; line-height: 1.9; color: #7DD3FC; white-space: pre-wrap;
        }

        /* SPEC STRIP */
        .rdp-strip { background: var(--bg-dark); padding: 0 0 80px; }
        .rdp-strip-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px;
        }
        .rdp-strip-item {
          display: flex; gap: 14px; align-items: flex-start;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: var(--radius-md); padding: 20px;
        }
        .rdp-strip-icon {
          flex-shrink: 0; width: 42px; height: 42px; border-radius: var(--radius-sm);
          display: grid; place-items: center; color: #22D3EE;
          background: rgba(34,211,238,0.1); border: 1px solid rgba(34,211,238,0.2);
        }
        .rdp-strip-title { color: #fff; font-weight: 700; font-size: 15px; margin-bottom: 4px; }
        .rdp-strip-desc { color: #94A3B8; font-size: 13px; line-height: 1.5; }

        /* SECTIONS */
        .rdp-section { padding: 88px 0; }
        .rdp-dark { background: var(--bg-dark); }
        .rdp-head { text-align: center; max-width: 680px; margin: 0 auto 56px; }
        .rdp-eyebrow {
          font-family: ${MONO}; font-size: 12px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--accent-primary);
          display: inline-block; margin-bottom: 14px;
        }
        .rdp-eyebrow-cyan { color: #22D3EE; }
        .rdp-h2 {
          font-family: var(--font-display); font-size: clamp(28px, 4vw, 44px);
          font-weight: 800; letter-spacing: -0.025em; line-height: 1.1; margin-bottom: 16px;
        }
        .rdp-h2.light { color: #fff; }
        .rdp-grad { background: linear-gradient(100deg, #2563EB, #7C3AED); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .rdp-grad-cyan { background: linear-gradient(100deg, #60A5FA, #22D3EE); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .rdp-head-sub { color: var(--text-secondary); font-size: 16.5px; line-height: 1.7; max-width: 560px; margin: 0 auto; }
        .rdp-head-sub.light { color: #94A3B8; }

        /* PLANS */
        .rdp-plans { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: stretch; }
        .rdp-plan {
          position: relative; text-align: left; cursor: pointer;
          background: var(--bg-card); border: 1.5px solid var(--border);
          border-radius: var(--radius-xl); padding: 28px 26px 26px;
          transition: transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s, border-color .25s;
          display: flex; flex-direction: column;
        }
        .rdp-plan:hover { transform: translateY(-5px); box-shadow: 0 24px 50px rgba(var(--glow), .16); }
        .rdp-plan.is-active { border-color: var(--accent); box-shadow: 0 24px 50px rgba(var(--glow), .2); }
        .rdp-plan.is-featured { background: var(--bg-dark); border-color: rgba(34,211,238,.3); }
        .rdp-plan.is-featured .rdp-plan-name,
        .rdp-plan.is-featured .rdp-plan-price { color: #fff; }
        .rdp-plan.is-featured .rdp-plan-tagline { color: #94A3B8; }
        .rdp-plan.is-featured .rdp-core-row,
        .rdp-plan.is-featured .rdp-shared-row { color: #CBD5E1; }
        .rdp-plan.is-featured .rdp-plan-core,
        .rdp-plan.is-featured .rdp-plan-shared { border-color: rgba(255,255,255,.1); }
        .rdp-plan-tag {
          position: absolute; top: -11px; left: 26px;
          font-size: 11px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase;
          color: #06141f; background: linear-gradient(100deg, #60A5FA, #22D3EE);
          padding: 5px 12px; border-radius: var(--radius-full);
        }
        .rdp-plan-name { font-family: var(--font-display); font-size: 19px; font-weight: 700; margin-bottom: 10px; }
        .rdp-plan-price { font-family: var(--font-display); font-size: 46px; font-weight: 800; letter-spacing: -.03em; line-height: 1; }
        .rdp-plan-cur { font-size: 24px; vertical-align: super; margin-right: 2px; color: var(--accent); }
        .rdp-plan-per { font-size: 16px; font-weight: 500; color: var(--text-muted); margin-left: 4px; }
        .rdp-plan.is-featured .rdp-plan-per { color: #64748B; }
        .rdp-plan-tagline { font-size: 13.5px; color: var(--text-secondary); line-height: 1.5; margin: 12px 0 20px; min-height: 40px; }
        .rdp-plan-core {
          display: flex; flex-direction: column; gap: 10px;
          padding: 16px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
        }
        .rdp-core-row { display: flex; align-items: center; gap: 9px; font-family: ${MONO}; font-size: 14px; font-weight: 600; color: var(--text-primary); }
        .rdp-core-row svg { color: var(--accent); }
        .rdp-plan-shared { display: flex; flex-direction: column; gap: 9px; padding: 18px 0 22px; flex: 1; }
        .rdp-shared-row { display: flex; align-items: center; gap: 8px; font-size: 13.5px; color: var(--text-secondary); }
        .rdp-check { color: var(--accent-emerald); flex-shrink: 0; }
        .rdp-plan.is-featured .rdp-check { color: #34D399; }
        .rdp-plan-select {
          text-align: center; font-size: 14px; font-weight: 700; padding: 12px;
          border-radius: var(--radius-md); border: 1.5px solid var(--border-accent);
          color: var(--accent-primary); transition: all .2s;
        }
        .rdp-plan.is-featured .rdp-plan-select { color: #22D3EE; border-color: rgba(34,211,238,.4); }
        .rdp-plan-select.sel { background: var(--accent); border-color: var(--accent); color: #fff; }
        .rdp-plan.is-featured .rdp-plan-select.sel { color: #06141f; }

        .rdp-order-bar {
          margin-top: 28px; display: flex; align-items: center; justify-content: space-between; gap: 20px;
          flex-wrap: wrap;
          background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg);
          padding: 20px 24px; box-shadow: var(--shadow-md);
        }
        .rdp-order-label { font-size: 11px; text-transform: uppercase; letter-spacing: .1em; color: var(--text-muted); font-weight: 600; }
        .rdp-order-plan { font-size: 15px; font-weight: 600; margin-top: 4px; }
        .rdp-order-right { display: flex; align-items: center; gap: 20px; }
        .rdp-order-price { font-family: var(--font-display); font-size: 30px; font-weight: 800; }
        .rdp-order-price span { font-size: 15px; font-weight: 500; color: var(--text-muted); }

        /* LOCATIONS */
        .rdp-region-tabs { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-bottom: 36px; }
        .rdp-region-tab {
          display: inline-flex; align-items: center; gap: 8px; cursor: pointer;
          font-size: 14px; font-weight: 600; color: #94A3B8;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          padding: 9px 18px; border-radius: var(--radius-full); transition: all .2s;
        }
        .rdp-region-tab:hover { color: #fff; border-color: rgba(255,255,255,0.2); }
        .rdp-region-tab.on { color: #06141f; background: #22D3EE; border-color: #22D3EE; }
        .rdp-region-count {
          font-size: 11px; font-family: ${MONO}; background: rgba(0,0,0,0.18);
          padding: 1px 7px; border-radius: var(--radius-full);
        }
        .rdp-region-tab:not(.on) .rdp-region-count { background: rgba(255,255,255,0.08); }
        .rdp-loc-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .rdp-loc {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-md); padding: 18px; transition: all .25s cubic-bezier(.22,1,.36,1);
        }
        .rdp-loc:hover { transform: translateY(-4px); border-color: rgba(34,211,238,0.35); background: rgba(34,211,238,0.04); }
        .rdp-loc-top { display: flex; align-items: center; gap: 11px; margin-bottom: 14px; }
        .rdp-loc-flag { font-size: 26px; line-height: 1; }
        .rdp-loc-city { color: #fff; font-weight: 700; font-size: 16px; }
        .rdp-loc-country { color: #64748B; font-size: 12.5px; }
        .rdp-loc-dc { color: #94A3B8; font-size: 12.5px; margin-bottom: 12px; font-weight: 500; }
        .rdp-loc-ip {
          width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 8px; cursor: pointer;
          font-family: ${MONO}; font-size: 13px; color: #7DD3FC;
          background: rgba(0,0,0,0.3); border: 1px solid rgba(125,211,252,0.15);
          padding: 8px 12px; border-radius: var(--radius-sm); transition: all .2s;
        }
        .rdp-loc-ip:hover { border-color: rgba(125,211,252,0.4); background: rgba(0,0,0,0.45); }
        .rdp-loc-ip svg { color: #64748B; flex-shrink: 0; }
        .rdp-loc-ip.inline { width: auto; display: inline-flex; padding: 5px 10px; }
        .rdp-ip-ok { color: #34D399 !important; }

        /* DATACENTER */
        .rdp-dc-wrap { display: grid; grid-template-columns: 1fr 1.3fr; gap: 48px; align-items: start; }
        .rdp-dc-intro { position: sticky; top: 96px; }
        .rdp-dc-net { margin-top: 28px; display: flex; flex-direction: column; gap: 12px; }
        .rdp-dc-net-row {
          display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
          font-size: 13px; color: var(--text-secondary);
          padding: 12px 14px; background: var(--bg-glass-blue); border: 1px solid var(--border); border-radius: var(--radius-md);
        }
        .rdp-dc-net-row svg { color: var(--accent-primary); }
        .rdp-dc-net-k { font-weight: 700; color: var(--text-primary); min-width: 64px; }
        .rdp-dc-net-v { font-family: ${MONO}; color: var(--text-secondary); }
        .rdp-loc-ip.inline span { color: var(--accent-primary); }
        .rdp-dc-specs { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .rdp-dc-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--shadow-sm); }
        .rdp-dc-card-head { display: flex; align-items: center; gap: 10px; font-family: var(--font-display); font-weight: 700; font-size: 16px; margin-bottom: 16px; }
        .rdp-dc-card-icon { width: 34px; height: 34px; border-radius: var(--radius-sm); display: grid; place-items: center; color: var(--accent-primary); background: var(--bg-glass-blue); border: 1px solid var(--border); }
        .rdp-dc-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .rdp-dc-list li { display: flex; align-items: flex-start; gap: 9px; font-size: 13.5px; color: var(--text-secondary); line-height: 1.5; }

        /* CTA */
        .rdp-cta { background: var(--bg-dark); padding: 96px 0; position: relative; overflow: hidden; }
        .rdp-cta::before {
          content: ""; position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 80% at 50% 120%, rgba(34,211,238,0.18), transparent 70%);
        }
        .rdp-cta-inner { position: relative; text-align: center; }
        .rdp-cta-spark { color: #22D3EE; margin-bottom: 18px; }
        .rdp-cta-h { font-family: var(--font-display); font-size: clamp(28px, 4vw, 42px); font-weight: 800; color: #fff; letter-spacing: -0.025em; margin-bottom: 14px; }
        .rdp-cta-sub { color: #94A3B8; font-size: 17px; max-width: 520px; margin: 0 auto 32px; line-height: 1.6; }
        .btn-lg { font-size: 16px; padding: 14px 28px; }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .rdp-strip-grid { grid-template-columns: 1fr 1fr; }
          .rdp-plans { grid-template-columns: 1fr; max-width: 440px; margin: 0 auto; }
          .rdp-plan.is-featured { order: -1; }
          .rdp-loc-grid { grid-template-columns: 1fr 1fr; }
          .rdp-dc-wrap { grid-template-columns: 1fr; gap: 32px; }
          .rdp-dc-intro { position: static; }
        }
        @media (max-width: 540px) {
          .rdp-strip-grid { grid-template-columns: 1fr; }
          .rdp-loc-grid { grid-template-columns: 1fr; }
          .rdp-dc-specs { grid-template-columns: 1fr; }
          .rdp-order-bar { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
}
