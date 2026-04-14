'use client';

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Rocket, MonitorPlay, User, AlertTriangle, X } from "lucide-react";

const allListings = [
  {
    id: "1", platform: "Outlier AI", taskType: "AI Training, Creative Writing, Coding",
    avgMonthly: 1800, ownerCut: 27, workerCut: 13, status: "Available",
    accountAge: "14 months", owner: "James T.", ownerCountry: "🇬🇧 UK",
    color: "#00d4aa", trial: true, trialDays: 14,
    description: "AI training and creative writing tasks. Strong English required. Account in good standing with Outlier for 14 months.",
    tags: ["Writing", "AI Training", "Coding"],
  },
  {
    id: "4", platform: "OneForma", taskType: "Transcription, Translation, Annotation",
    avgMonthly: 600, ownerCut: 30, workerCut: 10, status: "Available",
    accountAge: "6 months", owner: "Emily R.", ownerCountry: "🇨🇦 CA",
    color: "#f59e0b", trial: true, trialDays: 7,
    description: "Mix of transcription and translation tasks. Good for beginners. Lower earning potential but stable.",
    tags: ["Transcription", "Translation", "Text"],
  },
];

const platforms = ["All Platforms", "Outlier AI", "OneForma"];
const statuses = ["All Statuses", "Available", "Trial Period", "Under Management"];

