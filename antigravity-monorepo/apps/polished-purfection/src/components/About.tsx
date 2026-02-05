"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="py-32 px-6 bg-[#080808] relative overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative aspect-[4/5] rounded-3xl overflow-hidden grayscale-[0.8] hover:grayscale-0 transition-all duration-1000"
                    >
                        <Image
                            src="/assets/hand_silhouette.png"
                            alt="The Artist"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="space-y-8"
                    >
                        <span className="text-gold tracking-[0.3em] font-sans font-medium uppercase text-xs opacity-70">
                            Behind the Art
                        </span>
                        <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight">
                            The Tech <br />
                            Behind the Art
                        </h2>
                        <div className="space-y-6 text-lg text-muted font-sans font-light leading-relaxed">
                            <p>
                                Polished Purfection was born out of a desire for intentionality in beauty. On OAU campus, life is fast—but your aesthetic should be calm, considered, and crafted to last.
                            </p>
                            <p>
                                I specialize in Gel-X extensions and custom nail art, focusing on long-wear integrity and flawless structure. Every set is an intimate collaboration between your vision and my technique.
                            </p>
                            <p className="italic font-serif text-foreground/80">
                                "I don't just do nails; I craft confidence, one stroke at a time."
                            </p>
                        </div>

                        <div className="pt-8 flex gap-8">
                            <div className="text-center">
                                <div className="text-3xl font-serif text-white">4+</div>
                                <div className="text-[10px] tracking-widest uppercase text-muted">Weeks Wear</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-serif text-white">100%</div>
                                <div className="text-[10px] tracking-widest uppercase text-muted">Hand-Painted</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-serif text-white">LTD</div>
                                <div className="text-[10px] tracking-widest uppercase text-muted">Weekly Slots</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
