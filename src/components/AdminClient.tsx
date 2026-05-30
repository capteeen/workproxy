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
  blogPosts: any[];
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
  const tabs = ["Overview", "Worker Apps", "Listings", "Manual Listing", "Users", "Blog Posts"];

  const [activeTab, setActiveTab] = useState("Overview");
  const [loading, setLoading] = useState<string | null>(null);
  const [selectedListing, setSelectedListing] = useState<any | null>(null);

  const [form, setForm] = useState({
    userEmail: "",
    platform: "",
    avgEarning: "",
    ownerSplit: "35",
  });

  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    content: "",
    imageUrl: "",
    published: true,
  });

  const handleManualCreate = async () => {
    setLoading('manual');
    try {
      const res = await fetch('/api/admin/create-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        alert("Listing created successfully!");
        window.location.reload();
      } else {
        const d = await res.json();
        alert(d.error || "Failed to create");
      }
    } catch (e) {
      alert("Error");
    } finally {
      setLoading(null);
    }
  };

  const handleCreateBlogPost = async () => {
    setLoading('blog');
    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogForm)
      });
      if (res.ok) {
        alert("Blog post created successfully!");
        window.location.reload();
      } else {
        const d = await res.json();
        alert(d.error || "Failed to create post");
      }
    } catch (e) {
      alert("Error creating post");
    } finally {
      setLoading(null);
    }
  };

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
            <img src="/logo.jpg" alt="Logo" style={{ width: 24, height: 24, borderRadius: 4, objectFit: 'cover' }} />
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
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {adminData.pendingListings.length === 0 && <p className="text-muted">No pending listings.</p>}
              {adminData.pendingListings.map((l) => (
                <div
                  key={l.id}
                  className="listing-row-card"
                  onClick={() => setSelectedListing(l)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 0 }}>
                    <div className="listing-avatar">{l.platform?.[0] ?? "?"}</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{l.platform}</div>
                      <div className="text-sm text-secondary" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        <span>Earning: <b>${l.avgEarning}</b></span>
                        <span>Split: <b>{l.ownerSplit}%</b></span>
                        <span>Age: <b>{l.accountAge}</b></span>
                        {l.owner && <span style={{ color: "var(--accent-primary)" }}>👤 {l.owner.name || l.owner.email}</span>}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                    <button className="btn btn-outline btn-sm" onClick={() => handleAction('listing', l.id, 'APPROVED')} disabled={!!loading}>Approve</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleAction('listing', l.id, 'REJECTED')} disabled={!!loading}>Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Listing Detail Modal */}
          {selectedListing && (
            <div className="listing-modal-overlay" onClick={() => setSelectedListing(null)}>
              <div className="listing-modal" onClick={e => e.stopPropagation()}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                  <div>
                    <div className="listing-modal-platform">{selectedListing.platform}</div>
                    <span className="badge badge-amber" style={{ marginTop: 6 }}>Pending Review</span>
                  </div>
                  <button onClick={() => setSelectedListing(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "var(--text-muted)", lineHeight: 1 }}>✕</button>
                </div>

                <div className="listing-detail-grid">
                  {/* Owner Info */}
                  <div className="listing-detail-section">
                    <div className="listing-detail-section-title">👤 Account Owner</div>
                    <div className="listing-detail-row"><span>Name</span><b>{selectedListing.owner?.name || "—"}</b></div>
                    <div className="listing-detail-row"><span>Email</span><b>{selectedListing.owner?.email || "—"}</b></div>
                    <div className="listing-detail-row"><span>WhatsApp</span><b>{selectedListing.owner?.phone ? <a href={`https://wa.me/${selectedListing.owner.phone.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" style={{ color: "#25D366" }}>{selectedListing.owner.phone}</a> : "—"}</b></div>
                    <div className="listing-detail-row"><span>Member Since</span><b>{selectedListing.owner?.createdAt ? new Date(selectedListing.owner.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—"}</b></div>
                    <div className="listing-detail-row"><span>Owner ID</span><code style={{ fontSize: 11 }}>{selectedListing.ownerId}</code></div>
                  </div>

                  {/* Listing Info */}
                  <div className="listing-detail-section">
                    <div className="listing-detail-section-title">📋 Listing Details</div>
                    <div className="listing-detail-row"><span>Platform</span><b>{selectedListing.platform}</b></div>
                    <div className="listing-detail-row"><span>Avg Earning</span><b style={{ color: "var(--accent-emerald)" }}>${selectedListing.avgEarning}/mo</b></div>
                    <div className="listing-detail-row"><span>Owner Split</span><b>{selectedListing.ownerSplit}%</b></div>
                    <div className="listing-detail-row"><span>Account Age</span><b>{selectedListing.accountAge}</b></div>
                    <div className="listing-detail-row"><span>Availability</span><b>{selectedListing.availability}</b></div>
                    <div className="listing-detail-row"><span>Requires Trial</span><b>{selectedListing.requireTrial ? `Yes — ${selectedListing.trialDays} days` : "No"}</b></div>
                  </div>
                </div>

                {/* Task types */}
                {selectedListing.taskTypes?.length > 0 && (
                  <div style={{ marginTop: 20 }}>
                    <div className="listing-detail-section-title" style={{ marginBottom: 10 }}>🏷️ Task Types</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {selectedListing.taskTypes.map((t: string) => (
                        <span key={t} className="badge badge-purple">{t}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                {selectedListing.description && (
                  <div style={{ marginTop: 20 }}>
                    <div className="listing-detail-section-title" style={{ marginBottom: 8 }}>📝 Description</div>
                    <p className="text-sm text-secondary" style={{ lineHeight: 1.7, background: "#f8fafc", padding: "12px 16px", borderRadius: 8 }}>{selectedListing.description}</p>
                  </div>
                )}

                {/* Proof URL */}
                {selectedListing.proofUrl && (
                  <div style={{ marginTop: 16 }}>
                    <div className="listing-detail-section-title" style={{ marginBottom: 6 }}>🔗 Proof URL</div>
                    <a href={selectedListing.proofUrl} target="_blank" rel="noopener noreferrer" className="text-sm" style={{ color: "var(--accent-primary)", wordBreak: "break-all" }}>{selectedListing.proofUrl}</a>
                  </div>
                )}

                <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border)", display: "flex", gap: 10, justifyContent: "flex-end" }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => setSelectedListing(null)}>Close</button>
                  <button className="btn btn-danger btn-sm" disabled={!!loading} onClick={() => { handleAction('listing', selectedListing.id, 'REJECTED'); setSelectedListing(null); }}>Reject</button>
                  <button className="btn btn-primary btn-sm" disabled={!!loading} onClick={() => { handleAction('listing', selectedListing.id, 'APPROVED'); setSelectedListing(null); }}>✓ Approve</button>
                </div>
              </div>
            </div>
          )}

          {/* Manual Listing */}
          {activeTab === "Manual Listing" && (
            <div className="card" style={{ maxWidth: 600 }}>
              <h3 style={{ marginBottom: 20 }}>Create Manual Listing</h3>
              <div className="form-group" style={{ marginBottom: 16 }}>
                <label className="form-label" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Owner Email *</label>
                <input className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} placeholder="User email already in DB" value={form.userEmail} onChange={e => setForm({...form, userEmail: e.target.value})} />
              </div>
              <div className="form-group" style={{ marginBottom: 16 }}>
                <label className="form-label" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Platform *</label>
                <input className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} placeholder="e.g. Outlier AI" value={form.platform} onChange={e => setForm({...form, platform: e.target.value})} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div className="form-group">
                  <label className="form-label" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Avg Earning ($) *</label>
                  <input className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} type="number" value={form.avgEarning} onChange={e => setForm({...form, avgEarning: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Owner Split (%)</label>
                  <input className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} type="number" value={form.ownerSplit} onChange={e => setForm({...form, ownerSplit: e.target.value})} />
                </div>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', padding: '12px', justifyContent: 'center' }} disabled={loading === 'manual'} onClick={handleManualCreate}>
                {loading === 'manual' ? 'Creating...' : 'Create and Approve Listing ✨'}
              </button>
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

          {/* Blog Posts */}
          {activeTab === "Blog Posts" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div className="card" style={{ maxWidth: 800 }}>
                <h3 style={{ marginBottom: 20 }}>Create New Blog Post</h3>
                <div className="form-group" style={{ marginBottom: 16 }}>
                  <label className="form-label" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Title *</label>
                  <input className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} placeholder="Post Title" value={blogForm.title} onChange={e => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                    setBlogForm({...blogForm, title, slug});
                  }} />
                </div>
                <div className="form-group" style={{ marginBottom: 16 }}>
                  <label className="form-label" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Slug *</label>
                  <input className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} placeholder="post-slug" value={blogForm.slug} onChange={e => setBlogForm({...blogForm, slug: e.target.value})} />
                </div>
                <div className="form-group" style={{ marginBottom: 16 }}>
                  <label className="form-label" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Image URL</label>
                  <input className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }} placeholder="https://..." value={blogForm.imageUrl} onChange={e => setBlogForm({...blogForm, imageUrl: e.target.value})} />
                </div>
                <div className="form-group" style={{ marginBottom: 16 }}>
                  <label className="form-label" style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Content (Markdown supported) *</label>
                  <textarea className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', minHeight: '200px', resize: 'vertical' }} placeholder="Write your content here..." value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} />
                </div>
                <div className="form-group" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="checkbox" id="published" checked={blogForm.published} onChange={e => setBlogForm({...blogForm, published: e.target.checked})} />
                  <label htmlFor="published" className="form-label" style={{ fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Publish Immediately</label>
                </div>
                <button className="btn btn-primary" style={{ width: '100%', padding: '12px', justifyContent: 'center' }} disabled={loading === 'blog'} onClick={handleCreateBlogPost}>
                  {loading === 'blog' ? 'Publishing...' : 'Publish Blog Post 📝'}
                </button>
              </div>

              <div className="card">
                <h3 style={{ marginBottom: 20 }}>Existing Posts</h3>
                <div className="table-wrapper">
                  <table className="table" style={{ width: '100%', textAlign: 'left' }}>
                    <thead><tr><th style={{ padding: '12px' }}>Title</th><th style={{ padding: '12px' }}>Slug</th><th style={{ padding: '12px' }}>Status</th><th style={{ padding: '12px' }}>Date</th></tr></thead>
                    <tbody>
                      {adminData.blogPosts?.length === 0 ? (
                        <tr><td colSpan={4} style={{ padding: '12px', textAlign: 'center' }} className="text-muted">No blog posts yet.</td></tr>
                      ) : (
                        adminData.blogPosts?.map((p: any) => (
                          <tr key={p.id}>
                            <td className="font-semibold" style={{ padding: '12px' }}>{p.title}</td>
                            <td style={{ padding: '12px' }}>{p.slug}</td>
                            <td style={{ padding: '12px' }}>
                              <span className={`badge ${p.published ? 'badge-green' : 'badge-amber'}`}>
                                {p.published ? 'Published' : 'Draft'}
                              </span>
                            </td>
                            <td style={{ padding: '12px' }}>{new Date(p.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <style>{`
        .listing-row-card { display: flex; align-items: center; justify-content: space-between; gap: 16px; background: #fff; border: 1.5px solid var(--border); border-radius: 12px; padding: 16px 20px; cursor: pointer; transition: border-color 0.15s, box-shadow 0.15s; }
        .listing-row-card:hover { border-color: var(--accent-primary); box-shadow: 0 4px 16px rgba(37,99,235,0.08); }
        .listing-avatar { width: 42px; height: 42px; border-radius: 10px; background: var(--accent-primary); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 18px; flex-shrink: 0; }
        .listing-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .listing-modal { background: #fff; border-radius: 16px; padding: 32px; max-width: 680px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 24px 80px rgba(0,0,0,0.18); }
        .listing-modal-platform { font-family: var(--font-display); font-size: 22px; font-weight: 800; }
        .listing-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 8px; }
        @media (max-width: 600px) { .listing-detail-grid { grid-template-columns: 1fr; } }
        .listing-detail-section { background: #f8fafc; border-radius: 10px; padding: 16px; }
        .listing-detail-section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); margin-bottom: 12px; }
        .listing-detail-row { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; padding: 6px 0; border-bottom: 1px solid var(--border); font-size: 13px; }
        .listing-detail-row:last-child { border-bottom: none; }
        .listing-detail-row span { color: var(--text-secondary); }
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
