---
name: 'tools'
description: "Development tooling commands and workflows for the developer portfolio project. Use this skill whenever the user asks about available commands, how to run the dev server, how to build, lint, format, type-check, add shadcn components, or any question about the project's dev tooling. Also use when the user says 'run checks', 'does it build', 'fix lint', 'format code', 'add a component from shadcn', or wants to verify the project is in a clean state."
---

# Development Tools

This project uses **bun** as its package manager. Always use `bun` — never `npm`, `yarn`, or `pnpm`.

## Commands

### Development

```bash
bun dev              # Start Next.js dev server (hot reload)
```

### Quality Checks

Run these to verify the project is clean. The recommended order matters — type errors should be caught before lint, and both before build:

```bash
bun typecheck        # TypeScript strict check (tsc --noEmit)
bun lint             # ESLint check
bun lint:fix         # ESLint with auto-fix
bun format:check     # Prettier check (no writes)
bun format           # Prettier auto-format all files
```

### Production

```bash
bun build            # Next.js production build
bun start            # Serve production build locally
```

### Adding shadcn Components

```bash
bunx shadcn add <component-name>    # e.g., bunx shadcn add button
```

shadcn components land in `components/ui/` (aliased as `@/components/ui`). The project uses `base-nova` style, `lucide` icons, and Tailwind CSS v4 with CSS variables.

## Full Quality Pipeline

When asked to run all checks, verify code quality, or confirm the project is shippable, run these in sequence and stop on first failure:

1. `bun typecheck`
2. `bun lint`
3. `bun format:check`
4. `bun build`

Present results as a summary table:

```
| Check      | Status |
|------------|--------|
| TypeScript | Pass/Fail |
| ESLint     | Pass/Fail |
| Formatting | Pass/Fail |
| Build      | Pass/Fail |
```

If a step fails, show the error and suggest a fix before moving on.

## Pre-commit Hooks

The project has **husky + lint-staged** configured. On every commit, ESLint and Prettier run automatically on staged files. If a commit is rejected, check the hook output — it's usually a lint or format issue that `bun lint:fix && bun format` will resolve.

## Installing Dependencies

```bash
bun install          # Install all deps from bun.lockb
bun add <package>    # Add a new dependency
bun add -D <package> # Add a dev dependency
```
