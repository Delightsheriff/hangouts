import * as Haptics from 'expo-haptics';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';

import { Icon } from '@/components/ui/icon';
import { hangoutActions, useHangoutStore } from '@/store/hangouts-store';
import { colors } from '@/theme';

type Props = { id: string; size?: number; color?: string };

export function HeartButton({ id, size = 21, color = colors.textSecondary }: Props) {
  const saved = useHangoutStore((s) => s.saved.has(id));
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Pressable
      hitSlop={10}
      accessibilityRole="button"
      accessibilityState={{ selected: saved }}
      accessibilityLabel={saved ? 'Remove from saved' : 'Save hangout'}
      onPress={() => {
        Haptics.impactAsync(saved ? Haptics.ImpactFeedbackStyle.Light : Haptics.ImpactFeedbackStyle.Medium);
        scale.value = withSequence(withSpring(1.35, { damping: 6, stiffness: 400 }), withSpring(1, { damping: 10, stiffness: 300 }));
        hangoutActions.toggleSaved(id);
      }}>
      <Animated.View style={style}>
        <Icon
          sf={saved ? 'heart.fill' : 'heart'}
          ion={saved ? 'heart' : 'heart-outline'}
          size={size}
          color={saved ? colors.heart : color}
        />
      </Animated.View>
    </Pressable>
  );
}
