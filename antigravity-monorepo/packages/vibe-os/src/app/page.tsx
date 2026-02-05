'use client';

import Navigation from '@/components/layout/Navigation';
import Rupture from '@/components/layout/Rupture';
import { motion } from 'framer-motion';
import Link from 'next/link';
import HeroPng from '@/components/visuals/HeroPng';

export default function Home() {
  return (
    <>
      <Navigation />

      <section className="container-grid min-h-[90vh] flex flex-col justify-center pt-20 relative overflow-hidden">
        <div className="col-span-12 sm:col-span-8 z-10 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-12 pointer-events-auto"
          >
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-7xl font-bold tracking-tighter uppercase leading-[0.9]">
                Luffy
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-ink/80 max-w-xl">
                Creative systems, digital products, <br className="hidden sm:block" />
                <span className="text-accent underline decoration-2 underline-offset-8">visual logic</span>.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 pt-8">
              {['Work', 'Thinking', 'Experiments', 'Contact'].map((label) => (
                <Link
                  key={label}
                  href={`/${label.toLowerCase()}`}
                  className="group relative"
                >
                  <span className="font-mono text-sm uppercase tracking-widest font-bold group-hover:text-accent transition-colors">
                    {label}
                  </span>
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-px bg-accent origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                  />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Kinetic Hero Decoration */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="relative w-full h-full pointer-events-auto">
            {/* Drifting Artifacts */}
            {[0, 1, 2, 3].map((idx) => (
              <motion.div
                key={idx}
                className="absolute cursor-move hover:z-50"
                style={{
                  top: `${15 + (idx * 22)}%`,
                  right: `${idx % 2 === 0 ? '4%' : '35%'}`,
                }}
                initial={{ opacity: 0, scale: 0.8, rotate: idx * 45 }}
                animate={{ opacity: 0.8, scale: 1 }}
                transition={{ duration: 1, delay: idx * 0.2 }}
                drag
                dragConstraints={{ left: -1000, right: 300, top: -500, bottom: 500 }}
                whileHover={{ scale: 1.1, rotate: Math.random() * 20 - 10, opacity: 1 }}
              >
                <HeroPng
                  index={idx}
                  className={`${idx % 2 === 0 ? 'w-56 h-56 sm:w-80 sm:h-80' : 'w-32 h-32 sm:w-64 sm:h-64'}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Rupture - Mid-page Disruption */}
      <Rupture type="invert">
        <div className="container-grid py-20 bg-ink text-surface">
          <div className="col-span-12 sm:col-span-6 space-y-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] opacity-40">System Override</span>
            <h2 className="text-5xl sm:text-8xl font-bold tracking-tighter uppercase leading-[0.85]">
              Chaos is a spice, <br />
              not the meal.
            </h2>
          </div>
          <div className="col-span-12 sm:col-span-4 sm:col-start-9 flex items-end pb-4">
            <p className="font-mono text-xs opacity-60 leading-relaxed uppercase tracking-widest text-right">
              Functional logic governs the surface. <br />
              Intuition breaks the grid underneath.
            </p>
          </div>
        </div>
      </Rupture>

      <section className="container-grid py-40">
        <div className="col-span-12 sm:col-span-5 space-y-12">
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] opacity-40">Profile</span>
            <h3 className="text-3xl font-bold uppercase tracking-tighter">Controlled Brutalism</h3>
          </div>
          <div className="space-y-6 text-lg text-ink/70 leading-relaxed">
            <p>
              Design is not just how it looks. It is the system of rules that decide why it looks that way.
              I build digital environments that reward curiosity without sacrificing cognition.
            </p>
            <p>
              Currently focused on multidisciplinary creative direction and digital product architecture.
            </p>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-5 sm:col-start-8 flex items-center justify-center relative">
          <HeroPng index={2} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-mono text-[8px] uppercase tracking-[1em] opacity-10 rotate-90">Visual Artifact</span>
          </div>
        </div>
      </section>

      <footer className="container-grid py-20 border-t border-ink/5">
        <div className="col-span-12 flex justify-between items-center opacity-30 font-mono text-[10px] uppercase tracking-widest">
          <span>Luffy &copy; 2026</span>
          <span>Built for clarity</span>
        </div>
      </footer>
    </>
  );
}
