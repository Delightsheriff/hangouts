import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, ReduceMotion } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/components/ui/icon';
import { PressableScale } from '@/components/ui/pressable-scale';
import { spotsLeft, type Hangout } from '@/data/hangouts';
import { useSpotsLeft } from '@/hooks/use-spots-left';
import { hangoutActions, useHangoutStore } from '@/store/hangouts-store';
import { colors, fonts, motion, shadows } from '@/theme';

const labelIn = FadeIn.duration(motion.fast).reduceMotion(ReduceMotion.System);

/** Floating join bar: waitlist when full, booking otherwise. */
export function BookingBar({ hangout }: { hangout: Hangout }) {
  const insets = useSafeAreaInsets();
  // Decide from the hangout's own capacity, so booking the last spot doesn't flip the bar to a waitlist.
  const full = spotsLeft(hangout) === 0;
  const joined = useHangoutStore((s) => (full ? s.waitlisted : s.booked).has(hangout.id));
  const left = useSpotsLeft(hangout);
  const label = full ? (joined ? 'On the waitlist' : 'Join waitlist') : joined ? 'You’re going' : 'Book a spot';

  return (
    <View pointerEvents="box-none" style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <LinearGradient
        colors={['rgba(255,255,255,0)', colors.surface]}
        locations={[0, 0.55]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <View style={styles.bar}>
        <PressableScale
          accessibilityRole="button"
          accessibilityState={{ selected: joined }}
          onPress={() => {
            Haptics.notificationAsync(
              joined ? Haptics.NotificationFeedbackType.Warning : Haptics.NotificationFeedbackType.Success,
            );
            (full ? hangoutActions.toggleWaitlist : hangoutActions.toggleBooking)(hangout.id);
          }}
          style={styles.press}>
          <View style={[styles.cta, joined && styles.ctaJoined]}>
            <Animated.View key={label} entering={labelIn} style={styles.ctaInner}>
              <Icon
                sf={joined ? 'checkmark.circle.fill' : 'star.fill'}
                ion={joined ? 'checkmark-circle' : 'star'}
                size={15}
                color={joined ? colors.text : colors.textInverse}
              />
              <Text style={[styles.ctaText, joined && styles.ctaTextJoined]}>{label}</Text>
            </Animated.View>
          </View>
        </PressableScale>
        <View style={styles.price}>
          <Text style={styles.priceText}>{hangout.price}</Text>
          <Text style={styles.spotsText}>{left} spots left</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingTop: 40, paddingHorizontal: 16 },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 36,
    borderCurve: 'continuous',
    padding: 6,
    paddingRight: 20,
    gap: 16,
    ...shadows.floating,
  },
  press: { flex: 1 },
  // Concentric with the bar: 36 outer radius minus 6 padding.
  cta: {
    height: 56,
    borderRadius: 30,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    transitionProperty: 'backgroundColor',
    transitionDuration: motion.fast,
  },
  ctaJoined: { backgroundColor: colors.upcomingBg },
  ctaInner: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  ctaText: { fontFamily: fonts.medium, fontSize: 17.5, color: colors.textInverse },
  ctaTextJoined: { color: colors.text },
  price: { gap: 2, minWidth: 82 },
  priceText: { fontFamily: fonts.bold, fontSize: 16, color: colors.text },
  spotsText: { fontFamily: fonts.medium, fontSize: 13, color: colors.text },
});
