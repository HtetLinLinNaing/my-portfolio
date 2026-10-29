'use client';

import Image from 'next/image';
import { useInView, useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { useRef, useState, useSyncExternalStore } from 'react';

export function HeroPortrait() {
  const stage = useRef<HTMLDivElement>(null);
  const visible = useInView(stage, { amount: 0.15 });
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const moving = mounted && visible && reducedMotion === false && !paused;

  return (
    <div ref={stage} className="relative isolate mx-auto aspect-[4/5] w-full max-w-52 overflow-hidden sm:max-w-64 lg:max-w-md">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-6 bottom-10 aspect-square rounded-full bg-accent/15 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-4 bottom-8 aspect-square">
        <div className="absolute inset-5 rounded-full border border-accent/15" />
        <div
          style={{ animationPlayState: moving ? 'running' : 'paused' }}
          className="absolute inset-0 rounded-full border border-accent/20 border-t-accent/70 motion-safe:animate-[portrait-orbit_36s_linear_infinite]"
        >
          <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_16px_var(--color-accent)]" />
        </div>
      </div>
      <Image
        src="/images/profile-cutout-v1.png"
        alt="Htet Lin Lin Naing"
        fill
        priority
        sizes="(max-width: 639px) 208px, (max-width: 1023px) 256px, 448px"
        className="object-contain object-bottom drop-shadow-[0_18px_28px_rgba(0,0,0,0.12)] [mask-image:linear-gradient(to_bottom,black_92%,transparent)]"
      />
      {mounted && reducedMotion === false && (
        <button
          type="button"
          aria-label={paused ? 'Resume portrait animation' : 'Pause portrait animation'}
          onClick={() => setPaused((current) => !current)}
          className="absolute bottom-2 right-2 z-10 inline-flex size-11 items-center justify-center rounded-full border border-border bg-background/90 text-muted transition hover:border-accent hover:text-accent"
        >
          {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
        </button>
      )}
    </div>
  );
}
