import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Briefcase, MapPin, Clock, ArrowRight, DollarSign, Globe, Sparkles } from 'lucide-react';
import { JOBS } from './data';

export default function JobsPage() {
  return (
    <>
      <Navbar />
      <div className="jobs-page">
        {/* Hero Section */}
        <section className="jobs-hero">
          <div className="container">
            <div className="hero-content">
              <div className="badge badge-teal mb-6 inline-flex" style={{ marginBottom: 24 }}>
                <Briefcase size={14} />
                <span>We're Hiring</span>
              </div>
              <h1 className="hero-title">
                Find Your Next <br />
                <span className="gradient-text">Remote Opportunity</span>
              </h1>
              <p className="hero-subtitle">
                Discover top remote jobs, AI training tasks, and freelance opportunities hand-picked by the Work Proxy team for global professionals.
              </p>
            </div>
          </div>
          <div className="hero-bg-decoration"></div>
        </section>

        {/* Jobs Listing Section */}
        <section className="jobs-listing section">
          <div className="container">
            <div className="jobs-header flex justify-between items-center mb-8" style={{ marginBottom: 32 }}>
              <div>
                <h2 className="text-xl font-bold">Open Positions</h2>
                <p className="text-muted text-sm mt-1">Showing {JOBS.length} available roles</p>
              </div>
            </div>

            <div className="jobs-grid">
              {JOBS.map((job) => (
                <div key={job.id} className={`job-card ${job.featured ? 'featured' : ''}`}>
                  {job.featured && (
                    <div className="featured-badge">
                      <Sparkles size={12} /> Featured
                    </div>
                  )}
                  
                  <div className="job-card-header">
                    <div>
                      <h3 className="job-title">{job.title}</h3>
                      <p className="job-company">{job.company}</p>
                    </div>
                  </div>

                  <div className="job-tags">
                    <span className="job-tag">
                      <MapPin size={14} /> {job.location}
                    </span>
                    <span className="job-tag">
                      <Clock size={14} /> {job.type}
                    </span>
                    <span className="job-tag highlight">
                      <DollarSign size={14} /> {job.compensation}
                    </span>
                  </div>

                  <p className="job-description">
                    {job.description}
                  </p>

                  <div className="job-card-footer">
                    <Link 
                      href={`/jobs/${job.id}`}
                      className={`btn w-full justify-center ${job.featured ? 'btn-primary' : 'btn-outline'}`}
                    >
                      View Details <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="empty-state" style={{ display: 'none' }}>
              <Globe size={48} className="text-muted mb-4" />
              <h3>No other jobs found</h3>
              <p className="text-muted">Check back later for more remote opportunities.</p>
            </div>
          </div>
        </section>

        <style>{`
          .jobs-page {
            min-height: 100vh;
            background: var(--bg-primary);
          }

          .jobs-hero {
            position: relative;
            padding: 100px 0 80px;
            background: var(--grad-hero);
            border-bottom: 1px solid var(--border);
            overflow: hidden;
            text-align: center;
          }

          .hero-content {
            position: relative;
            z-index: 10;
            max-width: 700px;
            margin: 0 auto;
          }

          .hero-title {
            font-size: 56px;
            line-height: 1.1;
            margin-bottom: 24px;
            letter-spacing: -0.02em;
            font-family: var(--font-display);
            font-weight: 800;
          }

          .hero-subtitle {
            font-size: 18px;
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
            background: radial-gradient(circle at center, rgba(15, 23, 42, 0.03) 0%, transparent 60%);
            pointer-events: none;
            z-index: 1;
          }

          .jobs-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
            gap: 24px;
          }

          .job-card {
            background: #ffffff;
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 28px;
            display: flex;
            flex-direction: column;
            transition: all var(--transition);
            position: relative;
            box-shadow: 0 4px 12px rgba(0,0,0,0.02);
          }

          .job-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(0,0,0,0.06);
            border-color: var(--border-accent);
          }

          .job-card.featured {
            border-color: rgba(0, 212, 170, 0.3);
            background: linear-gradient(180deg, rgba(0, 212, 170, 0.03) 0%, #ffffff 100%);
          }

          .featured-badge {
            position: absolute;
            top: -12px;
            right: 24px;
            background: var(--accent-primary);
            color: white;
            padding: 4px 12px;
            border-radius: var(--radius-full);
            font-size: 12px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 4px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }

          .job-card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
          }

          .job-title {
            font-size: 20px;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 6px;
            line-height: 1.3;
            font-family: var(--font-display);
          }

          .job-company {
            font-size: 14px;
            color: var(--text-muted);
            font-weight: 500;
          }

          .job-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 20px;
          }

          .job-tag {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            background: var(--bg-primary);
            border-radius: var(--radius-sm);
            font-size: 13px;
            color: var(--text-secondary);
            font-weight: 500;
          }

          .job-tag.highlight {
            background: rgba(16, 185, 129, 0.1);
            color: #10b981;
          }

          .job-description {
            font-size: 14px;
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: 24px;
            flex-grow: 1;
          }

          .job-card-footer {
            margin-top: auto;
            padding-top: 20px;
            border-top: 1px solid var(--border);
          }

          .empty-state {
            text-align: center;
            padding: 80px 0;
            background: var(--bg-primary);
            border-radius: var(--radius-lg);
            border: 1px dashed var(--border-accent);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .empty-state h3 {
            margin-bottom: 8px;
            font-size: 20px;
          }

          @media (max-width: 768px) {
            .hero-title {
              font-size: 40px;
            }
            
            .jobs-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
}
