'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Key, Camera, Fingerprint, Rocket, ArrowLeft, Check, Upload, Briefcase, User, Wifi, Mail } from "lucide-react";

function SuccessModal({ email, onDone }: { email: string, onDone: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <div className="card" style={{ maxWidth: 440, textAlign: "center", padding: 40, animation: "fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        <div style={{ width: 64, height: 64, background: "#f0fdf4", color: "#16a34a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <Mail size={32} />
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "#0f172a", marginBottom: 12 }}>Verify your email</h2>
        <p style={{ color: "#475569", fontSize: 15, lineHeight: "24px", marginBottom: 32 }}>
          We've sent a verification link to <strong style={{ color: "#0f172a" }}>{email}</strong>. Please check your inbox and click the link to activate your account.
        </p>
        <button className="btn btn-primary w-full" style={{ justifyContent: "center" }} onClick={onDone}>
          Continue to Login
        </button>
      </div>
    </div>
  );
}

const expertiseAreas = ["AI Training", "Data Annotation", "Translation", "Content Writing", "Software Development", "Virtual Assistance"];

export default function WorkerApplyPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    country: "",
    expertise: [] as string[],
    yearsExperience: "",
    dailyHours: "",
    pcType: "Windows",
    performedTasks: "",
    upworkProfile: "",
    internetType: "fiber",
    backupPower: false,
    idType: "nin",
    nin: "",
  });
  
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [ninError, setNinError] = useState("");

  const up = (field: string, value: string | boolean | string[]) => setForm((f) => ({ ...f, [field]: value }));
  const toggleExpertise = (skill: string) => {
    up("expertise", form.expertise.includes(skill)
      ? form.expertise.filter((t) => t !== skill)
      : [...form.expertise, skill]);
  };

  const handleVerifyAndSubmit = async () => {
    setIsVerifying(true);
    setNinError("");
    try {
      const resp = await fetch("/api/verify-nin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nin: form.nin })
      });
      const data = await resp.json();
      if (!data.success) {
        setNinError(data.error || "Verification failed");
        setIsVerifying(false);
        return;
      }
      // If success, proceed to actual registration
      await handleSubmit();
    } catch (e) {
      setNinError("Service error. Try again.");
      setIsVerifying(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role: "worker" }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        alert(data.error || "Something went wrong!");
        setLoading(false);
        return;
      }

      // Success! Show modal
      setShowSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{ alignItems: "flex-start", paddingTop: 40 }}>
      <div className="auth-bg" />
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 640, margin: "0 auto" }}>
        <Link href="/" className="auth-back"><ArrowLeft size={14} style={{ display: "inline", marginRight: 4 }} /> Back to Home</Link>
 
         <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          <Key size={18} color="var(--accent-primary)" />
          <span style={{ color: "var(--accent-primary)" }}>Work Proxy</span>
         </div>

        {showSuccess && <SuccessModal email={form.email} onDone={() => router.push("/auth/login")} />}

        {step === 0 && (
          <div className="card" style={{ animation: "fadeInUp 0.3s ease" }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}><User size={24} /> Personal Details</h1>
            <p className="text-secondary text-sm" style={{ marginBottom: 28 }}>
              Let's start with the basics. Professional account managers are representing real identities overseas, so transparency is key.
            </p>

            <div className="auth-form">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">First Name *</label>
                  <input className="form-input" placeholder="e.g. John" value={form.firstName} onChange={(e) => up("firstName", e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name *</label>
                  <input className="form-input" placeholder="e.g. Doe" value={form.lastName} onChange={(e) => up("lastName", e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Contact Email *</label>
                <input type="email" className="form-input" placeholder="john@example.com" value={form.email} onChange={(e) => up("email", e.target.value)} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Password *</label>
                  <input type="password" className="form-input" placeholder="Create a password" value={form.password} onChange={(e) => up("password", e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">WhatsApp Number *</label>
                  <input type="tel" className="form-input" placeholder="+234..." value={form.phone} onChange={(e) => up("phone", e.target.value)} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input className="form-input" placeholder="e.g. Lagos" value={form.city} onChange={(e) => up("city", e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Country *</label>
                  <select className="form-select" value={form.country} onChange={(e) => up("country", e.target.value)}>
                    <option value="">Select country...</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <button className="btn btn-primary w-full" style={{ justifyContent: "center", marginTop: 24 }} onClick={() => setStep(1)} disabled={!form.firstName || !form.lastName || !form.email || !form.password || !form.phone || !form.city || !form.country}>
              Next Step <ArrowLeft size={16} style={{ transform: "rotate(180deg)" }} />
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="card" style={{ animation: "fadeInUp 0.3s ease" }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}><Briefcase size={24} /> Work Experience</h1>
            <p className="text-secondary text-sm" style={{ marginBottom: 20 }}>
              Help us understand your skills and availability.
            </p>

            <div className="auth-form">
               <div className="form-group">
                  <label className="form-label">Platform(s) you are familiar with *</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
                    {expertiseAreas.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        className={`badge ${form.expertise.includes(skill) ? "badge-green" : "badge-blue"}`}
                        style={{ cursor: "pointer", padding: "6px 12px", fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}
                        onClick={() => toggleExpertise(skill)}
                      >
                        {form.expertise.includes(skill) ? <Check size={12} /> : ""}{skill}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">What specific tasks do you perform on these platforms? *</label>
                  <textarea 
                    className="form-input" 
                    placeholder="e.g. RLHF for Outlier AI, Data Labeling for Remotasks..." 
                    style={{ minHeight: 80, padding: 12 }} 
                    value={form.performedTasks} 
                    onChange={(e) => up("performedTasks", e.target.value)} 
                  />
                </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Daily Hours Commitment *</label>
                  <select className="form-select" value={form.dailyHours} onChange={(e) => up("dailyHours", e.target.value)}>
                    <option value="">Select...</option>
                    <option value="2-4 hours">2-4 hours</option>
                    <option value="4-8 hours">4-8 hours</option>
                    <option value="8+ hours">8+ hours (Full Time)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Personal Computer Type *</label>
                  <select className="form-select" value={form.pcType} onChange={(e) => up("pcType", e.target.value)}>
                    <option value="Windows">Windows PC</option>
                    <option value="Mac">MacBook / Apple PC</option>
                    <option value="None">I don't have a PC</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Years of Remote Experience *</label>
                  <select className="form-select" value={form.yearsExperience} onChange={(e) => up("yearsExperience", e.target.value)}>
                    <option value="">Select...</option>
                    <option value="< 1 year">Less than 1 year</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Internet Connection *</label>
                  <select className="form-select" value={form.internetType} onChange={(e) => up("internetType", e.target.value)}>
                    <option value="fiber">Fiber / Stable Broadband</option>
                    <option value="4g">4G / 5G Router</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button className="btn btn-ghost" onClick={() => setStep(0)}>← Back</button>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={() => setStep(2)} disabled={form.expertise.length === 0 || !form.yearsExperience || !form.dailyHours || !form.performedTasks}>
                 Next Step <ArrowLeft size={16} style={{ transform: "rotate(180deg)" }} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="card" style={{ animation: "fadeInUp 0.3s ease" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}><Fingerprint size={24} /> Identity Verification</h2>
            <p className="text-secondary text-sm" style={{ marginBottom: 24 }}>
              To maintain absolute trust, all account managers must be verified. Please enter your National Identification Number (NIN) and upload a copy of your NIN card/slip.
            </p>

            <div className="auth-form">
              <div className="form-group">
                <label className="form-label">NIN Number *</label>
                <input 
                  className="form-input" 
                  placeholder="Enter your 11-digit NIN" 
                  value={form.nin} 
                  maxLength={11}
                  onChange={(e) => up("nin", e.target.value.replace(/\D/g, ''))} 
                />
                {ninError && <p className="text-xs text-error" style={{ color: '#ef4444', marginTop: 4 }}>{ninError}</p>}
                <p className="text-xs text-muted" style={{ marginTop: 8 }}>
                  We use official verification APIs to validate your identity.
                </p>
              </div>

               <div className="upload-box" style={{ marginBottom: 16 }}>
                <div style={{ color: "var(--text-muted)", marginBottom: 12 }}>
                  <Upload size={32} />
                </div>
                <p className="font-medium">Upload NIN Card / Slip</p>
                <p className="text-sm text-muted" style={{ marginTop: 4 }}>JPEG or PNG format. Max 5MB.</p>
                <button className="btn btn-ghost btn-sm" style={{ marginTop: 12 }} type="button" onClick={() => alert("File upload will be processed upon submission.")}>Choose File</button>
              </div>

               <div style={{ background: "rgba(0,212,170,0.05)", padding: 16, borderRadius: 12, border: "1px solid rgba(0,212,170,0.2)", marginTop: 8 }}>
                <p className="text-xs text-secondary" style={{ lineHeight: 1.5 }}>
                  <strong>Note:</strong> Verification happens instantly. Ensure the name on your NIN matches the name used in this application.
                </p>
              </div>

            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button className="btn btn-ghost" onClick={() => setStep(1)} disabled={loading || isVerifying}>← Back</button>
              <button id="submit-worker-app" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={handleVerifyAndSubmit} disabled={loading || isVerifying || form.nin.length < 11}>
                {loading || isVerifying ? <span className="btn-spinner" /> : <span style={{ display: "flex", alignItems: "center", gap: 8 }}>Verify & Submit <Rocket size={16} /></span>}
              </button>
            </div>
          </div>
        )}

        <style>{`
          .auth-page {
            min-height: 100vh;
            display: flex;
            padding: 40px 16px;
            position: relative;
          }
          .auth-bg {
            position: fixed;
            inset: 0;
            background: #f8fafc;
            pointer-events: none;
            z-index: 0;
          }
          .auth-back {
            display: inline-block;
            font-size: 13px;
            color: var(--text-muted);
            margin-bottom: 24px;
            transition: color var(--transition);
          }
          .auth-back:hover { color: var(--accent-primary); }
          .auth-form { display: flex; flex-direction: column; gap: 18px; }
          .upload-box {
            border: 2px dashed var(--border);
            background: #ffffff;
            border-radius: var(--radius-lg);
            padding: 36px;
            text-align: center;
            transition: all var(--transition);
          }
          .upload-box:hover {
            border-color: var(--border-accent);
            background: rgba(0,212,170,0.04);
          }
          .btn-spinner {
            display: inline-block;
            width: 18px;
            height: 18px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: #ffffff;
            border-radius: 50%;
            animation: spin 0.7s linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
}
