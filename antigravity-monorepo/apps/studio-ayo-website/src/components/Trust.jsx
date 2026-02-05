import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const Trust = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section ref={ref} className="w-full flex items-center justify-center px-6 md:px-12 py-24">
            <div className="max-w-4xl mx-auto text-center">
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-near-black/80 mb-12"
                >
                    Studio AYO designs clear, high-impact digital products for founders and teams who value outcomes, structure, and thinking over visual noise or trends.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
                >
                    <Link to="/#contact" className="text-sm font-light text-near-black/60 border-b border-near-black/20 pb-1 hover:text-near-black hover:border-near-black transition-all">
                        Read our philosophy
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

export default Trust
