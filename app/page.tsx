import { lazy, Suspense } from 'react';

import { Hero } from '@/src/components/sections/hero';
import { Navbar } from '@/src/components/sections/navbar';
import { LazyInteractiveGrid } from '@/src/components/lazy-interactive-grid';

/**
 * Below-the-fold sections use React.lazy() to defer their JS
 * (framer-motion, lucide icons, etc.) from the critical path.
 * This reduces TBT because the browser parses/evaluates less JS upfront.
 * Hero and Navbar stay statically imported because they are above the fold.
 *
 * Both React.lazy() and next/dynamic() work in the App Router.
 * React.lazy() is used here as it is sufficient for pure client components and
 * avoids the extra next/dynamic wrapper overhead for these sections.
 */
const About = lazy(() =>
  import('@/src/components/sections/about').then((mod) => ({
    default: mod.About,
  })),
);
const Projects = lazy(() =>
  import('@/src/components/sections/projects').then((mod) => ({
    default: mod.Projects,
  })),
);
const Experience = lazy(() =>
  import('@/src/components/sections/experience').then((mod) => ({
    default: mod.Experience,
  })),
);
const Skills = lazy(() =>
  import('@/src/components/sections/skills').then((mod) => ({
    default: mod.Skills,
  })),
);
const Services = lazy(() =>
  import('@/src/components/sections/services').then((mod) => ({
    default: mod.Services,
  })),
);
const Credentials = lazy(() =>
  import('@/src/components/sections/credentials').then((mod) => ({
    default: mod.Credentials,
  })),
);
const Contact = lazy(() =>
  import('@/src/components/sections/contact').then((mod) => ({
    default: mod.Contact,
  })),
);
const Footer = lazy(() =>
  import('@/src/components/sections/footer').then((mod) => ({
    default: mod.Footer,
  })),
);
const BackToTop = lazy(() =>
  import('@/src/components/back-to-top').then((mod) => ({
    default: mod.BackToTop,
  })),
);

function SectionsFallback(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-6xl space-y-20 px-4 py-20 sm:px-6 sm:py-28">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="animate-pulse space-y-4">
          <div className="h-3 w-24 rounded bg-muted/20" />
          <div className="h-8 w-64 rounded bg-muted/20" />
          <div className="h-4 w-96 max-w-full rounded bg-muted/20" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="h-48 rounded-xl bg-muted/10" />
            <div className="h-48 rounded-xl bg-muted/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home(): React.JSX.Element {
  return (
    <>
      <LazyInteractiveGrid />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionsFallback />}>
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Services />
          <Credentials />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <BackToTop />
      </Suspense>
    </>
  );
}
