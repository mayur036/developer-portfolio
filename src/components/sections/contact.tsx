'use client';

import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

import { SectionHeading } from '@/src/components/section-heading';
import { SOCIAL_LINKS } from '@/src/data/portfolio';

export function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          sectionNumber="005 — Contact"
          title="Let's Build Something Together"
          subtitle="I'm always open to discussing new projects, creative ideas, or opportunities."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: Contact Form */}
          <motion.div
            className="glow-border rounded-xl bg-surface p-6 sm:p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
          >
            <h3 className="mb-6 font-heading text-base font-semibold text-heading">
              Send a Message
            </h3>
            <form
              className="space-y-4"
              id="contact-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="user_name"
                  placeholder="Your Name"
                  className="form-input"
                  id="form-input-name"
                  required
                />
                <input
                  type="email"
                  name="user_email"
                  placeholder="Your Email"
                  className="form-input"
                  id="form-input-email"
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="form-input"
                id="form-input-subject"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                className="form-input resize-none"
                id="form-input-message"
                required
              />
              <button
                type="submit"
                id="cta-contact-submit"
                className="gradient-btn flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
              >
                <Send className="size-4" />
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Right: Social Grid + Status */}
          <motion.div
            className="space-y-6"
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
            <div className="flex items-center gap-3 rounded-xl border border-border-color bg-surface p-4">
              <span className="status-dot size-2.5 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-heading">
                Open to opportunities
              </span>
            </div>

            {/* Social grid */}
            <div className="grid gap-3 sm:grid-cols-2">
              {SOCIAL_LINKS.map((link, index) => {
                const LinkIcon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-card group flex items-center gap-4"
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
                      <LinkIcon className="size-5 text-accent" />
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
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
