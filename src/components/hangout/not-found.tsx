import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { colors, type } from '@/theme';

export function NotFound() {
  return (
    <View style={styles.screen}>
      <Icon sf="questionmark.circle" ion="help-circle-outline" size={40} color={colors.textMuted} />
      <Text style={type.section}>This hangout has ended</Text>
      <Pressable onPress={() => router.replace('/')}>
        <Text style={type.link}>Back to home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, backgroundColor: colors.surface },
});
