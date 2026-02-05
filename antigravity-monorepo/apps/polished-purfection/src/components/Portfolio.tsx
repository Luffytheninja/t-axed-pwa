"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const PORTFOLIO_ITEMS = [
    {
        id: 1,
        title: "Deep Emerald Chrome",
        category: "Gel-X",
        description: "Custom mixed chrome on stiletto tips.",
        src: "/assets/Press on 1.png"
    },
    {
        id: 2,
        title: "Clean French Minimal",
        category: "Classic",
        description: "The perfect smile line on almond structure.",
        src: "/assets/Press on 4.png"
    },
    {
        id: 3,
        title: "3D Pearl Accents",
        category: "Luxury",
        description: "Hand-sculpted textures with iridescent finish.",
        src: "/assets/Press on 3.png"
    },
    {
        id: 4,
        title: "Midnight Shimmer",
        category: "Signature",
        description: "Velvet magnetic effect with gold flakes.",
        src: "/assets/Press on 2.png"
    },
    {
        id: 5,
        title: "Matte Slate & Gloss",
        category: "Bespoke",
        description: "Mixed finishes for an intentional contrast.",
        src: "/assets/Press on 5.png"
    },
    {
        id: 6,
        title: "Abstract Line Art",
        category: "Art",
        description: "Hand-painted ultra-fine detailing.",
        src: "/assets/Hero 1.png"
    }
];

export default function Portfolio() {
    return (
        <section id="portfolio" className="py-32 px-6 bg-background relative">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <span className="text-gold tracking-[0.3em] font-sans font-medium uppercase text-xs mb-4 block opacity-70">
                        The Gallery
                    </span>
                    <h2 className="text-5xl md:text-7xl font-serif text-white mb-8">Selected Works</h2>
                    <p className="text-lg text-muted font-serif italic max-w-2xl mx-auto">
                        A showcase of precision, structure, and artistic intention. Each set is a unique collaboration.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {PORTFOLIO_ITEMS.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative aspect-[4/5] overflow-hidden rounded-2xl glossy"
                        >
                            <Image
                                src={item.src}
                                alt={item.title}
                                fill
                                className="object-contain p-12 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                <span className="text-gold text-xs tracking-widest uppercase mb-2">
                                    {item.category}
                                </span>
                                <h3 className="text-2xl font-serif text-white mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-foreground/60 font-sans italic">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <button className="text-muted hover:text-gold transition-colors font-sans tracking-widest uppercase text-xs border-b border-muted/20 pb-1">
                        View More on Instagram
                    </button>
                </div>
            </div>
        </section>
    );
}
