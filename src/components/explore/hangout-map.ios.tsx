import { AppleMaps } from 'expo-maps';
import { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';

import { colors } from '@/theme';

import { focusZoom, initialCamera, type HangoutMapProps } from './hangout-map.shared';

const symbols = {
  music: 'music.note',
  food: 'fork.knife',
  creative: 'paintpalette.fill',
  wellness: 'figure.yoga',
} as const;

export function HangoutMap({ hangouts, selectedId, onSelect }: HangoutMapProps) {
  const ref = useRef<AppleMaps.MapView>(null);
  const selected = hangouts.find((h) => h.id === selectedId);
  // Keep the overview framing on first render; only fly to hangouts the user picks.
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (selected) ref.current?.setCameraPosition({ coordinates: selected.coordinates, zoom: focusZoom });
  }, [selected]);

  return (
    <AppleMaps.View
      ref={ref}
      style={StyleSheet.absoluteFill}
      cameraPosition={initialCamera}
      colorScheme={AppleMaps.MapColorScheme.LIGHT}
      properties={{ selectionEnabled: false }}
      uiSettings={{ compassEnabled: false, scaleBarEnabled: false, myLocationButtonEnabled: false }}
      markers={hangouts.map((h) => ({
        id: h.id,
        title: h.title,
        coordinates: h.coordinates,
        systemImage: symbols[h.category],
        tintColor: h.id === selectedId ? colors.ink : h.gradient[1],
      }))}
      onMarkerClick={(m) => m.id && onSelect(m.id)}
    />
  );
}
