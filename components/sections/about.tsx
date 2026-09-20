import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/motion/reveal';

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-border/70 px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <SectionHeading eyebrow="About me" title="Building across the full stack." />
        </Reveal>
        <Reveal delay={0.08} className="space-y-5 text-lg leading-8 text-muted">
          <p>
            I am a Full Stack Developer with four years of experience building and maintaining production web applications across frontend and backend systems.
          </p>
          <p>
            My work combines responsive interfaces, API integration, data-backed workflows, automated testing, and practical delivery habits to create software that is useful and dependable.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
