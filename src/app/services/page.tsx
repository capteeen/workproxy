'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { 
  Monitor, CheckCircle2, Circle, 
  ArrowRight, Shield, Zap, 
  ChevronRight, BadgeCheck, MessageSquare, 
  CreditCard, GraduationCap, UserPlus, 
  Briefcase, Sparkles
} from "lucide-react";

const paidServices = [
  {
    id: "assessment",
    title: "Onboarding Assessment Writing",
    price: "₦40,000",
    rawPrice: 40000,
    icon: <GraduationCap size={24} />,
    description: "Our experts will take the qualification assessment test on your behalf to ensure you pass with a high score.",
    features: [
      "Done-for-you assessment writing",
      "Guaranteed passing scores",
      "Fast turnaround (24-48 hours)",
      "High-paying project matching"
    ]
  },
  {
    id: "registration",
    title: "Managed Account Registration",
    price: "₦60,000",
    rawPrice: 60000,
    icon: <UserPlus size={24} />,
    description: "We handle the entire platform registration and profile setup process for you using owner credentials.",
    features: [
      "Done-for-you platform signup",
      "Identity protection & VPN setup",
      "Profile SEO for task volume",
      "Complete account verify assistance"
    ]
  },
  {
    id: "training",
    title: "Professional Tasker Training",
    price: "₦60,000",
    rawPrice: 60000,
    icon: <Briefcase size={24} />,
    description: "Master the art of high-quality tasking. Learn how to maintain 4.5+ ratings and avoid project removal.",
    features: [
      "Advanced tasking techniques",
      "Quality control mastery",
      "Efficiency & speed hacks",
      "Long-term project retention tips"
    ]
  }
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(paidServices[0]);
  const [formData, setFormData] = useState({
    name: "",
    platform: "Outlier AI",
    email: ""
  });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Hello Work Proxy, I want to book a service:
    
*Service:* ${selectedService.title}
*Price:* ${selectedService.price}
*Platform:* ${formData.platform}
*Name:* ${formData.name}
*Email:* ${formData.email}

Please provide payment details to proceed.`;

    const whatsappUrl = `https://wa.me/2348152688569?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />

      {/* Hero Header */}
      <section className="svc-hero">
        <div className="container">
          <div className="svc-hero-inner">
            <span className="badge badge-purple" style={{ marginBottom: 20 }}>Work Proxy Onboarding Services</span>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, marginBottom: 20 }}>
              Unlock Your <span className="gradient-text">Earning Potential</span>
            </h1>
            <p className="text-secondary" style={{ maxWidth: 640, margin: "0 auto", fontSize: 18, lineHeight: 1.7 }}>
              Our expert-led services help you navigate the complex onboarding and training required to excel on global AI platforms.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="svc-booking-container">
            
            {/* Service Selection */}
            <div className="svc-selection-grid">
              {paidServices.map((service) => (
                <button 
                  key={service.id}
                  className={`svc-option-card ${selectedService.id === service.id ? 'active' : ''}`}
                  onClick={() => setSelectedService(service)}
                >
                  <div className="svc-option-icon">{service.icon}</div>
                  <div className="svc-option-content">
                    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{service.title}</h3>
                    <p className="text-sm text-secondary" style={{ marginBottom: 12 }}>{service.description}</p>
                    <div className="svc-option-price">{service.price}</div>
                  </div>
                  <div className="svc-check">
                    {selectedService.id === service.id ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </div>
                </button>
              ))}
            </div>

            {/* Booking Form Card */}
            <div className="svc-booking-card card shadow-xl">
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 400px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                    <div className="avatar avatar-md" style={{ background: "var(--accent-primary)" }}>
                      <CreditCard color="#fff" size={20} />
                    </div>
                    <div>
                      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700 }}>Complete Your Booking</h2>
                      <p className="text-sm text-muted">Submit your details to receive payment instructions on WhatsApp.</p>
                    </div>
                  </div>

                  <form onSubmit={handleBooking} className="svc-form">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        className="form-input" 
                        placeholder="e.g. Chukwudi Okafor" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        className="form-input" 
                        placeholder="name@email.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Target Platform</label>
                      <select 
                        className="form-input"
                        value={formData.platform}
                        onChange={(e) => setFormData({...formData, platform: e.target.value})}
                      >
                        <option>Outlier AI</option>
                        <option>OneForma</option>
                        <option>Scale AI</option>
                        <option>Telus International</option>
                      </select>
                    </div>

                    <div className="svc-summary-box">
                      <div className="flex justify-between" style={{ marginBottom: 8 }}>
                        <span className="text-sm">Service:</span>
                        <span className="text-sm font-bold">{selectedService.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Grand Total (₦):</span>
                        <span className="text-lg font-bold text-accent">{selectedService.price}</span>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg w-full" style={{ justifyContent: "center", gap: 8, marginTop: 12 }}>
                      <MessageSquare size={20} /> Book via WhatsApp
                    </button>
                    <p className="text-xs text-center text-muted" style={{ marginTop: 16 }}>
                      🔒 Secure booking. Payment verified by Work Proxy admin.
                    </p>
                  </form>
                </div>

                <div className="svc-benefits-panel">
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: 16, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                    <Sparkles size={18} color="var(--accent-primary)" /> Why choose our services?
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {selectedService.features.map((feature, i) => (
                      <div key={i} style={{ display: "flex", gap: 12 }}>
                        <div style={{ color: "var(--accent-primary)", marginTop: 2 }}>
                          <BadgeCheck size={18} />
                        </div>
                        <p className="text-sm text-secondary" style={{ lineHeight: 1.5 }}>{feature}</p>
                      </div>
                    ))}
                  </div>

                  <div className="divider" style={{ margin: "24px 0" }} />
                  
                  <div className="card" style={{ background: "rgba(0,153,255,0.05)", border: "1px dashed rgba(0,153,255,0.2)" }}>
                    <p className="text-xs text-secondary" style={{ fontStyle: "italic", lineHeight: 1.6 }}>
                      "The assessment prep was a lifesaver. I passed my Outlier test in 40 minutes and was matched to a $15/hr project the next day."
                    </p>
                    <p className="text-xs font-bold" style={{ marginTop: 8 }}>— David A., Lagos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .svc-hero {
          padding: 120px 0 60px;
          text-align: center;
          background: #ffffff;
        }
        .svc-hero-inner { animation: fadeInUp 0.5s ease; }
        
        .svc-booking-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .svc-selection-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .svc-option-card {
          background: #ffffff;
          border: 2px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 24px;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          gap: 16px;
          position: relative;
        }
        .svc-option-card:hover { border-color: var(--border-accent); }
        .svc-option-card.active { border-color: var(--accent-primary); background: #f8fafc; box-shadow: 0 8px 24px rgba(0,0,0,0.05); }
        
        .svc-option-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
          flex-shrink: 0;
        }
        .svc-option-card.active .svc-option-icon { background: var(--accent-primary); color: #fff; }
        
        .svc-option-content { flex: 1; }
        .svc-option-price { font-family: var(--font-display); font-size: 20px; font-weight: 800; color: var(--text-primary); }
        
        .svc-check { color: #e2e8f0; }
        .svc-option-card.active .svc-check { color: var(--accent-primary); }

        .svc-booking-card {
          padding: 40px;
          background: #ffffff;
          border: 1px solid var(--border-accent);
          transition: transform 0.3s;
        }
        
        .svc-benefits-panel {
          flex: 0 0 300px;
          background: #fafafa;
          border-radius: var(--radius-lg);
          padding: 24px;
          height: fit-content;
        }

        .svc-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .svc-summary-box {
          background: #f1f5f9;
          border-radius: var(--radius-md);
          padding: 16px;
          margin: 8px 0;
        }

        @media (max-width: 640px) {
          .svc-booking-card { padding: 24px; }
          .svc-benefits-panel { flex: 1 1 100%; }
        }
      `}</style>
    </div>
  );
}
