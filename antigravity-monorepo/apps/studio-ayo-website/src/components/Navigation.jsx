import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    const navLinks = [
        { name: 'Work', path: '/work' },
        { name: 'Contact', path: '/#contact' }
    ]

    return (
        <>
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 transition-all duration-300 ${scrolled || isOpen ? 'bg-warm-white/95 backdrop-blur-sm border-b border-near-black/10' : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className="text-xl md:text-2xl font-light tracking-tight hover:opacity-70 transition-opacity z-50"
                    >
                        Studio Ayo
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-base md:text-lg font-light transition-opacity hover:opacity-70 ${location.pathname === link.path ? 'opacity-100 font-normal' : 'opacity-60'
                                    }`}
                                onClick={(e) => {
                                    if (link.path === '/#contact') {
                                        e.preventDefault()
                                        if (location.pathname !== '/') {
                                            window.location.href = '/#contact'
                                        } else {
                                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                                        }
                                    }
                                }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden z-50 p-2 -mr-2"
                        aria-label="Toggle Menu"
                    >
                        <div className="w-6 h-5 relative flex flex-col justify-between">
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                                className="w-full h-[1px] bg-near-black block origin-center transition-transform"
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="w-full h-[1px] bg-near-black block transition-opacity"
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                                className="w-full h-[1px] bg-near-black block origin-center transition-transform"
                            />
                        </div>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <motion.div
                initial={false}
                animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: '100%' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-40 bg-warm-white md:hidden pt-32 px-6"
            >
                <div className="flex flex-col gap-8">
                    {navLinks.map((link, index) => (
                        <motion.div
                            key={link.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.1 + index * 0.1 }}
                        >
                            <Link
                                to={link.path}
                                onClick={(e) => {
                                    setIsOpen(false)
                                    if (link.path === '/#contact') {
                                        e.preventDefault()
                                        if (location.pathname !== '/') {
                                            window.location.href = '/#contact'
                                        } else {
                                            setTimeout(() => {
                                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                                            }, 100)
                                        }
                                    }
                                }}
                                className="text-4xl font-light tracking-tight"
                            >
                                {link.name}
                            </Link>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.3 }}
                        className="mt-12 pt-8 border-t border-near-black/10"
                    >
                        <p className="text-sm font-light text-near-black/40 mb-4 uppercase tracking-widest">Social</p>
                        <div className="flex gap-6">
                            <a href="#" className="text-lg font-light opacity-60">X</a>
                            <a href="#" className="text-lg font-light opacity-60">LinkedIn</a>
                            <a href="#" className="text-lg font-light opacity-60">Read.cv</a>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </>
    )
}

export default Navigation
