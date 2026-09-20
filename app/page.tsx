import { About } from '@/components/sections/about';
import { Experience } from '@/components/sections/experience';
import { Hero } from '@/components/sections/hero';
import { Projects } from '@/components/sections/projects';
import { Skills } from '@/components/sections/skills';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <section id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">Contact</h2>
      </section>
    </main>
  );
}
