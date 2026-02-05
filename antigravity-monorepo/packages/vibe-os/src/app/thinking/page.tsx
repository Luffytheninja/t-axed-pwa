'use client';

import Navigation from '@/components/layout/Navigation';
import { motion } from 'framer-motion';

const NOTES = [
    {
        date: '2026.01.25',
        title: 'The Friction of Interface',
        text: 'Modern UI kits have optimized for speed to the point of sterility. We need to reintroduce friction—not as a barrier, but as sensory feedback. The click of a shutter, the resistance of a knob. Digital needs weight.'
    },
    {
        date: '2026.01.12',
        title: 'Cognition vs. Concept',
        text: 'A conceptual site that requires a manual is a failure of communication. Surrealism is only effective if it sits on top of a perfectly legible structure. If a user doesn\'t know where they are, they don\'t care why the background is melting.'
    },
    {
        date: '2025.12.04',
        title: 'Brutalism as Honesty',
        text: 'Visible grids and raw typography aren\'t just aesthetic choices. They are declarations of intent. They say: "This is how the system works. There is nothing to hide."'
    }
];

export default function Thinking() {
    return (
        <>
            <Navigation />

            <section className="container-grid pt-40 pb-20">
                <div className="col-span-12 sm:col-span-6 space-y-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.5em] opacity-40">Section 02 // Intellectual Trust</span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter uppercase leading-[0.9]">
                        Thinking
                    </h1>
                    <p className="text-lg opacity-60 max-w-md">
                        Observations on systems, digital logic, and visual friction.
                    </p>
                </div>
            </section>

            <section className="container-grid pb-40">
                <div className="col-span-12 sm:col-span-8 flex flex-col gap-32">
                    {NOTES.map((note, i) => (
                        <motion.article
                            key={note.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="space-y-8"
                        >
                            <div className="flex items-center gap-6">
                                <span className="font-mono text-[11px] font-bold text-accent tracking-widest">{note.date}</span>
                                <div className="h-px flex-1 bg-ink/10" />
                            </div>
                            <div className="space-y-6">
                                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight uppercase leading-none">
                                    {note.title}
                                </h2>
                                <div className="max-w-2xl text-xl leading-relaxed text-ink/80 font-serif">
                                    {note.text}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <div className="hidden sm:block col-span-3 col-start-10">
                    <div className="sticky top-40 space-y-12">
                        <div className="space-y-4">
                            <span className="font-mono text-[10px] uppercase tracking-widest opacity-40">System State</span>
                            <div className="p-4 border border-ink/10 space-y-2">
                                <div className="flex justify-between font-mono text-[9px] uppercase tracking-tighter">
                                    <span>Uptime</span>
                                    <span className="text-accent">99.9%</span>
                                </div>
                                <div className="flex justify-between font-mono text-[9px] uppercase tracking-tighter">
                                    <span>Logic</span>
                                    <span className="text-accent text-right">Stable</span>
                                </div>
                            </div>
                        </div>
                        <p className="font-mono text-[10px] opacity-30 leading-relaxed uppercase tracking-widest">
                            Updates are pushed every few signals. <br />
                            Archive is open.
                        </p>
                    </div>
                </div>
            </section>

            <footer className="container-grid py-20 border-t border-ink/5">
                <div className="col-span-12 flex justify-between items-center opacity-30 font-mono text-[10px] uppercase tracking-widest">
                    <span>Intellectual Property &copy; 2026</span>
                    <span>Raw Signal</span>
                </div>
            </footer>
        </>
    );
}
