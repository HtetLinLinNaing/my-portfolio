'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  amount?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, duration = 0.55, distance = 24, amount = 0.2, className }: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn('portfolio-reveal', className)}
      initial={reducedMotion ? false : { opacity: 0, y: distance }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
