'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown, Download, FolderOpen, User } from 'lucide-react';
import { useCallback } from 'react';

import { InteractiveGrid } from '@/src/components/interactive-grid';
import { HERO_STATS, PERSONAL } from '@/src/data/portfolio';

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const { clientX, clientY, currentTarget } = e;
      const { width, height } = currentTarget.getBoundingClientRect();
      mouseX.set((clientX - width / 2) * 0.01);
      mouseY.set((clientY - height / 2) * 0.01);
    },
    [mouseX, mouseY],
  );

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <InteractiveGrid />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <motion.div
          className="grid items-center gap-12 lg:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ x: springX, y: springY }}
        >
          {/* Left: Text */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border-color bg-surface/60 px-4 py-1.5 text-xs font-medium text-body backdrop-blur-sm">
                <span className="status-dot size-1.5 rounded-full bg-green-500" />
                {PERSONAL.badge}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-fluid-xl mt-6 font-heading font-bold tracking-tight text-heading"
            >
              {PERSONAL.name}
              <span className="gradient-text">.</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-lg text-lg leading-relaxed text-body"
            >
              {PERSONAL.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap gap-4"
            >
              <button
                className="gradient-btn flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
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
                className="ghost-btn flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
              >
                <Download className="size-4" />
                View Resume
              </a>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap gap-6"
            >
              {HERO_STATS.map((stat, index) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-heading">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-text">{stat.label}</span>
                  {index < HERO_STATS.length - 1 && (
                    <span className="ml-3 h-8 w-px bg-border-color" />
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Profile Image */}
          <motion.div
            className="order-1 flex justify-center lg:order-2 lg:justify-end"
            variants={itemVariants}
          >
            <div className="relative">
              {/* Gradient ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-accent via-accent-secondary to-accent opacity-60 blur-md" />
              {/* Image container */}
              <div className="relative size-56 overflow-hidden rounded-full border-2 border-border-color bg-surface sm:size-64 lg:size-72">
                <div className="flex size-full items-center justify-center bg-gradient-to-br from-accent/20 via-accent-secondary/10 to-transparent">
                  <User className="size-24 text-accent/40 sm:size-28 lg:size-32" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="size-5 text-muted-text" />
        </motion.div>
      </motion.div>
    </section>
  );
}
