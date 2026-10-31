import { StyleSheet, Text, View } from 'react-native';

import { AvatarStack } from '@/components/ui/avatar-stack';
import { spotsLeft, type Hangout } from '@/data/hangouts';
import { colors, fonts, type } from '@/theme';

export function AboutSection({ hangout }: { hangout: Hangout }) {
  const filled = Math.min(hangout.capacity, hangout.attendees);

  return (
    <View>
      <Text style={styles.heading} accessibilityRole="header">
        About the Hangout
      </Text>
      {hangout.about.map((p) => (
        <Text key={p.slice(0, 16)} style={[type.body, styles.paragraph]}>
          {p}
        </Text>
      ))}
      <View style={styles.attendees}>
        <AvatarStack avatars={hangout.avatars} size={30} extra={Math.max(0, filled - hangout.avatars.length)} />
        <Text style={styles.attendeesText}>
          {filled} spots filled · {spotsLeft(hangout)} spots left
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { ...type.section, fontSize: 19, marginTop: 26, marginBottom: 10 },
  paragraph: { marginBottom: 16 },
  attendees: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 6 },
  attendeesText: { fontFamily: fonts.medium, fontSize: 14, color: colors.textSecondary },
});
