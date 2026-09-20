import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
