import type { Metadata, Viewport } from 'next';
import { DM_Sans, JetBrains_Mono, Sora } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { ThemeProvider } from '@/src/components/theme-provider';
import { ClientCursor } from '@/src/components/client-cursor';
import { ScrollIndicator } from '@/src/components/scroll-indicator';
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
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
    'Next.js',
    'React',
    'TypeScript',
    'Lead Technology Architect',
    'Software Architect',
    PERSONAL.name,
    'Full Stack Developer',
    'Web Application Development',
    'Node.js',
    'AWS',
  ],
  authors: [{ name: PERSONAL.name, url: baseUrl }],
  creator: PERSONAL.name,
  alternates: {
    canonical: baseUrl,
  },
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
        alt: `${PERSONAL.name} — ${PERSONAL.role} Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PERSONAL.name} — ${PERSONAL.role}`,
    description: PERSONAL.tagline,
    images: ['/og-image.png'],
    creator: '@ronakkapadi',
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
}>): React.JSX.Element {
  /**
   * Structured data using JSON-LD for rich search results.
   * Includes Person schema with professional details and a WebSite schema
   * for site-level search engine understanding.
   *
   * Using a raw <script> tag instead of next/script for static JSON-LD
   * avoids the Script component's runtime overhead and deferred loading
   * behavior, which is unnecessary for inline structured data.
   */
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: PERSONAL.name,
      jobTitle: PERSONAL.role,
      url: baseUrl,
      email: PERSONAL.email,
      sameAs: [
        'https://github.com/ronakkapadi22',
        'https://linkedin.com/in/ronakkapadi',
      ],
      description: ABOUT.bio,
      knowsAbout: [
        'JavaScript',
        'TypeScript',
        'React',
        'Next.js',
        'Node.js',
        'AWS',
        'AI Solutions',
        'Software Architecture',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: `${PERSONAL.name} Portfolio`,
      url: baseUrl,
      description: PERSONAL.tagline,
      author: {
        '@type': 'Person',
        name: PERSONAL.name,
      },
    },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body
        className={`${sora.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <TooltipProvider>
            <ClientCursor />
            <ScrollIndicator />
            {children}
            <SpeedInsights />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
