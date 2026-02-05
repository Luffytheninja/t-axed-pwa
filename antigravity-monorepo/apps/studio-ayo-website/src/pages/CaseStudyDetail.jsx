import React, { useRef } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { caseStudies } from '../data/caseStudies'
import Footer from '../components/Footer'

const CaseStudyDetail = () => {
    const { id } = useParams()
    const study = caseStudies.find(cs => cs.id === id)

    const snapshotRef = useRef(null)
    const challengeRef = useRef(null)
    const approachRef = useRef(null)

    const snapshotInView = useInView(snapshotRef, { once: true, margin: "-100px" })
    const challengeInView = useInView(challengeRef, { once: true, margin: "-100px" })
    const approachInView = useInView(approachRef, { once: true, margin: "-100px" })

    // If study not found or doesn't have full details, redirect
    if (!study || !study.snapshot) {
        return <Navigate to="/work" replace />
    }

    return (
        <div className="w-full pt-24">
            {/* Hero Section */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={study.hero.bgImage}
                        alt={study.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-near-black/40 via-near-black/20 to-warm-white" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 text-center px-6 max-w-5xl mx-auto"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 text-white">
                        {study.title}
                    </h1>

                    <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 mb-12 max-w-3xl mx-auto">
                        {study.hero.tagline}
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center text-sm md:text-base font-light text-white/80 mb-8">
                        {study.hero.services.map(service => (
                            <span key={service} className="px-4 py-2 border border-white/30 backdrop-blur-sm">
                                {service}
                            </span>
                        ))}
                    </div>

                    {study.url && (
                        <motion.a
                            href={study.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-near-black font-normal rounded-full hover:bg-white/90 transition-all group"
                        >
                            Visit Live Experience
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </motion.a>
                    )}
                </motion.div>
            </section>

            {/* Project Snapshot */}
            <section ref={snapshotRef} className="px-6 md:px-12 py-24 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={snapshotInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="text-sm uppercase tracking-wider text-near-black/60 mb-12">
                        Project Snapshot
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        <div>
                            <h3 className="text-xs uppercase tracking-wider text-near-black/50 mb-3">Client</h3>
                            <p className="text-lg md:text-xl font-light">{study.snapshot.client}</p>
                        </div>
                        <div>
                            <h3 className="text-xs uppercase tracking-wider text-near-black/50 mb-3">Industry</h3>
                            <p className="text-lg md:text-xl font-light">{study.snapshot.industry}</p>
                        </div>
                        <div>
                            <h3 className="text-xs uppercase tracking-wider text-near-black/50 mb-3">Timeline</h3>
                            <p className="text-lg md:text-xl font-light">{study.snapshot.timeline}</p>
                        </div>
                        <div>
                            <h3 className="text-xs uppercase tracking-wider text-near-black/50 mb-3">Audience</h3>
                            <p className="text-lg md:text-xl font-light">{study.snapshot.audience}</p>
                        </div>
                    </div>

                    <div className="mt-12">
                        <h3 className="text-xs uppercase tracking-wider text-near-black/50 mb-4">Deliverables</h3>
                        <div className="flex flex-wrap gap-3">
                            {study.snapshot.deliverables.map(item => (
                                <span
                                    key={item}
                                    className="px-4 py-2 text-sm font-light border border-near-black/20 text-near-black/70"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* The Challenge */}
            <section ref={challengeRef} className="px-6 md:px-12 py-24 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={challengeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16"
                >
                    <div>
                        <h2 className="text-3xl md:text-4xl font-light mb-8">
                            The Challenge
                        </h2>
                        <p className="text-lg md:text-xl font-light leading-relaxed text-near-black/80">
                            {study.challenge}
                        </p>
                    </div>

                    <div className="aspect-[4/3] bg-near-black/5 overflow-hidden">
                        {study.challengeImage ? (
                            <img
                                src={study.challengeImage}
                                alt="The Challenge"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full" />
                        )}
                    </div>
                </motion.div>
            </section>

            {/* Our Approach */}
            {study.approach && (
                <section ref={approachRef} className="px-6 md:px-12 py-24 bg-near-black/[0.02]">
                    <div className="max-w-6xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            animate={approachInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                            className="text-3xl md:text-4xl font-light mb-16"
                        >
                            Our Approach
                        </motion.h2>

                        <div className="space-y-24">
                            {study.approach.map((pillar, index) => (
                                <motion.div
                                    key={pillar.title}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={approachInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                                    transition={{
                                        duration: 0.9,
                                        delay: index * 0.2,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                    className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''
                                        }`}
                                >
                                    <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                                        <h3 className="text-2xl md:text-3xl font-light mb-4">
                                            {pillar.title}
                                        </h3>
                                        <p className="text-lg md:text-xl font-light leading-relaxed text-near-black/70">
                                            {pillar.description}
                                        </p>
                                    </div>

                                    <div className={`aspect-[4/3] overflow-hidden ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                                        <img
                                            src={pillar.image}
                                            alt={pillar.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Reflection */}
            {study.reflection && (
                <section className="px-6 md:px-12 py-24 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h2 className="text-sm uppercase tracking-wider text-near-black/60 mb-8">
                            Reflection
                        </h2>
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-near-black/70">
                            {study.reflection}
                        </p>
                    </motion.div>
                </section>
            )}

            {/* CTA Section */}
            <section className="px-6 md:px-12 py-24 max-w-4xl mx-auto text-center border-t border-near-black/10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="text-2xl md:text-3xl font-light mb-8 text-near-black/70">
                        Building something thoughtful?
                    </p>

                    <Link to="/#contact">
                        <motion.button
                            whileHover={{ scale: 1.02, opacity: 0.9 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-12 py-4 bg-near-black text-warm-white text-lg font-normal tracking-wide transition-all duration-300"
                        >
                            Let's design it properly
                        </motion.button>
                    </Link>
                </motion.div>
            </section>

            <Footer />
        </div>
    )
}

export default CaseStudyDetail
