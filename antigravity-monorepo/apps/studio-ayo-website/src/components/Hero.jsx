import React from 'react'
import { motion } from 'framer-motion'
import heroChar from '../assets/hero-character.png'

const Hero = () => {
    return (
        <section className="relative min-h-screen w-full flex flex-col items-center px-6 md:px-12 pt-32 md:pt-48 pb-24 overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                    src={heroChar}
                    alt="Studio Ayo Background"
                    className="w-full h-full object-cover opacity-20 grayscale brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-warm-white/80 via-warm-white/40 to-warm-white/90" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center"
            >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8 leading-tight text-near-black">
                    Studio AYO designs clear, high-impact digital products for founders who need results, not noise.
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                    className="text-lg md:text-xl lg:text-2xl font-light text-near-black/70 mb-12 max-w-3xl mx-auto"
                >
                    Websites, UI systems, and visual identities built to launch fast, scale cleanly, and communicate value immediately.
                </motion.p>

                <div className="flex flex-col items-center gap-4 mb-20">
                    <motion.a
                        href="#contact"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.35, delay: 0.2, ease: "easeOut" }}
                        whileHover={{ scale: 1.01, opacity: 0.95 }}
                        whileTap={{ scale: 0.99 }}
                        className="inline-block px-10 py-5 bg-near-black text-warm-white text-base md:text-lg font-normal tracking-wide transition-all duration-200 rounded-full"
                    >
                        Apply to Work With Us
                    </motion.a>

                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-xs font-light text-near-black/40"
                    >
                        Takes 3–5 minutes. We review every submission personally.
                    </motion.span>
                </div>
            </motion.div>
        </section>
    )
}

export default Hero
