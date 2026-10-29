import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'muted';
  className?: string;
} & (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>);

export function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
  const classes = cn(
    'inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold motion-safe:transition-[color,background-color,border-color,box-shadow,transform] motion-safe:duration-180 motion-safe:ease-out motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:active:scale-100 disabled:hover:shadow-none',
    variant === 'primary' && 'border border-accent bg-accent text-white shadow-[0_3px_10px_-4px_var(--portfolio-accent)] hover:bg-accent/90 hover:shadow-[0_6px_18px_-7px_var(--portfolio-accent)] dark:text-background',
    variant === 'outline' && 'border border-accent/60 bg-accent/[0.03] text-accent hover:border-accent hover:bg-accent/10',
    variant === 'muted' && 'bg-surface text-ink hover:bg-accent/10',
    className,
  );

  if ('href' in props) {
    return (
      <a className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
