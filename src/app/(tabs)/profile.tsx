import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { HangoutRow } from '@/components/home/hangout-row';
import { hangouts, user } from '@/data/hangouts';
import { useHangoutStore } from '@/store/hangouts-store';
import { colors, fonts, radii, shadows, spacing, type } from '@/theme';

export default function ProfileScreen() {
  const saved = useHangoutStore((s) => s.saved);
  const waitlisted = useHangoutStore((s) => s.waitlisted);
  const savedList = hangouts.filter((h) => saved.has(h.id) || waitlisted.has(h.id));

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Image source={user.avatar} style={styles.avatar} />
        <Text style={[type.greeting, { fontSize: 24 }]}>{user.name}</Text>
        <Text style={type.meta}>San Francisco, CA</Text>
        <View style={styles.stats}>
          <Stat value={saved.size} label="Saved" />
          <View style={styles.divider} />
          <Stat value={waitlisted.size} label="Waitlists" />
          <View style={styles.divider} />
          <Stat value={12} label="Attended" />
        </View>
      </View>

      <Text style={[type.section, { marginTop: 8 }]}>Your hangouts</Text>
      {savedList.length ? (
        savedList.map((h) => <HangoutRow key={h.id} hangout={h} />)
      ) : (
        <Text style={styles.hint}>Tap the heart on a hangout or join a waitlist and it will show up here.</Text>
      )}
    </ScrollView>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.screen, gap: 14 },
  hero: {
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surface,
    borderRadius: radii.hero,
    borderCurve: 'continuous',
    padding: 24,
    ...shadows.card,
  },
  avatar: { width: 92, height: 92, borderRadius: 46, backgroundColor: colors.avatarBlue, marginBottom: 10 },
  stats: { flexDirection: 'row', alignItems: 'center', marginTop: 18, alignSelf: 'stretch' },
  divider: { width: StyleSheet.hairlineWidth, height: 30, backgroundColor: colors.border },
  statValue: { fontFamily: fonts.extrabold, fontSize: 20, color: colors.text },
  statLabel: { fontFamily: fonts.medium, fontSize: 13, color: colors.textSecondary },
  hint: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 22, color: colors.textSecondary },
});
