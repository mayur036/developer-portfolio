'use client';

import { ArrowDown, Download, FolderOpen } from 'lucide-react';
import { HERO_STATS, PERSONAL } from '@/src/data/portfolio';

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border-color bg-surface/60 px-4 py-1.5 text-xs font-medium text-body backdrop-blur-sm">
              <span className="status-dot size-1.5 rounded-full bg-green-500" />
              {PERSONAL.badge}
            </span>
          </div>

          {/* Name */}
          <h1 className="text-fluid-xl mt-6 font-heading font-bold tracking-tight text-heading">
            {PERSONAL.name}
            <span className="gradient-text">.</span>
          </h1>

          {/* Tagline */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-body sm:text-xl">
            {PERSONAL.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              id="cta-hero-projects"
              className="gradient-btn flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold sm:px-10"
              onClick={() =>
                document
                  .querySelector('#projects')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              <FolderOpen className="size-4" />
              View Projects
            </button>
            <a
              href={PERSONAL.resumeUrl}
              id="cta-hero-resume"
              className="ghost-btn flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold sm:px-10"
            >
              <Download className="size-4" />
              View Resume
            </a>
          </div>

          {/* Stats Row */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-12">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-3xl font-bold text-heading sm:text-4xl">
                  {stat.value}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-text sm:text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="size-5 text-muted-text" />
      </div>
    </section>
  );
}
