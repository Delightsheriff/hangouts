import type { Hangout } from '@/data/hangouts';

export type HangoutMapProps = {
  hangouts: Hangout[];
  selectedId?: string;
  onSelect: (id: string) => void;
};

/** Bay Area overview, matching the design's framing. */
export const initialCamera = {
  coordinates: { latitude: 37.79, longitude: -122.37 },
  zoom: 10.6,
};

/** Zoom used when focusing a single hangout. */
export const focusZoom = 12.5;
