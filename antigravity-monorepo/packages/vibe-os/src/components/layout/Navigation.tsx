'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';

export default function Navigation() {
    const pathname = usePathname();
    const { toggleExperimentalMode, experimentalMode } = useUIStore();

    const navItems = [
        { label: 'Work', href: '/work' },
        { label: 'Thinking', href: '/thinking' },
        { label: 'Experiments', href: '/experiments' },
        { label: 'Contact', href: '/contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 p-6 sm:p-10 pointer-events-none">
            <div className="container-grid w-full items-baseline">
                <div className="col-span-6 sm:col-span-4 pointer-events-auto">
                    <Link href="/" className="group inline-flex flex-col">
                        <span className="font-bold text-lg leading-none tracking-tighter uppercase">Luffy</span>
                        <span className="font-mono text-[10px] uppercase opacity-40 group-hover:opacity-100 group-hover:text-accent transition-all">The Creative</span>
                    </Link>
                </div>

                <div className="hidden sm:flex col-span-6 col-start-7 justify-end gap-x-8 pointer-events-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`nav-link ${pathname === item.href ? 'text-accent font-bold' : 'opacity-60 text-ink/80 hover:opacity-100'}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <button
                        onClick={toggleExperimentalMode}
                        className={`nav-link border-l border-ink/10 pl-8 ${experimentalMode ? 'text-rupture animate-pulse' : 'opacity-30'}`}
                    >
                        {experimentalMode ? 'Madness: ON' : 'Madness?'}
                    </button>
                </div>

                {/* Mobile Toggle Button - Simplest version */}
                <div className="sm:hidden col-span-6 flex justify-end pointer-events-auto">
                    <button
                        onClick={toggleExperimentalMode}
                        className={`nav-link ${experimentalMode ? 'text-rupture' : 'opacity-30'}`}
                    >
                        {experimentalMode ? '!' : '?'}
                    </button>
                </div>
            </div>
        </nav>
    );
}
