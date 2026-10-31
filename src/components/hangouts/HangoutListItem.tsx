import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Hangout } from '@/types/hangout';
import { AppColors, AppShadows } from '@/constants/appTheme';

interface HangoutListItemProps {
  hangout: Hangout;
  onPress: () => void;
}

export function HangoutListItem({ hangout, onPress }: HangoutListItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        AppShadows.soft,
        pressed && { opacity: 0.88 },
      ]}>
      {/* Left Thumbnail */}
      <Image
        source={{ uri: hangout.thumbnailImage }}
        style={styles.thumbnail}
        resizeMode="cover"
      />

      {/* Middle Content */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {hangout.title}
        </Text>
        <Text style={styles.venue} numberOfLines={1}>
          {hangout.location}
        </Text>

        <View style={styles.badgeRow}>
          <Text style={styles.timeText}>{hangout.time}</Text>
          {hangout.slotsLeft !== undefined && hangout.slotsLeft > 0 && (
            <View style={styles.slotsPill}>
              <Text style={styles.slotsText}>{hangout.slotsLeft} slots left!</Text>
            </View>
          )}
        </View>
      </View>

      {/* Right Attendees Stack */}
      <View style={styles.attendeesContainer}>
        <View style={styles.avatarStack}>
          {hangout.attendeeAvatars.slice(0, 2).map((uri, idx) => (
            <Image
              key={idx}
              source={{ uri }}
              style={[
                styles.stackedAvatar,
                { marginLeft: idx === 0 ? 0 : -8 },
              ]}
            />
          ))}
          <View style={styles.countBadge}>
            <Text style={styles.countText}>+4</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: 20,
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: AppColors.borderLight,
  },
  thumbnail: {
    width: 68,
    height: 68,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: AppColors.textPrimary,
    letterSpacing: -0.2,
  },
  venue: {
    fontSize: 13,
    color: AppColors.textSecondary,
    marginTop: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 8,
  },
  timeText: {
    fontSize: 12,
    color: AppColors.textSecondary,
    fontWeight: '500',
  },
  slotsPill: {
    backgroundColor: AppColors.slotsBg,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  slotsText: {
    fontSize: 11,
    fontWeight: '600',
    color: AppColors.slotsText,
  },
  attendeesContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 4,
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stackedAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    backgroundColor: '#CBD5E1',
  },
  countBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -8,
  },
  countText: {
    fontSize: 10,
    fontWeight: '700',
    color: AppColors.textPrimary,
  },
});
