'use client';

import Navigation from '@/components/layout/Navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';
import HeroPng from '@/components/visuals/HeroPng';
import { ASSET_MAP, PortfolioItem } from '@/data/assets';
import { useState, useMemo } from 'react';
import Image from 'next/image';

export default function Experiments() {
    const { experimentalMode, setExperimentalMode } = useUIStore();
    const [currentPath, setCurrentPath] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Derived state for the browser
    const { folders, files } = useMemo(() => {
        const folders = new Set<string>();
        const files: PortfolioItem[] = [];

        ASSET_MAP.forEach(item => {
            const matches = currentPath.every((seg, i) => item.breadcrumbs[i] === seg);
            if (matches) {
                if (item.breadcrumbs.length > currentPath.length) {
                    folders.add(item.breadcrumbs[currentPath.length]);
                } else if (item.breadcrumbs.length === currentPath.length) {
                    files.push(item);
                }
            }
        });

        return {
            folders: Array.from(folders).sort(),
            files: files.sort((a, b) => a.Name.localeCompare(b.Name))
        };
    }, [currentPath]);

    return (
        <>
            <Navigation />

            <section className="container-grid pt-40 pb-20">
                <div className="col-span-12 sm:col-span-8 space-y-6">
                    {!currentPath.length ? (
                        <>
                            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-rupture font-bold">Layer 2 // Experimental Mode</span>
                            <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter uppercase leading-[0.9]">
                                Laboratory
                            </h1>
                            <p className="text-lg opacity-60 max-w-md">
                                This is where the madness leaks through the cracks. No essential information lives here.
                            </p>
                        </>
                    ) : (
                        <div className="space-y-4">
                            <button onClick={() => setCurrentPath(prev => prev.slice(0, -1))} className="group flex flex-col gap-2">
                                <span className="font-mono text-[10px] uppercase tracking-widest opacity-40 group-hover:text-rupture">← Return to {currentPath[currentPath.length - 2] || 'Lab'}</span>
                                <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter uppercase leading-[0.9] text-rupture">
                                    {currentPath[currentPath.length - 1]}
                                </h1>
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <section className="container-grid pb-20 min-h-[60vh]">
                <div className="col-span-12">
                    {!experimentalMode ? (
                        <div className="py-40 flex flex-col items-center justify-center border-y border-rupture/20 bg-rupture/5 rounded-3xl space-y-8 group transition-all hover:bg-rupture/10">
                            <div className="w-16 h-16 rounded-full border-2 border-rupture flex items-center justify-center animate-pulse group-hover:scale-110 transition-transform">
                                <span className="text-rupture font-bold text-2xl">!</span>
                            </div>
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl font-bold uppercase tracking-widest text-rupture">Access Restricted</h2>
                                <p className="font-mono text-[10px] uppercase tracking-widest opacity-40">System requires manual override for experimental access.</p>
                            </div>
                            <button
                                onClick={() => setExperimentalMode(true)}
                                className="px-10 py-4 bg-rupture text-white font-bold uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,31,0,0.3)]"
                            >
                                Initialize Madness
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-20 py-10">

                            {/* Folder & File Explorer */}
                            <div className="border-t border-rupture/10 pt-10">
                                <div className="divide-y divide-rupture/5">
                                    {folders.map((folder, i) => (
                                        <motion.button
                                            key={folder}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            onClick={() => setCurrentPath(prev => [...prev, folder])}
                                            className="w-full py-8 flex items-center justify-between group text-left transition-all hover:pl-4"
                                        >
                                            <div className="flex items-baseline gap-6">
                                                <span className="font-mono text-[9px] opacity-20 uppercase">DIR</span>
                                                <span className="text-2xl sm:text-4xl font-bold uppercase tracking-tighter group-hover:text-rupture transition-colors">
                                                    {folder}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="font-mono text-[9px] uppercase tracking-widest text-rupture">Explore Sector</span>
                                            </div>
                                        </motion.button>
                                    ))}

                                    {files.length > 0 && (
                                        <div className="grid grid-cols-12 gap-8 py-10">
                                            {files.map((file, i) => (
                                                <motion.div
                                                    key={file.path}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className="col-span-12 sm:col-span-6 lg:col-span-4 space-y-4 group"
                                                >
                                                    <button
                                                        onClick={() => setSelectedImage(file.path)}
                                                        className="w-full aspect-square relative bg-ink/5 overflow-hidden border border-ink/10 group-hover:border-rupture/30 transition-colors cursor-zoom-in"
                                                    >
                                                        <Image
                                                            src={file.path}
                                                            alt={file.Name}
                                                            fill
                                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                                                        />
                                                    </button>
                                                    <div className="flex justify-between items-start">
                                                        <span className="font-mono text-[10px] uppercase tracking-widest opacity-40 truncate flex-1">{file.Name}</span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Kinetic Sandbox Area - Always Visible in Lab Mode */}
                            {!currentPath.length && (
                                <div className="col-span-12 mt-20 border-t border-rupture/10 pt-20">
                                    <div className="text-center mb-10">
                                        <span className="font-mono text-[10px] uppercase tracking-widest opacity-40">System // Kinetic Stress Test</span>
                                        <h3 className="text-2xl font-bold uppercase tracking-tighter mt-2">Interact and Disturb</h3>
                                    </div>
                                    <div className="h-[80vh] relative overflow-hidden rounded-3xl border border-rupture/10 bg-rupture/[0.02] dashed-grid-rupture">
                                        {[0, 1, 2, 3, 0, 1].map((idx, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute cursor-grab active:cursor-grabbing"
                                                initial={{
                                                    x: (Math.random() - 0.5) * 600,
                                                    y: (Math.random() - 0.5) * 400,
                                                    rotate: Math.random() * 360
                                                }}
                                                drag
                                                dragConstraints={{ left: -400, right: 400, top: -300, bottom: 300 }}
                                                whileHover={{ scale: 1.1, zIndex: 50 }}
                                                style={{ left: '50%', top: '50%' }}
                                            >
                                                <HeroPng index={idx} className="w-48 h-48 sm:w-64 sm:h-64 opacity-80 hover:opacity-100" />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Image Overlay */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-surface/98 backdrop-blur-xl flex items-center justify-center p-4 sm:p-20 overflow-auto cursor-zoom-out"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-full max-h-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage}
                                alt="Experimental Data"
                                className="max-w-full max-h-[85vh] object-contain border border-rupture/20 shadow-[0_40px_100px_rgba(220,38,38,0.1)]"
                            />
                            <div className="mt-8 flex justify-between items-end border-t border-rupture/10 pt-8">
                                <div className="space-y-1">
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-rupture">Sector Artifact // Experimental</span>
                                    <h4 className="text-xl font-bold uppercase tracking-tighter">{selectedImage.split('/').pop()}</h4>
                                </div>
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="px-6 py-2 bg-rupture text-white font-mono text-[10px] uppercase tracking-widest hover:brightness-110 transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <footer className="container-grid py-20 border-t border-ink/5">
                <div className="col-span-12 flex justify-between items-center opacity-30 font-mono text-[10px] uppercase tracking-widest">
                    <span>The Laboratory &copy; 2026</span>
                    <span>Volatile Layer</span>
                </div>
            </footer>
        </>
    );
}
