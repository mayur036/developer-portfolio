'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, GraduationCap } from 'lucide-react';

import { SectionHeading } from '@/src/components/section-heading';
import {
  ABOUT,
  HERO_STATS,
  HOBBIES,
  PERSONAL,
  SKILLS,
  TECH_MARQUEE,
} from '@/src/data/portfolio';
import type { HeroStat } from '@/src/types/portfolio';

function TechMarquee() {
  const items = [...TECH_MARQUEE, ...TECH_MARQUEE];

  return (
    <div className="relative mb-16 overflow-hidden py-6">
      {/* Fade edges */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

      <div className="marquee-track">
        {items.map((tech, index) => {
          const Icon = tech.icon;
          return (
            <span
              key={`${tech.name}-${index}`}
              className="mx-4 flex items-center gap-2 whitespace-nowrap rounded-full border border-border-color bg-surface px-5 py-2 text-sm font-medium text-body transition-colors hover:border-accent hover:text-accent"
            >
              <Icon className="size-4 text-accent" />
              {tech.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const cardHover = {
    y: -5,
    scale: 1.01,
    transition: { duration: 0.3, ease: 'easeOut' as const },
  };

  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          sectionNumber="002 — About"
          title="Get to Know Me"
          subtitle="A developer who cares about craft, performance, and the people who use the things I build."
        />

        {/* Tech Marquee */}
        <TechMarquee />

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Who I Am */}
          <motion.div
            className="glow-border rounded-xl bg-surface p-6 sm:p-8 transition-colors hover:border-accent/40"
            variants={itemVariants}
            whileHover={cardHover}
          >
            <h3 className="mb-4 font-heading text-base font-semibold text-accent">
              Who I Am
            </h3>
            <p className="text-sm leading-relaxed text-body">{ABOUT.bio}</p>
            <p className="mt-4 text-sm leading-relaxed text-body">
              When I&apos;m not shipping features, you&apos;ll find me exploring
              new developer tools, contributing to open-source projects, or
              writing about the patterns and pitfalls I encounter along the way.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent">
                {PERSONAL.role}
              </span>
              <span className="rounded-full bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent">
                {PERSONAL.location}
              </span>
            </div>
          </motion.div>

          {/* Journey */}
          <motion.div
            className="glow-border rounded-xl bg-surface p-6 sm:p-8 transition-colors hover:border-accent/40"
            variants={itemVariants}
            whileHover={cardHover}
          >
            <h3 className="mb-4 font-heading text-base font-semibold text-accent">
              Journey
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-body">
              {ABOUT.journey}
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-lg bg-accent/10">
                  <GraduationCap className="size-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-heading">
                    {PERSONAL.role}
                  </p>
                  <p className="text-xs text-muted-text">
                    {HERO_STATS.find((s: HeroStat) =>
                      s.label.includes('Experience'),
                    )?.value || '5+'}{' '}
                    Years Active
                  </p>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-6 border-t border-border-color pt-4">
              <ul className="space-y-2">
                {ABOUT.highlights.map((item) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-2 text-xs text-body"
                    whileHover={{ x: 3, color: 'var(--accent)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-accent" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Beyond Code - Hobbies */}
        <motion.div
          className="mt-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h3
            className="mb-4 font-heading text-base font-semibold text-heading"
            variants={itemVariants}
          >
            Beyond Code
          </motion.h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {HOBBIES.map((hobby) => {
              const HobbyIcon = hobby.icon;
              return (
                <motion.div
                  key={hobby.name}
                  className="glow-border flex flex-col items-center gap-2 rounded-xl bg-surface p-4 text-center transition-all"
                  variants={itemVariants}
                  whileHover={{ y: -5, borderColor: 'var(--accent)' }}
                >
                  <HobbyIcon className="size-6 text-accent" />
                  <span className="text-xs font-medium text-body">
                    {hobby.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Tech Stack Grid */}
        <motion.div
          className="mt-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h3
            className="mb-4 font-heading text-base font-semibold text-heading"
            variants={itemVariants}
          >
            Tech Stack
          </motion.h3>
          <div className="flex flex-wrap gap-2">
            {SKILLS.flatMap((category) =>
              category.skills.map((skill) => (
                <motion.span
                  key={skill.name}
                  className="rounded-full border border-border-color bg-surface px-4 py-1.5 text-xs font-medium text-body transition-colors hover:border-accent hover:text-accent"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {skill.name}
                </motion.span>
              )),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
