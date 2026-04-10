'use client';

import dynamic from 'next/dynamic';

/**
 * Client Component wrapper that lazy-loads InteractiveGrid with ssr: false.
 *
 * The WebGL canvas (three.js + @react-three/fiber + drei) adds ~400-500 KB
 * to the JS bundle. By lazy-loading with ssr: false:
 * - The bundle is code-split into a separate chunk
 * - It never runs during SSR (which would fail anyway without a WebGL context)
 * - The main thread stays free during initial page load, reducing TBT
 *
 * This must be a Client Component because `ssr: false` is not allowed in
 * Server Components (Next.js App Router constraint).
 */
const InteractiveGridInner = dynamic(
  () =>
    import('@/src/components/interactive-grid').then(
      (mod) => mod.InteractiveGrid,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="fixed inset-0 -z-10 bg-[#f8fafc] dark:bg-[#020617]"
        aria-hidden="true"
      />
    ),
  },
);

export function LazyInteractiveGrid(): React.JSX.Element {
  return <InteractiveGridInner />;
}
