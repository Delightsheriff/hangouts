import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DatePills } from '@/components/explore/date-pills';
import { HangoutMap } from '@/components/explore/hangout-map';
import { MapCardCarousel } from '@/components/explore/map-card-carousel';
import { FilterSheet } from '@/components/filter-sheet';
import { countActiveFilters } from '@/components/filter-sheet.shared';
import { SearchBar } from '@/components/ui/search-bar';
import { useVisibleHangouts } from '@/hooks/use-visible-hangouts';
import { hangoutActions } from '@/store/hangouts-store';
import { colors, spacing } from '@/theme';

export default function ExploreScreen() {
  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { visible, filters } = useVisibleHangouts({ query });

  const [selectedId, setSelectedId] = useState<string>();
  const activeId = visible.some((h) => h.id === selectedId) ? selectedId : visible[0]?.id;
  const select = (id: string) => {
    if (id === activeId) return;
    Haptics.selectionAsync();
    setSelectedId(id);
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.screen}>
      <DatePills value={filters.when} onChange={(when) => hangoutActions.setFilters({ when })} />

      <View style={styles.mapFrame}>
        <HangoutMap hangouts={visible} selectedId={activeId} onSelect={select} />
        <LinearGradient
          pointerEvents="none"
          colors={[colors.background, 'rgba(245,245,245,0)']}
          style={styles.mapFade}
        />
        <View style={styles.carousel}>
          <MapCardCarousel items={visible} activeId={activeId} onActiveChange={select} />
        </View>
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
  search: { paddingHorizontal: spacing.screen, paddingTop: 14, paddingBottom: 10 },
});
