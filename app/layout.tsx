import type { Metadata } from 'next';
import { DM_Sans, JetBrains_Mono, Sora } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { ThemeProvider } from '@/src/components/theme-provider';
import { ClientCursor } from '@/src/components/client-cursor';
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

export const metadata: Metadata = {
  title: 'Ronak Kapadi — Full Stack Developer',
  description:
    'Full Stack Developer building scalable, user-first applications. Explore my projects, experience, and technical skills.',
  keywords: [
    'Full Stack Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Portfolio',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <ClientCursor />
          {children}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
