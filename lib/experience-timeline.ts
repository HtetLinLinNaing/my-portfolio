export function getExperienceProgress(offsets: number[], readingPosition: number) {
  let activeIndex = -1;
  for (let index = 0; index < offsets.length; index += 1) {
    if (offsets[index] <= readingPosition) activeIndex = index;
    else break;
  }
  if (activeIndex < 0) return { activeIndex, progress: 0 };
  const start = offsets[0];
  const range = offsets[offsets.length - 1] - start;
  const progress = range > 0 ? Math.min(1, Math.max(0, (readingPosition - start) / range)) : 0;
  return { activeIndex, progress };
}
