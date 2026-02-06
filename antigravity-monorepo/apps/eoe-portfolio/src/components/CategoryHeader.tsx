'use client';

import { motion } from 'framer-motion';

interface CategoryHeaderProps {
  title: string;
  description: string;
}

export function CategoryHeader({ title, description }: CategoryHeaderProps) {
  return (
    <section className="mb-32 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.21, 0.45, 0.32, 0.9] }}
      >
        <span className="text-micro text-muted block mb-8 tracking-[0.2em]">{title}</span>
        <h1 className="text-hero mb-12 capitalize">{title}</h1>
        <p className="text-xl text-muted leading-relaxed max-w-2xl">{description}</p>
      </motion.div>
    </section>
  );
}
