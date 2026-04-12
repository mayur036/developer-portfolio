# Client Showcase System -- Design Spec

**Date:** 2026-04-12
**Status:** Approved
**Author:** Ronak Kapadi + Claude

## Overview

Add a client-specific presentation system to the developer portfolio, enabling tailored views for different clients through four integrated features: URL param filtering, named showcase pages, a pitch deck layout, and professionally designed PDF export.

## Goals

1. Let clients see a curated, relevant subset of the portfolio instantly
2. Impress high-value clients with a polished pitch-deck experience
3. Enable clients to share a professional PDF internally (e.g., with their CTO)
4. Keep everything data-driven -- adding a new showcase = adding an object to an array

## Non-Goals

- CMS or admin UI for managing showcases (edit the data file directly)
- Authentication or private showcases
- Analytics/tracking on showcase views (can be added later)

---

## Feature 1: URL Param Filtering

### Behavior

- `ronakkapadi.dev/?focus=ai` filters homepage to items tagged `ai`
- `ronakkapadi.dev/?focus=fullstack,payments` supports multiple tags (OR logic)
- No param = normal portfolio, zero change to current behavior
- Non-matching items receive a subtle opacity reduction (0.3) and blur, not hidden entirely
- A dismissible banner appears: "Showing projects relevant to **AI Solutions**" with "View Full Portfolio" link

### Implementation

- New hook: `src/hooks/use-focus-filter.ts`
  - Reads `searchParams` via `useSearchParams()` from `next/navigation`
  - Returns `{ activeTags: string[], filterItems: <T>(items: T[]) => { matched: T[], unmatched: T[] } }`
- Section components (`projects.tsx`, `services.tsx`, `skills.tsx`) accept an optional `focusTags` prop
  - When present, matched items render normally, unmatched items get `opacity-30 blur-[1px] pointer-events-none`
- `app/page.tsx` wraps content in a `Suspense` boundary for `useSearchParams`

### Data Changes

- `Project` interface: add `tags?: string[]`
- `Service` interface: add `tags?: string[]`
- Existing projects get tags:
  - `employee-engagement`: `['fullstack', 'payments', 'i18n']`
  - `course-marketplace`: `['fullstack', 'payments', 'seo']`
  - `ride-booking`: `['fullstack', 'realtime', 'payments']`
  - `land-property-portal`: `['fullstack', 'security']`
- Existing services get tags:
  - `service-fullstack`: `['fullstack']`
  - `service-ai`: `['ai']`
  - `service-frontend`: `['frontend', 'ui']`
  - `service-cloud`: `['cloud', 'infrastructure']`
  - `service-api`: `['api', 'realtime', 'payments']`
  - `service-consulting`: `['consulting', 'architecture']`

---

## Feature 2: Named Showcase Routes

### Route

`app/showcase/[slug]/page.tsx` -- dynamic route, server component

### Showcase Data Model

```ts
// src/types/showcase.ts
interface Showcase {
  slug: string; // URL segment: 'acme-corp'
  clientName: string; // 'Acme Corp'
  headline: string; // 'AI-Powered Solutions for Acme'
  intro: string; // 1-2 sentence tailored pitch
  projectIds: string[]; // References Project.id from portfolio.ts
  serviceIds: string[]; // References Service.id from portfolio.ts
  skillCategories?: string[]; // Filter by SkillCategory.title
  accentColor?: string; // Optional CSS color override
}
```

### Configuration File

`src/data/showcases.ts` -- exports `SHOWCASES: Showcase[]` with example showcases:

```ts
export const SHOWCASES: Showcase[] = [
  {
    slug: 'ai-solutions',
    clientName: 'AI Solutions Demo',
    headline: 'AI-Driven Development & Automation',
    intro:
      'See how I leverage AI tools to accelerate delivery and build intelligent business systems.',
    projectIds: ['employee-engagement', 'course-marketplace'],
    serviceIds: ['service-ai', 'service-fullstack', 'service-consulting'],
    skillCategories: ['AI & Modern Tools', 'Frontend Mastery'],
  },
  {
    slug: 'fullstack-showcase',
    clientName: 'Full-Stack Demo',
    headline: 'End-to-End Web Application Development',
    intro:
      'From database to deployment -- scalable applications built with modern tools.',
    projectIds: ['ride-booking', 'land-property-portal', 'employee-engagement'],
    serviceIds: ['service-fullstack', 'service-api', 'service-cloud'],
  },
];
```

