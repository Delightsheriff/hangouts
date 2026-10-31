import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { AppColors, AppShadows } from '@/constants/appTheme';

export type TabRoute = 'home' | 'explore' | 'chats' | 'profile';

interface FloatingTabBarProps {
  currentTab: TabRoute;
  onSelectTab: (tab: TabRoute) => void;
}

export function FloatingTabBar({ currentTab, onSelectTab }: FloatingTabBarProps) {
  const tabs: { route: TabRoute; label: string; icon: keyof typeof Ionicons.glyphMap; activeIcon: keyof typeof Ionicons.glyphMap }[] = [
    { route: 'home', label: 'Home', icon: 'home-outline', activeIcon: 'home' },
    { route: 'explore', label: 'Explore', icon: 'compass-outline', activeIcon: 'compass' },
    { route: 'chats', label: 'Chats', icon: 'chatbubble-ellipses-outline', activeIcon: 'chatbubble-ellipses' },
    { route: 'profile', label: 'Profile', icon: 'person-outline', activeIcon: 'person' },
  ];

  return (
    <View style={styles.floatingContainer}>
      <BlurView intensity={Platform.OS === 'ios' ? 80 : 100} tint="light" style={styles.blurWrapper}>
        <View style={styles.bar}>
          {tabs.map((tab) => {
            const isActive = currentTab === tab.route;
            return (
              <Pressable
                key={tab.route}
                onPress={() => onSelectTab(tab.route)}
                style={({ pressed }) => [
                  styles.tabItem,
                  pressed && { opacity: 0.7 },
                ]}>
                <Ionicons
                  name={isActive ? tab.activeIcon : tab.icon}
                  size={20}
                  color={isActive ? AppColors.black : AppColors.textMuted}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    isActive ? styles.tabLabelActive : styles.tabLabelInactive,
                  ]}>
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    alignItems: 'center',
    ...AppShadows.floatingBar,
  },
  blurWrapper: {
    borderRadius: 36,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: 320,
    maxWidth: '100%',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 3,
  },
  tabLabelActive: {
    fontWeight: '700',
    color: AppColors.black,
  },
  tabLabelInactive: {
    fontWeight: '500',
    color: AppColors.textMuted,
  },
});
