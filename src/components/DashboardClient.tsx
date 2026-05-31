'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import type { ReactNode } from "react";
import { signOut } from "next-auth/react";
import {
  Key, LayoutDashboard, FolderOpen, ClipboardList, FileText,
  Wallet, User, Search, Home, LogOut, Bell, MonitorPlay,
  DollarSign, CalendarDays, Clock, TrendingUp
} from "lucide-react";

export type DashboardData = {
  name: string;
  email: string;
  bio: string;
  resumeUrl: string;
  twitterUrl: string;
  phone: string;
  country: string;
  skills: string[];
  tier: string;
  tierClass: string;
  rating: number;
  earnings: { total: number; thisMonth: number; pending: number };
  accounts: any[];
  applications: any[];
  requests?: any[];
  reports: any[];
  transactions: any[];
  notifications: any[];
};

function DashboardContent({ workerData }: { workerData: DashboardData }) {
  const searchParams = useSearchParams();
  const isNew = searchParams.get("new") === "1";

  const [activeTab, setActiveTab] = useState("overview");
  const [showNotifs, setShowNotifs] = useState(false);

  const tabs = ["overview", "accounts", "applications", "requests", "reports", "wallet", "profile"];
  const unreadCount = workerData.notifications?.filter(n => !n.read).length || 0;

  return (
    <div className="dash-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <img src="/logo.jpg" alt="Logo" style={{ width: 24, height: 24, borderRadius: 4, objectFit: 'cover' }} />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--accent-primary)" }}>
              Work Proxy
            </span>
          </Link>
        </div>

        <div className="sidebar-user">
          <div className="avatar avatar-md">{workerData.name?.charAt(0)?.toUpperCase() || "U"}</div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600 }}>{workerData.name}</p>
            <span className={`badge badge-sm ${workerData.tierClass}`} style={{ fontSize: 10, padding: "2px 8px" }}>
              {workerData.tier}
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
            Browse Listings
          </Link>
          <Link href="/" className="sidebar-link">
            <span className="icon"><Home size={16} /></span>Home
          </Link>
          <button onClick={() => signOut({ callbackUrl: '/auth/login' })} className="sidebar-link" style={{ color: "var(--accent-rose)", width: "100%", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", paddingLeft: 12 }}>
            <span className="icon"><LogOut size={16} /></span>Sign Out
          </button>
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
            <div className="notif-btn" onClick={() => setShowNotifs(!showNotifs)}>
              <Bell size={16} />
              {unreadCount > 0 && <span className="notif-count">{unreadCount}</span>}
              
              {showNotifs && (
                <div className="notif-dropdown">
                  <div className="notif-header">Notifications</div>
                  <div className="notif-list">
                    {workerData.notifications?.length > 0 ? (
                      workerData.notifications.map(n => (
                        <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`}>
                          <p className="notif-item-title">{n.title}</p>
                          <p className="notif-item-msg">{n.message}</p>
                          <span className="notif-item-time">{n.createdAt}</span>
                        </div>
                      ))
                    ) : (
                      <p style={{ padding: 20, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>No notifications</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="avatar avatar-sm">{workerData.name?.charAt(0)?.toUpperCase() || "U"}</div>
          </div>
        </header>

        <div className="dash-content">
          {activeTab === "overview" && <OverviewTab workerData={workerData} />}
          {activeTab === "accounts" && <AccountsTab workerData={workerData} />}
          {activeTab === "applications" && <ApplicationsTab workerData={workerData} />}
          {activeTab === "requests" && <RequestsTab workerData={workerData} />}
          {activeTab === "reports" && <ReportsTab workerData={workerData} />}
          {activeTab === "wallet" && <WalletTab workerData={workerData} />}
          {activeTab === "profile" && <ProfileTab workerData={workerData} />}
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
        .notif-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          width: 300px;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          margin-top: 10px;
          z-index: 100;
          overflow: hidden;
          text-align: left;
        }
        .notif-header { padding: 12px 16px; font-weight: 700; font-size: 14px; border-bottom: 1px solid var(--border); background: #f8fafc; color: var(--text-primary); }
        .notif-list { max-height: 360px; overflow-y: auto; }
        .notif-item { padding: 12px 16px; border-bottom: 1px solid var(--border); transition: background 0.2s; }
        .notif-item:hover { background: #f8fafc; }
        .notif-item.unread { background: rgba(0,212,170,0.03); border-left: 3px solid var(--accent-primary); }
        .notif-item-title { font-weight: 600; font-size: 13.5px; color: var(--text-primary); margin-bottom: 2px; }
        .notif-item-msg { font-size: 12.5px; color: var(--text-secondary); line-height: 1.4; margin-bottom: 4px; }
        .notif-item-time { font-size: 11px; color: var(--text-muted); }
      `}</style>
    </div>
  );
}

function tabIcon(tab: string) {
  switch (tab) {
    case "overview": return <LayoutDashboard size={16} />;
    case "accounts": return <FolderOpen size={16} />;
    case "applications": return <ClipboardList size={16} />;
    case "requests": return <Bell size={16} />;
    case "reports": return <FileText size={16} />;
    case "wallet": return <Wallet size={16} />;
    case "profile": return <User size={16} />;
    default: return <LayoutDashboard size={16} />;
  }
}
function RequestsTab({ workerData }: { workerData: DashboardData }) {
  const [loading, setLoading] = useState<string | null>(null);
  
  const handleMatchAction = async (matchId: string, status: 'ONGOING' | 'TERMINATED') => {
    setLoading(matchId);
    try {
      const res = await fetch('/api/match/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchId, status })
      });
      if (res.ok) {
        window.location.reload();
      } else {
        alert("Action failed");
      }
    } catch (e) {
      alert("Error taking action");
    } finally {
      setLoading(null);
    }
  };

  const reqs = workerData.requests || [];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>Worker Match Requests</h2>
      {reqs.length === 0 && <p className="text-muted">No pending match requests.</p>}
      {reqs.map((r: any) => (
        <div key={r.id} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16 }}>{r.workerName}</h3>
            <p className="text-sm text-secondary">Applied for {r.platform} · {r.appliedAt}</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
             <button className="btn btn-primary btn-sm" disabled={!!loading} onClick={() => handleMatchAction(r.id, 'ONGOING')}>Approve</button>
             <button className="btn btn-danger btn-sm" disabled={!!loading} onClick={() => handleMatchAction(r.id, 'TERMINATED')}>Decline</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function tabTitle(tab: string) {
  const titles: Record<string, string> = {
    overview: "Dashboard Overview", accounts: "My Accounts",
    applications: "Applications", requests: "Match Requests", reports: "Work Reports", wallet: "Wallet & Payouts",
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

function OverviewTab({ workerData }: { workerData: DashboardData }) {
  const d = workerData;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div className="grid-4">
        <StatCard icon={<DollarSign size={20} />} label="Total Earned" value={`$${d.earnings.total}`} color="var(--accent-primary)" />
        <StatCard icon={<CalendarDays size={20} />} label="This Month" value={`$${d.earnings.thisMonth}`} color="#0099ff" />
        <StatCard icon={<Clock size={20} />} label="Pending" value={`$${d.earnings.pending}`} color="#f59e0b" />
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
                  <p className="text-xs text-muted">Owner: {a.owner}</p>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span className={`badge ${a.status === "Active" ? "badge-green" : "badge-amber"}`}>{a.status}</span>
                <p className="text-xs text-muted" style={{ marginTop: 4 }}>${a.earned} earned</p>
              </div>
            </div>
          ))}
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

function AccountsTab({ workerData }: { workerData: DashboardData }) {
  const accs = workerData.accounts;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>Accounts Under Management</h2>
        <Link href="/listings" className="btn btn-outline btn-sm">Browse Listings →</Link>
      </div>
      {accs.map((a) => (
        <div key={a.platform} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "#f8fafc", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MonitorPlay size={22} color="var(--text-secondary)" />
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, marginBottom: 4 }}>{a.platform}</h3>
              <p className="text-sm text-muted">Owner: {a.owner}</p>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <span className={`badge ${a.status === "Active" ? "badge-green" : "badge-amber"}`}>{a.status}</span>
                <span className="badge badge-blue">{a.pct}% Worker Cut</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <p className="text-xs text-muted">Total Earned</p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--accent-primary)" }}>${a.earned}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 8, justifyContent: "flex-end" }}>
              <button className="btn btn-ghost btn-sm">View Details</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ApplicationsTab({ workerData }: { workerData: DashboardData }) {
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

function ReportsTab({ workerData }: { workerData: DashboardData }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>Weekly Work Reports</h2>
        <button id="submit-report" className="btn btn-primary btn-sm">+ Submit Report</button>
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
    </div>
  );
}

function WalletTab({ workerData }: { workerData: DashboardData }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div className="grid-3">
        <StatCard icon={<Wallet size={20} />} label="Available Balance" value={`$${workerData.earnings.total}`} color="var(--accent-primary)" />
        <StatCard icon={<Clock size={20} />} label="Pending Clearance" value={`$${workerData.earnings.pending}`} color="#f59e0b" />
        <StatCard icon={<TrendingUp size={20} />} label="Total Withdrawn" value="$0" color="#10b981" />
      </div>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16 }}>Payout Method</h3>
          <button className="btn btn-ghost btn-sm">Edit</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px", background: "#f8fafc", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
          <DollarSign size={28} color="var(--text-muted)" />
          <div>
            <p className="font-semibold">Payoneer Linked Account</p>
            <p className="text-sm text-muted">{workerData.email}</p>
          </div>
          <span className="badge badge-green" style={{ marginLeft: "auto" }}>Verified</span>
        </div>
        <button id="request-payout" className="btn btn-primary w-full" style={{ justifyContent: "center", marginTop: 20 }} disabled={workerData.earnings.total <= 0}>
           {workerData.earnings.total > 0 ? `Request Payout — $${workerData.earnings.total}` : "No Funds Available to Withdraw"}
        </button>
      </div>
      <div className="card">
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, marginBottom: 16 }}>Transaction History</h3>
        <div className="table-wrapper">
          <table className="table">
            <thead><tr><th>Date</th><th>Description</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {workerData.transactions && workerData.transactions.length > 0 ? (
                workerData.transactions.map((t) => (
                  <tr key={t.date}>
                    <td>{t.date}</td>
                    <td className="text-primary">{t.desc}</td>
                    <td className="text-accent font-semibold">{t.amount}</td>
                    <td><span className="badge badge-green">{t.status}</span></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", color: "var(--text-muted)", padding: "20px" }}>
                    No recent transactions found. Earning processing takes 7-14 days.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ workerData }: { workerData: DashboardData }) {
  const [name, setName] = useState(workerData.name);
  const [phone, setPhone] = useState(workerData.phone);
  const [bio, setBio] = useState(workerData.bio);
  const [resumeUrl, setResumeUrl] = useState(workerData.resumeUrl);
  const [twitterUrl, setTwitterUrl] = useState(workerData.twitterUrl);
  const [skills, setSkills] = useState<string[]>(workerData.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        body: JSON.stringify({ phone, name, bio, resumeUrl, twitterUrl, skills }),
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) alert("Profile updated successfully!");
    } catch (e) {
      alert("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24, flexWrap: "wrap" }}>
          <div className="avatar avatar-lg">{name?.charAt(0)?.toUpperCase() || "U"}</div>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, marginBottom: 4 }}>
              {name}
            </h2>
            <p className="text-sm text-muted">{workerData.country}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <span className={`badge ${workerData.tierClass}`}>
                {workerData.tier} Tier
              </span>
              <span className="badge badge-green">Verified ID</span>
            </div>
          </div>
          <button className="btn btn-ghost btn-sm" style={{ marginLeft: "auto" }}>Edit Profile</button>
        </div>
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
      </div>
      <div className="card">
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, marginBottom: 16 }}>Skills & Expertise</h3>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          {(skills.length > 0 ? skills : ["No skills specified"]).map((skill, i) => (
            <span key={i} className="badge badge-blue">{skill}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input 
            className="form-input" 
            placeholder="E.g. Data Annotation..." 
            value={newSkill} 
            onChange={e => setNewSkill(e.target.value)} 
            onKeyDown={(e) => { if(e.key === 'Enter' && newSkill) { setSkills([...skills, newSkill]); setNewSkill(""); } }}
            style={{ maxWidth: 200 }}
          />
          <button 
            className="btn btn-outline btn-sm" 
            onClick={() => { if(newSkill) { setSkills([...skills, newSkill]); setNewSkill(""); } }}
          >
            + Add Skill
          </button>
        </div>
      </div>
      <div className="card">
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, marginBottom: 16 }}>Account Settings</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" defaultValue={workerData.email} disabled style={{ background: "var(--bg-glass-light)", color: "var(--text-muted)" }} />
          </div>
          <div className="form-group">
            <label className="form-label">Phone (WhatsApp)</label>
            <input className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Bio</label>
            <textarea className="form-input" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="A short description about yourself and your expertise..." />
          </div>
          <div className="form-group">
            <label className="form-label">Resume / Portfolio URL</label>
            <input className="form-input" value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} placeholder="https://..." />
          </div>
          <div className="form-group">
            <label className="form-label">X / Twitter URL</label>
            <input className="form-input" value={twitterUrl} onChange={(e) => setTwitterUrl(e.target.value)} placeholder="https://x.com/..." />
          </div>
          <button id="save-profile" onClick={handleSave} disabled={isSaving} className="btn btn-primary btn-sm" style={{ alignSelf: "flex-start", opacity: isSaving ? 0.7 : 1 }}>
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardClient({ userData }: { userData: DashboardData }) {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}><div className="btn-spinner" style={{ width: 32, height: 32, border: "3px solid rgba(0,0,0,0.08)", borderTopColor: "var(--accent-primary)" }} /></div>}>
      <DashboardContent workerData={userData} />
    </Suspense>
  );
}
