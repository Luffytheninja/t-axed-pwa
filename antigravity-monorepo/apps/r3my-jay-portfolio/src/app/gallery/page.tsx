'use client';

import { motion } from 'framer-motion';
import { Download, ExternalLink, Play, CheckCircle2 } from 'lucide-react';

const videos = [
  {
    id: '1',
    title: "THRONE (DIDN'T DEY) - OFFICIAL VIDEO",
    platform: 'YouTube',
    thumbnail:
      'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'YUNNO THE DRILL - EP RELEASES',
    platform: 'YouTube',
    thumbnail:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'SONS OF GOD (OAU RAPPERS DISS) - OFFICIAL RE-UP',
    platform: 'YouTube',
    thumbnail:
      'https://images.unsplash.com/photo-1514525253361-bee8a18744ad?q=80&w=1000&auto=format&fit=crop',
  },
];

const achievements = [
  '1M+ Total Impressions on Breakout Performances',
  "Viral 'Sons of God' Rap Diss Cycle",
  "Featured in Native Mag 'Artists to Watch'",
  'Lead Architect of The 3NITY Community',
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-48">
      {/* Visuals Section */}
      <section className="px-6 md:px-24 mb-32">
        <header className="mb-12 flex justify-between items-end">
          <div className="space-y-4">
            <span className="text-accent text-[10px] font-bold tracking-[0.4em] uppercase block">
              Visuals
            </span>
            <h1 className="text-6xl md:text-8xl kinetic-text">THE GALLERY</h1>
          </div>
          <p className="text-[10px] text-cloudDancer/40 font-bold max-w-[150px] text-right uppercase">
            Scroll to explore cinematic experiences
          </p>
        </header>

        {/* Horizontal Scroll Gallery */}
        <div className="flex gap-8 overflow-x-auto no-scrollbar pb-12 -mx-6 px-6 md:mx-0 md:px-0">
          {videos.map((vid, idx) => (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="min-w-[300px] md:min-w-[600px] group cursor-pointer"
            >
              <div className="relative aspect-video bg-charcoal border border-accent/10 overflow-hidden">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-accent/20 backdrop-blur-sm border border-accent/50 rounded-full flex items-center justify-center text-accent">
                    <Play fill="currentColor" size={24} />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-bold tracking-widest text-accent mb-1 block uppercase">
                    {vid.platform}
                  </span>
                  <h3 className="text-xl font-bold uppercase italic">{vid.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EPK Section */}
      <section className="px-6 md:px-24 grid grid-cols-1 lg:grid-cols-12 gap-24">
        {/* Left: Bio Content */}
        <div className="lg:col-span-7 space-y-16">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-4xl kinetic-text">THE BIO</h2>
              <div className="flex-grow h-[1px] bg-accent/20" />
            </div>
            <div className="space-y-8 text-cloudDancer/70 text-base leading-relaxed font-light">
              <p className="text-xl text-cloudDancer italic">
                "r3my jay is a sonic experimentalist blurring the lines between Alternative Hip-Hop
                and dark, atmospheric vibes."
              </p>
              <p>
                Born Owolabi Jeremy, the artist known as r3my jay exists at the intersection of
                logic and chaos. A Law student by day and a genre-bending visionary by night, r3my
                has carved a unique space in the Nigerian alternative scene through his distinct
                &lsquo;Sons of God&rsquo; philosophy and a viral, high-velocity approach to rap.
              </p>
              <p>
                Known for his cult-followed project &lsquo;Agbada&rsquo; and the raw energy of his
                viral diss tracks, r3my sound is characterized by heavy bass, intricate wordplay,
                and an unapologetic experimental edge. With over 1 million impressions on his
                breakout performances, he continues to lead The 3NITY—a community of fans dedicated
                to the fusion of art, fashion, and sound.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl kinetic-text">Notable Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start p-4 bg-accent/5 border border-accent/10"
                >
                  <CheckCircle2 className="text-accent shrink-0" size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider text-cloudDancer/80">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Press Assets */}
        <div className="lg:col-span-5 space-y-12">
          <div className="p-8 border border-accent/20 bg-charcoal relative">
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-accent" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-accent" />

            <header className="mb-8">
              <h2 className="text-2xl font-bold italic tracking-tighter uppercase">PRESS ASSETS</h2>
              <p className="text-[10px] text-cloudDancer/40 font-bold uppercase">
                Industry Use Only
              </p>
            </header>

            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-accent text-charcoal font-bold uppercase tracking-widest text-xs hover:bg-cloudDancer transition-colors">
                <span>DOWNLOAD HI-RES PHOTOS</span>
                <Download size={16} />
              </button>
              <button className="w-full flex items-center justify-between p-4 border border-accent/20 text-accent font-bold uppercase tracking-widest text-xs hover:bg-accent/5 transition-colors">
                <span>FULL EPK (PDF)</span>
                <ExternalLink size={16} />
              </button>
              <button className="w-full flex items-center justify-between p-4 border border-accent/20 text-accent font-bold uppercase tracking-widest text-xs hover:bg-accent/5 transition-colors">
                <span>TECHNICAL RIDER</span>
                <ExternalLink size={16} />
              </button>
            </div>

            <div className="mt-12 space-y-4">
              <p className="text-[10px] font-bold text-cloudDancer/30 uppercase tracking-[0.2em]">
                As Seen On
              </p>
              <div className="flex flex-wrap gap-8 opacity-40 grayscale">
                <span className="text-xl font-black italic tracking-tighter">PULSE</span>
                <span className="text-xl font-black tracking-tighter">NATIVE</span>
                <span className="text-xl font-black tracking-tight">GENIUS</span>
              </div>
            </div>
          </div>

          <div className="p-8 border border-accent/10 bg-glass text-center space-y-4">
            <h3 className="text-sm font-bold tracking-[0.3em] uppercase">BOOKING & INQUIRIES</h3>
            <p className="text-[10px] text-cloudDancer/50 uppercase">management@r3myjay.com</p>
            <a
              href="/archive"
              className="inline-block px-6 py-2 border border-accent/30 text-[9px] font-bold uppercase tracking-widest hover:border-accent transition-colors"
            >
              OPEN FORM
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
