import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
    {
        name: 'Foundation',
        target: 'For early ideas and MVPs that need clarity before scale.',
        outcome: 'Outcome: a clear, launch-ready product foundation.'
    },
    {
        name: 'Product & Growth',
        target: 'For live products refining UX, structure, and systems.',
        outcome: 'Outcome: scalable design that supports growth.'
    },
    {
        name: 'Brand & Experience',
        target: 'For products aligning brand, interface, and message.',
        outcome: 'Outcome: a unified product and brand experience.'
    },
]

const Services = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section ref={ref} className="relative min-h-screen w-full flex items-center justify-center px-6 md:px-12 py-24 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=1920&h=1080&fit=crop&q=80"
                    alt="abstract services background"
                    className="w-full h-full object-cover opacity-[0.04]"
                />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.name}
                            initial={{ opacity: 0, y: 12 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                            transition={{
                                duration: 0.35,
                                delay: index * 0.1,
                                ease: "easeOut"
                            }}
                            className="group border-t border-near-black/10 pt-6"
                        >
                            <h3 className="text-2xl font-light mb-4 text-near-black">
                                {service.name}
                            </h3>
                            <p className="text-base font-light text-near-black/60 mb-4 h-12">
                                {service.target}
                            </p>
                            <p className="text-sm font-medium text-near-black/80">
                                {service.outcome}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.35, delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <p className="text-sm font-light text-near-black/40 mb-2">
                        All projects begin with an application.
                    </p>
                    <p className="text-sm font-light text-near-black/40">
                        The studio recommends the best path after review.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}

export default Services
