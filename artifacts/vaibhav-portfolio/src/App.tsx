import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Activity, ArrowDownRight, ArrowUpRight, ExternalLink, Layers3, Mail, Menu, Moon, Server, Sparkles, Sun, X } from 'lucide-react';
import { education, experience, focusAreas, personal, projects, stack } from '@/lib/data';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = '', delay = '' }: { children: ReactNode; className?: string; delay?: string }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${delay} ${className}`}>{children}</div>;
}

function ArchitectureVisual({ type }: { type: string }) {
  if (type === 'flowgate') {
    return (
      <svg viewBox="0 0 520 360" role="img" aria-label="FlowGate request gateway, policy, provider and telemetry architecture diagram">
        <defs><marker id="arrow-flow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7" fill="none" stroke="currentColor" /></marker></defs>
        <text x="30" y="41" fontSize="10" className="mono" fill="currentColor">REQUEST PATH / 01</text>
        <rect x="30" y="70" width="106" height="52" className="svg-soft" /><text x="55" y="101" fontSize="12" className="mono" fill="currentColor">REQUEST</text>
        <path d="M136 96 H174" className="svg-line" fill="none" markerEnd="url(#arrow-flow)" />
        <rect x="174" y="70" width="116" height="52" className="svg-accent" /><text x="198" y="101" fontSize="12" className="mono" fill="#0a0a0a">GATEWAY</text>
        <path d="M290 96 H332" className="svg-line" fill="none" markerEnd="url(#arrow-flow)" />
        <rect x="332" y="48" width="150" height="96" className="svg-soft" />
        <text x="348" y="73" fontSize="10" className="mono" fill="currentColor">POLICY LAYER</text>
        <text x="348" y="97" fontSize="11" className="mono" fill="currentColor">cache / budget</text>
        <text x="348" y="119" fontSize="11" className="mono" fill="currentColor">route / fallback</text>
        <path d="M232 122 V192 H110 V234" className="svg-line" fill="none" markerEnd="url(#arrow-flow)" />
        <path d="M232 192 H410 V234" className="svg-line" fill="none" markerEnd="url(#arrow-flow)" />
        <rect x="38" y="234" width="145" height="55" className="svg-soft" /><text x="60" y="267" fontSize="11" className="mono" fill="currentColor">OPENAI</text>
        <rect x="338" y="234" width="145" height="55" className="svg-soft" /><text x="361" y="267" fontSize="11" className="mono" fill="currentColor">ANTHROPIC</text>
        <path d="M110 289 V321 H410 V289" className="svg-line" fill="none" markerEnd="url(#arrow-flow)" />
        <text x="202" y="342" fontSize="10" className="mono" fill="currentColor">OTEL / PROM / GRAFANA</text>
      </svg>
    );
  }
  if (type === 'secure') {
    return (
      <svg viewBox="0 0 520 360" role="img" aria-label="LowKey Secure identity, permissions, shield and approval flow diagram">
        <text x="32" y="42" fontSize="10" className="mono" fill="currentColor">CONSENT-FIRST ACCESS / 02</text>
        <circle cx="110" cy="132" r="56" className="svg-soft" /><circle cx="110" cy="132" r="32" fill="none" className="svg-line" /><circle cx="110" cy="132" r="7" className="svg-accent" />
        <text x="78" y="224" fontSize="11" className="mono" fill="currentColor">IDENTITY</text>
        <path d="M166 132 H220" className="svg-line" fill="none" />
        <rect x="220" y="80" width="106" height="104" className="svg-accent" />
        <path d="M273 105 l23 9 v19 c0 25-23 36-23 36s-23-11-23-36v-19z" fill="none" stroke="#0a0a0a" strokeWidth="2" />
        <path d="M263 133 l8 8 15-17" fill="none" stroke="#0a0a0a" strokeWidth="2" />
        <text x="237" y="224" fontSize="11" className="mono" fill="currentColor">PERMISSIONS</text>
        <path d="M326 132 H380" className="svg-line" fill="none" />
        <rect x="380" y="80" width="108" height="104" className="svg-soft" />
        <path d="M403 132 h60 M433 102 v60" className="svg-line" fill="none" />
        <circle cx="433" cy="132" r="23" fill="none" className="svg-line" />
        <text x="403" y="224" fontSize="11" className="mono" fill="currentColor">APPROVAL</text>
        <text x="41" y="304" fontSize="10" className="mono" fill="currentColor">ADMIN</text><text x="218" y="304" fontSize="10" className="mono" fill="currentColor">CLUB LEAD</text><text x="415" y="304" fontSize="10" className="mono" fill="currentColor">STUDENT</text>
        <path d="M78 322 H460" className="svg-line" fill="none" strokeDasharray="4 6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 520 360" role="img" aria-label="LENS document to ESG claim, evidence and map verification diagram">
      <defs><marker id="arrow-lens" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7" fill="none" stroke="currentColor" /></marker></defs>
      <text x="32" y="42" fontSize="10" className="mono" fill="currentColor">EVIDENCE GRAPH / 03</text>
      <rect x="32" y="86" width="95" height="121" className="svg-soft" /><path d="M54 117 h52 M54 135 h38 M54 153 h45 M54 171 h28" className="svg-line" fill="none" /><text x="49" y="232" fontSize="10" className="mono" fill="currentColor">REPORT.PDF</text>
      <path d="M127 145 H180" className="svg-line" fill="none" markerEnd="url(#arrow-lens)" />
      <rect x="180" y="86" width="122" height="121" className="svg-accent" /><text x="198" y="128" fontSize="12" className="mono" fill="#0a0a0a">CLAIMS</text><text x="198" y="151" fontSize="10" className="mono" fill="#0a0a0a">extract</text><text x="198" y="168" fontSize="10" className="mono" fill="#0a0a0a">entities</text>
      <path d="M302 145 H352" className="svg-line" fill="none" markerEnd="url(#arrow-lens)" />
      <rect x="352" y="75" width="136" height="75" className="svg-soft" /><text x="371" y="105" fontSize="10" className="mono" fill="currentColor">EVIDENCE</text><text x="371" y="127" fontSize="10" className="mono" fill="currentColor">weather / news</text>
      <rect x="352" y="174" width="136" height="75" className="svg-soft" /><text x="371" y="204" fontSize="10" className="mono" fill="currentColor">FACILITY MAP</text><circle cx="463" cy="213" r="9" fill="none" className="svg-accent" /><path d="M463 200v26 M450 213h26" className="svg-accent" fill="none" />
      <path d="M302 207 H330 V274 H410" className="svg-line" fill="none" markerEnd="url(#arrow-lens)" /><text x="32" y="307" fontSize="10" className="mono" fill="currentColor">TRANSPARENT RISK SCORING</text>
    </svg>
  );
}

function Icon({ name }: { name: string }) {
  if (name === 'spark') return <Sparkles size={17} strokeWidth={1.7} />;
  if (name === 'server') return <Server size={17} strokeWidth={1.7} />;
  if (name === 'layers') return <Layers3 size={17} strokeWidth={1.7} />;
  return <Activity size={17} strokeWidth={1.7} />;
}

function Header({ theme, setTheme }: { theme: 'light' | 'dark'; setTheme: (theme: 'light' | 'dark') => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const links = [['about', 'About'], ['experience', 'Experience'], ['projects', 'Projects'], ['stack', 'Stack'], ['contact', 'Contact']];
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);
  useEffect(() => {
    const sections = ['home', ...links.map(([id]) => id)].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0.12, 0.3, 0.6] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  const go = (id: string) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="site-shell">
        <div className="flex h-[72px] items-center justify-between">
          <button className="display text-[1.25rem] font-extrabold tracking-[-.08em]" onClick={() => go('home')} aria-label="Go to home">VT<span className="orange">.</span></button>
          <nav className="desktop-nav flex items-center gap-7" aria-label="Main navigation">
            {links.map(([id, label]) => <a key={id} href={`#${id}`} className={`nav-link text-[11px] font-bold uppercase tracking-[.08em] ${active === id ? 'active' : ''}`} onClick={(event) => { event.preventDefault(); go(id); }}>{label}</a>)}
            <button className="button-solid min-h-[38px] px-4 text-[10px]" onClick={() => go('contact')}>Contact Me <ArrowUpRight size={14} /></button>
          </nav>
          <div className="flex items-center gap-2">
            <button className="theme-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <button className="menu-button md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </div>
        <nav id="mobile-navigation" className={`mobile-drawer md:hidden ${open ? 'open' : ''}`} aria-label="Mobile navigation">
          <div className="grid gap-5 border-t thin-rule py-6">
            {links.map(([id, label]) => <a key={id} href={`#${id}`} className={`nav-link text-sm font-bold uppercase tracking-[.08em] ${active === id ? 'active' : ''}`} onClick={(event) => { event.preventDefault(); go(id); }}>{label}</a>)}
          </div>
        </nav>
      </div>
    </header>
  );
}

