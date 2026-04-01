'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
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

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Detect hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(
        'a, button, [role="button"], input, textarea, select, .social-card, .card-hover-glow, .glow-border, .gradient-btn, .ghost-btn',
      );
      setIsHovering(!!isInteractive);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleElementHover);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleElementHover);
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
      />
    </>
  );
}
