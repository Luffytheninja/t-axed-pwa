'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* SECTION 1: THE VOID (HERO) */}
      <section className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">
        {/* Hero Video Placeholder - Loop clip from YUNNO THE DRILL */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale mix-blend-screen animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Kinetic Logo Layout */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={isLoaded ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <h1 className="text-[12vw] leading-none kinetic-text text-cloudDancer select-none translate-y-4">
              R3MY
            </h1>
            <div className="flex items-center gap-4 -translate-y-4">
              <div className="w-[10vw] h-[2px] bg-accent" />
              <h1 className="text-[12vw] leading-none kinetic-text text-accent select-none italic">
                JAY
              </h1>
              <div className="w-[10vw] h-[2px] bg-accent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-12 flex flex-col items-center gap-6"
          >
            <p className="text-sm tracking-[0.3em] font-light text-cloudDancer/60 uppercase">
              Architect of The 3NITY
            </p>

            <div className="flex gap-4">
              <button className="px-8 py-3 bg-accent text-background font-bold uppercase tracking-widest text-xs hover:bg-cloudDancer transition-all duration-300 transform hover:scale-105">
                ENTER THE 3NITY
              </button>
              <button className="px-8 py-3 border border-accent/30 text-accent font-bold uppercase tracking-widest text-xs hover:bg-accent/10 transition-all duration-300">
                STREAM NOW
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4 opacity-40">
          <div className="w-[1px] h-20 bg-gradient-to-b from-accent to-transparent" />
          <span className="text-[10px] tracking-widest rotate-90 origin-left ml-1 translate-y-4">
            SCROLL
          </span>
        </div>
      </section>

      {/* SECTION 2: LATEST DROP / FEATURED */}
      <section className="relative min-h-[50vh] bg-background py-24 px-6 md:px-24">
        <div className="tri-grid items-start">
          <div className="col-span-2 space-y-8">
            <h2 className="text-4xl md:text-6xl kinetic-text">Latest Release</h2>
            <div className="aspect-video w-full bg-charcoal border border-accent/20 relative overflow-hidden group shadow-[0_0_50px_rgba(0,217,255,0.05)]">
              <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/ivVHy_Z_iFk" // Official Throne Video
                title="r3my jay - THRONE (Official Video)"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="grayscale hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </div>
          </div>
          <div className="col-span-1 space-y-6 pt-12 md:pl-12 border-l border-accent/10">
            <div className="space-y-2">
              <span className="text-accent text-[10px] font-bold tracking-widest uppercase">
                Official Video
              </span>
              <h3 className="text-2xl font-bold italic">THRONE (Didn&rsquo;t Dey)</h3>
            </div>
            <p className="text-sm text-cloudDancer/60 leading-relaxed font-light">
              The flagship visual for the &lsquo;YUNNO THE DRILL&rsquo; era. A sonic declaration of
              authority and experimental excellence directed by the 3NITY collective.
            </p>
            <div className="pt-4 flex flex-col gap-3">
              <a
                href="https://youtu.be/ivVHy_Z_iFk"
                target="_blank"
                className="text-xs font-bold underline decoration-accent hover:text-accent transition-colors uppercase"
              >
                WATCH ON YOUTUBE
              </a>
              <a
                href="https://ffm.to/r3myjay-throne"
                target="_blank"
                className="text-xs font-bold underline decoration-accent hover:text-accent transition-colors uppercase"
              >
                STREAM THE MOVEMENT
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRIAD DESIGN MOTIF OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-40 opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 0 L100 0 L50 100 Z" fill="none" stroke="#00d9ff" strokeWidth="0.1" />
          <path d="M0 100 L100 100 L50 0 Z" fill="none" stroke="#00d9ff" strokeWidth="0.1" />
        </svg>
      </div>
    </div>
  );
}
