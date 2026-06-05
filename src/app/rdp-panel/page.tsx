'use client';

import { useState, useRef } from "react";
import { Download, RefreshCw, Monitor, Cpu, HardDrive, Globe, Wifi, Clock, Shield, Copy, Check } from "lucide-react";

interface RDPData {
  customerName: string;
  orderId: string;
  ipAddress: string;
  username: string;
  password: string;
  os: string;
  ram: string;
  cpu: string;
  storage: string;
  location: string;
  bandwidth: string;
  validUntil: string;
  port: string;
  plan: string;
}

const EMPTY: RDPData = {
  customerName: "", orderId: "", ipAddress: "", username: "administrator",
  password: "", os: "Windows Server 2022", ram: "", cpu: "",
  storage: "", location: "", bandwidth: "Unmetered", validUntil: "", port: "3389", plan: "",
};

function genOrderId() {
  return "WP-RDP-" + Math.random().toString(36).slice(2,8).toUpperCase();
}

function CopyBtn({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={copy} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 4px", borderRadius: 4, color: copied ? "#059669" : "#64748b", display: "inline-flex", alignItems: "center" }}>
      {copied ? <Check size={12} /> : <Copy size={12} />}
    </button>
  );
}

function Card({ d, ref: cardRef }: { d: RDPData; ref?: React.RefObject<HTMLDivElement | null> }) {
  const empty = !d.ipAddress && !d.customerName;
  return (
    <div ref={cardRef} id="rdp-card" style={{
      width: 480, minHeight: 640, background: "linear-gradient(160deg,#0B1120 0%,#0F172A 60%,#0B1120 100%)",
      borderRadius: 20, overflow: "hidden", fontFamily: "'Instrument Sans',system-ui,sans-serif",
      boxShadow: "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
      position: "relative",
    }}>
      {/* Top accent bar */}
      <div style={{ height: 3, background: "linear-gradient(90deg,#2563EB,#0D9488,#D97706)" }} />

      {/* Header */}
      <div style={{ padding: "24px 28px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.jpg" alt="Work Proxy" style={{ width: 32, height: 32, borderRadius: 7, objectFit: "cover" }} />
          <div>
            <div style={{ fontFamily: "'Bricolage Grotesque',system-ui,sans-serif", fontWeight: 800, fontSize: 15, color: "#fff", lineHeight: 1.1 }}>Work Proxy</div>
            <div style={{ fontSize: 10, color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase" }}>RDP Access Card</div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 10, color: "#64748b", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 2 }}>Order</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#94A3B8", fontFamily: "monospace" }}>{d.orderId || "WP-RDP-XXXXXX"}</div>
        </div>
      </div>

      {/* Customer + Plan */}
      <div style={{ padding: "18px 28px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ fontSize: 11, color: "#64748b", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 4 }}>Prepared for</div>
        <div style={{ fontFamily: "'Bricolage Grotesque',system-ui,sans-serif", fontWeight: 700, fontSize: 20, color: "#fff" }}>
          {d.customerName || <span style={{ color: "#334155" }}>Customer Name</span>}
        </div>
        {d.plan && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 8, background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)", borderRadius: 9999, padding: "3px 10px" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#2563EB" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#93C5FD", letterSpacing: "0.04em" }}>{d.plan}</span>
          </div>
        )}
      </div>

      {/* Connection credentials */}
      <div style={{ padding: "18px 28px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ fontSize: 10, color: "#0D9488", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
          <Shield size={11} color="#0D9488" /> Connection Credentials
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { label: "IP Address", value: d.ipAddress || "—", mono: true, highlight: true },
            { label: "Port",       value: d.port || "3389", mono: true },
            { label: "Username",   value: d.username || "administrator", mono: true },
            { label: "Password",   value: d.password ? "••••••••••" : "—", mono: true },
          ].map(row => (
            <div key={row.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: row.highlight ? "rgba(37,99,235,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${row.highlight ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.06)"}`, borderRadius: 8, padding: "8px 12px" }}>
              <span style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>{row.label}</span>
              <span style={{ fontSize: 13, fontFamily: row.mono ? "monospace" : "inherit", fontWeight: 600, color: row.highlight ? "#93C5FD" : "#CBD5E1" }}>{row.value}</span>
            </div>
          ))}
        </div>
        {d.password && (
          <div style={{ marginTop: 8, background: "rgba(217,119,6,0.08)", border: "1px solid rgba(217,119,6,0.2)", borderRadius: 8, padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>Password (visible)</span>
            <span style={{ fontSize: 13, fontFamily: "monospace", fontWeight: 600, color: "#FCD34D" }}>{d.password}</span>
          </div>
        )}
      </div>

      {/* Server specs */}
      <div style={{ padding: "18px 28px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ fontSize: 10, color: "#0D9488", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
          <Monitor size={11} color="#0D9488" /> Server Specifications
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {[
            { label: "Operating System", value: d.os,        icon: "💿", full: true },
            { label: "RAM",              value: d.ram,        icon: "⚡" },
            { label: "CPU",              value: d.cpu,        icon: "🔧" },
            { label: "Storage",          value: d.storage,    icon: "💾" },
            { label: "Location",         value: d.location,   icon: "📍" },
            { label: "Bandwidth",        value: d.bandwidth,  icon: "🌐" },
          ].map(s => (
            <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "8px 10px", gridColumn: s.full ? "1/-1" : undefined }}>
              <div style={{ fontSize: 10, color: "#475569", marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: s.value ? "#CBD5E1" : "#1E293B" }}>{s.value || "—"}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "14px 28px 22px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Clock size={11} color="#475569" />
          <span style={{ fontSize: 11, color: "#475569" }}>
            {d.validUntil ? `Valid until ${d.validUntil}` : "Validity not set"}
          </span>
        </div>
        <div style={{ fontSize: 10, color: "#1E293B", letterSpacing: "0.05em" }}>workproxy.fun</div>
      </div>

      {/* Subtle grid overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none", borderRadius: 20 }} />

      {empty && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(11,17,32,0.5)", borderRadius: 20, backdropFilter: "blur(2px)" }}>
          <p style={{ color: "#334155", fontSize: 13, textAlign: "center" }}>Fill in the form<br />to preview the card</p>
        </div>
      )}
    </div>
  );
}

export default function RdpPanelPage() {
  const [d, setD] = useState<RDPData>({ ...EMPTY, orderId: genOrderId() });
  const [printing, setPrinting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const up = (k: keyof RDPData, v: string) => setD(f => ({ ...f, [k]: v }));

  const handleDownload = () => {
    setPrinting(true);
    setTimeout(() => { window.print(); setPrinting(false); }, 100);
  };

  const fields: { label: string; key: keyof RDPData; placeholder: string; type?: string; options?: string[] }[] = [
    { label: "Customer Name",  key: "customerName", placeholder: "e.g. James Okafor" },
    { label: "Order ID",       key: "orderId",      placeholder: "Auto-generated" },
    { label: "Plan / Tier",    key: "plan",         placeholder: "e.g. Standard, Pro, Elite" },
    { label: "IP Address",     key: "ipAddress",    placeholder: "e.g. 38.180.210.235" },
    { label: "Port",           key: "port",         placeholder: "3389" },
    { label: "Username",       key: "username",     placeholder: "administrator" },
    { label: "Password",       key: "password",     placeholder: "Enter password", type: "password" },
    { label: "Operating System",key: "os",          placeholder: "Windows Server 2022" },
    { label: "RAM",            key: "ram",          placeholder: "e.g. 8 GB" },
    { label: "CPU",            key: "cpu",          placeholder: "e.g. 4 vCPU Cores" },
    { label: "Storage",        key: "storage",      placeholder: "e.g. 100 GB SSD" },
    { label: "Location",       key: "location",     placeholder: "e.g. London, UK" },
    { label: "Bandwidth",      key: "bandwidth",    placeholder: "Unmetered" },
    { label: "Valid Until",    key: "validUntil",   placeholder: "e.g. 30 June 2025", type: "text" },
  ];

  return (
    <>
      <div className="page no-print">
        {/* Header */}
        <div className="panel-header">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/logo.jpg" alt="" style={{ width: 28, height: 28, borderRadius: 6, objectFit: "cover" }} />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "#0b1120" }}>RDP Card Generator</span>
            <span style={{ fontSize: 11, color: "#94a3b8", background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 9999, padding: "2px 8px" }}>Internal Tool</span>
          </div>
          <button className="dl-btn" onClick={handleDownload} disabled={!d.ipAddress}>
            <Download size={14} /> Download Card
          </button>
        </div>

        <div className="layout">
          {/* Form */}
          <div className="form-panel">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "#0b1120" }}>RDP Details</h2>
              <button className="reset-btn" onClick={() => setD({ ...EMPTY, orderId: genOrderId() })}>
                <RefreshCw size={12} /> Reset
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              {fields.map(f => (
                <div key={f.key}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#334155", marginBottom: 5, letterSpacing: "0.03em" }}>{f.label}</label>
                  <input
                    type={f.type || "text"}
                    placeholder={f.placeholder}
                    value={(d as any)[f.key]}
                    onChange={e => up(f.key, e.target.value)}
                    style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 8, padding: "9px 12px", fontSize: 13, color: "#0b1120", outline: "none", boxSizing: "border-box", fontFamily: "inherit", background: "#fff", transition: "border-color 0.15s" }}
                    onFocus={e => (e.target.style.borderColor = "#2563eb")}
                    onBlur={e => (e.target.style.borderColor = "#e2e8f0")}
                  />
                </div>
              ))}
            </div>

            {/* Copy box */}
            {d.ipAddress && d.password && (
              <div style={{ marginTop: 20, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Quick Copy</div>
                {[
                  { label: "IP", value: d.ipAddress },
                  { label: "User", value: d.username },
                  { label: "Pass", value: d.password },
                ].map(r => (
                  <div key={r.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 0" }}>
                    <span style={{ fontSize: 11, color: "#94a3b8", width: 36 }}>{r.label}</span>
                    <span style={{ fontSize: 12, fontFamily: "monospace", color: "#0b1120", flex: 1 }}>{r.value}</span>
                    <CopyBtn value={r.value} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Card preview */}
          <div className="preview-panel">
            <div style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginBottom: 16, letterSpacing: "0.05em", textTransform: "uppercase" }}>Live Preview</div>
            <Card d={d} ref={cardRef} />
            <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginTop: 14, lineHeight: 1.5 }}>
              Click <strong>Download Card</strong> → Save as PDF in the print dialog<br />
              then screenshot or share the PDF directly with the customer.
            </p>
          </div>
        </div>
      </div>

      {/* Print-only card */}
      <div className="print-only">
        <Card d={d} />
      </div>

      <style>{`
        :root { --font-display: 'Bricolage Grotesque', system-ui, sans-serif; }

        .page {
          min-height: 100vh;
          background: #f1f5f9;
          font-family: 'Instrument Sans', system-ui, sans-serif;
        }
        .panel-header {
          background: #fff;
          border-bottom: 1px solid #e2e8f0;
          padding: 14px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .layout {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 0;
          min-height: calc(100vh - 57px);
        }
        .form-panel {
          background: #fff;
          border-right: 1px solid #e2e8f0;
          padding: 24px 20px;
          overflow-y: auto;
          max-height: calc(100vh - 57px);
        }
        .preview-panel {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
        }
        .dl-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg,#2563eb,#0d9488);
          border: none;
          border-radius: 9999px;
          padding: 9px 20px;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(37,99,235,0.3);
          transition: opacity 0.15s;
          font-family: inherit;
        }
        .dl-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .dl-btn:not(:disabled):hover { opacity: 0.88; }
        .reset-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: #64748b;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 9999px;
          padding: 5px 12px;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.15s;
        }
        .reset-btn:hover { color: #0b1120; border-color: #cbd5e1; }

        /* Print */
        @media print {
          .no-print { display: none !important; }
          body { margin: 0; background: #0B1120; }
          .print-only {
            display: flex !important;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: #0B1120;
          }
        }
        .print-only { display: none; }

        @media (max-width: 768px) {
          .layout { grid-template-columns: 1fr; }
          .form-panel { max-height: unset; border-right: none; border-bottom: 1px solid #e2e8f0; }
          .preview-panel { padding: 24px 16px; }
        }
      `}</style>
    </>
  );
}
