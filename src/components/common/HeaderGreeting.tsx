import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { AppColors } from '@/constants/appTheme';

interface HeaderGreetingProps {
  name?: string;
  greeting?: string;
  subtitle?: string;
  avatarUrl?: string;
  onPressAvatar?: () => void;
}

export function HeaderGreeting({
  name = 'Alex',
  greeting = 'Goodafternoon Alex',
  subtitle = 'Welcome back',
  avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  onPressAvatar,
}: HeaderGreetingProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.greetingText}>{greeting}</Text>
        <Text style={styles.subtitleText}>{subtitle}</Text>
      </View>

      <Pressable onPress={onPressAvatar} style={styles.avatarWrapper}>
        <Image
          source={{ uri: avatarUrl }}
          style={styles.avatarImage}
          resizeMode="cover"
        />
        <View style={styles.onlineBadge} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  textContainer: {
    flex: 1,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: '700',
    color: AppColors.textPrimary,
    letterSpacing: -0.4,
  },
  subtitleText: {
    fontSize: 14,
    color: AppColors.textSecondary,
    marginTop: 2,
    fontWeight: '400',
  },
  avatarWrapper: {
    position: 'relative',
    borderRadius: 24,
    padding: 2,
    backgroundColor: '#E2E8F0',
  },
  avatarImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#CBD5E1',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
