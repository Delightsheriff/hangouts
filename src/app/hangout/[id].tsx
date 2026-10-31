import React from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { HangoutDetailView } from '@/components/hangouts/HangoutDetailView';
import { HANGOUTS } from '@/data/mockHangouts';

export default function HangoutDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const hangout = HANGOUTS.find((h) => h.id === id) || HANGOUTS[0];

  return (
    <HangoutDetailView
      hangout={hangout}
      onBack={() => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace('/');
        }
      }}
    />
  );
}
