import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/reveal';
import { HeroPortrait } from '@/components/sections/hero-portrait';
import { AnimatedText } from '@/components/motion/animated-text';

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative overflow-hidden border-b border-border px-5 py-10 sm:px-8 sm:py-14 lg:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
        <div className="min-w-0 space-y-6">
          <div className="space-y-4">
            <h1 id="hero-title" className="whitespace-nowrap text-[clamp(1.6rem,4.6vw,3.8rem)] font-semibold leading-tight tracking-tight text-ink"><AnimatedText text="Htet Lin Lin Naing" tokenClassName="hero-name" /></h1>
            <Reveal delay={0.15} duration={0.35} distance={8}><p className="hero-role max-w-xl text-sm font-medium leading-relaxed text-accent sm:text-base">Full-Stack Software Engineer</p></Reveal>
            <Reveal delay={0.23} duration={0.4} distance={10}><p className="max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">I’m a full-stack software engineer with <strong className="font-semibold text-accent">4+ years of experience</strong> building and maintaining enterprise web applications. My work covers frontend development, backend integration, and complex business workflows. I’m also exploring how AI agents can support everyday software development.</p></Reveal>
          </div>
          <Reveal delay={0.38} duration={0.35} distance={8} className="flex flex-wrap gap-3">
            <Button href="#projects">View my work <ArrowDown size={16} className="ml-2" aria-hidden="true" /></Button>
            <Button href="#contact" variant="outline">Contact me</Button>
          </Reveal>
        </div>
        <Reveal delay={0.12} className="order-first lg:order-none">
          <HeroPortrait />
        </Reveal>
      </div>
    </section>
  );
}
