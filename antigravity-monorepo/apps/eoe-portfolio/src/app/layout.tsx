import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Navbar } from '@/components/Navbar';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | EOE Digital Gallery',
    default: 'EOE — Creative Cultural Brand',
  },
  description:
    'A cultural brand at the intersection of Photography, Painting, and Design. Elevating digital storytelling through restraint and intentionality.',
  openGraph: {
    title: 'EOE — Creative Cultural Brand',
    description: 'A gallery-first portfolio for high-end photography, painting, and design.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased text-foreground selection:bg-foreground selection:text-background`}
      >
        <Navbar />
        <SmoothScroll>
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
