import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import azizaImg from '../assets/aziza.jpeg';
import imgInzozi from './assets/images/inzozi-market.png';
import imgAirbnb from './assets/images/airbnb.png';
import imgBizpulse from './assets/images/bizpulse.png';
import imgAlugot from './assets/images/alugottalent.png';
import imgFinance from './assets/images/personal-finance.png';
import imgDaylight from './assets/images/daylight.png';
import imgKigali from './assets/images/browse-kigali.png';
import imgHills from './assets/images/1000hills.png';
import imgStorycast from './assets/images/story-cast.png';
import imgAfrica from './assets/images/testa-of-africa.png';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const TYPING_STRINGS = [
  'Full-Stack Developer',
  'Frontend Engineer',
  'Problem Solver',
];

const STATS = [
  { label: 'Projects Completed', value: '12+' },
  { label: 'Years of Experience', value: '2+' },
  { label: 'Technologies Used', value: '15+' },
  { label: 'Happy Clients', value: '10+' },
];

const PROJECTS = [
  {
    title: 'Inzozi Backend API',
    image: imgInzozi,
    role: 'Backend Developer',
    desc: 'Backend API for a creator economy platform. Built using Express.js and TypeScript with a focus on scalability, authentication, performance, and API reliability.',
    highlights: [
      'RESTful API architecture',
      'Prisma ORM & PostgreSQL setup',
      'Redis query caching',
      'OTP validation & recovery flows',
      'Refresh token management',
      'Idempotency locks for transactions',
      'Swagger API interactive docs'
    ],
    tech: ['Express.js', 'TypeScript', 'Prisma', 'Redis', 'Swagger', 'Docker', 'PostgreSQL'],
    category: 'Backend',
    isFeatured: true,
    github:'https://github.com/aziza20-ux/Inzozi-Market-api.git',
    live: 'https://inzozi-market.vercel.app/',
    demo: null,
    problem: 'Creator platforms require low-latency API responses and strict transactional security (such as preventing duplicate charges on payment operations).',
    contribution: 'Designed and deployed core API endpoints. Configured Prisma schema relationships, implemented Redis to cache heavy feed queries, and coded request idempotency middleware.',
    impact: 'Reduced database queries for social feeds by 45% and guaranteed transaction integrity across creator payments.'
  },
  {
    title: 'Airbnb-Like Platform API',
    image: imgAirbnb,
    role: 'Backend Developer',
    desc: 'A production-style property rental and booking API supporting listings, bookings, users, authentication, cloud storage, and AI-powered features.',
    highlights: [
      'Property listing & search mechanics',
      'Transactional booking workflows',
      'JWT authorization & session state',
      'Cloudinary file storage integration',
      'Redis key-value cache layer',
      'AI-powered semantic property search',
      'AI description generators',
      'LangChain LLM workflows'
    ],
    tech: ['Node.js', 'Express.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Redis', 'Cloudinary', 'JWT', 'LangChain', 'AI'],
    category: 'Backend',
    isFeatured: true,
    github: 'https://github.com/aziza20-ux/airbnb-api.git',
    live: 'https://airbnb-api-vzuk.onrender.com/api/v1/docs/#/',
    demo: null,
    problem: 'Traditional booking databases experience slow query speeds under geospatial filtering, and property owners struggle to write engaging listing summaries.',
    contribution: 'Created listing search algorithms, integrated Cloudinary for listing photo uploads, and implemented LangChain tasks to automatically summarize property features.',
    impact: 'Reduced checkout booking conflicts to 0% and boosted listing creation rates by 30% through generative descriptions.'
  },
  {
    title: 'BizPulse',
    image: imgBizpulse,
    role: 'Full Stack Developer',
    desc: 'Business intelligence dashboard helping SMEs monitor sales, finances, inventory, and operational performance through interactive analytics.',
    highlights: [
      'Revenue & cost tracking charts',
      'Expense entry & grouping structures',
      'Inventory stock monitoring alerts',
      'Interactive visual dashboards',
      'Multi-user auth security schemas'
    ],
    tech: ['Flask', 'SQLite', 'Flask-Migrate', 'Jinja2', 'ECharts', 'Python', 'CSS3'],
    category: 'Full Stack',
    isFeatured: false,
    github: 'https://github.com/Faith842/BizPulse.git',
    live: 'https://bizpulse.onrender.com/',
    demo: 'https://youtu.be/YmMDE9Uolks',
    problem: 'SMEs face difficulties aggregating disparate sales, invoice, and stock counts into readable reports, often leading to cash flow errors.',
    contribution: 'Authored Flask routing logic, migrated database schemas, integrated Apache ECharts for dynamic SVG charts, and implemented authorization checks.',
    impact: 'Offered SME owners a unified control panel, eliminating up to 10 hours of manual Excel data collation per week.'
  },
  {
    title: 'AluGotTalent',
    image: imgAlugot,
    role: 'Full Stack Developer',
    desc: 'A platform enabling students to showcase talents, connect with sponsors, participate in competitions, and share success stories.',
    highlights: [
      'Student profile dashboards',
      'Competition lists & submissions',
      'Sponsorship matchmaking forms',
      'Success stories interactive catalog',
      'User auth & session security'
    ],
    tech: ['Flask', 'Bootstrap', 'SQLite', 'Jinja2', 'JavaScript', 'HTML5'],
    category: 'Full Stack',
    isFeatured: false,
    github: 'https://github.com/aziza20-ux/AluGotTalent.git',
    live: 'https://alugottalent.onrender.com/',
    demo: null,
    problem: 'Student creators struggle to find funding or notice student competitions due to highly fragmented notification channels.',
    contribution: 'Designed student profiles and portfolio showcases, configured Flask session tokens, and integrated Bootstrap responsive layouts.',
    impact: 'Connected 120+ active student developers and creators directly with academic and corporate sponsors.'
  },
  {
    title: 'Personal Finance Tracker',
    image: imgFinance,
    role: 'Full Stack Developer',
    desc: 'A personal finance management platform that helps users monitor spending, create budgets, track savings goals, and manage recurring expenses.',
    highlights: [
      'Visual budget category cards',
      'Savings goal completion metrics',
      'Recurring cost schedule checks',
      'Secure front-end authentication',
      'Persistent local data sync'
    ],
    tech: ['React 19', 'TypeScript', 'React Router', 'Context API', 'Docker', 'CSS3'],
    category: 'Full Stack',
    isFeatured: false,
    github: 'https://github.com/aziza20-ux/finance.git',
    live: 'https://finance-2s4n.onrender.com/',
    demo: null,
    problem: 'People struggle to maintain budget compliance due to friction in manually logging expenses and mapping out recurring subscription bills.',
    contribution: 'Architected budget allocation states in React 19, created sub-routes with React Router, and containerized the project using Docker.',
    impact: 'Delivered an intuitive, responsive personal finance tool with offline-first capabilities using local storage synchronization.'
  },
  {
    title: 'Daylight Wellbeing App',
    image: imgDaylight,
    role: 'Full Stack Mobile Developer',
    desc: 'Cross-platform wellbeing companion helping users track mood, journal thoughts, and access support resources.',
    highlights: [
      'Mood check-in dials & sliders',
      'Journal entries with Firestore sync',
      'Firebase Auth & secure sign-ins',
      'Crisis helpline rapid access buttons',
      'Dark/Light UI theme settings'
    ],
    tech: ['Flutter', 'Firebase Auth', 'Firestore', 'Dart'],
    category: 'Mobile',
    isFeatured: false,
    github: 'https://github.com/mahlet-tilahun/daylight_wellbeing_app.git',
    live: null,
    demo: 'https://youtu.be/u6hhpK9nVQY',
    problem: 'Mental wellness tracking is often complex or non-private, leaving users without a reliable record of their mood cycles or access to emergency helplines.',
    contribution: 'Coded the custom mood slider component, built Firestore collection handlers, and integrated the crisis helpline click-to-dial workflow.',
    impact: 'Shipped a highly responsive, private mobile app for wellness tracking with offline cache syncing capabilities.'
  },
  {
    title: 'Browse Kigali',
    image: imgKigali,
    role: 'Full Stack Mobile Developer',
    desc: 'A mobile directory application helping users discover businesses, services, and points of interest across Kigali.',
    highlights: [
      'Interactive Google Maps layouts',
      'Category business search & filters',
      'Navigation support & route calculations',
      'Firebase list syncing',
      'Detailed merchant info screens'
    ],
    tech: ['Flutter', 'Google Maps SDK', 'Firebase', 'Dart'],
    category: 'Mobile',
    isFeatured: false,
    github: null,
    live: null,
    demo: 'https://youtu.be/NlazmEywvqw',
    problem: 'Locating verified shops, opening hours, and direct route navigation in rapidly building cities like Kigali is challenging for visitors.',
    contribution: 'Integrated Google Maps Flutter API, configured listing directory databases, and wired category searching scripts.',
    impact: 'Constructed a high-fidelity local discovery app mapping over 200 businesses across Kigali city.'
  },
  {
    title: 'Assignment Organizer',
    image: null,
    role: 'Full Stack Mobile Developer',
    desc: 'Academic productivity application designed to help university students manage assignments, attendance, and schedules.',
    highlights: [
      'Assignment deadline checklists',
      'Class attendance progress tracks',
      'Dynamic schedule calendars',
      'Student group productivity helpers'
    ],
    tech: ['Flutter', 'Dart', 'SQLite'],
    category: 'Mobile',
    isFeatured: false,
    github: 'https://github.com/Emma001code/Group8_Formative_Assignment_1.git',
    live: null,
    demo: null,
    problem: 'College students face course warnings or missed points due to disorganized monitoring of class attendance policies and deadlines.',
    contribution: 'Wrote the SQLite local database adapters, calendar reminder logic, and custom notification alert setups.',
    impact: 'Created a student planner app helping peers verify attendance requirements and coordinate exam preparation schedules.'
  },
  {
    title: '1000 Hills General Supply',
    image: imgHills,
    role: 'Frontend Developer',
    desc: 'Corporate website for a Rwandan technology and infrastructure company specializing in CCTV, networking, fire safety systems, and IT equipment supply.',
    highlights: [
      'Corporate branding & design guides',
      'Equipment service showcase grids',
      'Validating contact & quote forms',
      'Fast-loading responsive assets'
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    category: 'Frontend',
    isFeatured: false,
    github: 'https://github.com/aziza20-ux/tech-website.git',
    live: 'https://www.1000hillsgeneralsupply.com/',
    demo: null,
    problem: 'Infrastructure suppliers require high-quality corporate branding to stand out in competitive government tenders and corporate bids.',
    contribution: 'Coded semantic layout structures, built responsive portfolio grids, and configured contact workflows.',
    impact: 'Launched an enterprise-grade website, contributing to a 25% increase in digital CCTV installation quote requests.'
  },
  {
    title: 'StoryCast',
    image: imgStorycast,
    role: 'Frontend Developer',
    desc: 'Responsive storytelling platform presenting curated multimedia stories focused on culture, environment, and city life.',
    highlights: [
      'WCAG keyboard accessibility focus',
      'HTML5 semantic content elements',
      'Curated audio/video media players',
      'Dynamic CSS layout properties'
    ],
    tech: ['HTML', 'CSS', 'JavaScript'],
    category: 'Frontend',
    isFeatured: false,
    github: 'https://github.com/aziza20-ux/StoryCast.git',
    live: 'https://storycast.onrender.com/',
    demo: null,
    problem: 'Curated journalism needs to reach diverse readers, requiring cross-device readability and perfect support for assistive screen readers.',
    contribution: 'Implemented access tags, styled media overlay drawers, and programmed core browser responsive components.',
    impact: 'Built a lightweight storytelling reader that passes core WCAG accessibility checkers.'
  },
  {
    title: 'Taste of Africa',
    image: imgAfrica,
    role: 'Frontend Developer',
    desc: 'An interactive website celebrating African cuisine through recipes, regional food exploration, and multimedia storytelling.',
    highlights: [
      'Interactive culinary map guides',
      'Video overlays & preparation guides',
      'CSS SASS layout designs',
      'Optimized asset loading streams'
    ],
    tech: ['HTML', 'CSS', 'SASS', 'JavaScript'],
    category: 'Frontend',
    isFeatured: false,
    github: 'https://github.com/aziza20-ux/testa-of-africa.git',
    live: 'https://testa-of-africa.vercel.app/',
    demo: null,
    problem: 'Standard recipe catalogs lack engaging visuals, which details history or maps regions to specific food ingredients.',
    contribution: 'Programmed JavaScript-based page routing, styled food galleries with CSS transitions, and designed SASS files.',
    impact: 'Created a visually stunning visual recipe site showcasing cultural food traditions to international users.'
  }
];

const SKILLS = [
  { name: 'React / Next.js', level: 95 },
  { name: 'JavaScript / ES6+', level: 92 },
  { name: 'Node.js / Express', level: 88 },
  { name: 'CSS / Tailwind', level: 90 },
  { name: 'Python / Django', level: 78 },
  { name: 'PostgreSQL / MongoDB', level: 82 },
  { name: 'Docker / AWS', level: 75 },
  { name: 'TypeScript', level: 85 },
];

const EXPERIENCES = [
  {
    role: 'Software Engineer Trainee',
    company: 'kLab Rwanda',
    period: 'Apr 2026 – Present',
    location: 'Kigali, Rwanda',
    type: 'Trainee',
    desc: 'Develop and test software solutions for real-world applications. Collaborate with developers to build scalable and efficient systems. Work with technologies including Node.js, React.js, and Express.js. Participate in debugging, testing, and improving application performance.',
  },
  {
    role: 'Web Developer Intern',
    company: 'CodeAlpha',
    period: 'Jan 2026 – Apr 2026',
    location: 'Remote',
    type: 'Internship',
    desc: 'Developed responsive web applications using JavaScript and modern web technologies. Gained hands-on experience in real-world software development projects. Improved front-end functionality and user experience. Collaborated remotely with team members on development tasks.',
  },
  {
    role: 'Microsoft Power Automate & SharePoint Specialist Intern',
    company: 'M365Connect',
    period: 'Oct 2024 – Dec 2024',
    location: 'Remote',
    type: 'Internship',
    desc: 'Assisted in automating workflows using Microsoft Power Automate. Supported SharePoint solutions and digital collaboration systems. Helped improve process efficiency through automation tools.',
  },
  {
    role: 'Freelance Developer',
    company: 'Self-Employed',
    period: '2024 – Present',
    location: 'Remote',
    type: 'Freelance',
    desc: 'Design and build full-stack web applications for clients across various industries. Deliver responsive frontends, robust backend APIs, and complete end-to-end solutions. Manage client communication, project scoping, and delivery independently.',
  },
];

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    href: 'https://github.com/aziza20-ux',
    path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/afadhali-aziza-solace-2b992639b',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    name: 'Phone',
    href: 'tel:+250791168562',
    path: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z',
  },
  {
    name: 'Email',
    href: 'mailto:asaaziza574@gmail.com',
    path: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  },
];

