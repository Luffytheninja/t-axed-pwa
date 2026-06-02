import { projects } from '@/lib/data';
import { AsymmetricalGrid } from '@/components/AsymmetricalGrid';
import Link from 'next/link';

export default function Home() {
  // Swiss-style selection: curated set for the home grid
  const featuredProjects = projects.slice(0, 10);

  return (
    <div className="pt-48 pb-32 px-6 md:px-12 max-w-[1600px] mx-auto overflow-hidden">
      {/* Swiss Hero — Acquisition & Curation */}
      <section className="mb-64">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          <div className="lg:col-span-8 lg:sticky lg:top-48">
            <h1 className="text-hero animate-reveal leading-[0.9] tracking-tighter">
              The Portfolio: <br />
              Acquisition & <br />
              Curation
            </h1>
          </div>
          
          <div className="lg:col-span-4 flex flex-col gap-12 mt-12 lg:mt-0">
            <div className="flex flex-col gap-6 border-l-2 border-black pl-8 animate-reveal [animation-delay:200ms]">
              <span className="text-label">Value Statement</span>
              <p className="text-xl leading-[1.3] font-medium tracking-tight">
                Experience a collection where technical mastery meets high-concept visual storytelling. 
                This is more than art; it is an investment in atmosphere.
              </p>
              <p className="text-muted leading-relaxed">
                Each piece is a singular work of provenance, designed for those who demand 
                excellence in their private or corporate environments.
              </p>
            </div>

            <div className="flex flex-col gap-4 border-l-2 border-black/10 pl-8 animate-reveal [animation-delay:400ms]">
              <span className="text-micro text-muted">Primary Mediums</span>
              <div className="flex flex-wrap gap-2">
                {['Fine Art Photography', 'Original Paintings'].map((d) => (
                  <span key={d} className="text-xs px-3 py-1 bg-black text-white rounded-full uppercase tracking-tighter">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Grid Section */}
      <section className="border-t-2 border-black pt-12">
        <div className="flex justify-between items-baseline mb-16 px-2">
          <div className="flex flex-col gap-1">
            <span className="text-micro opacity-40">Section 01</span>
            <h2 className="text-label text-2xl">Featured Works for Sale</h2>
          </div>
          <div className="text-right flex flex-col gap-1">
            <span className="text-micro opacity-40">Timeline</span>
            <span className="text-label underline decoration-black/10">Active Collection 2024</span>
          </div>
        </div>

        <AsymmetricalGrid projects={featuredProjects} />
      </section>

      {/* Invest in Excellence — Quality Section */}
      <section className="mt-64 border-t-2 border-black pt-24 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 flex flex-col gap-4">
             <span className="text-micro opacity-40 uppercase tracking-widest">Provenance</span>
             <h3 className="text-4xl font-bold tracking-tighter">Invest in <br />Excellence.</h3>
          </div>
          
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-4 p-8 bg-black/5 rounded-xl transition-swiss hover:bg-black/10">
              <span className="text-micro font-bold">01 — Certification</span>
              <h4 className="text-label">Certificate of Authenticity</h4>
              <p className="text-sm text-muted">Signed by the artist to ensure long-term value and provenance for global collectors.</p>
            </div>
            
            <div className="flex flex-col gap-4 p-8 bg-black/5 rounded-xl transition-swiss hover:bg-black/10">
              <span className="text-micro font-bold">02 — Logistics</span>
              <h4 className="text-label">White-Glove Shipping</h4>
              <p className="text-sm text-muted">Insured, climate-controlled transport managed by specialists to guarantee safe delivery.</p>
            </div>

            <div className="flex flex-col gap-4 p-8 bg-black/5 rounded-xl transition-swiss hover:bg-black/10">
              <span className="text-micro font-bold">03 — Standards</span>
              <h4 className="text-label">Investment-Grade Materials</h4>
              <p className="text-sm text-muted">Archival-quality canvases and master-grade pigments designed to last generations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="mt-32 mb-64 flex flex-col items-center text-center max-w-4xl mx-auto py-32 border-y border-black/5">
        <blockquote className="text-3xl md:text-5xl font-medium tracking-tight leading-tight mb-8">
          &ldquo;Art is the only way to run away without leaving home.&rdquo;
        </blockquote>
        <p className="text-micro uppercase tracking-widest opacity-40">— An investment in high-end art is an investment in your daily inspiration.</p>
      </section>

      {/* Contact Section — Swiss Minimalist */}
      <section className="mt-64 border-t border-black/10 pt-32 pb-64">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <div className="flex flex-col gap-8">
            <span className="text-micro">02 — Get in touch</span>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.9]">
              Inquire About <br /> Private <br /> Viewings.
            </h3>
          </div>
          <div className="flex flex-col justify-end items-start md:items-end gap-12">
            <div className="flex flex-col items-start md:items-end">
              <span className="text-micro opacity-40 mb-2">Primary Contact</span>
              <a
                href="mailto:fomeozuwo@gmail.com"
                className="text-2xl md:text-4xl hover:opacity-50 transition-swiss tracking-tighter font-semibold"
              >
                fomeozuwo@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Footer Legal Links */}
      <footer className="mt-32 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <span className="text-micro opacity-40">© 2024 EOE. All rights reserved.</span>
        <div className="flex gap-8">
          <Link href="/legal#privacy" className="text-micro hover:underline">Privacy Policy</Link>
          <Link href="/legal#terms" className="text-micro hover:underline">Terms of Service</Link>
          <Link href="/legal#shipping" className="text-micro hover:underline">Logistics</Link>
        </div>
      </footer>
    </div>
  );
}


