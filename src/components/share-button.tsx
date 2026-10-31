import { Pressable, Share } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { colors } from '@/theme';

import { shareUrl, type ShareButtonProps } from './share-button.shared';

export function ShareButton({ hangout, size = 20, color = colors.textSecondary }: ShareButtonProps) {
  return (
    <Pressable
      hitSlop={10}
      accessibilityRole="button"
      accessibilityLabel={`Share ${hangout.title}`}
      onPress={() => Share.share({ title: hangout.title, message: `${hangout.title} · ${shareUrl(hangout)}` })}>
      <Icon sf="square.and.arrow.up" ion="share-social-outline" size={size} color={color} />
    </Pressable>
  );
}
