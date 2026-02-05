'use client';

import Navigation from '@/components/layout/Navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { ASSET_MAP, PortfolioItem } from '@/data/assets';

export default function Work() {
    const [currentPath, setCurrentPath] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Derived state: what folders and files are in the current directory?
    const { folders, files } = useMemo(() => {
        const folders = new Set<string>();
        const files: PortfolioItem[] = [];

        ASSET_MAP.forEach(item => {
            const matches = currentPath.every((seg, i) => item.breadcrumbs[i] === seg);
            if (matches) {
                if (item.breadcrumbs.length > currentPath.length) {
                    // It's in a subfolder
                    folders.add(item.breadcrumbs[currentPath.length]);
                } else if (item.breadcrumbs.length === currentPath.length) {
                    // It's a file in this exact folder
                    files.push(item);
                }
            }
        });

        return {
            folders: Array.from(folders).sort(),
            files: files.sort((a, b) => a.Name.localeCompare(b.Name))
        };
    }, [currentPath]);

    const navigateBack = () => {
        setCurrentPath(prev => prev.slice(0, -1));
    };

    const navigateToFolder = (folder: string) => {
        setCurrentPath(prev => [...prev, folder]);
    };

    return (
        <>
            <Navigation />

            <section className="container-grid pt-40 pb-20">
                <div className="col-span-12 sm:col-span-10 space-y-6">
                    <div className="flex items-center flex-wrap gap-2 text-[10px] font-mono uppercase tracking-[0.3em] opacity-40">
                        <button
                            onClick={() => setCurrentPath([])}
                            className="hover:text-accent transition-colors"
                        >
                            Root
                        </button>
                        {currentPath.map((seg, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span>/</span>
                                <button
                                    onClick={() => setCurrentPath(currentPath.slice(0, i + 1))}
                                    className="hover:text-accent transition-colors"
                                >
                                    {seg}
                                </button>
                            </div>
                        ))}
                    </div>

                    <h1 className="text-5xl sm:text-8xl font-bold tracking-tighter uppercase leading-[0.85]">
                        {currentPath[currentPath.length - 1] || "Archive"}
                    </h1>
                </div>
            </section>

            <section className="container-grid pb-40 min-h-[50vh]">
                <div className="col-span-12 border-t border-ink/10">
                    <div className="divide-y divide-ink/5">

                        {/* Folders */}
                        {folders.map((folder, i) => (
                            <motion.button
                                key={folder}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => navigateToFolder(folder)}
                                className="w-full py-10 flex items-center justify-between group text-left transition-all hover:pl-4"
                            >
                                <div className="flex items-baseline gap-8">
                                    <span className="font-mono text-[10px] opacity-20 group-hover:opacity-100 group-hover:text-accent sm:w-8">
                                        DIR
                                    </span>
                                    <span className="text-3xl sm:text-5xl font-bold uppercase tracking-tighter group-hover:text-accent transition-colors">
                                        {folder}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-mono text-[10px] uppercase opacity-30 group-hover:opacity-100">Open Folder</span>
                                    <div className="w-8 h-px bg-ink/10 group-hover:w-16 group-hover:bg-accent transition-all duration-500" />
                                </div>
                            </motion.button>
                        ))}

                        {/* Files - Grid View */}
                        {files.length > 0 && (
                            <div className="grid grid-cols-12 gap-8 py-10">
                                {files.map((file, i) => (
                                    <motion.div
                                        key={file.path}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.03 }}
                                        className="col-span-12 sm:col-span-6 lg:col-span-4 space-y-3 group"
                                    >
                                        <button
                                            onClick={() => setSelectedImage(file.path)}
                                            className="w-full aspect-square relative bg-ink/5 overflow-hidden border border-ink/5 group-hover:border-accent/40 transition-all cursor-zoom-in"
                                        >
                                            <Image
                                                src={file.path}
                                                alt={file.Name}
                                                fill
                                                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform bg-accent/90 text-surface backdrop-blur-sm">
                                                <p className="font-mono text-[9px] uppercase tracking-widest truncate">{file.Name}</p>
                                            </div>
                                        </button>
                                        <div className="flex justify-between items-center px-1">
                                            <span className="font-mono text-[9px] uppercase tracking-widest opacity-20 group-hover:opacity-40">{file.Name}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {folders.length === 0 && files.length === 0 && (
                            <div className="py-40 text-center space-y-4 opacity-20">
                                <span className="text-8xl font-bold tracking-tighter uppercase">Empty</span>
                                <p className="font-mono text-[10px] uppercase tracking-widest">No artifacts found in this sector.</p>
                            </div>
                        )}
                    </div>
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
                            className="relative max-w-full max-h-full aspect-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage}
                                alt="Artifact Detail"
                                className="max-w-full max-h-[85vh] object-contain shadow-[0_40px_100px_rgba(0,0,0,0.2)]"
                            />
                            <div className="mt-8 flex justify-between items-end border-t border-ink/10 pt-8">
                                <div className="space-y-1">
                                    <span className="font-mono text-[10px] uppercase tracking-widest opacity-40">System Archive // Artifact</span>
                                    <h4 className="text-xl font-bold uppercase tracking-tighter">{selectedImage.split('/').pop()}</h4>
                                </div>
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="px-6 py-2 bg-ink text-surface font-mono text-[10px] uppercase tracking-widest hover:bg-accent transition-colors"
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
                    <span>Archive &copy; 2026</span>
                    <span>Stable Logic</span>
                </div>
            </footer>
        </>
    );
}
