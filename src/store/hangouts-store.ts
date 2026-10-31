import { useSyncExternalStore } from 'react';

import type { When } from '@/data/hangouts';

export type Filters = {
  when: When;
  maxDistanceKm: number;
  freeOnly: boolean;
  hideFull: boolean;
};

type State = {
  saved: ReadonlySet<string>;
  waitlisted: ReadonlySet<string>;
  filters: Filters;
};

export const defaultFilters: Filters = { when: 'upcoming', maxDistanceKm: 25, freeOnly: false, hideFull: false };

let state: State = { saved: new Set(), waitlisted: new Set(), filters: defaultFilters };
const listeners = new Set<() => void>();

function setState(next: Partial<State>) {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function toggle(set: ReadonlySet<string>, id: string) {
  const next = new Set(set);
  if (!next.delete(id)) next.add(id);
  return next;
}

export const hangoutActions = {
  toggleSaved: (id: string) => setState({ saved: toggle(state.saved, id) }),
  toggleWaitlist: (id: string) => setState({ waitlisted: toggle(state.waitlisted, id) }),
  setFilters: (patch: Partial<Filters>) => setState({ filters: { ...state.filters, ...patch } }),
  resetFilters: () => setState({ filters: defaultFilters }),
};

export function useHangoutStore<T>(selector: (s: State) => T): T {
  return useSyncExternalStore(subscribe, () => selector(state));
}
