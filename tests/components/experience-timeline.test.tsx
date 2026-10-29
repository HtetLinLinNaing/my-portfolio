import { act, fireEvent, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot, type Root } from 'react-dom/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useReducedMotion } from 'framer-motion';
import { ExperienceTimeline } from '@/components/motion/experience-timeline';

vi.mock('framer-motion', async (importOriginal) => ({
  ...await importOriginal<typeof import('framer-motion')>(),
  useReducedMotion: vi.fn(),
}));

describe('ExperienceTimeline', () => {
  beforeEach(() => vi.mocked(useReducedMotion).mockReturnValue(false));

  it('keeps the career chronology accessible without exposing a misleading progress percentage', () => {
    render(<ExperienceTimeline><li>Galaxy Wave</li><li>Kopwar</li></ExperienceTimeline>);
    const list = screen.getByRole('list', { name: 'Work experience' });
    expect(list.tagName).toBe('OL');
    expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual(['Galaxy Wave', 'Kopwar']);
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('shows the complete static track when reduced motion is requested', () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);
    const { container } = render(<ExperienceTimeline><li>Galaxy Wave</li></ExperienceTimeline>);
    expect(container.querySelector('.experience-timeline-fill')).toHaveStyle({ transform: 'none' });
    expect(container.querySelector('.experience-timeline-dot')).not.toBeInTheDocument();
    expect(screen.getByText('Galaxy Wave')).toBeInTheDocument();
  });

  it('remeasures the current headings after content is replaced and the layout changes', () => {
    const bounds = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      const y = !this.isConnected ? 0 : this.textContent === 'Updated bullet' ? 500 : this.hasAttribute('data-timeline-anchor') ? 100 : 0;
      return new DOMRect(0, y, 400, this.hasAttribute('data-timeline-anchor') ? 24 : 600);
    });
    try {
      const { container, rerender } = render(<ExperienceTimeline><li key="old"><h3 data-timeline-anchor="">Company</h3><h4 data-timeline-anchor="">Original bullet</h4></li></ExperienceTimeline>);
      rerender(<ExperienceTimeline><li key="new"><h3 data-timeline-anchor="">Company</h3><h4 data-timeline-anchor="">Updated bullet</h4></li></ExperienceTimeline>);
      fireEvent.resize(window);
      const track = container.querySelector<HTMLElement>('[data-timeline-track]');
      expect(track?.style.height).toBe('400px');
      expect(container.querySelector('[data-timeline-marker]')).not.toBeInTheDocument();
    } finally {
      bounds.mockRestore();
    }
  });

  it('hydrates correctly when the browser resolves a reduced-motion preference', async () => {
    vi.mocked(useReducedMotion).mockReturnValue(null);
    const host = document.createElement('div');
    const content = <ExperienceTimeline><li>Galaxy Wave</li></ExperienceTimeline>;
    host.innerHTML = renderToString(content);
    document.body.appendChild(host);
    vi.mocked(useReducedMotion).mockReturnValue(true);
    const recoverable = vi.fn();
    let root: Root | undefined;
    try {
      await act(async () => { root = hydrateRoot(host, content, { onRecoverableError: recoverable }); });
      expect(recoverable).not.toHaveBeenCalled();
      expect(host.querySelector('.experience-timeline-dot')).not.toBeInTheDocument();
    } finally {
      await act(async () => root?.unmount());
      host.remove();
    }
  });
});