export default function ListingsPage() {
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("All Platforms");
  const [status, setStatus] = useState("All Statuses");
  const [sortBy, setSortBy] = useState("earning");
  const [selected, setSelected] = useState<typeof allListings[0] | null>(null);

  const filtered = allListings
    .filter((l) => {
      const matchPlatform = platform === "All Platforms" || l.platform === platform;
      const matchStatus = status === "All Statuses" || l.status === status;
      const matchSearch = !search || l.platform.toLowerCase().includes(search.toLowerCase()) || l.taskType.toLowerCase().includes(search.toLowerCase());
      return matchPlatform && matchStatus && matchSearch;
    })
    .sort((a, b) => sortBy === "earning" ? b.avgMonthly - a.avgMonthly : a.platform.localeCompare(b.platform));

  return (
    <>
      <Navbar />
      <div className="listings-page">
        {/* Header */}
        <div className="listings-header">
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
              <div>
                <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
                  Browse Account Listings
                </h1>
                <p className="text-secondary">
                  {filtered.length} accounts available — apply to start earning from geo-restricted platforms
                </p>
              </div>
              <Link href="/workers/apply" className="btn btn-primary">
                <Rocket size={16} /> Create Worker Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="container">
          {/* Filters */}
          <div className="listings-filters">
            <input
              id="search-listings"
              className="form-input"
              placeholder="🔍 Search platform or task type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: 280 }}
            />
            <select id="filter-platform" className="form-select" value={platform} onChange={(e) => setPlatform(e.target.value)} style={{ maxWidth: 200 }}>
              {platforms.map((p) => <option key={p}>{p}</option>)}
            </select>
            <select id="filter-status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)} style={{ maxWidth: 180 }}>
              {statuses.map((s) => <option key={s}>{s}</option>)}
            </select>
            <select id="sort-by" className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ maxWidth: 180 }}>
              <option value="earning">Sort: Highest Earning</option>
              <option value="name">Sort: Platform Name</option>
            </select>
          </div>

          {/* Listings Grid */}
          <div className="listings-grid">
            {filtered.map((listing) => (
              <div
                key={listing.id}
                id={`listing-${listing.id}`}
                className="listing-card"
                onClick={() => setSelected(listing)}
                style={{ cursor: "pointer" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "#f8fafc", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MonitorPlay size={22} color="var(--text-secondary)" />
              </div>
                  <span className={`badge ${listing.status === "Available" ? "badge-green" : listing.status === "Trial Period" ? "badge-amber" : "badge-blue"}`}>
                    {listing.status}
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 4 }}>{listing.platform}</h3>
                <p className="text-sm text-secondary" style={{ marginBottom: 12, lineHeight: 1.6 }}>{listing.taskType}</p>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                  {listing.tags.map((tag) => <span key={tag} className="badge badge-blue" style={{ fontSize: 11 }}>{tag}</span>)}
                </div>

                <div className="listing-card-stats">
                  <div>
                    <p className="text-xs text-muted">Task Volume</p>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: listing.color, fontSize: 18 }}>High</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">Worker Tier</p>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#0099ff", fontSize: 18 }}>Elite</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">Security</p>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#f59e0b", fontSize: 18 }}>Escrow</p>
                  </div>
                </div>

                <div className="divider" style={{ margin: "14px 0" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <User size={12} color="var(--text-muted)" />
                    <span className="text-xs text-muted">{listing.owner} · {listing.ownerCountry}</span>
                  </div>
                  {listing.trial && (
                    <span className="badge badge-purple" style={{ fontSize: 11 }}>{listing.trialDays}d trial</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {selected && (
          <div className="modal-overlay" onClick={() => setSelected(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelected(null)}><X size={14} /></button>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20 }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: "#f8fafc", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MonitorPlay size={26} color="var(--text-secondary)" />
                </div>
                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 4 }}>{selected.platform}</h2>
                  <p className="text-sm text-muted">{selected.taskType}</p>
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <span className={`badge ${selected.status === "Available" ? "badge-green" : "badge-amber"}`}>{selected.status}</span>
                    {selected.trial && <span className="badge badge-purple">{selected.trialDays}-day trial required</span>}
                  </div>
                </div>
              </div>
              <p className="text-secondary" style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>{selected.description}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
                <div className="modal-stat">
                  <p className="text-xs text-muted">Task Volume</p>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: selected.color }}>High</p>
                </div>
                <div className="modal-stat">
                  <p className="text-xs text-muted">Worker Tier</p>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "#0099ff" }}>Standard+</p>
                </div>
                <div className="modal-stat">
                  <p className="text-xs text-muted">Account Age</p>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20 }}>{selected.accountAge}</p>
                </div>
              </div>
              <div style={{ background: "#fefce8", border: "1px solid #fde68a", borderRadius: "var(--radius-md)", padding: 14, marginBottom: 20 }}>
                <p className="text-xs" style={{ marginBottom: 6, color: "#92400e", display: "flex", alignItems: "center", gap: 6 }}>
                  <AlertTriangle size={12} /> Important Notes
                </p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                  <li className="text-sm text-secondary">• Work Proxy takes 50% before any split</li>
                  <li className="text-sm text-secondary">• Digital contract must be signed before credential access</li>
                  <li className="text-sm text-secondary">• Use AnyDesk for remote access to avoid account flags</li>
                  {selected.trial && <li className="text-sm text-secondary">• {selected.trialDays}-day trial at lower rate before confirmed engagement</li>}
                </ul>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <Link href="/workers/apply" id={`apply-${selected.id}`} className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                  Apply for This Account →
                </Link>
                <button className="btn btn-ghost" onClick={() => setSelected(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .listings-page { padding-bottom: 80px; }
        .listings-header {
          background: #ffffff;
          border-bottom: 1px solid var(--border);
          padding: 52px 0 36px;
          margin-bottom: 32px;
        }
        .listings-filters {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 28px;
          align-items: center;
        }
        .listings-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 1024px) { .listings-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .listings-grid { grid-template-columns: 1fr; } }
        .listing-card-stats {
          display: flex;
          justify-content: space-between;
          background: #f8fafc;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 12px 16px;
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fadeIn 0.2s ease;
        }
        .modal-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 36px;
          max-width: 560px;
          width: 100%;
          position: relative;
          animation: fadeInUp 0.25s ease;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 24px 64px rgba(0,0,0,0.12);
        }
        .modal-close {
          position: absolute;
          top: 16px; right: 16px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-muted);
          font-size: 14px;
          transition: all var(--transition);
        }
        .modal-close:hover { color: var(--text-primary); border-color: var(--border-accent); }
        .modal-stat {
          background: #f8fafc;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 14px;
          text-align: center;
        }
      `}</style>
    </>
  );
}
