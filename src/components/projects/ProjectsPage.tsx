import React from 'react';
import ProjectCard from './ProjectCard';
import { projectsData } from './projectsData';

export default function ProjectsPage() {
  return (
    <div className="pt-[100px] pb-24 px-[10%] md:px-[15%] min-h-screen font-mono crt-text">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 tracking-wider text-white">
          PROJECTS
        </h1>
        <div className="space-y-16">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
