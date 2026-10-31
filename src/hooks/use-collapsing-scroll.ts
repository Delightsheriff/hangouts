import { useState } from 'react';
import { useAnimatedReaction, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

/** Tracks scroll offset on the UI thread and reports, on the JS thread, when it passes `collapseAt`. */
export function useCollapsingScroll(collapseAt: number) {
  const scrollY = useSharedValue(0);
  const [collapsed, setCollapsed] = useState(false);

  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });
  useAnimatedReaction(
    () => scrollY.value > collapseAt,
    (next, prev) => {
      if (next !== prev) scheduleOnRN(setCollapsed, next);
    },
  );

  return { scrollY, onScroll, collapsed };
}
