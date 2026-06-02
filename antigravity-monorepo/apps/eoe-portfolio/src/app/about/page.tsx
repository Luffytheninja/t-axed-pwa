import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Provenance',
  description:
    'The philosophy behind EOE: Technical mastery meets high-concept visual storytelling for private and corporate art environments.',
};

export default function AboutPage() {
  return (
    <div className="pt-48 pb-32 px-6 max-w-[1400px] mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-24">
        {/* Swiss Title Block */}
        <div className="md:col-span-12 mb-32 animate-fade-up">
           <span className="text-micro opacity-40 uppercase tracking-[0.3em] mb-4 block">Archive 001</span>
          <h1 className="text-hero leading-[0.85] tracking-tighter">
            Technical mastery. <br />
            Visual narrative.
          </h1>
        </div>

        {/* The Philosophy */}
        <div className="md:col-span-6 md:col-start-1 animate-fade-up [animation-delay:150ms]">
          <span className="text-micro text-muted block mb-8 tracking-[0.2em] uppercase">Philosophy of Space</span>
          <p className="text-2xl leading-[1.2] font-medium mb-12 tracking-tight">
            We believe that art is more than decoration; it is an investment in the atmosphere of a space.
            Each piece is a singular work of provenance.
          </p>
          <div className="flex flex-col gap-6 text-lg text-muted leading-relaxed">
            <p>
              Founded on the principles of architectural precision, EOE serves as a vehicle for projects
              that demand high-end intentionality and a timeless visual perspective. Our collection is curated
              for those who demand excellence in their environments.
            </p>
            <p>
              Operating at the intersection of cultural research and visual craftsmanship, we bridge the gap
              between technical execution and soulful storytelling.
            </p>
          </div>
        </div>

        {/* The Standards */}
        <div className="md:col-span-4 md:col-start-8 animate-fade-up [animation-delay:300ms]">
          <span className="text-micro text-muted block mb-8 tracking-[0.2em] uppercase">Curatorial Standards</span>
          <ul className="flex flex-col gap-8 text-sm border-t-2 border-black pt-12">
            <li className="flex flex-col gap-2">
              <span className="font-bold uppercase tracking-widest text-[10px]">Master-Grade Pigments</span>
              <p className="text-muted">Utilizing archival materials designed to maintain structural integrity for generations.</p>
            </li>
            <li className="flex flex-col gap-2">
              <span className="font-bold uppercase tracking-widest text-[10px]">Museum Quality</span>
              <p className="text-muted">High-clarity, non-reflective glass and museum-grade framing options available upon request.</p>
            </li>
            <li className="flex flex-col gap-2">
              <span className="font-bold uppercase tracking-widest text-[10px]">Singular Provenance</span>
              <p className="text-muted">Every original work is accompanied by a unique, artist-signed Certificate of Authenticity.</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Inquiry Block */}
      <div className="mt-96 pt-32 border-t border-black/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
           <div className="flex flex-col gap-4">
              <span className="text-micro uppercase tracking-widest opacity-40">Private Viewing</span>
              <p className="text-xl max-w-sm">For collectors seeking a specific dialogue between space and art.</p>
           </div>
           <div className="flex flex-col items-start md:items-end">
             <a
               href="mailto:hello@eoe.brand"
               className="text-3xl md:text-5xl hover:opacity-50 transition-swiss tracking-tighter font-semibold"
             >
               hello@eoe.brand
             </a>
           </div>
        </div>
      </div>
    </div>
  );
}

