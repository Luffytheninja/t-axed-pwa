import type { Metadata } from 'next';
import { projects } from '@/lib/data';
import { AsymmetricalGrid } from '@/components/AsymmetricalGrid';
import { CategoryHeader } from '@/components/CategoryHeader';

export const metadata: Metadata = {
  title: 'Fine Art Photography',
  description:
    'Limited-edition fine art photography prints. Master-grade archival pigments and museum-quality glass for discerning collectors.',
};

export default function PhotographyPage() {
  const photographyProjects = projects.filter((p) => p.category === 'photography');

  return (
    <div className="pt-48 pb-32 px-6 max-w-[1400px] mx-auto">
      <CategoryHeader
        title="Fine Art Photography"
        description="Master-grade prints utilizing archival pigments and museum-quality glass. Every work is a limited-edition invitation to witness a moment captured with technical precision and soul."
      />
      <AsymmetricalGrid projects={photographyProjects} />
    </div>
  );
}

