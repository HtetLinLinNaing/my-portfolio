import type { Metadata } from 'next';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { siteUrl } from '@/lib/site-config';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Htet Lin Lin Naing | Full Stack Developer',
  description:
    'Portfolio of Htet Lin Lin Naing, a Full Stack Developer building reliable and responsive web applications.',
  openGraph: {
    title: 'Htet Lin Lin Naing | Full Stack Developer',
    description:
      'Portfolio of Htet Lin Lin Naing, a Full Stack Developer building reliable and responsive web applications.',
    type: 'website',
    images: ['/images/profile.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar
            links={[
              { label: 'About', href: '#about' },
              { label: 'Skills', href: '#skills' },
              { label: 'Experience', href: '#experience' },
              { label: 'Projects', href: '#projects' },
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
