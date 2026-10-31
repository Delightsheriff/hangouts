import { useEffect, useRef } from 'react';
import { FlatList, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import type { Hangout } from '@/data/hangouts';
import { colors, fonts, shadows } from '@/theme';

import { MapHangoutCard } from './map-hangout-card';

const GAP = 10;
const GUTTER = 18;

type Props = {
  items: Hangout[];
  activeId?: string;
  /** Called when the user swipes a different card into view */
  onActiveChange: (id: string) => void;
};

/** Snapping card row that follows, and drives, the map's selected marker. */
export function MapCardCarousel({ items, activeId, onActiveChange }: Props) {
  const { width } = useWindowDimensions();
  const cardWidth = width - GUTTER * 2;
  const interval = cardWidth + GAP;
  const list = useRef<FlatList<Hangout>>(null);
  const shownIndex = useRef(0);

  // Marker taps change the active card; bring it into view.
  useEffect(() => {
    const index = items.findIndex((h) => h.id === activeId);
    if (index < 0 || index === shownIndex.current) return;
    shownIndex.current = index;
    list.current?.scrollToIndex({ index, animated: true });
  }, [activeId, items]);

  if (!items.length) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No hangouts here yet. Try another day.</Text>
      </View>
    );
  }

  return (
    <FlatList
      ref={list}
      data={items}
      horizontal
      keyExtractor={(h) => h.id}
      showsHorizontalScrollIndicator={false}
      snapToInterval={interval}
      decelerationRate="fast"
      disableIntervalMomentum
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={Separator}
      getItemLayout={(_, index) => ({ length: interval, offset: interval * index, index })}
      onMomentumScrollEnd={(e) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / interval);
        shownIndex.current = index;
        const h = items[index];
        if (h) onActiveChange(h.id);
      }}
      renderItem={({ item }) => <MapHangoutCard hangout={item} width={cardWidth} />}
    />
  );
}

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  list: { paddingHorizontal: GUTTER, paddingVertical: 24 },
  separator: { width: GAP },
  empty: {
    marginHorizontal: GUTTER,
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 20,
    ...shadows.floating,
  },
  emptyText: { fontFamily: fonts.medium, fontSize: 14.5, color: colors.textSecondary, textAlign: 'center' },
});
