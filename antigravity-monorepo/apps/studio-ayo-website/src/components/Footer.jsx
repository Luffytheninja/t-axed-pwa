import React from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
    return (
        <footer className="w-full px-6 md:px-12 py-16 border-t border-near-black/10">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-6xl mx-auto"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <div>
                        <h3 className="text-2xl font-light mb-4">Studio Ayo</h3>
                        <p className="text-base font-light text-near-black/60">
                            Design with Purpose
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-light mb-4 text-near-black/80">Connect</h4>
                        <div className="space-y-3">
                            <a
                                href="https://twitter.com/LuffyTheNinja"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-base font-light text-near-black/60 hover:text-near-black transition-colors duration-300"
                            >
                                Twitter
                            </a>
                            <a
                                href="#contact"
                                className="block text-base font-light text-near-black/60 hover:text-near-black transition-colors duration-300"
                            >
                                Start a Project
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-light mb-4 text-near-black/80">Services</h4>
                        <div className="space-y-3">
                            <p className="text-base font-light text-near-black/60">Visual Identity</p>
                            <p className="text-base font-light text-near-black/60">Web Design</p>
                            <p className="text-base font-light text-near-black/60">Product UX</p>
                            <p className="text-base font-light text-near-black/60">MVP Support</p>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-near-black/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm font-light text-near-black/50">
                        © {new Date().getFullYear()} Studio Ayo. All rights reserved.
                    </p>
                    <p className="text-sm font-light text-near-black/50">
                        Crafted with intention
                    </p>
                </div>
            </motion.div>
        </footer>
    )
}

export default Footer
