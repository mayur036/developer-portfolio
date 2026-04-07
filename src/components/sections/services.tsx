'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { SectionHeading } from '@/src/components/section-heading';
import { SERVICES } from '@/src/data/portfolio';

export function Services(): React.JSX.Element {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
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
    <section id="services" className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          sectionNumber="004 — Services"
          title="What I Offer"
          subtitle="High-end business solutions tailored to your needs — from idea to scalable product."
        />

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {SERVICES.map((service) => {
            const ServiceIcon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={cardHover}
                className="group card-hover-glow rounded-xl border border-border-color bg-surface p-6"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-accent/10 transition-colors group-hover:bg-accent/20">
                  <ServiceIcon className="size-6 text-accent" />
                </div>

                <h3 className="mb-2 font-heading text-base font-semibold text-heading">
                  {service.title}
                </h3>

                <p className="mb-5 text-sm leading-relaxed text-body">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-center gap-2 text-xs text-muted-text"
                    >
                      <ArrowRight className="size-3 shrink-0 text-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
