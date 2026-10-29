import { act, render, screen } from '@testing-library/react';
import { hydrateRoot, type Root } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useReducedMotion } from 'framer-motion';
import { AnimatedText } from '@/components/motion/animated-text';

vi.mock('framer-motion', async (importOriginal) => ({
  ...await importOriginal<typeof import('framer-motion')>(),
  useReducedMotion: vi.fn(),
}));

describe('AnimatedText', () => {
  beforeEach(() => vi.mocked(useReducedMotion).mockReturnValue(false));

  it('exposes the full name as one accessible heading', () => {
    render(<h1><AnimatedText text="Htet Lin Lin Naing" /></h1>);
    expect(screen.getByRole('heading', { level: 1, name: 'Htet Lin Lin Naing' })).toBeInTheDocument();
  });

  it('preserves text and hydrates when the browser requests reduced motion', async () => {
    vi.mocked(useReducedMotion).mockReturnValue(null);
    const content = <h1><AnimatedText text="Htet Lin Lin Naing" /></h1>;
    const host = document.createElement('div');
    host.innerHTML = renderToString(content);
    document.body.appendChild(host);
    vi.mocked(useReducedMotion).mockReturnValue(true);
    const recoverable = vi.fn();
    let root: Root | undefined;
    try {
      await act(async () => { root = hydrateRoot(host, content, { onRecoverableError: recoverable }); });
      expect(recoverable).not.toHaveBeenCalled();
      expect(screen.getByRole('heading', { name: 'Htet Lin Lin Naing' })).toBeInTheDocument();
    } finally {
      await act(async () => root?.unmount());
      host.remove();
    }
  });
});
