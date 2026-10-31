import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { user } from '@/data/hangouts';
import { greeting } from '@/lib/greeting';
import { colors, spacing, type } from '@/theme';

export function HomeHeader() {
  return (
    <View style={styles.row}>
      <View style={styles.text}>
        <Text style={type.greeting}>
          {greeting()} {user.name}
        </Text>
        <Text style={[type.subtitle, styles.subtitle]}>Welcome back</Text>
      </View>
      <Image source={user.avatar} style={styles.avatar} accessibilityLabel="Your profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.screen, marginBottom: 20 },
  text: { flex: 1 },
  subtitle: { marginTop: 6 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.avatarBlue },
});
