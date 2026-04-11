'use client';

import { motion } from 'framer-motion';
import { ExternalLink, SquareTerminal } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { Project } from '@/src/types/portfolio';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
    >
      <Card
        className="card-hover-glow group grid overflow-hidden rounded-2xl border-border-color bg-surface/50 backdrop-blur-md md:grid-cols-2"
        aria-label={`Project: ${project.title}`}
      >
        {/* Left: Image / Mockup */}
        <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent/5 via-accent/3 to-transparent p-4 sm:p-8 md:p-12">
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
              <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-accent/10 via-transparent to-accent/5 p-8">
                <div className="text-center">
                  <p className="text-xl font-bold text-heading/60 sm:text-2xl">
                    {project.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-text">{project.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <CardContent className="flex flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-10">
          {/* Role badge */}
          <Badge
            variant="secondary"
            className="mb-3 w-fit bg-accent/10 px-3 py-1 text-xs font-medium text-accent hover:bg-accent/20"
          >
            {project.role}
          </Badge>

          {/* Title */}
          <h3 className="mb-3 font-heading text-xl font-bold text-heading sm:text-2xl">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mb-6 text-sm leading-relaxed text-body">
            {project.description}
          </p>

          {/* Tech stack */}
          <div
            className="mb-4 flex flex-wrap gap-1 sm:mb-6 sm:gap-1.5"
            aria-label="Technologies used"
          >
            {project.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="border-border-color bg-surface-alt/50 px-2 py-1 text-[11px] font-medium text-body transition-colors hover:border-accent/40 sm:px-3 sm:py-1.5 sm:text-xs"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            {project.liveUrl && (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      className="gradient-btn h-11 w-full rounded-full px-6 text-sm font-medium sm:h-10 sm:w-auto"
                      aria-label={`Open ${project.title} live website`}
                      render={
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 size-3.5" />
                          Open
                        </a>
                      }
                    />
                  }
                />
                <TooltipContent>
                  <p>View live application</p>
                </TooltipContent>
              </Tooltip>
            )}
            {project.githubUrl && (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="outline"
                      className="h-11 w-full rounded-full border-border-color px-6 text-sm font-medium hover:border-accent hover:text-accent sm:h-10 sm:w-auto"
                      aria-label={`View ${project.title} source code on GitHub`}
                      render={
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <SquareTerminal className="mr-2 size-3.5" />
                          Source
                        </a>
                      }
                    />
                  }
                />
                <TooltipContent>
                  <p>View source code on GitHub</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
