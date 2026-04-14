'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { Link as LinkIcon, FileSignature, CheckCircle } from "lucide-react";

const steps = ["Personal Info", "Verification", "Complete"];

function RegisterForm() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    phone: "",
    firstName: "",
    lastName: "",
    country: "",
    platform: "Outlier AI",
    accountAge: "",
    accountEarnings: "",
    agreeTerms: false,
  });

  const up = (field: string, value: string | boolean) => setForm((f) => ({ ...f, [field]: value }));

  const next = () => setStep((s) => Math.min(s + 1, 2));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role: "owner" }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        alert(data.error || "Something went wrong!");
        setLoading(false);
        return;
      }

      // Success! Auto-redirect to login
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
      setLoading(false);
    }
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

        {/* Step 0: Personal Info */}
        {step === 0 && (
          <div className="reg-step-content">
            <h2 className="auth-title">Personal Information</h2>
            <p className="auth-desc">Tell us about yourself to list an account</p>
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
                <label className="form-label">Password</label>
                <input id="reg-password" type="password" className="form-input" placeholder="Create a secure password" value={form.password} onChange={(e) => up("password", e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">WhatsApp Number (Required)</label>
                <input id="reg-phone" type="tel" className="form-input" placeholder="+234 800 000 0000" value={form.phone} onChange={(e) => up("phone", e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Country of Residence</label>
                <select id="reg-country" className="form-select" value={form.country} onChange={(e) => up("country", e.target.value)}>
                  <option value="">Select country...</option>
                  {["United Kingdom", "United States", "Canada", "Australia", "Germany", "Netherlands"].map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

            </div>
            <div className="reg-nav-btns" style={{ justifyContent: "flex-end" }}>
              <button id="step1-next" className="btn btn-primary" onClick={next}>Continue →</button>
            </div>
          </div>
        )}

        {/* Step 1: Verification */}
        {step === 1 && (
          <div className="reg-step-content">
            <h2 className="auth-title">Account Verification</h2>
            <p className="auth-desc">Tell us about the account you want to list</p>
            <div className="auth-form">
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

        {/* Step 2: Complete */}
        {step === 2 && (
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
                <span className="badge badge-teal">💼 Account Owner</span>
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
            </div>
            <div className="reg-nav-btns" style={{ marginTop: 24 }}>
              <button className="btn btn-ghost" onClick={back}>← Edit</button>
              <button id="reg-submit" className="btn btn-primary" onClick={submit} disabled={loading}>
                {loading ? <span className="btn-spinner" /> : "Submit via WhatsApp 💬"}
              </button>
            </div>
          </div>
        )}

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