### Route Behavior

- Server component reads `params.slug`, finds matching showcase in `SHOWCASES`
- 404 via `notFound()` if slug doesn't match
- `generateMetadata` produces custom OG tags: "Ronak Kapadi -- Prepared for [clientName]"
- Renders the pitch deck layout (Feature 3)

### Layout

`app/showcase/[slug]/layout.tsx` -- minimal layout:

- No `LazyInteractiveGrid` (no WebGL)
- No `Navbar` (no main nav distraction)
- No `ScrollIndicator`
- Includes `ThemeProvider`, `TooltipProvider`, fonts
- Clean background matching current theme

---

## Feature 3: Pitch Deck Layout

### Sections (top to bottom)

#### 3.1 Showcase Hero (`showcase-hero.tsx`)

- Your name + role (smaller, secondary)
- Showcase `headline` in large fluid type
- `intro` paragraph below
- Accent color bar/accent from showcase config or default
- No WebGL, no parallax -- clean professional background

#### 3.2 Selected Projects (`showcase-projects.tsx`)

- Full-width cards for each project in `projectIds`
- Each card has three-column layout: **Problem | Solution | Impact**
- Tech stack badges at bottom of each card
- No expand/collapse -- all content visible immediately
- Subtle border and shadow, card-hover-glow effect on hover

#### 3.3 Relevant Services (`showcase-services.tsx`)

- Grid of services matching `serviceIds`
- 2-3 per row, same content as homepage but with more spacing
- Icon + title + description + highlights

#### 3.4 Skills Snapshot (`showcase-skills.tsx`)

- If `skillCategories` specified: show only matching categories
- If not specified: show all skills
- Compact badge grid layout

#### 3.5 Call to Action (`showcase-cta.tsx`)

- Large heading: "Let's discuss how I can help [clientName]"
- Email button (mailto link)
- "Download PDF" button (triggers Feature 4)
- "View Full Portfolio" link to homepage
- Availability status badge

### Design Principles

- No scroll-triggered animations -- all content visible on load
- Minimal motion -- subtle fade-ins only (200ms, ease-out)
- Print-friendly -- clean backgrounds, high contrast
- Responsive -- works on mobile, optimized for desktop
- Light/dark theme support via existing ThemeProvider

---

## Feature 4: PDF Export

### Technology

`@react-pdf/renderer` -- generates real PDF documents with vector text, not screenshots.

### Document Structure

**Page 1 -- Cover**

- Name, role, accent color bar at top
- Showcase headline (large)
- Intro paragraph
- Contact info: email, LinkedIn, GitHub
- Generation date

**Page 2+ -- Project Case Studies (one per page)**

- Project title + role
- Three-section layout: Problem, Solution, Impact
- Tech stack tags at bottom
- Accent-colored section dividers

**Services & Skills Page**

- Two-column services grid (title + description + highlights)
- Skills as compact inline tags
- Only rendered if showcase specifies them

**Final Page -- Contact**

- "Let's work together" heading
- Email, social links, portfolio URL
- Availability status

### Implementation

- `src/components/pdf/portfolio-pdf.tsx` -- Main `Document` component
- `src/components/pdf/pdf-cover.tsx` -- Cover page
- `src/components/pdf/pdf-project.tsx` -- Project case study page
- `src/components/pdf/pdf-services.tsx` -- Services & skills page
- `src/components/pdf/pdf-contact.tsx` -- Contact page
- `src/components/pdf/generate-pdf-button.tsx` -- Client component with download trigger

### PDF Generation Flow

