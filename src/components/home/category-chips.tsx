import { ScrollView, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { PressableScale } from '@/components/ui/pressable-scale';
import { categories, type CategoryId } from '@/data/hangouts';
import { colors, fonts, shadows, spacing } from '@/theme';

type Props = { value: CategoryId; onChange: (id: CategoryId) => void; style?: StyleProp<ViewStyle> };

export function CategoryChips({ value, onChange, style }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={style} contentContainerStyle={styles.content}>
      {categories.map((c) => {
        const active = c.id === value;
        return (
          <PressableScale
            key={c.id}
            haptic
            onPress={() => onChange(c.id)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            style={[styles.chip, active && styles.active]}>
            <Icon
              sf={c.sf as never}
              ion={c.ion as never}
              size={18}
              color={active ? colors.text : colors.textMuted}
              weight={active ? 'medium' : 'light'}
            />
            <Text style={[styles.label, active && styles.labelActive]}>{c.label}</Text>
          </PressableScale>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: spacing.screen - 2, paddingVertical: 8, gap: 10 },
  chip: {
    height: 40,
    paddingHorizontal: 15,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.035)',
  },
  active: { backgroundColor: colors.surface, borderColor: 'transparent', ...shadows.chip },
  label: { fontFamily: fonts.medium, fontSize: 15, color: colors.textMuted },
  labelActive: { fontFamily: fonts.bold, color: colors.text },
});
