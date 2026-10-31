import type { Filters } from '@/store/hangouts-store';

import { spotsLeft, type CategoryId, type Hangout } from './hangouts';

/** Where "you" are for distance filtering (Union Square, SF). */
const ME = { latitude: 37.788, longitude: -122.4075 };

export function distanceKm(a: Hangout['coordinates'], b: Hangout['coordinates'] = ME) {
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.latitude - a.latitude);
  const dLon = rad(b.longitude - a.longitude);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.latitude)) * Math.cos(rad(b.latitude)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

type Options = { category?: CategoryId; query?: string; filters: Filters };

export function filterHangouts(list: Hangout[], { category = 'all', query = '', filters }: Options) {
  const q = query.trim().toLowerCase();
  return list.filter((h) => {
    if (category !== 'all' && h.category !== category) return false;
    if (filters.when !== 'upcoming' && h.when !== filters.when) return false;
    if (filters.freeOnly && h.price !== 'Free') return false;
    if (filters.hideFull && spotsLeft(h) === 0) return false;
    if (distanceKm(h.coordinates) > filters.maxDistanceKm) return false;
    if (q && !`${h.title} ${h.venue} ${h.venueNote}`.toLowerCase().includes(q)) return false;
    return true;
  });
}
