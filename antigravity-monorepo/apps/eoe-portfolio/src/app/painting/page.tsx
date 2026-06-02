import type { Metadata } from 'next';
import { projects } from '@/lib/data';
import { AsymmetricalGrid } from '@/components/AsymmetricalGrid';
import { CategoryHeader } from '@/components/CategoryHeader';

export const metadata: Metadata = {
  title: 'Original Paintings',
  description:
    'Invest in textured, evocative, and deeply immersive original oil paintings. One-of-one physical assets for private and corporate environments.',
};

export default function PaintingPage() {
  const paintingProjects = projects.filter((p) => p.category === 'painting');

  return (
    <div className="pt-48 pb-32 px-6 max-w-[1400px] mx-auto">
      <CategoryHeader
        title="Original Paintings"
        description="Textured, evocative, and deeply immersive. Our collection of original paintings consists of one-of-one physical assets designed to anchor a room and command presence through technical mastery."
      />
      <AsymmetricalGrid projects={paintingProjects} />
    </div>
  );
}

