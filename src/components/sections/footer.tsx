'use client';

import { SOCIAL_LINKS } from '@/src/data/portfolio';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-color bg-surface py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map((link) => {
            const LinkIcon = link.icon;
            return (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-text transition-colors hover:text-accent"
                aria-label={link.label}
              >
                <LinkIcon className="size-4" />
              </a>
            );
          })}
        </div>
        <p className="text-xs text-muted-text">
          Built with Next.js &amp; caffeine &copy; {year}
        </p>
      </div>
    </footer>
  );
}
