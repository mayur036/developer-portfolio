'use client';

import { motion } from 'framer-motion';

import { Card, CardContent } from '@/components/ui/card';
import { SectionHeading } from '@/src/components/section-heading';
import { SKILLS } from '@/src/data/portfolio';

export function Skills(): React.JSX.Element {
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

  return (
    <section
      id="skills"
      className="py-16 sm:py-20 md:py-28"
      aria-labelledby="skills-title"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          id="skills-title"
          sectionNumber="004 — Skills"
          title="Skills & Tools"
          subtitle="Technologies I work with daily to build reliable, scalable software."
        />

        <div className="mt-8 space-y-10 sm:mt-10 sm:space-y-12 md:mt-12 md:space-y-16">
          {SKILLS.map((category) => (
            <motion.div
              key={category.title}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-accent/10 sm:size-10">
                  <category.icon
                    className="size-4 text-accent sm:size-5"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-heading text-base font-bold text-heading sm:text-lg">
                  {category.title}
                </h3>
              </div>

              <div
                className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
                role="list"
                aria-label={`${category.title} list`}
              >
                {category.skills.map((skill, idx) => {
                  const SkillIcon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      variants={itemVariants}
                      custom={idx}
                      role="listitem"
                    >
                      <Card
                        className="card-hover-glow h-full min-h-[52px] border-border-color bg-surface/50 backdrop-blur-md transition-all hover:border-accent/40"
                        aria-label={skill.name}
                      >
                        <CardContent className="flex items-center gap-2.5 p-3 sm:gap-3 sm:p-4">
                          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent/5 transition-colors group-hover:bg-accent/10 sm:size-8">
                            <SkillIcon
                              className="size-3.5 text-accent sm:size-4"
                              aria-hidden="true"
                            />
                          </div>
                          <span className="truncate font-heading text-xs font-medium text-heading sm:text-sm">
                            {skill.name}
                          </span>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
