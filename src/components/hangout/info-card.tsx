import * as Linking from 'expo-linking';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import type { Hangout } from '@/data/hangouts';
import { colors, fonts } from '@/theme';

/** When and where, with the venue opening in Maps. */
export function InfoCard({ hangout }: { hangout: Hangout }) {
  return (
    <View style={styles.card}>
      <InfoRow
        icon={<Icon sf="calendar" ion="calendar-outline" size={30} type="palette" colors={['#3D7BD9', '#CFE2F8']} />}
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
    </View>
  );
}

type RowProps = { icon: ReactNode; title: string; subtitle: string; onPress?: () => void };

function InfoRow({ icon, title, subtitle, onPress }: RowProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'link' : undefined}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={styles.icon}>{icon}</View>
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surfaceMuted, borderRadius: 26, borderCurve: 'continuous', paddingHorizontal: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 18 },
  pressed: { opacity: 0.6 },
  icon: { width: 36, alignItems: 'center' },
  text: { flex: 1, gap: 4 },
  title: { fontFamily: fonts.bold, fontSize: 16.5, letterSpacing: -0.2, color: colors.text },
  subtitle: { fontFamily: fonts.regular, fontSize: 13.5, lineHeight: 19, color: colors.textSecondary },
  divider: { height: 1, backgroundColor: colors.hairline, marginLeft: 6 },
});
