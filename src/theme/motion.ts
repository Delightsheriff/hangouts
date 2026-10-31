import { Easing, FadeIn, LinearTransition, ReduceMotion } from 'react-native-reanimated';

/** Motion tokens: short, ease-out, and quiet. Expressive motion is kept for first loads only. */
export const motion = {
  /** Pressed controls settle at this scale */
  pressScale: 0.96,
  /** Taps, toggles and colour changes */
  fast: 150,
  /** One-off entrances */
  enter: 300,
  stagger: 100,
  easeOut: Easing.out(Easing.cubic),
} as const;

/** Opacity-only first-load entrance, staggered by section. Respects Reduce Motion. */
export const enterAt = (index = 0) =>
  FadeIn.duration(motion.enter)
    .delay(index * motion.stagger)
    .reduceMotion(ReduceMotion.System);

/** Lists re-flow quickly when filters change. */
export const listLayout = LinearTransition.duration(200).reduceMotion(ReduceMotion.System);
