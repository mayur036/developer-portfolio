import type { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  techStack: string[];
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
}

export interface NavLink {
  label: string;
  href: string;
}
