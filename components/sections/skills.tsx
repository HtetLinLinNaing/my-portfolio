import { skillGroups } from '@/data/skills';
import { Reveal } from '@/components/motion/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="bg-surface px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl space-y-12">
        <Reveal>
          <SectionHeading id="skills-title" align="center" eyebrow="Toolkit" title="Tools I use to turn ideas into products." />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <Reveal key={group.category} delay={index * 0.06} className="rounded-[2rem] border border-border bg-background p-6 transition hover:-translate-y-1 hover:border-accent/50">
              <h3 className="text-xl font-semibold text-ink">{group.category}</h3>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${group.category} skills`}>
                {group.items.map((skill) => (
                  <li key={skill} className="rounded-full border border-border px-3 py-1.5 text-sm text-muted">
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
