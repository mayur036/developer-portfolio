'use client';

import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

import { SectionHeading } from '@/src/components/section-heading';
import { CREDENTIALS } from '@/src/data/portfolio';

export function Credentials(): React.JSX.Element {
  return (
    <section
      id="credentials"
      className="py-16 sm:py-20 md:py-28"
      aria-labelledby="credentials-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="credentials-title"
          sectionNumber="006 — Credentials"
          title="Certifications & Achievements"
          subtitle="Recognition and continuous learning milestones."
        />

        {/* Horizontal scrollable carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
        >
          <div
            className="credential-carousel"
            role="list"
            aria-label="Certificates and achievements"
          >
            {CREDENTIALS.map((cred, index) => (
              <motion.div
                key={cred.id}
                role="listitem"
                className="card-hover-glow w-[85vw] max-w-[340px] shrink-0 rounded-xl border border-border-color bg-surface/50 p-5 backdrop-blur-md sm:w-80 sm:p-6 md:w-96"
                aria-label={`${cred.title} by ${cred.issuer}`}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
              >
                <div className="mb-3 flex items-start justify-between sm:mb-4">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-accent/10 sm:size-10">
                    <Award
                      className="size-4 text-accent sm:size-5"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="font-mono text-[11px] text-muted-text sm:text-xs">
                    {cred.date}
                  </span>
                </div>

                <h3 className="mb-2 font-heading text-sm font-semibold leading-snug text-heading">
                  {cred.title}
                </h3>
                <p className="mb-4 text-[11px] text-muted-text sm:text-xs">
                  {cred.issuer}
                </p>

                {cred.url && (
                  <a
                    href={cred.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[32px] items-center gap-1.5 text-xs font-medium text-accent transition-colors hover:text-accent/80"
                    aria-label={`View certificate for ${cred.title}`}
                  >
                    <ExternalLink className="size-3" aria-hidden="true" />
                    View Certificate
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll hint */}
        <p
          className="mt-4 text-center text-xs text-muted-text"
          aria-hidden="true"
        >
          ← Scroll to see more →
        </p>
      </div>
    </section>
  );
}
