import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <LinkIcon size={22} color="var(--text-primary)" />
              <span className="logo-txt" style={{ color: "var(--text-primary)" }}>Work Proxy</span>
            </div>
            <p className="footer-tagline">
              Bridging geo-restricted platform access between global account holders and skilled Nigerian remote workers.
            </p>
            <div className="footer-meta">
              <span className="badge badge-teal">MVP v1.0</span>
              <span className="text-muted text-xs">April 2026</span>
            </div>
          </div>

          <div className="footer-col">
            <h4>Platform</h4>
            <Link href="/listings">Browse Listings</Link>
            <Link href="/services">Onboarding Guides</Link>
            <Link href="/auth/register?role=worker">Become a Worker</Link>
            <Link href="/auth/register?role=owner">List an Account</Link>
            <Link href="/dashboard">Dashboard</Link>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <Link href="/#how">How It Works</Link>
            <Link href="/#earnings">Earnings Model</Link>
            <Link href="/#faq">FAQ</Link>

          </div>

          <div className="footer-col">
            <h4>Supported Platforms</h4>
            <span className="footer-platform">Outlier AI</span>
            <span className="footer-platform">Scale AI</span>
            <span className="footer-platform">OneForma</span>
            <span className="footer-platform">Appen</span>
            <span className="footer-platform">Telus International</span>
            <span className="footer-platform">Remotasks</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="text-muted text-sm">© 2026 Work Proxy. All rights reserved. Internal MVP documentation — confidential.</p>
          <p className="text-muted text-xs" style={{ marginTop: 4 }}>Disclaimer: Work Proxy is not responsible for third-party platform ToS decisions. Users accept risk through signed agreements.</p>
        </div>
      </div>

      <style>{`
        .footer {
          background: #f8fafc;
          border-top: 1px solid var(--border);
          padding: 64px 0 32px;
          margin-top: 40px;
          position: relative;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 48px;
        }
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr; }
        }
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 20px;
          margin-bottom: 16px;
        }
        .logo-txt {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 20px;
        }
        .footer-tagline {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.8;
          max-width: 300px;
          margin-bottom: 16px;
        }
        .footer-meta { display: flex; align-items: center; gap: 10px; }
        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-col h4 {
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 4px;
          font-weight: 600;
        }
        .footer-col a {
          font-size: 14px;
          color: var(--text-secondary);
          transition: color var(--transition);
        }
        .footer-col a:hover { color: var(--accent-primary); }
        .footer-platform {
          font-size: 14px;
          color: var(--text-muted);
        }
        .footer-bottom {
          border-top: 1px solid var(--border);
          padding-top: 24px;
        }
      `}</style>
    </footer>
  );
}
