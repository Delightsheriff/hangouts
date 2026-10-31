import { ScrollView, StyleSheet, Text } from 'react-native';

import { whenOptions } from '@/components/filter-sheet.shared';
import { PressableScale } from '@/components/ui/pressable-scale';
import type { When } from '@/data/hangouts';
import { colors, fonts, shadows, spacing } from '@/theme';

type Props = { value: When; onChange: (when: When) => void };

export function DatePills({ value, onChange }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.row}>
      {whenOptions.map((o) => {
        const active = value === o.id;
        return (
          <PressableScale
            key={o.id}
            haptic
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(o.id)}
            style={[styles.pill, active && styles.pillActive]}>
            <Text style={[styles.text, active && styles.textActive]}>{o.label}</Text>
          </PressableScale>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 0 },
  row: { paddingHorizontal: spacing.screen - 2, paddingVertical: 12, gap: 10 },
  pill: {
    height: 42,
    paddingHorizontal: 17,
    borderRadius: 21,
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  pillActive: { backgroundColor: colors.ink, ...shadows.chip },
  text: { fontFamily: fonts.medium, fontSize: 15, color: colors.textMuted },
  textActive: { fontFamily: fonts.bold, color: colors.textInverse },
});
