import { About } from '@/components/sections/about';
import { Contact } from '@/components/sections/contact';
import { Experience } from '@/components/sections/experience';
import { Hero } from '@/components/sections/hero';
import { Projects } from '@/components/sections/projects';
import { Skills } from '@/components/sections/skills';
import { SocialRail } from '@/components/layout/social-rail';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <SocialRail />
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <About />
      <Contact />
    </main>
  );
}
