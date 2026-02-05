"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const NAILS = [
    { id: 1, src: "/assets/Hero 1.png" },
    { id: 2, src: "/assets/Hero 2.png" },
    { id: 3, src: "/assets/Hero 3.png" },
    { id: 4, src: "/assets/Hero 4.png" },
    { id: 5, src: "/assets/Hero 5.png" },
];

export default function Hero() {
    const scrollToServices = () => {
        const services = document.getElementById('services');
        if (services) {
            services.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden bg-background">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[120px] opacity-40" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[100px] opacity-30" />
            </div>

            <div className="z-10 text-center mb-8 md:mb-8 relative mt-12 md:mt-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <h1 className="text-6xl md:text-8xl font-serif mb-2 leading-tight tracking-tight text-foreground/90">
                        Polished<br className="md:hidden" /> Purfection
                    </h1>
                    <p className="text-xl md:text-2xl text-gold/80 font-serif italic mb-6 tracking-wide">
                        Purfect in every way.
                    </p>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-sm md:text-base text-muted max-w-md mx-auto font-sans tracking-widest uppercase mb-12"
                >
                    Clean Gel-X sets crafted with intention.<br />
                    Soft luxury for OAU girls who know.
                </motion.p>
            </div>

            <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center my-8 md:my-0">
                {/* Draggable Nails - Glossy Dark Container */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 1 }}
                    className="absolute inset-0 flex flex-wrap items-center justify-center gap-4 md:gap-6 p-4 md:p-8"
                >
                    {NAILS.map((nail, index) => (
                        <DraggableNail key={nail.id} src={nail.src} index={index} />
                    ))}
                </motion.div>
            </div>


            <div className="relative md:absolute md:bottom-12 z-20 flex flex-col items-center gap-4 mt-8 md:mt-0 pb-12 md:pb-0">
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="bg-foreground text-background px-12 py-4 rounded-full font-serif text-lg tracking-widest uppercase hover:scale-105 active:scale-95 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    onClick={scrollToServices}
                >
                    Pick Your Poison
                </motion.button>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-[10px] tracking-[0.2em] text-muted uppercase"
                >
                    Limited Weekly Slots
                </motion.span>
            </div>
        </section>
    );
}

function DraggableNail({ src, index }: { src: string; index: number }) {
    return (
        <motion.div
            drag
            dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
            dragElastic={0.05}
            whileDrag={{
                scale: 1.1,
                zIndex: 50,
                filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.5))"
            }}
            initial={{
                opacity: 0,
                y: 20
            }}
            animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.4 + (index * 0.1), duration: 0.8, ease: "easeOut" }
            }}
            className="cursor-grab active:cursor-grabbing relative grayscale-[0.2] hover:grayscale-0 transition-all duration-500 w-[70px] h-[120px] md:w-[90px] md:h-[160px]"
        >
            <Image
                src={src}
                alt="Nail kit item"
                fill
                className="object-contain drop-shadow-2xl"
                draggable={false}
            />
        </motion.div>

    );
}
