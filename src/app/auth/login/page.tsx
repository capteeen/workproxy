'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link as LinkIcon, Rocket, Briefcase, Shield } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    // Simulate auth — route to dashboard
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    router.push("/dashboard");
  };

  const demoLogin = (role: "owner" | "worker" | "admin") => {
    setLoading(true);
    setTimeout(() => {
      if (role === "admin") router.push("/admin");
      else router.push("/dashboard?role=" + role);
    }, 800);
  };

  return (
    <div className="auth-page">
      <div className="auth-bg" />
      <div className="auth-card">
        <Link href="/" className="auth-back">← Back to home</Link>
        <div className="auth-logo">
          <span className="logo-icon"><LinkIcon size={22} color="var(--accent-primary)" /></span>
          <span className="logo-text" style={{ color: "var(--accent-primary)" }}>Work Proxy</span>
        </div>
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-desc">Sign in to your Work Proxy account</p>

        {/* Demo quick logins */}
        <div className="demo-logins">
          <p className="text-xs text-muted" style={{ marginBottom: 10 }}>Quick Demo Access:</p>
          <div className="demo-btns">
            <button id="demo-worker" className="demo-btn" onClick={() => demoLogin("worker")}>
              <Rocket size={14} /> Worker Demo
            </button>
            <button id="demo-owner" className="demo-btn" onClick={() => demoLogin("owner")}>
              <Briefcase size={14} /> Owner Demo
            </button>
            <button id="demo-admin" className="demo-btn" onClick={() => demoLogin("admin")}>
              <Shield size={14} /> Admin Demo
            </button>
          </div>
        </div>

        <div className="auth-divider"><span>or sign in with email</span></div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              id="login-email"
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              id="login-password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              autoComplete="current-password"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link href="/auth/forgot" className="text-sm text-accent">Forgot password?</Link>
          </div>
          <button id="login-submit" type="submit" className="btn btn-primary w-full" style={{ justifyContent: "center", marginTop: 8 }} disabled={loading}>
            {loading ? <span className="btn-spinner" /> : "Sign In"}
          </button>
        </form>

        <p className="auth-footer-text">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-accent font-semibold">Create one</Link>
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
        .auth-card {
          position: relative;
          z-index: 1;
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 40px;
          width: 100%;
          max-width: 440px;
          animation: fadeInUp 0.4s ease;
          box-shadow: 0 16px 48px rgba(0,0,0,0.06);
        }
        .auth-back {
          display: inline-block;
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 28px;
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
        .auth-title {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .auth-desc {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 28px;
        }
        .demo-logins { margin-bottom: 4px; }
        .demo-btns { display: flex; gap: 8px; flex-wrap: wrap; }
        .demo-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 9px 12px;
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition);
          white-space: nowrap;
        }
        .demo-btn:hover { 
          border-color: var(--accent-primary); 
          color: var(--accent-primary); 
          background: #fafafa;
        }
        .auth-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
        }
        .auth-divider::before, .auth-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .auth-divider span { font-size: 12px; color: var(--text-muted); white-space: nowrap; }
        .auth-form { display: flex; flex-direction: column; gap: 16px; }
        .auth-error {
          background: rgba(244,63,94,0.1);
          border: 1px solid rgba(244,63,94,0.25);
          color: #f43f5e;
          padding: 10px 14px;
          border-radius: var(--radius-md);
          font-size: 13px;
        }
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
