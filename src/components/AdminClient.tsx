'use client';

import Link from "next/link";
import { useState } from "react";
import { 
  FolderOpen, Users, Handshake, DollarSign, Scale, CheckCircle, 
  Activity, Home, LogOut, Key, MonitorPlay, ShieldAlert,
  Clock, TrendingUp, ShieldCheck, ClipboardList
} from "lucide-react";

export type AdminData = {
  stats: {
    activeListings: number;
    registeredUsers: number;
    activeMatches: number;
    revenue: string;
    payoutRate: string;
  };
  pendingWorkerApps: any[];
  pendingListings: any[];
  users: any[];
};

function adminTabIcon(tab: string) {
  switch (tab) {
    case "Overview": return <Activity size={16} />;
    case "Worker Apps": return <ClipboardList size={16} />;
    case "Listings": return <FolderOpen size={16} />;
    case "Users": return <Users size={16} />;
    case "Matches": return <Handshake size={16} />;
    case "Disputes": return <Scale size={16} />;
    case "Payouts": return <DollarSign size={16} />;
    default: return <Activity size={16} />;
  }
}

export default function AdminClient({ adminData }: { adminData: AdminData }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [loading, setLoading] = useState<string | null>(null);

  const tabs = ["Overview", "Worker Apps", "Listings", "Users"];

  const handleAction = async (type: 'worker' | 'listing', id: string, status: 'APPROVED' | 'REJECTED') => {
    setLoading(id);
    try {
      const res = await fetch('/api/admin/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, status })
      });
      if (res.ok) {
        window.location.reload(); // Simple refresh for now
      } else {
        alert("Action failed");
      }
    } catch (e) {
      alert("Error taking action");
    } finally {
      setLoading(null);
    }
  };

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
          <div className="avatar avatar-md" style={{ background: "linear-gradient(135deg, #f59e0b, #f43f5e)", color: "#050c1a" }}>A</div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600 }}>Admin Panel</p>
            <span className="badge badge-amber" style={{ fontSize: 10, padding: "2px 8px", display: "flex", alignItems: "center", gap: 4 }}>
              <ShieldCheck size={10} /> Administrator
            </span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <span className="sidebar-section-label">Admin Navigation</span>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`sidebar-link ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              <span className="icon">{adminTabIcon(tab)}</span>
              {tab}
            </button>
          ))}
          <span className="sidebar-section-label" style={{ marginTop: 8 }}>Quick Links</span>
          <Link href="/" className="sidebar-link"><span className="icon"><Home size={16} /></span>Homepage</Link>
          <Link href="/auth/login" className="sidebar-link" style={{ color: "var(--accent-rose)" }}><span className="icon"><LogOut size={16} /></span>Sign Out</Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="dash-main">
        <header className="dash-topbar">
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, display: "flex", alignItems: "center", gap: 10 }}>
              {adminTabIcon(activeTab)} {activeTab}
            </h1>
            <p className="text-sm text-muted">Real-time Platform Management</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="badge badge-green">● System Healthy</span>
            <div className="avatar avatar-sm" style={{ background: "linear-gradient(135deg, #f59e0b, #f43f5e)", color: "#050c1a" }}>A</div>
          </div>
        </header>

        <div className="dash-content">
          {/* Overview */}
          {activeTab === "Overview" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div className="grid-3">
                <div className="stat-card">
                   <div className="stat-icon"><FolderOpen size={20} /></div>
                   <div className="stat-value">{adminData.stats.activeListings}</div>
                   <div className="stat-label">Active Listings</div>
                </div>
                <div className="stat-card">
                   <div className="stat-icon"><Users size={20} /></div>
                   <div className="stat-value">{adminData.stats.registeredUsers}</div>
                   <div className="stat-label">Registered Users</div>
                </div>
                <div className="stat-card">
                   <div className="stat-icon"><Handshake size={20} /></div>
                   <div className="stat-value">{adminData.stats.activeMatches}</div>
                   <div className="stat-label">Active Matches</div>
                </div>
              </div>

              <div className="card">
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, marginBottom: 16 }}>Pending Review</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                    <span className="text-sm text-secondary">Worker Applications</span>
                    <span style={{ fontWeight: 700, color: "#10b981" }}>{adminData.pendingWorkerApps.length}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                    <span className="text-sm text-secondary">Account Listings</span>
                    <span style={{ fontWeight: 700, color: "#f59e0b" }}>{adminData.pendingListings.length}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Worker Apps */}
          {activeTab === "Worker Apps" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {adminData.pendingWorkerApps.length === 0 && <p className="text-muted">No pending applications.</p>}
              {adminData.pendingWorkerApps.map((w) => (
                <div key={w.id} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16 }}>{w.firstName} {w.lastName}</h3>
                    <p className="text-sm text-secondary">{w.email} · {w.country}</p>
                    <p className="text-sm text-secondary" style={{ marginTop: 8 }}>
                      <span className="font-semibold">Expertise:</span> {w.expertise}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn-outline btn-sm" onClick={() => handleAction('worker', w.id, 'APPROVED')} disabled={!!loading}>Approve</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleAction('worker', w.id, 'REJECTED')} disabled={!!loading}>Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Listings */}
          {activeTab === "Listings" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {adminData.pendingListings.length === 0 && <p className="text-muted">No pending listings.</p>}
              {adminData.pendingListings.map((l) => (
                <div key={l.id} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16 }}>{l.platform}</h3>
                    <p className="text-sm text-secondary">Earning: ${l.avgEarning} · Split: {l.ownerSplit}%</p>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn-outline btn-sm" onClick={() => handleAction('listing', l.id, 'APPROVED')} disabled={!!loading}>Approve</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleAction('listing', l.id, 'REJECTED')} disabled={!!loading}>Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Users */}
          {activeTab === "Users" && (
            <div className="table-wrapper">
              <table className="table">
                <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr></thead>
                <tbody>
                  {adminData.users.map((u) => (
                    <tr key={u.id}>
                      <td className="font-semibold">{u.name || "N/A"}</td>
                      <td>{u.email}</td>
                      <td><span className={`badge ${u.role === 'admin' ? 'badge-rose' : 'badge-blue'}`}>{u.role}</span></td>
                      <td><span className="badge badge-green">Active</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <style>{`
        .dash-layout { display: flex; min-height: 100vh; background: var(--bg-primary); }
        .dash-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
        .dash-topbar { display: flex; align-items: center; justify-content: space-between; padding: 20px 32px; border-bottom: 1px solid var(--border); background: #ffffff; }
        .dash-content { padding: 32px; }
        .sidebar { width: 260px; border-right: 1px solid var(--border); background: #fff; }
        .sidebar-logo { padding: 24px; border-bottom: 1px solid var(--border); }
        .sidebar-user { display: flex; align-items: center; gap: 10px; padding: 20px; border-bottom: 1px solid var(--border); }
        .sidebar-nav { padding: 20px; display: flex; flex-direction: column; gap: 4px; }
        .sidebar-link { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; font-size: 14px; background: none; border: none; text-align: left; cursor: pointer; color: var(--text-secondary); width: 100%; transition: all 0.2s; }
        .sidebar-link.active { background: var(--bg-glass-light); color: var(--accent-primary); font-weight: 600; }
        .sidebar-link:hover { background: #f8fafc; color: var(--text-primary); }
        .sidebar-section-label { font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 700; margin: 16px 0 8px 12px; }
        .icon { opacity: 0.7; }
        .stat-card { background: #fff; padding: 24px; border-radius: 16px; border: 1px solid var(--border); flex: 1; }
        .stat-value { font-size: 28px; font-weight: 800; margin: 8px 0 4px; color: var(--text-primary); }
        .stat-label { font-size: 13px; color: var(--text-muted); }
        .card { background: #fff; padding: 24px; border-radius: 16px; border: 1px solid var(--border); box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 24px; }
        .badge { padding: 4px 10px; border-radius: 99px; font-size: 11px; font-weight: 700; }
        .badge-amber { background: #fef3c7; color: #92400e; }
        .badge-green { background: #dcfce7; color: #166534; }
        .badge-rose { background: #ffe4e6; color: #9f1239; }
        .badge-blue { background: #dbeafe; color: #1e40af; }
      `}</style>
    </div>
  );
}
