"use client";

import { motion } from "framer-motion";

const PILLARS = [
    {
        title: "Longevity",
        description: "Engineered for durability. 4+ weeks of flawless wear without lifting or damage.",
    },
    {
        title: "Precision",
        description: "Meticulous cuticle work and balanced architecture. Every set is structurally sound.",
    },
    {
        title: "Intentionality",
        description: "Bespoke designs tailored to your aesthetic. No rushing, just pure artistic focus.",
    },
];

export default function Trust() {
    return (
        <section className="bg-background py-32 px-6 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[1px] border-white/5 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-[1px] border-white/5 rounded-full" />
            </div>

            <div className="container mx-auto z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-gold/60 tracking-[0.4em] font-sans font-medium uppercase text-xs mb-8 block">
                        The Philosophy
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 max-w-4xl mx-auto leading-[1.1]">
                        "Your hands are your greatest accessory. I just make sure they’re unforgettable."
                    </h2>
                    <div className="w-16 h-[1px] bg-gold mx-auto opacity-40" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {PILLARS.map((pillar, index) => (
                        <motion.div
                            key={pillar.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="p-12 rounded-[2.5rem] glossy border border-white/5 hover:border-gold/20 transition-all duration-700 group cursor-default"
                        >
                            <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center mb-10 group-hover:bg-gold/10 transition-colors">
                                <span className="text-gold text-xs font-serif italic">0{index + 1}</span>
                            </div>
                            <h3 className="text-2xl font-serif text-white mb-6 group-hover:text-gold transition-colors duration-500">
                                {pillar.title}
                            </h3>
                            <p className="text-muted text-lg leading-relaxed font-sans font-light">
                                {pillar.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

