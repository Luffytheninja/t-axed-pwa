
import { projects } from '@/lib/data'
import { AsymmetricalGrid } from '@/components/AsymmetricalGrid'

export default function Home() {
  const featuredProjects = projects.slice(0, 8)

  return (
    <div className="pt-48 pb-32 px-6 max-w-[1400px] mx-auto">
      {/* Hero Section */}
      <section className="mb-64 max-w-5xl">
        <h1 className="text-hero mb-12">
          EOE <br />
          Cultural Brand & <br />
          Creative Direction
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          <p className="text-lg text-muted max-w-md leading-relaxed">
            Operating at the intersection of Photography, Painting, and Design.
            We build timeless experiences for cultural institutions and enduring brands.
          </p>
          <div className="flex flex-col gap-2 border-l border-border pl-6">
            <span className="text-micro text-muted">Core Disciplines</span>
            <span className="text-sm">Photography / Painting / Design</span>
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section>
        <div className="flex justify-between items-baseline mb-24 pb-8 border-b border-border/40">
          <h2 className="text-micro font-medium">Selected Works</h2>
          <span className="text-micro text-muted">2023 — 2024</span>
        </div>

        <AsymmetricalGrid projects={featuredProjects} />
      </section>

      {/* Footer-like statement */}
      <section className="mt-64 text-center py-32 border-t border-border/40">
        <p className="text-micro text-muted mb-8 tracking-[0.2em]">Contact</p>
        <a href="mailto:hello@eoe.brand" className="text-3xl md:text-5xl hover:opacity-50 transition-opacity tracking-tight font-medium">
          hello@eoe.brand
        </a>
      </section>
    </div>
  )
}
