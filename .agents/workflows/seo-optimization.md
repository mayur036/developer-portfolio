---
description: Apply SEO best practices and metadata structure
---

# SEO Optimization

Next.js automatically handles standard SEO patterns well, but ensure these checklist items are completed for any web page update:

1. **Next.js Metadata API**: Ensure `layout.tsx` and `page.tsx` utilize and export proper Next.js `Metadata` objects containing a descriptive `title` and `description`.
2. **Heading Hierarchy**: Ensure only a single `<h1>` tag exists per page route. Maintain sequential `<h2>` and `<h3>` structures for maximum accessibility scoring.
3. **Semantic HTML**: Replace large generic `<div>` blocks with semantic HTML5 tags: `<section>`, `<article>`, `<main>`, `<nav>`, `<aside>`, `<header>`, `<footer>`.
4. **Interactive Tracking**: Add specific, clear IDs to focal UI landmarks or buttons that could be utilized for testing or click-tracking analytics later.
5. **Alt Attributes**: All `<img>` or Next.js `<Image>` components must incorporate highly descriptive `alt=""` text blocks.
