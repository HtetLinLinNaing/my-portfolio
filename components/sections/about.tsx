import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/motion/reveal';

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-border px-5 py-12 sm:px-8 sm:py-14">
      <div className="mx-auto grid max-w-7xl items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-8 xl:gap-12">
        <Reveal duration={0.35} distance={8}><SectionHeading id="about-title" eyebrow="About me" title="How I approach the work." titleClassName="lg:text-[clamp(1.75rem,2.65vw,2.25rem)]" /></Reveal>
        <Reveal delay={0.08} className="space-y-4 text-base leading-8 text-muted">
          <p>I want to build software that solves real problems and is easier to maintain. I like understanding why something goes wrong, rather than stopping at the first fix that works.</p>
          <p>My current focus is learning how agentic workflows can help developers plan, build, and test software. I’m exploring how agents use tools, how to check their results, and where a developer needs to step in.</p>
        </Reveal>
      </div>
    </section>
  );
}
