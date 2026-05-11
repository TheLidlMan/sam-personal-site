import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import './styles.css';

const sections = [
  { id: 'identity', label: 'Identity', code: '00' },
  { id: 'areas', label: 'Operating areas', code: '01' },
  { id: 'systems', label: 'Selected systems', code: '02' },
  { id: 'context', label: 'Context', code: '03' },
  { id: 'routes', label: 'Routes', code: '04' },
];

const domains = [
  { id: 'automation', label: 'AI automation', x: 54, y: 14 },
  { id: 'web', label: 'web tools', x: 22, y: 31 },
  { id: 'infra', label: 'infrastructure', x: 68, y: 39 },
  { id: 'security', label: 'security', x: 37, y: 58 },
  { id: 'data', label: 'data analysis', x: 79, y: 68 },
  { id: 'client', label: 'client-side apps', x: 16, y: 76 },
];

const operatingAreas = [
  {
    code: 'OP-01',
    title: 'Automation that survives contact with real life',
    body: 'Agents, workflows, glue code, and small systems that remove boring work rather than dressing it up.',
    tags: ['AI agents', 'workflows', 'tooling'],
  },
  {
    code: 'OP-02',
    title: 'Web tools with a job to do',
    body: 'Interfaces for useful work: client-side apps, data inspection, small products, and maintenance-heavy websites.',
    tags: ['React', 'JavaScript', 'client-side'],
  },
  {
    code: 'OP-03',
    title: 'Infrastructure as a personal operating layer',
    body: 'Homelab, Linux, DNS, deployments, monitoring, and the unglamorous parts that make software actually stay up.',
    tags: ['Linux', 'homelab', 'ops'],
  },
  {
    code: 'OP-04',
    title: 'Security as a way of thinking',
    body: 'Studying Computer Science / IT Security at Royal Holloway, with an eye for systems, failure modes, privacy, and incentives.',
    tags: ['IT Security', 'RHUL', 'systems'],
  },
  {
    code: 'OP-05',
    title: 'Data you can inspect instead of just export',
    body: 'Taking messy personal or product data and turning it into something understandable, local, and useful.',
    tags: ['analysis', 'visualisation', 'local-first'],
  },
];

const systems = [
  {
    code: 'SYS-01',
    title: 'Instagram Analyser',
    status: 'shipped',
    year: '2025',
    lead: 'A client-side web application for analysing Instagram direct-message export data.',
    detail: 'Built around local analysis: raw archive files become clearer patterns without needing a server-side upload flow.',
    tags: ['JavaScript', 'data analysis', 'client-side', 'privacy-aware'],
    links: [
      { label: 'Live', href: 'https://analysis.thelidlman.com' },
      { label: 'GitHub', href: 'https://github.com/TheLidlMan/Instagram-Analyser' },
    ],
  },
  {
    code: 'SYS-02',
    title: 'Pat Mooney Counselling website',
    status: 'maintained',
    year: '2019–now',
    lead: 'Client website design, development, and ongoing management.',
    detail: 'A long-running client site: HTML, CSS, JavaScript, updates, uptime, troubleshooting, and turning client requirements into a calm public surface.',
    tags: ['client work', 'HTML/CSS/JS', 'maintenance', 'reliability'],
    links: [],
  },
  {
    code: 'SYS-03',
    title: 'Rlly / Rlly-AI orbit',
    status: 'active',
    year: 'current',
    lead: 'Public activity connected to AI-focused software projects and automation tooling.',
    detail: 'Kept deliberately modest here: enough to mark the direction without pretending public snippets reveal the whole machine.',
    tags: ['AI', 'automation', 'product', 'software'],
    links: [{ label: 'GitHub org', href: 'https://github.com/Rlly-AI' }],
  },
  {
    code: 'SYS-04',
    title: 'Public experiments',
    status: 'ongoing',
    year: '2020–now',
    lead: 'A trail of Python, TypeScript, documentation, student projects, and infrastructure experiments.',
    detail: 'Some polished, some rough, some abandoned. Good. That is what a real public workshop looks like.',
    tags: ['Python', 'TypeScript', 'docs', 'student work'],
    links: [{ label: 'GitHub', href: 'https://github.com/TheLidlMan' }],
  },
];

const focusNotes = [
  ['current focus', 'AI agents, practical automation, and web tools that remove friction'],
  ['studying', 'Computer Science / IT Security at Royal Holloway, University of London'],
  ['building mode', 'public-safe experiments, client work, infrastructure, and local-first utilities'],
  ['not interested in', 'portfolio theatre, fake metrics, or pretending old blog posts are a personality'],
];

function useActiveSection() {
  const [active, setActive] = useState('identity');
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: '-18% 0px -55% 0px', threshold: [0.15, 0.35, 0.6] }
    );
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

function useCommandPalette() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKeyDown = event => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(value => !value);
      }
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
  return { open, setOpen };
}

