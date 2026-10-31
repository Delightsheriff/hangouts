import { Host, Image, ShareLink } from '@expo/ui/swift-ui';
import { buttonStyle } from '@expo/ui/swift-ui/modifiers';

import { colors } from '@/theme';

import { shareUrl, type ShareButtonProps } from './share-button.shared';

/** Native SwiftUI ShareLink, so the system share sheet gets a rich preview. */
export function ShareButton({ hangout, size = 20, color = colors.textSecondary }: ShareButtonProps) {
  return (
    <Host matchContents>
      <ShareLink
        item={shareUrl(hangout)}
        subject={hangout.title}
        message={`${hangout.title} · ${hangout.dateShort}`}
        preview={{ title: hangout.title, image: hangout.image }}
        modifiers={[buttonStyle('plain')]}>
        <Image systemName="point.3.connected.trianglepath.dotted" size={size - 2} color={color} />
      </ShareLink>
    </Host>
  );
}
