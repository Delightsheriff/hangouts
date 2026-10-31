import { Pressable, StyleSheet, Text, View } from 'react-native';

import { spacing, type } from '@/theme';

export function SectionHeader({ title, onPressAll }: { title: string; onPressAll?: () => void }) {
  return (
    <View style={styles.row}>
      <Text style={type.section} accessibilityRole="header">
        {title}
      </Text>
      <Pressable hitSlop={8} accessibilityRole="button" onPress={onPressAll}>
        <Text style={type.link}>See all</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.screen,
    marginTop: 22,
    marginBottom: 14,
  },
});
