import { Image } from 'expo-image';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, LinearTransition } from 'react-native-reanimated';

import { countActiveFilters } from '@/components/filter-sheet.shared';
import { FilterSheet } from '@/components/filter-sheet';
import { CategoryChips } from '@/components/home/category-chips';
import { HangoutRow } from '@/components/home/hangout-row';
import { TrendingCarousel } from '@/components/home/trending-carousel';
import { Icon } from '@/components/ui/icon';
import { SearchBar } from '@/components/ui/search-bar';
import { filterHangouts } from '@/data/filter-hangouts';
import { hangouts, user, type CategoryId } from '@/data/hangouts';
import { useHangoutStore } from '@/store/hangouts-store';
import { colors, fonts, spacing, type } from '@/theme';

function greeting(date = new Date()) {
  const h = date.getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

const enter = (i: number) => FadeInDown.delay(60 * i).springify().damping(18);

export default function HomeScreen() {
  const [category, setCategory] = useState<CategoryId>('all');
  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filters = useHangoutStore((s) => s.filters);

  const visible = useMemo(() => filterHangouts(hangouts, { category, query, filters }), [category, query, filters]);
  const trending = visible.filter((h) => h.trending);
  const nearby = visible.filter((h) => !h.trending);

  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <Animated.View entering={enter(0)} style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={type.greeting}>
              {greeting()} {user.name}
            </Text>
            <Text style={[type.subtitle, { marginTop: 6 }]}>Welcome back</Text>
          </View>
          <Image source={user.avatar} style={styles.avatar} transition={300} accessibilityLabel="Your profile" />
        </Animated.View>

        <Animated.View entering={enter(1)}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            onPressFilter={() => setFiltersOpen(true)}
            activeFilters={countActiveFilters(filters)}
            style={styles.gutter}
          />
        </Animated.View>

        <Animated.View entering={enter(2)} style={{ marginTop: 10 }}>
          <CategoryChips value={category} onChange={setCategory} />
        </Animated.View>

        {trending.length > 0 && (
          <Animated.View entering={enter(3)} layout={LinearTransition}>
            <SectionHeader title="Trending Hangouts" />
            <TrendingCarousel items={trending} />
          </Animated.View>
        )}

        <Animated.View entering={enter(4)} layout={LinearTransition}>
          <SectionHeader title="Hangouts Near You" />
          <View style={[styles.gutter, styles.list]}>
            {nearby.map((h, i) => (
              <Animated.View key={h.id} entering={enter(5 + i)} layout={LinearTransition.springify()}>
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

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={[styles.gutter, styles.sectionHeader]}>
      <Text style={type.section} accessibilityRole="header">
        {title}
      </Text>
      <Pressable hitSlop={8} accessibilityRole="button">
        <Text style={type.link}>See all</Text>
      </Pressable>
    </View>
  );
}

function EmptyState() {
  return (
    <View style={styles.empty}>
      <Icon sf="sparkle.magnifyingglass" ion="search-outline" size={34} color={colors.textMuted} />
      <Text style={styles.emptyTitle}>No hangouts match</Text>
      <Text style={styles.emptyBody}>Try another category or loosen your filters.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 12, paddingBottom: 32 },
  gutter: { paddingHorizontal: spacing.screen },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.screen, marginBottom: 20 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.avatarBlue },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 22, marginBottom: 14 },
  list: { gap: 14 },
  empty: { alignItems: 'center', paddingVertical: 40, gap: 8 },
  emptyTitle: { fontFamily: fonts.bold, fontSize: 17, color: colors.text, marginTop: 6 },
  emptyBody: { fontFamily: fonts.regular, fontSize: 14, color: colors.textSecondary },
});
