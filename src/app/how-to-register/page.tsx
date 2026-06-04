'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, ImageOff, Image } from "lucide-react";

export default function HowToRegisterPage() {
  const [showLogo, setShowLogo] = useState(true);

  const handleDownload = () => {
    window.print();
  };

  return (
    <>
      {/* ── Screen-only toolbar ── */}
      <div className="toolbar no-print">
        <Link href="/" className="back-link">
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <div className="toolbar-right">
          <button
            className={`logo-toggle ${showLogo ? "active" : ""}`}
            onClick={() => setShowLogo(!showLogo)}
          >
            {showLogo ? <Image size={14} /> : <ImageOff size={14} />}
            {showLogo ? "Logo: On" : "Logo: Off"}
          </button>
          <button className="dl-btn" onClick={handleDownload}>
            <Download size={14} /> Download PDF
          </button>
        </div>
      </div>

      {/* ── Document ── */}
      <div className="doc-wrap">
        <div className="doc">

          {/* Header */}
          <div className="doc-header">
            {showLogo && (
              <div className="doc-logo">
                <img src="/logo.jpg" alt="Work Proxy" />
                <span>Work Proxy</span>
              </div>
            )}
            <div className="doc-title-block">
              <h1>Outlier Registration Requirements</h1>
              <p className="doc-subtitle">
                Everything you need to have ready before you can start working on Outlier AI.
                Read through each section carefully — having these items prepared
                makes the registration process take under five minutes.
              </p>
            </div>
            <div className="doc-divider" />
          </div>

          {/* Step 1 */}
          <div className="section">
            <div className="section-num">01</div>
            <div className="section-body">
              <h2>Dedicated Gmail Account</h2>
              <p>
                You will need a <strong>brand-new Gmail address</strong> — one you are
                completely comfortable sharing with the team managing your account. Do{" "}
                <strong>not</strong> use a personal inbox you rely on for private
                communication.
              </p>
              <ul>
                <li>Go to <strong>gmail.com</strong> and create a new account (e.g. <em>yourname.outlier@gmail.com</em>)</li>
                <li>This account will be used to register and operate your Outlier AI profile</li>
                <li>Keep the login credentials saved somewhere safe — you will need to provide them during onboarding</li>
                <li>Your personal email stays completely private; only this dedicated Gmail is used</li>
              </ul>
            </div>
          </div>

          <div className="rule" />

          {/* Step 2 */}
          <div className="section">
            <div className="section-num">02</div>
            <div className="section-body">
              <h2>Government-Issued ID</h2>
              <p>
                Identity verification is required for <strong>all registrants</strong> before
                any work begins. Any government-issued document is accepted.
              </p>
              <ul>
                <li>National ID card, passport, driver's licence, or equivalent</li>
                <li>The name on your ID must <strong>exactly match</strong> the name used during registration</li>
                <li>A clear photo or scan (front and back where applicable) will be requested</li>
                <li>IDs are used solely for one-time verification and are not retained beyond that</li>
              </ul>
              <div className="callout">
                Verification typically completes within a few hours of submission.
              </div>
            </div>
          </div>

          <div className="rule" />

          {/* Step 3 */}
          <div className="section">
            <div className="section-num">03</div>
            <div className="section-body">
              <h2>Payment Method</h2>
              <p>
                Payments are processed <strong>every week</strong>. Have your payment
                details ready before your first payout — incomplete details will delay
                your transfer.
              </p>
              <ul>
                <li><strong>PayPal</strong> — accepted globally; fastest option for most countries</li>
                <li><strong>Airtime top-up</strong> — available for supported African regions</li>
                <li><strong>Direct bank transfer (ACH / wire)</strong> — available for US citizens only</li>
              </ul>

              <table className="pay-table">
                <thead>
                  <tr>
                    <th>Region</th>
                    <th>Payout Day</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>🇬🇧 United Kingdom</td>
                    <td><strong>Every Wednesday</strong></td>
                  </tr>
                  <tr>
                    <td>🇺🇸🇨🇦 United States &amp; Canada</td>
                    <td><strong>Every Thursday</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rule" />

          {/* Step 4 */}
          <div className="section">
            <div className="section-num">04</div>
            <div className="section-body">
              <h2>Skill Verification Session (Outlier)</h2>
              <p>
                For Outlier AI roles, a short live camera check is required before
                you are cleared to work. It is quick, casual, and stress-free.
              </p>
              <ul>
                <li>You will be scheduled for a short video session — no special equipment needed beyond your device camera</li>
                <li>Simply open your camera and speak naturally when prompted</li>
                <li>You will be asked casual everyday questions — for example, your favourite football team or what you did today</li>
                <li>There are <strong>no trick questions</strong>; the check is about natural communication, not knowledge</li>
                <li>Look straight into the camera and speak at a comfortable, relaxed pace</li>
              </ul>
              <div className="callout">
                The whole session usually takes <strong>under 10 minutes</strong>. Dress
                normally and find a quiet spot beforehand.
              </div>
            </div>
          </div>

          <div className="rule" />

          {/* Footer */}
          <div className="doc-footer">
            <p>
              Once you have everything above in order, you are ready to begin your
              Outlier AI registration. For questions, contact your onboarding manager.
            </p>
            {showLogo && (
              <p className="doc-footer-meta">
                Work Proxy · workproxy.fun · Your trusted remote work partner
              </p>
            )}
          </div>

        </div>
      </div>

      <style>{`
        /* ── Toolbar (screen only) ── */
        .toolbar {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(37,99,235,0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 24px;
          gap: 16px;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #64748b;
          text-decoration: none;
          transition: color 0.15s;
        }
        .back-link:hover { color: #2563eb; }
        .toolbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .logo-toggle {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: #64748b;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 9999px;
          padding: 7px 14px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .logo-toggle.active {
          color: #2563eb;
          background: rgba(37,99,235,0.08);
          border-color: rgba(37,99,235,0.25);
        }
        .logo-toggle:hover { opacity: 0.8; }
        .dl-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          border: none;
          border-radius: 9999px;
          padding: 8px 18px;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(37,99,235,0.3);
          transition: opacity 0.15s;
        }
        .dl-btn:hover { opacity: 0.88; }

        /* ── Doc wrapper (screen) ── */
        .doc-wrap {
          background: #e2e8f0;
          min-height: 100vh;
          padding: 40px 20px;
          display: flex;
          justify-content: center;
        }
        .doc {
          background: #ffffff;
          width: 100%;
          max-width: 760px;
          border-radius: 12px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.1);
          padding: 56px 64px;
          font-family: 'Instrument Sans', system-ui, sans-serif;
          color: #0b1120;
        }

        /* ── Doc Header ── */
        .doc-header { margin-bottom: 36px; }
        .doc-logo {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 24px;
        }
        .doc-logo img {
          width: 36px;
          height: 36px;
          border-radius: 6px;
          object-fit: cover;
        }
        .doc-logo span {
          font-family: 'Bricolage Grotesque', system-ui, sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #0b1120;
        }
        .doc-title-block h1 {
          font-family: 'Bricolage Grotesque', system-ui, sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #0b1120;
          margin-bottom: 10px;
          line-height: 1.2;
        }
        .doc-subtitle {
          font-size: 14px;
          color: #475569;
          line-height: 1.7;
          max-width: 580px;
        }
        .doc-divider {
          height: 3px;
          background: linear-gradient(90deg, #2563eb, #7c3aed, transparent);
          border-radius: 2px;
          margin-top: 28px;
        }

        /* ── Sections ── */
        .section {
          display: flex;
          gap: 24px;
          padding: 28px 0;
        }
        .section-num {
          font-family: 'Bricolage Grotesque', system-ui, sans-serif;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #2563eb;
          background: rgba(37,99,235,0.08);
          border: 1px solid rgba(37,99,235,0.18);
          border-radius: 6px;
          width: 36px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 3px;
        }
        .section-body { flex: 1; }
        .section-body h2 {
          font-family: 'Bricolage Grotesque', system-ui, sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #0b1120;
          margin-bottom: 8px;
        }
        .section-body p {
          font-size: 14px;
          color: #334155;
          line-height: 1.7;
          margin-bottom: 12px;
        }
        .section-body ul {
          padding-left: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-bottom: 12px;
        }
        .section-body ul li {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          font-size: 13.5px;
          color: #334155;
          line-height: 1.65;
        }
        .section-body ul li::before {
          content: "•";
          color: #2563eb;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .callout {
          background: rgba(37,99,235,0.05);
          border-left: 3px solid #2563eb;
          border-radius: 0 6px 6px 0;
          padding: 10px 14px;
          font-size: 13px;
          color: #1e40af;
          line-height: 1.6;
          margin-top: 12px;
        }
        .rule {
          height: 1px;
          background: #e2e8f0;
        }

        /* ── Payment table ── */
        .pay-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 14px;
          font-size: 13.5px;
        }
        .pay-table th {
          background: #f8fafc;
          color: #64748b;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 9px 14px;
          text-align: left;
          border: 1px solid #e2e8f0;
        }
        .pay-table td {
          padding: 10px 14px;
          border: 1px solid #e2e8f0;
          color: #334155;
        }
        .pay-table tr:hover td { background: #fafbff; }

        /* ── Doc footer ── */
        .doc-footer {
          margin-top: 8px;
          padding-top: 28px;
          border-top: 2px solid #e2e8f0;
        }
        .doc-footer p {
          font-size: 13.5px;
          color: #334155;
          line-height: 1.7;
          margin-bottom: 8px;
        }
        .doc-footer-meta {
          color: #94a3b8 !important;
          font-size: 12px !important;
        }

        /* ── Print styles ── */
        @media print {
          .no-print { display: none !important; }
          body { background: #fff; margin: 0; }
          .doc-wrap {
            background: transparent;
            padding: 0;
            min-height: unset;
          }
          .doc {
            max-width: 100%;
            width: 100%;
            box-shadow: none;
            border-radius: 0;
            padding: 32px 48px;
          }
          .pay-table tr:hover td { background: transparent; }
          a { text-decoration: none; color: inherit; }
        }

        @media (max-width: 640px) {
          .doc { padding: 32px 24px; }
          .section { flex-direction: column; gap: 10px; }
          .toolbar { padding: 10px 16px; }
        }
      `}</style>
    </>
  );
}
