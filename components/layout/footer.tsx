import { socials } from '@/data/socials';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border px-5 pb-8 pt-28 lg:px-8">
      <div className="portfolio-wave" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-4 text-sm text-muted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Htet Lin Lin Naing. Full Stack Developer.</p>
        <div className="flex gap-4">
          {socials.map((social) => (
            <a key={social.platform} href={social.url} target="_blank" rel="noreferrer" className="text-white transition hover:text-white/75">
              {social.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
