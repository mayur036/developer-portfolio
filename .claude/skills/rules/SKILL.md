---
name: 'rules'
description: "Project coding conventions, standards, and architectural rules for the developer portfolio. Use this skill whenever the user asks about coding standards, naming conventions, file structure rules, TypeScript practices, component patterns, or how things should be organized. Also use when reviewing code for convention violations, when someone says 'what are the rules', 'coding standards', 'naming convention', 'where does this go', or asks about the right way to structure something in this project."
---

# Project Rules & Conventions

## Naming

| Thing               | Convention         | Example                                       |
| ------------------- | ------------------ | --------------------------------------------- |
| Components          | `PascalCase`       | `SectionHeading`, `InteractiveGrid`           |
| Hooks               | `useCamelCase`     | `useDebounce`, `useMediaQuery`                |
| Functions/variables | `camelCase`        | `handleClick`, `isVisible`                    |
| Constants           | `UPPER_SNAKE_CASE` | `PROJECTS`, `HERO_STATS`                      |
| Files               | `kebab-case.tsx`   | `section-heading.tsx`, `interactive-grid.tsx` |

## TypeScript

- **Strict mode is on** — no escape hatches
- Never use `any`. Use `unknown` if the type is genuinely uncertain
- Use `interface` for object shapes, `type` for unions and intersections
- Explicit return types on all exported functions
- Icon types use `LucideIcon` from `lucide-react`

## File Organization

```
app/                          # Next.js routing only — no business logic
├── layout.tsx                # Fonts, ThemeProvider, ClientCursor, SpeedInsights
└── page.tsx                  # Composes section components sequentially

src/components/sections/      # One file per portfolio section (hero, about, etc.)
src/components/               # Shared UI components (SectionHeading, BackToTop, etc.)
src/data/portfolio.ts         # Single source of truth for ALL portfolio content
src/types/portfolio.ts        # All shared TypeScript interfaces
src/hooks/                    # One hook per file, kebab-case filename

components/ui/                # shadcn-generated components (don't edit manually)
lib/                          # Utility functions (cn, etc.)
```

## Path Aliases

```ts
@/                    // project root
@/src/components      // src/components/
@/components          // shadcn components (components/ui/)
@/lib                 // lib/
```

## Component Rules

1. **Server Components by default.** Only add `'use client'` when the component uses event handlers, React hooks, browser APIs, or client-side libraries (Framer Motion, React Three Fiber).

2. **No business logic in `app/`.** Pages and layouts only compose components — no data fetching, no transformations, no conditionals beyond what's needed for layout.

3. **No API calls inside `src/components/`.** Components receive data via imports from `src/data/portfolio.ts` or through props.

4. **Data lives in `src/data/portfolio.ts`.** All text, lists, and structured content are exported as typed constants. To change portfolio content, edit only this file.

5. **Section components** follow a consistent structure:
   - `'use client'` (if animated)
   - Imports: framer-motion, lucide icons, SectionHeading, data constants
   - Single named export function (no default exports)
   - `<section id="name" className="py-20 sm:py-28">`
   - Container: `<div className="mx-auto max-w-5xl px-4 sm:px-6">`
   - `SectionHeading` with section number, title, subtitle
   - Motion variants defined inside the component function

## Styling

- **Tailwind CSS v4** with CSS variables for theming
- Use project tokens: `text-heading`, `text-body`, `text-muted-text`, `text-accent`, `bg-surface`, `bg-surface-alt`, `bg-background`, `border-border-color`
- Never hardcode color values — always use CSS variables or Tailwind tokens
- Use `gap` over margin for spacing between siblings
- Fonts via CSS variables: `font-heading` (Sora), `font-sans` (DM Sans), `font-mono` (JetBrains Mono)
- shadcn config: `base-nova` style, `lucide` icons

## What NOT to Do

- Don't add `any` types — the codebase is strict and should stay that way
- Don't put content strings directly in components — they belong in `portfolio.ts`
- Don't use default exports for components
- Don't add `'use client'` to components that don't need it
- Don't install packages with npm/yarn — use `bun`
- Don't manually edit shadcn components in `components/ui/`
