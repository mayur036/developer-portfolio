'use client';

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useSyncExternalStore } from 'react';

/**
 * Subscribe-compatible mount detector. Returns `false` during SSR and the
 * first client render, then `true` after hydration. Uses
 * `useSyncExternalStore` so we avoid the react-hooks/set-state-in-effect
 * lint rule that blocks `useEffect` + `useState` mount tracking.
 */
const subscribeNoop = (): (() => void) => () => {};
const getClientSnapshot = (): boolean => true;
const getServerSnapshot = (): boolean => false;

/**
 * Fixed vertical scroll progress indicator rendered on the left edge of the
 * viewport. Shown only on desktop (lg and up). A glowing spark tracks the
 * scroll progress along a subtle 1px rail, leaving a faint accent-colored
 * trail above it. Positions are driven by framer-motion's `useScroll` so the
 * paint cost is isolated to transform updates on a couple of `motion.div`s.
 */
export function ScrollIndicator(): React.JSX.Element | null {
  const mounted = useSyncExternalStore(
    subscribeNoop,
    getClientSnapshot,
    getServerSnapshot,
  );
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Smooth the raw scroll progress so the spark glides rather than jitters
  // on fast scroll wheels / trackpad momentum.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  // Convert the [0,1] motion value into a CSS `top` percentage string so the
  // spark can be positioned along the rail without layout thrash.
  const sparkTop = useTransform(smoothProgress, (v) => `${v * 100}%`);

  // Avoid SSR/hydration mismatch — scroll progress only exists in the browser.
  if (!mounted) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-20 bottom-20 left-6 z-30 hidden w-px lg:block"
    >
      {/* Base rail: a full-height 1px line at very low opacity */}
      <div className="absolute inset-0 w-px bg-accent/10" />

      {/* Progress trail: stretches from the top to the spark position using
          scaleY. Transform origin is at the top so it grows downward. */}
      <motion.div
        className="absolute top-0 left-0 h-full w-px origin-top bg-gradient-to-b from-transparent via-accent/20 to-accent/60"
        style={{ scaleY: smoothProgress }}
      />

      {/* Spark: glowing dot that tracks scroll progress via top percentage */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: sparkTop }}
      >
        <motion.div
          className="size-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--accent-glow),0_0_24px_var(--accent-glow)]"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.25, 1],
                }
          }
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  );
}
