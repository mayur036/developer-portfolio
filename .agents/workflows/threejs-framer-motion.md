---
description: Integrate performant Three.js and Framer Motion components
---

# Three.js & Framer Motion Integration

When developing interactive 3D elements, parallax environments, or complex animations inside the App Router:

1. **Strict Client Boundary**: All React Three Fiber (`<Canvas>`) implementations and `framer-motion` interactable components must explicitly contain the `"use client"` directive.
2. **Component Separation**: Keep standard layout HTML separated from large WebGL canvas structures, preserving robust Server-Side Rendering capabilities of Next.js layouts.
3. **Performance Limits**: When writing Three.js interactions, throttle and restrict heavy `useFrame` logic. For heavy 3D assets, always apply `Suspense` and preloading strategies.
4. **Cursor & Interaction Mapping**: Map viewport interactions smoothly utilizing Framer Motion's `useMotionValue` and `useSpring` hooks linked securely to Javascript `window` pointer boundaries to prevent lag.
5. **Cleanup Subscriptions**: Prevent memory leaks by confirming all custom `three` canvas event subscribers and window mouse event listeners execute thorough cleanup routines via the `useEffect` return statements.
