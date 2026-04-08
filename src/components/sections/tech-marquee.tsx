'use client';

import { TECH_MARQUEE } from '@/src/data/portfolio';

export function TechMarquee() {
  const items = [...TECH_MARQUEE, ...TECH_MARQUEE];

  return (
    <div className="relative mb-16 overflow-hidden py-6">
      {/* Fade edges */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

      <div className="marquee-track">
        {items.map((tech, index) => {
          const Icon = tech.icon;
          return (
            <span
              key={`${tech.name}-${index}`}
              className="mx-4 flex items-center gap-2 whitespace-nowrap rounded-full border border-border-color bg-surface px-5 py-2 text-sm font-medium text-body transition-colors hover:border-accent hover:text-accent"
            >
              <Icon className="size-4 text-accent" />
              {tech.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}
