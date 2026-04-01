---
name: React 19 lint rule bans setState in useEffect
description: eslint-config-next with React 19 flags setState inside useEffect as error — use useSyncExternalStore for mounted checks instead
type: feedback
---

The `react-hooks/set-state-in-effect` rule (enabled by eslint-config-next with React 19) errors on `setState(true)` inside `useEffect(() => { ... }, [])` for hydration-safe mounted checks.

**Why:** React 19 considers synchronous setState in effects an anti-pattern that triggers cascading renders.
**How to apply:** Replace the `useState`/`useEffect` mounted pattern with `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)` where getSnapshot returns true and getServerSnapshot returns false.
