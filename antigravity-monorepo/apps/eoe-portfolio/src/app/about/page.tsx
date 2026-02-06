'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="pt-48 pb-32 px-6 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-24">
        <div className="md:col-span-12 mb-32">
          <h1 className="text-hero">
            Silence is the <br />
            ultimate luxury.
          </h1>
        </div>

        <div className="md:col-span-5 md:col-start-1">
          <span className="text-micro text-muted block mb-8 tracking-[0.2em]">The Brand</span>
          <p className="text-xl leading-relaxed mb-12">
            EOE is a multidisciplinary creative brand operating at the intersection of cultural
            research and visual craftsmanship. We believe that the most powerful expressions are
            often the most restrained.
          </p>
          <p className="text-lg text-muted leading-relaxed">
            Founded on the principles of architectural precision and gallery-grade aesthetic
            standards, EOE serves as a vehicle for projects that demand high-end intentionality and
            a timeless visual perspective.
          </p>
        </div>

        <div className="md:col-span-4 md:col-start-8">
          <span className="text-micro text-muted block mb-8 tracking-[0.2em]">Capabilities</span>
          <ul className="flex flex-col gap-6 text-sm border-t border-border pt-8">
            <li className="flex justify-between uppercase tracking-wider">
              <span>Photography</span>
              <span className="text-muted">Art Direction & Execution</span>
            </li>
            <li className="flex justify-between uppercase tracking-wider">
              <span>Painting</span>
              <span className="text-muted">Commissioned Works</span>
            </li>
            <li className="flex justify-between uppercase tracking-wider">
              <span>Design</span>
              <span className="text-muted">Identity systems</span>
            </li>
            <li className="flex justify-between uppercase tracking-wider">
              <span>Curation</span>
              <span className="text-muted">Exhibition Design</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-64 text-center py-32 border-t border-border/40">
        <p className="text-micro text-muted mb-8 tracking-[0.2em]">Inquiries</p>
        <a
          href="mailto:hello@eoe.brand"
          className="text-3xl md:text-5xl hover:opacity-50 transition-opacity tracking-tight font-medium"
        >
          hello@eoe.brand
        </a>
      </div>
    </div>
  );
}
