---
description: Check code against Next.js architecture rules
---

# Next.js Architecture Check

This workflow ensures code adheres strictly to the project's internal architecture rules as defined in the GEMINI SOP.

1. **Verify Component Restrictions**: Ensure UI components in `src/components` have **NO** API calls and **NO** business logic. They must be pure presentational components receiving data via props.
2. **Verify Route Files**: For anything inside `app/`, ensure directories correspond to App Router best practices. Layouts (`layout.tsx`) must only deal with UI composition. Deep nesting (> 3 levels) should be avoided.
3. **Check Types and Hooks**: Ensure custom hooks (`src/hooks`) start with `useCamelCase` and contain zero UI/DOM logic (no JSX). Ensure strict TS conventions are met (no `any`, use `unknown`, explicit return functions).
4. **State Management**: If the feature stores data, verify it utilizes `Zustand` (or TanStack query for server state). Local state uses `useState`.
5. **Error & Toast Handling**: Do not rely on `console.log` for production errors. Validate API error handling using central interceptors, and use centralized Toast utilities to avoid spamming the user.
