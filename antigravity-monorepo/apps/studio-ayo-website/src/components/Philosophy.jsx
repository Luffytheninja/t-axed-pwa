import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const beliefs = [
    'Clarity over noise.',
    'Outcomes over aesthetics.',
    'Thinking before visuals.',
]

const Philosophy = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section ref={ref} className="relative min-h-screen w-full flex items-center justify-center px-6 md:px-12 py-24 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1506318137071-a8e063b497a1?w=1920&h=1080&fit=crop&q=80"
                    alt="philosophy background"
                    className="w-full h-full object-cover opacity-[0.03] grayscale"
                />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
                <div className="space-y-12">
                    {beliefs.map((belief, index) => (
                        <motion.p
                            key={index}
                            initial={{ opacity: 0, y: 12 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                            transition={{
                                duration: 0.35,
                                delay: index * 0.15,
                                ease: "easeOut"
                            }}
                            className="text-3xl md:text-5xl font-light leading-tight text-center text-near-black tracking-tight"
                        >
                            {belief}
                        </motion.p>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Philosophy
