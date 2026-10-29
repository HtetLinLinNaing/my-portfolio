'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  split?: 'words' | 'letters';
  duration?: number;
  stagger?: number;
  tokenClassName?: string;
}

export function AnimatedText({ text, split = 'words', duration = 0.45, stagger = 0.05, tokenClassName = '' }: AnimatedTextProps) {
  const reducedMotion = useReducedMotion();
  const tokens = split === 'letters' ? Array.from(text) : text.split(' ');

  return (
    <motion.span className="animated-text inline-block" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {tokens.map((token, index) => (
          <span key={`${index}-${token}`} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
            <motion.span
              data-motion-token=""
              className={`inline-block whitespace-pre ${tokenClassName}`}
              variants={{ hidden: { opacity: 0, y: '100%' }, visible: { opacity: 1, y: '0%' } }}
              transition={{ duration: reducedMotion ? 0 : duration, delay: reducedMotion ? 0 : index * stagger, ease: [0.22, 1, 0.36, 1] }}
            >
              {token}{split === 'words' && index < tokens.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </span>
    </motion.span>
  );
}
