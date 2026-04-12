'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import type { ReactNode } from "react";
import {
  Key, LayoutDashboard, FolderOpen, ClipboardList, FileText,
  Wallet, User, Search, Home, LogOut, Bell, MonitorPlay,
  DollarSign, CalendarDays, Clock, TrendingUp
} from "lucide-react";

const workerData = {
  name: "Chukwudi Okafor",
  tier: "Standard",
  tierClass: "tier-standard",
  rating: 4.1,
  earnings: { total: 1430, thisMonth: 390, pending: 120 },
  accounts: [
    { platform: "Outlier AI", status: "Active", owner: "James T. (UK)", earned: 780, pct: 13, color: "#00d4aa" },
    { platform: "Appen", status: "Trial", owner: "Sarah M. (US)", earned: 120, pct: 10, color: "#f59e0b" },
  ],
  applications: [
    { platform: "Scale AI", status: "Pending", applied: "Apr 9, 2026" },
    { platform: "OneForma", status: "Rejected", applied: "Apr 3, 2026" },
  ],
  reports: [
    { week: "Apr 7–13", tasks: 47, earned: 195, submitted: true },
    { week: "Mar 31–Apr 6", tasks: 52, earned: 208, submitted: true },
  ],
};

const ownerData = {
  name: "James Thornton",
  country: "United Kingdom 🇬🇧",
  earnings: { total: 2240, thisMonth: 560, pending: 180 },
  accounts: [
    { platform: "Outlier AI", worker: "Chukwudi O. (NG)", status: "Active", workerRating: 4.1, earned: 2240, ownerPct: 27, color: "#00d4aa" },
  ],
  pendingReports: [
    { week: "Apr 7–13", platform: "Outlier AI", earned: 780, yourCut: 210 },
  ],
};

function DashboardContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") === "owner" ? "owner" : "worker";
  const isNew = searchParams.get("new") === "1";

  const [activeTab, setActiveTab] = useState("overview");

  const tabs = role === "worker"
    ? ["overview", "accounts", "applications", "reports", "wallet", "profile"]
    : ["overview", "accounts", "reports", "profile"];

  return (
    <div className="dash-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <Key size={18} color="var(--accent-primary)" />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--accent-primary)" }}>
              Work Proxy
            </span>
          </Link>
        </div>

        <div className="sidebar-user">
          <div className="avatar avatar-md">{role === "worker" ? "C" : "J"}</div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600 }}>{role === "worker" ? workerData.name : ownerData.name}</p>
            <span className={`badge badge-sm ${role === "worker" ? workerData.tierClass : "badge-blue"}`} style={{ fontSize: 10, padding: "2px 8px" }}>
              {role === "worker" ? workerData.tier : "Account Owner"}
            </span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <span className="sidebar-section-label">Main</span>
          {tabs.map((tab) => (
            <button
              key={tab}
              id={`nav-${tab}`}
              className={`sidebar-link ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              <span className="icon">{tabIcon(tab)}</span>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
          <span className="sidebar-section-label" style={{ marginTop: 8 }}>Account</span>
          <Link href="/listings" className="sidebar-link">
            <span className="icon"><Search size={16} /></span>
            {role === "worker" ? "Browse Listings" : "My Listings"}
          </Link>
          <Link href="/" className="sidebar-link">
            <span className="icon"><Home size={16} /></span>Home
          </Link>
          <Link href="/auth/login" className="sidebar-link" style={{ color: "var(--accent-rose)" }}>
            <span className="icon"><LogOut size={16} /></span>Sign Out
          </Link>
        </nav>

        <div className="sidebar-bottom">
          <div className="tier-progress">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span className="text-xs text-muted">Tier Progress</span>
              <span className="text-xs text-accent">Standard → Verified</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "62%" }} />
            </div>
            <p className="text-xs text-muted" style={{ marginTop: 6 }}>62 days to Verified tier</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="dash-main">
        {isNew && (
          <div className="welcome-banner">
            🎉 Welcome to Work Proxy! Your account is being verified. You&apos;ll receive an email within 24 hours.
            <button className="welcome-close">✕</button>
          </div>
        )}

        <header className="dash-topbar">
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700 }}>
              {tabTitle(activeTab)}
            </h1>
            <p className="text-sm text-muted">April 11, 2026</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="notif-btn"><Bell size={16} /><span className="notif-count">3</span></div>
            <div className="avatar avatar-sm">{role === "worker" ? "C" : "J"}</div>
          </div>
        </header>

        <div className="dash-content">
          {activeTab === "overview" && <OverviewTab role={role} />}
          {activeTab === "accounts" && <AccountsTab role={role} />}
          {activeTab === "applications" && <ApplicationsTab />}
          {activeTab === "reports" && <ReportsTab role={role} />}
          {activeTab === "wallet" && role === "worker" && <WalletTab role={role} />}
          {activeTab === "profile" && <ProfileTab role={role} />}
        </div>
      </main>

      <style>{`
        .dash-layout {
          display: flex;
          min-height: 100vh;
          background: var(--bg-primary);
        }
        .dash-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow-x: hidden;
        }
        .dash-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 32px;
          border-bottom: 1px solid var(--border);
          background: #ffffff;
          position: sticky;
          top: 0;
          z-index: 10;
          box-shadow: 0 4px 16px rgba(0,0,0,0.03);
        }
        .dash-content { padding: 32px; flex: 1; }
        @media (max-width: 768px) {
          .dash-content { padding: 16px; }
          .dash-topbar { padding: 16px; }
          .sidebar { display: none; }
        }
        .sidebar-user {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px 20px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 8px;
        }
        .sidebar-bottom {
          padding: 16px 20px;
          border-top: 1px solid var(--border);
          margin-top: auto;
        }
        .tier-progress { }
        .notif-btn {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background: var(--bg-glass-light);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 16px;
          position: relative;
        }
        .notif-count {
          position: absolute;
          top: -4px;
          right: -4px;
          background: var(--accent-rose);
          color: #fff;
          font-size: 9px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }
        .welcome-banner {
          background: #f0fdf4;
          border-bottom: 1px solid #bbf7d0;
          padding: 14px 32px;
          font-size: 14px;
          color: #16a34a;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .welcome-close {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}

function tabIcon(tab: string) {
  switch (tab) {
    case "overview": return <LayoutDashboard size={16} />;
    case "accounts": return <FolderOpen size={16} />;
    case "applications": return <ClipboardList size={16} />;
    case "reports": return <FileText size={16} />;
    case "wallet": return <Wallet size={16} />;
    case "profile": return <User size={16} />;
    default: return <LayoutDashboard size={16} />;
  }
}
function tabTitle(tab: string) {
  const titles: Record<string, string> = {
    overview: "Dashboard Overview", accounts: "My Accounts",
    applications: "Applications", reports: "Work Reports", wallet: "Wallet & Payouts",
    profile: "My Profile",
  };
  return titles[tab] || tab;
}

function StatCard({ icon, label, value, sub, color }: { icon: ReactNode; label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ color: color || "var(--text-secondary)" }}>{icon}</div>
      <div className="stat-value" style={{ color: color || "var(--text-primary)" }}>{value}</div>
      <div className="stat-label">{label}</div>
      {sub && <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function OverviewTab({ role }: { role: string }) {
  const d = role === "worker" ? workerData : ownerData;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div className="grid-4">
        <StatCard icon={<DollarSign size={20} />} label={role === "worker" ? "Total Earned" : "Total Revenue"} value={`$${d.earnings.total}`} color="var(--accent-primary)" />
        <StatCard icon={<CalendarDays size={20} />} label="This Month" value={`$${d.earnings.thisMonth}`} color="#0099ff" />
        <StatCard icon={<Clock size={20} />} label={role === "worker" ? "Pending" : "Commission Due"} value={`$${d.earnings.pending}`} color="#f59e0b" />
        <StatCard icon={<FolderOpen size={20} />} label="Active Accounts" value={`${d.accounts.length}`} color="#10b981" />
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, marginBottom: 16 }}>Active Account Engagements</h3>
          {d.accounts.map((a) => (
            <div key={a.platform} className="account-row">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "#f8fafc", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MonitorPlay size={18} color="var(--text-secondary)" />
                </div>
                <div>
                  <p className="font-semibold" style={{ fontSize: 14 }}>{a.platform}</p>
                  <p className="text-xs text-muted">{'worker' in a ? `Worker: ${(a as {worker:string}).worker}` : `Owner: ${(a as {owner:string}).owner}`}</p>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span className={`badge ${a.status === "Active" ? "badge-green" : "badge-amber"}`}>{a.status}</span>
                <p className="text-xs text-muted" style={{ marginTop: 4 }}>${a.earned} earned</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, marginBottom: 16 }}>Earnings Breakdown</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Work Proxy (50%)", pct: 50, color: "var(--accent-rose)", amount: Math.round(d.earnings.total * 0.5) },
              { label: role === "worker" ? "You (Worker, 13.5%)" : "You (Owner, 36.5%)", pct: role === "worker" ? 13.5 : 36.5, color: "var(--accent-primary)", amount: Math.round(d.earnings.total * (role === "worker" ? 0.135 : 0.365)) },
              { label: role === "worker" ? "Account Owner (36.5%)" : "Worker (13.5%)", pct: role === "worker" ? 36.5 : 13.5, color: "#0099ff", amount: Math.round(d.earnings.total * (role === "worker" ? 0.365 : 0.135)) },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span className="text-sm text-secondary">{item.label}</span>
                  <span className="text-sm font-semibold" style={{ color: item.color }}>${item.amount}</span>
                </div>
                <div className="progress-bar" style={{ height: 8 }}>
                  <div className="progress-fill" style={{ width: `${item.pct}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .account-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid var(--border);
        }
        .account-row:last-child { border-bottom: none; }
      `}</style>
    </div>
  );
}

function AccountsTab({ role }: { role: string }) {
  const accs = role === "worker" ? workerData.accounts : ownerData.accounts;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>
          {role === "worker" ? "Accounts Under Management" : "Listed Accounts"}
        </h2>
        {role === "owner" && (
          <Link href="/listings/new" className="btn btn-primary btn-sm">+ List New Account</Link>
        )}
        {role === "worker" && (
          <Link href="/listings" className="btn btn-outline btn-sm">Browse Listings →</Link>
        )}
      </div>
      {accs.map((a) => (
        <div key={a.platform} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "#f8fafc", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MonitorPlay size={22} color="var(--text-secondary)" />
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, marginBottom: 4 }}>{a.platform}</h3>
              <p className="text-sm text-muted">{'worker' in a ? `Worker: ${(a as {worker:string}).worker}` : `Owner: ${(a as {owner:string}).owner}`}</p>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <span className={`badge ${a.status === "Active" ? "badge-green" : "badge-amber"}`}>{a.status}</span>
                <span className="badge badge-blue">{a.status === "Active" ? "pct" in a ? `${(a as typeof workerData.accounts[0]).pct}% Worker Cut` : `${(a as typeof ownerData.accounts[0]).ownerPct}% Owner Cut` : ""}</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <p className="text-xs text-muted">Total Earned</p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--accent-primary)" }}>${a.earned}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 8, justifyContent: "flex-end" }}>
              <button className="btn btn-ghost btn-sm">View Details</button>
              {role === "owner" && <button className="btn btn-danger btn-sm">Revoke Access</button>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ApplicationsTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>My Applications</h2>
        <Link href="/listings" className="btn btn-primary btn-sm">Browse Listings →</Link>
      </div>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Platform</th>
              <th>Status</th>
              <th>Applied</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {workerData.applications.map((app) => (
              <tr key={app.platform}>
                <td className="font-semibold text-primary" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <MonitorPlay size={15} color="var(--text-secondary)" /> {app.platform}
                </td>
                <td>
                  <span className={`badge ${app.status === "Pending" ? "badge-amber" : "badge-rose"}`}>{app.status}</span>
                </td>
                <td>{app.applied}</td>
                <td>
                  {app.status === "Pending" && <button className="btn btn-ghost btn-sm">Withdraw</button>}
                  {app.status === "Rejected" && <Link href="/listings" className="btn btn-outline btn-sm">Try Again</Link>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReportsTab({ role }: { role: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>Weekly Work Reports</h2>
        {role === "worker" && <button id="submit-report" className="btn btn-primary btn-sm">+ Submit Report</button>}
      </div>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Week</th>
              <th>Tasks Completed</th>
              <th>Earnings Generated</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {workerData.reports.map((r) => (
              <tr key={r.week}>
                <td className="font-semibold text-primary">{r.week}</td>
                <td>{r.tasks} tasks</td>
                <td className="text-accent font-semibold">${r.earned}</td>
                <td><span className={`badge ${r.submitted ? "badge-green" : "badge-amber"}`}>{r.submitted ? "✓ Submitted" : "Pending"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {role === "owner" && (
        <div className="card">
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, marginBottom: 12 }}>Pending Approval</h3>
          {ownerData.pendingReports.map((r) => (
            <div key={r.week} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
              <div>
                <p className="font-semibold text-sm">{r.week} — {r.platform}</p>
                <p className="text-xs text-muted">Account earned: ${r.earned} → Your cut: <span className="text-accent">${r.yourCut}</span></p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button id="approve-report" className="btn btn-outline btn-sm">✓ Approve</button>
                <button className="btn btn-danger btn-sm">Dispute</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WalletTab({ role }: { role: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div className="grid-3">
        <StatCard icon={<Wallet size={20} />} label="Available Balance" value={role === "worker" ? "$245" : "$380"} color="var(--accent-primary)" />
        <StatCard icon={<Clock size={20} />} label="Pending Clearance" value={role === "worker" ? "$120" : "$180"} color="#f59e0b" />
        <StatCard icon={<TrendingUp size={20} />} label="Total Withdrawn" value={role === "worker" ? "$1,065" : "$1,680"} color="#10b981" />
      </div>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16 }}>Payout Method</h3>
          <button className="btn btn-ghost btn-sm">Edit</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px", background: "#f8fafc", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
          <DollarSign size={28} color="var(--text-muted)" />
          <div>
            <p className="font-semibold">{role === "worker" ? "Payoneer" : "Wise"}</p>
            <p className="text-sm text-muted">{role === "worker" ? "c.okafor@payoneer.com" : "james.thornton@wise.com"}</p>
          </div>
          <span className="badge badge-green" style={{ marginLeft: "auto" }}>Verified</span>
        </div>
        <button id="request-payout" className="btn btn-primary w-full" style={{ justifyContent: "center", marginTop: 20 }}>
          Request Payout — ${role === "worker" ? "245" : "380"}
        </button>
      </div>
      <div className="card">
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, marginBottom: 16 }}>Transaction History</h3>
        <div className="table-wrapper">
          <table className="table">
            <thead><tr><th>Date</th><th>Description</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {[
                { date: "Apr 7, 2026", desc: "Weekly payout — Outlier AI", amount: "+$195", status: "Completed" },
                { date: "Mar 31, 2026", desc: "Weekly payout — Outlier AI", amount: "+$208", status: "Completed" },
                { date: "Mar 24, 2026", desc: "Weekly payout — Outlier AI", amount: "+$175", status: "Completed" },
              ].map((t) => (
                <tr key={t.date}>
                  <td>{t.date}</td>
                  <td className="text-primary">{t.desc}</td>
                  <td className="text-accent font-semibold">{t.amount}</td>
                  <td><span className="badge badge-green">{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ role }: { role: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24, flexWrap: "wrap" }}>
          <div className="avatar avatar-lg">{role === "worker" ? "C" : "J"}</div>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, marginBottom: 4 }}>
              {role === "worker" ? workerData.name : ownerData.name}
            </h2>
            <p className="text-sm text-muted">{role === "worker" ? "Nigeria 🇳🇬" : ownerData.country}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <span className={`badge ${role === "worker" ? workerData.tierClass : "badge-blue"}`}>
                {role === "worker" ? workerData.tier + " Tier" : "Account Owner"}
              </span>
              {role === "worker" && (
                <span className="badge badge-green">Verified ID</span>
              )}
            </div>
          </div>
          <button className="btn btn-ghost btn-sm" style={{ marginLeft: "auto" }}>Edit Profile</button>
        </div>
        {role === "worker" && (
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <div>
              <p className="text-xs text-muted">Star Rating</p>
              <div className="stars" style={{ marginTop: 4 }}>★★★★☆ <span className="text-secondary" style={{ fontSize: 13, marginLeft: 4 }}>{workerData.rating}/5.0</span></div>
            </div>
            <div>
              <p className="text-xs text-muted">Total Earned</p>
              <p className="font-bold" style={{ color: "var(--accent-primary)", marginTop: 2 }}>${workerData.earnings.total}</p>
            </div>
            <div>
              <p className="text-xs text-muted">Accounts Managed</p>
              <p className="font-bold" style={{ marginTop: 2 }}>{workerData.accounts.length}</p>
            </div>
          </div>
        )}
      </div>
      {role === "worker" && (
        <div className="card">
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, marginBottom: 16 }}>Skills & Expertise</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["AI Training & Annotation", "Creative Writing", "Data Labeling", "Content Rating", "English Fluency", "Transcription"].map((skill) => (
              <span key={skill} className="badge badge-blue">{skill}</span>
            ))}
            <button className="btn btn-ghost btn-sm">+ Add Skill</button>
          </div>
        </div>
      )}
      <div className="card">
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, marginBottom: 16 }}>Account Settings</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" defaultValue={role === "worker" ? "chukwudi.okafor@email.com" : "james.thornton@email.co.uk"} />
          </div>
          <div className="form-group">
            <label className="form-label">Phone (WhatsApp)</label>
            <input className="form-input" defaultValue={role === "worker" ? "+234 801 234 5678" : "+44 7700 900000"} />
          </div>
          <button id="save-profile" className="btn btn-primary btn-sm" style={{ alignSelf: "flex-start" }}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}



export default function DashboardPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}><div className="btn-spinner" style={{ width: 32, height: 32, border: "3px solid rgba(0,0,0,0.08)", borderTopColor: "var(--accent-primary)" }} /></div>}>
      <DashboardContent />
    </Suspense>
  );
}
