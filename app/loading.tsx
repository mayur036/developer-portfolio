/**
 * Next.js loading boundary for the root page.
 * Shows a minimal, lightweight skeleton that matches the hero section layout
 * while JS chunks load. This improves perceived LCP by showing content-shaped
 * placeholders immediately instead of a blank screen.
 *
 * This is a Server Component (no 'use client') so it renders with zero JS cost.
 */
export default function Loading(): React.JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6 px-4">
        {/* Badge skeleton */}
        <div className="h-7 w-64 animate-pulse rounded-full bg-surface-alt/60" />
        {/* Name skeleton */}
        <div className="h-16 w-80 animate-pulse rounded-lg bg-surface-alt/60 sm:w-[28rem]" />
        {/* Tagline skeleton */}
        <div className="h-6 w-72 animate-pulse rounded-md bg-surface-alt/40 sm:w-96" />
        {/* Buttons skeleton */}
        <div className="mt-4 flex gap-4">
          <div className="h-12 w-36 animate-pulse rounded-full bg-surface-alt/50" />
          <div className="h-12 w-36 animate-pulse rounded-full bg-surface-alt/30" />
        </div>
      </div>
    </div>
  );
}
