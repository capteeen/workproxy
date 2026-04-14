'use client';

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { MessageSquare, ShieldCheck, DollarSign, ArrowRight, Key, ArrowLeft } from "lucide-react";

export default function ListAccountPage() {
  return (
    <>
      <Navbar />
      <div className="auth-page">
        <div className="auth-bg" />
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 800, padding: "60px 20px" }}>
          
          <Link href="/" className="auth-back" style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none", color: "var(--text-muted)", marginBottom: 32 }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <div className="card" style={{ padding: "48px", textAlign: "center", border: "1px solid var(--border)", boxShadow: "0 20px 48px rgba(0,0,0,0.05)" }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, background: "rgba(0,212,170,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <Key size={32} color="var(--accent-primary)" />
            </div>
            
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 800, marginBottom: 16 }}>
              List Your Account
            </h1>
            <p className="text-secondary" style={{ fontSize: 18, maxWidth: 540, margin: "0 auto 40px", lineHeight: 1.6 }}>
              Want to monetize your global platform accounts? We curate the highest-quality accounts for our elite management team.
            </p>

            <div className="grid-3" style={{ textAlign: "left", gap: 24, marginBottom: 40 }}>
              <div className="feature-item">
                <div className="icon-circle"><ShieldCheck size={20} /></div>
                <h4>Curated Protection</h4>
                <p>We verify every manager to ensure your account security is prioritized.</p>
              </div>
              <div className="feature-item">
                <div className="icon-circle"><DollarSign size={20} /></div>
                <h4>Passive Income</h4>
                <p>Earn up to 40% of the account earnings without lifting a finger.</p>
              </div>
              <div className="feature-item">
                <div className="icon-circle"><MessageSquare size={20} /></div>
                <h4>Direct Support</h4>
                <p>Human support on WhatsApp for every step of the listing process.</p>
              </div>
            </div>

            <div className="cta-box" style={{ background: "#f8fafc", borderRadius: 20, padding: 32, border: "1px solid var(--border)" }}>
              <h3 style={{ marginBottom: 12 }}>Ready to get started?</h3>
              <p className="text-sm text-secondary" style={{ marginBottom: 24 }}>
                Contact our verification team on WhatsApp. We&apos;ll review your account details, earnings history, and get you listed within 24 hours.
              </p>
              <a 
                href="https://wa.me/2348123456789" // Updated to a professional button
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
                style={{ width: "100%", justifyContent: "center", textDecoration: "none", gap: 10 }}
              >
                <MessageSquare size={18} /> Chat with Verification Team <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .auth-page { min-height: 100vh; background: #fff; position: relative; }
        .auth-bg { position: fixed; inset: 0; background-image: radial-gradient(circle at 2px 2px, #e2e8f0 1px, transparent 0); background-size: 32px 32px; opacity: 0.5; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; }
        @media (max-width: 640px) { .grid-3 { grid-template-columns: 1fr; } }
        .feature-item h4 { font-family: var(--font-display); font-size: 15px; margin-bottom: 8px; }
        .feature-item p { font-size: 13px; color: var(--text-muted); line-height: 1.5; }
        .icon-circle { width: 40px; height: 40px; borderRadius: 50%; background: #f1f5f9; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; color: var(--accent-primary); }
        .btn-lg { padding: 16px 24px; font-size: 16px; font-weight: 700; }
      `}</style>
    </>
  );
}
