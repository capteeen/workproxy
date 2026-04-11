'use client';

import Link from "next/link";
import { useState } from "react";
import { 
  FolderOpen, Users, Handshake, DollarSign, Scale, CheckCircle, 
  Activity, Home, LogOut, Key, MonitorPlay, ShieldAlert,
  Clock, TrendingUp, ShieldCheck
} from "lucide-react";

const adminStats = [
  { icon: <FolderOpen size={20} />, label: "Active Listings", value: "18", change: "+3 this week", changeColor: "#10b981" },
  { icon: <Users size={20} />, label: "Registered Users", value: "147", change: "+12 today", changeColor: "#0099ff" },
  { icon: <Handshake size={20} />, label: "Active Matches", value: "23", change: "+2 this week", changeColor: "#10b981" },
  { icon: <DollarSign size={20} />, label: "Platform Revenue", value: "$8,460", change: "+$1,200 this month", changeColor: "#00d4aa" },
  { icon: <Scale size={20} />, label: "Open Disputes", value: "2", change: "Within SLA", changeColor: "#f59e0b" },
  { icon: <CheckCircle size={20} />, label: "Payout Rate", value: "97%", change: "3 pending", changeColor: "#10b981" },
];

const pendingListings = [
  { id: "L1", platform: "Outlier AI", owner: "David P.", country: "🇺🇸 US", avgEarning: 1400, submitted: "Apr 10, 2026", proof: "Screenshot", status: "Pending" },
  { id: "L2", platform: "Scale AI", owner: "Anna K.", country: "🇩🇪 DE", avgEarning: 900, submitted: "Apr 9, 2026", proof: "Earnings PDF", status: "Pending" },
  { id: "L3", platform: "Remotasks", owner: "Priya S.", country: "🇬🇧 UK", avgEarning: 500, submitted: "Apr 8, 2026", proof: "Account ID", status: "Pending" },
];

const pendingUsers = [
  { id: "U1", name: "Emeka Eze", role: "Worker", country: "🇳🇬 Nigeria", email: "emeka.eze@gmail.com", id_type: "NIN", submitted: "Apr 10, 2026" },
  { id: "U2", name: "Fatima Bello", role: "Worker", country: "🇳🇬 Nigeria", email: "fatima.bello@yahoo.com", id_type: "Passport", submitted: "Apr 9, 2026" },
  { id: "U3", name: "Robert Chan", role: "Owner", country: "🇨🇦 Canada", email: "robert.chan@email.ca", id_type: "Driver's License", submitted: "Apr 9, 2026" },
];

const activeMatches = [
  { id: "M1", platform: "Outlier AI", worker: "Chukwudi O.", owner: "James T.", startDate: "Mar 1, 2026", earnings: 2240, workerRating: 4.1, status: "Active" },
  { id: "M2", platform: "Appen", worker: "Chukwudi O.", owner: "James T.", startDate: "Apr 1, 2026", earnings: 120, workerRating: "Trial", status: "Trial" },
  { id: "M3", platform: "Scale AI", worker: "Adaeze N.", owner: "Sarah M.", startDate: "Feb 15, 2026", earnings: 3100, workerRating: 4.7, status: "Active" },
];

const openDisputes = [
  { id: "D1", from: "Chukwudi O. (Worker)", against: "James T. (Owner)", reason: "Payout discrepancy — week of Apr 1", opened: "Apr 8, 2026", priority: "Medium" },
  { id: "D2", from: "Adaeze N. (Worker)", against: "System", reason: "Credential access issue after password reset", opened: "Apr 7, 2026", priority: "High" },
];

const pendingPayouts = [
  { id: "P1", user: "Chukwudi Okafor", role: "Worker", method: "Payoneer", amount: 245, requested: "Apr 11, 2026" },
  { id: "P2", user: "Adaeze Nwosu", role: "Worker", method: "Grey", amount: 310, requested: "Apr 11, 2026" },
  { id: "P3", user: "James Thornton", role: "Owner", method: "Wise", amount: 560, requested: "Apr 1, 2026" },
];

