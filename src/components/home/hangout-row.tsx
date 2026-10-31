import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AvatarStack } from '@/components/ui/avatar-stack';
import { PressableScale } from '@/components/ui/pressable-scale';
import { spotsLeft, type Hangout } from '@/data/hangouts';
import { colors, fonts, radii, shadows } from '@/theme';

export function HangoutRow({ hangout }: { hangout: Hangout }) {
  const left = spotsLeft(hangout);
  const extra = Math.max(0, hangout.attendees - hangout.avatars.length);

  return (
    <Link href={`/hangout/${hangout.id}`} asChild>
      <PressableScale accessibilityRole="button" accessibilityLabel={hangout.title} style={styles.card}>
        <Link.AppleZoom>
          <Image source={hangout.image} contentFit="cover" transition={250} style={styles.photo} />
        </Link.AppleZoom>
        <View style={styles.body}>
          <Text style={styles.title} numberOfLines={1}>
            {hangout.title}
          </Text>
          <Text style={styles.venue} numberOfLines={1}>
            {hangout.venueArea}
          </Text>
          <View style={styles.footer}>
            <Text style={styles.date} numberOfLines={1}>
              {hangout.dateShort}
            </Text>
            <Text style={[styles.slots, left === 0 && styles.full]} numberOfLines={1}>
              {left === 0 ? 'Waitlist' : `${left} slots left!`}
            </Text>
            <View style={styles.avatars}>
              <AvatarStack avatars={hangout.avatars} size={24} extra={Math.min(extra, 4) || undefined} />
            </View>
          </View>
        </View>
      </PressableScale>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderCurve: 'continuous',
    padding: 12,
    paddingRight: 14,
    gap: 12,
    ...shadows.card,
  },
  photo: {
    width: 96,
    height: 92,
    borderRadius: radii.image,
    borderCurve: 'continuous',
    backgroundColor: colors.border,
  },
  body: { flex: 1, gap: 3 },
  title: { fontFamily: fonts.bold, fontSize: 17, letterSpacing: -0.3, color: colors.text },
  venue: { fontFamily: fonts.regular, fontSize: 14.5, color: colors.textSecondary },
  footer: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 7 },
  date: { flexShrink: 1, fontFamily: fonts.medium, fontSize: 13, color: colors.textSecondary },
  slots: { fontFamily: fonts.bold, fontSize: 11, color: colors.accentPurple },
  full: { color: colors.heart },
  avatars: { marginLeft: 'auto' },
});
