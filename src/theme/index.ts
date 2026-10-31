import { Platform, type TextStyle, type ViewStyle } from 'react-native';

export const colors = {
  background: '#F5F5F5',
  surface: '#FFFFFF',
  surfaceMuted: '#F6F6F6',
  input: '#F8F8F8',
  border: '#E6E6E6',
  hairline: '#E9E9E9',

  text: '#141414',
  textSecondary: '#5C5C5C',
  textMuted: '#8A8A8A',
  textInverse: '#FFFFFF',

  ink: '#151313',
  accentPurple: '#5B2EBF',
  musicPurple: '#6A2FC5',

  upcomingBg: '#FCF8D9',
  upcomingText: '#56601F',

  avatarBlue: '#4F8EF7',
  heart: '#F0386B',
  pin: '#E9558F',
} as const;

export const gradients = {
  sunset: ['#FFAD5E', '#F7793B', '#EE4B8D'] as const,
  aurora: ['#8E5CF6', '#5B7CFA', '#45B4F5'] as const,
  lagoon: ['#33C6B4', '#2E9BEA', '#5D63F2'] as const,
  berry: ['#FF7A8A', '#E5489E', '#9E4BE8'] as const,
};

export const fonts = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extrabold: 'PlusJakartaSans_800ExtraBold',
} as const;

/** PostScript names of the same faces, for SwiftUI views rendered through Expo UI. */
export const nativeFonts = {
  regular: 'PlusJakartaSans-Regular',
  medium: 'PlusJakartaSans-Medium',
  semibold: 'PlusJakartaSans-SemiBold',
  bold: 'PlusJakartaSans-Bold',
} as const;

export const spacing = {
  screen: 20,
  section: 28,
} as const;

export const radii = {
  pill: 999,
  card: 30,
  hero: 40,
  image: 22,
} as const;

export const type = {
  greeting: { fontFamily: fonts.bold, fontSize: 19, letterSpacing: -0.3, color: colors.text },
  subtitle: { fontFamily: fonts.regular, fontSize: 16, color: colors.text },
  section: { fontFamily: fonts.semibold, fontSize: 18, letterSpacing: -0.2, color: colors.text },
  link: { fontFamily: fonts.medium, fontSize: 14, color: colors.textSecondary },
  cardTitle: { fontFamily: fonts.bold, fontSize: 17, letterSpacing: -0.2, color: colors.text },
  body: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 26, color: colors.textSecondary },
  meta: { fontFamily: fonts.medium, fontSize: 14.5, color: colors.textSecondary },
} satisfies Record<string, TextStyle>;

/** Platform-aware shadows: iOS shadow props, Android boxShadow (RN 0.76+). */
function shadow(y: number, blur: number, opacity: number, color = '#101010'): ViewStyle {
  return Platform.select<ViewStyle>({
    ios: { shadowColor: color, shadowOffset: { width: 0, height: y }, shadowOpacity: opacity, shadowRadius: blur / 2 },
    default: { boxShadow: `0px ${y}px ${blur}px rgba(16,16,16,${opacity})` },
  })!;
}

export const shadows = {
  chip: shadow(4, 16, 0.06),
  card: shadow(10, 30, 0.06),
  floating: shadow(16, 40, 0.14),
  glow: shadow(14, 34, 0.3, '#F7793B'),
};

export { motion, enterAt, listLayout } from './motion';
