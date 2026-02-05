"use client";

import { motion } from "framer-motion";

const POLICIES = [
    "Please arrive on time",
    "No extra guests",
    "Late arrivals may result in simplified services",
    "Deposits are non-refundable"
];

export default function Booking() {
    return (
        <section className="bg-[#080808] py-32 px-6 flex flex-col items-center justify-center relative border-t border-white/5">
            <div className="container max-w-3xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <span className="text-gold tracking-[0.3em] font-sans font-medium uppercase text-xs mb-8 block">
                        Limited Campus Availability
                    </span>
                    <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
                        Book Your Set
                    </h2>
                    <p className="text-lg md:text-xl text-muted font-sans leading-relaxed max-w-2xl mx-auto font-light">
                        Luxury is intentional. Every set is crafted with care, precision, and time.
                        Polished Purfection operates on limited weekly availability to ensure every client receives an unrushed experience.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left mb-24">
                    <div>
                        <h4 className="text-white font-serif text-2xl mb-6">How It Works</h4>
                        <ol className="space-y-4 text-muted font-sans font-light">
                            <li className="flex items-baseline gap-4">
                                <span className="text-gold font-serif">01</span> Choose your service
                            </li>
                            <li className="flex items-baseline gap-4">
                                <span className="text-gold font-serif">02</span> Select an available time
                            </li>
                            <li className="flex items-baseline gap-4">
                                <span className="text-gold font-serif">03</span> Secure your slot
                            </li>
                        </ol>
                        <p className="mt-8 text-xs text-foreground/40 italic">Appointments are confirmed once payment is received.</p>
                    </div>

                    <div>
                        <h4 className="text-white font-serif text-2xl mb-6">Policy</h4>
                        <ul className="space-y-4 text-muted font-sans font-light">
                            {POLICIES.map((policy, i) => (
                                <li key={i} className="flex gap-3">
                                    <span className="text-gold/50">•</span>
                                    {policy}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative inline-block group"
                >
                    <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        className="relative z-10 block bg-white text-black text-xl px-16 py-6 rounded-full font-serif uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                        Secure Your Slot
                    </a>
                </motion.div>

                <p className="mt-12 text-muted/30 text-xs tracking-[0.2em] uppercase">
                    OAU Campus • Limited Slots
                </p>
            </div>
        </section>
    );
}
