'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Link as LinkIcon, Rocket, Briefcase, FileSignature, CheckCircle } from "lucide-react";

const steps = ["Account Type", "Personal Info", "Verification", "Complete"];

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") === "owner" ? "owner" : "worker";

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    role: defaultRole,
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    country: "",
    // Worker fields
    experience: "",
    payoutMethod: "bank_transfer",
    bankName: "",
    accNumber: "",
    // Owner fields
    platform: "Outlier AI",
    accountAge: "",
    accountEarnings: "",
    agreeTerms: false,
  });

  const up = (field: string, value: string | boolean) => setForm((f) => ({ ...f, [field]: value }));

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    
    const lines = [
      `📋 *New Work Proxy Application*`,
      ``,
      `👤 *Role:* ${form.role === "worker" ? "Worker (Manager)" : "Account Owner"}`,
      `📛 *Name:* ${form.firstName} ${form.lastName}`,
      `📧 *Email:* ${form.email}`,
      `📱 *WhatsApp:* ${form.phone}`,
      `🌍 *Country:* ${form.country}`,
      ``,
    ];

    if (form.role === "worker") {
      lines.push(`💳 *Payout:* ${form.payoutMethod.replace('_', ' ')}`);
      if (form.payoutMethod === "bank_transfer") {
        lines.push(`🏦 *Bank:* ${form.bankName} — ${form.accNumber}`);
      }
      lines.push(`📝 *Experience:* ${form.experience}`);
    } else {
      lines.push(`💻 *Platform:* ${form.platform}`);
      lines.push(`📅 *Account Age:* ${form.accountAge}`);
      lines.push(`💰 *Total Earnings:* ${form.accountEarnings}`);
    }

    const msg = encodeURIComponent(lines.join('\n'));
    const waNumber = "2348152688569"; // TODO: Replace with your WhatsApp number
    window.open(`https://wa.me/${waNumber}?text=${msg}`, "_blank");
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-bg" />
      <div className="reg-card">
        <Link href="/" className="auth-back">← Back to home</Link>

        <div className="auth-logo">
          <span className="logo-icon"><LinkIcon size={22} color="var(--accent-primary)" /></span>
          <span className="logo-text" style={{ color: "var(--accent-primary)" }}>Work Proxy</span>
        </div>

        {/* Progress */}
        <div className="reg-steps">
          {steps.map((s, i) => (
            <div key={s} className={`reg-step ${i <= step ? "active" : ""} ${i < step ? "done" : ""}`}>
              <div className="reg-step-dot">{i < step ? "✓" : i + 1}</div>
              <span className="reg-step-label">{s}</span>
            </div>
          ))}
        </div>
        <div className="progress-bar" style={{ marginBottom: 32 }}>
          <div className="progress-fill" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>

        {/* Step 0: Role */}
        {step === 0 && (
          <div className="reg-step-content">
            <h2 className="auth-title">Choose Your Role</h2>
            <p className="auth-desc">How will you use Work Proxy?</p>
            <div className="role-cards">
              <button
                id="role-worker"
                className={`role-card ${form.role === "worker" ? "selected" : ""}`}
                onClick={() => up("role", "worker")}
              >
                <span className="role-icon"><Rocket size={24} color={form.role === "worker" ? "var(--accent-primary)" : "var(--text-muted)"} /></span>
                <h3>Worker (Manager)</h3>
                <p>I&apos;m outside restrictions and want to manage accounts on geo-restricted platforms to earn income.</p>
                <div className="role-earn">High earning potential based on volume</div>
              </button>
              <button
                id="role-owner"
                className={`role-card ${form.role === "owner" ? "selected" : ""}`}
                onClick={() => up("role", "owner")}
              >
                <span className="role-icon"><Briefcase size={24} color={form.role === "owner" ? "var(--accent-primary)" : "var(--text-muted)"} /></span>
                <h3>Account Owner</h3>
                <p>I have accounts on platforms like Outlier AI or Scale AI and want to earn passively.</p>
                <div className="role-earn">Competitive passive income share</div>
              </button>
            </div>
            <button id="step0-next" className="btn btn-primary w-full" style={{ justifyContent: "center", marginTop: 24 }} onClick={next}>
              Continue as {form.role === "worker" ? "Worker" : "Account Owner"} →
            </button>
          </div>
        )}

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="reg-step-content">
            <h2 className="auth-title">Personal Information</h2>
            <p className="auth-desc">Tell us about yourself</p>
            <div className="auth-form">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input id="reg-firstname" className="form-input" placeholder="John" value={form.firstName} onChange={(e) => up("firstName", e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input id="reg-lastname" className="form-input" placeholder="Doe" value={form.lastName} onChange={(e) => up("lastName", e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input id="reg-email" type="email" className="form-input" placeholder="you@example.com" value={form.email} onChange={(e) => up("email", e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">WhatsApp Number (Required)</label>
                <input id="reg-phone" type="tel" className="form-input" placeholder="+234 800 000 0000" value={form.phone} onChange={(e) => up("phone", e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Country of Residence</label>
                <select id="reg-country" className="form-select" value={form.country} onChange={(e) => up("country", e.target.value)}>
                  <option value="">Select country...</option>
                  {form.role === "worker"
                    ? ["Nigeria", "Ghana", "Kenya", "South Africa"].map((c) => <option key={c} value={c}>{c}</option>)
                    : ["United Kingdom", "United States", "Canada", "Australia", "Germany", "Netherlands"].map((c) => <option key={c} value={c}>{c}</option>)
                  }
                </select>
              </div>

            </div>
            <div className="reg-nav-btns">
              <button className="btn btn-ghost" onClick={back}>← Back</button>
              <button id="step1-next" className="btn btn-primary" onClick={next}>Continue →</button>
            </div>
          </div>
        )}

        {/* Step 2: Verification */}
        {step === 2 && (
          <div className="reg-step-content">
            <h2 className="auth-title">{form.role === "worker" ? "Experience & Payout" : "Account Verification"}</h2>
            <p className="auth-desc">{form.role === "worker" ? "Show us your track record to get approved faster" : "Tell us about the account you want to list"}</p>
            <div className="auth-form">
              {form.role === "worker" ? (
                <>
                  <div className="form-group">
                    <label className="form-label">Previous Work Experience (Platforms & Roles)</label>
                    <textarea 
                      className="form-input" 
                      placeholder="e.g. 2 years on Outlier (AI Trainer), 1 year on Remotasks..." 
                      rows={3}
                      style={{ resize: "none" }}
                      value={form.experience} 
                      onChange={(e) => up("experience", e.target.value)} 
                    />
                  </div>
                  <div className="upload-box">
                    <FileSignature size={36} color="var(--text-muted)" />
                    <p className="font-medium" style={{ marginTop: 8 }}>Upload Proof of Work</p>
                    <p className="text-sm text-muted">Screenshots of earnings, task history, or profile status.</p>
                    <button id="reg-upload" className="btn btn-ghost btn-sm" style={{ marginTop: 12 }}>Choose File</button>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Preferred Payout Method</label>
                    <select id="reg-payout" className="form-select" value={form.payoutMethod} onChange={(e) => up("payoutMethod", e.target.value)}>
                      <option value="bank_transfer">Nigerian Bank Transfer</option>
                      <option value="grey">Grey (Formerly Aboki)</option>
                      <option value="geegpay">Geegpay</option>
                      <option value="usdt">USDT (Crypto)</option>
                    </select>
                  </div>
                  {form.payoutMethod === "bank_transfer" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div className="form-group">
                        <label className="form-label">Bank Name</label>
                        <input id="reg-bankname" className="form-input" placeholder="e.g. GTBank" value={form.bankName} onChange={(e) => up("bankName", e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Account Number</label>
                        <input id="reg-accnumber" className="form-input" placeholder="10 digits" value={form.accNumber} onChange={(e) => up("accNumber", e.target.value)} maxLength={10} />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label className="form-label">Platform</label>
                    <select id="reg-platform" className="form-select" value={form.platform} onChange={(e) => up("platform", e.target.value)}>
                      <option value="Outlier AI">Outlier AI</option>
                      <option value="OneForma">OneForma</option>
                      <option value="Other">Other (specify in WhatsApp)</option>
                    </select>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div className="form-group">
                      <label className="form-label">Account Age</label>
                      <input className="form-input" placeholder="e.g. 8 months" value={form.accountAge} onChange={(e) => up("accountAge", e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Total Earnings So Far</label>
                      <input className="form-input" placeholder="e.g. $4,200" value={form.accountEarnings} onChange={(e) => up("accountEarnings", e.target.value)} />
                    </div>
                  </div>
                  <div className="upload-box">
                    <FileSignature size={36} color="var(--text-muted)" />
                    <p className="font-medium" style={{ marginTop: 8 }}>Upload Dashboard Screenshot</p>
                    <p className="text-sm text-muted">Screenshot showing your earnings dashboard or account status. This helps us verify your account quickly.</p>
                    <button id="reg-upload" className="btn btn-ghost btn-sm" style={{ marginTop: 12 }}>Choose File</button>
                  </div>
                </>
              )}
              <label className="terms-check" htmlFor="reg-terms">
                <input id="reg-terms" type="checkbox" checked={form.agreeTerms} onChange={(e) => up("agreeTerms", e.target.checked)} />
                <span className="text-sm text-secondary">
                  I agree to the <Link href="/terms" className="text-accent">Terms of Service</Link> and understand the account management risks outlined in the <Link href="/agreement" className="text-accent">Platform Agreement</Link>.
                </span>
              </label>
            </div>
            <div className="reg-nav-btns">
              <button className="btn btn-ghost" onClick={back}>← Back</button>
              <button id="step2-next" className="btn btn-primary" onClick={next}>Continue →</button>
            </div>
          </div>
        )}

        {/* Step 3: Complete */}
        {step === 3 && (
          <div className="reg-step-content" style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <CheckCircle size={56} color="var(--accent-primary)" />
            </div>
            <h2 className="auth-title">Almost Done!</h2>
            <p className="auth-desc" style={{ marginBottom: 28 }}>
              Review your registration and create your account. Your application will be manually reviewed within 24 hours.
            </p>
            <div className="reg-summary">
              <div className="reg-summary-row">
                <span className="text-muted text-sm">Role</span>
                <span className="badge badge-teal">{form.role === "worker" ? "🇳🇬 Worker" : "💼 Account Owner"}</span>
              </div>
              <div className="reg-summary-row">
                <span className="text-muted text-sm">Name</span>
                <span className="text-primary font-medium">{form.firstName} {form.lastName}</span>
              </div>
              <div className="reg-summary-row">
                <span className="text-muted text-sm">WhatsApp</span>
                <span className="text-secondary text-sm">{form.phone || "—"}</span>
              </div>
              <div className="reg-summary-row">
                <span className="text-muted text-sm">Country</span>
                <span className="text-secondary text-sm">{form.country || "—"}</span>
              </div>
              {form.role === "worker" ? (
                <div className="reg-summary-row">
                  <span className="text-muted text-sm">Payout</span>
                  <div style={{ textAlign: "right" }}>
                    <span className="text-secondary text-sm capitalize">{form.payoutMethod.replace('_', ' ')}</span>
                    {form.payoutMethod === "bank_transfer" && (
                      <p className="text-xs text-muted">{form.bankName} · {form.accNumber}</p>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="reg-summary-row">
                    <span className="text-muted text-sm">Platform</span>
                    <span className="text-secondary text-sm">{form.platform}</span>
                  </div>
                  <div className="reg-summary-row">
                    <span className="text-muted text-sm">Account Age</span>
                    <span className="text-secondary text-sm">{form.accountAge || "—"}</span>
                  </div>
                  <div className="reg-summary-row">
                    <span className="text-muted text-sm">Earnings</span>
                    <span className="text-secondary text-sm">{form.accountEarnings || "—"}</span>
                  </div>
                </>
              )}
            </div>
            <div className="reg-nav-btns" style={{ marginTop: 24 }}>
              <button className="btn btn-ghost" onClick={back}>← Edit</button>
              <button id="reg-submit" className="btn btn-primary" onClick={submit} disabled={loading}>
                {loading ? <span className="btn-spinner" /> : "Submit via WhatsApp 💬"}
              </button>
            </div>
          </div>
        )}

        <p className="auth-footer-text">
          Questions? <a href="https://wa.me/2348000000000" target="_blank" className="text-accent font-semibold">Chat with us on WhatsApp</a>
        </p>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
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
        .reg-card {
          position: relative;
          z-index: 1;
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 40px;
          width: 100%;
          max-width: 540px;
          animation: fadeInUp 0.4s ease;
          box-shadow: 0 16px 48px rgba(0,0,0,0.06);
        }
        .auth-back {
          display: inline-block;
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 24px;
          transition: color var(--transition);
        }
        .auth-back:hover { color: var(--accent-primary); }
        .auth-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 24px;
        }
        .reg-steps {
          display: flex;
          align-items: center;
          gap: 0;
          margin-bottom: 12px;
        }
        .reg-step {
          display: flex;
          align-items: center;
          gap: 6px;
          flex: 1;
          opacity: 0.4;
          transition: opacity var(--transition);
        }
        .reg-step.active { opacity: 1; }
        .reg-step-dot {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--bg-secondary);
          border: 2px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          flex-shrink: 0;
          transition: all var(--transition);
        }
        .reg-step.active .reg-step-dot {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
          color: #ffffff;
        }
        .reg-step.done .reg-step-dot {
          background: rgba(0,0,0,0.04);
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }
        .reg-step-label {
          font-size: 11px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
        }
        @media (max-width: 480px) { .reg-step-label { display: none; } }
        .reg-step-content { animation: fadeIn 0.3s ease; }
        .auth-title {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .auth-desc {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }
        .auth-form { display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px; }
        .role-cards { display: flex; flex-direction: column; gap: 12px; }
        .role-card {
          text-align: left;
          background: #ffffff;
          border: 2px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 20px;
          cursor: pointer;
          transition: all var(--transition);
          width: 100%;
        }
        .role-card:hover { border-color: var(--accent-primary); background: #fafafa; }
        .role-card.selected { border-color: var(--accent-primary); background: #f8fafc; box-shadow: 0 4px 16px rgba(0,0,0,0.03); }
        .role-icon { font-size: 28px; display: block; margin-bottom: 10px; }
        .role-card h3 { font-family: var(--font-display); font-size: 17px; margin-bottom: 6px; }
        .role-card p { font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 10px; }
        .role-earn { font-size: 13px; font-weight: 600; color: var(--accent-primary); }
        .reg-nav-btns { display: flex; justify-content: space-between; gap: 12px; margin-top: 20px; }
        .upload-box {
          border: 2px dashed var(--border);
          border-radius: var(--radius-lg);
          padding: 28px;
          text-align: center;
          transition: border-color var(--transition);
        }
        .upload-box:hover { border-color: var(--border-accent); }
        .terms-check { display: flex; align-items: flex-start; gap: 10px; cursor: pointer; }
        .terms-check input { margin-top: 2px; accent-color: var(--accent-primary); flex-shrink: 0; }
        .reg-summary {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        .reg-summary-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid var(--border);
        }
        .reg-summary-row:last-child { border-bottom: none; }
        .auth-footer-text {
          text-align: center;
          margin-top: 24px;
          font-size: 14px;
          color: var(--text-secondary);
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
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="auth-page"><div className="auth-bg" /><div className="reg-card" style={{ height: 400 }} /></div>}>
      <RegisterForm />
    </Suspense>
  );
}