function Sidebar({ active }) {
  return (
    <aside className="sidebar" aria-label="Section navigation">
      <a className="brand" href="#identity" aria-label="Sam Matthews home">
        <span className="brand-mark">SM</span>
        <span>
          <strong>Sam Matthews</strong>
          <small>Node 0 / public interface</small>
        </span>
      </a>
      <nav className="index-list">
        {sections.map(section => (
          <a key={section.id} className={active === section.id ? 'active' : ''} href={`#${section.id}`}>
            <span>{section.code}</span>
            {section.label}
          </a>
        ))}
      </nav>
      <p className="sidebar-note">Public-safe surface. No private life dump. No fake founder mythology.</p>
    </aside>
  );
}

function Topbar({ active, menuOpen, setMenuOpen }) {
  const activeSection = sections.find(section => section.id === active);
  return (
    <div className="topbar">
      <a href="#identity" className="topbar-brand">SAM / NODE 0</a>
      <span className="topbar-active">{activeSection?.code} {activeSection?.label}</span>
      <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
        {menuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>
    </div>
  );
}

function Inspector({ active }) {
  const data = {
    identity: ['surface: public', 'location: UK', 'mode: systems profile'],
    areas: ['mode: capabilities', 'evidence: below', 'style: no buzzword soup'],
    systems: ['mode: case files', 'status: public links only', 'claims: deliberately modest'],
    context: ['mode: background', 'archive: reduced', 'privacy: not overplayed'],
    routes: ['mode: contact', 'channels: GitHub / LinkedIn', 'friction: low'],
  }[active] || [];

  return (
    <aside className="inspector" aria-label="Current section metadata">
      <div className="inspector-card">
        <p className="eyebrow">system inspector</p>
        <ul>
          {data.map(item => <li key={item}>{item}</li>)}
        </ul>
      </div>
      <div className="inspector-card muted">
        <p className="eyebrow">current focus</p>
        <p>Automation, web tooling, infrastructure, security learning, and useful systems.</p>
      </div>
    </aside>
  );
}

function NodeMap({ activeDomain }) {
  const lines = [
    ['automation', 'web'], ['automation', 'infra'], ['web', 'client'], ['client', 'data'], ['infra', 'security'], ['security', 'data'], ['web', 'security']
  ];
  const lookup = Object.fromEntries(domains.map(domain => [domain.id, domain]));
  return (
    <div className="node-map" aria-label="Map of Sam's public work domains">
      <svg viewBox="0 0 100 90" role="img" aria-labelledby="node-title">
        <title id="node-title">A schematic of work domains: AI automation, web tools, infrastructure, security, data analysis, and client-side apps.</title>
        {lines.map(([from, to]) => {
          const a = lookup[from];
          const b = lookup[to];
          const hot = activeDomain === from || activeDomain === to;
          return <line key={`${from}-${to}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={hot ? 'hot' : ''} />;
        })}
        {domains.map(domain => (
          <g key={domain.id} className={activeDomain === domain.id ? 'domain active-domain' : 'domain'}>
            <circle cx={domain.x} cy={domain.y} r="3.2" />
            <text x={domain.x + 4.5} y={domain.y + 1.5}>{domain.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function ExternalLink({ href, children }) {
  return (
    <a className="external" href={href} target="_blank" rel="noopener noreferrer">
      {children}<ArrowUpRight size={14} aria-hidden="true" />
    </a>
  );
}

function CommandPalette({ open, setOpen }) {
  const commands = useMemo(() => [
    ...sections.map(section => ({ label: `Go to ${section.label}`, href: `#${section.id}` })),
    { label: 'Open GitHub', href: 'https://github.com/TheLidlMan', external: true },
    { label: 'Open LinkedIn', href: 'https://uk.linkedin.com/in/sam--matthews', external: true },
  ], []);
  if (!open) return null;
  return (
    <div className="palette-backdrop" onClick={() => setOpen(false)} role="presentation">
      <div className="palette" role="dialog" aria-modal="true" aria-label="Command palette" onClick={event => event.stopPropagation()}>
        <div className="palette-header">
          <span>Command surface</span>
          <kbd>Esc</kbd>
        </div>
        {commands.map(command => (
          <a key={command.label} href={command.href} target={command.external ? '_blank' : undefined} rel={command.external ? 'noopener noreferrer' : undefined} onClick={() => setOpen(false)}>
            <span>{command.label}</span>
            <small>{command.external ? 'external' : 'jump'}</small>
          </a>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="identity" className="hero section-panel">
      <div className="section-code">00 / identity</div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">UK · Royal Holloway · public interface</p>
          <h1>Practical systems for messy real-world problems.</h1>
          <p className="lead">
            I’m Sam Matthews — a Computer Science / IT Security student at Royal Holloway building web tools, automation, infrastructure experiments, and data-focused software.
          </p>
          <p className="hero-truth">
            Not another beige portfolio. This is the public edge of a workshop: useful projects, systems thinking, and evidence over theatre.
          </p>
          <div className="hero-actions" aria-label="Primary links">
            <a href="#systems">View selected systems</a>
            <ExternalLink href="https://github.com/TheLidlMan">GitHub</ExternalLink>
            <ExternalLink href="https://uk.linkedin.com/in/sam--matthews">LinkedIn</ExternalLink>
          </div>
        </div>
        <div className="hero-map">
          <NodeMap />
          <div className="map-caption">
            <span>node map</span>
            <strong>automation / web / infra / data / security</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

function Areas() {
  const [activeDomain, setActiveDomain] = useState('automation');
  const mapIds = ['automation', 'web', 'infra', 'security', 'data'];
  return (
    <section id="areas" className="section-panel areas">
      <div className="section-heading">
        <p className="eyebrow">01 / operating areas</p>
        <h2>Capabilities, not keyword confetti.</h2>
        <p>These are the zones where the work keeps recurring. Some academic, some client-facing, some from the personal lab where weird useful things are born.</p>
      </div>
      <div className="areas-layout">
        <div className="area-list">
          {operatingAreas.map((area, index) => (
            <article key={area.code} className="area-row" onMouseEnter={() => setActiveDomain(mapIds[index])}>
              <span className="row-code">{area.code}</span>
              <div>
                <h3>{area.title}</h3>
                <p>{area.body}</p>
                <div className="tags">{area.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
        <NodeMap activeDomain={activeDomain} />
      </div>
    </section>
  );
}

function Systems() {
  return (
    <section id="systems" className="section-panel systems">
      <div className="section-heading">
        <p className="eyebrow">02 / selected systems</p>
        <h2>Case files from the public workshop.</h2>
        <p>No fake user numbers. No heroic origin stories. Just the projects that say something useful about how Sam builds.</p>
      </div>
      <div className="system-list">
        {systems.map(system => (
          <article key={system.code} className="system-card">
            <div className="system-meta">
              <span>{system.code}</span>
              <span>{system.year}</span>
            </div>
            <div className="system-body">
              <div className="system-title-line">
                <h3>{system.title}</h3>
                <span className="status">{system.status}</span>
              </div>
              <p className="system-lead">{system.lead}</p>
              <p>{system.detail}</p>
              <div className="tags">{system.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            </div>
            <div className="system-links">
              {system.links.length ? system.links.map(link => <ExternalLink key={link.href} href={link.href}>{link.label}</ExternalLink>) : <span className="quiet">public link not listed</span>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Context() {
  return (
    <section id="context" className="section-panel context">
      <div className="section-heading">
        <p className="eyebrow">03 / context</p>
        <h2>The useful version of the about page.</h2>
      </div>
      <div className="context-grid">
        <div className="context-copy">
          <p>
            Sam is a UK-based student at Royal Holloway, University of London, studying Computer Science / IT Security and building public software around web tools, automation, data analysis, and infrastructure.
          </p>
          <p>
            The old site leaned heavily on privacy guides and homelab notes. That history still matters, but it is not the whole story. The current direction is broader: practical systems, AI-assisted workflows, client-facing web work, and tools that make messy data or messy processes easier to inspect.
          </p>
          <p>
            This site is intentionally public-safe. It shows work, direction, and taste without turning private memory into internet confetti. A bold innovation. Apparently necessary.
          </p>
        </div>
        <div className="focus-table">
          {focusNotes.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Routes() {
  return (
    <section id="routes" className="section-panel routes">
      <div className="section-heading">
        <p className="eyebrow">04 / routes</p>
        <h2>If it’s useful, strange, or technically annoying, route it here.</h2>
        <p>Best for software projects, automation, infrastructure, web development, AI tooling, or anything that needs someone who will actually open the black box.</p>
      </div>
      <div className="route-grid">
        <ExternalLink href="https://github.com/TheLidlMan"><span aria-hidden="true">git</span> GitHub / TheLidlMan</ExternalLink>
        <ExternalLink href="https://uk.linkedin.com/in/sam--matthews"><span aria-hidden="true">in</span> LinkedIn / Sam Matthews</ExternalLink>
        <a className="external" href="https://sammatthews.co.uk"><span>Legacy domain / sammatthews.co.uk</span><ArrowUpRight size={14} /></a>
      </div>
    </section>
  );
}

function App() {
  const active = useActiveSection();
  const { open, setOpen } = useCommandPalette();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className="page-shell">
        <Topbar active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        {menuOpen && (
          <nav className="mobile-menu" aria-label="Mobile navigation">
            {sections.map(section => <a key={section.id} href={`#${section.id}`} onClick={() => setMenuOpen(false)}>{section.code} / {section.label}</a>)}
          </nav>
        )}
        <Sidebar active={active} />
        <main>
          <Hero />
          <Areas />
          <Systems />
          <Context />
          <Routes />
          <footer>
            <span>Sam Matthews</span>
            <span>Built as a public-safe personal interface.</span>
            <button type="button" onClick={() => setOpen(true)}>Ctrl K</button>
          </footer>
        </main>
        <Inspector active={active} />
      </div>
      <CommandPalette open={open} setOpen={setOpen} />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
