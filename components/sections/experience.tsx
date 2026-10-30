import Image from 'next/image';
import { experience } from '@/data/experience';
import { Reveal } from '@/components/motion/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { ExperienceTimeline } from '@/components/motion/experience-timeline';

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="portfolio-section border-t border-border px-5 sm:px-8">
      <div className="portfolio-shell space-y-6">
        <Reveal duration={0.35} distance={8}>
          <SectionHeading id="experience-title" eyebrow="Experience" title="Practical experience from idea to production." className="max-w-none" />
        </Reveal>
        <ExperienceTimeline>
          {experience.map((entry) => (
            <li key={entry.company} className="relative pl-7 sm:pl-10 lg:pl-0">
            <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[0.35fr_0.65fr] lg:gap-x-10 lg:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent">{entry.period}</p>
                <div className="mt-4 flex items-center gap-3">
                  {entry.logo && (
                    <div className="flex h-14 w-16 shrink-0 items-center justify-center p-1 sm:h-16 sm:w-24 sm:p-2">
                      <Image src={entry.logo.src} alt={`${entry.company} logo`} width={entry.logo.width} height={entry.logo.height} sizes="(min-width: 640px) 80px, 56px" className="h-full w-full object-contain" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold text-ink sm:text-2xl">{entry.company}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted">{entry.role}</p>
                  </div>
                </div>
              </div>
              <div>
                <p data-timeline-anchor="" className="leading-7 text-muted">{entry.summary}</p>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-muted">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight.title} className="flex gap-3">
                      <div>
                        <h4 data-timeline-anchor="" className="font-semibold text-ink">{highlight.title}</h4>
                        <p className="mt-1">{highlight.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            </li>
          ))}
        </ExperienceTimeline>
      </div>
    </section>
  );
}
