import { StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { colors, fonts } from '@/theme';

export function EmptyState() {
  return (
    <View style={styles.empty}>
      <Icon sf="sparkle.magnifyingglass" ion="search-outline" size={34} color={colors.textMuted} />
      <Text style={styles.title}>No hangouts match</Text>
      <Text style={styles.body}>Try another category or loosen your filters.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: { alignItems: 'center', paddingVertical: 40, gap: 8 },
  title: { fontFamily: fonts.bold, fontSize: 17, color: colors.text, marginTop: 6 },
  body: { fontFamily: fonts.regular, fontSize: 14, color: colors.textSecondary },
});
