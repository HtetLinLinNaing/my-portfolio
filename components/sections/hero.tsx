import Image from 'next/image';
import { MoveDown } from 'lucide-react';
import { socials } from '@/data/socials';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/reveal';

export function Hero() {
  const github = socials.find((social) => social.platform === 'GitHub');
  const linkedin = socials.find((social) => social.platform === 'LinkedIn');

  return (
    <section id="hero" aria-labelledby="hero-title" className="relative overflow-hidden px-5 pb-20 pt-12 lg:px-8 lg:pb-28 lg:pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal className="space-y-7">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Full Stack Developer</p>
            <h1 id="hero-title" className="max-w-3xl text-5xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Htet Lin Lin Naing
            </h1>
            <p className="max-w-xl text-base leading-8 text-muted sm:text-lg">
              I build thoughtful, reliable web applications across frontend and backend systems, turning complex workflows into clear experiences.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button href="#projects">Projects</Button>
            {linkedin && (
              <Button href={linkedin.url} target="_blank" rel="noreferrer" variant="outline">
                LinkedIn
              </Button>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted">
            {github && (
              <a href={github.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-accent" aria-label={github.label}>
                GitHub
              </a>
            )}
            {linkedin && (
              <a href={linkedin.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-accent" aria-label={linkedin.label}>
                LinkedIn
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.12} className="relative mx-auto w-full max-w-md lg:ml-auto">
          <div className="absolute inset-3 rounded-[42%_58%_48%_52%/34%_38%_62%_66%] bg-accent/90 sm:inset-6" aria-hidden="true" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[42%_58%_48%_52%/34%_38%_62%_66%] border-8 border-background shadow-2xl shadow-accent/20">
            <Image
              src="/images/profile.jpg"
              alt="Htet Lin Lin Naing"
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 40vw"
              className="object-cover object-[50%_55%]"
            />
          </div>
        </Reveal>
      </div>

      <a href="#about" className="mx-auto mt-16 flex w-fit items-center gap-2 text-sm text-muted transition hover:text-accent" aria-label="Scroll to About section">
        <MoveDown aria-hidden="true" size={16} /> Scroll to explore
      </a>
    </section>
  );
}
