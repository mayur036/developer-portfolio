'use client';

import { motion } from 'framer-motion';
import { ExternalLink, SquareTerminal } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/src/components/section-heading';
import { PROJECTS } from '@/src/data/portfolio';

export function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
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

        <div className="space-y-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="card-hover-glow group grid overflow-hidden rounded-2xl border border-border-color bg-surface md:grid-cols-2">
                {/* Left: Image / Mockup */}
                <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent/5 via-accent-secondary/5 to-transparent p-8 md:p-12">
                  <div className="relative w-full">
                    {/* Mockup frame */}
                    <div className="overflow-hidden rounded-lg border border-border-color bg-background shadow-2xl">
                      {/* Browser chrome */}
                      <div className="flex items-center gap-1.5 border-b border-border-color bg-surface px-3 py-2">
                        <span className="size-2.5 rounded-full bg-red-400/60" />
                        <span className="size-2.5 rounded-full bg-yellow-400/60" />
                        <span className="size-2.5 rounded-full bg-green-400/60" />
                        <span className="ml-2 flex-1 rounded-md bg-surface-alt px-3 py-0.5 text-[10px] text-muted-text">
                          {project.liveUrl || 'localhost:3000'}
                        </span>
                      </div>
                      {/* Content area */}
                      <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-accent/10 via-transparent to-accent-secondary/10 p-8">
                        <div className="text-center">
                          <p className="text-xl font-bold text-heading/60 sm:text-2xl">
                            {project.title}
                          </p>
                          <p className="mt-1 text-xs text-muted-text">
                            {project.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Details */}
                <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
                  {/* Role badge */}
                  <span className="mb-3 inline-flex w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    {project.role}
                  </span>

                  {/* Title */}
                  <h3 className="mb-3 font-heading text-xl font-bold text-heading sm:text-2xl">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 text-sm leading-relaxed text-body">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="mb-6 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="border border-border-color bg-surface-alt text-xs text-body"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gradient-btn flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
                      >
                        <ExternalLink className="size-3.5" />
                        Open
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ghost-btn flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
                      >
                        <SquareTerminal className="size-3.5" />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
