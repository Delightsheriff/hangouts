import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Hangout } from '@/types/hangout';
import { AppColors, AppShadows } from '@/constants/appTheme';
import { SearchBar } from '@/components/common/SearchBar';

interface ExploreMapViewProps {
  hangouts: Hangout[];
  onSelectHangout: (hangout: Hangout) => void;
}

const { width } = Dimensions.get('window');

const TIME_FILTERS = ['Upcoming', 'Today', 'Tomorrow', 'Weekend'];

export function ExploreMapView({ hangouts, onSelectHangout }: ExploreMapViewProps) {
  const [selectedFilter, setSelectedFilter] = useState('Upcoming');
  const [activeHangout, setActiveHangout] = useState<Hangout>(hangouts[0]);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <View style={styles.container}>
      {/* Background Interactive Map Area */}
      <View style={styles.mapContainer}>
        {/* Stylized Coastal Bay Map Illustration */}
        <View style={styles.mapBackground}>
          {/* Water Surface */}
          <View style={styles.waterBase} />

          {/* North Bay Landmass */}
          <View style={styles.northBayLand} />

          {/* East Bay Landmass */}
          <View style={styles.eastBayLand} />

          {/* SF Peninsula Landmass */}
          <View style={styles.peninsulaLand} />

          {/* Golden Gate Bridge Line */}
          <View style={styles.goldenGateBridge} />

          {/* Bay Bridge Line */}
          <View style={styles.bayBridge} />

          {/* Geographic Labels */}
          <Text style={[styles.mapLabel, { top: '16%', left: '8%' }]}>San Rafael</Text>
          <Text style={[styles.mapLabel, { top: '18%', right: '18%' }]}>San Pablo</Text>
          <Text style={[styles.mapLabel, { top: '23%', right: '14%' }]}>Richmond</Text>
          <Text style={[styles.mapLabel, { top: '26%', left: '16%' }]}>Paradise Cay</Text>
          <Text style={[styles.mapLabel, { top: '29%', right: '6%' }]}>El Cerrito</Text>
          <Text style={[styles.mapLabel, { top: '34%', left: '30%' }]}>Tiburon</Text>
          <Text style={[styles.mapLabel, { top: '34%', right: '10%' }]}>Berkeley</Text>
          <Text style={[styles.mapLabel, { top: '42%', left: '20%' }]}>Sausalito</Text>
          <Text style={[styles.mapLabelBold, { top: '48%', right: '6%' }]}>Oakland</Text>
          <Text style={[styles.mapLabelMajor, { top: '53%', left: '34%' }]}>San Francisco</Text>
          <Text style={[styles.mapLabel, { top: '70%', left: '32%' }]}>San Bruno</Text>

          {/* Route highway shield icons */}
          <View style={[styles.highwayShield, { top: '48%', left: '26%' }]}>
            <Text style={styles.highwayText}>101</Text>
          </View>
          <View style={[styles.interstateShield, { top: '47%', right: '35%' }]}>
            <Text style={styles.highwayText}>80</Text>
          </View>

          {/* Interactive Hangout Pins */}
          {hangouts.map((h) => {
            const isCurrent = activeHangout.id === h.id;
            return (
              <Pressable
                key={h.id}
                onPress={() => setActiveHangout(h)}
                style={[
                  styles.mapPinWrapper,
                  { top: `${h.coordinates.y}%`, left: `${h.coordinates.x}%` },
                ]}>
                <View style={[styles.mapPin, isCurrent && styles.mapPinActive]}>
                  <Ionicons
                    name={h.category === 'Music' ? 'musical-notes' : 'location'}
                    size={16}
                    color="#FFFFFF"
                  />
                </View>
                {isCurrent && <View style={styles.pinPulse} />}
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Top Filter Chips */}
      <View style={styles.topFilterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topFilterContent}>
          {TIME_FILTERS.map((filter) => {
            const isSelected = selectedFilter === filter;
            return (
              <Pressable
                key={filter}
                onPress={() => setSelectedFilter(filter)}
                style={[
                  styles.filterPill,
                  isSelected ? styles.filterPillActive : styles.filterPillInactive,
                ]}>
                <Text
                  style={[
                    styles.filterText,
                    isSelected ? styles.filterTextActive : styles.filterTextInactive,
                  ]}>
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Bottom Floating Event Card & Search */}
      <View style={styles.bottomOverlayContainer}>
        {/* Selected Hangout Card */}
        {activeHangout && (
          <Pressable
            onPress={() => onSelectHangout(activeHangout)}
            style={({ pressed }) => [
              styles.selectedCard,
              AppShadows.card,
              pressed && { opacity: 0.95 },
            ]}>
            {/* Left Thumbnail */}
            <Image
              source={{ uri: activeHangout.thumbnailImage }}
              style={styles.cardThumbnail}
              resizeMode="cover"
            />

            {/* Right Details */}
            <View style={styles.cardDetails}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {activeHangout.title}
              </Text>

              <View style={styles.timeRow}>
                <Ionicons name="calendar-outline" size={13} color={AppColors.textSecondary} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTimeText}>{activeHangout.timeDetail}</Text>
                  <Text style={styles.cardTimeSubtext}>{activeHangout.timeSubtext}</Text>
                </View>
              </View>

              {/* Bottom Row: Attendees + Share & Heart */}
              <View style={styles.cardBottomRow}>
                <View style={styles.attendeesStack}>
                  {activeHangout.attendeeAvatars.slice(0, 3).map((uri, idx) => (
                    <Image
                      key={idx}
                      source={{ uri }}
                      style={[
                        styles.attendeeAvatar,
                        { marginLeft: idx === 0 ? 0 : -8 },
                      ]}
                    />
                  ))}
                  <Text style={styles.attendeesCountText}>
                    {activeHangout.attendeesCount} attendees
                  </Text>
                </View>

                <View style={styles.cardActionIcons}>
                  <Pressable
                    onPress={() => {}}
                    style={styles.actionIconPressable}>
                    <Ionicons name="share-outline" size={17} color={AppColors.textSecondary} />
                  </Pressable>
                  <Pressable
                    onPress={() => setIsLiked(!isLiked)}
                    style={styles.actionIconPressable}>
                    <Ionicons
                      name={isLiked ? 'heart' : 'heart-outline'}
                      size={17}
                      color={isLiked ? '#EF4444' : AppColors.textSecondary}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </Pressable>
        )}

        {/* Search Bar at bottom */}
        <View style={styles.bottomSearchContainer}>
          <SearchBar elevated placeholder="What do you need today?" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF3FD',
  },
  mapContainer: {
    ...StyleSheet.absoluteFill,
  },
  mapBackground: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#BFE0FE', // Bay water blue
  },
  waterBase: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#C5E2FE',
  },
  northBayLand: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '42%',
    backgroundColor: '#E7EFF4',
    borderBottomRightRadius: 180,
    borderBottomLeftRadius: 60,
  },
  eastBayLand: {
    position: 'absolute',
    top: '15%',
    right: 0,
    width: '45%',
    bottom: 0,
    backgroundColor: '#E7EFF4',
    borderTopLeftRadius: 120,
  },
  peninsulaLand: {
    position: 'absolute',
    bottom: 0,
    left: '12%',
    width: '58%',
    height: '52%',
    backgroundColor: '#E7EFF4',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 70,
  },
  goldenGateBridge: {
    position: 'absolute',
    top: '44%',
    left: '26%',
    width: 28,
    height: 4,
    backgroundColor: '#FF5722',
    transform: [{ rotate: '-45deg' }],
  },
  bayBridge: {
    position: 'absolute',
    top: '49%',
    left: '52%',
    width: 48,
    height: 4,
    backgroundColor: '#94A3B8',
    transform: [{ rotate: '-15deg' }],
  },
  mapLabel: {
    position: 'absolute',
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  mapLabelBold: {
    position: 'absolute',
    fontSize: 14,
    color: '#334155',
    fontWeight: '700',
  },
  mapLabelMajor: {
    position: 'absolute',
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  highwayShield: {
    position: 'absolute',
    width: 22,
    height: 18,
    borderRadius: 4,
    backgroundColor: '#0284C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  interstateShield: {
    position: 'absolute',
    width: 22,
    height: 18,
    borderRadius: 4,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  highwayText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  mapPinWrapper: {
    position: 'absolute',
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -22 }, { translateY: -22 }],
  },
  mapPin: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EA580C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    ...AppShadows.soft,
  },
  mapPinActive: {
    backgroundColor: '#EF4444',
    transform: [{ scale: 1.15 }],
  },
  pinPulse: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(239, 68, 68, 0.25)',
  },
  topFilterContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 52 : 36,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  topFilterContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
  },
  filterPillActive: {
    backgroundColor: AppColors.black,
  },
  filterPillInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  filterTextInactive: {
    color: AppColors.textPrimary,
  },
  bottomOverlayContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
  selectedCard: {
    flexDirection: 'row',
    backgroundColor: AppColors.white,
    borderRadius: 22,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
  },
  cardThumbnail: {
    width: 90,
    height: 90,
    borderRadius: 16,
  },
  cardDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: AppColors.textPrimary,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 4,
  },
  cardTimeText: {
    fontSize: 12,
    fontWeight: '600',
    color: AppColors.textPrimary,
  },
  cardTimeSubtext: {
    fontSize: 11,
    color: AppColors.textSecondary,
    marginTop: 1,
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  attendeesStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  attendeesCountText: {
    fontSize: 11,
    color: AppColors.textSecondary,
    marginLeft: 6,
    fontWeight: '500',
  },
  cardActionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionIconPressable: {
    padding: 2,
  },
  bottomSearchContainer: {
    marginHorizontal: 0,
  },
});
