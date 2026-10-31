import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useRef, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HangoutMap } from '@/components/explore/hangout-map';
import { MapHangoutCard } from '@/components/explore/map-hangout-card';
import { countActiveFilters, whenOptions } from '@/components/filter-sheet.shared';
import { FilterSheet } from '@/components/filter-sheet';
import { PressableScale } from '@/components/ui/pressable-scale';
import { SearchBar } from '@/components/ui/search-bar';
import { filterHangouts } from '@/data/filter-hangouts';
import { hangouts, type Hangout } from '@/data/hangouts';
import { hangoutActions, useHangoutStore } from '@/store/hangouts-store';
import { colors, fonts, shadows, spacing } from '@/theme';

const GAP = 10;

export default function ExploreScreen() {
  const { width } = useWindowDimensions();
  const cardWidth = width - 36;
  const sideInset = (width - cardWidth) / 2;

  const filters = useHangoutStore((s) => s.filters);
  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const visible = useMemo(() => filterHangouts(hangouts, { query, filters }), [query, filters]);

  const [selectedId, setSelectedId] = useState<string>();
  const activeId = visible.some((h) => h.id === selectedId) ? selectedId : visible[0]?.id;
  const list = useRef<FlatList<Hangout>>(null);

  const select = (id: string, scroll: boolean) => {
    if (id === activeId) return;
    Haptics.selectionAsync();
    setSelectedId(id);
    const index = visible.findIndex((h) => h.id === id);
    if (scroll && index >= 0) list.current?.scrollToIndex({ index, animated: true });
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.screen}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillsScroll} contentContainerStyle={styles.pills}>
        {whenOptions.map((o, i) => {
          const active = filters.when === o.id;
          return (
            <Animated.View key={o.id} entering={FadeInDown.delay(40 * i).springify().damping(18)}>
              <PressableScale
                haptic
                pressedScale={0.94}
                accessibilityRole="tab"
                accessibilityState={{ selected: active }}
                onPress={() => hangoutActions.setFilters({ when: o.id })}
                style={[styles.pill, active && styles.pillActive]}>
                <Text style={[styles.pillText, active && styles.pillTextActive]}>{o.label}</Text>
              </PressableScale>
            </Animated.View>
          );
        })}
      </ScrollView>

      <View style={styles.mapFrame}>
        <HangoutMap hangouts={visible} selectedId={activeId} onSelect={(id) => select(id, true)} />
        <LinearGradient
          pointerEvents="none"
          colors={[colors.background, 'rgba(245,245,245,0)']}
          style={styles.mapFade}
        />

        <Animated.View entering={FadeInUp.delay(200).springify().damping(18)} style={styles.carousel}>
          {visible.length ? (
            <FlatList
              ref={list}
              data={visible}
              horizontal
              keyExtractor={(h) => h.id}
              showsHorizontalScrollIndicator={false}
              snapToInterval={cardWidth + GAP}
              decelerationRate="fast"
              disableIntervalMomentum
              contentContainerStyle={{ paddingHorizontal: sideInset, paddingVertical: 24 }}
              ItemSeparatorComponent={() => <View style={{ width: GAP }} />}
              getItemLayout={(_, index) => ({ length: cardWidth + GAP, offset: (cardWidth + GAP) * index, index })}
              onMomentumScrollEnd={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.x / (cardWidth + GAP));
                const h = visible[index];
                if (h) select(h.id, false);
              }}
              renderItem={({ item }) => <MapHangoutCard hangout={item} width={cardWidth} />}
            />
          ) : (
            <View style={[styles.empty, { marginHorizontal: sideInset }]}>
              <Text style={styles.emptyText}>No hangouts here yet. Try another day.</Text>
            </View>
          )}
        </Animated.View>
      </View>

      <SearchBar
        value={query}
        onChangeText={setQuery}
        onPressFilter={() => setFiltersOpen(true)}
        activeFilters={countActiveFilters(filters)}
        style={styles.search}
      />

      <FilterSheet open={filtersOpen} onOpenChange={setFiltersOpen} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  pillsScroll: { flexGrow: 0 },
  pills: { paddingHorizontal: spacing.screen - 2, paddingTop: 12, paddingBottom: 12, gap: 10 },
  pill: { height: 42, paddingHorizontal: 17, borderRadius: 21, justifyContent: 'center', backgroundColor: colors.surface },
  pillActive: { backgroundColor: colors.ink, ...shadows.chip },
  pillText: { fontFamily: fonts.medium, fontSize: 15, color: colors.textMuted },
  pillTextActive: { fontFamily: fonts.bold, color: '#fff' },
  mapFrame: {
    flex: 1,
    borderBottomLeftRadius: 48,
    borderBottomRightRadius: 48,
    borderCurve: 'continuous',
    overflow: 'hidden',
    backgroundColor: '#BFE3F5',
  },
  mapFade: { position: 'absolute', top: 0, left: 0, right: 0, height: 36 },
  carousel: { position: 'absolute', left: 0, right: 0, bottom: 34 },
  empty: { backgroundColor: colors.surface, borderRadius: 28, padding: 20, ...shadows.floating },
  emptyText: { fontFamily: fonts.medium, fontSize: 14.5, color: colors.textSecondary, textAlign: 'center' },
  search: { paddingHorizontal: spacing.screen, paddingTop: 14, paddingBottom: 10 },
});
