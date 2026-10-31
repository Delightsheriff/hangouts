import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, type SharedValue } from 'react-native-reanimated';

import { categoryLabel, type Hangout } from '@/data/hangouts';
import { colors, fonts } from '@/theme';

import { HERO_HEIGHT, SHEET_OVERLAP } from './layout';

type Props = { hangout: Hangout; scrollY: SharedValue<number>; collapseAt: number };

/** Hero photo that stretches on pull-down, with the blurred title band over its lower edge. */
export function HangoutHero({ hangout, scrollY, collapseAt }: Props) {
  const photoStyle = useAnimatedStyle(() => {
    const y = scrollY.value;
    return {
      transform: [{ translateY: y < 0 ? y / 2 : y * 0.3 }, { scale: y < 0 ? 1 - y / HERO_HEIGHT : 1 }],
    };
  });
  const bandStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, collapseAt * 0.7], [1, 0], 'clamp'),
  }));

  return (
    <View style={styles.hero}>
      <Link.AppleZoomTarget>
        <View style={StyleSheet.absoluteFill}>
          <Animated.View style={[StyleSheet.absoluteFill, photoStyle]}>
            <Image source={hangout.image} contentFit="cover" transition={200} style={StyleSheet.absoluteFill} />
          </Animated.View>
        </View>
      </Link.AppleZoomTarget>

      <Animated.View style={[styles.band, bandStyle]}>
        <BlurView intensity={26} tint="dark" style={StyleSheet.absoluteFill} />
        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.18)']} style={StyleSheet.absoluteFill} />
        <Text style={styles.title} numberOfLines={2}>
          {hangout.title}
        </Text>
        <View style={styles.tags}>
          <Tag label="Upcoming" background={colors.upcomingBg} color={colors.upcomingText} />
          <Tag
            label={categoryLabel[hangout.category]}
            background="rgba(255,255,255,0.82)"
            color={colors.musicPurple}
            bold
          />
        </View>
      </Animated.View>
    </View>
  );
}

function Tag({ label, background, color, bold }: { label: string; background: string; color: string; bold?: boolean }) {
  return (
    <View style={[styles.tag, { backgroundColor: background }]}>
      <Text style={[styles.tagText, { color }, bold && styles.tagBold]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { height: HERO_HEIGHT },
  band: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: SHEET_OVERLAP - 40,
    // Visible height is 100pt above the sheet: 16 top + title + 10 + tags + 14 clear of the sheet, as in the mock.
    height: 140,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderCurve: 'continuous',
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  title: { fontFamily: fonts.semibold, fontSize: 20, letterSpacing: -0.3, color: colors.textInverse },
  tags: { flexDirection: 'row', gap: 8, marginTop: 10 },
  tag: { height: 34, paddingHorizontal: 18, borderRadius: 17, justifyContent: 'center' },
  tagText: { fontFamily: fonts.semibold, fontSize: 15 },
  tagBold: { fontFamily: fonts.bold },
});
