import Ionicons from '@expo/vector-icons/Ionicons';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import type { ComponentProps } from 'react';
import type { ColorValue } from 'react-native';

type Props = {
  /** SF Symbol rendered natively on iOS */
  sf: SymbolViewProps['name'];
  /** Ionicons glyph used everywhere else */
  ion: ComponentProps<typeof Ionicons>['name'];
  size?: number;
  color?: ColorValue;
  weight?: SymbolViewProps['weight'];
  type?: SymbolViewProps['type'];
  colors?: SymbolViewProps['colors'];
  animationSpec?: SymbolViewProps['animationSpec'];
};

/** SF Symbols on iOS with an Ionicons fallback for Android and web. */
export function Icon({
  sf,
  ion,
  size = 20,
  color = '#141414',
  weight = 'regular',
  type,
  colors,
  animationSpec,
}: Props) {
  return (
    <SymbolView
      name={sf}
      size={size}
      tintColor={colors ? undefined : (color as string)}
      weight={weight}
      type={type}
      colors={colors}
      animationSpec={animationSpec}
      resizeMode="scaleAspectFit"
      style={{ width: size, height: size }}
      fallback={<Ionicons name={ion} size={size} color={color as string} />}
    />
  );
}
