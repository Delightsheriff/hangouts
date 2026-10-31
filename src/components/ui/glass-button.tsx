import { BlurView } from 'expo-blur';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import type { ReactNode } from 'react';
import { StyleSheet } from 'react-native';

import { PressableScale } from '@/components/ui/pressable-scale';

type Props = {
  onPress?: () => void;
  accessibilityLabel: string;
  children: ReactNode;
  size?: number;
};

const glass = isLiquidGlassAvailable();

/** Round floating control: Liquid Glass on iOS 26, blur material elsewhere. */
export function GlassButton({ onPress, accessibilityLabel, children, size = 44 }: Props) {
  const shape = { width: size, height: size, borderRadius: size / 2 };

  return (
    <PressableScale haptic pressedScale={0.9} onPress={onPress} accessibilityRole="button" accessibilityLabel={accessibilityLabel} style={shape}>
      {glass ? (
        <GlassView glassEffectStyle="clear" isInteractive style={[styles.fill, shape]}>
          {children}
        </GlassView>
      ) : (
        <BlurView intensity={40} tint="dark" style={[styles.fill, shape, styles.blur]}>
          {children}
        </BlurView>
      )}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  fill: { alignItems: 'center', justifyContent: 'center' },
  blur: { overflow: 'hidden' },
});
