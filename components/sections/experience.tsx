import { experience } from '@/data/experience';
import { Reveal } from '@/components/motion/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl space-y-12">
        <Reveal>
          <SectionHeading id="experience-title" align="center" eyebrow="Experience" title="Practical experience from idea to production." />
        </Reveal>
        <div className="space-y-6">
          {experience.map((entry, index) => (
            <Reveal key={entry.company} delay={index * 0.08} className="grid gap-5 rounded-[2rem] border border-border bg-surface p-6 shadow-sm lg:grid-cols-[0.35fr_0.65fr] lg:p-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">{entry.period}</p>
                <h3 className="mt-3 text-2xl font-semibold text-ink">{entry.company}</h3>
                <p className="mt-1 text-muted">{entry.role}</p>
              </div>
              <div>
                <p className="leading-7 text-muted">{entry.summary}</p>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-muted">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
