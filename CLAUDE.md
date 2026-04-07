# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # Start development server
bun build        # Production build
bun lint         # Run ESLint
bun lint:fix     # Run ESLint with auto-fix
bun format       # Format all files with Prettier
bun format:check # Check formatting without writing
bun typecheck    # TypeScript type check (tsc --noEmit)
```

**Package manager**: `bun` (preferred). Use `bun` for all installs and script execution.

**Adding shadcn components**: `bunx shadcn add <component-name>`

## Architecture

This is a **single-page portfolio** built with Next.js 16 App Router. The entire page renders in `app/page.tsx` which composes section components sequentially.

### Directory Structure

- `app/` — Next.js routing only. `layout.tsx` sets up fonts (Sora, DM Sans, JetBrains Mono), ThemeProvider, ClientCursor, and SpeedInsights. `page.tsx` composes sections. No business logic here.
- `src/components/sections/` — One file per portfolio section (`hero.tsx`, `about.tsx`, `projects.tsx`, etc.). Pure UI; receives data from `src/data/`.
- `src/components/` — Shared UI components (`InteractiveGrid`, `ClientCursor`, `ThemeProvider`, `BackToTop`, etc.).
- `src/data/portfolio.ts` — **Single source of truth for all portfolio content.** All text, lists, and structured data are exported as typed constants from here. Sections import directly from this file.
- `src/types/portfolio.ts` — All shared TypeScript interfaces (`Project`, `Experience`, `Skill`, `SkillCategory`, etc.). Icons use `LucideIcon` type.
- `src/hooks/` — Reusable hooks. One hook per file, `kebab-case` filename (e.g., `use-debounce.ts`).
- `components/` — shadcn-generated components (aliased as `@/components`).
- `lib/` — Utility functions (aliased as `@/lib`).

### Path Aliases

- `@/` resolves to the project root.
- `@/src/components` → `src/components/`
- `@/components` → shadcn components dir
- `@/lib` → `lib/`

### Key Architectural Patterns

**Interactive background**: `InteractiveGrid` is a full-screen WebGL canvas (`fixed inset-0 -z-10 pointer-events-none`) powered by `@react-three/fiber` + `@react-three/drei`. It contains `Particles`, `LightSweeps`, and a reflective `Grid` from drei. Only mounts client-side (checks `mounted` state) to avoid SSR issues.

**Data flow**: All content lives in `src/data/portfolio.ts` as typed constants. Section components import what they need. To update portfolio content, only edit that file.

**Theme**: `next-themes` via `ThemeProvider`. Font CSS variables: `--font-sora`, `--font-dm-sans`, `--font-jetbrains-mono`.

**shadcn**: Configured with `base-nova` style, `lucide` icon library, Tailwind CSS v4 with CSS variables.

## Coding Conventions (from project standard)

- **Naming**: `PascalCase` components, `useCamelCase` hooks, `camelCase` vars/functions, `UPPER_SNAKE_CASE` constants, `kebab-case` filenames.
- **TypeScript**: `strict: true`. No `any` — use `unknown`. Use `interface` for object shapes, `type` for unions.
- **Explicit return types** on public/exported functions.
- No API calls inside `src/components/`. No business logic in `app/` pages/layouts.
- `'use client'` only where interactivity or browser APIs are required; default to Server Components.
- Pre-commit hooks (husky + lint-staged) run ESLint + Prettier on staged files automatically.
