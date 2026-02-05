"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="bg-background py-24 px-6 border-t border-white/5 relative overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    <div className="md:col-span-2">
                        <a href="#" className="font-serif text-4xl tracking-tighter text-white mb-8 block">
                            Polished<br />Purfection<span className="text-gold">.</span>
                        </a>
                        <p className="text-muted font-sans font-light max-w-md leading-relaxed">
                            Crafting high-integrity, artistic nail sets for those who value precision and intentionality. Campus-based, globally inspired.
                        </p>
                    </div>

                    <div>
                        <h5 className="text-white font-serif text-xl mb-6">Location</h5>
                        <ul className="space-y-4 text-muted font-sans font-light">
                            <li>OAU Campus</li>
                            <li>Ile-Ife, NG</li>
                            <li>By Appointment Only</li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-white font-serif text-xl mb-6">Socials</h5>
                        <ul className="space-y-4 text-muted font-sans font-light">
                            <li><a href="https://instagram.com" className="hover:text-gold transition-colors">Instagram</a></li>
                            <li><a href="https://tiktok.com" className="hover:text-gold transition-colors">TikTok</a></li>
                            <li><a href="#" className="hover:text-gold transition-colors">Pinterest</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] tracking-widest uppercase text-muted/40">
                        © 2026 Polished Purfection. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-[10px] tracking-widest uppercase text-muted/40">
                        <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute bottom-0 right-0 p-8 text-white/5 font-serif text-9xl tracking-tighter select-none pointer-events-none translate-y-12 translate-x-12">
                PURFECT
            </div>
        </footer>
    );
}
