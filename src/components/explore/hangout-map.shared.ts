import type { Hangout } from '@/data/hangouts';

export type HangoutMapProps = {
  hangouts: Hangout[];
  selectedId?: string;
  onSelect: (id: string) => void;
};

/** Whole-bay overview, from San Rafael to San Bruno, matching the design's framing. */
export const initialCamera = {
  coordinates: { latitude: 37.77, longitude: -122.37 },
  zoom: 9.9,
};

/** Selecting a hangout pans to it without leaving the overview. */
export const focusZoom = initialCamera.zoom;