const PROFILE_JSON = {
  name: 'Aziza',
  role: 'Full-Stack Developer',
  location: 'Available for work',
  yearsOfExperience: 2,
  projectsCompleted: 12,
  passions: ['Clean Code', 'UI Design', 'Problem Solving'],
};

// ─────────────────────────────────────────────
// CUSTOM HOOKS
// ─────────────────────────────────────────────

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function useActiveSection() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

// ── Cursor Blob ──
function CursorBlob() {
  const blobRef = useRef(null);

  useEffect(() => {
    let raf = null;
    const handleMouse = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (blobRef.current) {
          blobRef.current.style.transform = `translate(${e.clientX - 160}px, ${e.clientY - 160}px)`;
        }
        raf = null;
      });
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div
      ref={blobRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, rgba(124,58,237,0) 70%)',
        filter: 'blur(8px)',
        zIndex: 0,
        pointerEvents: 'none',
        willChange: 'transform',
        transition: 'transform 0.15s ease-out',
      }}
    />
  );
}

// ── Navbar ──
function Navbar({ activeSection, theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  }, []);

  return (
    <>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          height: '65px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          background: scrolled ? 'var(--glass-bg)' : 'var(--bg-color)',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: '1px solid var(--border-color)',
          transition: 'background-color 0.25s, border-color 0.25s, backdrop-filter 0.25s',
        }}
      >
        {/* Logo */}
        <button onClick={() => scrollTo('home')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '1.5rem',
              color: 'var(--text-color)',
            }}
          >
            AZ<span style={{ color: 'var(--accent-color)' }}>.</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div
            style={{
              display: 'none',
              gap: '28px',
              alignItems: 'center',
            }}
            className="md:flex"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: isActive ? 'var(--accent-color)' : 'var(--text-muted)',
                    borderBottom: isActive ? '2px solid var(--accent-color)' : '2px solid transparent',
                    paddingBottom: '4px',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.target.style.color = 'var(--text-color)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.target.style.color = 'var(--text-muted)';
                  }}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              borderRadius: '8px',
              color: 'var(--text-color)',
              transition: 'background-color 0.2s, border-color 0.2s',
            }}
            aria-label="Toggle theme"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--border-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {theme === 'dark' ? (
              /* Sun icon for dark mode (click to go light) */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              /* Moon icon for light mode (click to go dark) */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              padding: '4px',
            }}
            className="md:hidden"
          >
            <span style={{ display: 'block', width: '24px', height: '2px', background: 'var(--text-color)', borderRadius: '1px' }} />
            <span style={{ display: 'block', width: '24px', height: '2px', background: 'var(--text-color)', borderRadius: '1px' }} />
            <span style={{ display: 'block', width: '24px', height: '2px', background: 'var(--text-color)', borderRadius: '1px' }} />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'var(--bg-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'absolute',
              top: '16px',
              right: '24px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-color)',
              fontSize: '2rem',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            ✕
          </button>
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '2rem',
                fontWeight: 700,
                color: activeSection === link.id ? 'var(--accent-color)' : 'var(--text-color)',
                transition: 'color 0.2s',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

