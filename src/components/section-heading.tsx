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
}: SectionHeadingProps): React.JSX.Element {
  const containerVariants = {
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

  const textId = id || title.toLowerCase().replace(/\s+/g, '-');

  return (
    <motion.div
      className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {sectionNumber && (
        <motion.p
          className="section-label mb-3 text-accent font-mono text-sm tracking-widest uppercase"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {sectionNumber}
        </motion.p>
      )}
      <h2
        id={textId}
        className="text-fluid-lg font-heading font-bold tracking-tight text-heading"
      >
        {title}
      </h2>
      {subtitle && (
        <motion.p
          className={`text-fluid-sm mt-4 text-muted-text leading-relaxed ${align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-xl'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
      <div
        className="mt-4 h-1 w-12 rounded-full bg-accent/20"
        aria-hidden="true"
      >
        <div className="h-full w-4 rounded-full bg-accent" />
      </div>
    </motion.div>
  );
}
