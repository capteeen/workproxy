'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  GraduationCap, BookOpen, Award, Users, Clock, CheckCircle, 
  ArrowRight, Star, Zap, Target, Send, Phone
} from "lucide-react";
import { useState } from "react";

const courses = [
  {
    platform: "Outlier AI",
    icon: <Target size={28} />,
    color: "#0f172a",
    topics: [
      "Understanding AI training & RLHF tasks",
      "How to write high-quality prompts & responses",
      "Navigating the Outlier dashboard",
      "Avoiding common mistakes that cause bans",
      "Maximizing your earnings per task",
      "Time management & task selection strategies",
    ],
  },
  {
    platform: "Handshake",
    icon: <Users size={28} />,
    color: "#334155",
    topics: [
      "Setting up and optimizing your profile",
      "Understanding available job categories",
      "How to apply and stand out to employers",
      "Building a strong portfolio on the platform",
      "Interview preparation & best practices",
      "Leveraging Handshake for long-term income",
    ],
  },
  {
    platform: "OneForma",
    icon: <Zap size={28} />,
    color: "#475569",
    topics: [
      "Registration & profile optimization",
      "Mastering transcription & translation tasks",
      "Quality standards & accuracy requirements",
      "Understanding project types & pay rates",
      "How to qualify for high-paying projects",
      "Scaling your workload for maximum income",
    ],
  },
];

const benefits = [
  { icon: <GraduationCap size={24} />, title: "Official Certification", desc: "Receive a Work Proxy Academy certificate upon graduation to prove your skills." },
  { icon: <BookOpen size={24} />, title: "Hands-On Training", desc: "Learn by doing — practice on real tasks with guidance from experienced workers." },
  { icon: <Award size={24} />, title: "Job Placement Priority", desc: "Academy graduates get first access to new job placements on the platform." },
  { icon: <Users size={24} />, title: "Community Access", desc: "Join an exclusive community of trained workers for support and networking." },
  { icon: <Clock size={24} />, title: "Flexible Schedule", desc: "Learn at your own pace with recorded sessions and live mentorship calls." },
  { icon: <Star size={24} />, title: "Lifetime Support", desc: "Get ongoing support even after graduation — we don't abandon our graduates." },
];

