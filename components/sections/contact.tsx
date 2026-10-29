import { ContactForm } from '@/components/contact/contact-form';
import { Reveal } from '@/components/motion/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-border px-5 py-12 sm:px-8 sm:py-14">
      <div className="mx-auto grid max-w-7xl items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-8 xl:gap-12">
        <Reveal duration={0.35} distance={8}>
          <SectionHeading
            id="contact-title"
            eyebrow="Contact"
            title="Let’s build something useful."
            titleClassName="lg:text-[clamp(1.75rem,2.65vw,2.25rem)]"
            description="Have a role or project in mind? Let’s talk."
          />
        </Reveal>
        <Reveal delay={0.08} className="relative overflow-hidden rounded-2xl border border-border/70 bg-surface p-5 shadow-[0_4px_20px_-14px_rgba(54,95,168,0.14)] sm:p-6">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-[linear-gradient(90deg,#365fa8,#8055ba,#8aace6)]" />
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
