import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'r3my jay | Experimental Hip-Hop Artist | The 3NITY',
  description:
    'Official website of r3my jay (Owolabi Jeremy) - Nigerian Alternative Hip-Hop experimentalist and architect of The 3NITY. Stream Agbada, YUNNO THE DRILL, and more.',
};

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          inter.variable,
          'bg-background text-foreground font-sans selection:bg-accent selection:text-background',
        )}
      >
        {/* Sticky Social Bar */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 mix-blend-difference md:flex hidden">
          <a
            href="https://x.com/r3myjay"
            target="_blank"
            className="hover:text-accent transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://instagram.com/r3myjay"
            target="_blank"
            className="hover:text-accent transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          <a
            href="https://tiktok.com/@r3myjay"
            target="_blank"
            className="hover:text-accent transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
              <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.18 121.18 0 0 0 1.86 22.17A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14Z" />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/channel/UC3_aQA0Nne7FEo2SA30xRCQ"
            target="_blank"
            className="hover:text-accent transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 576 512">
              <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.781 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
            </svg>
          </a>
        </div>

        <main className="min-h-screen">{children}</main>

        <Navigation />
      </body>
    </html>
  );
}
