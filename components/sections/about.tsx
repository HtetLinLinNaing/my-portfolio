import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/motion/reveal';

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="portfolio-section border-t border-border px-5 sm:px-8">
      <div className="portfolio-shell space-y-6">
        <Reveal duration={0.35} distance={8}><SectionHeading id="about-title" eyebrow="About me" title="How I approach the work." /></Reveal>
        <Reveal delay={0.08} className="grid gap-8 text-base leading-7 text-muted md:grid-cols-2 md:gap-12">
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-ink">Practical, maintainable software</h3>
            <p>I want to build software that solves real problems and is easier to maintain. I like understanding why something goes wrong, rather than stopping at the first fix that works.</p>
          </div>
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-ink">Learning through exploration</h3>
            <p>My current focus is learning how agentic workflows can help developers plan, build, and test software. I’m exploring how agents use tools, how to check their results, and where a developer needs to step in.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
