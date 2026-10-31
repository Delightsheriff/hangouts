import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AboutSection } from '@/components/hangout/about-section';
import { BookingBar } from '@/components/hangout/booking-bar';
import { CompactHeader } from '@/components/hangout/compact-header';
import { HangoutHero } from '@/components/hangout/hangout-hero';
import { InfoCard } from '@/components/hangout/info-card';
import { HEADER_HEIGHT, HERO_HEIGHT, SHEET_OVERLAP } from '@/components/hangout/layout';
import { NotFound } from '@/components/hangout/not-found';
import { GlassButton } from '@/components/ui/glass-button';
import { Icon } from '@/components/ui/icon';
import { getHangout, type Hangout } from '@/data/hangouts';
import { useCollapsingScroll } from '@/hooks/use-collapsing-scroll';
import { colors } from '@/theme';

export default function HangoutScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const hangout = getHangout(id);
  return hangout ? <HangoutDetail hangout={hangout} /> : <NotFound />;
}

function HangoutDetail({ hangout }: { hangout: Hangout }) {
  const insets = useSafeAreaInsets();
  const collapseAt = HERO_HEIGHT - SHEET_OVERLAP - insets.top - HEADER_HEIGHT;
  const { scrollY, onScroll, collapsed } = useCollapsingScroll(collapseAt);

  return (
    <View style={styles.screen}>
      <StatusBar style={collapsed ? 'dark' : 'light'} animated />

      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}>
        <HangoutHero hangout={hangout} scrollY={scrollY} collapseAt={collapseAt} />
        <View style={styles.sheet}>
          <InfoCard hangout={hangout} />
          <AboutSection hangout={hangout} />
        </View>
      </Animated.ScrollView>

      <CompactHeader title={hangout.title} scrollY={scrollY} collapseAt={collapseAt} />

      <View style={[styles.back, { top: insets.top + 6 }]}>
        <GlassButton
          accessibilityLabel="Back"
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}>
          <Icon sf="chevron.left" ion="chevron-back" size={18} weight="semibold" color={colors.text} />
        </GlassButton>
      </View>

      <BookingBar hangout={hangout} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.surface },
  sheet: {
    marginTop: -SHEET_OVERLAP,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    borderCurve: 'continuous',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  back: { position: 'absolute', left: 16 },
});
