import { projects } from '@/data/projects';
import { Reveal } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';
import type { Project } from '@/lib/types';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal
      delay={index * 0.08}
      className="group grid gap-6 rounded-3xl border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl lg:grid-cols-[1fr_auto] lg:items-center lg:p-8"
    >
      <div className="space-y-5">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            {project.featured ? 'Featured project' : 'Project'}
          </p>
          <h3 className="text-2xl font-semibold text-ink sm:text-3xl">{project.title}</h3>
          <p className="max-w-2xl leading-7 text-muted">{project.description}</p>
        </div>
        <ul className="flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
          {project.techStack.map((technology) => (
            <li key={technology} className="rounded-full bg-background px-3 py-1.5 text-sm text-muted">
              {technology}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap gap-3 lg:justify-end">
        {project.liveUrl && (
          <Button href={project.liveUrl} target="_blank" rel="noreferrer">
            Live demo
          </Button>
        )}
        {project.githubUrl && (
          <Button href={project.githubUrl} target="_blank" rel="noreferrer" variant="outline">
            GitHub
          </Button>
        )}
      </div>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="bg-surface px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl space-y-12">
        <Reveal>
          <SectionHeading
            id="projects-title"
            eyebrow="Selected work"
            title="A closer look at what I build."
            description="One featured project for now, with room to grow as new work is ready to share."
          />
        </Reveal>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
