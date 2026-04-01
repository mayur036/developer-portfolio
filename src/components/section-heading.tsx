'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  sectionNumber?: string;
  id?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  title,
  subtitle,
  sectionNumber,
  id,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <motion.div
      id={id}
      className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      {sectionNumber && (
        <p className="section-label mb-3 text-accent">{sectionNumber}</p>
      )}
      <h2 className="text-fluid-lg font-heading font-bold tracking-tight text-heading">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-fluid-sm mt-4 text-muted-text ${align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-xl'}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
