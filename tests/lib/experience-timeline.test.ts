import { describe, expect, it } from 'vitest';
import { getExperienceProgress } from '@/lib/experience-timeline';

describe('continuous experience progress', () => {
  it('does not activate a point before its heading reaches the reading line', () => {
    expect(getExperienceProgress([80, 230, 440], 79)).toEqual({ activeIndex: -1, progress: 0 });
    expect(getExperienceProgress([80, 230, 440], 80)).toEqual({ activeIndex: 0, progress: 0 });
  });

  it('moves smoothly between headings and clamps at the end of the track', () => {
    expect(getExperienceProgress([80, 230, 440], 350)).toEqual({ activeIndex: 1, progress: 270 / 360 });
    expect(getExperienceProgress([80, 230, 440], 440)).toEqual({ activeIndex: 2, progress: 1 });
    expect(getExperienceProgress([80, 230, 440], 600)).toEqual({ activeIndex: 2, progress: 1 });
  });

  it('handles scrolling backward, changed line wrapping, and empty content', () => {
    expect(getExperienceProgress([80, 230, 440], 200)).toEqual({ activeIndex: 0, progress: 120 / 360 });
    expect(getExperienceProgress([100, 360, 700], 350)).toEqual({ activeIndex: 0, progress: 250 / 600 });
    expect(getExperienceProgress([], 350)).toEqual({ activeIndex: -1, progress: 0 });
    expect(getExperienceProgress([100], 150)).toEqual({ activeIndex: 0, progress: 0 });
  });
});