// ── ScrollReveal wrapper ──
function Reveal({ children, style = {} }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Typewriter ──
function Typewriter() {
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TYPING_STRINGS[idx % TYPING_STRINGS.length];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, 60);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, 35);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx((i) => i + 1);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx]);

  return (
    <span>
      {text}
      <span
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1em',
          background: '#7C3AED',
          marginLeft: '2px',
          verticalAlign: 'text-bottom',
          animation: 'none',
        }}
      />
    </span>
  );
}

// ── VSCode Card ──
function VSCodeCard() {
  const [visibleLines, setVisibleLines] = useState(0);
  const keys = Object.keys(PROFILE_JSON);

  useEffect(() => {
    if (visibleLines < keys.length) {
      const t = setTimeout(() => setVisibleLines((v) => v + 1), 120);
      return () => clearTimeout(t);
    }
  }, [visibleLines, keys.length]);

  const renderValue = (key, value) => {
    const colorMap = {
      name: '#7DD3FC',
      role: '#7DD3FC',
      location: '#7DD3FC',
      yearsOfExperience: '#FCA5A5',
      currentlyBuilding: '#86EFAC',
      passions: '#86EFAC',
    };
    const valColor = colorMap[key] || '#86EFAC';

    if (Array.isArray(value)) {
      return (
        <span style={{ color: '#94A3B8' }}>
          [
          {value.map((v, i) => (
            <span key={i}>
              <span style={{ color: '#86EFAC' }}>'{v}'</span>
              {i < value.length - 1 && <span style={{ color: '#94A3B8' }}>, </span>}
            </span>
          ))}
          ]
        </span>
      );
    }
    if (typeof value === 'number') {
      return <span style={{ color: '#FCA5A5' }}>{value}</span>;
    }
    if (typeof value === 'string') {
      return <span style={{ color: '#86EFAC' }}>'{value}'</span>;
    }
    return <span style={{ color: '#86EFAC' }}>{String(value)}</span>;
  };

  return (
    <div
      style={{
        background: '#0F111A',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        overflow: 'hidden',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.8rem',
        lineHeight: 1.7,
      }}
    >
      {/* Chrome bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F56' }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27C93F' }} />
        <span style={{ marginLeft: '12px', color: '#94A3B8', fontSize: '0.75rem' }}>profile.json</span>
      </div>
      {/* Content */}
      <div style={{ padding: '20px' }}>
        <span style={{ color: '#94A3B8' }}>{'{'}</span>
        {keys.map((key, i) => (
          <div
            key={key}
            style={{
              paddingLeft: '16px',
              opacity: i < visibleLines ? 1 : 0,
              transition: 'opacity 0.2s',
            }}
          >
            <span style={{ color: '#7DD3FC' }}>"{key}"</span>
            <span style={{ color: '#94A3B8' }}>: </span>
            {renderValue(key, PROFILE_JSON[key])}
            {i < keys.length - 1 && <span style={{ color: '#94A3B8' }}>,</span>}
          </div>
        ))}
        <span style={{ color: '#94A3B8' }}>{'}'}</span>
      </div>
    </div>
  );
}