function SectionHeading({ number, title, soft, note, id }: { number: string; title: string; soft?: string; note?: string; id?: string }) {
  return <div className="section-head"><div className="section-index eyebrow">{number} / 07</div><div><h2 id={id} className="section-title display">{title} {soft && <span className="soft">{soft}</span>}</h2>{note && <p className="section-note">{note}</p>}</div></div>;
}

function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'validated'>('idle');
  const update = (field: keyof typeof values, value: string) => { setValues((current) => ({ ...current, [field]: value })); setErrors((current) => ({ ...current, [field]: '' })); setStatus('idle'); };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = 'Name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid email address.';
    if (!values.subject.trim()) next.subject = 'Subject is required.';
    if (!values.message.trim()) next.message = 'Message is required.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus('submitting');
    window.setTimeout(() => setStatus('validated'), 450);
  };
  return <form className="contact-form" onSubmit={submit} noValidate aria-label="Contact form">
    {(['name', 'email', 'subject', 'message'] as const).map((field) => {
      const label = field[0].toUpperCase() + field.slice(1);
      return <div className="field" key={field}><label htmlFor={`contact-${field}`}>{label}</label>{field === 'message' ? <textarea id={`contact-${field}`} value={values[field]} onChange={(event) => update(field, event.target.value)} placeholder={`Your ${field}`} aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `${field}-error` : undefined} /> : <input id={`contact-${field}`} type={field === 'email' ? 'email' : 'text'} value={values[field]} onChange={(event) => update(field, event.target.value)} placeholder={`Your ${field}`} aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `${field}-error` : undefined} />}{errors[field] && <span className="field-error" id={`${field}-error`} role="alert">{errors[field]}</span>}</div>;
    })}
    {status === 'validated' && <div className="form-status" role="status"><strong>Your message has been validated.</strong><br />Email delivery is not configured in this environment. Please contact me directly by email.</div>}
    <button className="button-solid" type="submit" disabled={status === 'submitting'}>{status === 'submitting' ? 'Validating…' : 'Send Message'} <ArrowUpRight size={15} /></button>
  </form>;
}

