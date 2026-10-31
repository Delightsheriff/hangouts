import * as Haptics from 'expo-haptics';
import type { ReactNode } from 'react';
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withTiming } from 'react-native-reanimated';

import { motion } from '@/theme/motion';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const timing = { duration: motion.fast, easing: motion.easeOut };

type Props = Omit<PressableProps, 'style' | 'children'> & {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  haptic?: boolean;
};

/** Pressable that settles to 0.96 while held. Disabled or Reduce Motion: no scale. */
export function PressableScale({
  children,
  style,
  haptic = false,
  disabled,
  onPressIn,
  onPressOut,
  onPress,
  ...rest
}: Props) {
  const reduceMotion = useReducedMotion();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const animate = !disabled && !reduceMotion;

  return (
    <AnimatedPressable
      {...rest}
      disabled={disabled}
      onPressIn={(e) => {
        if (animate) scale.value = withTiming(motion.pressScale, timing);
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        if (animate) scale.value = withTiming(1, timing);
        onPressOut?.(e);
      }}
      onPress={(e) => {
        if (haptic) Haptics.selectionAsync();
        onPress?.(e);
      }}
      style={[style, animatedStyle]}>
      {children}
    </AnimatedPressable>
  );
}
