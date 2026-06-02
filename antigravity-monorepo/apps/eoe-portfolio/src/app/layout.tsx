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
    template: '%s | EOE — Acquisition & Curation',
    default: 'EOE — High-End Art Acquisition & Curation',
  },
  description:
    'Experience a collection where technical mastery meets high-concept visual storytelling. Invest in contemporary oil paintings and luxury fine art photography.',
  keywords: [
    'High-end art for sale',
    'original paintings for sale',
    'luxury fine art photography',
    'invest in contemporary art',
    'premium wall art for collectors',
    'archival quality prints',
    'museum-grade art',
    'exclusive art collection',
    'buy fine art online'
  ],
  metadataBase: new URL('https://eoe.brand'),
  openGraph: {
    title: 'EOE | The Collection: Light, Shadow, and Canvas',
    description: 'A curated selection of original oil paintings and limited-edition fine art photography for discerning collectors.',
    type: 'website',
    url: 'https://eoe.brand',
    locale: 'en_GB',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EOE — Acquisition & Curation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EOE — Invest in Excellence',
    description: 'Museum-quality archival pigments and climate-controlled shipping for global art acquisition.',
    images: ['/og-image.png'],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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

