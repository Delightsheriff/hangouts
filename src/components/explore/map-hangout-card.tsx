import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { HeartButton } from '@/components/heart-button';
import { ShareButton } from '@/components/share-button';
import { AvatarStack } from '@/components/ui/avatar-stack';
import { Icon } from '@/components/ui/icon';
import { PressableScale } from '@/components/ui/pressable-scale';
import type { Hangout } from '@/data/hangouts';
import { colors, fonts, shadows } from '@/theme';

export function MapHangoutCard({ hangout, width }: { hangout: Hangout; width: number }) {
  return (
    <View style={[styles.card, { width }]}>
      <Link href={`/hangout/${hangout.id}`} asChild>
        <PressableScale
          pressedScale={0.97}
          accessibilityRole="button"
          accessibilityLabel={hangout.title}
          style={styles.main}>
          <Link.AppleZoom>
            <Image source={hangout.image} contentFit="cover" transition={250} style={styles.photo} />
          </Link.AppleZoom>
          <View style={styles.body}>
            <Text style={styles.title} numberOfLines={2}>
              {hangout.title}
            </Text>
            <View style={styles.when}>
              <Icon sf="calendar" ion="calendar-outline" size={24} type="palette" colors={['#3D7BD9', '#CFE2F8']} />
              <View style={{ flex: 1 }}>
                <Text style={styles.time} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.85}>
                  {hangout.dateRange}
                </Text>
                <Text style={styles.doors} numberOfLines={1}>
                  {hangout.doorsShort}
                </Text>
              </View>
            </View>
            <View style={styles.footer}>
              <AvatarStack avatars={hangout.avatars} size={22} />
              <Text style={styles.attendees}>{hangout.attendees} attendees</Text>
            </View>
          </View>
        </PressableScale>
      </Link>
      {/* Siblings of the link so their taps don't open the detail screen */}
      <View style={styles.actions}>
        <ShareButton hangout={hangout} size={19} />
        <HeartButton id={hangout.id} size={20} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 40,
    borderCurve: 'continuous',
    ...shadows.floating,
  },
  main: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  photo: { width: 122, height: 108, borderRadius: 26, borderCurve: 'continuous', backgroundColor: colors.border },
  body: { flex: 1, gap: 8 },
  title: { fontFamily: fonts.bold, fontSize: 17.5, lineHeight: 21, letterSpacing: -0.3, color: colors.text },
  when: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  time: { fontFamily: fonts.bold, fontSize: 12.5, color: colors.text },
  doors: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.textSecondary, marginTop: 1 },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 6, height: 22 },
  attendees: { fontFamily: fonts.semibold, fontSize: 12.5, color: colors.textSecondary },
  actions: { position: 'absolute', right: 18, bottom: 16, flexDirection: 'row', alignItems: 'center', gap: 14 },
});
