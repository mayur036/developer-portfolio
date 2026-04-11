'use client';

import { motion } from 'framer-motion';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PERSONAL, SOCIAL_LINKS } from '@/src/data/portfolio';

export function Footer(): React.JSX.Element {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className="border-t border-border-color bg-surface/30 py-8 backdrop-blur-sm sm:py-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      aria-label="Portfolio Footer"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 sm:flex-row sm:justify-between sm:gap-6 sm:px-6">
        {/* Brand */}
        <div
          className="text-center sm:text-left"
          aria-labelledby="footer-brand"
        >
          <p
            id="footer-brand"
            className="font-heading text-base font-bold text-heading"
          >
            {PERSONAL.name.split(' ')[0]}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-xs text-muted-text">
            Built with Next.js &amp; passion &copy; {year}
          </p>
        </div>

        {/* Social icons */}
        <div
          className="flex items-center gap-3 sm:gap-4"
          role="list"
          aria-label="Social media profiles"
        >
          {SOCIAL_LINKS.map((link, index) => {
            const LinkIcon = link.icon;
            return (
              <Tooltip key={link.label}>
                <TooltipTrigger
                  render={
                    <motion.a
                      id={`footer-social-${link.label.toLowerCase().replace(' ', '-')}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      role="listitem"
                      className="flex size-11 items-center justify-center rounded-lg border border-border-color text-muted-text transition-all hover:border-accent hover:text-accent hover:shadow-[0_0_15px_var(--accent-glow)] sm:size-9"
                      aria-label={`Visit my ${link.label} profile`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.08,
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1] as [
                          number,
                          number,
                          number,
                          number,
                        ],
                      }}
                      whileHover={{ y: -3, scale: 1.15 }}
                    >
                      <LinkIcon className="size-4" aria-hidden="true" />
                    </motion.a>
                  }
                />
                <TooltipContent>
                  <p>{link.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </motion.footer>
  );
}
