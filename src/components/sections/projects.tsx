'use client';

import { motion } from 'framer-motion';
import { ProjectCard } from './projects/project-card';
import { SectionHeading } from '@/src/components/section-heading';
import { PROJECTS } from '@/src/data/portfolio';

export function Projects(): React.JSX.Element {
  return (
    <section
      id="projects"
      className="py-20 sm:py-28"
      aria-labelledby="projects-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="projects-title"
          sectionNumber="003 — Work"
          title="Featured Projects"
          subtitle="A selection of problems I have enjoyed solving."
        />

        {/* Project count */}
        <motion.p
          className="mb-8 font-mono text-xs text-muted-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {PROJECTS.length} Total Projects
        </motion.p>

        <div className="space-y-8" role="list">
          {PROJECTS.map((project, index) => (
            <div key={project.id} role="listitem">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
