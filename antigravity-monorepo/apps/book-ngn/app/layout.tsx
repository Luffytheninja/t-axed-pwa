import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Using Geist as "Inter-like" modern font
import "./globals.css";
import { BookkeepingProvider } from "@/components/providers/BookkeepingContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookNGN | Fiscal Clarity",
  description: "Modern bookkeeping and tax automation for Nigerians.",
  applicationName: "BookNGN",
  formatDetection: {
    telephone: false,
  },
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <BookkeepingProvider>
          {children}
        </BookkeepingProvider>
      </body>
    </html>
  );
}
