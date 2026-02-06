import { projects } from '@/lib/data';
import { AsymmetricalGrid } from '@/components/AsymmetricalGrid';
import { CategoryHeader } from '@/components/CategoryHeader';

export default function DesignPage() {
  const designProjects = projects.filter((p) => p.category === 'design');

  return (
    <div className="pt-48 pb-32 px-6 max-w-[1400px] mx-auto">
      <CategoryHeader
        title="Design"
        description="Editorial logic applied to brand systems. We create structural identities and digital experiences that prioritize clarity, proportion, and enduring visual language."
      />
      <AsymmetricalGrid projects={designProjects} />
    </div>
  );
}
