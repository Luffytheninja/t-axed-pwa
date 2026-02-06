import { projects } from '@/lib/data';
import { AsymmetricalGrid } from '@/components/AsymmetricalGrid';
import { CategoryHeader } from '@/components/CategoryHeader';

export default function PaintingPage() {
  const paintingProjects = projects.filter((p) => p.category === 'painting');

  return (
    <div className="pt-48 pb-32 px-6 max-w-[1400px] mx-auto">
      <CategoryHeader
        title="Painting"
        description="A study of texture, materiality, and the emotional resonance of neutral forms. Each piece is an exploration of the boundary between the physical and the perceived."
      />
      <AsymmetricalGrid projects={paintingProjects} />
    </div>
  );
}
