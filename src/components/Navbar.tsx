'use client';

import Link from "next/link";
import { useState } from "react";
import { Link as LinkIcon } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const initial = session?.user?.name?.charAt(0).toUpperCase() || session?.user?.email?.charAt(0).toUpperCase() || 'U';

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-inner">
          <Link href="/" className="navbar-logo">
            <span className="logo-icon"><LinkIcon size={22} color="var(--accent-primary)" /></span>
            <span className="logo-text" style={{ color: "var(--accent-primary)" }}>Work Proxy</span>
          </Link>

          <div className="navbar-links">
             <Link href="/listings" className="nav-link">Browse Accounts</Link>
            <Link href="/services" className="nav-link">Onboarding Services</Link>
          </div>

          <div className="navbar-actions">
            {status === 'authenticated' ? (
              <Link href={session.user?.role === 'admin' ? '/admin' : '/dashboard'} className="avatar-link">
                <div className="avatar avatar-sm" style={session.user?.role === 'admin' ? { background: "linear-gradient(135deg, #f59e0b, #f43f5e)" } : {}}>{initial}</div>
                <span className="nav-link" style={{ fontWeight: 600 }}>
                  {session.user?.role === 'admin' ? 'Admin Panel' : 'My Dashboard'}
                </span>
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className="btn btn-ghost btn-sm">Sign In</Link>
                <Link href="/auth/register?role=owner" className="btn btn-primary btn-sm">List Account</Link>
              </>
            )}
          </div>

          <button
            className="mobile-menu-btn"
            aria-label="Open menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span /><span /><span />
          </button>
        </div>

        {mobileOpen && (
          <div className="mobile-menu">
             <Link href="/listings" className="mobile-link" onClick={() => setMobileOpen(false)}>Browse Accounts</Link>
            <Link href="/services" className="mobile-link" onClick={() => setMobileOpen(false)}>Onboarding Services</Link>

            {status === 'authenticated' ? (
              <Link href={session.user?.role === 'admin' ? '/admin' : '/dashboard'} className="mobile-link" onClick={() => setMobileOpen(false)}>
                {session.user?.role === 'admin' ? 'Go to Admin Panel' : 'Go to Dashboard'} ({session.user?.name})
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className="mobile-link" onClick={() => setMobileOpen(false)}>Sign In</Link>
                <Link href="/auth/register?role=owner" className="btn btn-primary btn-sm w-full" style={{ justifyContent: "center", marginTop: 8 }}>List Account</Link>
              </>
            )}
          </div>
        )}
      </div>

      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px) saturate(140%);
          -webkit-backdrop-filter: blur(20px) saturate(140%);
          box-shadow: 0 4px 16px rgba(0,0,0,0.02);
        }
        .navbar-inner {
          display: flex;
          align-items: center;
          height: 68px;
          gap: 24px;
        }
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .logo-icon { font-size: 22px; }
        .logo-text {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 2px;
          margin-left: 24px;
          flex: 1;
          background: rgba(0,0,0,0.02);
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          padding: 4px;
        }
        .nav-link {
          padding: 7px 16px;
          border-radius: var(--radius-full);
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-muted);
          transition: all var(--transition);
          white-space: nowrap;
        }
        .nav-link:hover {
          color: var(--text-primary);
          background: #ffffff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .avatar-link {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          padding: 4px 8px;
          border-radius: var(--radius-full);
          transition: all var(--transition);
        }
        .avatar-link:hover {
          background: rgba(0,0,0,0.03);
        }
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-left: auto;
        }
        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-md);
          padding: 8px;
          cursor: pointer;
          margin-left: auto;
        }
        .mobile-menu-btn span {
          display: block;
          width: 20px;
          height: 1.5px;
          background: var(--text-secondary);
          border-radius: 2px;
          transition: all var(--transition);
        }
        .mobile-menu {
          padding: 16px 0 20px;
          border-top: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 6px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
        .mobile-link {
          display: block;
          padding: 11px 4px;
          font-size: 15px;
          font-weight: 500;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border);
          transition: color var(--transition);
        }
        .mobile-link:hover { color: var(--accent-primary); }
        @media (max-width: 768px) {
          .navbar-links, .navbar-actions { display: none; }
          .mobile-menu-btn { display: flex; }
        }
      `}</style>
    </nav>
  );
}
