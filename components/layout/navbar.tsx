'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { SocialIcon } from '@/components/ui/social-icon';
import { socials } from '@/data/socials';

interface NavbarProps {
  links: Array<{ label: string; href: string }>;
}

export function Navbar({ links }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => setIsPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 px-5 backdrop-blur sm:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 py-4">
        <a href="#hero" aria-label="Htet — back to top" data-motion-paused={!isPageVisible} onClick={() => setIsOpen(false)} className="nav-wordmark relative inline-flex min-h-11 items-center font-heading text-2xl font-bold tracking-tight text-accent">
          <span aria-hidden="true" className="inline-flex">
            {Array.from('Htet').map((letter, index) => <span key={index} className="nav-wordmark-letter inline-block">{letter}</span>)}
          </span>
        </a>
        <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-muted transition hover:text-accent">
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-ink"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-border/70 py-4 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition hover:text-accent"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-wrap gap-5 border-t border-border pt-3">
              {socials.map((social) => (
                <a key={social.platform} href={social.url} target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)} className="social-profile-link inline-flex min-h-11 items-center gap-2 rounded-lg border border-transparent px-3 text-sm font-medium text-accent">
                  <SocialIcon platform={social.platform} />{social.platform}
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
