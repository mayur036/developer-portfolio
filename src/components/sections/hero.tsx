'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, Download, FolderOpen } from 'lucide-react';
import { useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { HERO_STATS, PERSONAL } from '@/src/data/portfolio';

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth - 0.5);
      mouseY.set(clientY / innerHeight - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <motion.div
        className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-6"
        style={{ perspective: 1000 }}
      >
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ rotateX, rotateY }}
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <Badge
              variant="outline"
              className="gap-2 rounded-full border-border-color bg-surface/60 px-4 py-1.5 text-xs font-medium text-body backdrop-blur-sm"
            >
              <span className="status-dot size-1.5 rounded-full bg-green-500" />
              {PERSONAL.badge}
            </Badge>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-fluid-xl mt-6 font-heading font-bold tracking-tight text-heading"
            variants={itemVariants}
          >
            {PERSONAL.name}
            <span className="gradient-text">.</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-body sm:text-xl"
            variants={itemVariants}
          >
            {PERSONAL.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-4"
            variants={itemVariants}
          >
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    size="lg"
                    className="gradient-btn h-12 rounded-full px-8 text-sm font-semibold sm:px-10"
                    aria-label="View my featured projects"
                    onClick={() =>
                      document
                        .querySelector('#projects')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }
                  >
                    <FolderOpen className="mr-2 size-4" />
                    View Projects
                  </Button>
                }
              />
              <TooltipContent>
                <p>Browse through my featured work</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 rounded-full border-border-color px-8 text-sm font-semibold transition-all hover:border-accent hover:text-accent sm:px-10"
                    aria-label="View and download my resume"
                    render={
                      <a href={PERSONAL.resumeUrl}>
                        <Download className="mr-2 size-4" />
                        View Resume
                      </a>
                    }
                  />
                }
              />
              <TooltipContent>
                <p>Download my professional CV</p>
              </TooltipContent>
            </Tooltip>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-12"
            variants={itemVariants}
          >
            {HERO_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 0.8 + i * 0.15,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
              >
                <span className="text-3xl font-bold text-heading sm:text-4xl">
                  {stat.value}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-text sm:text-sm">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.5,
          duration: 1,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <ArrowDown className="size-5 text-muted-text" />
      </motion.div>
    </section>
  );
}
