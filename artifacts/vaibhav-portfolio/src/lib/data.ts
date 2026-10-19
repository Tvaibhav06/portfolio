export const personal = {
  name: 'Vaibhav Tandon',
  shortName: 'VT.',
  email: 'vaibhavtdn06@gmail.com',
  phone: '+91 9911229707',
  location: 'Jaipur, India',
  headline: 'Software developer building LLM infrastructure, AI-powered products, and privacy-conscious full-stack systems.',
  links: [
    { label: 'GitHub', url: 'https://github.com/Tvaibhav06' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/vaibhav-tandon-18280a335' },
    { label: 'LeetCode', url: 'https://leetcode.com/u/tvaibhav1306/' },
  ],
};

export const education = [
  {
    label: 'Education',
    school: 'The LNM Institute of Information Technology',
    degree: 'B.Tech in Communication and Computer Engineering',
    dates: '2024 – 2028',
    place: 'Jaipur, India',
    score: '7.34',
    scoreLabel: 'CGPA',
  },
  {
    label: 'Academic record',
    school: 'Salwan Public School',
    degree: 'CBSE Class XII: 90% · Class X: 96%',
    dates: '2022 – 2024',
    place: 'Delhi, India',
    score: null,
    scoreLabel: null,
  },
] as const;

export const focusAreas = [
  { number: '01', title: 'AI / ML Systems', icon: 'spark', text: 'LLM gateways, commerce copilots, multilingual OCR and translation, and evidence-backed ESG analysis.' },
  { number: '02', title: 'Backend Engineering', icon: 'server', text: 'FastAPI services with provider routing, Redis policies, Qdrant caching, PostgreSQL, and secure APIs.' },
  { number: '03', title: 'Full-Stack Applications', icon: 'layers', text: 'React and React Native interfaces for merchant workflows, event access, and image-text editing.' },
  { number: '04', title: 'Infrastructure & Observability', icon: 'activity', text: 'Docker Compose deployments with OpenTelemetry, Prometheus, Grafana, and production-minded safeguards.' },
] as const;

export const experience = [
  {
    company: 'Presto InfoSolutions Pvt Ltd',
    role: 'Software Engineering Intern',
    dates: 'Jun 2026 – Jul 2026',
    place: 'Delhi, India',
    description: 'Architected a 7-stage hybrid multilingual text processing pipeline for image-based text removal, OCR, translation, and re-rendering, with SSIM-driven quality assessment and intelligent fallback between on-device and backend execution paths.',
    detail: 'Supported workflows across 80+ language scripts, with style-aware re-rendering and high-resolution export.',
    technologies: 'React Native · ML Kit · OpenCV · LaMa · PaddleOCR · Argos Translate · IndicTrans2 · Skia',
    link: { label: 'Internship certificate', url: 'https://drive.google.com/file/d/1OFc1HQ5KVa0vEjSd9MD9NaqqVwXYuinv/view?usp=sharing' },
  },
  {
    company: 'Google Developer Groups (GDG) On Campus – LNMIIT',
    role: 'AI/ML Domain Member',
    dates: 'Aug 2025 – May 2026',
    place: 'Jaipur, India',
    description: 'Architected and launched the official Desportivos sports fest website in an 8-person team, using a reusable React component architecture for an event with 2,000+ attendees.',
    detail: 'Desportivos · official college domain',
    technologies: 'React.js · Tailwind CSS · 8-member team',
    link: null,
  },
];

export const projects = [
  {
    number: '01',
    name: 'FlowGate',
    subtitle: 'Unified LLM Gateway & Control Plane',
    type: 'flowgate',
    description: 'Built an OpenAI-compatible gateway for OpenAI and Anthropic with Qdrant semantic caching, Redis rate limiting, atomic token accounting, reserve-then-settle budgets, and priority routing. Retries, circuit breakers, and tier fallback support resilient requests.',
    tags: ['Python 3.11', 'FastAPI', 'Redis', 'Qdrant', 'Docker', 'OpenTelemetry', 'Prometheus', 'Grafana', 'Gunicorn'],
    capabilities: ['Semantic Cache', 'Rate Limiting', 'Budget Enforcement', 'Provider Routing', 'Priority Queuing', 'Retries & Circuit Breakers', 'Tier-Based Fallback', 'Observability'],
    metrics: [
      ['49.5%', 'semantic-cache hit rate'],
      ['5,000+', 'concurrent requests'],
      ['sub-millisecond', 'middleware overhead'],
    ],
    recognition: null,
    links: [{ label: 'Source code', url: 'https://github.com/Tvaibhav06/AI-Middleware' }],
  },
  {
    number: '02',
    name: 'BotBeacon',
    subtitle: 'AI Commerce Gateway & Merchant Growth AI',
    type: 'botbeacon',
    description: 'Built a two-sided commerce gateway with five MCP tools for catalog search, product details, carts, policy checks, and checkout. A Gemini merchant copilot streams sales insights, while n8n automates campaigns with a second policy check and an immutable audit trail.',
    tags: ['Python 3.11', 'FastAPI', 'React', 'PostgreSQL', 'SQLAlchemy', 'MCP', 'Gemini', 'n8n'],
    capabilities: ['Five MCP Commerce Tools', 'Deterministic Spending Gates', 'Merchant Policy Checks', 'Streaming Merchant Copilot', 'SQL Opportunity Detection', 'Audited Campaign Automation'],
    metrics: [
      ['5', 'MCP commerce tools'],
      ['37.5%', 'sales decline detected in demo'],
      ['2×', 'policy evaluation for campaigns'],
    ],
    recognition: 'Paytm Build for India Hackathon Finalist',
    links: [
      { label: 'Source code', url: 'https://github.com/Tvaibhav06/BotBeacon' },
      { label: 'Live demo', url: 'https://botbeacon-frontend.onrender.com/login' },
    ],
  },
  {
    number: '03',
    name: 'LowKey Secure',
    subtitle: 'Privacy-First Event Access System',
    type: 'secure',
    description: 'Built a privacy-first event access system with Admin, Club Lead, and Student roles, multistage approvals, and high/medium/low risk classification. JWT, bcrypt, RSA-256, and hashed attendance tokens protect access; a Llama-3 advisor receives numerical statistics without PII.',
    tags: ['React 19', 'FastAPI', 'SQLite', 'JWT', 'bcrypt', 'RSA-256', 'SHA-256', 'Tailwind CSS'],
    capabilities: ['Role-Based Access Control', 'Privacy Risk Classification', 'Approval Workflows', 'Anonymized Attendance', 'Llama-3 via Groq'],
    metrics: [
      ['3', 'user roles'],
      ['HIGH / MEDIUM / LOW', 'risk levels'],
      ['0 PII', 'AI advisor input'],
    ],
    recognition: null,
    links: [
      { label: 'Source code', url: 'https://github.com/Jay-Dosi/LowKey-secure' },
      { label: 'Live demo', url: 'https://lowkey-secure-noe9.onrender.com' },
    ],
  },
  {
    number: '04',
    name: 'LENS',
    subtitle: 'AI-Powered ESG Claim Verification Platform',
    type: 'lens',
    description: 'Built an ESG claim verification pipeline with PyMuPDF, LangChain, Cohere, and spaCy. It extracts claims and facilities from reports, cross-references weather and news evidence, then presents automated risk scores, explanations, and facility maps in a React dashboard.',
    tags: ['FastAPI', 'LangChain', 'CohereLLM', 'spaCy', 'Tailwind CSS', 'Leaflet', 'React'],
    capabilities: ['ESG Claim Extraction', 'Entity Recognition', 'OpenWeatherMap Evidence', 'Google News RSS Evidence', 'Facility Tracking', 'Risk Scoring', 'Transparent Explanations'],
    metrics: [
      ['PyMuPDF', 'document parsing'],
      ['2', 'external evidence sources'],
      ['Leaflet', 'facility tracking'],
    ],
    recognition: null,
    links: [{ label: 'Source code', url: 'https://github.com/Tvaibhav06/LENS-ESG-Claim-Check' }],
  },
] as const;

export const stack = [
  ['Languages', ['Python', 'Java', 'JavaScript (ES6+)', 'TypeScript', 'SQL', 'Golang']],
  ['Backend & APIs', ['FastAPI', 'Spring Boot', 'REST APIs', 'Pydantic', 'SQLAlchemy', 'httpx', 'Uvicorn', 'Gunicorn']],
  ['Data, Cloud & Operations', ['PostgreSQL', 'Redis', 'Qdrant', 'SQLite', 'Docker', 'Docker Compose', 'Google Cloud Platform', 'OpenTelemetry', 'Prometheus', 'Grafana']],
  ['Frontend & AI Engineering', ['React.js', 'React Native', 'Tailwind CSS', 'LangChain', 'Gemini API', 'Cohere', 'spaCy', 'PaddleOCR', 'OpenCV', 'PyMuPDF', 'Pandas', 'NumPy']],
  ['Security, Testing & Tools', ['JWT', 'RBAC', 'Bcrypt', 'SHA-256', 'RSA-256', 'Pytest', 'Git', 'GitHub']],
] as const;
