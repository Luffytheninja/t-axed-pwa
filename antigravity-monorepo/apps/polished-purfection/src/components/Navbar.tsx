"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const LINKS = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Book Now", href: "#booking", primary: true },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-4" : "py-8"
                }`}
        >
            <div className="container mx-auto px-6">
                <div className={`mx-auto max-w-5xl rounded-full transition-all duration-500 flex items-center justify-between px-8 ${scrolled ? "glossy py-3 shadow-2xl" : "py-4"
                    }`}>
                    <a href="#" className="font-serif text-2xl tracking-tighter text-white opacity-90 hover:opacity-100 transition-opacity">
                        PP<span className="text-gold">.</span>
                    </a>

                    <div className="hidden md:flex items-center gap-10">
                        {LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className={`text-xs uppercase tracking-[0.2em] transition-all hover:text-gold ${link.primary
                                    ? "bg-white text-black px-6 py-2.5 rounded-full font-medium hover:scale-105 active:scale-95"
                                    : "text-muted hover:text-foreground"
                                    }`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <button className="md:hidden text-white">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 8h16M4 16h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </motion.nav>
    );
}
