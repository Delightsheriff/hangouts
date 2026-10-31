import * as Haptics from 'expo-haptics';
import { Pressable } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { hangoutActions, useHangoutStore } from '@/store/hangouts-store';
import { colors } from '@/theme';

type Props = { id: string; size?: number; color?: string };

/** Save toggle. The filled heart and the haptic carry the state change, without a bounce. */
export function HeartButton({ id, size = 21, color = colors.textSecondary }: Props) {
  const saved = useHangoutStore((s) => s.saved.has(id));

  return (
    <Pressable
      hitSlop={10}
      accessibilityRole="button"
      accessibilityState={{ selected: saved }}
      accessibilityLabel={saved ? 'Remove from saved' : 'Save hangout'}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        hangoutActions.toggleSaved(id);
      }}>
      <Icon
        sf={saved ? 'heart.fill' : 'heart'}
        ion={saved ? 'heart' : 'heart-outline'}
        size={size}
        color={saved ? colors.heart : color}
      />
    </Pressable>
  );
}
