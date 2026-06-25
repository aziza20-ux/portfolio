import { useParams, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS, getTechIconClass } from './projects';

export default function ProjectDetail() {
  const { index } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS[Number(index)];

  const [theme, setTheme] = useState(
    () => document.documentElement.classList.contains('light-theme') ? 'light' : 'dark'
  );

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('light-theme', next === 'light');
      return next;
    });
  }, []);

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif", marginBottom: '16px' }}>Project not found.</p>
          <button onClick={() => navigate('/')} style={backBtnStyle}>← Back to Portfolio</button>
        </div>
      </div>
    );
  }

  const typeColors = {
    Trainee:    { bg: 'rgba(34,197,94,0.12)',  color: '#22C55E' },
    Internship: { bg: 'rgba(59,130,246,0.12)', color: '#3B82F6' },
    Freelance:  { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B' },
  };

  const prevIdx = Number(index) - 1;
  const nextIdx = Number(index) + 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{ minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-color)', fontFamily: "'Inter', sans-serif" }}
    >
      {/* Top bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: '65px',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-color)',
      }}>
        <button onClick={() => navigate('/#projects')} style={backBtnStyle}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Projects
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem', color: 'var(--text-muted)' }}>
            {project.category}
          </span>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              background: 'none', border: '1px solid var(--border-color)',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', padding: '8px', borderRadius: '8px',
              color: 'var(--text-color)',
            }}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Hero image */}
        <div style={{
          width: '100%', height: '360px', borderRadius: '20px', overflow: 'hidden',
          border: '1px solid var(--border-color)', marginBottom: '40px', position: 'relative',
          background: 'var(--card-bg)',
        }}>
          {project.image ? (
            <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          ) : (
            <div style={{
              width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(124,58,237,0.04))',
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="1.5" style={{ opacity: 0.4 }}>
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
          )}
          {project.isFeatured && (
            <div style={{
              position: 'absolute', top: '16px', left: '16px',
              background: 'linear-gradient(135deg, #F59E0B, #D97706)',
              color: '#fff', fontSize: '0.7rem', fontWeight: 800,
              padding: '4px 12px', borderRadius: '9999px',
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              boxShadow: '0 2px 8px rgba(245,158,11,0.4)', textTransform: 'uppercase',
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Featured
            </div>
          )}
        </div>

        {/* Title + role + category */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px', alignItems: 'center' }}>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.75rem', fontWeight: 700,
              padding: '4px 10px', borderRadius: '6px',
              background: 'var(--accent-glow)', color: 'var(--accent-color)',
              border: '1px solid var(--border-color)',
            }}>{project.category}</span>
            <span style={{
              fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', fontWeight: 500,
              color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px',
            }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-color)', display: 'inline-block' }} />
              {project.role}
            </span>
          </div>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--text-color)',
            lineHeight: 1.15, marginBottom: '16px',
          }}>{project.title}</h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '720px' }}>{project.desc}</p>
        </div>

        {/* Action links */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '48px' }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" style={actionLinkStyle}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View Code
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" style={{ ...actionLinkStyle, background: 'var(--accent-color)', color: '#fff', border: '1px solid var(--accent-color)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              {project.category === 'Backend' ? 'View Docs' : project.category === 'UI/UX' ? 'Open in Figma' : 'Live Demo'}
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" style={actionLinkStyle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Watch Demo
            </a>
          )}
        </div>

        {/* 3-col detail grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <DetailCard emoji="💡" title="Problem Solved" text={project.problem} />
          <DetailCard emoji="🔨" title="My Contribution" text={project.contribution} />
          <DetailCard emoji="📊" title="Real-world Impact" text={project.impact} />
        </div>

        {/* Key highlights */}
        <Section title="Key Highlights">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
            {project.highlights.map((h, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--accent-color)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                {h}
              </li>
            ))}
          </ul>
        </Section>

        {/* Tech stack */}
        <Section title="Tech Stack">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.tech.map((tag) => (
              <span key={tag} style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem',
                padding: '5px 12px', borderRadius: '8px',
                background: 'var(--bg-color)', border: '1px solid var(--border-color)',
                color: 'var(--text-color)', display: 'inline-flex', alignItems: 'center', gap: '6px',
              }}>
                <i className={getTechIconClass(tag)} style={{ fontSize: '0.9rem' }} />
                {tag}
              </span>
            ))}
          </div>
        </Section>

        {/* Figma embed */}
        {project.figma && (
          <Section title="Interactive Prototype">
            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
              <iframe
                title="Figma Prototype"
                src={project.figma}
                width="100%"
                height="520px"
                style={{ display: 'block', border: 'none' }}
                allowFullScreen
              />
            </div>
            {project.figmaWireframe && (
              <a
                href={project.figmaWireframe}
                target="_blank"
                rel="noreferrer"
                style={{ ...actionLinkStyle, marginTop: '12px', display: 'inline-flex' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                View Wireframes in Figma
              </a>
            )}
          </Section>
        )}

        {/* Prev / Next navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '56px', flexWrap: 'wrap' }}>
          {prevIdx >= 0 ? (
            <button onClick={() => navigate(`/project/${prevIdx}`)} style={navBtnStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '2px' }}>Previous</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{PROJECTS[prevIdx].title}</span>
              </span>
            </button>
          ) : <div />}
          {nextIdx < PROJECTS.length ? (
            <button onClick={() => navigate(`/project/${nextIdx}`)} style={{ ...navBtnStyle, flexDirection: 'row-reverse', textAlign: 'right' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '2px' }}>Next</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{PROJECTS[nextIdx].title}</span>
              </span>
            </button>
          ) : <div />}
        </div>
      </div>
    </motion.div>
  );
}

function DetailCard({ emoji, title, text }) {
  return (
    <div style={{
      background: 'var(--card-bg)', border: '1px solid var(--border-color)',
      borderRadius: '16px', padding: '24px',
    }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-color)', marginBottom: '10px' }}>
        {emoji} {title}
      </div>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>{text}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '36px' }}>
      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
        fontSize: '1rem', color: 'var(--text-color)',
        textTransform: 'uppercase', letterSpacing: '0.06em',
        marginBottom: '16px', paddingBottom: '10px',
        borderBottom: '1px solid var(--border-color)',
      }}>{title}</h3>
      {children}
    </div>
  );
}

const backBtnStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '6px',
  background: 'none', border: '1px solid var(--border-color)',
  color: 'var(--text-color)', cursor: 'pointer',
  fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '0.875rem',
  padding: '8px 14px', borderRadius: '8px',
  textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s',
};

const actionLinkStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '7px',
  padding: '10px 20px', borderRadius: '9999px',
  background: 'var(--card-bg)', border: '1px solid var(--border-color)',
  color: 'var(--text-color)', textDecoration: 'none',
  fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.875rem',
  transition: 'border-color 0.2s, color 0.2s',
};

const navBtnStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '12px',
  background: 'var(--card-bg)', border: '1px solid var(--border-color)',
  color: 'var(--text-color)', cursor: 'pointer',
  fontFamily: "'Inter', sans-serif", padding: '14px 20px',
  borderRadius: '12px', transition: 'border-color 0.2s',
  textAlign: 'left',
};
