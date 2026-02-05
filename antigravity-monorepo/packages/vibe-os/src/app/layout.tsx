import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import VercelAnalytics from "@/components/layout/VercelAnalytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Luffy | Creative Systems & Digital Products",
  description: "Identity, Navigation, Work, Thinking, Contact. Controlled Brutalism by Luffy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="selection:bg-accent selection:text-white">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-surface text-ink min-h-screen flex flex-col`}>
        {/* Visible Grid Background */}
        <div className="fixed inset-0 grid-lines pointer-events-none opacity-40 z-[-1]" />

        <main className="flex-1 flex flex-col relative">
          {children}
        </main>

        <VercelAnalytics />
      </body>
    </html>
  );
}
