import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
    {
        title: 'The studio reviews your submission',
        description: 'We look for clear problems, authority, and alignment with our capabilities.'
    },
    {
        title: 'A clear recommendation is made',
        description: 'We will tell you if we are the right fit, or point you in a better direction.'
    },
    {
        title: 'A next step is defined',
        description: 'For qualified projects, we schedule a concise call or provide a direct proposal.'
    }
]

const Process = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section ref={ref} className="w-full flex items-center justify-center px-6 md:px-12 py-24 bg-near-black/[0.02]">
            <div className="max-w-3xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="text-2xl md:text-3xl font-light tracking-tight mb-16 text-center"
                >
                    What happens after you apply
                </motion.h2>

                <div className="space-y-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 12 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                            transition={{
                                duration: 0.35,
                                delay: index * 0.1,
                                ease: "easeOut"
                            }}
                            className="flex items-start gap-6"
                        >
                            <span className="text-sm font-light text-near-black/40 pt-1">0{index + 1}</span>
                            <div>
                                <h3 className="text-xl md:text-2xl font-light mb-2">{step.title}</h3>
                                <p className="text-base font-light text-near-black/60">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.35, delay: 0.4 }}
                    className="mt-12 text-sm text-center font-light text-near-black/40"
                >
                    Response time: typically within 24–48 hours.
                </motion.p>
            </div>
        </section>
    )
}

export default Process
