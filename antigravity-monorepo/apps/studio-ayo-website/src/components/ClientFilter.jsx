import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const reasons = [
    'You want visuals without thinking through the problem',
    'You care more about aesthetics than performance',
    'You are unwilling to make decisions or commit time',
    'You are shopping purely on price',
    'You require constant hand-holding without clarity'
]

const ClientFilter = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section ref={ref} className="relative w-full flex items-center justify-center px-6 md:px-12 py-24 overflow-hidden bg-near-black text-warm-white">
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative z-10 max-w-2xl mx-auto"
            >
                <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-12">
                    Studio AYO is not a fit if:
                </h2>

                <div className="space-y-6">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            transition={{ duration: 0.35, delay: index * 0.1, ease: "easeOut" }}
                            className="flex items-start gap-4"
                        >
                            <span className="text-warm-white/40 text-lg">×</span>
                            <p className="text-lg md:text-xl font-light text-warm-white/80">
                                {reason}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}

export default ClientFilter
