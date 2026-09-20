import { About } from '@/components/sections/about';
import { Experience } from '@/components/sections/experience';
import { Hero } from '@/components/sections/hero';
import { Skills } from '@/components/sections/skills';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <section id="projects" aria-labelledby="projects-title">
        <h2 id="projects-title">Projects</h2>
      </section>
      <section id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">Contact</h2>
      </section>
    </main>
  );
}
