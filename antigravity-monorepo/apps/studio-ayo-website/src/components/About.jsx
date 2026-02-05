import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const About = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section ref={ref} className="relative min-h-screen w-full flex items-center justify-center px-6 md:px-12 py-24 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1920&h=1080&fit=crop&q=80"
                    alt="abstract background"
                    className="w-full h-full object-cover opacity-[0.03] grayscale"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 max-w-3xl mx-auto"
            >
                <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-12 text-center">
                    Positioning
                </h2>

                <div className="space-y-8 text-center">
                    <p className="text-lg md:text-xl font-light leading-relaxed text-near-black/80">
                        Studio Ayo partners with ambitious founders and creative brands who understand that design is not decoration—it's strategy.
                    </p>

                    <p className="text-lg md:text-xl font-light leading-relaxed text-near-black/80">
                        We bring clarity to complexity, translating vision into visual systems that resonate, convert, and endure.
                    </p>

                    <p className="text-lg md:text-xl font-light leading-relaxed text-near-black/80">
                        Our work is minimal, intentional, and built to scale with your ambition.
                    </p>
                </div>
            </motion.div>
        </section>
    )
}

export default About
