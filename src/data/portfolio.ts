import {
  Braces,
  Cloud,
  Code2,
  Cpu,
  Database,
  Eye,
  FileCode2,
  GitBranch,
  Globe,
  Layout,
  Lightbulb,
  Link,
  Mail,
  MessageCircle,
  Paintbrush,
  Palette,
  Rocket,
  Server,
  Settings,
  SquareTerminal,
  Wrench,
  Music,
  Plane,
  BookOpen,
} from 'lucide-react';

import type {
  Credential,
  Experience,
  HeroStat,
  Hobby,
  NavLink,
  ProcessStep,
  Project,
  Skill,
  SkillCategory,
  SocialLink,
} from '@/src/types/portfolio';

// ─── Helpers ────────────────────────────────────────────────

const Sparkles = Layout;

// ─── Personal Info ──────────────────────────────────────────

export const PERSONAL = {
  name: 'Ronak Kapadi',
  role: 'Software Developer',
  badge: 'Software Developer • AI Business Solutions • 5 Years Exp',
  tagline:
    'I provide high-end business solutions with AI-driven software development and clean architecture.',
  email: 'ronakkapadi22@gmail.com',
  resumeUrl: '#',
  location: 'India',
} as const;

// ─── Hero Stats ─────────────────────────────────────────────

export const HERO_STATS: HeroStat[] = [
  { value: '5+', label: 'Years Experience' },
  { value: '15+', label: 'Projects Completed' },
  { value: '10+', label: 'AI Tools & Solutions' },
];

// ─── Navigation ─────────────────────────────────────────────

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Contact', href: '#contact' },
];

// ─── Tech Marquee ───────────────────────────────────────────

export const TECH_MARQUEE: Skill[] = [
  { name: 'JavaScript', icon: Code2 },
  { name: 'TypeScript', icon: FileCode2 },
  { name: 'React', icon: Braces },
  { name: 'Next.js', icon: Globe },
  { name: 'Node.js', icon: Server },
  { name: 'Antigravity', icon: Rocket },
  { name: 'Claude AI', icon: Lightbulb },
  { name: 'Github Co-pilot', icon: SquareTerminal },
  { name: 'PostgreSQL', icon: Database },
  { name: 'MongoDB', icon: Database },
  { name: 'AWS', icon: Cloud },
  { name: 'Tailwind CSS', icon: Palette },
  { name: 'Shadcn UI', icon: Paintbrush },
  { name: 'Framer Motion', icon: Cpu },
  { name: 'GraphQL', icon: GitBranch },
];

// ─── Projects ───────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id: 'employee-engagement',
    title: 'Employee Engagement System',
    role: 'Lead Designer and Developer',
    description:
      'A multilingual (Arabic/English) platform for generating and managing employee rewards and corporate gifts across entire organizations.',
    problem:
      'Organizations lacked a unified, multilingual system to manage complex subscription plans and reward corporate gifts to thousands of employees simultaneously.',
    solution:
      'Built a multilingual Next.js application with a comprehensive CMS admin panel, multi-role authentication, and Stripe integration for scalable payments.',
    impact:
      'Successfully automated reward distribution for large teams, reduced manual processing by 80%, and supported seamless international team engagement.',
    techStack: ['Next.js', 'Material UI', 'Stripe', 'Node.js', 'i18n'],
    liveUrl: '#',
  },
  {
    id: 'course-marketplace',
    title: 'Course Marketplace Ecosystem',
    role: 'Lead Full Stack Developer',
    description:
      'A massive marketplace platform where authors manage sales and subscription plans through a custom-built dashboard and SEO-friendly portal.',
    problem:
      'The client needed a scalable way to manage authors, handle subscription-based course access, and optimize conversion rates through varied landing pages.',
    solution:
      'Developed high-performance Next.js SSR pages, integrated GTM and Facebook Pixel for advanced tracking, and implemented a robust sales management module.',
    impact:
      'Increased course discoverability via SEO-friendly architecture. Supported multi-domain marketing campaigns and improved user retention through personalized dashboards.',
    techStack: ['Next.js', 'AWS', 'Stripe', 'GTM', 'Facebook Meta', 'i18n'],
    liveUrl: '#',
  },
  {
    id: 'ride-booking',
    title: 'Ride Booking Portal',
    role: 'Designer and Developer',
    description:
      'A real-time ride-booking system supporting one-way and round trips with live location tracking and secure driver authentication.',
    problem:
      'Difficulty in ensuring transparent ride information and secure onboarding for both drivers and customers in a real-time environment.',
    solution:
      'Implemented Socket.IO for live tracking, built a secure 4-digit code authentication system for rides, and integrated Stripe for secure transactions.',
    impact:
      'Enhanced customer trust through real-time visibility. Reduced onboarding fraud and achieved sub-second latency for live location updates.',
    techStack: ['Next.js', 'Socket.IO', 'Stripe', 'Material UI', 'Node.js'],
    liveUrl: '#',
  },
  {
    id: 'land-property-portal',
    title: 'Land Property Management Portal',
    role: 'Developer with Client Communication',
    description:
      'A secure guest assessment portal for lawyers to manage client profiles, visa data, and property information with 2FA security.',
    problem:
      'Lawyers needed a streamlined way to safely handle sensitive property and client data while ensuring strict account security.',
    solution:
      'Architected a React + Vite application with Shadcn UI and Node.js. Implemented 2FA and developed comprehensive client/visa/property profile management modules.',
    impact:
      'Simplified complex legal workflows for lawyer admins and ensured 100% data security through scalable PostgreSQL storage and 2FA.',
    techStack: [
      'React',
      'Vite',
      'Tailwind CSS',
      'Shadcn UI',
      'Node.js',
      'PostgreSQL',
      'AWS',
    ],
    liveUrl: '#',
  },
];

