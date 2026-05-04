import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Camera, CheckCircle, Video, TrendingUp, ArrowRight, Clock, Box, Zap, MonitorPlay, MapPin, DollarSign, Briefcase } from 'lucide-react';
import { JOBS } from '../data';

export default async function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = JOBS.find(j => j.id === id);

  if (!job) {
    notFound();
  }

  // Render the custom landing page for the film job
  if (job.isCustomLayout) {
    return (
      <>
        <Navbar />
        <div className="jobs-page">
          {/* Hero Section */}
          <section className="jobs-hero">
            <div className="container">
              <div className="hero-content">
                <div className="badge badge-amber mb-6 inline-flex" style={{ marginBottom: 24 }}>
                  <Camera size={14} />
                  <span>Now Hiring</span>
                </div>
                <h1 className="hero-title">
                  Get Paid to Film <br />
                  <span className="gradient-text">Your Daily Life.</span>
                </h1>
                <p className="hero-subtitle">
                  Record everyday content that helps AI systems understand the world better.
                  Free equipment. No experience required. 2 minutes to see if you're approved.
                </p>
                
                <div className="hero-actions" style={{ marginTop: 32 }}>
                  <a 
                    href={job.applyLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary btn-lg"
                  >
                    Apply Now <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </div>
            <div className="hero-bg-decoration"></div>
          </section>

          {/* How It Works Section */}
          <section className="how-it-works-section section">
            <div className="container">
              <div className="section-header text-center" style={{ maxWidth: 700, margin: '0 auto 64px' }}>
                <span className="badge badge-blue mb-4 inline-flex">How It Works</span>
                <h2 className="section-title">Getting started shouldn't be hard.</h2>
                <p className="section-desc">
                  Get contracted in 2 minutes, film what you already do, and submit. It really is that simple.
                </p>
              </div>

              <div className="steps-container">
                {/* Step 1 */}
                <div className="step-card">
                  <div className="step-number">01</div>
                  <div className="step-content">
                    <div className="step-icon"><Clock size={24} /></div>
                    <h3 className="step-title">2-Min Application</h3>
                    <p className="step-desc">
                      Tap the button, answer a few quick questions from our AI, and you're instantly approved. No resumes, no waiting.
                    </p>
                    <div className="step-tags">
                      <span className="step-tag"><Zap size={14} /> Instant Setup</span>
                      <span className="step-tag"><MonitorPlay size={14} /> AI Interview</span>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="step-card step-card-alt">
                  <div className="step-number">02</div>
                  <div className="step-content">
                    <div className="step-icon"><Video size={24} /></div>
                    <h3 className="step-title">Film Your Routine</h3>
                    <p className="step-desc">
                      We send you the equipment and the tasks. Cook dinner, fold laundry, wash dishes. Just film what you already do, first-person.
                    </p>
                    <div className="step-tags">
                      <span className="step-tag"><Box size={14} /> Free Equipment</span>
                      <span className="step-tag"><CheckCircle size={14} /> Your Home</span>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="step-card">
                  <div className="step-number">03</div>
                  <div className="step-content">
                    <div className="step-icon"><TrendingUp size={24} /></div>
                    <h3 className="step-title">Submit & Grow</h3>
                    <p className="step-desc">
                      Upload your footage and get approved. Simple as that. The more you film, the more tasks you unlock.
                    </p>
                    <div className="step-tags">
                      <span className="step-tag"><CheckCircle size={14} /> Quick Approval</span>
                      <span className="step-tag"><TrendingUp size={14} /> More Tasks</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="cta-section section">
            <div className="container">
              <div className="cta-box text-center">
                <h2>Ready to turn your routine into income?</h2>
                <p>Join hundreds of others getting paid to help train the future of AI.</p>
                <a 
                  href={job.applyLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary btn-lg mt-6"
                >
                  Start Your Application <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </section>
        </div>

        <style>{`
          .jobs-page {
            min-height: 100vh;
            background: var(--bg-primary);
          }

          .jobs-hero {
            position: relative;
            padding: 120px 0 100px;
            background: var(--grad-hero);
            border-bottom: 1px solid var(--border);
            overflow: hidden;
            text-align: center;
          }

          .hero-content {
            position: relative;
            z-index: 10;
            max-width: 800px;
            margin: 0 auto;
          }

          .hero-title {
            font-size: 64px;
            line-height: 1.1;
            margin-bottom: 24px;
            letter-spacing: -0.02em;
            font-family: var(--font-display);
            font-weight: 800;
          }

          .hero-subtitle {
            font-size: 20px;
            color: var(--text-secondary);
            line-height: 1.6;
            max-width: 600px;
            margin: 0 auto;
          }

          .hero-bg-decoration {
            position: absolute;
            top: -50%;
            left: -10%;
            width: 120%;
            height: 200%;
            background: radial-gradient(circle at center, rgba(245, 158, 11, 0.05) 0%, transparent 50%);
            pointer-events: none;
            z-index: 1;
          }

          .section-title {
            font-size: 40px;
            font-family: var(--font-display);
            font-weight: 800;
            margin-bottom: 16px;
            color: var(--text-primary);
          }

          .section-desc {
            font-size: 18px;
            color: var(--text-secondary);
            line-height: 1.6;
          }

          .steps-container {
            display: flex;
            flex-direction: column;
            gap: 24px;
            max-width: 900px;
            margin: 0 auto;
          }

          .step-card {
            display: flex;
            align-items: center;
            background: #ffffff;
            border: 1px solid var(--border);
            border-radius: var(--radius-xl);
            padding: 40px;
            gap: 40px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.02);
            position: relative;
            overflow: hidden;
            transition: transform var(--transition), box-shadow var(--transition);
          }

          .step-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 16px 40px rgba(0,0,0,0.06);
            border-color: var(--border-accent);
          }

          .step-card-alt {
            background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
          }

          .step-number {
            font-size: 120px;
            font-family: var(--font-display);
            font-weight: 900;
            color: rgba(15, 23, 42, 0.04);
            line-height: 1;
            position: absolute;
            right: -20px;
            bottom: -30px;
            pointer-events: none;
            user-select: none;
          }

          .step-content {
            flex: 1;
            position: relative;
            z-index: 2;
          }

          .step-icon {
            width: 56px;
            height: 56px;
            background: var(--bg-primary);
            border: 1px solid var(--border-accent);
            border-radius: var(--radius-lg);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--accent-primary);
            margin-bottom: 24px;
          }

          .step-title {
            font-size: 28px;
            font-family: var(--font-display);
            font-weight: 700;
            margin-bottom: 12px;
            color: var(--text-primary);
          }

          .step-desc {
            font-size: 16px;
            color: var(--text-secondary);
            line-height: 1.7;
            margin-bottom: 24px;
            max-width: 600px;
          }

          .step-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }

          .step-tag {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 16px;
            background: rgba(15, 23, 42, 0.04);
            border-radius: var(--radius-full);
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
            border: 1px solid rgba(15, 23, 42, 0.08);
          }

          .cta-section {
            padding-top: 40px;
            padding-bottom: 100px;
          }

          .cta-box {
            background: var(--accent-primary);
            border-radius: var(--radius-2xl);
            padding: 64px 40px;
            color: #ffffff;
            box-shadow: 0 20px 48px rgba(15, 23, 42, 0.2);
            position: relative;
            overflow: hidden;
          }

          .cta-box::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
            pointer-events: none;
          }

          .cta-box h2 {
            font-size: 40px;
            font-family: var(--font-display);
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 16px;
            position: relative;
            z-index: 2;
          }

          .cta-box p {
            font-size: 18px;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 32px;
            position: relative;
            z-index: 2;
          }

          .cta-box .btn {
            background: #ffffff;
            color: var(--accent-primary);
            position: relative;
            z-index: 2;
          }

          .cta-box .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(255, 255, 255, 0.2);
          }

          @media (max-width: 768px) {
            .hero-title {
              font-size: 42px;
            }

            .step-card {
              flex-direction: column;
              align-items: flex-start;
              padding: 32px 24px;
              gap: 24px;
            }

            .step-number {
              font-size: 80px;
              right: 10px;
              bottom: -10px;
            }

            .step-title {
              font-size: 24px;
            }

            .cta-box {
              padding: 48px 24px;
            }

            .cta-box h2 {
              font-size: 32px;
            }
          }
        `}</style>
        <Footer />
      </>
    );
  }

  // Render a standard job details page
  return (
    <>
      <Navbar />
      <div className="job-details-page">
        <section className="job-header">
          <div className="container">
            <Link href="/jobs" className="back-link">
              <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} /> Back to all jobs
            </Link>
            
            <div className="job-header-content">
              <h1 className="job-title">{job.title}</h1>
              <p className="job-company">{job.company}</p>
              
              <div className="job-tags">
                <span className="job-tag">
                  <MapPin size={16} /> {job.location}
                </span>
                <span className="job-tag">
                  <Clock size={16} /> {job.type}
                </span>
                <span className="job-tag highlight">
                  <DollarSign size={16} /> {job.compensation}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="job-body section">
          <div className="container">
            <div className="job-body-grid">
              <div className="job-main-content">
                <div className="card">
                  <h3 className="section-heading">About the Role</h3>
                  <div 
                    className="job-full-description"
                    dangerouslySetInnerHTML={{ __html: (job.fullDescription || job.description).replace(/\\n/g, '<br />') }}
                  />
                </div>
              </div>
              
              <div className="job-sidebar">
                <div className="card card-gradient text-center">
                  <Briefcase size={32} className="text-accent mb-4 mx-auto" />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 12 }}>Ready to apply?</h3>
                  <p className="text-secondary text-sm mb-6">
                    We review applications continuously. Apply now to secure your spot.
                  </p>
                  <a 
                    href={job.applyLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary w-full justify-center"
                  >
                    Apply for this Job
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <style>{`
          .job-details-page {
            min-height: 100vh;
            background: var(--bg-primary);
          }

          .job-header {
            background: #ffffff;
            border-bottom: 1px solid var(--border);
            padding: 40px 0;
          }

          .back-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            font-weight: 500;
            color: var(--text-muted);
            margin-bottom: 24px;
            transition: color var(--transition);
          }

          .back-link:hover {
            color: var(--accent-primary);
          }

          .job-header-content {
            max-width: 800px;
          }

          .job-title {
            font-size: 40px;
            font-family: var(--font-display);
            font-weight: 800;
            color: var(--text-primary);
            margin-bottom: 8px;
            line-height: 1.2;
          }

          .job-company {
            font-size: 18px;
            color: var(--text-secondary);
            font-weight: 500;
            margin-bottom: 24px;
          }

          .job-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }

          .job-tag {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 16px;
            background: var(--bg-primary);
            border-radius: var(--radius-sm);
            font-size: 14px;
            color: var(--text-secondary);
            font-weight: 500;
          }

          .job-tag.highlight {
            background: rgba(16, 185, 129, 0.1);
            color: #10b981;
          }

          .job-body-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 32px;
            align-items: start;
          }

          .section-heading {
            font-size: 24px;
            font-family: var(--font-display);
            font-weight: 700;
            margin-bottom: 24px;
            border-bottom: 1px solid var(--border);
            padding-bottom: 16px;
          }

          .job-full-description {
            font-size: 16px;
            line-height: 1.8;
            color: var(--text-secondary);
          }

          .job-full-description p {
            margin-bottom: 16px;
          }

          .job-sidebar {
            position: sticky;
            top: 100px;
          }

          @media (max-width: 768px) {
            .job-body-grid {
              grid-template-columns: 1fr;
            }

            .job-title {
              font-size: 32px;
            }
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
}
