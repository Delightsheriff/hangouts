import React from 'react';
import { ScrollView, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppColors } from '@/constants/appTheme';

export interface CategoryItem {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface CategoryFilterBarProps {
  categories: readonly CategoryItem[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export function CategoryFilterBar({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterBarProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {categories.map((cat) => {
        const isSelected = cat.id === selectedCategory;
        return (
          <Pressable
            key={cat.id}
            onPress={() => onSelectCategory(cat.id)}
            style={({ pressed }) => [
              styles.pill,
              isSelected ? styles.pillActive : styles.pillInactive,
              pressed && { opacity: 0.8 },
            ]}>
            <Ionicons
              name={cat.icon}
              size={15}
              color={isSelected ? AppColors.activePillText : AppColors.inactivePillText}
              style={styles.icon}
            />
            <Text
              style={[
                styles.label,
                isSelected ? styles.labelActive : styles.labelInactive,
              ]}>
              {cat.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 8,
    paddingBottom: 20,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  pillActive: {
    backgroundColor: AppColors.activePillBg,
  },
  pillInactive: {
    backgroundColor: AppColors.inactivePillBg,
    borderWidth: 1,
    borderColor: AppColors.inactivePillBorder,
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  labelActive: {
    color: AppColors.activePillText,
  },
  labelInactive: {
    color: AppColors.inactivePillText,
  },
});
