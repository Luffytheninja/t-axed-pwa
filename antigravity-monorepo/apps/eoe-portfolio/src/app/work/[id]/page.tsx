import { projects } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  return (
    <div className="pt-48 pb-64 px-6 max-w-[1400px] mx-auto">
      <Link
        href="/"
        className="text-micro text-muted hover:text-foreground transition-colors mb-24 block"
      >
        ← Back to Works
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-24">
        {/* Project Metadata */}
        <div className="md:col-span-4 order-2 md:order-1">
          <span className="text-micro text-muted block mb-4 tracking-[0.2em]">
            {project.category}
          </span>
          <h1 className="text-5xl font-medium tracking-tight mb-8">{project.title}</h1>

          <div className="space-y-12 mt-24">
            <div>
              <span className="text-micro text-muted block mb-4 border-b border-border/40 pb-2">
                Year
              </span>
              <span className="text-sm uppercase tracking-wider">{project.year}</span>
            </div>
            <div>
              <span className="text-micro text-muted block mb-4 border-b border-border/40 pb-2">
                Medium
              </span>
              <span className="text-sm uppercase tracking-wider">{project.medium}</span>
            </div>
            <div>
              <span className="text-micro text-muted block mb-4 border-b border-border/40 pb-2">
                Dimensions
              </span>
              <span className="text-sm uppercase tracking-wider">
                {project.dimensions || 'N/A'}
              </span>
            </div>
            <div>
              <span className="text-micro text-muted block mb-4 border-b border-border/40 pb-2">
                Context
              </span>
              <p className="text-muted leading-relaxed max-w-sm">{project.description}</p>
            </div>
          </div>
        </div>

        {/* Project High-Res Image */}
        <div className="md:col-span-8 order-1 md:order-2">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1400px) 100vw, 80vw"
            />
          </div>

          {/* Detailed Narrative Section */}
          <div className="mt-32 max-w-2xl">
            <h3 className="text-micro text-muted mb-8 tracking-[0.2em]">The Narrative</h3>
            <p className="text-xl leading-relaxed">
              This work represents a pivotal moment in the EOE collection, where the boundaries
              between {project.category} and spatial awareness are rigorously tested. By focusing on
              the essential qualities of {project.medium || 'the medium'}, we aim to provoke a
              slower, more intentional engagement from the viewer.
            </p>
          </div>
        </div>
      </div>

      {/* Recommended/Next Project */}
      <div className="mt-64 pt-32 border-t border-border/40 flex justify-between items-center">
        <div>
          <span className="text-micro text-muted block mb-4">Next Project</span>
          <Link
            href={`/work/${projects[0].id}`}
            className="text-3xl hover:opacity-50 transition-opacity tracking-tight"
          >
            {projects[0].title}
          </Link>
        </div>
        <Link href="/" className="text-micro hover:opacity-50 transition-opacity">
          All Works
        </Link>
      </div>
    </div>
  );
}
