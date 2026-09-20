import Image from 'next/image';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/motion/reveal';

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-border/70 px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="flex items-center gap-6 sm:gap-8">
          <div className="relative size-28 shrink-0 overflow-hidden rounded-full bg-accent/15 ring-8 ring-accent/10 sm:size-40">
            <Image src="/images/profile.jpg" alt="" fill sizes="160px" className="object-cover object-[50%_55%]" />
          </div>
          <div className="hidden h-px flex-1 bg-border sm:block" aria-hidden="true" />
        </Reveal>
        <Reveal delay={0.08} className="space-y-6">
          <SectionHeading id="about-title" eyebrow="About me" title="Building across the full stack." />
          <div className="space-y-4 text-base leading-8 text-muted sm:text-lg">
            <p>
              I am a Full Stack Developer with four years of experience building and maintaining production web applications across frontend and backend systems.
            </p>
            <p>
              My work combines responsive interfaces, API integration, data-backed workflows, automated testing, and practical delivery habits to create software that is useful and dependable.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
