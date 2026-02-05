"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from './ui/Button';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: "About", href: "/about" },
        { label: "Impact", href: "/impact" },
        { label: "Programs", href: "/programs" },
        { label: "Get Support", href: "/get-support" },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? 'bg-background/95 backdrop-blur-xl py-4 shadow-lg shadow-primary/5'
            : 'bg-transparent py-8'
            }`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link
                    href="/"
                    className={`text-2xl md:text-3xl font-serif font-semibold tracking-tight transition-colors ${isScrolled ? 'text-primary' : 'text-on-dark'
                        } hover:opacity-80`}
                >
                    Mom-C
                </Link>

                <div className="hidden lg:flex items-center space-x-10">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors ${isScrolled
                                    ? 'text-foreground/70 hover:text-accent'
                                    : 'text-on-dark-muted hover:text-on-dark'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center space-x-4">
                    <Button
                        variant={isScrolled ? "accent" : "outline-light"}
                        size="sm"
                        className="px-6 py-2.5"
                    >
                        Donate
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
