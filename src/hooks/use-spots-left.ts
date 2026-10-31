import { spotsLeft, type Hangout } from '@/data/hangouts';
import { useHangoutStore } from '@/store/hangouts-store';

/** Spots still open, counting the user's own booking as taken. */
export function useSpotsLeft(hangout: Hangout) {
  const booked = useHangoutStore((s) => s.booked.has(hangout.id));
  return Math.max(0, spotsLeft(hangout) - (booked ? 1 : 0));
}
