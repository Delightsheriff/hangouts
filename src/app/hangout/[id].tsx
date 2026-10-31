import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  interpolate,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scheduleOnRN } from 'react-native-worklets';

import { HeartButton } from '@/components/heart-button';
import { ShareButton } from '@/components/share-button';
import { AvatarStack } from '@/components/ui/avatar-stack';
import { GlassButton } from '@/components/ui/glass-button';
import { Icon } from '@/components/ui/icon';
import { PressableScale } from '@/components/ui/pressable-scale';
import { categoryLabel, getHangout, spotsLeft, type Hangout } from '@/data/hangouts';
import { hangoutActions, useHangoutStore } from '@/store/hangouts-store';
import { colors, fonts, shadows, type } from '@/theme';

const HERO = 412;
const SHEET_OVERLAP = 32;

export default function HangoutScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const hangout = getHangout(id);
  if (!hangout) return <NotFound />;
  return <HangoutDetail hangout={hangout} />;
}

function HangoutDetail({ hangout }: { hangout: Hangout }) {
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const [headerSolid, setHeaderSolid] = useState(false);
  const collapseAt = HERO - SHEET_OVERLAP - insets.top - 56;

  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });
  useAnimatedReaction(
    () => scrollY.value > collapseAt,
    (solid, prev) => {
      if (solid !== prev) scheduleOnRN(setHeaderSolid, solid);
    },
  );

  // Stretch when pulled down, drift at half speed when scrolled up.
  const heroStyle = useAnimatedStyle(() => {
    const y = scrollY.value;
    return {
      transform: [{ translateY: y < 0 ? y / 2 : y * 0.45 }, { scale: y < 0 ? 1 + -y / HERO : 1 }],
    };
  });
  const titleBandStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, collapseAt * 0.7], [1, 0], 'clamp'),
    transform: [{ translateY: interpolate(scrollY.value, [-100, 0], [50, 0], 'clamp') }],
  }));
  const headerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [collapseAt - 40, collapseAt], [0, 1], 'clamp'),
  }));

  const left = spotsLeft(hangout);
  const filled = Math.min(hangout.capacity, hangout.attendees);

  return (
    <View style={styles.screen}>
      <StatusBar style={headerSolid ? 'dark' : 'light'} animated />

      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}>
        <View style={{ height: HERO }}>
          <Link.AppleZoomTarget>
            <View style={StyleSheet.absoluteFill}>
              <Animated.View style={[StyleSheet.absoluteFill, heroStyle]}>
                <Image source={hangout.image} contentFit="cover" transition={200} style={StyleSheet.absoluteFill} />
              </Animated.View>
            </View>
          </Link.AppleZoomTarget>

          <Animated.View style={[styles.titleBand, titleBandStyle]}>
            <BlurView intensity={26} tint="dark" style={StyleSheet.absoluteFill} />
            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.18)']} style={StyleSheet.absoluteFill} />
            <Animated.Text
              entering={FadeInDown.delay(150).springify().damping(18)}
              style={styles.heroTitle}
              numberOfLines={2}>
              {hangout.title}
            </Animated.Text>
            <Animated.View entering={FadeInDown.delay(220).springify().damping(18)} style={styles.tags}>
              <View style={[styles.tag, { backgroundColor: colors.upcomingBg }]}>
                <Text style={[styles.tagText, { color: colors.upcomingText }]}>Upcoming</Text>
              </View>
              <View style={[styles.tag, { backgroundColor: 'rgba(255,255,255,0.82)' }]}>
                <Text style={[styles.tagText, { color: colors.musicPurple, fontFamily: fonts.bold }]}>
                  {categoryLabel[hangout.category]}
                </Text>
              </View>
            </Animated.View>
          </Animated.View>
        </View>

        <View style={styles.sheet}>
          <Animated.View entering={FadeInDown.delay(120).springify().damping(20)} style={styles.infoCard}>
            <InfoRow
              icon={
                <Icon sf="calendar" ion="calendar-outline" size={30} type="palette" colors={['#3D7BD9', '#CFE2F8']} />
              }
              title={hangout.dateRange}
              subtitle={hangout.doorsLong}
            />
            <View style={styles.divider} />
            <InfoRow
              icon={
                <Icon
                  sf="mappin.and.ellipse"
                  ion="location-outline"
                  size={28}
                  type="palette"
                  colors={[colors.pin, '#F7B4CD']}
                />
              }
              title={hangout.venue}
              subtitle={hangout.venueNote}
              onPress={() => Linking.openURL(`https://maps.apple.com/?q=${encodeURIComponent(hangout.venue)}`)}
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200).springify().damping(20)}>
            <Text style={styles.heading} accessibilityRole="header">
              About the Hangout
            </Text>
            {hangout.about.map((p) => (
              <Text key={p.slice(0, 16)} style={[type.body, styles.paragraph]}>
                {p}
              </Text>
            ))}
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(260).springify().damping(20)} style={styles.attendees}>
            <AvatarStack avatars={hangout.avatars} size={30} extra={Math.max(0, filled - hangout.avatars.length)} />
            <Text style={styles.attendeesText}>
              {filled} spots filled · {left} spots left
            </Text>
          </Animated.View>
        </View>
      </Animated.ScrollView>

      {/* Compact header that fades in once the hero scrolls away */}
      <Animated.View pointerEvents="none" style={[styles.header, { height: insets.top + 56 }, headerStyle]}>
        <BlurView intensity={60} tint="systemChromeMaterialLight" style={StyleSheet.absoluteFill} />
        <Text style={[styles.headerTitle, { marginTop: insets.top }]} numberOfLines={1}>
          {hangout.title}
        </Text>
      </Animated.View>

      <View style={[styles.controls, { top: insets.top + 6 }]}>
        <GlassButton
          accessibilityLabel="Back"
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}>
          <Icon sf="chevron.left" ion="chevron-back" size={18} weight="semibold" color={colors.text} />
        </GlassButton>
        <View style={styles.controlsRight}>
          <GlassButton accessibilityLabel="Share">
            <ShareButton hangout={hangout} size={19} color={colors.text} />
          </GlassButton>
          <GlassButton accessibilityLabel="Save">
            <HeartButton id={hangout.id} size={19} color={colors.text} />
          </GlassButton>
        </View>
      </View>

      <BookingBar hangout={hangout} bottomInset={insets.bottom} />
    </View>
  );
}

