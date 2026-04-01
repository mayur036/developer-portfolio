'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  id?: string;
}

export function SectionHeading({ title, subtitle, id }: SectionHeadingProps) {
  return (
    <motion.div
      id={id}
      className="mb-12 text-center md:mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-fluid-lg font-heading font-bold tracking-tight text-heading">
        {title}
      </h2>
      {subtitle && (
        <p className="text-fluid-sm mx-auto mt-4 max-w-2xl text-muted-text">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
