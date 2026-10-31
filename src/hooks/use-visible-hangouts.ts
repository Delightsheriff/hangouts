import { useMemo } from 'react';

import { filterHangouts } from '@/data/filter-hangouts';
import { hangouts, type CategoryId } from '@/data/hangouts';
import { useHangoutStore } from '@/store/hangouts-store';

/** Hangouts after the shared filters, plus the screen's own category and search query. */
export function useVisibleHangouts({ category, query }: { category?: CategoryId; query: string }) {
  const filters = useHangoutStore((s) => s.filters);
  const visible = useMemo(() => filterHangouts(hangouts, { category, query, filters }), [category, query, filters]);
  return { visible, filters };
}