function InfoRow({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.infoRow, pressed && { opacity: 0.6 }]}>
      <View style={styles.infoIcon}>{icon}</View>
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoSubtitle}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}

function BookingBar({ hangout, bottomInset }: { hangout: Hangout; bottomInset: number }) {
  const joined = useHangoutStore((s) => s.waitlisted.has(hangout.id));
  const left = spotsLeft(hangout);
  const full = left === 0;
  const label = full ? (joined ? 'On the waitlist' : 'Join waitlist') : joined ? 'You’re going' : 'Book a spot';

  return (
    <View pointerEvents="box-none" style={[styles.bookingWrap, { paddingBottom: Math.max(bottomInset, 12) }]}>
      <LinearGradient
        colors={['rgba(255,255,255,0)', '#fff']}
        locations={[0, 0.55]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <View style={styles.booking}>
        <PressableScale
          pressedScale={0.96}
          accessibilityRole="button"
          accessibilityState={{ selected: joined }}
          onPress={() => {
            Haptics.notificationAsync(
              joined ? Haptics.NotificationFeedbackType.Warning : Haptics.NotificationFeedbackType.Success,
            );
            hangoutActions.toggleWaitlist(hangout.id);
          }}
          style={styles.ctaPress}>
          <Animated.View style={[styles.cta, joined && styles.ctaJoined]}>
            <Animated.View key={label} entering={FadeIn.duration(220)} style={styles.ctaInner}>
              <Icon
                sf={joined ? 'checkmark.circle.fill' : 'star.fill'}
                ion={joined ? 'checkmark-circle' : 'star'}
                size={15}
                color={joined ? colors.text : '#fff'}
                animationSpec={joined ? { effect: { type: 'bounce' } } : undefined}
              />
              <Text style={[styles.ctaText, joined && { color: colors.text }]}>{label}</Text>
            </Animated.View>
          </Animated.View>
        </PressableScale>
        <View style={styles.price}>
          <Text style={styles.priceText}>{hangout.price}</Text>
          <Text style={styles.spotsText}>{left} spots left</Text>
        </View>
      </View>
    </View>
  );
}

function NotFound() {
  return (
    <View style={[styles.screen, { alignItems: 'center', justifyContent: 'center', gap: 12 }]}>
      <Icon sf="questionmark.circle" ion="help-circle-outline" size={40} color={colors.textMuted} />
      <Text style={type.section}>This hangout has ended</Text>
      <Pressable onPress={() => router.replace('/')}>
        <Text style={type.link}>Back to home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.surface },
  titleBand: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: SHEET_OVERLAP - 40,
    height: 136,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderCurve: 'continuous',
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  heroTitle: { fontFamily: fonts.bold, fontSize: 21, letterSpacing: -0.3, color: '#fff' },
  tags: { flexDirection: 'row', gap: 8, marginTop: 12 },
  tag: { height: 34, paddingHorizontal: 18, borderRadius: 17, justifyContent: 'center' },
  tagText: { fontFamily: fonts.semibold, fontSize: 15 },
  sheet: {
    marginTop: -SHEET_OVERLAP,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    borderCurve: 'continuous',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  infoCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: 26,
    borderCurve: 'continuous',
    paddingHorizontal: 14,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 18 },
  infoIcon: { width: 36, alignItems: 'center' },
  infoTitle: { fontFamily: fonts.bold, fontSize: 16.5, letterSpacing: -0.2, color: colors.text },
  infoSubtitle: { fontFamily: fonts.regular, fontSize: 13.5, lineHeight: 19, color: colors.textSecondary },
  divider: { height: 1, backgroundColor: colors.hairline, marginLeft: 6 },
  heading: { ...type.section, fontSize: 19, marginTop: 26, marginBottom: 10 },
  paragraph: { marginBottom: 16 },
  attendees: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 6 },
  attendeesText: { fontFamily: fonts.medium, fontSize: 14, color: colors.textSecondary },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  headerTitle: { fontFamily: fonts.bold, fontSize: 16, color: colors.text, maxWidth: '60%' },
  controls: { position: 'absolute', left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between' },
  controlsRight: { flexDirection: 'row', gap: 10 },
  bookingWrap: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingTop: 40, paddingHorizontal: 16 },
  booking: {
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
  ctaPress: { flex: 1 },
  cta: {
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    transitionProperty: 'backgroundColor',
    transitionDuration: 260,
  },
  ctaJoined: { backgroundColor: colors.upcomingBg },
  ctaInner: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  ctaText: { fontFamily: fonts.medium, fontSize: 17.5, color: '#fff' },
  price: { gap: 2, minWidth: 82 },
  priceText: { fontFamily: fonts.bold, fontSize: 16, color: colors.text },
  spotsText: { fontFamily: fonts.medium, fontSize: 13, color: colors.text },
});
