'use client';

import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

import { SectionHeading } from '@/src/components/section-heading';
import { CREDENTIALS } from '@/src/data/portfolio';

export function Credentials() {
  return (
    <section
      id="credentials"
      className="py-20 sm:py-28"
      aria-labelledby="credentials-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          sectionNumber="004 — Credentials"
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
                className="card-hover-glow w-80 shrink-0 rounded-xl border border-border-color bg-surface/50 backdrop-blur-md p-6 sm:w-96"
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
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10">
                    <Award className="size-5 text-accent" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-xs text-muted-text">
                    {cred.date}
                  </span>
                </div>

                <h3 className="mb-2 font-heading text-sm font-semibold leading-snug text-heading">
                  {cred.title}
                </h3>
                <p className="mb-4 text-xs text-muted-text">{cred.issuer}</p>

                {cred.url && (
                  <a
                    href={cred.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-colors hover:text-accent/80"
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
