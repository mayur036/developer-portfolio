import type { Metadata, Viewport } from 'next';
import { DM_Sans, JetBrains_Mono, Sora } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';

import { ThemeProvider } from '@/src/components/theme-provider';
import { ClientCursor } from '@/src/components/client-cursor';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ABOUT, PERSONAL } from '@/src/data/portfolio';
import './globals.css';

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ronakkapadi.dev';

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${PERSONAL.name} — ${PERSONAL.role} | AI Business Solutions`,
    template: `%s | ${PERSONAL.name}`,
  },
  description: ABOUT.bio || PERSONAL.tagline,
  keywords: [
    'Software Developer',
    'AI Solutions',
    'Business Software',
    'Next.js 19',
    'React',
    'TypeScript',
    'Lead Technology Architect',
    'Software Architect',
    PERSONAL.name,
    'Claude AI',
    'Antigravity',
  ],
  authors: [{ name: PERSONAL.name, url: baseUrl }],
  creator: PERSONAL.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title: `${PERSONAL.name} — ${PERSONAL.role}`,
    description: PERSONAL.tagline,
    siteName: `${PERSONAL.name} Portfolio`,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: PERSONAL.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PERSONAL.name} — ${PERSONAL.role}`,
    description: PERSONAL.tagline,
    images: ['/og-image.png'],
    creator: '@ronakkapadi', // Adjusted for expected handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSONAL.name,
    jobTitle: PERSONAL.role,
    url: baseUrl,
    sameAs: [
      'https://github.com/ronakkapadi22',
      'https://linkedin.com/in/ronakkapadi',
    ],
    description: ABOUT.bio,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <TooltipProvider>
            <ClientCursor />
            {children}
            <SpeedInsights />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
