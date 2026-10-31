import { GoogleMaps } from 'expo-maps';
import { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';

import { focusZoom, initialCamera, type HangoutMapProps } from './hangout-map.shared';

/** Requires `android.config.googleMaps.apiKey` in app.json and a development build. */
export function HangoutMap({ hangouts, selectedId, onSelect }: HangoutMapProps) {
  const ref = useRef<GoogleMaps.MapView>(null);
  const selected = hangouts.find((h) => h.id === selectedId);
  // Keep the overview framing on first render; only fly to hangouts the user picks.
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (selected) ref.current?.setCameraPosition({ coordinates: selected.coordinates, zoom: focusZoom, duration: 450 });
  }, [selected]);

  return (
    <GoogleMaps.View
      ref={ref}
      style={StyleSheet.absoluteFill}
      cameraPosition={initialCamera}
      colorScheme={GoogleMaps.MapColorScheme.LIGHT}
      uiSettings={{ compassEnabled: false, zoomControlsEnabled: false, mapToolbarEnabled: false, myLocationButtonEnabled: false }}
      markers={hangouts.map((h) => ({ id: h.id, title: h.title, snippet: h.dateShort, coordinates: h.coordinates }))}
      onMarkerClick={(m) => m.id && onSelect(m.id)}
    />
  );
}
