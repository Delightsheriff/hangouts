import { BlurView } from 'expo-blur';
import { StyleSheet, Text } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, type SharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts } from '@/theme';

import { HEADER_HEIGHT } from './layout';

type Props = { title: string; scrollY: SharedValue<number>; collapseAt: number };

/** Blurred title bar that fades in once the hero has scrolled away. */
export function CompactHeader({ title, scrollY, collapseAt }: Props) {
  const insets = useSafeAreaInsets();
  const style = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [collapseAt - 40, collapseAt], [0, 1], 'clamp'),
  }));

  return (
    <Animated.View pointerEvents="none" style={[styles.header, { height: insets.top + HEADER_HEIGHT }, style]}>
      <BlurView intensity={60} tint="systemChromeMaterialLight" style={StyleSheet.absoluteFill} />
      <Text style={[styles.title, { marginTop: insets.top }]} numberOfLines={1}>
        {title}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  title: { fontFamily: fonts.bold, fontSize: 16, color: colors.text, maxWidth: '60%' },
});
