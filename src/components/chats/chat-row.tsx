import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { PressableScale } from '@/components/ui/pressable-scale';
import type { Hangout } from '@/data/hangouts';
import { colors, fonts, radii, shadows } from '@/theme';

type Props = { hangout: Hangout; preview: string; time: string; unread?: boolean };

export function ChatRow({ hangout, preview, time, unread }: Props) {
  return (
    <Link href={`/hangout/${hangout.id}`} asChild>
      <PressableScale style={styles.row}>
        <Image source={hangout.image} style={styles.thumb} transition={200} />
        <View style={styles.body}>
          <View style={styles.top}>
            <Text style={styles.name} numberOfLines={1}>
              {hangout.title}
            </Text>
            <Text style={styles.time}>{time}</Text>
          </View>
          <Text style={styles.preview} numberOfLines={1}>
            {preview}
          </Text>
        </View>
        {unread && <View style={styles.unread} accessibilityLabel="Unread" />}
      </PressableScale>
    </Link>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderCurve: 'continuous',
    padding: 12,
    ...shadows.card,
  },
  thumb: { width: 52, height: 52, borderRadius: 18, backgroundColor: colors.border },
  body: { flex: 1, gap: 3 },
  top: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  name: { flex: 1, fontFamily: fonts.bold, fontSize: 15.5, color: colors.text },
  time: { fontFamily: fonts.medium, fontSize: 12, color: colors.textMuted },
  preview: { fontFamily: fonts.regular, fontSize: 14, color: colors.textSecondary },
  unread: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.accentPurple },
});
