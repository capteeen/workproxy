'use client';

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Rocket, MonitorPlay, User, AlertTriangle, X } from "lucide-react";

export type Listing = {
  id: string;
  platform: string;
  avgEarning: number;
  ownerSplit: number;
  status: string;
  ownerName: string;
  createdAt: string;
};

export default function ListingsClient({ initialListings }: { initialListings: Listing[] }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(false);

  const filtered = initialListings.filter(l => 
    l.platform.toLowerCase().includes(search.toLowerCase())
  );

  const handleApply = async (listingId: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/match/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId })
      });
      const data = await res.json();
      if (res.ok) {
        alert("Application submitted! The account owner has been notified.");
        setSelected(null);
      } else {
        alert(data.error || "Failed to apply");
      }
    } catch (e) {
      alert("Error submitting application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="listings-page">
        <div className="listings-header">
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
              <div>
                <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
                  Marketplace
                </h1>
                <p className="text-secondary">
                  {filtered.length} approved accounts available for management.
                </p>
              </div>
              <Link href="/workers/apply" className="btn btn-primary">
                <Rocket size={16} /> Update Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="listings-filters">
            <input
              id="search-listings"
              className="form-input"
              placeholder="🔍 Search platform..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: 280 }}
            />
          </div>

          <div className="listings-grid">
            {filtered.map((listing) => (
              <div
                key={listing.id}
                className="listing-card"
                onClick={() => setSelected(listing)}
                style={{ cursor: "pointer" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div className="icon-box">
                    <MonitorPlay size={22} color="var(--text-secondary)" />
                  </div>
                  <span className="badge badge-green">Approved</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 4 }}>{listing.platform}</h3>
                <p className="text-sm text-secondary" style={{ marginBottom: 12 }}>Avg. Earning: ${listing.avgEarning}/mo</p>

                <div className="listing-card-stats">
                  <div>
                    <p className="text-xs text-muted">Owner Split</p>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--accent-primary)", fontSize: 18 }}>{listing.ownerSplit}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">Your Cut</p>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#10b981", fontSize: 18 }}>{100 - listing.ownerSplit}%</p>
                  </div>
                </div>

                <div className="divider" style={{ margin: "14px 0" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <User size={12} color="var(--text-muted)" />
                    <span className="text-xs text-muted">Owner: {listing.ownerName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && <div style={{ textAlign: "center", padding: "60px 0" }}><p className="text-muted">No accounts matching your search.</p></div>}
        </div>

        {selected && (
          <div className="modal-overlay" onClick={() => setSelected(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelected(null)}><X size={14} /></button>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20 }}>
                <div className="icon-box-lg">
                  <MonitorPlay size={26} color="var(--text-secondary)" />
                </div>
                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 4 }}>{selected.platform}</h2>
                  <p className="text-sm text-muted">Verified Account Listing</p>
                </div>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
                <div className="modal-stat">
                  <p className="text-xs text-muted">Avg Monthly Earning</p>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--accent-primary)" }}>${selected.avgEarning}</p>
                </div>
                <div className="modal-stat">
                  <p className="text-xs text-muted">Owner's Share</p>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20 }}>{selected.ownerSplit}%</p>
                </div>
              </div>

              <div style={{ background: "#fefce8", border: "1px solid #fde68a", borderRadius: "var(--radius-md)", padding: 14, marginBottom: 20 }}>
                <p className="text-xs" style={{ marginBottom: 6, color: "#92400e", display: "flex", alignItems: "center", gap: 6 }}>
                  <AlertTriangle size={12} /> Working Terms
                </p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                  <li className="text-sm text-secondary">• 50/50 Split is standard on Work Proxy</li>
                  <li className="text-sm text-secondary">• Payment is processed through the platform</li>
                  <li className="text-sm text-secondary">• You must use a VPN if required by the owner</li>
                </ul>
              </div>

              <button 
                className="btn btn-primary" 
                style={{ width: "100%", justifyContent: "center" }}
                disabled={loading}
                onClick={() => handleApply(selected.id)}
              >
                {loading ? "Submitting..." : "Apply to Manage this Account →"}
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .listings-page { padding-bottom: 80px; min-height: 100vh; background: #fcfcfc; }
        .listings-header { background: #fff; border-bottom: 1px solid var(--border); padding: 52px 0 36px; margin-bottom: 32px; }
        .listings-filters { display: flex; gap: 12px; margin-bottom: 28px; }
        .listings-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
        .listing-card { background: #fff; border: 1px solid var(--border); border-radius: 16px; padding: 24px; transition: all 0.2s; }
        .listing-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.05); }
        .icon-box { width: 48px; height: 48px; border-radius: 12px; background: #f8fafc; border: 1px solid var(--border); display: flex; alignItems: center; justifyContent: center; }
        .icon-box-lg { width: 56px; height: 56px; border-radius: 14px; background: #f8fafc; border: 1px solid var(--border); display: flex; alignItems: center; justifyContent: center; }
        .listing-card-stats { display: flex; justify-content: space-between; background: #f8fafc; border-radius: 12px; padding: 12px 16px; margin-top: 12px; }
        .badge { padding: 4px 10px; border-radius: 99px; font-size: 11px; font-weight: 700; }
        .badge-green { background: #dcfce7; color: #166534; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 24px; }
        .modal-card { background: #fff; border-radius: 20px; padding: 32px; max-width: 500px; width: 100%; position: relative; box-shadow: 0 32px 64px rgba(0,0,0,0.15); }
        .modal-stat { background: #f8fafc; border: 1px solid var(--border); border-radius: 12px; padding: 16px; text-align: center; }
        .divider { height: 1px; background: var(--border); }
      `}</style>
    </>
  );
}
