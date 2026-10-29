import type { Metadata } from 'next';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { siteUrl } from '@/lib/site-config';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Htet Lin Lin Naing',
  description:
    'Htet Lin Lin Naing, Full Stack Developer with 4+ years of production experience, OpenAI API project integration, and current learning in agentic workflows and Python.',
  openGraph: {
    title: 'Htet Lin Lin Naing',
    description:
      'Htet Lin Lin Naing, Full Stack Developer with 4+ years of production experience, OpenAI API project integration, and current learning in agentic workflows and Python.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <noscript><style>{'.animated-text [data-motion-token], .portfolio-reveal { opacity: 1 !important; transform: none !important; }'}</style></noscript>
        <ThemeProvider>
          <Navbar
            links={[
              { label: 'Projects', href: '#projects' },
              { label: 'Experience', href: '#experience' },
              { label: 'Skills', href: '#skills' },
              { label: 'About', href: '#about' },
              { label: 'Contact', href: '#contact' },
            ]}
          />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
