import {
  Braces,
  Cloud,
  Code2,
  Container,
  Database,
  Eye,
  FileCode2,
  GitBranch,
  Globe,
  Layout,
  Lightbulb,
  Link,
  Mail,
  Paintbrush,
  Palette,
  Rocket,
  Server,
  Settings,
  SquareTerminal,
  Wrench,
} from 'lucide-react';

import type {
  Experience,
  NavLink,
  ProcessStep,
  Project,
  SkillCategory,
  SocialLink,
} from '@/src/types/portfolio';

// ─── Personal Info ──────────────────────────────────────────

export const PERSONAL = {
  name: 'Priyank Khatri',
  role: 'Full Stack Developer',
  tagline: 'Full Stack Developer building scalable, user-first applications',
  email: 'priyank@example.com',
  resumeUrl: '#',
  location: 'San Francisco, CA',
} as const;

// ─── Navigation ─────────────────────────────────────────────

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

// ─── Projects ───────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id: 'cloudflow',
    title: 'CloudFlow Analytics',
    description:
      'A real-time analytics dashboard that processes millions of events per day, providing actionable insights through interactive visualizations and automated alerting.',
    problem:
      'The existing analytics solution had a 15-minute data delay and could not handle more than 100K events per hour, leaving teams blind to critical production issues.',
    solution:
      'Built a streaming pipeline with Node.js and WebSockets, backed by a time-series database. Designed a React dashboard with virtualized tables and D3-powered charts that render 10K+ data points without jank.',
    impact:
      'Reduced data latency from 15 minutes to under 2 seconds. Increased event throughput by 40x. Teams caught and resolved 3 critical incidents within the first month that would have gone unnoticed previously.',
    techStack: [
      'React',
      'TypeScript',
      'Node.js',
      'WebSocket',
      'PostgreSQL',
      'D3.js',
      'Docker',
    ],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    id: 'devhub',
    title: 'DevHub Marketplace',
    description:
      'A developer tool marketplace where teams discover, review, and integrate internal APIs and microservices through a self-service portal.',
    problem:
      'Engineering teams spent an average of 4 hours per week searching Slack and wikis to find existing internal APIs, leading to duplicated efforts and inconsistent integrations.',
    solution:
      'Created a searchable catalog with auto-generated API docs from OpenAPI specs. Built an approval workflow for publishing new services and a review system with usage analytics.',
    impact:
      'Onboarding time for new API integrations dropped from 2 days to 30 minutes. Eliminated 12 duplicate internal services in the first quarter, saving an estimated $180K in engineering time annually.',
    techStack: [
      'Next.js',
      'TypeScript',
      'Python',
      'FastAPI',
      'MongoDB',
      'AWS',
      'Tailwind CSS',
    ],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    id: 'deploymate',
    title: 'DeployMate CLI',
    description:
      'An open-source CLI tool that automates deployment workflows, environment provisioning, and rollback strategies for containerized applications.',
    problem:
      'Deployment scripts were fragile, team-specific, and poorly documented. A failed deployment required 45+ minutes of manual intervention to roll back safely.',
    solution:
      'Designed a declarative config system with blue-green deployment support. Implemented automatic health checks, canary releases, and one-command rollback with state snapshots.',
    impact:
      'Reduced average deployment time from 25 minutes to 4 minutes. Rollback time dropped from 45 minutes to under 60 seconds. Adopted by 8 teams across the organization.',
    techStack: [
      'TypeScript',
      'Node.js',
      'Docker',
      'AWS ECS',
      'GitHub Actions',
      'PostgreSQL',
    ],
    githubUrl: 'https://github.com',
  },
];

// ─── Experience ─────────────────────────────────────────────

export const EXPERIENCE: Experience[] = [
  {
    id: 'exp-1',
    company: 'Nexus Technologies',
    role: 'Senior Full Stack Developer',
    startDate: 'Jan 2023',
    endDate: 'Present',
    bullets: [
      'Led a team of 5 engineers to rebuild the customer-facing analytics platform, resulting in a 60% improvement in page load times and a 35% increase in user engagement.',
      'Designed and implemented a microservices architecture that scaled to handle 2M+ daily active users with 99.95% uptime.',
      'Established CI/CD pipelines and code review standards that reduced production incidents by 70% over 6 months.',
    ],
    techTags: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'AWS',
      'Docker',
    ],
  },
  {
    id: 'exp-2',
    company: 'Catalyst Labs',
    role: 'Full Stack Developer',
    startDate: 'Jun 2021',
    endDate: 'Dec 2022',
    bullets: [
      'Built and maintained 15+ RESTful APIs serving 500K+ requests per day, achieving sub-100ms average response times through query optimization and caching strategies.',
      'Developed a component library used across 4 product teams, reducing front-end development time by 40% and ensuring design consistency.',
      'Mentored 3 junior developers through pair programming and code reviews, helping them progress to mid-level within 12 months.',
    ],
    techTags: [
      'React',
      'TypeScript',
      'Python',
      'MongoDB',
      'Redis',
      'Tailwind CSS',
      'Git',
    ],
  },
];

// ─── Skills ─────────────────────────────────────────────────

export const SKILLS: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: Layout,
    skills: [
      { name: 'React', icon: Braces },
      { name: 'Next.js', icon: Globe },
      { name: 'TypeScript', icon: FileCode2 },
      { name: 'Tailwind CSS', icon: Paintbrush },
      { name: 'Figma', icon: Palette },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    skills: [
      { name: 'Node.js', icon: Code2 },
      { name: 'Python', icon: FileCode2 },
      { name: 'PostgreSQL', icon: Database },
      { name: 'MongoDB', icon: Database },
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: Settings,
    skills: [
      { name: 'AWS', icon: Cloud },
      { name: 'Docker', icon: Container },
      { name: 'Git', icon: GitBranch },
    ],
  },
];

// ─── Problem-Solving Process ────────────────────────────────

export const PROCESS_STEPS: ProcessStep[] = [
  {
    icon: Eye,
    title: 'Understand',
    description:
      'Deep-dive into the problem space. Talk to users, review data, and map constraints before writing a single line of code.',
  },
  {
    icon: Lightbulb,
    title: 'Architect',
    description:
      'Design the system with scalability and maintainability in mind. Choose the right tools, define interfaces, and plan for edge cases.',
  },
  {
    icon: Wrench,
    title: 'Build & Optimize',
    description:
      'Ship iteratively with clean, tested code. Measure performance, refactor bottlenecks, and keep the feedback loop tight.',
  },
  {
    icon: Rocket,
    title: 'Ship & Iterate',
    description:
      'Deploy with confidence using CI/CD. Monitor production metrics, gather feedback, and continuously improve.',
  },
];

// ─── Social Links ───────────────────────────────────────────

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Email',
    url: 'mailto:priyank@example.com',
    icon: Mail,
  },
  {
    label: 'GitHub',
    url: 'https://github.com',
    icon: SquareTerminal,
  },
  {
    label: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: Link,
  },
];

// ─── About ──────────────────────────────────────────────────

export const ABOUT = {
  bio: "I'm a full stack developer with a passion for building products that solve real problems. I specialize in creating performant web applications with clean architecture, intuitive user experiences, and systems that scale.",
  highlights: [
    'Led engineering teams of 5+ developers',
    '2M+ daily active users served',
    '99.95% uptime in production systems',
    'Open-source contributor and mentor',
  ],
} as const;
