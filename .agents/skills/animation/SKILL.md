---
name: 'animation'
description: "Framer Motion animation patterns and conventions for the developer portfolio. Use this skill whenever the user asks to animate a component, add motion to a section, create scroll-triggered animations, implement hover effects, build staggered reveals, or any request involving animation in this project. Also use when reviewing or debugging existing animations, or when someone says 'make it animate', 'add transitions', 'entrance animation', 'scroll animation', or 'hover effect'."
---

# Animation Patterns

This project uses **Framer Motion** (`framer-motion`) for all animations. Every animated component requires `'use client'` at the top of the file. These patterns are extracted from the existing codebase — follow them for consistency.

## Core Easing Curve

The project uses a single custom easing curve across all section animations. This gives a smooth, decelerating feel:

```ts
ease: [0.16, 1, 0.3, 1] as [number, number, number, number];
```

Use this for all entrance/reveal animations. The `as [number, number, number, number]` type assertion is required for TypeScript strict mode.

## Pattern 1: Staggered Container Reveal

Used by most sections (Hero, About, Skills) to stagger child elements into view. Define these variants inside the component function, not at module scope:

```ts
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // 0.1–0.15 is the standard range
      delayChildren: 0.3, // optional, used in Hero only
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
```

Apply to the parent with `whileInView`:

```tsx
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.1 }} // amount: 0.1–0.2
>
  <motion.div variants={itemVariants}>...</motion.div>
  <motion.div variants={itemVariants}>...</motion.div>
</motion.div>
```

**Hero is special** — it uses `animate="visible"` instead of `whileInView` because it's above the fold.

## Pattern 2: Per-Item Scroll Reveal

Used when items need individual delay based on index (Projects, Experience). Applied directly on each item without a parent container variant:

```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{
    duration: 0.8,
    delay: index * 0.1,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  }}
>
```

## Pattern 3: Directional Entrance

Used by the Experience timeline. Items slide in from alternating sides:

```tsx
initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
whileInView={{ opacity: 1, x: 0 }}
```

## Pattern 4: Card Hover

Used on About cards and hobby items. Define as an object and pass to `whileHover`:

```ts
const cardHover = {
  y: -5,
  scale: 1.01,
  transition: { duration: 0.3, ease: 'easeOut' as const },
};
```

```tsx
<motion.div whileHover={cardHover}>
```

Simpler hover variants used on smaller elements:

```tsx
// Lift + scale (skill tags)
whileHover={{ scale: 1.05, y: -2 }}

// Slide right + color change (list items)
whileHover={{ x: 3, color: 'var(--accent)' }}
transition={{ duration: 0.2 }}

// Border color change (hobby cards)
whileHover={{ y: -5, borderColor: 'var(--accent)' }}
```

## Pattern 5: Hero Parallax Tilt

The Hero section tracks mouse position and applies spring-based 3D rotation:

```ts
const springConfig = { stiffness: 100, damping: 30, mass: 0.5 };
const springX = useSpring(mouseX, springConfig);
const springY = useSpring(mouseY, springConfig);
const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);
```

This is a one-off pattern for the Hero — don't replicate it elsewhere unless specifically asked.

## Pattern 6: Infinite Repeat

Used for the scroll-down indicator arrow:

```tsx
transition={{
  delay: 1.5,
  duration: 1,
  repeat: Infinity,
  repeatType: 'reverse',
}}
```

## Viewport Settings

Always use `once: true` so animations don't replay on scroll back:

| Context                     | `amount` value |
| --------------------------- | -------------- |
| Large sections (About grid) | `0.1`          |
| Cards / individual items    | `0.2`          |
| Small elements (counters)   | omit or `0.2`  |

## Duration Guidelines

| Animation type                 | Duration      |
| ------------------------------ | ------------- |
| Section entrance               | `0.8s`        |
| Card hover                     | `0.3s`        |
| Micro-interaction (list hover) | `0.2s`        |
| Stagger delay between children | `0.1–0.15s`   |
| Index-based delay              | `index * 0.1` |

## Imports

Only import what you need from `framer-motion`:

```ts
// Most sections need just this:
import { motion } from 'framer-motion';

// Hero needs more:
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// If using AnimatePresence (enter/exit):
import { motion, AnimatePresence } from 'framer-motion';
```
