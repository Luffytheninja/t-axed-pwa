import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { caseStudies, selectedWorksArchive } from '../data/caseStudies'
import Footer from '../components/Footer'

const CaseStudiesPage = () => {
    const heroRef = useRef(null)
    const proofRef = useRef(null)
    const researchRef = useRef(null)

    const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
    const proofInView = useInView(proofRef, { once: true, margin: "-100px" })
    const researchInView = useInView(researchRef, { once: true, margin: "-100px" })

    const heroCases = caseStudies.filter(cs => cs.tier === 'hero')
    const proofCases = caseStudies.filter(cs => cs.tier === 'proof')
    const researchCases = caseStudies.filter(cs => cs.tier === 'research')

    return (
        <div className="w-full pt-24">
            {/* Page Header */}
            <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
                        Selected Work
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-near-black/70 max-w-3xl mb-4">
                        A focused collection of identity systems, digital products, and web experiences shaped by research, restraint, and intent.
                    </p>
                    <p className="text-sm md:text-base font-light text-near-black/50 max-w-2xl">
                        Not everything here is polished for spectacle. Everything is designed to work.
                    </p>
                </motion.div>
            </section>

            {/* Core Case Studies */}
            <section ref={heroRef} className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-12"
                >
                    <h2 className="text-sm uppercase tracking-wider text-near-black/60 mb-2">
                        Core Case Studies
                    </h2>
                    <p className="text-base md:text-lg font-light text-near-black/60">
                        End-to-end projects where strategy, design, and execution met real constraints.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {heroCases.map((study, index) => (
                        <motion.div
                            key={study.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{ duration: 0.9, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Link to={`/work/${study.id}`} className="group block">
                                <div className="aspect-[16/10] overflow-hidden mb-6 bg-near-black/5 rounded-2xl">
                                    <motion.img
                                        src={study.hero.bgImage}
                                        alt={study.title}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    />
                                </div>

                                <h3 className="text-3xl md:text-4xl font-light mb-3 group-hover:text-near-black/70 transition-colors">
                                    {study.title}
                                </h3>

                                <p className="text-base md:text-lg font-light text-near-black/60 mb-4">
                                    {study.descriptor}
                                </p>

                                <div className="flex gap-2 flex-wrap">
                                    {study.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 text-xs font-light border border-near-black/20 text-near-black/60"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Studio Proof */}
            <section ref={proofRef} className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={proofInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-12"
                >
                    <h2 className="text-sm uppercase tracking-wider text-near-black/60 mb-2">
                        Studio Proof
                    </h2>
                    <p className="text-base md:text-lg font-light text-near-black/60">
                        Smaller in scope, but critical in showing how we think, ship, and iterate.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {proofCases.map((study, index) => (
                        <motion.div
                            key={study.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={proofInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{ duration: 0.9, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Link to={`/work/${study.id}`} className="group block">
                                <div className="aspect-[4/3] overflow-hidden mb-4 bg-near-black/5 rounded-2xl">
                                    <motion.img
                                        src={study.hero.bgImage}
                                        alt={study.title}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    />
                                </div>

                                <h3 className="text-xl md:text-2xl font-light mb-2 group-hover:text-near-black/70 transition-colors">
                                    {study.title}
                                </h3>

                                <p className="text-sm md:text-base font-light text-near-black/60">
                                    {study.descriptor}
                                </p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Research & Exploration */}
            <section ref={researchRef} className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={researchInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-12"
                >
                    <h2 className="text-sm uppercase tracking-wider text-near-black/60 mb-2">
                        Research & Exploration
                    </h2>
                    <p className="text-base md:text-lg font-light text-near-black/60">
                        Ongoing investigations that shape our thinking before final form.
                    </p>
                </motion.div>

                {researchCases.map((study, index) => (
                    <motion.div
                        key={study.id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={researchInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-4xl"
                    >
                        <div className="group">
                            <div className="aspect-[21/9] overflow-hidden mb-6 bg-near-black/5 relative rounded-2xl">
                                <motion.img
                                    src={study.hero.bgImage}
                                    alt={study.title}
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                />
                                <div className="absolute top-6 right-6">
                                    <span className="px-4 py-2 bg-warm-white/90 backdrop-blur-sm text-xs font-light border border-near-black/20 rounded-full">
                                        Research Phase
                                    </span>
                                </div>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-light mb-3 group-hover:text-near-black/70 transition-colors">
                                {study.title}
                            </h3>

                            <p className="text-base md:text-lg font-light text-near-black/60 mb-3">
                                {study.descriptor}
                            </p>

                            <p className="text-lg md:text-xl font-light text-near-black/50">
                                {study.hero.tagline}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* Selected Works Archive */}
            <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto border-t border-near-black/10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-12"
                >
                    <h2 className="text-sm uppercase tracking-wider text-near-black/60 mb-2">
                        Selected Works
                    </h2>
                    <p className="text-base md:text-lg font-light text-near-black/60">
                        Earlier projects and focused engagements that informed our craft.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedWorksArchive.map((work, index) => (
                        <motion.div
                            key={work.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                            className="border-b border-near-black/10 pb-4"
                        >
                            <h3 className="text-lg md:text-xl font-light mb-2">
                                {work.title}
                            </h3>
                            <p className="text-sm font-light text-near-black/60 mb-2">
                                {work.descriptor}
                            </p>
                            {work.status !== 'Completed' && (
                                <p className="text-xs font-light text-near-black/40 italic">
                                    {work.status}
                                </p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Closing CTA */}
            <section className="px-6 md:px-12 py-24 max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="text-2xl md:text-3xl font-light mb-8 text-near-black/70">
                        Have a project that needs clarity before aesthetics?
                    </p>

                    <Link to="/#contact">
                        <motion.button
                            whileHover={{ scale: 1.02, opacity: 0.9 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-12 py-4 bg-near-black text-warm-white text-lg font-normal tracking-wide transition-all duration-300 mb-4 rounded-full"
                        >
                            Start a conversation
                        </motion.button>
                    </Link>

                    <p className="text-sm font-light text-near-black/50">
                        Strategy, identity, and digital products for teams who care about intention.
                    </p>
                </motion.div>
            </section>

            <Footer />
        </div>
    )
}

export default CaseStudiesPage
