import { projects } from '@/data/projects';
import { Reveal } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';
import type { Project } from '@/lib/types';
import { cn } from '@/lib/utils';

function ProjectPreview({ title }: { title: string }) {
  return (
    <div className="relative min-h-64 overflow-hidden bg-accent/10 p-6 sm:min-h-72">
      <div className="absolute -right-10 -top-12 size-40 rounded-full bg-accent/20" aria-hidden="true" />
      <div className="absolute -bottom-24 -left-10 size-52 rounded-full border-[2rem] border-accent/10" aria-hidden="true" />
      <div className="relative flex min-h-52 items-center justify-center rounded-[1.5rem] border border-accent/20 bg-surface/90 p-5 shadow-xl backdrop-blur sm:min-h-60">
        <div className="w-full max-w-[15rem] space-y-4">
          <div className="flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent">
            <span>{title}</span>
            <span aria-hidden="true">↗</span>
          </div>
          <div className="h-2 w-2/3 rounded-full bg-accent/20" />
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="h-16 rounded-xl bg-accent/15" />
            <div className="h-16 rounded-xl bg-accent/10" />
          </div>
          <div className="h-2 w-1/2 rounded-full bg-accent/20" />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal
      delay={index * 0.08}
      className={cn(
        'group grid overflow-hidden rounded-[2rem] border border-border bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-xl lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch',
        index % 2 === 1 && 'lg:[&>div:first-child]:order-2',
      )}
    >
      <ProjectPreview title={project.title} />
      <div className="flex flex-col justify-center gap-6 p-6 lg:p-8">
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
      <div className="flex flex-wrap gap-3">
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
            align="center"
            eyebrow="Projects"
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
