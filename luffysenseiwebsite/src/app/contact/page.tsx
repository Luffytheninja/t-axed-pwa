'use client';

import Navigation from '@/components/layout/Navigation';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Mail, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const socials = [
    {
      name: 'X / Twitter',
      url: 'https://x.com/LuffyTheNinja',
      icon: Twitter,
      handle: '@LuffyTheNinja',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/_luffysensei_/',
      icon: Instagram,
      handle: '@_luffysensei_',
    },
    {
      name: 'Email',
      url: 'mailto:ayomide.gunjob@gmail.com',
      icon: Mail,
      handle: 'ayomide.gunjob@gmail.com',
    },
  ];

  return (
    <>
      <Navigation />

      <section className="container-grid pt-40 pb-20">
        <div className="col-span-12 sm:col-span-6 space-y-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] opacity-40 italic">
            Layer 1 // Final Node
          </span>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter uppercase leading-[0.9]">
            Contact
          </h1>
          <p className="text-lg opacity-60 max-w-sm">
            Open for creative systems, digital architecture, and visual logic collaborations.
          </p>
        </div>
      </section>

      <section className="container-grid pb-40">
        <div className="col-span-12 sm:col-span-7 space-y-20">
          <div className="space-y-12">
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-40">
                Direct Signal
              </span>
              <a
                href="mailto:ayomide.gunjob@gmail.com"
                className="block text-3xl sm:text-6xl font-bold tracking-tighter uppercase hover:text-accent transition-colors break-words decoration-2 underline-offset-8 underline"
              >
                ayomide.gunjob@gmail.com
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-10 border-t border-ink/10">
              {socials
                .filter((s) => s.name !== 'Email')
                .map((social, i) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-4 p-8 border border-ink/5 hover:border-accent/40 bg-ink/5 hover:bg-accent/5 transition-all rounded-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex justify-between items-start">
                      <social.icon
                        size={24}
                        className="group-hover:text-accent transition-colors"
                        strokeWidth={1.5}
                      />
                      <ArrowUpRight
                        size={16}
                        className="opacity-20 group-hover:opacity-100 group-hover:text-accent transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest opacity-40">
                        {social.name}
                      </span>
                      <span className="text-xl font-bold uppercase tracking-tight">
                        {social.handle}
                      </span>
                    </div>
                  </motion.a>
                ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-4 sm:col-start-9 flex items-end">
          <div className="space-y-8 pb-10">
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-40">
                Availability
              </span>
              <p className="text-sm font-bold uppercase tracking-tight">
                Q1 2026: Open for projects
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-40">
                Location
              </span>
              <p className="text-sm font-bold uppercase tracking-tight">
                Lagos, NG // Remote World
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="container-grid py-10 border-t border-ink/5 mt-auto">
        <div className="col-span-12 flex justify-between items-center opacity-30 font-mono text-[10px] uppercase tracking-widest">
          <span>Connect &copy; 2026</span>
          <span>Stable signal found</span>
        </div>
      </footer>
    </>
  );
}
