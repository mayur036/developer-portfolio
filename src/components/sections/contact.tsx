'use client';

import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { SectionHeading } from '@/src/components/section-heading';
import { PERSONAL, SOCIAL_LINKS } from '@/src/data/portfolio';

export function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <SectionHeading
          title="Let's Build Something Together"
          subtitle="I'm always open to discussing new projects, creative ideas, or opportunities to be part of something meaningful."
        />

        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Social links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {SOCIAL_LINKS.map((link) => {
              const LinkIcon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'lg',
                    className:
                      'gap-2 rounded-full border-border-color px-5 text-body transition-all hover:border-accent hover:text-accent',
                  })}
                >
                  <LinkIcon className="size-4" />
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Resume button */}
          <a
            href={PERSONAL.resumeUrl}
            download
            className={buttonVariants({
              size: 'lg',
              className:
                'gap-2 rounded-full bg-accent px-6 font-medium text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-lg',
            })}
          >
            <Download className="size-4" />
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
