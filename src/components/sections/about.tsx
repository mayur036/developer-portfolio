'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, GraduationCap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TechMarquee } from '@/src/components/sections/tech-marquee';
import { SectionHeading } from '@/src/components/section-heading';
import {
  ABOUT,
  HERO_STATS,
  HOBBIES,
  PERSONAL,
  SKILLS,
} from '@/src/data/portfolio';
import type { HeroStat } from '@/src/types/portfolio';

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
    <section
      id="about"
      className="py-20 sm:py-28"
      aria-labelledby="about-title"
    >
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
          <motion.div variants={itemVariants} whileHover={cardHover}>
            <Card
              className="card-hover-glow h-full border-border-color bg-surface/50 backdrop-blur-md p-6 sm:p-8"
              aria-label="Who I am section"
            >
              <CardContent className="p-0">
                <h3 className="mb-4 font-heading text-base font-semibold text-accent">
                  Who I Am
                </h3>
                <p className="text-sm leading-relaxed text-body">{ABOUT.bio}</p>
                <p className="mt-4 text-sm leading-relaxed text-body">
                  When I&apos;m not shipping features, you&apos;ll find me
                  exploring new developer tools, contributing to open-source
                  projects, or writing about the patterns and pitfalls I
                  encounter along the way.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-accent/10 px-4 py-1 text-xs font-medium text-accent"
                  >
                    {PERSONAL.role}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-accent/10 px-4 py-1 text-xs font-medium text-accent"
                  >
                    {PERSONAL.location}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Journey */}
          <motion.div variants={itemVariants} whileHover={cardHover}>
            <Card
              className="card-hover-glow h-full border-border-color bg-surface/50 backdrop-blur-md p-6 sm:p-8"
              aria-label="My professional journey"
            >
              <CardContent className="p-0">
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
                  <ul className="space-y-2" aria-label="Key highlights">
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
              </CardContent>
            </Card>
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
            id="beyond-code-title"
            className="mb-4 font-heading text-base font-semibold text-heading"
            variants={itemVariants}
          >
            Beyond Code
          </motion.h3>
          <div
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5"
            role="list"
            aria-labelledby="beyond-code-title"
          >
            {HOBBIES.map((hobby) => {
              const HobbyIcon = hobby.icon;
              return (
                <Tooltip key={hobby.name}>
                  <TooltipTrigger
                    render={
                      <motion.div
                        role="listitem"
                        className="card-hover-glow flex flex-col items-center gap-2 rounded-xl border border-border-color bg-surface/50 backdrop-blur-md p-4 text-center transition-all"
                        variants={itemVariants}
                        whileHover={{ y: -5, borderColor: 'var(--accent)' }}
                        aria-label={`Hobby: ${hobby.name}`}
                      >
                        <HobbyIcon className="size-6 text-accent" />
                        <span className="text-xs font-medium text-body">
                          {hobby.name}
                        </span>
                      </motion.div>
                    }
                  />
                  <TooltipContent>
                    <p>I enjoy {hobby.name.toLowerCase()}</p>
                  </TooltipContent>
                </Tooltip>
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
            id="tech-stack-title"
            className="mb-4 font-heading text-base font-semibold text-heading"
            variants={itemVariants}
          >
            Tech Stack
          </motion.h3>
          <div
            className="flex flex-wrap gap-2"
            role="list"
            aria-labelledby="tech-stack-title"
          >
            {SKILLS.flatMap((category) =>
              category.skills.map((skill) => (
                <Badge
                  key={skill.name}
                  variant="outline"
                  role="listitem"
                  className="rounded-full border border-border-color bg-surface/50 backdrop-blur-md px-4 py-3 text-[13px] font-medium text-body transition-all hover:border-accent hover:text-accent hover:bg-accent/5 hover:scale-105"
                  aria-label={`Skill: ${skill.name}`}
                >
                  {skill.name}
                </Badge>
              )),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
