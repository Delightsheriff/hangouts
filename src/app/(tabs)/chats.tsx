import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { PressableScale } from '@/components/ui/pressable-scale';
import { hangouts } from '@/data/hangouts';
import { colors, fonts, radii, shadows, spacing, type } from '@/theme';

const previews = [
  'See you all at 7! I’ll bring the speaker 🎶',
  'Anyone up for a pre-game at the arcade?',
  'Mats are provided, just bring water ☀️',
  'Menu just dropped, the fig tart looks unreal',
  'Doors at 9:30, don’t forget your ID',
];

export default function ChatsScreen() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
      <Text style={[type.greeting, styles.title]} accessibilityRole="header">
        Chats
      </Text>
      {hangouts.map((h, i) => (
        <Animated.View key={h.id} entering={FadeInDown.delay(50 * i).springify().damping(18)}>
          <Link href={`/hangout/${h.id}`} asChild>
            <PressableScale style={styles.row}>
              <Image source={h.image} style={styles.thumb} transition={200} />
              <View style={{ flex: 1, gap: 3 }}>
                <View style={styles.top}>
                  <Text style={styles.name} numberOfLines={1}>
                    {h.title}
                  </Text>
                  <Text style={styles.time}>{['2m', '18m', '1h', '3h', 'Fri'][i]}</Text>
                </View>
                <Text style={styles.preview} numberOfLines={1}>
                  {previews[i]}
                </Text>
              </View>
              {i < 2 && <View style={styles.unread} />}
            </PressableScale>
          </Link>
        </Animated.View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.screen, gap: 12 },
  title: { fontSize: 28, marginBottom: 6 },
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
  top: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  name: { flex: 1, fontFamily: fonts.bold, fontSize: 15.5, color: colors.text },
  time: { fontFamily: fonts.medium, fontSize: 12, color: colors.textMuted },
  preview: { fontFamily: fonts.regular, fontSize: 14, color: colors.textSecondary },
  unread: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.accentPurple },
});