// ── Hero ──
function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '80px 24px 40px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '48px',
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          alignItems: 'center',
        }}
      >
        {/* Left Column */}
        <div>
          {/* Eyebrow */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.8rem',
              color: 'rgba(242,240,235,0.6)',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#22C55E',
                display: 'inline-block',
              }}
              className="animate-pulse"
            />
            // available for work
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              lineHeight: 1.1,
              marginBottom: '12px',
              color: '#F2F0EB',
            }}
          >
            Hi, I'm{' '}
            <span style={{ color: '#7C3AED' }}>Aziza</span>
          </h1>

          {/* Typewriter */}
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              color: 'rgba(242,240,235,0.8)',
              marginBottom: '20px',
              minHeight: '2.2rem',
            }}
          >
            <Typewriter />
          </div>

          {/* Bio */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'rgba(242,240,235,0.5)',
              fontSize: '1rem',
              lineHeight: 1.7,
              maxWidth: '480px',
              marginBottom: '32px',
            }}
          >
            Full-stack developer with 2 years of experience and 12 projects delivered.
            Passionate about building clean, performant web apps and turning
            complex problems into intuitive digital experiences.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '48px',
                padding: '0 28px',
                borderRadius: '9999px',
                background: '#7C3AED',
                color: '#fff',
                border: 'none',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.background = '#8B5CF6')}
              onMouseLeave={(e) => (e.target.style.background = '#7C3AED')}
            >
              View My Work
            </a>
            <a
              href="/Aziza_CV.pdf"
              download="Aziza_CV.pdf"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                height: '48px',
                padding: '0 28px',
                borderRadius: '9999px',
                background: 'transparent',
                color: '#F2F0EB',
                border: '1.5px solid rgba(255,255,255,0.12)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#7C3AED';
                e.currentTarget.style.color = '#7C3AED';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.color = '#F2F0EB';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>
          </div>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target={social.href.startsWith('mailto') || social.href.startsWith('tel') ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={social.name}
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '8px',
                  transition: 'border-color 0.2s, color 0.2s',
                  color: 'rgba(242,240,235,0.5)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#7C3AED';
                  e.currentTarget.style.color = '#7C3AED';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.color = 'rgba(242,240,235,0.5)';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Right Column - Profile Image */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div
            style={{
              position: 'relative',
              width: '320px',
              height: '380px',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '2px solid rgba(124,58,237,0.4)',
              boxShadow: '0 0 40px rgba(124,58,237,0.2)',
            }}
          >
            <img
              src={azizaImg}
              alt="Aziza"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            {/* Overlay badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(13,13,15,0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(124,58,237,0.4)',
                borderRadius: '9999px',
                padding: '8px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#F2F0EB' }}>Available for work</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Stats Bar ──
function StatsBar() {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        background: '#1A1A1F',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '32px 24px',
        position: 'relative',
        zIndex: 1,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '24px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {STATS.map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '2rem',
                color: '#7C3AED',
                marginBottom: '4px',
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                color: 'rgba(242,240,235,0.5)',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Technology Icon Helper ──
function getTechIconClass(techName) {
  const map = {
    'Express.js': 'devicon-express-original',
    'TypeScript': 'devicon-typescript-plain colored',
    'Prisma': 'devicon-prisma-original',
    'Redis': 'devicon-redis-plain colored',
    'Swagger': 'devicon-swagger-plain',
    'Docker': 'devicon-docker-plain colored',
    'PostgreSQL': 'devicon-postgresql-plain colored',
    'Node.js': 'devicon-nodejs-plain colored',
    'Cloudinary': 'devicon-cloudinary-plain colored',
    'JWT': 'devicon-chrome-plain colored',
    'LangChain': 'devicon-python-plain colored',
    'Flask': 'devicon-flask-original',
    'SQLite': 'devicon-sqlite-plain colored',
    'Jinja2': 'devicon-python-plain colored',
    'ECharts': 'devicon-javascript-plain colored',
    'Bootstrap': 'devicon-bootstrap-plain colored',
    'JavaScript': 'devicon-javascript-plain colored',
    'React 19': 'devicon-react-plain colored',
    'React Router': 'devicon-react-plain colored',
    'Context API': 'devicon-react-plain colored',
    'Flutter': 'devicon-flutter-plain colored',
    'Firebase Auth': 'devicon-firebase-plain colored',
    'Firestore': 'devicon-firebase-plain colored',
    'Firebase': 'devicon-firebase-plain colored',
    'Google Maps SDK': 'devicon-google-plain colored',
    'Google Maps': 'devicon-google-plain colored',
    'HTML5': 'devicon-html5-plain colored',
    'CSS3': 'devicon-css3-plain colored',
    'HTML': 'devicon-html5-plain colored',
    'CSS': 'devicon-css3-plain colored',
    'SASS': 'devicon-sass-original colored',
    'Dart': 'devicon-dart-plain colored',
    'Python': 'devicon-python-plain colored',
    'AI': 'devicon-backbonejs-plain'
  };
  return map[techName] || 'devicon-code-plain';
}

// ── Projects Section ──
function ProjectsSection() {
  const [ref, visible] = useScrollReveal();
  const [filter, setFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const categories = ['All', 'Backend', 'Full Stack', 'Mobile', 'Frontend', 'AI'];

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return PROJECTS;
    if (filter === 'AI') {
      return PROJECTS.filter(
        (p) => p.category === 'AI' || p.tech.includes('AI') || p.tech.includes('LangChain')
      );
    }
    return PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);
  const hasMore = filteredProjects.length > 3;

  const handleFilterChange = (cat) => {
    setFilter(cat);
    setShowAll(false);
  };

  return (
    <section
      id="projects"
      style={{
        padding: '100px 24px',
        position: 'relative',
        zIndex: 1,
        background: 'var(--section-bg)',
      }}
    >
      <div ref={ref} style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              marginBottom: '16px',
              color: 'var(--text-color)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            }}
          >
            Engineering <span style={{ color: 'var(--accent-color)' }}>Showcase</span>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'var(--text-muted)',
              maxWidth: '600px',
              margin: '0 auto 32px',
              fontSize: '1rem',
              lineHeight: 1.6,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s',
            }}
          >
            A curated portfolio of production-style APIs, complete full-stack systems, and robust client tools. Filter by technical focus to examine database designs, integrations, or interfaces.
          </p>

          {/* Filter Caps */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.5s ease-out 0.2s',
            }}
          >
            {categories.map((cat) => {
              const isActive = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleFilterChange(cat)}
                  style={{
                    position: 'relative',
                    padding: '8px 20px',
                    borderRadius: '9999px',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    background: 'transparent',
                    border: '1px solid var(--border-color)',
                    color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                    cursor: 'pointer',
                    outline: 'none',
                    paddingLeft: '22px',
                    paddingRight: '22px',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBg"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'var(--accent-color)',
                        borderRadius: '9999px',
                        zIndex: -1,
                      }}
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span style={{ position: 'relative', zIndex: 1 }}>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Responsive Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
            minHeight: '400px',
          }}
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, idx) => (
              <ProjectCard key={idx} project={project} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More / Show Less */}
        {hasMore && (
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <motion.button
              onClick={() => setShowAll((v) => !v)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 36px',
                borderRadius: '9999px',
                background: 'transparent',
                border: '1.5px solid var(--accent-color)',
                color: 'var(--accent-color)',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s',
                outline: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent-color)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--accent-color)';
              }}
            >
              {showAll ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                  Show Less
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  Load More ({filteredProjects.length - 3} more)
                </>
              )}
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '20px',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'var(--card-shadow)',
        boxSizing: 'border-box',
      }}
      className={`glass-panel ${project.isFeatured ? 'featured-glow' : ''}`}
    >
      <div>
        {/* Thumbnail */}
        <div
          style={{
            width: '100%',
            height: '180px',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '20px',
            background: 'var(--bg-color)',
            border: '1px solid var(--border-color)',
            position: 'relative',
            flexShrink: 0,
          }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.4s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(124,58,237,0.04))',
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--text-muted)', opacity: 0.6 }}>Preview unavailable</span>
            </div>
          )}
          {/* Category pill overlay on image */}
          {project.isFeatured && (
            <div
              style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                color: '#fff',
                fontSize: '0.62rem',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '9999px',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 2px 8px rgba(245,158,11,0.4)',
                letterSpacing: '0.04em',
              }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Featured
            </div>
          )}
        </div>

        {/* Badges & Role header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '6px',
                background: 'var(--accent-glow)',
                color: 'var(--accent-color)',
                border: '1px solid var(--border-color)',
              }}
            >
              {project.category}
            </span>
          </div>
        </div>

        {/* Contribution Badge */}
        <div style={{ marginBottom: '8px' }}>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8rem',
              fontWeight: 500,
              color: 'var(--text-muted)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-color)' }} />
            Role: <strong>{project.role}</strong>
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: '1.35rem',
            color: 'var(--text-color)',
            marginBottom: '10px',
            lineHeight: 1.25,
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            lineHeight: 1.55,
            marginBottom: '20px',
          }}
        >
          {project.desc}
        </p>

        {/* Highlights List */}
        <div style={{ marginBottom: '20px' }}>
          <span
            style={{
              display: 'block',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--text-color)',
              marginBottom: '8px',
              letterSpacing: '0.05em',
            }}
          >
            Key Highlights
          </span>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {project.highlights.slice(0, 3).map((item, idx) => (
              <li
                key={idx}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.825rem',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '6px',
                }}
              >
                <span style={{ color: 'var(--accent-color)', fontSize: '0.85rem' }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
            {project.highlights.length > 3 && (
              <li
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8rem',
                  color: 'var(--accent-color)',
                  fontStyle: 'italic',
                  paddingLeft: '14px',
                }}
              >
                + {project.highlights.length - 3} more technical achievements
              </li>
            )}
          </ul>
        </div>

        {/* Tech Stack Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
          {project.tech.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.675rem',
                padding: '3px 8px',
                borderRadius: '6px',
                background: 'var(--bg-color)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-color)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <i className={getTechIconClass(tag)} style={{ fontSize: '0.8rem' }}></i>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div>
        {/* Buttons & Drawer trigger */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '16px',
            gap: '12px',
          }}
        >
          {/* Action Links */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: 'var(--text-color)',
                  background: 'var(--bg-color)',
                  border: '1px solid var(--border-color)',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  textDecoration: 'none',
                  fontSize: '0.775rem',
                  fontWeight: 600,
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-color)';
                  e.currentTarget.style.color = 'var(--accent-color)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.color = 'var(--text-color)';
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: 'var(--text-color)',
                  background: 'var(--bg-color)',
                  border: '1px solid var(--border-color)',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  textDecoration: 'none',
                  fontSize: '0.775rem',
                  fontWeight: 600,
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-color)';
                  e.currentTarget.style.color = 'var(--accent-color)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.color = 'var(--text-color)';
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                {project.category === 'Backend' ? 'Docs' : 'Live'}
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: 'var(--text-color)',
                  background: 'var(--bg-color)',
                  border: '1px solid var(--border-color)',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  textDecoration: 'none',
                  fontSize: '0.775rem',
                  fontWeight: 600,
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-color)';
                  e.currentTarget.style.color = 'var(--accent-color)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.color = 'var(--text-color)';
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Video
              </a>
            )}
          </div>

          {/* Details Drawer Switch */}
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--accent-color)',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              outline: 'none',
              padding: '6px 0',
            }}
          >
            {expanded ? 'Less' : 'Details'}
            <motion.svg
              animate={{ rotate: expanded ? 180 : 0 }}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </motion.svg>
          </button>
        </div>

        {/* Accordion content */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div
                style={{
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  fontSize: '0.825rem',
                  lineHeight: 1.5,
                  textAlign: 'left',
                }}
              >
                <div>
                  <strong style={{ color: 'var(--text-color)', display: 'block', marginBottom: '2px' }}>
                    💡 Problem Solved
                  </strong>
                  <p style={{ color: 'var(--text-muted)' }}>{project.problem}</p>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-color)', display: 'block', marginBottom: '2px' }}>
                    🔨 My Contribution
                  </strong>
                  <p style={{ color: 'var(--text-muted)' }}>{project.contribution}</p>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-color)', display: 'block', marginBottom: '2px' }}>
                    📊 Real-world Impact
                  </strong>
                  <p style={{ color: 'var(--text-muted)' }}>{project.impact}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── Skills Section ──
