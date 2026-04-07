'use client';

import { motion } from 'framer-motion';

import { PERSONAL, SOCIAL_LINKS } from '@/src/data/portfolio';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className="border-t border-border-color py-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
    >
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
          {SOCIAL_LINKS.map((link, index) => {
            const LinkIcon = link.icon;
            return (
              <motion.a
                key={link.label}
                id={`footer-social-${link.label.toLowerCase().replace(' ', '-')}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-lg border border-border-color text-muted-text transition-all hover:border-accent hover:text-accent hover:shadow-[0_0_15px_var(--accent-glow)]"
                aria-label={link.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                whileHover={{ y: -3, scale: 1.15 }}
              >
                <LinkIcon className="size-4" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.footer>
  );
}
