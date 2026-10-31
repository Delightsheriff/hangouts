import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/theme';

import type { HangoutMapProps } from './hangout-map.shared';

/** expo-maps is native-only; web gets a calm placeholder. */
export function HangoutMap(_: HangoutMapProps) {
  return (
    <View style={[StyleSheet.absoluteFill, styles.placeholder]}>
      <Text style={styles.text}>The map is available in the iOS and Android apps</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: { backgroundColor: '#BFE3F5', alignItems: 'center', justifyContent: 'center' },
  text: { fontFamily: fonts.medium, color: colors.textSecondary },
});
