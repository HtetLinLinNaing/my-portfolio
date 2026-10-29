'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { getExperienceProgress } from '@/lib/experience-timeline';

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function ExperienceTimeline({ children }: { children: ReactNode }) {
  const target = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const staticTimeline = mounted && reducedMotion === true;
  const [reading, setReading] = useState<{ points: number[]; activeIndex: number; progress: number }>({ points: [], activeIndex: -1, progress: 0 });

  useEffect(() => {
    const panel = target.current;
    if (!panel) return;
    let points: number[] = [];
    let frame = 0;
    let disposed = false;

    function updateReading() {
      const readingPosition = window.innerHeight * 0.55 - (panel!.getBoundingClientRect().top + panel!.clientTop);
      const next = getExperienceProgress(points, readingPosition);
      setReading((previous) => previous.points === points && previous.activeIndex === next.activeIndex && previous.progress === next.progress
        ? previous
        : { points, ...next });
    }

    function measure() {
      const panelTop = panel!.getBoundingClientRect().top + panel!.clientTop;
      const anchors = Array.from(panel!.querySelectorAll<HTMLElement>('[data-timeline-anchor]'));
      points = anchors.map((anchor) => {
        const bounds = anchor.getBoundingClientRect();
        const lineHeight = Number.parseFloat(getComputedStyle(anchor).lineHeight) || bounds.height;
        return bounds.top + Math.min(lineHeight, bounds.height) / 2 - panelTop;
      });
      updateReading();
    }

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(() => { frame = 0; updateReading(); });
    }

    measure();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    observer?.observe(panel);
    const content = panel.querySelector('ol[aria-label="Work experience"]');
    const mutations = new MutationObserver(measure);
    if (content) mutations.observe(content, { childList: true, subtree: true, characterData: true });
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', onScroll, { passive: true });
    void document.fonts?.ready.then(() => { if (!disposed) measure(); });

    return () => {
      disposed = true;
      observer?.disconnect();
      mutations.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const start = reading.points[0] ?? 32;
  const end = reading.points[reading.points.length - 1] ?? start;
  const trackHeight = reading.points.length ? Math.max(1, end - start) : 'calc(100% - 64px)';
  const progress = staticTimeline ? 1 : reading.progress;
  const transition = { duration: staticTimeline ? 0 : 0.12, ease: 'easeOut' as const };

  return (
    <div ref={target} className="relative rounded-xl border border-border bg-surface">
      {/* Share the entries' desktop grid so the track stays centered between columns. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 lg:grid lg:grid-cols-[0.35fr_0.65fr] lg:gap-10 lg:px-8">
        <div data-timeline-track="" className="absolute left-5 w-0.5 rounded-full bg-border sm:left-6 lg:relative lg:left-auto lg:translate-x-[21px] lg:justify-self-end lg:self-start" style={{ top: start, height: trackHeight }}>
          <motion.div className="experience-timeline-fill absolute inset-0 origin-top rounded-full bg-accent" initial={false} animate={{ scaleY: progress }} transition={transition} />
          {!staticTimeline && reading.activeIndex >= 0 && <motion.span className="experience-timeline-dot absolute left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_2px_var(--color-accent)]" initial={false} animate={{ top: `${progress * 100}%` }} transition={transition} />}
        </div>
      </div>
      <ol aria-label="Work experience" className="relative divide-y divide-border/70">{children}</ol>
    </div>
  );
}
