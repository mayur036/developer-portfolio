---
name: shadcn base-nova uses render prop not asChild
description: shadcn/ui base-nova style (2025+) uses @base-ui/react which has render prop instead of Radix asChild — use buttonVariants() with anchor tags for link buttons
type: feedback
---

When shadcn/ui is initialized with the "base-nova" style, it uses `@base-ui/react` instead of Radix UI. The Button component does NOT support `asChild`. Instead:

- For link-styled buttons, use `buttonVariants()` on an `<a>` tag directly
- For DialogTrigger wrapping a Button, use the `render` prop: `<DialogTrigger render={<Button />}>text</DialogTrigger>`

**Why:** The base-ui library has a fundamentally different composition model than Radix. Using `asChild` causes TS errors.
**How to apply:** Whenever creating link buttons or composing shadcn base-nova components, check if they use base-ui and use the `render` prop pattern.