function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => localStorage.getItem('vt-theme') === 'dark' ? 'dark' : 'light');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('vt-theme', theme);
    document.title = 'Vaibhav Tandon — Software Developer';
    const description = 'Vaibhav Tandon is a software developer focused on AI/ML, backend engineering, full-stack development, and systems.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
    meta.setAttribute('content', description);
    const ld = { '@context': 'https://schema.org', '@type': 'Person', name: personal.name, email: personal.email, jobTitle: 'Software Developer', knowsAbout: ['AI/ML', 'Backend Engineering', 'Full-Stack Development', 'Systems'] };
    let script = document.getElementById('person-jsonld') as HTMLScriptElement | null;
    if (!script) { script = document.createElement('script'); script.id = 'person-jsonld'; script.type = 'application/ld+json'; document.head.appendChild(script); }
    script.textContent = JSON.stringify(ld);
  }, [theme]);
  return <div className="min-h-[100dvh]">
    <div className="grain" />
    <Header theme={theme} setTheme={setTheme} />
    <main>
      <section id="home" className="hero site-shell">
        <Reveal>
          <div className="hero-kicker eyebrow text-[11px]">AI / BACKEND / SYSTEMS</div>
          <h1 className="hero-title display mt-7">hey, I’m<br /><em>Vaibhav</em><br />Tandon<span className="orange">.</span></h1>
          <p className="hero-copy mt-8">{personal.headline} <span className="orange-mark" /></p>
          <div className="hero-actions mt-8"><a className="button-solid" href="#projects">View Projects <ArrowDownRight size={15} /></a><a className="button-ghost" href="#about">About Me</a><a className="button-ghost" href="/vaibhav-tandon-resume.pdf" target="_blank" rel="noreferrer">Resume <ExternalLink size={14} /></a></div>
          <div className="hero-socials mt-12"><a className="social-link" href={`mailto:${personal.email}`}><Mail size={13} className="mr-1 inline" />Email</a></div>
        </Reveal>
        <Reveal className="hero-visual" delay="reveal-delay-2">
          <div className="visual-frame">
            <span className="visual-label mono">VT / SYSTEMS.LOG</span>
            <svg viewBox="0 0 500 530" role="img" aria-label="Abstract technical profile visual showing a system architecture grid">
              <g opacity=".25" stroke="currentColor" strokeWidth="1">{Array.from({ length: 10 }, (_, i) => <path key={`h-${i}`} d={`M35 ${80 + i * 36} H465`} />)}{Array.from({ length: 12 }, (_, i) => <path key={`v-${i}`} d={`M${35 + i * 39} 80 V410`} />)}</g>
              <path d="M80 300 H165 V210 H250 V330 H340 V170 H420" fill="none" stroke="var(--orange)" strokeWidth="2" />
              <circle cx="80" cy="300" r="7" fill="var(--orange)" /><circle cx="165" cy="210" r="7" fill="var(--canvas)" stroke="var(--ink)" /><circle cx="250" cy="330" r="7" fill="var(--canvas)" stroke="var(--ink)" /><circle cx="340" cy="170" r="7" fill="var(--canvas)" stroke="var(--ink)" /><circle cx="420" cy="170" r="7" fill="var(--orange)" />
              <rect x="76" y="135" width="95" height="42" fill="var(--ink)" /><text x="92" y="160" fontSize="11" className="mono" fill="var(--canvas)">BUILD / TEST</text>
              <rect x="280" y="374" width="140" height="42" fill="var(--orange)" /><text x="303" y="399" fontSize="11" className="mono" fill="#0a0a0a">OBSERVE / SHIP</text>
              <text x="35" y="465" fontSize="12" className="mono" fill="currentColor">practical engineering</text><text x="35" y="488" fontSize="12" className="mono" fill="currentColor">with a systems view</text>
            </svg>
            <span className="visual-caption mono">NO PORTRAIT / JUST THE WORK</span>
          </div>
          <div className="scroll-mark mono mt-11"><span /> scroll to explore</div>
        </Reveal>
      </section>

      <section id="about" className="section site-shell">
        <Reveal><SectionHeading number="01" title="About" soft="me." note="A B.Tech student at The LNM Institute of Information Technology, interested in AI/ML, backend systems, full-stack engineering, and practical software development." /></Reveal>
        <div className="about-grid">
          <Reveal><p className="about-lede">I like working where <mark>systems meet people</mark> — turning complex workflows into software that is clear, measurable, and useful.</p><p className="about-body">My work spans AI-powered pipelines, backend infrastructure, and interfaces that make technical systems easier to operate. I am currently pursuing Communication and Computer Engineering and building through projects, internships, and campus initiatives.</p></Reveal>
          <Reveal delay="reveal-delay-2">{education.map((item, index) => <div className="academic-block" key={item.school}><div className="eyebrow text-[10px] text-[color:var(--orange)]">{item.label} / {String(index + 1).padStart(2, '0')}</div><h3>{item.school}</h3><p>{item.degree}<br />{item.dates} · {item.place}</p>{item.score && <div className="cgpa"><strong>{item.score}</strong><span className="mono text-[10px] text-[color:var(--muted-foreground)]">{item.scoreLabel}</span></div>}</div>)}</Reveal>
        </div>
      </section>

      <section className="section site-shell" aria-labelledby="focus-title">
        <Reveal><SectionHeading id="focus-title" number="02" title="What I" soft="build." note="Four connected areas of practice, from model-facing pipelines to the infrastructure that keeps them understandable in production." /></Reveal>
        <div className="focus-grid">{focusAreas.map((area, index) => <Reveal key={area.title} delay={`reveal-delay-${Math.min(index + 1, 3)}`} className="focus-card"><div className="focus-number mono">{area.number}</div><div className="focus-icon"><Icon name={area.icon} /></div><h3>{area.title}</h3><p>{area.text}</p></Reveal>)}</div>
      </section>

      <section id="experience" className="section site-shell">
        <Reveal><SectionHeading number="03" title="Experience" note="Engineering work and collaborative builds that connect technical depth with real users and real constraints." /></Reveal>
        <div className="experience-list">{experience.map((item, index) => <Reveal key={item.company} className="experience-item" delay={`reveal-delay-${index + 1}`}><div className="experience-meta"><div className="experience-dot" /><div><div className="mono text-[10px] text-[color:var(--muted-foreground)]">{item.dates}</div></div></div><div><div className="experience-company">{item.company}</div><div className="experience-role">{item.role}</div><p className="experience-copy mt-5">{item.description}</p><p className="tech-line mono">{item.technologies}</p></div><div className="experience-aside"><strong>{item.place}</strong>{item.detail}</div></Reveal>)}</div>
      </section>

      <section id="projects" className="section site-shell">
        <Reveal><SectionHeading number="04" title="Selected" soft="projects." note="Three systems, each presented as a small technical story rather than a screenshot." /></Reveal>
        <div className="projects-list">{projects.map((project, index) => <Reveal key={project.name} className={`project-row ${index === 1 ? 'reverse' : ''}`}><div className="project-visual"><ArchitectureVisual type={project.type} /></div><div><div className="project-no eyebrow">{project.number} / PROJECT</div><h3 className="project-name display">{project.name}</h3><p className="project-subtitle">{project.subtitle}</p><p className="project-description">{project.description}</p><div className="project-tags">{project.tags.map((tag) => <span className="project-tag mono" key={tag}>{tag}</span>)}</div><div className="project-capabilities">{project.capabilities.map((capability) => <span className="capability" key={capability}>{capability}</span>)}</div><div className="project-metrics">{project.metrics.map(([value, label]) => <div className="metric" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></div></Reveal>)}</div>
      </section>

      <section id="stack" className="section site-shell">
        <Reveal><SectionHeading number="05" title="Stack" soft="notes." note="Tools I have worked with across languages, services, storage, interfaces, models, and security." /></Reveal>
        <div className="stack-grid">{stack.map(([heading, items], index) => <Reveal key={heading} className="stack-group" delay={`reveal-delay-${Math.min(index + 1, 3)}`}><div className="stack-heading"><span className="mono">{String(index + 1).padStart(2, '0')}</span>{heading}</div><div className="stack-items">{items.map((item) => <span className="stack-item mono" key={item}>{item}</span>)}</div></Reveal>)}</div>
      </section>

      <section id="contact" className="contact-section section">
        <div className="site-shell"><Reveal><SectionHeading number="06" title="Contact" soft="me." note="Have a project, opportunity, or technical problem to discuss? Send me a message." /></Reveal><div className="contact-grid"><Reveal><p className="muted max-w-[340px] text-sm leading-7">The form validates your message locally. Delivery is not configured here, so direct email is the reliable route.</p><a className="contact-email" href={`mailto:${personal.email}`}><Mail size={15} /> {personal.email}</a></Reveal><Reveal delay="reveal-delay-2"><ContactForm /></Reveal></div></div>
      </section>
    </main>
    <footer className="site-footer">
      <div className="site-shell"><div className="footer-grid"><div className="display text-xl font-extrabold tracking-[-.08em]">VT<span className="orange">.</span></div><nav className="footer-links" aria-label="Footer navigation">{[['home', 'Home'], ['about', 'About'], ['projects', 'Projects'], ['contact', 'Contact']].map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav><div className="footer-socials"><a href={`mailto:${personal.email}`}>Email</a></div></div><p className="copyright mono">© {new Date().getFullYear()} Vaibhav Tandon · built around the work</p></div>
    </footer>
  </div>;
}

function App() {
  return <Home />;
}

export default App;