const tabs = ["Overview", "Listings", "Users", "Matches", "Disputes", "Payouts"];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [listingStatuses, setListingStatuses] = useState<Record<string, string>>({});
  const [userStatuses, setUserStatuses] = useState<Record<string, string>>({});
  const [payoutStatuses, setPayoutStatuses] = useState<Record<string, string>>({});

  const approveListing = (id: string) => setListingStatuses((s) => ({ ...s, [id]: "Approved" }));
  const rejectListing = (id: string) => setListingStatuses((s) => ({ ...s, [id]: "Rejected" }));
  const approveUser = (id: string) => setUserStatuses((s) => ({ ...s, [id]: "Approved" }));
  const rejectUser = (id: string) => setUserStatuses((s) => ({ ...s, [id]: "Rejected" }));
  const processPayout = (id: string) => setPayoutStatuses((s) => ({ ...s, [id]: "Processed" }));

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
              id={`admin-nav-${tab.toLowerCase()}`}
              className={`sidebar-link ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              <span className="icon">{adminTabIcon(tab)}</span>
              {tab}
              {tab === "Disputes" && openDisputes.length > 0 && (
                <span style={{ marginLeft: "auto", background: "var(--accent-rose)", borderRadius: "var(--radius-full)", padding: "1px 6px", fontSize: 10, fontWeight: 700, color: "#fff" }}>
                  {openDisputes.length}
                </span>
              )}
              {tab === "Payouts" && pendingPayouts.length > 0 && (
                <span style={{ marginLeft: "auto", background: "#f59e0b", borderRadius: "var(--radius-full)", padding: "1px 6px", fontSize: 10, fontWeight: 700, color: "#050c1a" }}>
                  {pendingPayouts.length}
                </span>
              )}
            </button>
          ))}
          <span className="sidebar-section-label" style={{ marginTop: 8 }}>Quick Links</span>
          <Link href="/listings" className="sidebar-link"><span className="icon"><FolderOpen size={16} /></span>All Listings</Link>
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
            <p className="text-sm text-muted">Work Proxy Admin — April 11, 2026</p>
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
                {adminStats.map((s) => (
                  <div key={s.label} className="stat-card">
                    <div className="stat-icon">{s.icon}</div>
                    <div className="stat-value">{s.value}</div>
                    <div className="stat-label">{s.label}</div>
                    <div style={{ fontSize: 12, color: s.changeColor, marginTop: 6 }}>{s.change}</div>
                  </div>
                ))}
              </div>

              <div className="grid-2">
                <div className="card">
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                    <Clock size={16} color="var(--text-muted)" /> Pending Actions
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      { label: "Listings awaiting approval", count: pendingListings.length, color: "#f59e0b", action: "Listings" },
                      { label: "Users awaiting ID review", count: pendingUsers.length, color: "#0099ff", action: "Users" },
                      { label: "Open disputes", count: openDisputes.length, color: "var(--accent-rose)", action: "Disputes" },
                      { label: "Pending payouts", count: pendingPayouts.length, color: "var(--accent-primary)", action: "Payouts" },
                    ].map((item) => (
                      <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                        <span className="text-sm text-secondary">{item.label}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: item.color, fontSize: 18 }}>{item.count}</span>
                          <button className="btn btn-ghost btn-sm" onClick={() => setActiveTab(item.action)}>Review →</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                    <TrendingUp size={16} color="var(--text-muted)" /> Revenue Target
                  </h3>
                  <div style={{ textAlign: "center", marginBottom: 20 }}>
                    <p className="text-muted text-sm">Month 3 MVP Target</p>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 800, color: "var(--accent-primary)" }}>$8,460</p>
                    <p className="text-muted text-sm">of $5,000 goal</p>
                  </div>
                  <div className="progress-bar" style={{ height: 10, marginBottom: 8 }}>
                    <div className="progress-fill" style={{ width: "169%" }} />
                  </div>
                  <p className="text-xs text-accent text-center" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                    <CheckCircle size={12} /> 169% of month 3 target achieved
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
                    {[{ label: "Active Accounts", val: "23" }, { label: "Avg/Account", val: "$368" }, { label: "Disputes Rate", val: "8.7%" }].map((m) => (
                      <div key={m.label} style={{ textAlign: "center" }}>
                        <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--text-primary)" }}>{m.val}</p>
                        <p className="text-xs text-muted">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Listings */}
          {activeTab === "Listings" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>Pending Listing Approvals</h2>
              {pendingListings.map((l) => {
                const st = listingStatuses[l.id];
                return (
                  <div key={l.id} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                    <div>
                      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, display: "flex", alignItems: "center", gap: 6 }}>
                          <MonitorPlay size={16} color="var(--text-secondary)" /> {l.platform}
                        </h3>
                        <span className={`badge ${st ? (st === "Approved" ? "badge-green" : "badge-rose") : "badge-amber"}`}>{st || l.status}</span>
                      </div>
                      <p className="text-sm text-secondary">Owner: <span className="text-primary font-semibold">{l.owner}</span> · {l.country}</p>
                      <p className="text-sm text-secondary">Avg Monthly: <span className="text-accent font-semibold">${l.avgEarning}</span> · Proof: {l.proof}</p>
                      <p className="text-xs text-muted" style={{ marginTop: 4 }}>Submitted: {l.submitted}</p>
                    </div>
                    {!st && (
                      <div style={{ display: "flex", gap: 8 }}>
                        <button id={`view-proof-${l.id}`} className="btn btn-ghost btn-sm">👁 View Proof</button>
                        <button id={`approve-listing-${l.id}`} className="btn btn-outline btn-sm" onClick={() => approveListing(l.id)}>✓ Approve</button>
                        <button className="btn btn-danger btn-sm" onClick={() => rejectListing(l.id)}>✕ Reject</button>
                      </div>
                    )}
                  </div>
                );
              })}
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginTop: 8 }}>All Active Listings</h2>
              <div className="table-wrapper">
                <table className="table">
                  <thead><tr><th>Platform</th><th>Owner</th><th>Avg Monthly</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {[
                      { platform: "Outlier AI", owner: "James T. 🇬🇧", avg: "$1,800", status: "Active" },
                      { platform: "Scale AI", owner: "Sarah M. 🇺🇸", avg: "$1,500", status: "Active" },
                      { platform: "Appen", owner: "James T. 🇬🇧", avg: "$900", status: "Active" },
                    ].map((r) => (
                      <tr key={r.platform + r.owner}>
                        <td className="font-semibold text-primary" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <MonitorPlay size={16} color="var(--text-secondary)" /> {r.platform}
                        </td>
                        <td>{r.owner}</td>
                        <td className="text-accent font-semibold">{r.avg}</td>
                        <td><span className="badge badge-green">{r.status}</span></td>
                        <td><button className="btn btn-ghost btn-sm">Manage</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users */}
          {activeTab === "Users" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>Pending ID Verification</h2>
              {pendingUsers.map((u) => {
                const st = userStatuses[u.id];
                return (
                  <div key={u.id} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                      <div className="avatar avatar-md">{u.name[0]}</div>
                      <div>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15 }}>{u.name}</h3>
                          <span className={`badge ${u.role === "Worker" ? "badge-blue" : "badge-amber"}`}>{u.role}</span>
                          {st && <span className={`badge ${st === "Approved" ? "badge-green" : "badge-rose"}`}>{st}</span>}
                        </div>
                        <p className="text-sm text-muted">{u.email} · {u.country}</p>
                        <p className="text-xs text-muted">ID: {u.id_type} · Submitted: {u.submitted}</p>
                      </div>
                    </div>
                    {!st && (
                      <div style={{ display: "flex", gap: 8 }}>
                        <button id={`view-id-${u.id}`} className="btn btn-ghost btn-sm">👁 View ID</button>
                        <button id={`approve-user-${u.id}`} className="btn btn-outline btn-sm" onClick={() => approveUser(u.id)}>✓ Approve</button>
                        <button className="btn btn-danger btn-sm" onClick={() => rejectUser(u.id)}>✕ Reject</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Matches */}
          {activeTab === "Matches" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>Active Match Engagements</h2>
              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Platform</th><th>Worker</th><th>Owner</th><th>Start</th><th>Earnings</th><th>Rating</th><th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeMatches.map((m) => (
                      <tr key={m.id}>
                        <td className="font-semibold text-primary" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <MonitorPlay size={16} color="var(--text-secondary)" /> {m.platform}
                        </td>
                        <td>🇳🇬 {m.worker}</td>
                        <td>{m.owner}</td>
                        <td className="text-muted">{m.startDate}</td>
                        <td className="text-accent font-semibold">${m.earnings.toLocaleString()}</td>
                        <td>{typeof m.workerRating === "number" ? <span className="stars">{"★".repeat(Math.round(m.workerRating))}{"☆".repeat(5 - Math.round(m.workerRating))} <span className="text-secondary text-xs">{m.workerRating}</span></span> : <span className="badge badge-amber">{m.workerRating}</span>}</td>
                        <td><span className={`badge ${m.status === "Active" ? "badge-green" : "badge-amber"}`}>{m.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Disputes */}
          {activeTab === "Disputes" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>Open Disputes</h2>
              {openDisputes.map((d) => (
                <div key={d.id} className="card" style={{ borderLeft: `3px solid ${d.priority === "High" ? "var(--accent-rose)" : "#f59e0b"}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
                    <div>
                      <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                        <span className={`badge ${d.priority === "High" ? "badge-rose" : "badge-amber"}`} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <ShieldAlert size={12} /> {d.priority} Priority
                        </span>
                        <span className="badge badge-purple">Open</span>
                      </div>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, marginBottom: 4 }}>{d.reason}</h3>
                      <p className="text-sm text-secondary">Filed by: <span className="text-primary">{d.from}</span> against <span className="text-primary">{d.against}</span></p>
                      <p className="text-xs text-muted">Opened: {d.opened}</p>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button id={`review-dispute-${d.id}`} className="btn btn-outline btn-sm">Review Evidence</button>
                      <button className="btn btn-primary btn-sm">Mediate</button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Admin Notes</label>
                    <textarea className="form-input" rows={2} placeholder="Add resolution notes..." style={{ resize: "none" }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Payouts */}
          {activeTab === "Payouts" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="grid-3">
                <div className="stat-card"><div className="stat-icon"><DollarSign size={20} /></div><div className="stat-value">$1,115</div><div className="stat-label">Pending Payout Total</div></div>
                <div className="stat-card"><div className="stat-icon"><CheckCircle size={20} /></div><div className="stat-value">$24,800</div><div className="stat-label">Total Paid Out (MTD)</div></div>
                <div className="stat-card"><div className="stat-icon"><Activity size={20} /></div><div className="stat-value">97%</div><div className="stat-label">On-Time Payout Rate</div></div>
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>Pending Payout Requests</h2>
              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr><th>User</th><th>Role</th><th>Method</th><th>Amount</th><th>Requested</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {pendingPayouts.map((p) => {
                      const processed = payoutStatuses[p.id];
                      return (
                        <tr key={p.id}>
                          <td className="font-semibold text-primary">{p.user}</td>
                          <td><span className={`badge ${p.role === "Worker" ? "badge-blue" : "badge-amber"}`}>{p.role}</span></td>
                          <td className="text-secondary">{p.method}</td>
                          <td className="text-accent font-bold">${p.amount}</td>
                          <td className="text-muted">{p.requested}</td>
                          <td>
                            {processed
                              ? <span className="badge badge-green">✓ Processed</span>
                              : (
                                <div style={{ display: "flex", gap: 6 }}>
                                  <button id={`process-payout-${p.id}`} className="btn btn-primary btn-sm" onClick={() => processPayout(p.id)}>Process</button>
                                  <button className="btn btn-ghost btn-sm">Hold</button>
                                </div>
                              )
                            }
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
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
      `}</style>
    </div>
  );
}

function adminTabIcon(tab: string) {
  switch (tab) {
    case "Overview": return <Activity size={16} />;
    case "Listings": return <FolderOpen size={16} />;
    case "Users": return <Users size={16} />;
    case "Matches": return <Handshake size={16} />;
    case "Disputes": return <Scale size={16} />;
    case "Payouts": return <DollarSign size={16} />;
    default: return <Activity size={16} />;
  }
}
