import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lungu Trade - excessive trade by studio ayo',
  description: 'The premium marketplace for curated deals. Experience commerce reimagined by Studio Ayo.',
  keywords: 'marketplace, premium, buy, sell, Lungu Trade, Studio Ayo',
  authors: [{ name: 'Studio Ayo' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}