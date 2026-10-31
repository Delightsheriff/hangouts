import * as Linking from 'expo-linking';

import type { Hangout } from '@/data/hangouts';

export type ShareButtonProps = {
  hangout: Hangout;
  size?: number;
  color?: string;
};

export const shareUrl = (hangout: Hangout) => Linking.createURL(`/hangout/${hangout.id}`);
