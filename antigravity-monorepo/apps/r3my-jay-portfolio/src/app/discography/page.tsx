"use client";

import { motion } from "framer-motion";
import ThreeNityPlayer from "@/components/ThreeNityPlayer";

export default function Discography() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-48 px-6 md:px-24">
            {/* Background Motifs */}
            <div className="fixed top-0 right-0 w-1/2 h-screen opacity-[0.02] pointer-events-none z-0">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M0 0 L100 50 L0 100 Z" fill="none" stroke="#00d9ff" strokeWidth="0.5" />
                </svg>
            </div>

            <header className="relative z-10 mb-20 space-y-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4"
                >
                    <div className="w-12 h-[1px] bg-accent" />
                    <span className="text-accent text-xs font-bold tracking-[0.4em] uppercase">The Catalogue</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl md:text-8xl kinetic-text"
                >
                    DISCOGRAPHY
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="max-w-xl text-cloudDancer/50 text-sm leading-relaxed font-light"
                >
                    Explore the evolving sound of r3my jay. From the cultural echoes of <span className="text-cloudDancer italic">Agbada</span> to the aggressive energy of <span className="text-cloudDancer italic">Sons of God</span>. Organized by eras and moods for the complete 3NITY experience.
                </motion.p>
            </header>

            <main className="relative z-10">
                <ThreeNityPlayer />
            </main>

            {/* Footer Branding */}
            <div className="mt-48 flex justify-center border-t border-accent/10 pt-12">
                <div className="flex items-center gap-8 text-[10px] font-bold text-cloudDancer/20 tracking-[0.3em] uppercase">
                    <span>OAU UNDERGROUND</span>
                    <div className="w-2 h-2 bg-accent/20 rotate-45" />
                    <span>EST. 2024</span>
                    <div className="w-2 h-2 bg-accent/20 rotate-45" />
                    <span>LAGOS NOIR</span>
                </div>
            </div>
        </div>
    );
}
