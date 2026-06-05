'use client';

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Suspense } from "react";

function PrintCard() {
  const params = useSearchParams();

  const d = {
    customerName: params.get("customerName") || "",
    orderId:      params.get("orderId") || "",
    plan:         params.get("plan") || "",
    ipAddress:    params.get("ipAddress") || "",
    port:         params.get("port") || "3389",
    username:     params.get("username") || "administrator",
    password:     params.get("password") || "",
    os:           params.get("os") || "",
    ram:          params.get("ram") || "",
    cpu:          params.get("cpu") || "",
    storage:      params.get("storage") || "",
    location:     params.get("location") || "",
    bandwidth:    params.get("bandwidth") || "",
    validUntil:   params.get("validUntil") || "",
  };

  useEffect(() => {
    // Wait for fonts + logo to load, then print
    const t = setTimeout(() => window.print(), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div style={{
        margin: "0 auto",
        width: 520,
        minHeight: 680,
        background: "linear-gradient(160deg,#0B1120 0%,#0F172A 60%,#0B1120 100%)",
        borderRadius: 20,
        overflow: "hidden",
        fontFamily: "'Instrument Sans',Arial,sans-serif",
        boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        position: "relative",
      }}>
        {/* Top gradient bar */}
        <div style={{ height: 4, background: "linear-gradient(90deg,#2563EB,#0D9488,#D97706)", printColorAdjust: "exact" } as any} />

        {/* Header */}
        <div style={{ padding: "26px 32px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="/logo.jpg" alt="Work Proxy" style={{ width: 36, height: 36, borderRadius: 8, objectFit: "cover" }} />
            <div>
              <div style={{ fontFamily: "Arial,sans-serif", fontWeight: 800, fontSize: 16, color: "#FFFFFF", letterSpacing: "-0.01em" }}>Work Proxy</div>
              <div style={{ fontSize: 10, color: "#64748B", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 1 }}>RDP Access Card</div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, color: "#475569", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>Order Reference</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#94A3B8", fontFamily: "Courier New, monospace", letterSpacing: "0.04em" }}>{d.orderId}</div>
          </div>
        </div>

        {/* Customer + Plan */}
        <div style={{ padding: "20px 32px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: 10, color: "#64748B", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5 }}>Prepared for</div>
          <div style={{ fontFamily: "Arial,sans-serif", fontWeight: 800, fontSize: 22, color: "#FFFFFF", letterSpacing: "-0.02em" }}>{d.customerName || "—"}</div>
          {d.plan && (
            <div style={{ display: "inline-block", marginTop: 10, background: "rgba(37,99,235,0.2)", border: "1px solid rgba(37,99,235,0.4)", borderRadius: 9999, padding: "4px 12px" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#93C5FD", letterSpacing: "0.04em" }}>{d.plan} Plan</span>
            </div>
          )}
        </div>

        {/* Credentials */}
        <div style={{ padding: "20px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: 10, color: "#0D9488", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 14 }}>— Connection Credentials</div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {[
                { label: "IP Address", value: d.ipAddress, highlight: true },
                { label: "Port",       value: d.port },
                { label: "Username",   value: d.username },
                { label: "Password",   value: d.password, secret: true },
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: "7px 10px", background: row.highlight ? "rgba(37,99,235,0.12)" : i%2===0 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 6, width: "35%", fontSize: 11, color: "#64748B", fontWeight: 500 }}>{row.label}</td>
                  <td style={{ padding: "7px 14px", background: row.highlight ? "rgba(37,99,235,0.08)" : i%2===0 ? "rgba(255,255,255,0.025)" : "transparent", border: "1px solid rgba(255,255,255,0.06)", fontSize: 14, fontFamily: "Courier New, monospace", fontWeight: 700, color: row.highlight ? "#93C5FD" : row.secret ? "#FCD34D" : "#CBD5E1", letterSpacing: row.secret ? "0.06em" : "0.02em" }}>{row.value || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Specs */}
        <div style={{ padding: "20px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: 10, color: "#0D9488", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 14 }}>— Server Specifications</div>
          {d.os && (
            <div style={{ marginBottom: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "8px 12px" }}>
              <div style={{ fontSize: 10, color: "#475569", marginBottom: 2 }}>Operating System</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#CBD5E1" }}>{d.os}</div>
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {[
              { label: "RAM",       value: d.ram },
              { label: "CPU",       value: d.cpu },
              { label: "Storage",   value: d.storage },
              { label: "Location",  value: d.location },
              { label: "Bandwidth", value: d.bandwidth },
            ].filter(s => s.value).map(s => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "8px 12px" }}>
                <div style={{ fontSize: 10, color: "#475569", marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#CBD5E1" }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* How to connect */}
        <div style={{ padding: "16px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: 10, color: "#475569", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>— How to Connect</div>
          <div style={{ fontSize: 11, color: "#475569", lineHeight: 1.7 }}>
            <span style={{ color: "#64748B" }}>Windows:</span> Press <span style={{ background: "rgba(255,255,255,0.07)", borderRadius: 4, padding: "1px 5px", fontFamily: "monospace", fontSize: 11, color: "#94A3B8" }}>Win + R</span> → type <span style={{ fontFamily: "monospace", color: "#93C5FD" }}>mstsc</span> → enter the IP address above.<br />
            <span style={{ color: "#64748B" }}>Mac:</span> Use <span style={{ color: "#93C5FD" }}>Microsoft Remote Desktop</span> from the App Store.
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 32px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 11, color: "#334155" }}>
            {d.validUntil ? `Valid until ${d.validUntil}` : ""}
          </div>
          <div style={{ fontSize: 10, color: "#1E293B", letterSpacing: "0.06em" }}>workproxy.fun</div>
        </div>

        {/* Grid overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.018) 1px,transparent 1px)", backgroundSize: "22px 22px", pointerEvents: "none", borderRadius: 20 } as any} />
      </div>

      <style>{`
        @page { size: A4; margin: 20mm; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
        html, body { margin: 0; padding: 0; background: #060A14 !important; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
      `}</style>
    </>
  );
}

export default function PrintPage() {
  return (
    <Suspense>
      <PrintCard />
    </Suspense>
  );
}
