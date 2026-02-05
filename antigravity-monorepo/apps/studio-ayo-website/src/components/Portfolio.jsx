import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { caseStudies } from '../data/caseStudies'

const Portfolio = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    // Show hero projects on homepage
    const featuredProjects = caseStudies.filter(p => p.tier === 'hero')

    return (
        <section ref={ref} className="min-h-screen w-full flex items-center justify-center px-6 md:px-12 py-24">
            <div className="max-w-6xl mx-auto w-full">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="text-3xl md:text-5xl font-light tracking-tight mb-16 text-center"
                >
                    Selected Work
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {featuredProjects.map((project, index) => (
                        <Link to={`/work/${project.id}`} key={project.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                                transition={{
                                    duration: 0.9,
                                    delay: index * 0.15,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                whileHover={{ y: -8 }}
                                className="group cursor-pointer"
                            >
                                <div className="aspect-[16/9] bg-near-black/5 mb-6 overflow-hidden rounded-2xl">
                                    <motion.img
                                        src={project.hero.bgImage}
                                        alt={project.title}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <h3 className="text-2xl md:text-3xl font-light mb-2 group-hover:text-near-black/70 transition-colors duration-300">
                                    {project.title}
                                </h3>

                                <p className="text-sm md:text-base font-light text-near-black/60 mb-2">
                                    {project.descriptor}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-4">
                                    {project.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="text-[10px] uppercase tracking-widest text-near-black/40 border border-near-black/10 px-2 py-1 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-16 text-center"
                >
                    <Link to="/work">
                        <motion.button
                            whileHover={{ scale: 1.02, opacity: 0.9 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-10 py-4 border border-near-black text-near-black text-base font-light tracking-wide hover:bg-near-black hover:text-warm-white transition-all duration-300 rounded-full"
                        >
                            View All Work
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

export default Portfolio
