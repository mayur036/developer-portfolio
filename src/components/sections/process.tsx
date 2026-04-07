'use client';

import { motion } from 'framer-motion';

import { SectionHeading } from '@/src/components/section-heading';
import { PROCESS_STEPS } from '@/src/data/portfolio';

export function Process() {
  return (
    <section className="bg-surface-alt py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          title="How I Work"
          subtitle="A consistent process that turns ambiguity into shipped software."
        />

        <div className="relative">
          {/* Connecting line — horizontal on desktop, vertical on mobile */}
          <div className="absolute top-6 left-6 hidden h-px w-[calc(100%-3rem)] border-t-2 border-dashed border-accent/20 md:block" />
          <div className="absolute top-0 left-6 h-full w-px border-l-2 border-dashed border-accent/20 md:hidden" />

          <div className="grid gap-8 md:grid-cols-4">
            {PROCESS_STEPS.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  className="group relative pl-14 md:pl-0"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  }}
                >
                  {/* Step number dot (mobile) */}
                  <div className="absolute top-1.5 left-4 z-10 flex size-5 -translate-x-1/2 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground md:hidden">
                    {index + 1}
                  </div>

                  <motion.div
                    className="glow-border rounded-xl bg-surface p-5"
                    whileHover={{
                      y: -4,
                      borderColor: 'var(--accent)',
                      transition: { duration: 0.3, ease: 'easeOut' },
                    }}
                  >
                    <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-accent/10">
                      <StepIcon className="size-5 text-accent" />
                    </div>
                    <h3 className="mb-2 font-heading text-sm font-semibold text-heading">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-body">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
