import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { FilterSheet } from '@/components/filter-sheet';
import { countActiveFilters } from '@/components/filter-sheet.shared';
import { CategoryChips } from '@/components/home/category-chips';
import { EmptyState } from '@/components/home/empty-state';
import { HangoutRow } from '@/components/home/hangout-row';
import { HomeHeader } from '@/components/home/home-header';
import { TrendingCarousel } from '@/components/home/trending-carousel';
import { SearchBar } from '@/components/ui/search-bar';
import { SectionHeader } from '@/components/ui/section-header';
import type { CategoryId } from '@/data/hangouts';
import { useVisibleHangouts } from '@/hooks/use-visible-hangouts';
import { enterAt, listLayout, spacing } from '@/theme';

export default function HomeScreen() {
  const [category, setCategory] = useState<CategoryId>('all');
  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { visible, filters } = useVisibleHangouts({ category, query });
  const trending = visible.filter((h) => h.trending);
  const nearby = visible.filter((h) => !h.trending);

  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <Animated.View entering={enterAt(0)}>
          <HomeHeader />
          <SearchBar
            value={query}
            onChangeText={setQuery}
            onPressFilter={() => setFiltersOpen(true)}
            activeFilters={countActiveFilters(filters)}
            style={styles.gutter}
          />
          <CategoryChips value={category} onChange={setCategory} style={styles.chips} />
        </Animated.View>

        {trending.length > 0 && (
          <Animated.View entering={enterAt(1)} layout={listLayout}>
            <SectionHeader title="Trending Hangouts" />
            <TrendingCarousel items={trending} />
          </Animated.View>
        )}

        <Animated.View entering={enterAt(2)} layout={listLayout}>
          <SectionHeader title="Hangouts Near You" />
          <View style={[styles.gutter, styles.list]}>
            {nearby.map((h) => (
              <Animated.View key={h.id} layout={listLayout}>
                <HangoutRow hangout={h} />
              </Animated.View>
            ))}
            {visible.length === 0 && <EmptyState />}
          </View>
        </Animated.View>
      </ScrollView>

      <FilterSheet open={filtersOpen} onOpenChange={setFiltersOpen} />
    </>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 12, paddingBottom: 32 },
  gutter: { paddingHorizontal: spacing.screen },
  chips: { marginTop: 10 },
  list: { gap: 14 },
});
