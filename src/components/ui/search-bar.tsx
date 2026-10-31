import { useState } from 'react';
import { StyleSheet, TextInput, View, type StyleProp, type ViewStyle } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { PressableScale } from '@/components/ui/pressable-scale';
import { colors, fonts, shadows } from '@/theme';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onPressFilter: () => void;
  /** Number of active filters, shown as a dot on the filter button */
  activeFilters?: number;
  style?: StyleProp<ViewStyle>;
};

export function SearchBar({ value, onChangeText, onPressFilter, activeFilters = 0, style }: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.row, style]}>
      <View style={[styles.field, focused && styles.fieldFocused]}>
        <Icon sf="magnifyingglass" ion="search-outline" size={20} color={colors.text} weight="light" />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="What do you need today?"
          placeholderTextColor="#3A3A3A"
          returnKeyType="search"
          clearButtonMode="while-editing"
          autoCorrect={false}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={styles.input}
        />
      </View>
      <PressableScale
        haptic
        onPress={onPressFilter}
        accessibilityRole="button"
        accessibilityLabel="Filters"
        style={styles.filter}>
        <Icon sf="slider.horizontal.3" ion="options-outline" size={22} color={colors.text} weight="light" />
        {activeFilters > 0 && <View style={styles.dot} />}
      </PressableScale>
    </View>
  );
}

const SIZE = 52;

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  field: {
    flex: 1,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.input,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
    gap: 10,
  },
  fieldFocused: { borderColor: '#C9C9C9', backgroundColor: colors.surface },
  input: { flex: 1, height: '100%', fontFamily: fonts.regular, fontSize: 16, color: colors.text },
  filter: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.chip,
  },
  dot: {
    position: 'absolute',
    top: 13,
    right: 13,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.heart,
    borderWidth: 1.5,
    borderColor: colors.surface,
  },
});
