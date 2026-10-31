import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, type SharedValue } from 'react-native-reanimated';

import { Icon } from '@/components/ui/icon';
import { PressableScale } from '@/components/ui/pressable-scale';
import type { Hangout } from '@/data/hangouts';
import { colors, fonts, shadows } from '@/theme';

export const TRENDING_HEIGHT = 174;
const PEEK = 8;
const RADIUS = 46;

type Props = {
  hangout: Hangout;
  /** The following card, shown peeking out from behind */
  next: Hangout;
  width: number;
  index: number;
  interval: number;
  scrollX: SharedValue<number>;
};

export function TrendingCard({ hangout, next, width, index, interval, scrollX }: Props) {
  // A slight settle as cards leave the centre, and a short photo drift for depth.
  const cardStyle = useAnimatedStyle(() => {
    const p = (scrollX.value - index * interval) / interval;
    return { transform: [{ scale: interpolate(p, [-1, 0, 1], [0.97, 1, 0.97], 'clamp') }] };
  });
  const photoStyle = useAnimatedStyle(() => {
    const p = (scrollX.value - index * interval) / interval;
    return { transform: [{ translateX: interpolate(p, [-1, 0, 1], [-10, 0, 10], 'clamp') }, { scale: 1.06 }] };
  });

  return (
    <Animated.View style={[{ width, height: TRENDING_HEIGHT + PEEK, paddingTop: PEEK }, cardStyle]}>
      <LinearGradient colors={next.gradient} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.peek} />
      <Link href={`/hangout/${hangout.id}`} asChild>
        <PressableScale accessibilityRole="button" accessibilityLabel={hangout.title} style={styles.card}>
          <LinearGradient
            colors={hangout.gradient}
            locations={[0, 0.5, 1]}
            start={{ x: 0, y: 0.35 }}
            end={{ x: 1, y: 0.65 }}
            style={StyleSheet.absoluteFill}
          />
          <Link.AppleZoom>
            <View style={styles.photoFrame}>
              <Animated.View style={[StyleSheet.absoluteFill, photoStyle]}>
                <Image source={hangout.image} contentFit="cover" transition={200} style={StyleSheet.absoluteFill} />
              </Animated.View>
            </View>
          </Link.AppleZoom>
          <View style={styles.body}>
            <Text style={styles.title} numberOfLines={2}>
              {hangout.title}
            </Text>
            <Meta sf="calendar" ion="calendar-outline" text={hangout.dateShort} />
            <Meta sf="scope" ion="locate-outline" text={hangout.venue} />
          </View>
        </PressableScale>
      </Link>
    </Animated.View>
  );
}

function Meta({
  sf,
  ion,
  text,
}: {
  sf: 'calendar' | 'scope';
  ion: 'calendar-outline' | 'locate-outline';
  text: string;
}) {
  return (
    <View style={styles.meta}>
      <Icon sf={sf} ion={ion} size={14} color={colors.textInverse} weight="semibold" />
      <Text style={styles.metaText} numberOfLines={1}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  peek: {
    position: 'absolute',
    top: 0,
    left: 34,
    right: 34,
    height: 60,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    opacity: 0.9,
  },
  card: {
    height: TRENDING_HEIGHT,
    borderRadius: RADIUS,
    borderCurve: 'continuous',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    backgroundColor: colors.surface,
    ...shadows.glow,
  },
  // Concentric with the card: 46 outer radius minus 16 padding.
  photoFrame: {
    width: 152,
    height: '100%',
    borderRadius: RADIUS - 16,
    borderCurve: 'continuous',
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  body: { flex: 1, gap: 7, paddingRight: 4 },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 19,
    lineHeight: 23,
    letterSpacing: -0.3,
    color: colors.textInverse,
    marginBottom: 6,
  },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { flex: 1, fontFamily: fonts.medium, fontSize: 12.5, color: colors.textInverse },
});
