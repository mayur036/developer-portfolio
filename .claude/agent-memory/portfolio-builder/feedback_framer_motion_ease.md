---
name: Framer Motion ease strings need as const
description: Framer Motion v12 requires ease values like 'easeOut' to be typed as const in variant objects to satisfy strict TS
type: feedback
---

When defining Framer Motion variant objects in TypeScript strict mode, string ease values like `'easeOut'` must be typed with `as const` to avoid the TS error: "Type 'string' is not assignable to type 'Easing'".

**Why:** TypeScript widens the string type unless explicitly narrowed with `as const`.
**How to apply:** Use `ease: 'easeOut' as const` in all Framer Motion variant transition objects.
