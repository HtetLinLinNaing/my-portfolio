import { ContactForm } from '@/components/contact/contact-form';
import { Reveal } from '@/components/motion/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <Reveal>
          <SectionHeading
            id="contact-title"
            eyebrow="Contact"
            title="Let’s build something useful."
            description="Have a project, an idea, or a role in mind? Send a message and I’ll get back to you."
          />
        </Reveal>
        <Reveal delay={0.08} className="rounded-3xl border border-border bg-surface p-6 shadow-sm lg:p-8">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
