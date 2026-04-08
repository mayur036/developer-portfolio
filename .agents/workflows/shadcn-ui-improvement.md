---
description: Enhance the UI using shadcn/ui components and modern Tailwind CSS practices.
---

# shadcn/ui & Tailwind CSS Improvement Workflow

This workflow guides the integration and optimization of shadcn/ui components into the developer portfolio, ensuring a premium, high-performance, and cohesive design system.

## 1. Design Principles & Aesthetics

Follow these rules to create a "WOW" effect:

- **Glassmorphism**: Use `bg-surface/50 backdrop-blur-md border-border-color` for containers.
- **Vibrant Accents**: Use the `--accent` CSS variable for highlights, glow effects, and interactive states.
- **Dynamic Interactions**: Always wrap interactive elements (buttons, links, badges) in `framer-motion` or provide tooltips for better UX.
- **Premium Typography**: Use `font-heading` (Outfit/Inter) for titles and `font-mono` for small technical labels or numbers.

## 2. shadcn/ui Implementation

### Installation

Install new components using the CLI to ensure path aliases are correctly handled:

```bash
npx shadcn@latest add [component-name]
```

### Usage Constraints (Project Specific)

> [!IMPORTANT]
> This project uses `@base-ui/react` as the underlying primitive for many shadcn components.
> When using `TooltipTrigger`, `SheetTrigger`, or `Button`, use the `render` prop instead of `asChild` to avoid TypeScript errors.

**Example:**

```tsx
<TooltipTrigger
  render={
    <Button variant="outline" render={<a href="/resume.pdf">Download</a>} />
  }
/>
```

## 3. Theming & Tailwind CSS

The project uses CSS variables defined in `@/app/globals.css`. Do not hardcode colors; use the following tokens:

- **Surface Colors**: `--surface`, `--surface-alt`
- **Accent Colors**: `--accent`, `--accent-glow`
- **Text**: `--heading`, `--body`, `--muted-text`
- **Borders**: `--border-color`

### Tailwind Configuration

Ensure `tailwind.config.ts` includes the shadcn animation presets and CSS variable mappings.

## 4. Optimization Checklist

- [ ] **SEO**: Ensure every page has a unique title and meta description.
- [ ] **Accessibility**: Use semantic HTML and ensure all shadcn components have proper `aria-labels`.
- [ ] **Performance**: Use dynamic imports for heavy 3D components like `InteractiveGrid`.
- [ ] **Mobile First**: Verify all shadcn `Sheet` or `Tabs` implementations are responsive.

## 5. Dark Mode Migration

To implement or update dark mode support in Next.js, follow these steps:

1.  **Install dependencies**:

    ```bash
    npm install next-themes
    ```

2.  **Create Theme Provider**: Create `src/components/theme-provider.tsx`:

    ```tsx
    'use client';
    import * as React from 'react';
    import { ThemeProvider as NextThemesProvider } from 'next-themes';

    export function ThemeProvider({
      children,
      ...props
    }: React.ComponentProps<typeof NextThemesProvider>) {
      return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
    }
    ```

3.  **Configure Root Layout**: Add `suppressHydrationWarning` to the `<html>` tag and wrap children with the provider in `app/layout.tsx`:
    ```tsx
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
    ```

## 6. Reference Links

- [shadcn/ui Dark Mode (Next.js)](https://ui.shadcn.com/docs/dark-mode/next)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs/components)
- [shadcn/ui Installation Guide](https://ui.shadcn.com/docs/installation)
- [shadcn/ui Theming](https://ui.shadcn.com/docs/theming)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation)
- [Next.js App Router Documentation](https://nextjs.org/docs)
