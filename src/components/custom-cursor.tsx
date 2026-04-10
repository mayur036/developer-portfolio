'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/**
 * Interactive selectors that trigger the "hover" cursor state.
 * Using a constant outside the component avoids re-creation per render.
 */
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, .social-card, .card-hover-glow, .glow-border, .gradient-btn, .ghost-btn';

export function CustomCursor(): React.JSX.Element | null {
  const [isVisible, setIsVisible] = useState(false);
  const isHoveringRef = useRef(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Dot follows mouse exactly
  const dotX = useSpring(cursorX, { stiffness: 500, damping: 30, mass: 0.5 });
  const dotY = useSpring(cursorY, { stiffness: 500, damping: 30, mass: 0.5 });

  // Ring follows with a lag for a fluid feel
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 20, mass: 0.8 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 20, mass: 0.8 });

  useEffect(() => {
    // Hide on touch devices
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    /**
     * Combine mousemove and hover detection into a single listener to reduce
     * the number of event handlers and avoid separate mouseover events which
     * fire on every element change. This reduces main-thread work (TBT).
     */
    const handleMouseMove = (e: MouseEvent): void => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check hover state inline during mousemove instead of a separate mouseover
      const target = e.target as HTMLElement;
      const hovering = !!target.closest(INTERACTIVE_SELECTOR);
      if (hovering !== isHoveringRef.current) {
        isHoveringRef.current = hovering;
        setIsHovering(hovering);
      }
    };

    const handleMouseLeave = (): void => setIsVisible(false);
    const handleMouseEnter = (): void => setIsVisible(true);

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 6 : 5,
          height: isHovering ? 6 : 5,
          backgroundColor: 'var(--accent)',
          boxShadow: '0 0 8px var(--accent-glow)',
        }}
        animate={{
          scale: isHovering ? 1.4 : 1,
        }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
      />

      {/* Outer ring circle */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: 'var(--accent)',
        }}
        animate={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          opacity: isHovering ? 0.6 : 0.35,
          borderWidth: isHovering ? 2 : 1,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        aria-hidden="true"
      />
    </>
  );
}
