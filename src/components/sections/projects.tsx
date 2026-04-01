'use client';

import { motion } from 'framer-motion';
import { ExternalLink, SquareTerminal } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SectionHeading } from '@/src/components/section-heading';
import { PROJECTS } from '@/src/data/portfolio';
import { buttonVariants } from '@/components/ui/button';

export function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="Featured Projects"
          subtitle="A selection of problems I have enjoyed solving."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glow-border rounded-xl"
            >
              <Card className="h-full border-0 bg-surface ring-0">
                {/* Thumbnail placeholder */}
                <div className="mx-4 mt-4 h-40 rounded-lg bg-gradient-to-br from-accent/10 via-accent/5 to-transparent" />

                <CardHeader>
                  <CardTitle className="font-heading text-lg text-heading">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-body">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-4">
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-accent/10 text-accent"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <ProjectDetailDialog project={project} />

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({
                          variant: 'ghost',
                          size: 'sm',
                          className:
                            'gap-1.5 text-muted-text hover:text-accent',
                        })}
                      >
                        <SquareTerminal className="size-4" />
                        Code
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({
                          variant: 'ghost',
                          size: 'sm',
                          className:
                            'gap-1.5 text-muted-text hover:text-accent',
                        })}
                      >
                        <ExternalLink className="size-4" />
                        Live
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectDetailDialog({
  project,
}: {
  project: (typeof PROJECTS)[number];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 border-accent/30 text-accent hover:bg-accent/10"
          />
        }
      >
        Details
      </DialogTrigger>
      <DialogContent className="max-w-lg border-border-color bg-surface">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl text-heading">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-body">
            {project.description}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="mb-1 text-sm font-semibold text-accent">Problem</h4>
            <p className="text-sm leading-relaxed text-body">
              {project.problem}
            </p>
          </div>
          <div>
            <h4 className="mb-1 text-sm font-semibold text-accent">Solution</h4>
            <p className="text-sm leading-relaxed text-body">
              {project.solution}
            </p>
          </div>
          <div>
            <h4 className="mb-1 text-sm font-semibold text-accent">Impact</h4>
            <p className="text-sm leading-relaxed text-body">
              {project.impact}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-accent/10 text-accent"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
