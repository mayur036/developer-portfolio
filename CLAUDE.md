# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

This project uses **Bun** exclusively. Always use `bun` instead of `npm` or `npx`.

## Commands

```bash
bun dev            # Start development server
bun build          # Production build
bun start          # Start production server
bun lint           # Lint code (ESLint)
bun lint:fix       # Lint and auto-fix
bun format         # Format code (Prettier)
bun format:check   # Check formatting
bun typecheck      # TypeScript type checking (tsc --noEmit)
```

## Commit Convention

Commits must follow Conventional Commits format enforced by commitlint:

```
<type>: <description>
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`, `revert`

## Architecture

**Framework:** Next.js 16 with App Router (not Pages Router)  
**Styling:** Tailwind CSS v4 — configured via PostCSS only (`postcss.config.mjs`), no `tailwind.config.js`  
**Language:** TypeScript in strict mode; path alias `@/*` maps to the project root  
**Fonts:** Geist Sans + Geist Mono loaded via `next/font/google`, exposed as CSS variables  
**Deployment:** Vercel (SpeedInsights enabled)

**Tailwind v4 notes:**

- Uses `@import 'tailwindcss'` syntax in `globals.css` (not v3 `@tailwind` directives)
- Theme customization uses `@theme inline` blocks in CSS, not a JS config file
- Custom colors `background` and `foreground` are defined as CSS variables with dark mode via `prefers-color-scheme`

**App Router structure:**

- `app/layout.tsx` — root layout; sets metadata, Geist fonts, and Vercel SpeedInsights
- `app/page.tsx` — home page (`/`)
- `app/globals.css` — global styles and Tailwind theme customization

## Code Quality

Pre-commit hooks (via Husky + lint-staged) automatically run on staged files:

- `.ts/.tsx/.js/.jsx` → `eslint --fix` then `prettier`
- Other file types (JSON, CSS, MD, YAML, HTML) → `prettier` only

ESLint config is in `eslint.config.mjs` (flat config format, ESLint v9). Prettier config is in `.prettierrc` (single quotes, trailing commas, 80-char line width).

Commitlint allows up to 1500-character headers (extended from default 100).

## Coding Standard (SOP)

This project follows the **Next.js Internal Coding Standard** defined in `Next.js - Internal Coding Standard.pdf` at the project root. Key rules enforced by agents:

- **No `any`** — use `unknown`, generics, or proper types
- **Layer separation**: Pages render containers, containers coordinate via hooks, UI components are pure (props-only, no API/store access)
- **Naming**: PascalCase components, useCamelCase hooks, kebab-case files, UPPER_SNAKE_CASE constants
- **Styling**: Tailwind CSS only, all colors via CSS variables, no inline styles, no hardcoded colors
- **API layer**: Two files only — `services/client.ts` (HTTP client) + `services/api.ts` (endpoints)
- **Server Components first** — `'use client'` only for interactivity
- **No `console.log`/`console.error`** in production

## Agents

| Agent               | Purpose                                                              | Model  |
| ------------------- | -------------------------------------------------------------------- | ------ |
| `portfolio-builder` | Build/modify portfolio sections, layouts, animations                 | Opus   |
| `code-reviewer`     | Review code against SOP — reports violations, does NOT fix           | Sonnet |
| `sop-architect`     | Plan feature architecture (file trees, data flow, layer separation)  | Sonnet |
| `feature-builder`   | Implement features following SOP with full quality gate              | Opus   |
| `perf-auditor`      | Audit Server/Client components, bundle size, image/font optimization | Sonnet |
