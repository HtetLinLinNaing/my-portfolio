import { ContactForm } from '@/components/contact/contact-form';
import { Reveal } from '@/components/motion/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="portfolio-section border-t border-border px-5 sm:px-8">
      <div className="portfolio-shell space-y-6">
        <Reveal duration={0.35} distance={8}>
          <SectionHeading
            id="contact-title"
            eyebrow="Contact"
            title="Let’s build something useful."
          />
        </Reveal>
        <div className="grid items-start gap-8 md:grid-cols-2 md:gap-12">
          <Reveal delay={0.04}>
            <p className="text-base leading-7 text-muted">Have a project or idea in mind? Let’s collaborate or simply chat.</p>
          </Reveal>
          <Reveal delay={0.08} className="relative min-w-0 overflow-hidden rounded-2xl border border-border bg-surface p-4 shadow-[0_4px_20px_-14px_rgba(54,95,168,0.14)]">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-[linear-gradient(90deg,#365fa8,#8055ba,#8aace6)]" />
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
