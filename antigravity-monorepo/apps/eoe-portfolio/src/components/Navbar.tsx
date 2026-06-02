'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const isHome = pathname === '/';

  // Swiss-style scroll transitions
  const navBg = useTransform(scrollY, [0, 100], ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.8)']);
  const navBlur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(12px)']);
  const logoOpacity = useTransform(scrollY, [0, 200], [isHome ? 0 : 1, 1]);
  const logoY = useTransform(scrollY, [0, 200], [isHome ? 10 : 0, 0]);

  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/photography', label: 'Photography' },
    { href: '/painting', label: 'Painting' },
    { href: '/about', label: 'About' },
  ];

  return (
    <>
      <motion.nav
        style={{ backgroundColor: navBg, backdropFilter: navBlur }}
        className="fixed top-0 left-0 w-full z-[60] px-6 md:px-12 py-6 flex justify-between items-center transition-swiss"
      >
        <motion.div style={{ opacity: logoOpacity, y: logoY }}>
          <Link href="/" className="pointer-events-auto" onClick={() => setIsOpen(false)}>
            <span className="text-xl font-bold tracking-tighter">EOE</span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 pointer-events-auto bg-black text-white px-8 py-2.5 rounded-full">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-micro hover:opacity-60 transition-opacity"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden pointer-events-auto p-2 mix-blend-difference text-white"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay — Swiss Modular Layout */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-between p-12 md:hidden"
          >
            <div className="w-full flex justify-between border-b pb-8 border-black/10">
              <span className="text-micro">Menu</span>
              <span className="text-micro">01 — 03</span>
            </div>

            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-5xl font-semibold tracking-tighter hover:opacity-50 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="w-full text-center border-t pt-8 border-black/10">
              <span className="text-micro text-muted">
                EOE — Acquisition & Curation
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

