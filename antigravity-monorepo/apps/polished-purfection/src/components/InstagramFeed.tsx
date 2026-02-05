"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram } from "lucide-react";

const IG_POSTS = [
    { id: 1, src: "/assets/Frenchies.jpeg" },
    { id: 2, src: "/assets/Chrome Nails.png" },
    { id: 3, src: "/assets/3D.jpeg" },
    { id: 4, src: "/assets/Bling.jpeg" },
    // Reusing these for now as placeholders for the feed
    { id: 5, src: "/assets/Frenchies.jpeg" },
    { id: 6, src: "/assets/Chrome Nails.png" },
];

export default function InstagramFeed() {
    return (
        <section className="py-24 px-6 bg-background border-t border-white/5 overflow-hidden">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <span className="text-gold tracking-[0.3em] font-sans font-medium uppercase text-xs mb-4 block opacity-70">
                            Our Portfolio
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif text-white">Follow the Art</h2>
                    </div>
                    <a
                        href="https://www.instagram.com/polished.purfection?igsh=MWxkaXd3azZsNjgwdw=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gold hover:text-white transition-colors font-sans uppercase tracking-widest text-xs border-b border-gold/30 pb-1"
                    >
                        <Instagram size={16} />
                        @polished.purfection
                    </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {IG_POSTS.map((post, idx) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative aspect-square group overflow-hidden rounded-sm"
                        >
                            <Image
                                src={post.src}
                                alt={`Instagram post ${post.id}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <Instagram className="text-white" size={24} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
