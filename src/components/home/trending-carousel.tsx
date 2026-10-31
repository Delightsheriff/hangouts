import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';

import { Icon } from '@/components/ui/icon';
import { PressableScale } from '@/components/ui/pressable-scale';
import type { Hangout } from '@/data/hangouts';
import { colors, fonts, shadows } from '@/theme';

const GUTTER = 18;
const GAP = 12;
const HEIGHT = 174;

export function TrendingCarousel({ items }: { items: Hangout[] }) {
  const { width } = useWindowDimensions();
  const cardWidth = width - GUTTER * 2;
  const interval = cardWidth + GAP;
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
  });

  return (
    <Animated.FlatList
      data={items}
      horizontal
      keyExtractor={(h) => h.id}
      showsHorizontalScrollIndicator={false}
      snapToInterval={interval}
      decelerationRate="fast"
      disableIntervalMomentum
      onScroll={onScroll}
      scrollEventThrottle={16}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={{ width: GAP }} />}
      renderItem={({ item, index }) => (
        <TrendingCard
          hangout={item}
          next={items[(index + 1) % items.length]}
          width={cardWidth}
          index={index}
          interval={interval}
          scrollX={scrollX}
        />
      )}
    />
  );
}

type CardProps = {
  hangout: Hangout;
  next: Hangout;
  width: number;
  index: number;
  interval: number;
  scrollX: SharedValue<number>;
};

function TrendingCard({ hangout, next, width, index, interval, scrollX }: CardProps) {
  // Cards ease down and the photo drifts as they leave the centre, giving the carousel depth.
  const cardStyle = useAnimatedStyle(() => {
    const p = (scrollX.value - index * interval) / interval;
    return { transform: [{ scale: interpolate(p, [-1, 0, 1], [0.94, 1, 0.94], 'clamp') }] };
  });
  const photoStyle = useAnimatedStyle(() => {
    const p = (scrollX.value - index * interval) / interval;
    return { transform: [{ translateX: interpolate(p, [-1, 0, 1], [-24, 0, 24], 'clamp') }, { scale: 1.15 }] };
  });

  return (
    <Animated.View style={[{ width, height: HEIGHT + 8, paddingTop: 8 }, cardStyle]}>
      {/* The next card peeking out from behind, like a stacked deck */}
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
                <Image source={hangout.image} contentFit="cover" transition={250} style={StyleSheet.absoluteFill} />
              </Animated.View>
            </View>
          </Link.AppleZoom>
          <View style={styles.body}>
            <Text style={styles.title} numberOfLines={2}>
              {hangout.title}
            </Text>
            <View style={styles.meta}>
              <Icon sf="calendar" ion="calendar-outline" size={14} color={colors.textInverse} weight="semibold" />
              <Text style={styles.metaText} numberOfLines={1}>
                {hangout.dateShort}
              </Text>
            </View>
            <View style={styles.meta}>
              <Icon sf="scope" ion="locate-outline" size={14} color={colors.textInverse} weight="semibold" />
              <Text style={styles.metaText} numberOfLines={1}>
                {hangout.venue}
              </Text>
            </View>
          </View>
        </PressableScale>
      </Link>
    </Animated.View>
  );
}

const RADIUS = 46;

const styles = StyleSheet.create({
  list: { paddingHorizontal: GUTTER, paddingTop: 2, paddingBottom: 10 },
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
    height: HEIGHT,
    borderRadius: RADIUS,
    borderCurve: 'continuous',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    ...shadows.glow,
  },
  photoFrame: {
    width: 152,
    height: '100%',
    borderRadius: 32,
    borderCurve: 'continuous',
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  body: { flex: 1, gap: 7, paddingRight: 4 },
  title: {
    fontFamily: fonts.bold,
    fontSize: 19,
    lineHeight: 23,
    letterSpacing: -0.3,
    color: colors.textInverse,
    marginBottom: 6,
  },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { flex: 1, fontFamily: fonts.medium, fontSize: 12.5, color: colors.textInverse },
});
