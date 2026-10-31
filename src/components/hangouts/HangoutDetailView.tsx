import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Hangout } from '@/types/hangout';
import { AppColors, AppShadows } from '@/constants/appTheme';

interface HangoutDetailViewProps {
  hangout: Hangout;
  onBack: () => void;
}

const { width, height } = Dimensions.get('window');

export function HangoutDetailView({ hangout, onBack }: HangoutDetailViewProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isWaitlisted, setIsWaitlisted] = useState(false);

  const handleJoinWaitlist = () => {
    setIsWaitlisted(true);
    Alert.alert('You are on the waitlist!', "We'll notify you as soon as a spot opens up.");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Top Hero Photo */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: hangout.heroImage }}
            style={styles.heroImage}
            resizeMode="cover"
          />

          {/* Gradient Tint at bottom of hero */}
          <View style={styles.heroOverlay} />

          {/* Top Navigation Bar */}
          <View style={styles.navBar}>
            <Pressable
              onPress={onBack}
              style={({ pressed }) => [
                styles.iconButton,
                pressed && { opacity: 0.7 },
              ]}>
              <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
            </Pressable>

            <View style={styles.rightNavActions}>
              <Pressable
                onPress={() => setIsSaved(!isSaved)}
                style={({ pressed }) => [
                  styles.iconButton,
                  pressed && { opacity: 0.7 },
                ]}>
                <Ionicons
                  name={isSaved ? 'heart' : 'heart-outline'}
                  size={20}
                  color={isSaved ? '#EF4444' : '#FFFFFF'}
                />
              </Pressable>
              <Pressable
                onPress={() => {}}
                style={({ pressed }) => [
                  styles.iconButton,
                  pressed && { opacity: 0.7 },
                ]}>
                <Ionicons name="share-outline" size={20} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>

          {/* Title & Badges Overlay */}
          <View style={styles.heroInfoOverlay}>
            <Text style={styles.heroTitle}>{hangout.title}</Text>
            <View style={styles.heroBadgesRow}>
              {hangout.tags.map((tag, idx) => (
                <View key={idx} style={[styles.heroBadge, { backgroundColor: tag.bg }]}>
                  <Text style={[styles.heroBadgeText, { color: tag.text }]}>
                    {tag.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Content Sheet */}
        <View style={styles.sheetContainer}>
          {/* Info Tile 1: Date & Time */}
          <View style={styles.infoRow}>
            <View style={styles.iconTile}>
              <Ionicons name="calendar-outline" size={22} color="#0F172A" />
            </View>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoTitle}>{hangout.timeDetail}</Text>
              <Text style={styles.infoSubtitle}>{hangout.timeSubtext}</Text>
            </View>
          </View>

          {/* Info Tile 2: Venue & Location */}
          <View style={styles.infoRow}>
            <View style={[styles.iconTile, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="location-outline" size={22} color="#DC2626" />
            </View>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoTitle}>{hangout.location}</Text>
              <Text style={styles.infoSubtitle}>{hangout.locationDetail}</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* About Section */}
          <View style={styles.aboutSection}>
            <Text style={styles.sectionHeading}>About the Hangout</Text>
            {hangout.description.map((paragraph, index) => (
              <Text key={index} style={styles.bodyParagraph}>
                {paragraph}
              </Text>
            ))}
          </View>

          {/* Extra bottom spacing for sticky action bar */}
          <View style={{ height: 110 }} />
        </View>
      </ScrollView>

      {/* Sticky Bottom Action Dock */}
      <View style={styles.stickyFooterWrapper}>
        <BlurView
          intensity={Platform.OS === 'ios' ? 85 : 100}
          tint="light"
          style={styles.footerBlur}>
          <View style={styles.footerInner}>
            {/* Left Button */}
            <Pressable
              onPress={handleJoinWaitlist}
              style={({ pressed }) => [
                styles.ctaButton,
                isWaitlisted && styles.ctaButtonActive,
                pressed && { opacity: 0.85 },
              ]}>
              <Ionicons
                name="star"
                size={14}
                color="#FFFFFF"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.ctaButtonText}>
                {isWaitlisted ? 'Waitlist Joined' : 'Join waitlist'}
              </Text>
            </Pressable>

            {/* Right Price & Spots */}
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>{hangout.price}</Text>
              <Text style={styles.spotsText}>
                {hangout.slotsLeft === 0 ? '0 spots left' : `${hangout.slotsLeft} spots left`}
              </Text>
            </View>
          </View>
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroContainer: {
    width: '100%',
    height: 380,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
  },
  navBar: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 52 : 36,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightNavActions: {
    flexDirection: 'row',
    gap: 10,
  },
  heroInfoOverlay: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.4,
    marginBottom: 10,
  },
  heroBadgesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  heroBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  heroBadgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  sheetContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -20,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  iconTile: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  infoTextWrapper: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: AppColors.textPrimary,
  },
  infoSubtitle: {
    fontSize: 13,
    color: AppColors.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: AppColors.borderLight,
    marginVertical: 18,
  },
  aboutSection: {
    gap: 12,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: AppColors.textPrimary,
    letterSpacing: -0.2,
  },
  bodyParagraph: {
    fontSize: 14,
    lineHeight: 22,
    color: '#475569',
  },
  stickyFooterWrapper: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    ...AppShadows.floatingBar,
  },
  footerBlur: {
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  footerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.black,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 24,
  },
  ctaButtonActive: {
    backgroundColor: '#059669',
  },
  ctaButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  priceContainer: {
    alignItems: 'flex-end',
    paddingRight: 6,
  },
  priceText: {
    fontSize: 17,
    fontWeight: '800',
    color: AppColors.textPrimary,
  },
  spotsText: {
    fontSize: 12,
    color: AppColors.textSecondary,
    marginTop: 1,
  },
});
