import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({ eyebrow, title, description, id, className, titleClassName }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl space-y-3', className)}>
      {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>}
      <h2 id={id} className={cn('text-3xl font-semibold tracking-tight text-ink sm:text-4xl', titleClassName)}>{title}</h2>
      {description && <p className="leading-7 text-muted">{description}</p>}
    </div>
  );
}
