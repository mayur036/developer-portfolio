---
name: Performance and SEO Audit Findings (April 2026)
description: Key performance bottlenecks and SEO issues found in the portfolio site, and fixes applied
type: project
---

Audit performed on 2026-04-10 for the developer-portfolio site.

**Key bottlenecks found and fixed:**

1. InteractiveGrid (THREE.js ~500KB) was eagerly loaded. Fixed via `next/dynamic` with `ssr: false` in a Client Component wrapper (`lazy-interactive-grid.tsx`). Uses `requestIdleCallback` to defer canvas mount.

2. All below-the-fold sections were statically imported, causing all framer-motion + lucide JS to hydrate upfront. Fixed by dynamically importing About, Projects, Experience, Skills, Services, Credentials, Contact, Footer, BackToTop in `page.tsx`.

3. WebGL scene was over-configured: 200 particles (reduced to 120), 4000 stars in dark mode (reduced to 2500), reflector resolution 512 (reduced to 256), DPR [1,2] (reduced to [1,1.5]), antialias on (turned off). All reduce GPU work and TBT.

4. Custom cursor had separate `mouseover` listener firing on every DOM element change. Consolidated hover detection into the `mousemove` handler with a ref to skip redundant `setIsHovering` calls.

5. Hero animation delays were long (0.3s delayChildren, 0.8s duration, stats at 0.8s+). Reduced to speed up LCP paint of the h1 element.

6. JSON-LD used `next/script` (adds runtime overhead). Replaced with raw `<script>` in `<head>`.

7. robots.ts had wrong base URL (`ronakkapadi.com` instead of `ronakkapadi.dev`).

8. aria-labelledby IDs in all sections were mismatched with SectionHeading-generated IDs. Fixed by passing explicit `id` props to SectionHeading.

9. Missing canonical URL, enhanced structured data (added WebSite schema, email, knowsAbout), improved OG image alt text, theme-color now adapts to light/dark.

10. Added next.config.ts optimizations: compress, security headers, static asset cache headers, AVIF/WebP image formats, poweredByHeader disabled.

**Why:** User explicitly requested TBT/LCP improvements and SEO fixes.

**How to apply:** These findings inform future work on this portfolio. If new sections or heavy components are added, they should be dynamically imported following the same pattern.
