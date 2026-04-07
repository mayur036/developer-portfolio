'use client';

import { motion } from 'framer-motion';

import { SectionHeading } from '@/src/components/section-heading';
import { SKILLS } from '@/src/data/portfolio';

export function Skills() {
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
    <section id="skills" className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          sectionNumber="003.7 — Skills"
          title="Skills & Tools"
          subtitle="Technologies I work with daily to build reliable, scalable software."
        />

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {SKILLS.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={category.title}
                variants={itemVariants}
                whileHover={cardHover}
                className="card-hover-glow rounded-xl border border-border-color bg-surface p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10">
                    <CategoryIcon className="size-5 text-accent" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-heading">
                    {category.title}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill) => {
                    const SkillIcon = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        className="flex items-center gap-2 rounded-lg bg-surface-alt px-3 py-2 text-sm text-body transition-colors hover:text-accent"
                        whileHover={{ scale: 1.03, x: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <SkillIcon className="size-4 shrink-0 text-accent/70" />
                        {skill.name}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
