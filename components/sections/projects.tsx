import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { Reveal } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';
import type { Project } from '@/lib/types';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={index * 0.06}>
      <article className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="space-y-6 p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Personal project · AI application</p>
              <h3 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{project.title}</h3>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              {project.liveUrl && <Button href={project.liveUrl} target="_blank" rel="noreferrer" variant="outline">Live demo <ArrowUpRight size={16} className="ml-2" aria-hidden="true" /></Button>}
              {project.githubUrl && <Button href={project.githubUrl} target="_blank" rel="noreferrer" variant="outline">GitHub</Button>}
            </div>
          </div>
          <p className="leading-7 text-muted">{project.description}</p>
          <ul className="flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
            {project.techStack.map((technology) => <li key={technology} className="rounded-md bg-background px-3 py-1.5 text-xs font-medium text-muted">{technology}</li>)}
          </ul>
          <div className="grid gap-6 border-t border-border pt-7 md:grid-cols-3 md:gap-8">
            {[
              { title: 'The problem', text: project.problem },
              { title: 'My contribution', text: project.contribution },
              { title: 'Implementation', text: project.implementation },
            ].filter((item) => item.text).map((item) => (
              <div key={item.title}><h4 className="text-sm font-semibold text-ink">{item.title}</h4><p className="mt-3 text-sm leading-7 text-muted">{item.text}</p></div>
            ))}
          </div>
        </div>
        {project.youtubeVideoId && (
          <div className="border-t border-border bg-background p-3 sm:p-6">
            <iframe
              src={`https://www.youtube.com/embed/${project.youtubeVideoId}?playsinline=1`}
              title={`${project.title} video demonstration`}
              loading="lazy"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="aspect-video min-h-50 w-full rounded-lg border border-border"
            />
            <a href={`https://www.youtube.com/watch?v=${project.youtubeVideoId}`} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent underline underline-offset-4">
              Watch on YouTube <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        )}
      </article>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="px-5 py-12 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl space-y-7">
        <Reveal duration={0.35} distance={8}><SectionHeading id="projects-title" eyebrow="Selected work" title="A closer look at what I build." description="Explore the application and watch the walkthrough." /></Reveal>
        {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
      </div>
    </section>
  );
}
