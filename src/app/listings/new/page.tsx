'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Key, Camera, FileText, Fingerprint, Rocket, ArrowLeft, Check } from "lucide-react";

const platforms = ["Outlier AI", "OneForma"];
const taskTypes: Record<string, string[]> = {
  "Outlier AI": ["AI Training", "Creative Writing", "Coding", "Math & Logic"],
  "Scale AI": ["Data Labeling", "RLHF", "Image Annotation", "Text Classification"],
  "OneForma": ["Transcription", "Translation", "Annotation", "Data Collection"],
  "Appen": ["Search Evaluation", "Data Annotation", "Social Media Rating"],
  "Telus International": ["Content Rating", "Web Research", "Ads Assessment"],
  "Remotasks": ["3D Annotation", "LiDAR", "Micro-tasks", "Object Detection"],
};

export default function NewListingPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    platform: "",
    taskTypes: [] as string[],
    avgEarning: "",
    accountAge: "",
    ownerSplit: "35",
    availability: "immediate",
    requireTrial: true,
    trialDays: "14",
    description: "",
    proofType: "screenshot",
    notes: "",
  });
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const up = (field: string, value: string | boolean | string[]) => setForm((f) => ({ ...f, [field]: value }));
  const toggleTask = (task: string) => {
    up("taskTypes", form.taskTypes.includes(task)
      ? form.taskTypes.filter((t) => t !== task)
      : [...form.taskTypes, task]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    router.push("/dashboard?role=owner");
  };

  const availableTasks = form.platform ? taskTypes[form.platform] || [] : [];

  // Calculated splits
  const workerEarning = 100 - 50 - parseInt(form.ownerSplit || "35");
  const accountEarning = parseInt(form.avgEarning || "0");

  return (
    <div className="auth-page" style={{ alignItems: "flex-start", paddingTop: 40 }}>
      <div className="auth-bg" />
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 640, margin: "0 auto" }}>
        <Link href="/dashboard?role=owner" className="auth-back"><ArrowLeft size={14} style={{ display: "inline", marginRight: 4 }} /> Back to Dashboard</Link>
 
         <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
