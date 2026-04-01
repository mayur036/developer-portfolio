'use client';

import dynamic from 'next/dynamic';

const CustomCursorInner = dynamic(
  () =>
    import('@/src/components/custom-cursor').then((mod) => mod.CustomCursor),
  { ssr: false },
);

export function ClientCursor() {
  return <CustomCursorInner />;
}
