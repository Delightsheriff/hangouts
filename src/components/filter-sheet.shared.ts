import type { When } from '@/data/hangouts';
import type { Filters } from '@/store/hangouts-store';
import { defaultFilters } from '@/store/hangouts-store';

export type FilterSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const whenOptions: { id: When; label: string }[] = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'today', label: 'Today' },
  { id: 'tomorrow', label: 'Tomorrow' },
  { id: 'weekend', label: 'Weekend' },
];

/** How many filters differ from the defaults, for the badge on the filter button. */
export function countActiveFilters(f: Filters) {
  return (Object.keys(defaultFilters) as (keyof Filters)[]).filter((k) => f[k] !== defaultFilters[k]).length;
}
