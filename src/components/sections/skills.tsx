'use client';

import { motion } from 'framer-motion';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

  return (
    <section
      id="skills"
      className="py-20 sm:py-28"
      aria-labelledby="skills-title"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          sectionNumber="003.7 — Skills"
          title="Skills & Tools"
          subtitle="Technologies I work with daily to build reliable, scalable software."
        />

        <div className="mt-12 space-y-16">
          {SKILLS.map((category, catIdx) => (
            <motion.div
              key={category.title}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10">
                  <category.icon
                    className="size-5 text-accent"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-heading text-lg font-bold text-heading">
                  {category.title}
                </h3>
              </div>

              <div
                className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
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
                        className="card-hover-glow h-full border-border-color bg-surface/50 backdrop-blur-md transition-all hover:border-accent/40"
                        aria-label={skill.name}
                      >
                        <CardContent className="flex items-center gap-3 p-4">
                          <div className="flex size-8 items-center justify-center rounded-lg bg-accent/5 transition-colors group-hover:bg-accent/10">
                            <SkillIcon
                              className="size-4 text-accent"
                              aria-hidden="true"
                            />
                          </div>
                          <span className="font-heading text-sm font-medium text-heading">
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
