'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

import { SectionHeading } from '@/src/components/section-heading';
import { ABOUT, PERSONAL } from '@/src/data/portfolio';

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          title="About Me"
          subtitle="A developer who cares about craft, performance, and the people who use the things I build."
        />

        <motion.div
          className="grid gap-8 md:grid-cols-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Bio */}
          <div className="md:col-span-3">
            <p className="text-fluid-sm leading-relaxed text-body">
              {ABOUT.bio}
            </p>
            <p className="text-fluid-sm mt-4 leading-relaxed text-body">
              When I&apos;m not shipping features, you&apos;ll find me exploring
              new developer tools, contributing to open-source projects, or
              writing about the patterns and pitfalls I encounter along the way.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
                {PERSONAL.role}
              </span>
              <span className="rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
                {PERSONAL.location}
              </span>
            </div>
          </div>

          {/* Highlights */}
          <div className="md:col-span-2">
            <div className="glow-border rounded-xl bg-surface p-6">
              <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-accent">
                Highlights
              </h3>
              <ul className="space-y-3">
                {ABOUT.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-body"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
