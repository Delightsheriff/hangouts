import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppColors } from '@/constants/appTheme';
import { HANGOUTS, CATEGORIES, USER_PROFILE } from '@/data/mockHangouts';
import { HeaderGreeting } from '@/components/common/HeaderGreeting';
import { SearchBar } from '@/components/common/SearchBar';
import { CategoryFilterBar } from '@/components/common/CategoryFilterBar';
import { TrendingHangoutCard } from '@/components/hangouts/TrendingHangoutCard';
import { HangoutListItem } from '@/components/hangouts/HangoutListItem';
import { FloatingTabBar, TabRoute } from '@/components/common/FloatingTabBar';
import { HangoutDetailView } from '@/components/hangouts/HangoutDetailView';
import { ExploreMapView } from '@/components/map/ExploreMapView';
import { Hangout } from '@/types/hangout';

export default function HomeScreen() {
  const [currentTab, setCurrentTab] = useState<TabRoute>('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeHangoutDetail, setActiveHangoutDetail] = useState<Hangout | null>(null);

  const trendingHangout = HANGOUTS.find((h) => h.isTrending) || HANGOUTS[0];
  const nearYouHangouts = HANGOUTS.filter((h) => !h.isTrending);

  // Filter based on category
  const filteredNearYou = nearYouHangouts.filter((h) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'music') return h.category === 'Music';
    if (selectedCategory === 'food') return h.category === 'Food & Cafe';
    if (selectedCategory === 'creative') return h.category === 'Creative';
    if (selectedCategory === 'outdoors') return h.category === 'Outdoors' || h.category === 'Wellness';
    return true;
  });

  const handleSelectHangout = (hangout: Hangout) => {
    setActiveHangoutDetail(hangout);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {currentTab === 'home' && (
        <View style={styles.contentContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {/* 1. Header Greeting with 3D profile avatar */}
            <HeaderGreeting
              name={USER_PROFILE.name}
              greeting={USER_PROFILE.greeting}
              subtitle={USER_PROFILE.subtitle}
              avatarUrl={USER_PROFILE.avatar}
            />

            {/* 2. Capsule Search Bar with Filter Settings button */}
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="What do you need today?"
              onPressFilter={() => {}}
            />

            {/* 3. Horizontal Scrollable Category Chips */}
            <CategoryFilterBar
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* 4. Trending Hangouts Section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Trending Hangouts</Text>
              <Pressable onPress={() => {}}>
                <Text style={styles.seeAllText}>See all</Text>
              </Pressable>
            </View>

            <TrendingHangoutCard
              hangout={trendingHangout}
              onPress={() => handleSelectHangout(trendingHangout)}
            />

            {/* 5. Hangouts Near You Section */}
            <View style={[styles.sectionHeader, { marginTop: 24 }]}>
              <Text style={styles.sectionTitle}>Hangouts Near You</Text>
              <Pressable onPress={() => {}}>
                <Text style={styles.seeAllText}>See all</Text>
              </Pressable>
            </View>

            {filteredNearYou.map((hangout) => (
              <HangoutListItem
                key={hangout.id}
                hangout={hangout}
                onPress={() => handleSelectHangout(hangout)}
              />
            ))}

            {/* Bottom Padding so floating bar never covers items */}
            <View style={{ height: 100 }} />
          </ScrollView>

          {/* Floating Pill Bottom Navigation Bar */}
          <FloatingTabBar
            currentTab={currentTab}
            onSelectTab={(tab) => setCurrentTab(tab)}
          />
        </View>
      )}

      {/* Screen 3: Explore / Map View */}
      {currentTab === 'explore' && (
        <View style={styles.contentContainer}>
          <ExploreMapView
            hangouts={HANGOUTS}
            onSelectHangout={handleSelectHangout}
          />
          {/* Floating Pill Bottom Navigation Bar */}
          <FloatingTabBar
            currentTab={currentTab}
            onSelectTab={(tab) => setCurrentTab(tab)}
          />
        </View>
      )}

      {/* Chats Placeholder View */}
      {currentTab === 'chats' && (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderTitle}>Chats & Communities</Text>
          <Text style={styles.placeholderSubtitle}>
            Connect with attendees from your upcoming hangouts
          </Text>
          <FloatingTabBar
            currentTab={currentTab}
            onSelectTab={(tab) => setCurrentTab(tab)}
          />
        </View>
      )}

      {/* Profile Placeholder View */}
      {currentTab === 'profile' && (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderTitle}>{USER_PROFILE.greeting}</Text>
          <Text style={styles.placeholderSubtitle}>Your booked hangouts and saved events</Text>
          <FloatingTabBar
            currentTab={currentTab}
            onSelectTab={(tab) => setCurrentTab(tab)}
          />
        </View>
      )}

      {/* Screen 2: Modal Detail View */}
      <Modal
        visible={activeHangoutDetail !== null}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setActiveHangoutDetail(null)}>
        {activeHangoutDetail && (
          <HangoutDetailView
            hangout={activeHangoutDetail}
            onBack={() => setActiveHangoutDetail(null)}
          />
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: AppColors.textPrimary,
    letterSpacing: -0.3,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: AppColors.textSecondary,
  },
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  placeholderTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: AppColors.textPrimary,
  },
  placeholderSubtitle: {
    fontSize: 14,
    color: AppColors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
});
