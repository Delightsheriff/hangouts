import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/theme';

type Props = {
  avatars: string[];
  size?: number;
  /** Extra count rendered in a trailing bubble, e.g. "+4" */
  extra?: number;
};

export function AvatarStack({ avatars, size = 26, extra }: Props) {
  const overlap = size * 0.38;
  const ring = { width: size, height: size, borderRadius: size / 2 };

  return (
    <View style={styles.row}>
      {avatars.map((uri, i) => (
        <Image
          key={uri}
          source={uri}
          transition={200}
          style={[styles.avatar, ring, { marginLeft: i === 0 ? 0 : -overlap, zIndex: avatars.length - i }]}
        />
      ))}
      {extra ? (
        <View style={[styles.avatar, styles.extra, ring, { marginLeft: -overlap }]}>
          <Text style={[styles.extraText, { fontSize: size * 0.42 }]}>+{extra}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  avatar: { borderWidth: 2, borderColor: colors.surface, backgroundColor: colors.border },
  extra: {
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 1px 4px rgba(0,0,0,0.12)',
  },
  extraText: { fontFamily: fonts.bold, color: colors.text },
});
