import { skillGroups } from '@/data/skills';
import { Reveal } from '@/components/motion/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="portfolio-section border-t border-border bg-surface px-5 sm:px-8">
      <div className="portfolio-shell space-y-6">
        <Reveal duration={0.35} distance={8}><SectionHeading id="skills-title" eyebrow="Skills" title="Core Technical Skills" /></Reveal>
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {skillGroups.map((group, index) => (
            <Reveal key={group.category} delay={index * 0.06} duration={0.35} distance={8} className="border-t border-border pt-5">
              <h3 className="text-base font-semibold text-accent">{group.category}</h3>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${group.category} skills`}>
                {group.items.map((skill) => <li key={skill} className="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-muted">{skill}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