-          <span>⛓️</span>
-          <span>Access<span className="gradient-text">Bridge</span></span>
+          <Key size={18} color="var(--accent-primary)" />
+          <span style={{ color: "var(--accent-primary)" }}>Work Proxy</span>
         </div>

        {step === 0 && (
          <div className="card" style={{ animation: "fadeInUp 0.3s ease" }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginBottom: 8 }}>List Your Account</h1>
            <p className="text-secondary text-sm" style={{ marginBottom: 28 }}>
              Tell us about the platform account you want to make available for management. All listings require admin approval.
            </p>

            <div className="auth-form">
              <div className="form-group">
                <label className="form-label">Platform *</label>
                <select id="new-platform" className="form-select" value={form.platform} onChange={(e) => { up("platform", e.target.value); up("taskTypes", []); }}>
                  <option value="">Select a platform...</option>
                  {platforms.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>

              {availableTasks.length > 0 && (
                <div className="form-group">
                  <label className="form-label">Task Types Available *</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
                    {availableTasks.map((task) => (
                      <button
                        key={task}
                        type="button"
                        className={`badge ${form.taskTypes.includes(task) ? "badge-green" : "badge-blue"}`}
                        style={{ cursor: "pointer", padding: "6px 12px", fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}
                        onClick={() => toggleTask(task)}
                      >
                        {form.taskTypes.includes(task) ? <Check size={12} /> : ""}{task}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Avg. Monthly Earning (USD) *</label>
                  <input id="new-earning" className="form-input" type="number" placeholder="e.g. 1200" value={form.avgEarning} onChange={(e) => up("avgEarning", e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Account Age</label>
                  <input className="form-input" placeholder="e.g. 12 months" value={form.accountAge} onChange={(e) => up("accountAge", e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Your Earnings Split (Owner %) — between 30–40%</label>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    id="new-split"
                    className="form-input"
                    type="range"
                    min="30" max="40"
                    value={form.ownerSplit}
                    onChange={(e) => up("ownerSplit", e.target.value)}
                    style={{ flex: 1, accentColor: "var(--accent-primary)", background: "transparent" }}
                  />
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--accent-primary)", minWidth: 40 }}>{form.ownerSplit}%</span>
                </div>
                {accountEarning > 0 && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 12 }}>
                    {[
                      { label: "You Receive", value: Math.round(accountEarning * parseInt(form.ownerSplit) / 100), color: "#f59e0b" },
                      { label: "Worker Gets", value: Math.round(accountEarning * workerEarning / 100), color: "#0099ff" },
                      { label: "Platform Fee", value: Math.round(accountEarning * 0.5), color: "var(--accent-rose)" },
                    ].map((item) => (
                      <div key={item.label} style={{ background: "var(--bg-secondary)", borderRadius: "var(--radius-md)", padding: "10px 14px", textAlign: "center" }}>
                        <p className="text-xs text-muted">{item.label}/mo</p>
                        <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: item.color, fontSize: 18 }}>${item.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Account Availability</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["immediate", "1 week", "2 weeks"].map((opt) => (
                    <button key={opt} type="button"
                      className={`badge ${form.availability === opt ? "badge-green" : "badge-blue"}`}
                      style={{ cursor: "pointer", padding: "8px 14px", fontSize: 13 }}
                      onClick={() => up("availability", opt)}
                    >
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--bg-secondary)", padding: "14px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                <input
                  id="new-trial"
                  type="checkbox"
                  checked={form.requireTrial}
                  onChange={(e) => up("requireTrial", e.target.checked)}
                  style={{ accentColor: "var(--accent-primary)", width: 16, height: 16 }}
                />
                <div>
                  <p className="font-medium text-sm">Require a trial period</p>
                  <p className="text-xs text-muted">Worker works at 10% rate for {form.trialDays} days before full split kicks in</p>
                </div>
                {form.requireTrial && (
                  <input
                    className="form-input"
                    type="number"
                    value={form.trialDays}
                    onChange={(e) => up("trialDays", e.target.value)}
                    style={{ width: 70, marginLeft: "auto" }}
                    min="7" max="30"
                  />
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Description (visible to workers)</label>
                <textarea
                  id="new-description"
                  className="form-input"
                  rows={4}
                  placeholder="Describe the type of tasks, your account history, any requirements for the manager..."
                  value={form.description}
                  onChange={(e) => up("description", e.target.value)}
                  style={{ resize: "vertical" }}
                />
              </div>
            </div>

            <button id="new-listing-next" className="btn btn-primary w-full" style={{ justifyContent: "center", marginTop: 20 }} onClick={() => setStep(1)}>
              Continue — Verify Account →
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="card" style={{ animation: "fadeInUp 0.3s ease" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 8 }}>Verify Your Account</h2>
            <p className="text-secondary text-sm" style={{ marginBottom: 24 }}>
              Submit proof that this account is active and in good standing. Listings go live only after admin approval.
            </p>

            <div className="auth-form">
              <div className="form-group">
                <label className="form-label">Proof Type</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["screenshot", "earnings-pdf", "account-id"].map((t) => (
                    <button key={t} type="button"
                      className={`badge ${form.proofType === t ? "badge-green" : "badge-blue"}`}
                      style={{ cursor: "pointer", padding: "8px 14px", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}
                      onClick={() => up("proofType", t)}
                    >
                      {t === "screenshot" ? <><Camera size={14} /> Screenshot</> : t === "earnings-pdf" ? <><FileText size={14} /> Earnings PDF</> : <><Fingerprint size={14} /> Account ID</>}
                    </button>
                  ))}
                </div>
              </div>

              <div className="upload-box">
                <div style={{ color: "var(--text-muted)", marginBottom: 12 }}>
                  {form.proofType === "screenshot" ? <Camera size={32} /> : form.proofType === "earnings-pdf" ? <FileText size={32} /> : <Fingerprint size={32} />}
                </div>
                <p className="font-medium">
                  Upload {form.proofType === "screenshot" ? "earnings screenshot" : form.proofType === "earnings-pdf" ? "earnings PDF" : "account verification"}
                </p>
                <p className="text-sm text-muted" style={{ marginTop: 4 }}>PNG, JPG or PDF — max 10MB</p>
                <button id="upload-proof" className="btn btn-ghost btn-sm" style={{ marginTop: 12 }}>Choose File</button>
              </div>

              <div style={{ background: "#f1f5f9", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: 16 }}>
                <p className="text-sm font-semibold text-primary" style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                  <FileText size={14} /> Listing Summary
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span className="text-xs text-muted">Platform</span>
                    <span className="text-sm font-semibold">{form.platform || "—"}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span className="text-xs text-muted">Estimated Monthly</span>
                    <span className="text-sm font-semibold text-accent">${form.avgEarning || "—"}/mo</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span className="text-xs text-muted">Your Split</span>
                    <span className="text-sm font-semibold">{form.ownerSplit}%</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span className="text-xs text-muted">Trial Period</span>
                    <span className="text-sm">{form.requireTrial ? `${form.trialDays} days` : "None"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <button className="btn btn-ghost" onClick={() => setStep(0)}>← Back</button>
              <button id="submit-listing" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={handleSubmit} disabled={loading}>
                {loading ? <span className="btn-spinner" /> : <span style={{ display: "flex", alignItems: "center", gap: 8 }}>Submit for Review <Rocket size={16} /></span>}
              </button>
            </div>
          </div>
        )}

        <style>{`
          .auth-page {
            min-height: 100vh;
            display: flex;
            padding: 40px 16px;
            position: relative;
          }
          .auth-bg {
            position: fixed;
            inset: 0;
            background: #f8fafc;
            pointer-events: none;
            z-index: 0;
          }
          .auth-back {
            display: inline-block;
            font-size: 13px;
            color: var(--text-muted);
            margin-bottom: 24px;
            transition: color var(--transition);
          }
          .auth-back:hover { color: var(--accent-primary); }
          .auth-form { display: flex; flex-direction: column; gap: 18px; }
          .upload-box {
            border: 2px dashed var(--border);
            background: #ffffff;
            border-radius: var(--radius-lg);
            padding: 36px;
            text-align: center;
            transition: all var(--transition);
          }
          .upload-box:hover {
            border-color: var(--border-accent);
            background: rgba(0,212,170,0.04);
          }
          .btn-spinner {
            display: inline-block;
            width: 18px;
            height: 18px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: #ffffff;
            border-radius: 50%;
            animation: spin 0.7s linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
}
