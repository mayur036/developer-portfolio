import type { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  techStack: string[];
  role: string;
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  bullets: string[];
  techTags: string[];
}

export interface Skill {
  name: string;
  icon: LucideIcon;
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: Skill[];
}

export interface ProcessStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: LucideIcon;
  tagline?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Hobby {
  name: string;
  icon: LucideIcon;
}

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  highlights: string[];
}

export interface HeroStat {
  label: string;
  value: string;
}
