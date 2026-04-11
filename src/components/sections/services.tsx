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
    <section
      id="services"
      className="py-16 sm:py-20 md:py-28"
      aria-labelledby="services-title"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          id="services-title"
          sectionNumber="005 — Services"
          title="What I Offer"
          subtitle="High-end business solutions tailored to your needs — from idea to scalable product."
        />

        <motion.div
          className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          role="list"
          aria-label="Services offered"
        >
          {SERVICES.map((service) => {
            const ServiceIcon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={cardHover}
                role="listitem"
                className="group card-hover-glow rounded-xl border border-border-color bg-surface/50 p-5 backdrop-blur-md sm:p-6"
                aria-label={`Service: ${service.title}`}
              >
                <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-accent/10 transition-colors group-hover:bg-accent/20 sm:size-12">
                  <ServiceIcon
                    className="size-5 text-accent sm:size-6"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mb-2 font-heading text-sm font-semibold text-heading sm:text-base">
                  {service.title}
                </h3>

                <p className="mb-4 text-xs leading-relaxed text-body sm:mb-5 sm:text-sm">
                  {service.description}
                </p>

                <ul
                  className="space-y-2"
                  aria-label="Key features of this service"
                >
                  {service.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-center gap-2 text-[11px] text-muted-text sm:text-xs"
                    >
                      <ArrowRight
                        className="size-3 shrink-0 text-accent"
                        aria-hidden="true"
                      />
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
