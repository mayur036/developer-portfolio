'use client';

import { motion } from 'framer-motion';

import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/src/components/section-heading';
import { EXPERIENCE } from '@/src/data/portfolio';

export function Experience() {
  return (
    <section id="experience" className="bg-surface-alt/50 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          sectionNumber="003.5 — Experience"
          title="Where I've Been"
          subtitle="The teams and challenges that shaped my approach to building software."
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 left-4 h-full w-px bg-gradient-to-b from-accent via-accent/40 to-transparent md:left-1/2 md:-translate-x-px" />

          {EXPERIENCE.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={exp.id}
                className={`relative mb-12 flex last:mb-0 ${
                  isLeft
                    ? 'md:justify-start md:pr-[calc(50%+2rem)]'
                    : 'md:justify-end md:pl-[calc(50%+2rem)]'
                }`}
                initial={{
                  opacity: 0,
                  x: isLeft ? -40 : 40,
                }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute top-2 left-4 z-10 size-3 -translate-x-1/2 rounded-full border-2 border-accent bg-background shadow-[0_0_10px_var(--accent-glow)] md:left-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1 + 0.2,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  }}
                />

                {/* Content card */}
                <div className="card-hover-glow ml-10 w-full rounded-xl border border-border-color bg-surface p-6 md:ml-0">
                  <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-heading text-base font-semibold text-heading">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-xs text-accent">
                      {exp.startDate} &mdash; {exp.endDate}
                    </span>
                  </div>
                  <p className="mb-3 text-sm font-medium text-muted-text">
                    {exp.company}
                  </p>

                  <ul className="mb-4 space-y-2">
                    {exp.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm leading-relaxed text-body"
                      >
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.techTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="border border-border-color bg-surface-alt text-xs text-body"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
