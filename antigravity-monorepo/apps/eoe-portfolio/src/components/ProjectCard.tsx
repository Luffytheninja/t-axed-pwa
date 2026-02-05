
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/lib/data'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function ProjectCard({ project, className }: { project: Project, className?: string }) {
    return (
        <Link href={`/work/${project.id}`} className="block group">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }}
                className={cn("flex flex-col gap-6", className)}
            >
                {/* Image Container */}
                <div className="relative overflow-hidden bg-[#EFEEEC] transition-transform duration-700 ease-out group-hover:scale-[1.01] aspect-[4/3]">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>

                {/* Modular Metadata Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/40">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-muted tracking-widest uppercase">Title</span>
                        <h3 className="text-xs font-semibold tracking-tight uppercase truncate">{project.title}</h3>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-muted tracking-widest uppercase">Date</span>
                        <span className="text-xs font-medium uppercase">{project.year}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-muted tracking-widest uppercase">Medium</span>
                        <span className="text-xs font-medium uppercase truncate">{project.medium}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-muted tracking-widest uppercase">Dimensions</span>
                        <span className="text-xs font-medium uppercase">{project.dimensions || 'N/A'}</span>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}
