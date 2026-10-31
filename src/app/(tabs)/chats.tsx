import { ScrollView, StyleSheet, Text } from 'react-native';

import { ChatRow } from '@/components/chats/chat-row';
import { hangouts } from '@/data/hangouts';
import { spacing, type } from '@/theme';

const threads = [
  { preview: 'See you all at 7! I’ll bring the speaker 🎶', time: '2m', unread: true },
  { preview: 'Anyone up for a pre-game at the arcade?', time: '18m', unread: true },
  { preview: 'Mats are provided, just bring water ☀️', time: '1h' },
  { preview: 'Menu just dropped, the fig tart looks unreal', time: '3h' },
  { preview: 'Doors at 9:30, don’t forget your ID', time: 'Fri' },
];

export default function ChatsScreen() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
      <Text style={[type.greeting, styles.title]} accessibilityRole="header">
        Chats
      </Text>
      {hangouts.map((h, i) => (
        <ChatRow key={h.id} hangout={h} {...threads[i]} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.screen, gap: 12 },
  title: { fontSize: 28, marginBottom: 6 },
});
