import { socials } from '@/data/socials';

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-8 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Htet Lin Lin Naing. Full Stack Developer.</p>
        <div className="flex gap-4">
          {socials.map((social) => (
            <a key={social.platform} href={social.url} target="_blank" rel="noreferrer" className="transition hover:text-accent">
              {social.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
