
'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export function Navbar() {
    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 100], [1, 0.8])
    const blur = useTransform(scrollY, [0, 100], [0, 4])
    const [isOpen, setIsOpen] = useState(false)

    const navLinks = [
        { href: '/photography', label: 'Photography' },
        { href: '/painting', label: 'Painting' },
        { href: '/design', label: 'Design' },
        { href: '/about', label: 'About' },
    ]

    return (
        <>
            <motion.nav
                style={{ opacity, backdropFilter: isOpen ? 'none' : `blur(${blur}px)` }}
                className="fixed top-0 left-0 w-full z-[60] px-6 py-8 flex justify-between items-center"
            >
                <Link href="/" className="pointer-events-auto" onClick={() => setIsOpen(false)}>
                    <span className="text-xl font-medium tracking-tight">EOE</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-12 text-micro pointer-events-auto bg-background/50 backdrop-blur-sm px-6 py-2 rounded-full border border-border/40">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="hover:opacity-50 transition-opacity">
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden pointer-events-auto p-2"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.21, 0.45, 0.32, 0.9] }}
                        className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center p-6 md:hidden"
                    >
                        <nav className="flex flex-col items-center gap-12">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-4xl font-light tracking-tight hover:opacity-50 transition-opacity"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <div className="absolute bottom-12 left-0 w-full text-center">
                            <span className="text-micro text-muted uppercase tracking-[0.3em]">Institutional Gallery</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
