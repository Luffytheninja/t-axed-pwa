'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const { toggleExperimentalMode, experimentalMode } = useUIStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Work', href: '/work' },
    { label: 'Thinking', href: '/thinking' },
    { label: 'Experiments', href: '/experiments' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 sm:p-10 pointer-events-none">
        <div className="container-grid w-full items-baseline">
          {/* Logo */}
          <div className="col-span-6 sm:col-span-4 pointer-events-auto">
            <Link href="/" className="group inline-flex flex-col" onClick={() => setMobileOpen(false)}>
              <span className="font-bold text-lg leading-none tracking-tighter uppercase">Luffy</span>
              <span className="font-mono text-[10px] uppercase opacity-40 group-hover:opacity-100 group-hover:text-accent transition-all">
                The Creative
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden sm:flex col-span-6 col-start-7 justify-end gap-x-8 pointer-events-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${pathname === item.href ? 'text-accent font-bold' : 'opacity-60 text-ink/80 hover:opacity-100'}`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={toggleExperimentalMode}
              className={`nav-link border-l border-ink/10 pl-8 ${experimentalMode ? 'text-rupture animate-pulse' : 'opacity-30'}`}
            >
              {experimentalMode ? 'Madness: ON' : 'Madness?'}
            </button>
          </div>

          {/* Mobile: hamburger + madness toggle */}
          <div className="sm:hidden col-span-6 flex justify-end items-center gap-4 pointer-events-auto">
            <button
              onClick={toggleExperimentalMode}
              className={`nav-link text-[10px] ${experimentalMode ? 'text-rupture' : 'opacity-30'}`}
            >
              {experimentalMode ? '!' : '?'}
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex flex-col justify-center gap-[5px] w-6 h-6 group"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-px w-full bg-ink origin-center transition-colors group-hover:bg-accent"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="block h-px w-full bg-ink origin-center transition-colors group-hover:bg-accent"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-px w-full bg-ink origin-center transition-colors group-hover:bg-accent"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile slide-down panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="sm:hidden fixed inset-0 z-40 bg-surface flex flex-col pt-28 px-8 pb-12"
          >
            {/* Grid background inside panel */}
            <div className="absolute inset-0 grid-lines pointer-events-none opacity-30" />

            <div className="flex-1 flex flex-col justify-center space-y-2 relative">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-baseline justify-between py-5 border-b border-ink/5 ${
                      pathname === item.href ? 'text-accent' : 'text-ink'
                    }`}
                  >
                    <span className="text-4xl font-bold tracking-tighter uppercase group-hover:text-accent transition-colors">
                      {item.label}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest opacity-30 group-hover:opacity-100 group-hover:text-accent transition-all">
                      0{i + 1}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative font-mono text-[9px] uppercase tracking-[0.3em] opacity-20"
            >
              Luffy © 2026 · a collection of Works
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
