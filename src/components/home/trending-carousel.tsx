import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

import type { Hangout } from '@/data/hangouts';

import { TrendingCard } from './trending-card';

const GUTTER = 18;
const GAP = 12;

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
      ItemSeparatorComponent={Separator}
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

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  list: { paddingHorizontal: GUTTER, paddingTop: 2, paddingBottom: 10 },
  separator: { width: GAP },
});
