import { socials } from '@/data/socials';
import { ContactForm } from '@/components/contact/contact-form';
import { Reveal } from '@/components/motion/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-surface px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <Reveal>
          <SectionHeading
            id="contact-title"
            eyebrow="Contact"
            title="Let’s build something useful."
            description="Have a project, an idea, or a role in mind? Send a message and I’ll get back to you."
          />
        </Reveal>
        <Reveal delay={0.08} className="rounded-[2rem] border border-border bg-background p-6 shadow-sm lg:p-8">
          <ContactForm />
          <div className="mt-8 flex justify-center gap-5 border-t border-border pt-6 text-sm text-muted">
            {socials.map((social) => (
              <a key={social.platform} href={social.url} target="_blank" rel="noreferrer" className="transition hover:text-accent">
                {social.platform}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