function SkillsSection() {
  const [ref, visible] = useScrollReveal();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (visible && !animated) {
      setAnimated(true);
    }
  }, [visible, animated]);

  return (
    <section
      id="skills"
      style={{
        padding: '100px 24px',
        background: '#111114',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div ref={ref} style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            marginBottom: '48px',
            color: '#F2F0EB',
            textAlign: 'center',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
          }}
        >
          Skills & <span style={{ color: '#7C3AED' }}>Expertise</span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {SKILLS.map((skill, i) => (
            <div
              key={skill.name}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.5s ease-out ${i * 0.08}s, transform 0.5s ease-out ${i * 0.08}s`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <span style={{ color: '#F2F0EB', fontSize: '0.9rem' }}>{skill.name}</span>
                <span style={{ color: 'rgba(242,240,235,0.5)', fontSize: '0.85rem' }}>
                  {skill.level}%
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '8px',
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: animated ? `${skill.level}%` : '0%',
                    height: '100%',
                    background: '#7C3AED',
                    borderRadius: '9999px',
                    transition: `width 1s ease-out ${0.3 + i * 0.1}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── About Section ──
function AboutSection() {
  const [ref, visible] = useScrollReveal();
  return (
    <section
      id="about"
      style={{
        padding: '100px 24px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div ref={ref} style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            marginBottom: '12px',
            color: '#F2F0EB',
            textAlign: 'center',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
          }}
        >
          About <span style={{ color: '#7C3AED' }}>Me</span>
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            color: 'rgba(242,240,235,0.5)',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto 48px',
            lineHeight: 1.7,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s',
          }}
        >
          A passionate full-stack developer and freelancer with 2 years of
          experience building real-world web applications. Currently training at
          kLab Rwanda, I thrive on turning complex problems into clean, scalable
          solutions.
        </p>

        {/* Experience Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {EXPERIENCES.map((exp, i) => {
            const isCurrent = exp.period.includes('Present');
            const typeColors = {
              Trainee:    { bg: 'rgba(34,197,94,0.12)',  color: '#22C55E' },
              Internship: { bg: 'rgba(59,130,246,0.12)', color: '#3B82F6' },
              Freelance:  { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B' },
            };
            const badge = typeColors[exp.type] || typeColors.Internship;

            return (
              <div
                key={exp.role}
                style={{
                  background: '#1A1A1F',
                  border: `1px solid ${isCurrent ? 'rgba(124,58,237,0.35)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: '16px',
                  padding: '28px',
                  position: 'relative',
                  paddingLeft: '36px',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.5s ease-out ${0.1 + i * 0.1}s, transform 0.5s ease-out ${0.1 + i * 0.1}s`,
                  boxShadow: isCurrent ? '0 0 20px rgba(124,58,237,0.08)' : 'none',
                }}
              >
                {/* Timeline dot */}
                <div
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '32px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: isCurrent ? '#22C55E' : '#7C3AED',
                    boxShadow: isCurrent ? '0 0 6px rgba(34,197,94,0.6)' : 'none',
                  }}
                />
                {i < EXPERIENCES.length - 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      left: '18px',
                      top: '42px',
                      width: '2px',
                      height: 'calc(100% + 24px)',
                      background: 'rgba(124,58,237,0.2)',
                    }}
                  />
                )}

                {/* Header row */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '6px',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '2px' }}>
                      <h3
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontWeight: 700,
                          fontSize: '1.05rem',
                          color: '#F2F0EB',
                          margin: 0,
                        }}
                      >
                        {exp.role}
                      </h3>
                      {/* Type badge */}
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '9999px',
                          background: badge.bg,
                          color: badge.color,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {exp.type}
                      </span>
                      {isCurrent && (
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            background: 'rgba(34,197,94,0.12)',
                            color: '#22C55E',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
                          Current
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.875rem',
                          color: '#7C3AED',
                          fontWeight: 600,
                        }}
                      >
                        {exp.company}
                      </span>
                      {exp.location && (
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.78rem',
                            color: 'rgba(242,240,235,0.4)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px',
                          }}
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.75rem',
                      color: 'rgba(242,240,235,0.4)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {exp.period}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.875rem',
                    color: 'rgba(242,240,235,0.55)',
                    lineHeight: 1.7,
                    marginTop: '8px',
                  }}
                >
                  {exp.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Contact Section ──
function ContactSection() {
  const [ref, visible] = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = useCallback((e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!form.name || !form.email || !form.message) return;
      const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
      );
      window.location.href = `mailto:asaaziza574@gmail.com?subject=${subject}&body=${body}`;
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    },
    [form]
  );

  const inputStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.9rem',
    padding: '14px 16px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.08)',
    background: '#0D0D0F',
    color: '#F2F0EB',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  const contactCards = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: 'Email',
      value: 'asaaziza574@gmail.com',
      href: 'mailto:asaaziza574@gmail.com',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: 'Phone',
      value: '+250 791 168 562',
      href: 'tel:+250791168562',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      label: 'LinkedIn',
      value: 'afadhali-aziza-solace',
      href: 'https://www.linkedin.com/in/afadhali-aziza-solace-2b992639b',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      label: 'GitHub',
      value: 'github.com/aziza20-ux',
      href: 'https://github.com/aziza20-ux',
    },
  ];

  return (
    <section
      id="contact"
      style={{
        padding: '100px 24px',
        background: '#111114',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div ref={ref} style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            marginBottom: '12px',
            color: '#F2F0EB',
            textAlign: 'center',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
          }}
        >
          Get In <span style={{ color: '#7C3AED' }}>Touch</span>
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            color: 'rgba(242,240,235,0.5)',
            textAlign: 'center',
            marginBottom: '48px',
            lineHeight: 1.7,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s',
          }}
        >
          Have a project in mind? Let's build something great together.
        </p>

        {/* Contact Info Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: '16px',
            marginBottom: '48px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.5s ease-out 0.15s, transform 0.5s ease-out 0.15s',
          }}
        >
          {contactCards.map((card) => (
            <a
              key={card.label}
              href={card.href}
              target={card.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 18px',
                background: '#1A1A1F',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '14px',
                textDecoration: 'none',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#7C3AED';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(124,58,237,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7C3AED',
                  flexShrink: 0,
                }}
              >
                {card.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(242,240,235,0.4)', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {card.label}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#F2F0EB', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {card.value}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: '#1A1A1F',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '20px',
            padding: '36px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.5s ease-out 0.25s, transform 0.5s ease-out 0.25s',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = '#7C3AED')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                type="email"
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = '#7C3AED')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={5}
              required
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={(e) => (e.target.style.borderColor = '#7C3AED')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                type="submit"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  padding: '14px 32px',
                  borderRadius: '9999px',
                  background: '#7C3AED',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#8B5CF6')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#7C3AED')}
              >
                {sent ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Opening Email App...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: 'rgba(242,240,235,0.35)' }}>
                Opens your email app with the message pre-filled
              </span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

// ── Footer ──
function Footer() {
  return (
    <footer
      style={{
        padding: '32px 24px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            color: 'rgba(242,240,235,0.4)',
            fontSize: '0.85rem',
          }}
        >
          © {new Date().getFullYear()} Aziza<span style={{ color: '#7C3AED' }}>.</span> All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: '16px' }}>
          {SOCIAL_LINKS.filter((s) => s.name !== 'Phone').map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.name}
              style={{
                color: 'rgba(242,240,235,0.3)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#7C3AED')}
              onMouseLeave={(e) => (e.target.style.color = 'rgba(242,240,235,0.3)')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d={social.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────

function App() {
  const activeSection = useActiveSection();
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-theme');
    } else {
      root.classList.remove('light-theme');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--bg-color)',
        color: 'var(--text-color)',
        transition: 'background-color 0.25s ease, color 0.25s ease',
      }}
    >
      <CursorBlob />
      <Navbar activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <StatsBar />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;