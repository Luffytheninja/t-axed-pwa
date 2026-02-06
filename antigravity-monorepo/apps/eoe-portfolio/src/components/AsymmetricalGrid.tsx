'use client';

import { Project } from '@/lib/data';
import { ProjectCard } from './ProjectCard';

export function AsymmetricalGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-32 md:gap-y-40 gap-x-12">
      {projects.map((project) => (
        <div key={project.id}>
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