// ─── Experience ─────────────────────────────────────────────

export const EXPERIENCE: Experience[] = [
  {
    id: 'exp-1',
    company: 'Lead Technology Architect (LTA)',
    role: 'Software Developer & AI Solutions',
    startDate: 'Jan 2023',
    endDate: 'Present',
    bullets: [
      'Design high-end business solutions using AI-driven development tools (Claude AI, Antigravity, Co-Pilot) to accelerate delivery cycles by 50%.',
      'Lead cross-functional teams in architecting scalable Next.js and MERN applications with a focus on clean architecture and performance.',
      'Implement complex integrations including Stripe, AWS, and real-time Socket.IO systems for multi-role platforms.',
    ],
    techTags: [
      'Next.js',
      'AI Tools',
      'Node.js',
      'AWS',
      'Stripe',
      'TypeScript',
      'React',
    ],
  },
  {
    id: 'exp-2',
    company: 'Senior Software Developer',
    role: 'Full Stack Development',
    startDate: 'Jun 2021',
    endDate: 'Dec 2022',
    bullets: [
      'Developed and maintained production-grade web applications serving thousands of users with 99% uptime.',
      'Built custom CMS systems and interactive dashboards using React, Material UI, and Fabric.js.',
      'Optimized database performance in MongoDB and PostgreSQL for large-scale data handling.',
    ],
    techTags: [
      'React',
      'TypeScript',
      'MongoDB',
      'PostgreSQL',
      'Material UI',
      'GraphQL',
      'Vite',
    ],
  },
];

// ─── Skills ─────────────────────────────────────────────────

export const SKILLS: SkillCategory[] = [
  {
    title: 'AI & Modern Tools',
    icon: Sparkles, // This might need to be imported or replaced
    skills: [
      { name: 'Claude AI', icon: Lightbulb },
      { name: 'Antigravity', icon: Rocket },
      { name: 'Github Co-pilot', icon: SquareTerminal },
      { name: 'Gemini', icon: Globe },
      { name: 'ChatGPT', icon: MessageCircle },
    ],
  },
  {
    title: 'Frontend Mastery',
    icon: Layout,
    skills: [
      { name: 'Next.js (18/19)', icon: Globe },
      { name: 'React', icon: Braces },
      { name: 'TypeScript', icon: FileCode2 },
      { name: 'Shadcn UI', icon: Paintbrush },
      { name: 'Tailwind CSS', icon: Palette },
    ],
  },
  {
    title: 'Backend & Cloud',
    icon: Server,
    skills: [
      { name: 'Node.js', icon: Code2 },
      { name: 'AWS', icon: Cloud },
      { name: 'Stripe Payments', icon: Settings },
      { name: 'MongoDB / SQL', icon: Database },
      { name: 'Socket.IO', icon: GitBranch },
    ],
  },
];

// ─── Problem-Solving Process ────────────────────────────────

export const PROCESS_STEPS: ProcessStep[] = [
  {
    icon: Eye,
    title: 'Understand Business Needs',
    description:
      'I deep-dive into the business constraints and user requirements, identifying where AI can provide the most leverage.',
  },
  {
    icon: Lightbulb,
    title: 'Architect AI-First Solutions',
    description:
      'Designing systems with scalability and maintenance in mind, using modern AI tools to ensure fast and reliable production cycles.',
  },
  {
    icon: Wrench,
    title: 'Build & Optimize',
    description:
      'Implementing clean, modular code across the entire stack. Continuous performance monitoring and tech debt management.',
  },
  {
    icon: Rocket,
    title: 'Scale & Iterate',
    description:
      'Deploying secure, high-performing solutions that grow with your business. Collecting data and iterating for better user engagement.',
  },
];

// ─── Credentials ────────────────────────────────────────────

export const CREDENTIALS: Credential[] = [
  {
    id: 'edu-1',
    title: 'Bachelor of Engineering: Information Technology',
    issuer: 'Gujarat Technological University',
    date: 'Completed',
    url: '#',
  },
  {
    id: 'cred-1',
    title: 'Lead Technology Architect (LTA)',
    issuer: 'Professional Organization',
    date: 'Ongoing',
    url: '#',
  },
];

// ─── Hobbies (Beyond Code) ─────────────────────────────────

export const HOBBIES: Hobby[] = [
  { name: 'Reading', icon: BookOpen },
  { name: 'Traveling', icon: Plane },
  { name: 'Listening to Music', icon: Music },
  { name: 'Tech Tinkering', icon: Cpu },
];

// ─── Social Links ───────────────────────────────────────────

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Email',
    url: 'mailto:ronakkapadi22@gmail.com',
    icon: Mail,
    tagline: 'Get in Touch',
  },
  {
    label: 'GitHub',
    url: 'https://github.com',
    icon: SquareTerminal,
    tagline: 'Open Source Work',
  },
  {
    label: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: Link,
    tagline: 'Professional Profile',
  },
];

// ─── About ──────────────────────────────────────────────────

export const ABOUT = {
  bio: "I'm a Software Developer with 5 years of experience specialized in building clean, scalable business solutions. I leverage advanced AI tools to solve complex architectural challenges and deliver high-performance applications.",
  journey:
    'My journey in software development has spanned over 5 years, evolving from core full-stack engineering into lead technology architecture. I now focus on integrating AI-driven workflows and building high-end business systems with 99% uptime.',
  highlights: [
    '5+ Years professional software experience',
    'Specialist in AI-driven business solutions',
    'Led significant projects from design to scale',
    'Expertise in Next.js, MERN, and AWS stacks',
  ],
} as const;
