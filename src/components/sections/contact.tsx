'use client';

import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SectionHeading } from '@/src/components/section-heading';
import { SOCIAL_LINKS } from '@/src/data/portfolio';

export function Contact(): React.JSX.Element {
  return (
    <section
      id="contact"
      className="py-16 sm:py-20 md:py-28"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="contact-title"
          sectionNumber="007 — Contact"
          title="Let's Build Something Together"
          subtitle="I'm always open to discussing new projects, creative ideas, or opportunities."
        />

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Left: Contact Form */}
          <motion.div
            className="glow-border rounded-xl bg-surface/50 p-5 backdrop-blur-md sm:p-6 md:p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
          >
            <h3
              id="form-title"
              className="mb-6 pt-1 font-heading text-base font-semibold text-heading sm:mb-8 sm:pt-2"
            >
              Send a Message
            </h3>
            <form
              className="space-y-4 pt-1 sm:space-y-6 sm:pt-2"
              id="contact-form"
              aria-labelledby="form-title"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="form-input-name"
                    className="text-xs font-medium text-muted-text ml-1"
                  >
                    Name
                  </label>
                  <Input
                    type="text"
                    name="user_name"
                    placeholder="Your Name"
                    id="form-input-name"
                    required
                    aria-required="true"
                    className="h-12 rounded-xl border-border-color bg-surface-alt/50 px-4 focus:border-accent"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="form-input-email"
                    className="text-xs font-medium text-muted-text ml-1"
                  >
                    Email
                  </label>
                  <Input
                    type="email"
                    name="user_email"
                    placeholder="Your Email"
                    id="form-input-email"
                    required
                    aria-required="true"
                    className="h-12 rounded-xl border-border-color bg-surface-alt/50 px-4 focus:border-accent"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="form-input-subject"
                  className="text-xs font-medium text-muted-text ml-1"
                >
                  Subject
                </label>
                <Input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  id="form-input-subject"
                  required
                  aria-required="true"
                  className="h-12 rounded-xl border-border-color bg-surface-alt/50 px-4 focus:border-accent"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="form-input-message"
                  className="text-xs font-medium text-muted-text ml-1"
                >
                  Message
                </label>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  id="form-input-message"
                  required
                  aria-required="true"
                  className="rounded-xl border-border-color bg-surface-alt/50 p-4 focus:border-accent resize-none min-h-[150px]"
                />
              </div>
              <Button
                type="submit"
                id="cta-contact-submit"
                size="lg"
                aria-label="Send your message"
                className="gradient-btn mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold sm:mt-4 sm:h-14"
              >
                <Send className="size-4" aria-hidden="true" />
                Send Message
              </Button>
            </form>
          </motion.div>

          {/* Right: Social Grid + Status */}
          <motion.div
            className="space-y-4 sm:space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
          >
            {/* Status card */}
            <div
              className="flex items-center gap-3 rounded-xl border border-border-color bg-surface/50 backdrop-blur-md p-4"
              role="status"
              aria-live="polite"
            >
              <span
                className="status-dot size-2.5 rounded-full bg-green-500"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-heading">
                Open to opportunities
              </span>
            </div>

            {/* Social grid */}
            <div
              className="grid gap-2.5 sm:grid-cols-2 sm:gap-3"
              role="list"
              aria-label="Social media links"
            >
              {SOCIAL_LINKS.map((link, index) => {
                const LinkIcon = link.icon;
                return (
                  <Tooltip key={link.label}>
                    <TooltipTrigger
                      render={
                        <motion.a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          role="listitem"
                          aria-label={`Visit my ${link.label} profile`}
                          className="social-card group flex items-center gap-4 bg-surface/50 backdrop-blur-md"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.6,
                            delay: 0.2 + index * 0.08,
                            ease: [0.16, 1, 0.3, 1] as [
                              number,
                              number,
                              number,
                              number,
                            ],
                          }}
                          whileHover={{ y: -3, scale: 1.02 }}
                        >
                          <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10 transition-colors group-hover:bg-accent/20">
                            <LinkIcon
                              className="size-5 text-accent"
                              aria-hidden="true"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-heading">
                              {link.label}
                            </p>
                            {link.tagline && (
                              <p className="text-xs text-muted-text">
                                {link.tagline}
                              </p>
                            )}
                          </div>
                        </motion.a>
                      }
                    />
                    <TooltipContent>
                      <p>Connect with me on {link.label}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
