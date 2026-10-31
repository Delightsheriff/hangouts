import React from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppColors, AppShadows } from '@/constants/appTheme';

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  onPressFilter?: () => void;
  elevated?: boolean;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'What do you need today?',
  onPressFilter,
  elevated = false,
}: SearchBarProps) {
  return (
    <View style={[styles.wrapper, elevated && AppShadows.card]}>
      <View style={styles.inputContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color={AppColors.textMuted}
          style={styles.searchIcon}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={AppColors.textMuted}
          style={styles.input}
        />
      </View>

      <Pressable
        onPress={onPressFilter}
        style={({ pressed }) => [
          styles.filterButton,
          pressed && { opacity: 0.7 },
        ]}
        accessibilityRole="button"
        accessibilityLabel="Filter hangouts">
        <Ionicons name="options-outline" size={18} color={AppColors.textPrimary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: AppColors.border,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: AppColors.textPrimary,
    fontWeight: '400',
    paddingVertical: 0,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: AppColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
