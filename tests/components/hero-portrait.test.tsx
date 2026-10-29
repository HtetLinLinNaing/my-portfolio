import { act, fireEvent, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot, type Root } from 'react-dom/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HeroPortrait } from '@/components/sections/hero-portrait';

const preference = vi.hoisted(() => ({ reduced: false as boolean | null }));

vi.mock('framer-motion', async (importOriginal) => ({
  ...await importOriginal<typeof import('framer-motion')>(),
  useInView: () => true,
  useReducedMotion: () => preference.reduced,
}));

describe('portrait animation controls', () => {
  beforeEach(() => { preference.reduced = false; });
  it('lets visitors pause and resume the moving outline', () => {
    const { container } = render(<HeroPortrait />);
    const outline = () => container.querySelector('[style*="animation-play-state"]');
    expect(outline()).toHaveStyle({ animationPlayState: 'running' });
    fireEvent.click(screen.getByRole('button', { name: 'Pause portrait animation' }));
    expect(outline()).toHaveStyle({ animationPlayState: 'paused' });
    fireEvent.click(screen.getByRole('button', { name: 'Resume portrait animation' }));
    expect(outline()).toHaveStyle({ animationPlayState: 'running' });
    expect(screen.getByRole('button', { name: 'Pause portrait animation' })).toBeInTheDocument();
  });

  it('keeps the outline still when reduced motion is requested', () => {
    preference.reduced = true;
    const { container } = render(<HeroPortrait />);
    expect(container.querySelector('[style*="animation-play-state"]')).toHaveStyle({ animationPlayState: 'paused' });
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('hydrates without a mismatch when the browser resolves its motion preference', async () => {
    preference.reduced = null;
    const host = document.createElement('div');
    host.innerHTML = renderToString(<HeroPortrait />);
    document.body.appendChild(host);
    preference.reduced = false;
    const recoverable = vi.fn();
    let root: Root | undefined;
    try {
      await act(async () => { root = hydrateRoot(host, <HeroPortrait />, { onRecoverableError: recoverable }); });
      expect(recoverable).not.toHaveBeenCalled();
    } finally {
      await act(async () => root?.unmount());
      host.remove();
    }
  });
});
