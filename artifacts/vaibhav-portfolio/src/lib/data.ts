export const personal = {
  name: 'Vaibhav Tandon',
  shortName: 'VT.',
  email: 'vaibhavtdn06@gmail.com',
  phone: '+91 9911229707',
  location: 'Jaipur, India',
  headline: 'Software developer building AI-powered systems, backend infrastructure, and full-stack applications.',
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
  { number: '01', title: 'AI / ML Systems', icon: 'spark', text: 'AI-powered pipelines, NLP, LangChain, Cohere, spaCy, PaddleOCR, and Scikit-learn.' },
  { number: '02', title: 'Backend Engineering', icon: 'server', text: 'FastAPI, REST APIs, Redis, Qdrant, PostgreSQL, SQLite, Pydantic, and SQLAlchemy.' },
  { number: '03', title: 'Full-Stack Applications', icon: 'layers', text: 'React, React Native, TypeScript, Tailwind CSS, and Vite for practical product work.' },
  { number: '04', title: 'Infrastructure & Observability', icon: 'activity', text: 'Docker, Docker Compose, OpenTelemetry, Prometheus, Grafana, and Gunicorn.' },
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
  },
  {
    company: 'Google Developer Groups (GDG) On Campus – LNMIIT',
    role: 'Technical Member — AI/ML Domain',
    dates: 'Aug 2025 – May 2026',
    place: 'Jaipur, India',
    description: 'Collaborated on AI/ML and full-stack development initiatives across technical workshops addressing real campus problems.',
    detail: 'Desportivos · official college sports fest website',
    technologies: 'React.js · Tailwind CSS · 8-member team · 2,000+ attendees',
  },
];

export const projects = [
  {
    number: '01',
    name: 'FlowGate',
    subtitle: 'Unified LLM Gateway & Control Plane',
    type: 'flowgate',
    description: 'Architected an OpenAI-compatible LLM gateway that unified semantic caching, Redis-backed rate limiting, budget enforcement, and multi-provider routing for OpenAI and Anthropic. Its Qdrant cache uses adaptive similarity thresholds and TTL invalidation.',
    tags: ['Python 3.11', 'Redis', 'Qdrant', 'Docker', 'OpenTelemetry', 'Prometheus', 'Grafana', 'Gunicorn'],
    capabilities: ['Semantic Cache', 'Rate Limiting', 'Budget Enforcement', 'Provider Routing', 'Priority Queuing', 'Retries & Circuit Breakers', 'Tier-Based Fallback', 'Observability'],
    metrics: [
      ['49.5%', 'semantic-cache hit rate'],
      ['5,000+', 'concurrent requests'],
      ['sub-millisecond', 'middleware overhead'],
    ],
  },
  {
    number: '02',
    name: 'LowKey Secure',
    subtitle: 'Privacy-First Event Access System',
    type: 'secure',
    description: 'Established a consent-first identity platform with Role-Based Access Control across 3 user roles and structured approval workflows. Its Llama-3 Privacy Advisor (via Groq) processes numerical risk statistics only, with zero PII transmission.',
    tags: ['React 19', 'FastAPI', 'SQLite', 'JWT', 'bcrypt', 'RSA-256', 'SHA-256', 'Tailwind CSS'],
    capabilities: ['Role-Based Access Control', 'Privacy Risk Classification', 'Approval Workflows', 'Anonymized Attendance', 'Llama-3 via Groq'],
    metrics: [
      ['3', 'user roles'],
      ['HIGH / MEDIUM / LOW', 'risk levels'],
      ['0 PII', 'AI advisor input'],
    ],
  },
  {
    number: '03',
    name: 'LENS',
    subtitle: 'AI-Powered ESG Claim Verification Platform',
    type: 'lens',
    description: 'Developed an AI-driven pipeline using PyMuPDF and LangChain with Cohere to parse sustainability reports and extract structured ESG claims. A spaCy-based verification engine cross-references corporate facilities with OpenWeatherMap and Google News RSS.',
    tags: ['FastAPI', 'LangChain', 'CohereLLM', 'spaCy', 'Tailwind CSS', 'Leaflet', 'React'],
    capabilities: ['ESG Claim Extraction', 'Entity Recognition', 'OpenWeatherMap Evidence', 'Google News RSS Evidence', 'Facility Tracking', 'Risk Scoring', 'Transparent Explanations'],
    metrics: [
      ['PyMuPDF', 'document parsing'],
      ['2', 'external evidence sources'],
      ['Leaflet', 'facility tracking'],
    ],
  },
] as const;

export const stack = [
  ['Languages', ['Python', 'Java', 'JavaScript (ES6+)', 'TypeScript', 'SQL', 'Solidity', 'HTML/CSS', 'Golang']],
  ['Backend & APIs', ['FastAPI', 'Spring Boot', 'REST APIs', 'Pydantic', 'SQLAlchemy', 'httpx', 'Uvicorn', 'Gunicorn']],
  ['Data & Storage', ['Redis', 'Qdrant', 'PostgreSQL', 'SQLite', 'Firebase Realtime Database']],
  ['Cloud / DevOps / Observability', ['Docker', 'Docker Compose', 'OpenTelemetry', 'Prometheus', 'Grafana', 'Google Cloud Platform (GCP)', 'Vertex AI', 'Git', 'GitHub']],
  ['Frontend / App Development', ['React.js', 'React Native', 'Streamlit', 'Tailwind CSS', 'Vite']],
  ['AI / ML', ['LangChain', 'spaCy', 'PaddleOCR', 'Scikit-learn', 'Pandas', 'NumPy', 'NLP Pipelines']],
  ['Security & Authentication', ['JWT', 'RBAC', 'Bcrypt', 'SHA-256', 'RSA-256']],
] as const;