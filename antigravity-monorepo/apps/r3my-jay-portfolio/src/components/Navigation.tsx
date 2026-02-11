'use client';

import { useState, useEffect } from 'react';

const navLinks = [
    { href: '/', label: 'THE VOID' },
    { href: '/discography', label: 'DISCOGRAPHY' },
    { href: '/gallery', label: 'GALLERY' },
    { href: '/supply', label: 'SUPPLY' },
    { href: '/archive', label: 'ARCHIVE' },
];

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <>
            {/* Desktop floating pill nav — hidden on mobile */}
            <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-glass px-8 py-4 rounded-full border border-accent/20 hidden md:block">
                <ul className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a href={link.href} className="hover:text-accent transition-colors">
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Mobile burger button — visible only on mobile */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-[60] md:hidden w-12 h-12 rounded-full bg-glass border border-accent/20 flex items-center justify-center transition-all duration-300"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
            >
                <div className="relative w-5 h-4 flex flex-col justify-between">
                    <span
                        className={`block h-[2px] w-full bg-foreground rounded transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-[7px]' : ''
                            }`}
                    />
                    <span
                        className={`block h-[2px] w-full bg-foreground rounded transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0' : ''
                            }`}
                    />
                    <span
                        className={`block h-[2px] w-full bg-foreground rounded transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''
                            }`}
                    />
                </div>
            </button>

            {/* Mobile fullscreen overlay */}
            <div
                className={`fixed inset-0 z-[55] md:hidden transition-all duration-500 ${isOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                    }`}
                style={{ background: 'rgba(26, 26, 26, 0.95)', backdropFilter: 'blur(20px)' }}
            >
                <nav className="flex items-center justify-center h-full">
                    <ul className="flex flex-col items-center gap-8">
                        {navLinks.map((link, i) => (
                            <li
                                key={link.href}
                                className={`transition-all duration-500 ${isOpen
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-4'
                                    }`}
                                style={{ transitionDelay: isOpen ? `${i * 80 + 100}ms` : '0ms' }}
                            >
                                <a
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-bold uppercase tracking-[0.2em] text-foreground hover:text-accent transition-colors"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
}
