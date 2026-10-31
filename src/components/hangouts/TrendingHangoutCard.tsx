import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Hangout } from '@/types/hangout';
import { AppShadows } from '@/constants/appTheme';

interface TrendingHangoutCardProps {
  hangout: Hangout;
  onPress: () => void;
}

export function TrendingHangoutCard({ hangout, onPress }: TrendingHangoutCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.cardContainer,
        AppShadows.card,
        pressed && { transform: [{ scale: 0.98 }] },
      ]}>
      <LinearGradient
        colors={['#FF6B35', '#E93375', '#A228B4']}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 1, y: 0.8 }}
        style={styles.gradient}>
        {/* Left Thumbnail Image */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: hangout.thumbnailImage }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        </View>

        {/* Right Event Info */}
        <View style={styles.infoWrapper}>
          <Text style={styles.title} numberOfLines={2}>
            {hangout.title}
          </Text>

          <View style={styles.metaRow}>
            <Ionicons name="calendar-outline" size={13} color="rgba(255, 255, 255, 0.9)" />
            <Text style={styles.metaText}>{hangout.time}</Text>
          </View>

          <View style={styles.metaRow}>
            <Ionicons name="sparkles-outline" size={13} color="rgba(255, 255, 255, 0.9)" />
            <Text style={styles.metaText} numberOfLines={1}>
              {hangout.location}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    borderRadius: 24,
    overflow: 'hidden',
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 24,
  },
  imageWrapper: {
    width: 110,
    height: 110,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  infoWrapper: {
    flex: 1,
    paddingLeft: 14,
    justifyContent: 'center',
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 21,
    letterSpacing: -0.2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.95)',
    flexShrink: 1,
  },
});
