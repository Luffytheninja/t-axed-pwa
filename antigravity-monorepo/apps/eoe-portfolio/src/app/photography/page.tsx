import { projects } from '@/lib/data';
import { AsymmetricalGrid } from '@/components/AsymmetricalGrid';
import { CategoryHeader } from '@/components/CategoryHeader';

export default function PhotographyPage() {
  const photographyProjects = projects.filter((p) => p.category === 'photography');

  return (
    <div className="pt-48 pb-32 px-6 max-w-[1400px] mx-auto">
      <CategoryHeader
        title="Photography"
        description="Capturing the intersection of light and structure. Our photographic work focuses on architectural precision and the quiet narratives of space."
      />
      <AsymmetricalGrid projects={photographyProjects} />
    </div>
  );
}
