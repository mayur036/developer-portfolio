'use client';

import { PERSONAL, SOCIAL_LINKS } from '@/src/data/portfolio';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-color py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 sm:flex-row sm:justify-between sm:px-6">
        {/* Brand */}
        <div className="text-center sm:text-left">
          <p className="font-heading text-base font-bold text-heading">
            {PERSONAL.name.split(' ')[0]}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-xs text-muted-text">
            Built with Next.js &amp; passion &copy; {year}
          </p>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map((link) => {
            const LinkIcon = link.icon;
            return (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-lg border border-border-color text-muted-text transition-all hover:border-accent hover:text-accent hover:shadow-[0_0_15px_var(--accent-glow)]"
                aria-label={link.label}
              >
                <LinkIcon className="size-4" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
