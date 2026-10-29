import { socials } from '@/data/socials';
import { SocialIcon } from '@/components/ui/social-icon';

export function SocialRail() {
  return (
    <nav aria-label="Social profiles" className="social-dock fixed bottom-24 left-4 z-40 hidden flex-col items-center gap-4 p-1.5 min-[1360px]:flex">
      {socials.map((social) => (
        <a key={social.platform} href={social.url} target="_blank" rel="noreferrer" aria-label={social.label} className="social-profile-link relative inline-flex size-11 items-center justify-center text-muted">
          <SocialIcon platform={social.platform} className="size-6 shrink-0" />
        </a>
      ))}
    </nav>
  );
}
