'use client';

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import { useEffect, useMemo, useRef, useSyncExternalStore } from 'react';

/**
 * Subscribe-compatible mount detector. Returns `false` during SSR and the
 * first client render, then `true` after hydration. Uses
 * `useSyncExternalStore` so we avoid the react-hooks/set-state-in-effect
 * lint rule that blocks `useEffect` + `useState` mount tracking.
 */
const subscribeNoop = (): (() => void) => () => {};
const getClientSnapshot = (): boolean => true;
const getServerSnapshot = (): boolean => false;

const subscribeResize = (callback: () => void): (() => void) => {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
};
const getViewportHeight = (): number => window.innerHeight;
const getServerHeight = (): number => 0;

// Container offsets match the Tailwind `top-20 bottom-20` utilities (5rem + 5rem at 16px root).
const VERTICAL_INSET = 160;
const SVG_WIDTH = 20;
const CENTER_X = SVG_WIDTH / 2;
// Horizontal displacement where the rail steps out at the midpoint.
const ZIG_OFFSET = 8;
// Vertical length of the diagonal connector between the two straight segments.
const ZIG_HEIGHT = 20;

/**
 * Fixed vertical scroll progress indicator rendered on the left edge of the
 * viewport. Shown only on desktop (lg and up). A glowing spark tracks the
 * scroll progress along a zigzagging 1px rail — the rail runs straight down
 * except at the halfway point where it bends outward and back — leaving a
 * faint accent-colored trail behind the spark.
 *
 * The path geometry is recomputed from the current viewport height so the
 * zig sits exactly at the midpoint regardless of screen size. The spark is
 * positioned via `getPointAtLength()` on the live SVG path, which keeps the
 * spark glued to the line even across the bend.
 */
export function ScrollIndicator(): React.JSX.Element | null {
  const mounted = useSyncExternalStore(
    subscribeNoop,
    getClientSnapshot,
    getServerSnapshot,
  );
  const viewportHeight = useSyncExternalStore(
    subscribeResize,
    getViewportHeight,
    getServerHeight,
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

  const containerHeight = Math.max(0, viewportHeight - VERTICAL_INSET);

  const pathD = useMemo(() => {
    if (containerHeight <= 0) return '';
    const mid = containerHeight / 2;
    return [
      `M ${CENTER_X} 0`,
      `L ${CENTER_X} ${mid - ZIG_HEIGHT / 2}`,
      `L ${CENTER_X + ZIG_OFFSET} ${mid + ZIG_HEIGHT / 2}`,
      `L ${CENTER_X + ZIG_OFFSET} ${containerHeight}`,
    ].join(' ');
  }, [containerHeight]);

  const pathRef = useRef<SVGPathElement>(null);
  // Motion values driven manually rather than chained transforms, so we can
  // recompute spark position on viewport resize without reallocating hooks.
  const sparkX = useMotionValue(CENTER_X);
  const sparkY = useMotionValue(0);

  // Sync spark position to scroll progress whenever the spring advances.
  useMotionValueEvent(smoothProgress, 'change', (progress) => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    if (len === 0) return;
    const pt = path.getPointAtLength(progress * len);
    sparkX.set(pt.x);
    sparkY.set(pt.y);
  });

  // Reposition the spark after the path geometry changes (resize / first mount)
  // — without this the spark would be stuck at (CENTER_X, 0) until the user scrolls.
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    if (len === 0) return;
    const pt = path.getPointAtLength(smoothProgress.get() * len);
    sparkX.set(pt.x);
    sparkY.set(pt.y);
  }, [pathD, smoothProgress, sparkX, sparkY]);

  // Avoid SSR/hydration mismatch — scroll progress only exists in the browser.
  if (!mounted || containerHeight === 0) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-20 bottom-20 left-6 z-30 hidden lg:block"
      style={{ width: SVG_WIDTH }}
    >
      <svg
        width={SVG_WIDTH}
        height={containerHeight}
        className="absolute inset-0 overflow-visible"
      >
        {/* Base rail: the zigzag line at very low opacity */}
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="var(--accent)"
          strokeOpacity="0.1"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Progress trail: stroked path revealed via pathLength so the fill
            follows the zigzag exactly as the spark advances. */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="var(--accent)"
          strokeOpacity="0.55"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: smoothProgress }}
        />
        {/* Spark: glowing dot that tracks the zigzag path via getPointAtLength */}
        <motion.circle
          r="3"
          fill="var(--accent)"
          cx={sparkX}
          cy={sparkY}
          style={{
            filter:
              'drop-shadow(0 0 6px var(--accent-glow)) drop-shadow(0 0 12px var(--accent-glow))',
          }}
          animate={
            prefersReducedMotion ? undefined : { opacity: [0.7, 1, 0.7] }
          }
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}