export default function AcademyPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    experience: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `🎓 *WORK PROXY ACADEMY REGISTRATION*%0A%0A*Name:* ${formData.fullName}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Course:* ${formData.course}%0A*Experience:* ${formData.experience || "None"}`;

    window.open(`https://wa.me/2349027406685?text=${message}`, "_blank");
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="academy-hero">
        <div className="academy-hero-bg" />
        <div className="container">
          <div className="academy-hero-inner">
            <span className="badge badge-amber" style={{ marginBottom: 20 }}>
              <GraduationCap size={14} /> Work Proxy Academy
            </span>
            <h1 className="academy-hero-title">
              Learn. Train.<br />
              <span className="gradient-text">Get Certified.</span>
            </h1>
            <p className="academy-hero-desc">
              Master the skills needed to earn on global AI platforms. Our intensive training program 
              covers everything from registration to advanced tasking — and you get a certification when you graduate.
            </p>
            <div className="academy-hero-price">
              <div className="price-tag">
                <span className="price-label">Enrollment Fee</span>
                <span className="price-amount">₦100,000</span>
                <span className="price-note">One-time payment · All courses included</span>
              </div>
            </div>
            <a href="#register" className="btn btn-primary btn-lg" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              Enroll Now <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-purple">Curriculum</span>
            <h2 className="section-title">What You&apos;ll Learn</h2>
            <p className="section-desc">
              Our academy covers the top platforms we work with. You&apos;ll learn the ins and outs of each 
              one so you can start earning immediately after graduation.
            </p>
          </div>
          <div className="academy-courses-grid">
            {courses.map((course) => (
              <div key={course.platform} className="academy-course-card">
                <div className="course-card-header">
                  <div className="course-icon" style={{ background: course.color }}>
                    {course.icon}
                  </div>
                  <h3>{course.platform}</h3>
                </div>
                <ul className="course-topics">
                  {course.topics.map((topic, i) => (
                    <li key={i}>
                      <CheckCircle size={14} className="topic-check" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)" }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-teal">Why Join</span>
            <h2 className="section-title">More Than Just Training</h2>
            <p className="section-desc">
              When you enroll in Work Proxy Academy, you don&apos;t just learn — you join a movement.
            </p>
          </div>
          <div className="grid-3 academy-benefits-grid">
            {benefits.map((b) => (
              <div key={b.title} className="card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ color: "var(--accent-primary)" }}>{b.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>{b.title}</h3>
                <p className="text-secondary text-sm" style={{ lineHeight: 1.7 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue">How It Works</span>
            <h2 className="section-title">Your Path to Certification</h2>
          </div>
          <div className="academy-steps">
            {[
              { step: "01", title: "Register & Pay", desc: "Fill out the registration form and make your one-time payment of ₦100,000." },
              { step: "02", title: "Start Training", desc: "Access your course materials, attend live sessions, and practice on real tasks." },
              { step: "03", title: "Complete Assignments", desc: "Finish all coursework and pass practical assessments to prove your skills." },
              { step: "04", title: "Get Certified", desc: "Receive your official Work Proxy Academy certificate and get placed into jobs." },
            ].map((s, i) => (
              <div key={s.step} className="academy-step-card">
                <div className="step-number">{s.step}</div>
                <h3>{s.title}</h3>
                <p className="text-secondary text-sm" style={{ lineHeight: 1.7 }}>{s.desc}</p>
                {i < 3 && <div className="step-connector"><ArrowRight size={16} /></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="section" id="register">
        <div className="container" style={{ maxWidth: 640 }}>
          <div className="section-header">
            <span className="badge badge-amber"><GraduationCap size={14} /> Enrollment</span>
            <h2 className="section-title">Register for the Academy</h2>
            <p className="section-desc">
              Fill out the form below to begin your enrollment. You&apos;ll be redirected to WhatsApp to complete payment.
            </p>
          </div>

          {submitted ? (
            <div className="academy-success-card">
              <div className="success-icon">
                <CheckCircle size={48} />
              </div>
              <h3>Registration Submitted!</h3>
              <p className="text-secondary" style={{ lineHeight: 1.8, marginBottom: 20 }}>
                Your application has been sent via WhatsApp. Our team will reach out to you shortly 
                with payment details and next steps. Welcome to Work Proxy Academy! 🎓
              </p>
              <button 
                className="btn btn-outline" 
                onClick={() => setSubmitted(false)}
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form className="academy-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number (WhatsApp) *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="+234 XXX XXX XXXX"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Course *</label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select a course</option>
                  <option value="Outlier AI">Outlier AI Training</option>
                  <option value="Handshake">Handshake Training</option>
                  <option value="OneForma">OneForma Training</option>
                  <option value="All Courses">All Courses (Full Package)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Prior Remote Work Experience</label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Briefly describe any remote work or freelancing experience you have (optional)"
                  rows={3}
                  style={{ resize: "vertical" }}
                />
              </div>

              <div className="academy-form-price">
                <div className="form-price-info">
                  <span className="text-sm text-secondary">Enrollment Fee:</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800 }}>₦100,000</span>
                </div>
                <p className="text-xs text-muted" style={{ marginTop: 4 }}>One-time payment. No hidden fees.</p>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-full" style={{ justifyContent: "center", gap: 10 }}>
                <Send size={18} /> Submit & Pay via WhatsApp
              </button>
            </form>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-box">
            <div className="cta-glow" />
            <span className="badge" style={{ marginBottom: 20, background: "rgba(245,158,11,0.15)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.3)" }}>
              <GraduationCap size={14} /> Limited Slots
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 800, marginBottom: 16, color: "#ffffff" }}>
              Don&apos;t Miss Out
            </h2>
            <p style={{ maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.8, color: "#cbd5e1" }}>
              Spots are limited. Enroll now and start your journey to earning on global platforms with 
              a recognized certification from Work Proxy Academy.
            </p>
            <div className="flex gap-4 justify-center" style={{ flexWrap: "wrap" }}>
              <a href="#register" className="btn btn-primary btn-lg" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <GraduationCap size={18} /> Enroll Now — ₦100,000
              </a>
              <a href="https://wa.me/2349027406685" target="_blank" className="btn btn-outline btn-lg" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Phone size={18} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .academy-hero {
          position: relative;
          padding: 140px 0 100px;
          overflow: hidden;
          background: #ffffff;
        }
        .academy-hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(245,158,11,0.06) 0%, transparent 55%),
            radial-gradient(ellipse 70% 50% at 80% 30%, rgba(139,92,246,0.04) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 50% 80%, rgba(0,0,0,0.02) 0%, transparent 55%);
          pointer-events: none;
        }
        .academy-hero-inner {
          text-align: center;
          max-width: 740px;
          margin: 0 auto;
          animation: fadeInUp 0.6s ease;
        }
        .academy-hero-title {
          font-family: var(--font-display);
          font-size: clamp(40px, 5vw, 72px);
          font-weight: 800;
          line-height: 1.05;
          margin-bottom: 24px;
          letter-spacing: -0.03em;
        }
        .academy-hero-desc {
          font-size: 18px;
          color: var(--text-secondary);
          line-height: 1.8;
          max-width: 560px;
          margin: 0 auto 40px;
        }
        .academy-hero-price {
          margin-bottom: 32px;
        }
        .price-tag {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          padding: 24px 48px;
          background: #fafafa;
          border: 2px solid var(--border);
          border-radius: var(--radius-2xl);
          gap: 4px;
        }
        .price-label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .price-amount {
          font-family: var(--font-display);
          font-size: 48px;
          font-weight: 800;
          color: var(--accent-primary);
          line-height: 1.1;
        }
        .price-note {
          font-size: 13px;
          color: var(--text-muted);
        }

        /* Course Cards */
        .academy-courses-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) {
          .academy-courses-grid { grid-template-columns: 1fr; }
        }
        .academy-course-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 32px;
          transition: all var(--transition);
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .academy-course-card:hover {
          border-color: var(--border-accent);
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.08);
        }
        .course-card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }
        .course-card-header h3 {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
        }
        .course-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          flex-shrink: 0;
        }
        .course-topics {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .course-topics li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .topic-check {
          color: #10b981;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Steps */
        .academy-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          position: relative;
        }
        @media (max-width: 900px) {
          .academy-steps { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .academy-steps { grid-template-columns: 1fr; }
        }
        .academy-step-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 28px 24px;
          text-align: center;
          position: relative;
          transition: all var(--transition);
        }
        .academy-step-card:hover {
          border-color: var(--border-accent);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }
        .academy-step-card h3 {
          font-family: var(--font-display);
          font-size: 18px;
          margin-bottom: 8px;
        }
        .step-number {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--accent-primary);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 16px;
          margin: 0 auto 16px;
        }
        .step-connector {
          display: none;
        }

        /* Form */
        .academy-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: var(--radius-2xl);
          padding: 40px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.04);
        }
        @media (max-width: 560px) {
          .academy-form { padding: 24px 20px; }
        }
        .academy-form-price {
          background: #fafafa;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 20px;
          text-align: center;
        }
        .form-price-info {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        /* Success */
        .academy-success-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: var(--radius-2xl);
          padding: 60px 40px;
          text-align: center;
          box-shadow: 0 8px 32px rgba(0,0,0,0.04);
          animation: fadeInUp 0.5s ease;
        }
        .success-icon {
          color: #10b981;
          margin-bottom: 20px;
        }
        .academy-success-card h3 {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 12px;
        }

        /* Benefits grid responsive */
        @media (max-width: 768px) {
          .academy-benefits-grid { grid-template-columns: 1fr !important; }
        }

        /* CTA Box */
        .cta-box {
          background: #0f172a;
          color: #ffffff;
          border-radius: var(--radius-2xl);
          padding: 88px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 16px 48px rgba(0,0,0,0.1);
        }
        .cta-glow {
          position: absolute;
          top: -40%;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 360px;
          background: radial-gradient(ellipse, rgba(255,255,255,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-box .btn-primary { background: #ffffff; color: #0f172a; }
        .cta-box .btn-primary:hover { background: #f8fafc; color: #0f172a; }
        .cta-box .btn-outline { color: #fff; border-color: rgba(255,255,255,0.2); }
        .cta-box .btn-outline:hover { background: rgba(255,255,255,0.1); }
      `}</style>
    </>
  );
}
