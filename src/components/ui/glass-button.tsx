import { BlurView } from 'expo-blur';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

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
    <PressableScale
      haptic={!!onPress}
      pressedScale={0.9}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={shape}>
      {glass ? (
        <GlassView glassEffectStyle="regular" isInteractive style={[StyleSheet.absoluteFill, shape]} />
      ) : (
        <BlurView intensity={50} tint="light" style={[StyleSheet.absoluteFill, shape, styles.clip]} />
      )}
      <View pointerEvents="box-none" style={[StyleSheet.absoluteFill, styles.center]}>
        {children}
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  clip: { overflow: 'hidden' },
});