1. User clicks "Download PDF" on showcase page
2. `generate-pdf-button.tsx` dynamically imports `@react-pdf/renderer` (code-split)
3. Renders `PortfolioPdf` component with showcase data + resolved projects/services
4. Calls `pdf(document).toBlob()`
5. Triggers browser download: `Ronak-Kapadi-[ClientName]-Portfolio.pdf`

### Styling

- Font: system default (Helvetica) for PDF reliability, or embed Sora if size permits
- Accent color from showcase config for headings, dividers, bars
- Clean whitespace, professional typography
- Dark mode not applicable -- PDF is always light background with dark text

---

## File Plan

### New Files

| File                                                     | Type             | Purpose                                  |
| -------------------------------------------------------- | ---------------- | ---------------------------------------- |
| `src/types/showcase.ts`                                  | Type definitions | `Showcase` interface                     |
| `src/data/showcases.ts`                                  | Data             | Showcase configurations array            |
| `src/hooks/use-focus-filter.ts`                          | Hook             | URL param filtering logic                |
| `app/showcase/[slug]/page.tsx`                           | Route            | Dynamic showcase page (server component) |
| `app/showcase/[slug]/layout.tsx`                         | Layout           | Minimal showcase layout                  |
| `src/components/sections/showcase/showcase-hero.tsx`     | Component        | Showcase hero section                    |
| `src/components/sections/showcase/showcase-projects.tsx` | Component        | Expanded project case study cards        |
| `src/components/sections/showcase/showcase-services.tsx` | Component        | Filtered services grid                   |
| `src/components/sections/showcase/showcase-skills.tsx`   | Component        | Optional filtered skills                 |
| `src/components/sections/showcase/showcase-cta.tsx`      | Component        | CTA + PDF download + links               |
| `src/components/pdf/portfolio-pdf.tsx`                   | Component        | Main PDF document                        |
| `src/components/pdf/pdf-cover.tsx`                       | Component        | PDF cover page                           |
| `src/components/pdf/pdf-project.tsx`                     | Component        | PDF project case study                   |
| `src/components/pdf/pdf-services.tsx`                    | Component        | PDF services & skills                    |
| `src/components/pdf/pdf-contact.tsx`                     | Component        | PDF contact page                         |
| `src/components/pdf/generate-pdf-button.tsx`             | Component        | Download trigger button                  |

### Modified Files

| File                                   | Change                                                       |
| -------------------------------------- | ------------------------------------------------------------ |
| `src/types/portfolio.ts`               | Add `tags?: string[]` to `Project` and `Service` interfaces  |
| `src/data/portfolio.ts`                | Add `tags` arrays to existing projects and services          |
| `app/page.tsx`                         | Wrap with focus filter logic, pass filtered data to sections |
| `src/components/sections/projects.tsx` | Accept optional focus filter, apply fade to unmatched        |
| `src/components/sections/services.tsx` | Accept optional focus filter, apply fade to unmatched        |
| `src/components/sections/skills.tsx`   | Accept optional focus filter, apply fade to unmatched        |

### Dependencies

| Package               | Purpose                 |
| --------------------- | ----------------------- |
| `@react-pdf/renderer` | PDF document generation |

---

## Edge Cases

- **Empty showcase**: If `projectIds` references an ID that doesn't exist in `portfolio.ts`, skip it silently (filter out non-matching IDs)
- **No matching tags**: If `?focus=xyz` matches nothing, show the full portfolio with no banner
- **Mobile PDF**: The download button works on mobile but the generated PDF is optimized for A4/Letter print
- **Long client names**: Truncate with ellipsis in the PDF header if exceeding available width
- **Theme on showcase**: Showcase pages respect the user's system theme preference (light/dark) for web view; PDF is always light

## Testing Strategy

- Type-check: `bun typecheck` passes with all new interfaces
- Lint: `bun lint` passes on all new files
- Manual: Verify showcase pages render correctly, URL filtering works, PDF generates and downloads
- Edge cases: Test with non-existent slug (404), empty tags, missing project IDs
